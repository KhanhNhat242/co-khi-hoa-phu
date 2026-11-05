import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import '../globals.css'
import { hasLocale, locales, t } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionaries'
import { siteConfig } from '@/lib/site-config'
import { navItems } from '@/lib/nav'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FloatingContact from '@/components/floating/FloatingContact'
import QuoteProvider from '@/components/quote/QuoteProvider'

// Font có subset tiếng Việt (AGENTS.md → R6)
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
})

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export const viewport: Viewport = { themeColor: '#0B2A4A' }

export async function generateMetadata({ params }: LayoutProps<'/[lang]'>): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const dict = getDictionary(lang)
  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title: { default: dict.meta.siteTitle, template: `%s | ${siteConfig.shortName[lang]}` },
    description: dict.meta.siteDescription,
    alternates: { canonical: `/${lang}`, languages: { vi: '/vi', en: '/en' } },
    openGraph: {
      type: 'website',
      siteName: siteConfig.shortName[lang],
      locale: lang === 'vi' ? 'vi_VN' : 'en_US',
      images: ['/images/SanPham/91869_440x280.jpg'],
    },
  }
}

export default async function RootLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = getDictionary(lang)
  const nav = navItems(lang, dict)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name[lang],
    image: `${siteConfig.siteUrl}${siteConfig.logo}`,
    telephone: '+84913813412',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '49/6 Đường số 14, Khu phố 3',
      addressLocality: 'Thủ Đức',
      addressRegion: 'TP. Hồ Chí Minh',
      addressCountry: 'VN',
    },
    sameAs: [siteConfig.facebook],
    url: `${siteConfig.siteUrl}/${lang}`,
  }

  return (
    <html lang={lang} className={`${inter.variable} antialiased`}>
      <body className="flex min-h-svh flex-col max-lg:pb-[calc(64px+env(safe-area-inset-bottom))]">
        <a href="#main" className="skip-link">{dict.nav.skip}</a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
        {/* Không bọc Suspense/AntdRegistry toàn trang: nội dung phải có sẵn trong HTML tĩnh (SEO).
            antd chỉ dùng cho Drawer báo giá, render phía client khi mở. */}
        <QuoteProvider
              lang={lang}
              labels={{
                form: dict.form,
                title: dict.quote.title,
                lead: dict.quote.lead,
                selected: dict.quote.selected,
                close: dict.nav.close,
              }}
            >
              <Header
                lang={lang}
                brand={t(siteConfig.shortName, lang)}
                tagline={dict.nav.tagline}
                logo={siteConfig.logo}
                nav={nav}
                phone={{ display: siteConfig.phoneDisplay, href: siteConfig.phoneHref }}
                labels={{ ...dict.nav, requestQuote: dict.common.requestQuote }}
              />
              <main id="main" tabIndex={-1} className="flex-1 outline-none">{children}</main>
              <Footer lang={lang} dict={dict} nav={nav} />
              <FloatingContact labels={dict.floating} />
            </QuoteProvider>
      </body>
    </html>
  )
}
