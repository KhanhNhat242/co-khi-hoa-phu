import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { hasLocale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionaries'
import PageHero from '@/components/layout/PageHero'
import PageQuickJump from '@/components/layout/PageQuickJump'
import QuoteButton from '@/components/quote/QuoteButton'
import SectionHead from '@/components/ui/SectionHead'
import { IconArrowRight } from '@/components/ui/Icons'

export async function generateMetadata({ params }: PageProps<'/[lang]/gioi-thieu'>): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const dict = getDictionary(lang)
  return {
    title: dict.nav.about,
    description: dict.about.lead,
    alternates: { canonical: `/${lang}/gioi-thieu`, languages: { vi: '/vi/gioi-thieu', en: '/en/gioi-thieu' } },
  }
}

export default async function AboutPage({ params }: PageProps<'/[lang]/gioi-thieu'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = getDictionary(lang)
  const { about, common } = dict

  return (
    <>
      <PageHero
        title={about.title}
        lead={about.lead}
        crumbs={[{ href: `/${lang}`, label: common.home }, { label: dict.nav.about }]}
      />

      {/* Câu chuyện & hiện diện thương mại */}
      <section className="section">
        <div className="container-x">
          <SectionHead title={about.storyTitle} />
          <div className="grid-12 mt-12 gap-y-10 lg:mt-16">
            <figure className="col-span-4 md:col-span-12 lg:col-span-7">
              {/* Ảnh gian hàng — giữ nguyên tỉ lệ gốc 440×280, không đè chữ (R1) */}
              <div className="relative aspect-[440/280] rounded-sm border border-line bg-surface">
                <Image src="/images/SanPham/91869_440x280.jpg" alt={about.storyCaption} fill sizes="(min-width:1024px) 700px, 100vw" className="object-contain" />
              </div>
              <figcaption className="mt-3 text-sm text-muted">{about.storyCaption}</figcaption>
            </figure>

            <div className="col-span-4 md:col-span-12 lg:col-span-5">
              <p className="text-[1.0625rem] leading-7 text-ink">{about.storyText}</p>
              <dl className="mt-8 border-t border-line">
                <div className="grid grid-cols-[120px_1fr] gap-4 border-b border-line py-4">
                  <dt className="font-semibold text-navy">KUBOKE</dt>
                  <dd className="text-[0.9375rem] leading-6 text-muted">{about.brandNote}</dd>
                </div>
              </dl>
              <QuoteButton className="btn btn-accent mt-8">
                {common.requestQuote} <IconArrowRight className="size-5" />
              </QuoteButton>
            </div>
          </div>
        </div>
      </section>

      {/* Quy mô xưởng & điểm mạnh */}
      <section className="section border-t border-line bg-surface">
        <div className="container-x">
          <SectionHead title={about.scaleTitle} lead={about.scaleLead} />
          <div className="grid-12 mt-12 gap-y-10 lg:mt-16">
            <figure className="col-span-4 md:col-span-12 lg:col-span-5">
              <div className="machine-frame rounded-sm border border-line bg-white">
                <Image src="/images/SanPham/024414336162_440x330.jpg" alt={about.scaleCaption} fill sizes="(min-width:1024px) 480px, 100vw" />
              </div>
              <figcaption className="mt-3 text-sm text-muted">{about.scaleCaption}</figcaption>
            </figure>

            {/* TODO(khach): số liệu USP thật — R2 không bịa */}
            <dl className="col-span-4 border-t-2 border-navy md:col-span-12 lg:col-span-7">
              {about.usp.map((u) => (
                <div key={u.title} className="grid grid-cols-1 gap-2 border-b border-line py-6 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-6">
                  <dt className="text-lg leading-7 font-bold text-navy">{u.title}</dt>
                  <dd>
                    <p className="text-[0.9375rem] leading-6 text-muted">{u.text}</p>
                    <span className="todo-badge mt-3">{common.pendingClient}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <PageQuickJump page="about" lang={lang} dict={dict} />
    </>
  )
}
