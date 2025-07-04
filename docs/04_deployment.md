# デプロイ手順

このプロジェクトはGitHub Actionsを使用して、コードの変更が`main`ブランチにプッシュされると自動的にVPS上の本番環境にデプロイされる仕組みを採用しています。ここでは、その自動デプロイの仕組みと手動デプロイの方法について説明します。

> **注意**: デプロイを有効にするためには、GitHubリポジトリに必要なSecrets（`VPS_HOST`、`VPS_USERNAME`、`VPS_SSH_KEY`）を設定する必要があります。詳細は[GitHub設定ガイド](./07_github-setup.md)を参照してください。

## 自動デプロイの流れ

![デプロイフロー](https://via.placeholder.com/800x400?text=デプロイフロー図)

1. 開発者が`main`ブランチに変更をプッシュする
2. GitHub Actionsが自動でワークフローを実行する
3. Dockerイメージがビルドされる
4. GitHub Container Registry(GHCR)にイメージがプッシュされる
5. VPSに接続してDockerコンテナを更新する

### GitHub Actionsの設定

デプロイ設定は`.github/workflows/deploy.yml`ファイルに定義されています。主要な処理は以下のとおりです：

#### 1. ビルドとプッシュ（build-and-push-to-ghcr）

```yaml
build-and-push-to-ghcr:
  runs-on: ubuntu-latest
  steps:
    # GitHub Container Registryにログイン
    - name: Log in to GitHub Container Registry
      uses: docker/login-action@v3
      with:
        registry: ghcr.io
        username: ${{ github.actor }}
        password: ${{ secrets.GITHUB_TOKEN }}

    # Dockerイメージをビルド
    - name: Build and push Docker image
      uses: docker/build-push-action@v5
      with:
        context: .
        push: true
        tags: ghcr.io/${{ github.repository }}:${{ github.sha }}
```

#### 2. VPSへのデプロイ（deploy-to-vps）

```yaml
deploy-to-vps:
  needs: build-and-push-to-ghcr
  runs-on: ubuntu-latest
  steps:
    # SSHで本番VPSに接続
    - name: Setup SSH
      uses: webfactory/ssh-agent@v0.8.0
      with:
        ssh-private-key: ${{ secrets.VPS_SSH_KEY }}

    # VPS上で新しいコンテナを起動
    - name: Deploy to VPS
      run: |
        ssh ${{ secrets.VPS_USERNAME }}@${{ secrets.VPS_HOST }} "
          # 新しいイメージを取得
          docker pull ghcr.io/${{ github.repository }}:${{ github.sha }}

          # 既存コンテナを停止・削除
          docker stop astro-website || true
          docker rm astro-website || true

          # 新しいコンテナを起動
          docker run -d --name astro-website -p 127.0.0.1:4321:4321 --restart=unless-stopped ghcr.io/${{ github.repository }}:${{ github.sha }}
        "
```

### 必要なGitHub Secrets

自動デプロイを有効にするためには、以下のGitHub Secretsを設定する必要があります：

- `VPS_HOST`: VPSのホスト名またはIPアドレス
- `VPS_USERNAME`: VPSにSSHで接続するユーザー名
- `VPS_SSH_KEY`: VPSに接続するための秘密鍵（公開鍵は事前にVPSの`~/.ssh/authorized_keys`に追加しておく必要があります）

## 手動デプロイの方法

何らかの理由で自動デプロイが機能しない場合、または特定のバージョンをデプロイしたい場合は、以下の手順で手動デプロイを行うことができます。

### ローカル環境からのデプロイ

1. Dockerイメージのビルド

   ```bash
   make docker-build
   # または
   docker build -t astro-template .
   ```

2. （オプション）イメージをGHCRにプッシュ

   ```bash
   # GHCRにログイン
   echo $GITHUB_TOKEN | docker login ghcr.io -u $GITHUB_USERNAME --password-stdin

   # イメージにタグ付け
   docker tag astro-template ghcr.io/your-username/astro-template:latest

   # イメージをプッシュ
   docker push ghcr.io/your-username/astro-template:latest
   ```

3. SSHでVPSに接続してデプロイ

   ```bash
   ssh username@your-vps "
     # イメージを取得（プッシュした場合）
     docker pull ghcr.io/your-username/astro-template:latest

     # 既存コンテナを停止・削除
     docker stop astro-website || true
     docker rm astro-website || true

     # 新しいコンテナを起動
     docker run -d --name astro-website -p 127.0.0.1:4321:4321 --restart=unless-stopped ghcr.io/your-username/astro-template:latest
   "
   ```

## トラブルシューティング

自動デプロイに問題が発生した場合：

1. **GitHub Actionsのログを確認する**
   - GitHub上のリポジトリページで「Actions」タブを選択し、最新の実行結果を確認します。

2. **GitHub Secretsが正しく設定されているか確認する**
   - リポジトリの「Settings」>「Secrets and variables」>「Actions」で必要なシークレットが設定されているか確認します。

3. **VPSの接続状態を確認する**
   - SSHでVPSに直接接続し、Dockerの状態やディスク容量などを確認します。

4. **コンテナログを確認する**

   ```bash
   ssh username@your-vps "docker logs astro-website"
   ```

## デプロイ後のVPS側の設定

このプロジェクトでは、Dockerコンテナは127.0.0.1:4321でリッスンするように設定されています。そのため、外部からアクセスできるようにするには、Nginxなどのリバースプロキシの設定が必要です。

Nginxの基本的な設定例：

```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://127.0.0.1:4321;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

※ この設定はNginxサーバー側で行う必要があります。このリポジトリには含まれていません。

## GitHub Pagesへのデプロイ

このテンプレートリポジトリは、`main`ブランチへのpushまたはmerge時に、GitHub Actionsを利用して自動的にGitHub Pagesへデプロイできます。

### 利用方法

1. リポジトリの「Settings」→「Pages」で、`gh-pages`ブランチの`/`（ルート）を公開対象に設定してください。
2. `astro.config.mjs`の`site`および`base`は、以下のように設定されています。

   ```js
   site: "https://Seika139.github.io/astro-template/",
   base: "/astro-template/",
   output: "static"
   ```

3. `main`ブランチにpushまたはPRをmergeすると、自動的に`gh-pages`ブランチに静的ファイルがデプロイされます。

### 注意点

- GitHub Pagesは静的サイトのみ対応しています。Astroの`output: "static"`設定が必要です。
- サブディレクトリ運用の場合は、`base`オプションも必ず設定してください。
- デプロイ後、反映まで数分かかる場合があります。

### Astroの`output: "static"`による制限

- サーバーサイド機能（APIエンドポイントやSSR）は利用できません。
- 動的ルーティング（[slug].astro等）は、`getStaticPaths`で全パスをビルド時に列挙する必要があります。
- フォーム送信や認証など、サーバー処理が必要な機能は外部サービスを利用してください。
- WebSocket等のリアルタイム通信は利用できません。
- 生成された静的ファイルのみがデプロイされます。

#### 参考
- [Astro公式ドキュメント: 静的サイト生成](https://docs.astro.build/ja/guides/deploy/github/)
