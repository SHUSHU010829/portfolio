export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  // 使用 YYYY-MM-DD 格式，避免 locale 差異
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function formatDateLocalized(dateString: string, locale: string = 'en'): string {
  const date = new Date(dateString);

  // 使用統一的格式選項避免 hydration 問題
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}