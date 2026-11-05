import type { MetadataRoute } from 'next'
import { locales } from '@/lib/i18n'
import { paths } from '@/lib/nav'
import { products } from '@/data/products'
import { articles } from '@/data/news'
import { siteConfig } from '@/lib/site-config'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ...Object.values(paths),
    ...products.map((p) => `/san-pham/${p.slug}`),
    ...articles.map((a) => `/tin-tuc/${a.slug}`),
  ]
  return routes.flatMap((route) =>
    locales.map((lang) => ({
      url: `${siteConfig.siteUrl}/${lang}${route}`,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${siteConfig.siteUrl}/${l}${route}`])),
      },
    })),
  )
}
