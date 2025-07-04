/**
 * 日付をフォーマットする
 * @param date フォーマットする日付
 * @returns フォーマットされた日付文字列
 */
export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * スラッグを生成する
 * @param text スラッグ化するテキスト
 * @returns 生成されたスラッグ
 */
export function generateSlug(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

/**
 * 文字列を切り詰める
 * @param text 切り詰めるテキスト
 * @param maxLength 最大長
 * @returns 切り詰められたテキスト
 */
export function truncateText(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}
