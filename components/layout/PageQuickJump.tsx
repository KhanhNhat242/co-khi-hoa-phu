import type { Locale } from '@/lib/i18n'
import type { Dictionary } from '@/lib/dictionaries'
import { pageHref, type PageKey } from '@/lib/nav'
import QuickJump from './QuickJump'

/** Hành trình gợi ý: trang hiện tại → trang tiếp theo + 2 trang phụ */
const journey: Record<PageKey, { next: PageKey; also: PageKey[] }> = {
  home: { next: 'products', also: ['about', 'contact'] },
  about: { next: 'products', also: ['services', 'projects'] },
  products: { next: 'services', also: ['projects', 'contact'] },
  services: { next: 'projects', also: ['products', 'contact'] },
  projects: { next: 'news', also: ['products', 'contact'] },
  news: { next: 'contact', also: ['products', 'services'] },
  contact: { next: 'products', also: ['about', 'services'] },
}

export default function PageQuickJump({ page, lang, dict }: { page: PageKey; lang: Locale; dict: Dictionary }) {
  const j = journey[page]
  const item = dict.quickJump.items[page]
  return (
    <QuickJump
      label={dict.quickJump.label}
      title={item.title}
      text={item.text}
      href={pageHref(lang, j.next)}
      alsoLabel={dict.quickJump.also}
      also={j.also.map((k) => ({ href: pageHref(lang, k), label: dict.nav[k] }))}
    />
  )
}
