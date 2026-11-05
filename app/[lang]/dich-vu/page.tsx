import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { hasLocale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionaries'
import { siteConfig } from '@/lib/site-config'
import PageHero from '@/components/layout/PageHero'
import PageQuickJump from '@/components/layout/PageQuickJump'
import QuoteButton from '@/components/quote/QuoteButton'
import SectionHead from '@/components/ui/SectionHead'
import { IconArrowRight, IconPhone } from '@/components/ui/Icons'

export async function generateMetadata({ params }: PageProps<'/[lang]/dich-vu'>): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const dict = getDictionary(lang)
  return {
    title: dict.nav.services,
    description: dict.services.lead,
    alternates: { canonical: `/${lang}/dich-vu`, languages: { vi: '/vi/dich-vu', en: '/en/dich-vu' } },
  }
}

const serviceImages = [
  '/images/SanPham/795651582630_440x330.jpg',
  '/images/SanPham/947022703402_440x330.jpg',
  '/images/SanPham/166317102675_440x330.jpg',
]

export default async function ServicesPage({ params }: PageProps<'/[lang]/dich-vu'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = getDictionary(lang)
  const { services: s, common } = dict

  return (
    <>
      <PageHero
        title={s.title}
        lead={s.lead}
        crumbs={[{ href: `/${lang}`, label: common.home }, { label: dict.nav.services }]}
      />

      {/* 3 mảng dịch vụ — Feature-Rich Showcase */}
      <section className="section">
        <div className="container-x">
          <SectionHead title={s.cardsTitle} />
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 lg:mt-16 lg:gap-6">
            {s.cards.map((card, i) => (
              <article key={card.title} className="card-lift flex flex-col rounded-sm border border-line bg-white">
                <div className="machine-frame border-b border-line">
                  <Image src={serviceImages[i]} alt="" fill sizes="(min-width:768px) 33vw, 100vw" />
                </div>
                <div className="flex flex-1 flex-col p-4 lg:p-6">
                  <h3 className="text-xl leading-7 font-bold text-navy">{card.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-6 text-muted">{card.text}</p>
                  <div className="mt-auto pt-6">
                    <QuoteButton product={card.title} className="btn btn-outline btn-sm w-full">
                      {common.requestQuote}
                    </QuoteButton>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Quy trình 4 bước — số thứ tự có ý nghĩa trình tự */}
      <section className="section border-t border-line bg-surface">
        <div className="container-x">
          <SectionHead title={s.processTitle} />
          <ol className="mt-12 grid border-t border-l border-line bg-white md:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {s.steps.map((step, i) => (
              <li key={step.title} className="flex flex-col border-r border-b border-line p-6 lg:p-8">
                <span className="text-5xl leading-none font-bold text-navy tabular-nums" aria-hidden>
                  {i + 1}
                </span>
                <h3 className="mt-6 text-lg leading-7 font-bold text-navy">
                  <span className="sr-only">{i + 1}. </span>
                  {step.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-6 text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-12 text-white lg:py-16">
        <div className="container-x grid-12 items-center gap-y-6">
          <div className="col-span-4 md:col-span-12 lg:col-span-7">
            <h2 className="text-2xl leading-8 font-bold lg:text-3xl lg:leading-10">{s.ctaTitle}</h2>
            <p className="mt-2 text-white/85">{s.ctaText}</p>
          </div>
          <div className="col-span-4 flex flex-col gap-4 sm:flex-row md:col-span-12 lg:col-span-5 lg:justify-end">
            <QuoteButton className="btn btn-accent">
              {common.requestQuote} <IconArrowRight className="size-5" />
            </QuoteButton>
            <a href={siteConfig.phoneHref} className="btn btn-outline-light tabular-nums">
              <IconPhone className="size-5" /> {siteConfig.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      <PageQuickJump page="services" lang={lang} dict={dict} />
    </>
  )
}
