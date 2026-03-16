# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## プロジェクト概要

Astroフレームワークを使用したWebサイト開発のテンプレートリポジトリ。ブログ、ポートフォリオ、ランディングページの3種類のテンプレートを含む。GitHub Pages および VPS へのデプロイに対応。

## 技術スタック

- **フレームワーク:** Astro 5 (静的サイト生成、`output: 'static'`)
- **UIライブラリ:** React 19 (`@astrojs/react` インテグレーション)
- **CSS:** Tailwind CSS 4 (Viteプラグインとして統合)
- **言語:** TypeScript (strict モード)
- **テスト:** Vitest + jsdom
- **リンター/フォーマッター:** ESLint (flat config) + Prettier
- **パッケージマネージャ:** pnpm
- **コンテナ:** Docker (multi-stage build)
- **CI/CD:** GitHub Actions

## よく使うコマンド

```bash
# 開発
pnpm dev              # 開発サーバー起動 (localhost:4321)
pnpm build            # 本番ビルド

# コード品質
pnpm lint             # ESLint 実行 (src 配下の .ts, .tsx, .astro)
pnpm tsc --noEmit     # 型チェック

# テスト
pnpm test             # Vitest をウォッチモードで実行
pnpm test:run         # テストを1回実行 (CI向け)
pnpm test:coverage    # カバレッジレポート生成

# Makefile
make check            # lint + 型チェックをまとめて実行
make build            # install + build
```

## ディレクトリ構成

```
src/
├── components/       # Astro/Reactコンポーネント
│   ├── landing/      # ランディングページ用
│   ├── portfolio/    # ポートフォリオ用
│   └── react/        # Reactコンポーネント (.jsx)
├── content/          # Astro Content Collections (ブログ記事 .md)
│   └── config.ts     # コレクション定義
├── layouts/          # レイアウトコンポーネント
├── pages/            # ファイルベースルーティング
├── styles/           # グローバルCSS
├── test/             # テストファイル
└── utils/            # ユーティリティ関数
```

## コーディング規約

- **パスエイリアス:** `@/*` → `src/*` (tsconfig.json, vitest.config.ts で設定済み)
- **インデント:** スペース2つ
- **クォート:** シングルクォート
- **セミコロン:** あり
- **行幅:** Prettier は100文字、EditorConfig は120文字
- **末尾カンマ:** ES5スタイル
- **改行コード:** LF
- **言語:** コメントやドキュメントは日本語

## テスト

- テストファイルは `src/test/` に配置する (`*.test.ts` or `*.spec.ts`)
- テスト環境は jsdom (`vitest.config.ts` で設定)
- カバレッジプロバイダは v8
- `.astro` ファイルはカバレッジ対象外

## デプロイ

- **GitHub Pages:** `main` ブランチへのpush/mergeで `deploy-gh-pages.yml` が自動実行。`BASE_PATH=/astro-template/` でサブディレクトリデプロイ。
- **VPS:** `main` ブランチへのpush/PRマージで `deploy.yml` が Docker イメージをビルドしGHCRにpush後、VPSにSSHでデプロイ。
- **CI:** PRおよびpushで `ci.yml` が build → 型チェック → lint → テスト → カバレッジを実行。

## 注意事項

- `astro.config.mjs` の `base` は環境変数 `BASE_PATH` で制御される (デフォルト: `/`)
- 静的パスを扱う際は `import.meta.env.BASE_URL` を使うこと
- Reactコンポーネントは `.jsx` 拡張子で `src/components/react/` に配置する
- Content Collections のブログ記事は `src/content/blog/` に Markdown で追加する
