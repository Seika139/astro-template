# Changelog

すべての変更履歴は [Keep a Changelog](https://keepachangelog.com/ja/1.1.0/) に従って記載しています。

## [Unreleased]

- 依存パッケージの定期的なアップデート（GitHub Actionsによる自動化）
- 現在開発中の変更点はここに記載します。

## [0.3.0] - 2025-01-XX

### 追加

- **Vitestによるテスト環境を構築**
  - `vitest`、`@vitest/ui`、`@vitest/coverage-v8`、`jsdom`を追加
  - テスト用のTypeScript設定（`tsconfig.test.json`）を追加
  - テスト環境のセットアップファイル（`src/test/setup.ts`）を追加
  - サンプルテスト（`src/test/utils.test.ts`）を追加
  - テスト用のユーティリティ関数（`src/lib/date.ts`）を追加
- **テスト関連のスクリプトを追加**
  - `test`: テスト実行（ウォッチモード）
  - `test:ui`: テストUI起動
  - `test:run`: テスト実行（一度だけ）
  - `test:coverage`: カバレッジ付きテスト実行
- **GitHub Actionsでテストワークフローを追加**
  - Node.js 22、pnpm 4を使用
  - 依存関係のインストール、テスト実行、カバレッジ生成
- **Makefileにテスト関連のターゲットを追加**
  - `test`: テスト実行
  - `test-ui`: テストUI起動
  - `test-coverage`: カバレッジ付きテスト実行
- **テストドキュメント（`docs/08_testing.md`）を追加**
  - テストの目的、設定、実行方法、書き方を詳しく説明

### 修正

- **TypeScript設定の修正**
  - `tsconfig.test.json`の`moduleResolution`を`"Node16"`に修正
  - TypeScriptの型チェックエラーを解消
- **依存パッケージの更新**
  - `@eslint/js`: 9.30.1 → 9.31.0
  - `@types/node`: 24.0.11 → 24.0.13
  - `eslint`: 9.30.1 → 9.31.0

## [0.2.0] - 2025-07-05

### 追加

- Tailwind CSS v4に対応し、@astrojs/tailwindを廃止。Viteプラグイン（@tailwindcss/vite）方式に移行。
- postcss.config.cjsを削除。Tailwind v4では不要なため。
- autoprefixer, @tailwindcss/postcss, @astrojs/tailwindをアンインストール。
- astro.config.mjsでvite.pluginsにtailwindcss()を追加。
- Lint対象をsrcディレクトリのみに限定し、生成物によるエラーを排除。
- すべてのpnpmコマンド（install, build, dev, preview, lint）が正常動作することを確認。

### 変更

- 依存パッケージの整理と最適化。
- Lintスクリプトの修正。

## [0.1.0] - 2025-07-04

### 追加

- Astro公式CLI「ブログ」テンプレートをベースにプロジェクトを作成。
- TypeScript strictモード有効化。
- Docker・DevContainer・GitHub Actions等のCI/CD環境を整備。
- ドキュメント・各種設定ファイル（.prettierrc, .eslintrc.cjs, .gitignore等）を整備。
- 各種依存パッケージ（Astro, TypeScript, ESLint, TailwindCSS等）を最新版にアップデート。
- ESLint v9系のFlatConfigへ移行し、eslint.config.jsを導入。
- Lintエラーや設定エラーの解消。

---

今後も依存パッケージの定期的なアップデート・構成最適化を継続予定。

[Unreleased]: https://github.com/your-repo/compare/v0.3.0...HEAD
[0.3.0]: https://github.com/your-repo/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/your-repo/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/your-repo/releases/tag/v0.1.0
