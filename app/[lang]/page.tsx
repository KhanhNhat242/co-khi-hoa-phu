import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { hasLocale, t } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionaries'
import { siteConfig } from '@/lib/site-config'
import { categories } from '@/data/categories'
import { heroSlides, products } from '@/data/products'
import { partnerLogos } from '@/data/partners'
import HeroSlider from '@/components/home/HeroSlider'
import QuoteButton from '@/components/quote/QuoteButton'
import SectionHead from '@/components/ui/SectionHead'
import PageQuickJump from '@/components/layout/PageQuickJump'
import { IconArrowRight, IconPhone } from '@/components/ui/Icons'

export default async function HomePage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = getDictionary(lang)
  const { hero, home, common } = dict

  const slides = heroSlides.map((p) => ({
    src: p.images[0].src,
    name: t(p.name, lang),
    href: `/${lang}/san-pham/${p.slug}`,
    condition: p.condition,
    brand: p.brand,
  }))

  return (
    <>
      {/* ── HERO: chia đôi 50/50, vừa 1 màn hình desktop ── */}
      <section className="grid grid-cols-1 lg:min-h-[calc(100svh-var(--header-h))] lg:grid-cols-2">
        <div className="flex flex-col justify-center bg-navy px-4 py-14 text-white md:px-6 lg:py-16 lg:pr-16 lg:pl-[max(32px,calc((100vw-1280px)/2+32px))]">
          <div className="max-w-[600px]">
            <p className="text-[0.9375rem] font-semibold tracking-wide text-white/85">{hero.eyebrow}</p>
            <h1 className="t-display mt-6">
              {hero.titleA} {hero.titleHighlight} {hero.titleB}
            </h1>
            <p className="mt-6 max-w-[560px] text-base leading-7 text-white/85 lg:text-lg">{hero.lead}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <QuoteButton className="btn btn-accent">
                {common.requestQuote}
                <IconArrowRight className="size-5" />
              </QuoteButton>
              <Link href={`/${lang}/san-pham`} className="btn btn-outline-light">
                {common.viewProducts}
              </Link>
            </div>

            <dl className="mt-12 border-t border-white/30">
              {hero.facts.map((f) => (
                <div key={f.k} className="grid grid-cols-[112px_minmax(0,1fr)] gap-4 border-b border-white/30 py-3">
                  <dt className="text-[0.9375rem] text-white/80">{f.k}</dt>
                  <dd className="font-semibold">{f.v}</dd>
                </div>
              ))}
            </dl>
            <a href={siteConfig.phoneHref} className="group mt-6 inline-flex items-center gap-4">
              <span className="grid size-12 place-items-center rounded-xs border border-white/40 transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-navy">
                <IconPhone className="size-5" />
              </span>
              <span>
                <span className="block text-sm text-white/80">{hero.hotline}</span>
                <span className="block text-xl font-bold tabular-nums">{siteConfig.phoneDisplay}</span>
              </span>
            </a>
          </div>
        </div>

        <div className="flex items-center justify-center border-b border-line bg-surface px-4 py-12 md:px-6 lg:py-16 lg:pr-[max(32px,calc((100vw-1280px)/2+32px))] lg:pl-16">
          <HeroSlider slides={slides} labels={{ ...hero, new: common.new, used: common.used }} />
        </div>
      </section>

      {/* ── 5 NHÓM SẢN PHẨM — Feature-Rich Showcase ── */}
      <section className="section bg-white">
        <div className="container-x">
          <SectionHead
            title={home.catsTitle}
            lead={home.catsLead}
            action={
              <Link href={`/${lang}/san-pham`} className="btn btn-outline">
                {common.viewAll} <IconArrowRight className="size-5" />
              </Link>
            }
          />

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-16 lg:grid-cols-6 lg:gap-6">
            {categories.map((c, i) => {
              const count = products.filter((p) => p.category === c.slug).length
              const catHref = `/${lang}/san-pham?danh-muc=${c.slug}`
              const shown = c.children.slice(0, 4)
              const rest = c.children.length - shown.length
              const cardCls =
                i < 3 ? 'lg:col-span-2' : i === 3 ? 'lg:col-span-3 lg:flex-row' : 'md:col-span-2 md:flex-row lg:col-span-3'
              const frameCls =
                i < 3
                  ? 'border-b'
                  : i === 3
                    ? 'border-b lg:aspect-auto lg:w-1/2 lg:border-r lg:border-b-0 lg:bg-white'
                    : 'border-b md:aspect-auto md:w-1/2 md:border-r md:border-b-0 md:bg-white'
              return (
                <article key={c.slug} className={`card-lift flex flex-col rounded-sm border border-line bg-white ${cardCls}`}>
                  <Link href={catHref} tabIndex={-1} aria-hidden className={`machine-frame block shrink-0 border-line ${frameCls}`}>
                    <Image src={c.image} alt="" fill sizes="(min-width:1024px) 400px, (min-width:768px) 50vw, 100vw" />
                  </Link>
                  <div className="flex flex-1 flex-col p-4 lg:p-6">
                    <h3 className="text-xl leading-7 font-bold text-navy">
                      <Link href={catHref} className="underline-offset-4 hover:underline">{t(c.name, lang)}</Link>
                    </h3>
                    <p className="mt-2 text-[0.9375rem] leading-6 text-muted">{t(c.summary, lang)}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {shown.map((s) => (
                        <li key={s.slug}>
                          <Link
                            href={`${catHref}&nhom=${s.slug}`}
                            className="inline-flex min-h-9 items-center rounded-xs border border-line px-3 text-sm text-ink transition-colors hover:border-navy hover:text-navy"
                          >
                            {t(s.name, lang)}
                          </Link>
                        </li>
                      ))}
                      {rest > 0 && (
                        <li className="inline-flex min-h-9 items-center px-1 text-sm text-muted">+{rest} {home.more}</li>
                      )}
                    </ul>
                    <div className="mt-auto pt-6">
                      <Link
                        href={catHref}
                        className="flex min-h-11 items-center justify-between gap-3 border-t border-line pt-4 text-[0.9375rem] font-semibold text-navy hover:text-steel"
                      >
                        <span>
                          {home.viewCategory}
                          {count > 0 && <span className="font-normal text-muted"> · {count} {dict.products.results}</span>}
                        </span>
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

      {/* ── ĐỐI TÁC — lưới logo tĩnh ── */}
      <section className="section border-t border-line bg-surface">
        <div className="container-x">
          <SectionHead
            title={home.partnersTitle}
            action={
              <Link href={`/${lang}/du-an`} className="btn btn-outline">
                {home.partnersAll} <IconArrowRight className="size-5" />
              </Link>
            }
          />
          <ul className="mt-12 grid grid-cols-2 border-t border-l border-line bg-white sm:grid-cols-3 lg:mt-16 lg:grid-cols-6">
            {partnerLogos.slice(0, 12).map((src) => (
              <li key={src} className="grid h-24 place-items-center border-r border-b border-line p-4">
                <Image src={src} alt="" width={157} height={61} className="max-h-14 w-auto object-contain" unoptimized />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PageQuickJump page="home" lang={lang} dict={dict} />
    </>
  )
}
