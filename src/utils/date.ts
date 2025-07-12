/**
 * 日付を日本語形式でフォーマットする
 * @param date フォーマット対象の日付
 * @returns フォーマットされた日付文字列
 */
export function formatDate(date: Date): string {
  if (isNaN(date.getTime())) {
    return '日付が無効です'
  }

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return `${year}年${month}月${day}日`
}

/**
 * 日付をISO形式でフォーマットする
 * @param date フォーマット対象の日付
 * @returns ISO形式の日付文字列
 */
export function formatDateISO(date: Date): string {
  if (isNaN(date.getTime())) {
    return ''
  }

  return date.toISOString().split('T')[0]
} 
