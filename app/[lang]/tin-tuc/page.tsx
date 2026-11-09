import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { hasLocale, t } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionaries'
import { articles } from '@/data/news'
import PageHero from '@/components/layout/PageHero'
import PageQuickJump from '@/components/layout/PageQuickJump'
import { IconArrowRight } from '@/components/ui/Icons'

export async function generateMetadata({ params }: PageProps<'/[lang]/tin-tuc'>): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const dict = getDictionary(lang)
  return {
    title: dict.nav.news,
    description: dict.news.lead,
    alternates: { canonical: `/${lang}/tin-tuc`, languages: { vi: '/vi/tin-tuc', en: '/en/tin-tuc' } },
  }
}

export default async function NewsPage({ params }: PageProps<'/[lang]/tin-tuc'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = getDictionary(lang)

  return (
    <>
      <PageHero
        title={dict.news.title}
        lead={dict.news.lead}
        crumbs={[{ href: `/${lang}`, label: dict.common.home }, { label: dict.nav.news }]}
      />
      <section className="section">
        <div className="container-x">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6 xl:grid-cols-4">
            {articles.map((a) => {
              const href = `/${lang}/tin-tuc/${a.slug}`
              return (
                <article key={a.slug} className="card-lift flex flex-col rounded-sm border border-line bg-white">
                  <Link href={href} tabIndex={-1} aria-hidden className="machine-frame block border-b border-line">
                    <Image src={a.image} alt="" fill sizes="(min-width:1280px) 300px, (min-width:640px) 50vw, 100vw" />
                  </Link>
                  <div className="flex flex-1 flex-col p-4 lg:p-6">
                    <p className="text-sm font-medium text-steel">{dict.news.guide}</p>
                    <h2 className="mt-2 text-lg leading-6 font-bold text-navy">
                      <Link href={href} className="underline-offset-4 hover:underline">{t(a.title, lang)}</Link>
                    </h2>
                    <p className="mt-2 line-clamp-2 text-[0.9375rem] leading-6 text-muted">{t(a.summary, lang)}</p>
                    <div className="mt-auto pt-6">
                      <Link href={href} className="flex min-h-11 items-center justify-between border-t border-line pt-4 text-[0.9375rem] font-semibold text-navy hover:text-steel">
                        {dict.common.readMore}
                        <IconArrowRight className="size-5" />
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
      {/* <PageQuickJump page="news" lang={lang} dict={dict} /> */}
    </>
  )
}
