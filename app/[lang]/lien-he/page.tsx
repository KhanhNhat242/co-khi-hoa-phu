import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { hasLocale, t } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionaries'
import { siteConfig } from '@/lib/site-config'
import PageHero from '@/components/layout/PageHero'
import PageQuickJump from '@/components/layout/PageQuickJump'
import QuoteForm from '@/components/quote/QuoteForm'
import { IconMessenger, IconPhone, IconPin, IconUser, IconZalo } from '@/components/ui/Icons'

export async function generateMetadata({ params }: PageProps<'/[lang]/lien-he'>): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const dict = getDictionary(lang)
  return {
    title: dict.nav.contact,
    description: dict.contact.lead,
    alternates: { canonical: `/${lang}/lien-he`, languages: { vi: '/vi/lien-he', en: '/en/lien-he' } },
  }
}

export default async function ContactPage({ params }: PageProps<'/[lang]/lien-he'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = getDictionary(lang)
  const { contact: C } = dict

  const rows = [
    { icon: IconPin, label: C.address, value: t(siteConfig.address, lang), href: siteConfig.mapsLink, ext: true },
    { icon: IconUser, label: C.person, value: siteConfig.contactPerson },
    { icon: IconPhone, label: C.hotline, value: siteConfig.phoneDisplay, href: siteConfig.phoneHref, strong: true },
  ]

  return (
    <>
      <PageHero
        title={C.title}
        lead={C.lead}
        crumbs={[{ href: `/${lang}`, label: dict.common.home }, { label: dict.nav.contact }]}
      />

      <section className="bg-surface py-12 lg:py-16">
        <div className="container-x grid-12 gap-y-10">
          {/* Cột trái ~40% — thông tin + bản đồ */}
          <div className="col-span-4 md:col-span-12 lg:col-span-5">
            <h2 className="border-t-2 border-navy pt-6 text-2xl leading-8 font-bold text-navy">{t(siteConfig.name, lang)}</h2>
            <dl className="mt-6 border-t border-line">
              {rows.map(({ icon: Icon, label, value, href, ext, strong }) => (
                <div key={label} className="flex gap-4 border-b border-line py-4">
                  <Icon className="mt-0.5 size-5 shrink-0 text-navy" />
                  <div>
                    <dt className="text-sm text-muted">{label}</dt>
                    <dd className="mt-1">
                      {href ? (
                        <a
                          href={href}
                          {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          className={`underline-offset-4 hover:underline ${strong ? 'text-xl font-bold text-navy tabular-nums' : 'text-ink'}`}
                        >
                          {value}
                        </a>
                      ) : (
                        <span className="text-ink">{value}</span>
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>

            <div className="mt-6 grid grid-cols-1 gap-2 min-[420px]:grid-cols-3">
              <a href={siteConfig.phoneHref} className="btn btn-accent btn-sm px-2">
                <IconPhone className="size-5" /> {dict.common.callNow}
              </a>
              <a href={siteConfig.zalo} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm px-2">
                <IconZalo className="size-5" /> Zalo
              </a>
              <a href={siteConfig.messenger} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm px-2">
                <IconMessenger className="size-5" /> {C.messenger}
              </a>
            </div>

            <div className="mt-8 rounded-sm border border-line bg-white">
              <iframe
                src={siteConfig.mapsEmbed}
                title={C.mapTitle}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-72 w-full lg:h-80"
              />
              <a
                href={siteConfig.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-12 items-center gap-2 border-t border-line px-4 text-[0.9375rem] font-semibold text-navy underline-offset-4 hover:underline"
              >
                <IconPin className="size-5" /> {C.openMap}
              </a>
            </div>
          </div>

          {/* Cột phải ~60% — form báo giá (Conversion-Optimized) */}
          <div className="col-span-4 self-start rounded-sm border border-line bg-white p-4 sm:p-8 md:col-span-12 lg:col-span-7">
            <h2 className="text-2xl leading-8 font-bold text-navy">{C.formTitle}</h2>
            <p className="mt-2 mb-8 text-[0.9375rem] text-muted">{C.formLead}</p>
            <QuoteForm lang={lang} labels={dict.form} />
          </div>
        </div>
      </section>

      {/* <PageQuickJump page="contact" lang={lang} dict={dict} /> */}
    </>
  )
}
