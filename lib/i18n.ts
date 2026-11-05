export const locales = ['vi', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'vi'

export const hasLocale = (value: string): value is Locale =>
  (locales as readonly string[]).includes(value)

export type Localized = { vi: string; en: string }

/**
 * Chống "rớt 1 chữ" xuống dòng cuối: nối 2 từ cuối bằng khoảng trắng không ngắt (U+00A0).
 * Áp dụng cho mọi chuỗi hiển thị (dictionary + data). Kết hợp với CSS `text-wrap: pretty`.
 */
export function noOrphan(text: string): string {
  const trimmed = text.trimEnd()
  const i = trimmed.lastIndexOf(' ')
  if (i <= 0 || trimmed.indexOf(' ') === i) return trimmed // < 3 từ: giữ nguyên
  return trimmed.slice(0, i) + '\u00A0' + trimmed.slice(i + 1)
}

/** Lấy chuỗi theo ngôn ngữ + chống rớt chữ. */
export const t = (value: Localized, lang: Locale) => noOrphan(value[lang])

/** Đường dẫn có tiền tố ngôn ngữ. Slug dùng chung cho cả vi/en (xem REQUIREMENTS mục 12). */
export const href = (lang: Locale, path = '') => `/${lang}${path}`
