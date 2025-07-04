# 開発環境のセットアップ

このプロジェクトは、VS CodeのDev Containers機能を活用して、どのOS環境でも同じ開発体験を提供します。以下の手順に従って開発環境をセットアップしてください。

## 前提条件

開発を始める前に、以下のソフトウェアがインストールされていることを確認してください：

- **Git**: ソースコード管理
- **Visual Studio Code**: コードエディタ
- **Docker Desktop**: コンテナ化環境
- **VS Code Remote - Containers 拡張機能**: Dev Containers機能を有効にするための拡張機能

## セットアップ手順

1. **リポジトリをクローンする**

   ```bash
   git clone [リポジトリURL]
   cd astro-template
   ```

2. **VS Codeで開き、Dev Containerで再起動する**

   以下のいずれかの方法で、プロジェクトをDev Container内で開きます：

   - VS Codeでフォルダを開いた後、右下に表示される通知から「Reopen in Container」を選択
   - コマンドパレット（Cmd/Ctrl+Shift+P）から「Remote-Containers: Reopen in Container」を選択
   - VS Codeの左下の緑色のアイコンをクリックし、「Reopen in Container」を選択

   初回起動時には、コンテナイメージのビルドとセットアップが実行されるため、数分かかる場合があります。

## これだけで開発が始められます

コンテナが起動すると、以下が自動的に設定されています：

- Astroとその依存関係がインストール済み
- TypeScriptの設定完了
- ESLintとPrettierによるコード品質チェック機能
- ホットリロード対応の開発サーバー

## 開発サーバーの起動

開発サーバーを起動するには、VS CodeのターミナルWindows (Ctrl+`) で以下のコマンドを実行します：

```bash
pnpm dev
# または
make dev
```

これで、`http://localhost:4321` にアクセスして開発中のサイトをプレビューできます。

## その他の便利なコマンド

Makefileに定義されている以下のコマンドも利用可能です：

```bash
# 依存関係をインストール
make install

# プロジェクトをビルド
make build

# ビルド済みプロジェクトをプレビュー
make preview

# ビルド成果物を削除
make clean
```

## トラブルシューティング

開発環境で問題が発生した場合は、以下を試してください：

1. VS CodeのDev Containerを再構築する
   - コマンドパレットから「Remote-Containers: Rebuild Container」を選択

2. Docker Desktopのキャッシュをクリア
   - Docker Desktopの設定から「Reset」または「Clean/Purge data」を実行

3. 依存関係を再インストール

   ```bash
   rm -rf node_modules
   pnpm install
   ```
