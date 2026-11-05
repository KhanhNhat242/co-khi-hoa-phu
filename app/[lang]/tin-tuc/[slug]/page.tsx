import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { hasLocale, t } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionaries'
import { siteConfig } from '@/lib/site-config'
import { articles, findArticle } from '@/data/news'
import PageHero from '@/components/layout/PageHero'
import PageQuickJump from '@/components/layout/PageQuickJump'
import QuoteButton from '@/components/quote/QuoteButton'
import { IconArrowLeft, IconArrowRight } from '@/components/ui/Icons'

// Trang đọc `slug` ngoài <Suspense> (R7: không dùng skeleton rỗng). Mọi slug đã prerender qua generateStaticParams
// nên cho phép điều hướng chờ trang tĩnh thay vì tách App Shell → tắt cảnh báo "URL data outside of Suspense".
export const instant = false

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: PageProps<'/[lang]/tin-tuc/[slug]'>): Promise<Metadata> {
  const { lang, slug } = await params
  const a = findArticle(slug)
  if (!hasLocale(lang) || !a) return {}
  return {
    title: a.title[lang],
    description: a.summary[lang],
    alternates: { canonical: `/${lang}/tin-tuc/${slug}`, languages: { vi: `/vi/tin-tuc/${slug}`, en: `/en/tin-tuc/${slug}` } },
    openGraph: { type: 'article', images: [a.image] },
  }
}

export default async function ArticlePage({ params }: PageProps<'/[lang]/tin-tuc/[slug]'>) {
  const { lang, slug } = await params
  if (!hasLocale(lang)) notFound()
  const article = findArticle(slug)
  if (!article) notFound()
  const dict = getDictionary(lang)
  const others = articles.filter((a) => a.slug !== slug).slice(0, 3)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title[lang],
    description: article.summary[lang],
    image: `${siteConfig.siteUrl}${article.image}`,
    publisher: { '@type': 'Organization', name: siteConfig.name[lang] },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <PageHero
        eyebrow={dict.news.guide}
        title={t(article.title, lang)}
        lead={t(article.summary, lang)}
        crumbs={[
          { href: `/${lang}`, label: dict.common.home },
          { href: `/${lang}/tin-tuc`, label: dict.nav.news },
          { label: t(article.title, lang) },
        ]}
      />
      <section className="section">
        <div className="container-x grid-12 gap-y-12">
          <article className="col-span-4 md:col-span-12 lg:col-span-8">
            <div className="machine-frame rounded-sm border border-line">
              <Image src={article.image} alt={t(article.title, lang)} fill priority sizes="(min-width:1024px) 760px, 100vw" />
            </div>
            <div className="mt-8 max-w-[68ch] space-y-6 text-[1.0625rem] leading-8 text-ink">
              {article.body.map((p, i) => (
                <p key={i}>{t(p, lang)}</p>
              ))}
            </div>
            <div className="mt-12 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row">
              <Link href={`/${lang}/tin-tuc`} className="btn btn-outline">
                <IconArrowLeft className="size-5" /> {dict.news.back}
              </Link>
              <QuoteButton className="btn btn-accent">
                {dict.common.requestQuote} <IconArrowRight className="size-5" />
              </QuoteButton>
            </div>
          </article>

          <aside className="col-span-4 md:col-span-12 lg:sticky lg:top-[calc(var(--header-h)+24px)] lg:col-span-4 lg:self-start">
            <p className="t-label border-t-2 border-navy pt-4 text-navy">{dict.news.more}</p>
            <ul>
              {others.map((o) => (
                <li key={o.slug} className="border-b border-line">
                  <Link href={`/${lang}/tin-tuc/${o.slug}`} className="group flex gap-4 py-4">
                    <span className="machine-frame w-24 shrink-0 rounded-xs border border-line">
                      <Image src={o.image} alt="" fill sizes="96px" />
                    </span>
                    <span className="line-clamp-3 text-[0.9375rem] leading-6 font-semibold text-navy underline-offset-4 group-hover:underline">{t(o.title, lang)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
      <PageQuickJump page="news" lang={lang} dict={dict} />
    </>
  )
}
