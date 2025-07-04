# GitHub設定ガイド

このドキュメントでは、このテンプレートリポジトリをGitHub上で適切に設定し運用するための手順を説明します。

## テンプレートリポジトリの設定

### テンプレートリポジトリとして設定する

1. GitHubのリポジトリページに移動します
2. 上部メニューの「Settings」タブをクリックします
3. 左側のサイドバーで「General」が選択されていることを確認します
4. ページを下にスクロールして「Template repository」セクションを見つけます
5. 「Template repository」のチェックボックスを有効にします
6. 「Save changes」ボタンをクリックして変更を保存します

これにより、リポジトリページに「Use this template」ボタンが表示され、他のユーザーが簡単に新しいプロジェクトを作成できるようになります。

### リポジトリの説明とトピックの設定

テンプレートリポジトリを見つけやすくするために、以下の情報を設定しましょう：

1. リポジトリの「About」セクションで、わかりやすい説明文を設定します
2. トピックとして、`astro`, `docker`, `github-actions`, `typescript`, `blog-template`, `portfolio-template` などの関連キーワードを追加します

## 必要なGitHub Secrets

このリポジトリの自動デプロイ機能を活用するには、以下のGitHub Secretsを設定する必要があります。これらは、テンプレートから新しいリポジトリを作成した後、デプロイ先に合わせて各リポジトリごとに設定します。

### VPSデプロイ用のSecrets

`.github/workflows/deploy.yml` で使用されるSecrets:

| Secret名       | 説明                                                                            | 例                                                                            |
| -------------- | ------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `VPS_HOST`     | デプロイ先VPSのホスト名またはIPアドレス                                         | `example.com` または `123.456.789.012`                                        |
| `VPS_USERNAME` | SSH接続に使用するユーザー名                                                     | `deploy`                                                                      |
| `VPS_SSH_KEY`  | デプロイ用の秘密SSH鍵（公開鍵はVPSの`authorized_keys`に追加する必要があります） | `-----BEGIN OPENSSH PRIVATE KEY-----\n...\n-----END OPENSSH PRIVATE KEY-----` |

### GitHub Container Registry (GHCR) アクセス用のToken

GitHub ActionsからGHCRにアクセスするために必要なToken:

| Secret名       | 説明                         | 備考                                   |
| -------------- | ---------------------------- | -------------------------------------- |
| `GITHUB_TOKEN` | GitHubが自動生成するトークン | 自動的に提供されるため、手動設定は不要 |

### Secrets設定手順

1. GitHubのリポジトリページで「Settings」タブをクリックします
2. 左側のサイドバーから「Secrets and variables」を開き、「Actions」をクリックします
3. 「New repository secret」ボタンをクリックします
4. 各Secretの名前と値を入力して「Add secret」をクリックします

## SSHキーの生成と設定

デプロイ用のSSHキーを新規に生成する場合は、以下の手順に従います：

1. ローカル環境で新しいSSHキーペアを生成します：

   ```bash
   ssh-keygen -t ed25519 -f deploy_key -C "github-actions-deploy"
   ```

2. 生成された公開鍵（`deploy_key.pub`）の内容をVPSの`~/.ssh/authorized_keys`ファイルに追加します：

   ```bash
   # ローカルから
   cat deploy_key.pub | ssh user@vps-host "cat >> ~/.ssh/authorized_keys"

   # またはVPS上で直接
   echo "公開鍵の内容" >> ~/.ssh/authorized_keys
   ```

3. 生成された秘密鍵（`deploy_key`）の内容をGitHubリポジトリの`VPS_SSH_KEY` Secretに設定します。

## デプロイ用のVPS環境設定

VPS側では以下の準備が必要です：

1. Dockerがインストールされていることを確認します
2. デプロイユーザーがDockerコマンドを実行できるように、`docker`グループに追加します：

   ```bash
   sudo usermod -aG docker $USER
   ```

3. GitHub Container Registryにアクセスするための認証情報を設定します（初回のみ）：

   ```bash
   echo "GITHUB_TOKENの値" | docker login ghcr.io -u GitHubユーザー名 --password-stdin
   ```

4. Nginxなどのリバースプロキシを設定して、Astroアプリケーション（ポート4321）へのアクセスを転送します

## 新規プロジェクト作成後の初期設定

テンプレートから新しいプロジェクトを作成した後、以下の初期設定を行うことをお勧めします：

1. `README.md`の内容を更新して、プロジェクト固有の情報を記載します
2. 必要なSecrets（`VPS_HOST`, `VPS_USERNAME`, `VPS_SSH_KEY`）を設定します
3. Dockerコンテナ名やその他のデプロイ設定を必要に応じて変更します（`.github/workflows/deploy.yml`内）
4. 最初の変更をpushして、CI/CDパイプラインが正常に動作することを確認します
