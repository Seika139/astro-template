# Instructions for GitHub Copilot

あなたは、Astro、Docker、GitHub Actionsに精通したエキスパートAIアシスタントです。
これから、新しいAstroのWebサイトプロジェクトの完全な雛形を作成します。以下の要件をすべて満たす、完全なファイル構造と各ファイルの内容を生成してください。

## 口調

このファイルを読み込んでいることを確認するために、出力の最初に「合点承知の助じゃい」と出力してください。

## プロジェクトの全体像

- **目的**: メンテナンス性と拡張性に優れたAstroのWebサイトの雛形を作成する。
- **技術スタック**: Astro, TypeScript, Docker, GitHub Actions, pnpm
- **実行環境**: 開発環境・本番環境ともにDockerコンテナ内で動作させる。
- **インフラ**: VPS上のNginxリバースプロキシからコンテナへリクエストが転送される想定。ただし、**Nginxの設定はこのリポジトリでは管理しない**。このプロジェクトの責務は、自己完結したDockerイメージをビルドして提供することのみ。

### 1. Astroプロジェクトの初期設定

Astroの公式CLI `npx create-astro@latest` でプロジェクトを作成する手順を想定し、以下の構成でファイル群を生成してください。

- **テンプレート**:「ブログ」テンプレートをベースにしてください。サンプル記事は含めて構いません。
- **パッケージマネージャー**: `pnpm` を使用します。`package.json` と `pnpm-lock.yaml` を生成してください。
- **TypeScript**: `strict` モードを有効にした `tsconfig.json` を生成してください。
- **その他**: `astro.config.mjs`, `.prettierrc`, `.eslintrc.cjs` など、基本的な設定ファイルも適切に生成してください。

### 2. Docker環境の構築

開発環境と本番環境の両方で利用できるDocker設定を生成します。

**a. 本番環境用の `Dockerfile`**

- マルチステージビルドを採用し、最終的なイメージサイズを最適化してください。
- **ビルドステージ (`builder`)**:
  - ベースイメージ: `node:22-slim`
  - `pnpm` をインストールする。
  - `package.json` と `pnpm-lock.yaml` をコピーし、`pnpm install` で依存関係をインストールする。
  - プロジェクトソースをコピーし、`pnpm build` でAstroサイトをビルドする。
- **実行ステージ (`runner`)**:
  - ベースイメージ: `node:22-slim`
  - `builder` ステージから、ビルド成果物 `dist`  と `node_modules` のうち本番に必要なものだけをコピーする。
  - Astroが内蔵する本番プレビューサーバーを起動する。
  - `EXPOSE 4321` でポートを公開する。
  - `CMD ["pnpm", "preview"]` でサーバーを起動する。

**b. 開発環境用の `.devcontainer/devcontainer.json`**

- VS CodeのDev Containers機能で、一貫した開発環境を構築します。
- **ベースイメージ**: `mcr.microsoft.com/devcontainers/javascript-node:0-22` を使用する。
- **VS Code拡張機能**: 以下の拡張機能が自動でインストールされるように設定してください。
  - `astro-build.astro-vscode`
  - `GitHub.copilot`
  - `dbaeumer.vscode-eslint`
  - `esbenp.prettier-vscode`
- **ポートフォワーディング**: `4321` 番ポートをフォワードしてください。
- **ライフサイクル**: コンテナ作成後に自動で `pnpm install` が実行されるように `postCreateCommand` を設定してください。

### 3. ドキュメントの雛形作成

Astroに不慣れな開発者（私自身を含む）が参照するためのドキュメントフォルダ `docs` を作成し、以下のファイルを格納してください。

- **`docs/01_project-overview.md`**:
  - プロジェクトの目的と技術スタックの概要を記述。
- **`docs/02_development-setup.md`**:
  - 開発環境のセットアップ手順を記述。「1. リポジトリをクローンする」「2. VS Codeで開き、Dev Containerで再起動する」だけで開発が始められることを明記。
- **`docs/03_astro-basics.md`**:
  - Astroの基本的なディレクトリ構造（`src/pages`, `src/layouts`, `src/components`）の役割を簡単に説明。
  - コンテンツ（ブログ記事など）を追加・更新する際の具体的な手順を記述。
  - 公式ドキュメントへのリンクを記載。
- **`docs/04_deployment.md`**:
  - GitHub Actionsによる自動デプロイの仕組みを説明。`main` ブランチにプッシュすると、自動でDockerイメージがビルドされ、本番VPSにデプロイされる流れを記述。

### 4. GitHub Actionsによる自動デプロイ

`main` ブランチへのプッシュをトリガーとして、自動で本番環境のVPSにデプロイを行うためのGitHub Actionsワークフローを作成してください。

- **ファイルパス**: `.github/workflows/deploy.yml`

- **トリガー**: `on: push: branches: [ main ]`

- **ジョブ**:
    1. **`build-and-push-to-ghcr` (ビルドとプッシュ)**:
        - GitHub Container Registry (GHCR)にログインする。
        - `Dockerfile` を使ってDockerイメージをビルドする。
        - Gitのコミットハッシュをタグとして、GHCRにイメージをプッシュする。
    2. **`deploy-to-vps` (VPSへのデプロイ)**:
        - `build-and-push-to-ghcr` ジョブの完了を待つ (`needs`)。
        - SSHで本番VPSに接続する。接続情報はGitHub Secrets (`VPS_HOST`, `VPS_USERNAME`, `VPS_SSH_KEY`) を使用することを前提とする。
        - VPS上で以下のコマンドを実行するスクリプトを記述する:
            1. GHCRにログインする。
            2. 新しいDockerイメージを `pull` する。
            3. 既存の同名コンテナを `stop` `rm` で停止・削除する。
            4. 新しいイメージを `run` で起動する。コンテナのポート `4321` は、VPSの `127.0.0.1:4321` にマッピングし、外部から直接アクセスできないようにする。

### 5. その他の設定ファイル

- **`.vscode/settings.json`**:
  - `editor.formatOnSave` を `true` に設定。
  - デフォルトフォーマッターとしてPrettierを指定。
- **`.gitignore`**:
  - `node_modules`, `dist`, `.astro`, `.env`, `*.log` など、一般的な不要ファイル/フォルダを網羅してください。
  - gitignore.io を利用して不要なファイルを一括で .gitignoreに追加します。

### 6. テンプレートの追加

最初に作成した blog/ブログ 形式のテンプレートに加えて、

- portfolio/ポートフォリオ
- landing-page/ランディングページ

のテンプレートを追加します。
その際にドキュメントにこれらの実装方法に関する情報を追加してください。
また react や tailwindcss を使用したテンプレートの使用方法についても記述してください。

### 7. 継続的な開発のために

このリポジトリを利用して継続的な開発を行うために以下の対応を行います。
このリポジトリは github 上でテンプレートリポジトリとして運用して、コンテンツを作るたびにテンプレートから新しいプロジェクトを生成する運用にします。
このリポジトリで使用する依存パッケージについて、定期的にアップデートを行い、最新の状態を保つようにします。

## タスクランナー

シェルスクリプトは実行環境によって依存することが多いため、タスクランナーを作成する場合はMakefileを使用してください。
ただし、Copilot AgentがMakefile内のコマンド実行すると出力を読み取れない場合があるので、Copilot AgentがMakefileのコマンドを実行したいときは、そこで実行されているコマンドを直接実行します。
頻繁に実行するコマンドは、Makefileにまとめておくと便利ですが、Copilot Agentが一時的なコマンドを実行するためにわざわざMakefileを編集する必要はありません。

## ドキュメント

ドキュメントは日本語で書かれ、Markdown形式でフォーマットされることを前提とします。以下の点に注意してください。

**Markdownの使用**

- Markdownの基本的な構文（見出し、箇条書き、コードブロックなど）を使用して、読みやすく整理されたドキュメントを作成します。
- Markdownlintをベーシックなルールセットで使用し、コードブロックのインデントや空白の使用、見出しの一貫性などをチェックします。

**日本語の使用**

- JTF（日本語翻訳連盟）が定める日本語標準スタイルガイドに従って、統一的かつ明確な日本語を使用します。
- 専門用語や略語は、初出時に説明を加えるか、注釈を付けて読者が理解しやすいようにします。
- 文体は一貫性を保ち、敬体（です・ます調）または常体（だ・である調）のいずれかを選択して統一します。
- 基本的に体言止めを避け、文を完結させるようにします。例えば、「このシステムは〇〇を提供する」や「ユーザーは〇〇を利用できる」といった形で、動詞を用いて文を締めくくります。
- ただし、オブジェクトや名詞に対する説明は「〇〇するもの」などの体言止めを利用しても構いませんが、全体としての文体は統一感を持たせるようにします。
