// テスト環境のセットアップ
import { beforeAll, afterEach, afterAll } from 'vitest';

// グローバルなテスト設定
beforeAll(() => {
  // テスト実行前の共通処理
  console.log('🧪 テスト環境をセットアップ中...');
});

afterEach(() => {
  // 各テスト後のクリーンアップ
});

afterAll(() => {
  // 全テスト終了後の処理
  console.log('✅ テスト完了');
});
