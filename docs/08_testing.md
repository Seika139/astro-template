# テストについて

このプロジェクトでは、コードの品質と信頼性を保つためにテストを導入しています。

## テストの目的

- **品質保証**: 基本的な機能が正常に動作することを確認
- **回帰テスト**: 依存パッケージの更新時に機能が壊れていないことを確認
- **開発者体験**: コードの変更に対する自信を持てる環境を提供

## テスト構成

### 使用技術

- **Vitest**: 高速なテストランナー
- **jsdom**: ブラウザ環境のシミュレーション
- **@vitest/ui**: テストの視覚的な実行環境
- **@vitest/coverage-v8**: テストカバレッジの測定

### ディレクトリ構造

```
src/
├── test/
│   ├── setup.ts          # テスト環境のセットアップ
│   └── utils.test.ts     # ユーティリティ関数のテスト
└── utils/
    └── date.ts           # テスト対象の関数
```

## テストの実行

### 基本的なテスト実行

```bash
# テストを実行
make test

# または直接実行
pnpm test
```

### UIモードでのテスト実行

```bash
# ブラウザでテスト結果を確認
make test-ui

# または直接実行
pnpm test:ui
```

### カバレッジの確認

```bash
# テストカバレッジを確認
make test-coverage

# または直接実行
pnpm test:coverage
```

## テストの書き方

### 基本的なテスト構造

```typescript
import { describe, it, expect } from 'vitest';
import { formatDate } from '../utils/date';

describe('formatDate', () => {
  it('日付を正しい形式でフォーマットする', () => {
    const date = new Date('2024-01-15');
    const result = formatDate(date);
    expect(result).toBe('2024年1月15日');
  });

  it('無効な日付に対してエラーハンドリングする', () => {
    const invalidDate = new Date('invalid');
    const result = formatDate(invalidDate);
    expect(result).toBe('日付が無効です');
  });
});
```

### テストの命名規則

- **describe**: テスト対象の機能やクラス名
- **it**: 具体的なテストケースの説明
- 日本語で分かりやすく記述

### テストの種類

1. **ユニットテスト**: 個別の関数やコンポーネントのテスト
2. **統合テスト**: 複数の機能を組み合わせたテスト
3. **E2Eテスト**: エンドツーエンドの動作確認（必要に応じて）

## CI/CDでのテスト

GitHub Actionsでは、プルリクエスト時に自動でテストが実行されます。

```yaml
# .github/workflows/test.yml の例
- name: Run tests
  run: pnpm test:run
```

## テストの追加

新しい機能を追加する際は、以下の手順でテストを追加してください：

1. テスト対象の関数やコンポーネントを作成
2. `src/test/` ディレクトリにテストファイルを作成
3. 基本的な動作とエラーケースをテスト
4. テストが通ることを確認

## 参考資料

- [Vitest公式ドキュメント](https://vitest.dev/)
- [Astro Testing Guide](https://docs.astro.build/en/guides/testing/)
- [Testing Best Practices](https://vitest.dev/guide/best-practices.html)
