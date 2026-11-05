import type { Dictionary } from './dictionaries'
import type { Locale } from './i18n'

export type PageKey = 'home' | 'about' | 'products' | 'services' | 'projects' | 'news' | 'contact'

/** Slug dùng chung cho vi/en (REQUIREMENTS mục 12) */
export const paths: Record<PageKey, string> = {
  home: '',
  about: '/gioi-thieu',
  products: '/san-pham',
  services: '/dich-vu',
  projects: '/du-an',
  news: '/tin-tuc',
  contact: '/lien-he',
}

export const pageHref = (lang: Locale, key: PageKey) => `/${lang}${paths[key]}`

export const navItems = (lang: Locale, dict: Dictionary) =>
  (Object.keys(paths) as PageKey[]).map((key) => ({ href: pageHref(lang, key), label: dict.nav[key] }))
