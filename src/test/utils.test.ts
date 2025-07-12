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
