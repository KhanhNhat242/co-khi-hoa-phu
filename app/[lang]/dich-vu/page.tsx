import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionaries'
import PageHero from '@/components/layout/PageHero'
import PageQuickJump from '@/components/layout/PageQuickJump'
import SectionHead from '@/components/ui/SectionHead'
import ProcessArc from '@/components/services/ProcessArc'
import ServiceCards from '@/components/services/ServiceCards'

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
          <div className="mt-12 lg:mt-16">
            <ServiceCards
              cards={s.cards.map((card, i) => ({ ...card, image: serviceImages[i % serviceImages.length] }))}
              ctaLabel={common.requestQuote}
            />
          </div>
        </div>
      </section>

      {/* Quy trình 4 bước — số thứ tự có ý nghĩa trình tự */}
      <section className="section border-t border-line bg-surface">
        <div className="container-x">
          <ProcessArc eyebrow={s.processEyebrow} title={s.processTitle} steps={s.steps} />
        </div>
      </section>

      {/* <PageQuickJump page="services" lang={lang} dict={dict} /> */}
    </>
  )
}
