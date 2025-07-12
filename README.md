# Astro Template

このリポジトリは、Astroフレームワークを使用したWebサイト開発のためのテンプレートリポジトリです。Docker環境で開発・本番運用できる設定と、GitHub Actionsによる自動デプロイの仕組みが含まれています。

## 特徴

- Astroによる高速なサイト構築
- 複数のテンプレート（ブログ、ポートフォリオ、ランディングページ）
- React、TailwindCSSとの連携サンプル
- TypeScriptによる型安全な開発環境
- **Vitestによるテスト環境（UI、カバレッジ対応）**
- Dockerを使ったコンテナ化された開発・本番環境
- VS Code Dev Containersによる一貫した開発環境
- GitHub Actionsによる自動デプロイフロー
- 依存パッケージの自動更新仕組み

## クイックスタート

```bash
# テンプレートから新しいリポジトリを作成
# GitHubのWebインターフェースで「Use this template」ボタンをクリック

# または、リポジトリをクローン
git clone [リポジトリURL] astro-template
cd astro-template

# VS CodeでDev Containerを使って開発
code .
# VS Codeが開いたら、「Reopen in Container」を選択

# または、ローカルで直接実行
pnpm install
pnpm dev
```

詳細な情報は、[docs](./docs)フォルダ内のドキュメントを参照してください。

## 開発コマンド

```bash
# 開発サーバー起動
pnpm dev

# ビルド
pnpm build

# プレビュー
pnpm preview

# リント
pnpm lint

# テスト実行
pnpm test

# テスト（UI）
pnpm test:ui

# テスト（カバレッジ）
pnpm test:coverage

# 型チェック
pnpm tsc --noEmit
```

## ドキュメント

- [プロジェクト概要](./docs/01_project-overview.md)
- [開発環境のセットアップ](./docs/02_development-setup.md)
- [Astroの基本](./docs/03_astro-basics.md)
- [デプロイ手順](./docs/04_deployment.md)
- [テンプレート活用ガイド](./docs/05_templates.md)
- [継続的な開発とメンテナンス](./docs/06_maintenance.md)
- [GitHub設定ガイド](./docs/07_github-setup.md)
- [テストガイド](./docs/08_testing.md)

## ライセンス

MITライセンス
