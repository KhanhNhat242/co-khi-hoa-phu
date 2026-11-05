import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { hasLocale, t } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionaries'
import { siteConfig } from '@/lib/site-config'
import { findCategory, findSub } from '@/data/categories'
import { findProduct, products } from '@/data/products'
import ProductGallery from '@/components/product/ProductGallery'
import ProductCard from '@/components/product/ProductCard'
import ConditionBadge from '@/components/product/ConditionBadge'
import QuoteButton from '@/components/quote/QuoteButton'
import SectionHead from '@/components/ui/SectionHead'
import PageQuickJump from '@/components/layout/PageQuickJump'
import { IconArrowRight, IconFile, IconPhone, IconPlay } from '@/components/ui/Icons'

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PageProps<'/[lang]/san-pham/[slug]'>): Promise<Metadata> {
  const { lang, slug } = await params
  const p = findProduct(slug)
  if (!hasLocale(lang) || !p) return {}
  return {
    title: p.name[lang],
    description: `${p.name[lang]} – ${p.highlights.map((h) => h[lang]).join('. ')}.`,
    alternates: {
      canonical: `/${lang}/san-pham/${slug}`,
      languages: { vi: `/vi/san-pham/${slug}`, en: `/en/san-pham/${slug}` },
    },
    openGraph: { images: [p.images[0].src] },
  }
}

export default async function ProductDetailPage({ params }: PageProps<'/[lang]/san-pham/[slug]'>) {
  const { lang, slug } = await params
  if (!hasLocale(lang)) notFound()
  const product = findProduct(slug)
  if (!product) notFound()

  const dict = getDictionary(lang)
  const { common } = dict
  const L = dict.product
  const cat = findCategory(product.category)
  const sub = findSub(product.category, product.sub)
  const name = t(product.name, lang)

  const specs: [string, string][] = [
    [common.category, [cat && t(cat.name, lang), sub && t(sub.name, lang)].filter(Boolean).join(' › ')],
    [common.condition, product.condition === 'new' ? common.new : common.used],
    ...(product.brand ? [[common.brand, product.brand] as [string, string]] : []),
    ...(product.model ? [[common.model, product.model] as [string, string]] : []),
    // TODO(khach): bảng thông số kỹ thuật chi tiết (R2 — không tự đặt số liệu)
    [L.specDetail, L.specDetailValue],
  ]

  const related = products
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .sort((a, b) => Number(b.sub === product.sub) - Number(a.sub === product.sub))
    .slice(0, 3)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name[lang],
    image: product.images.map((i) => `${siteConfig.siteUrl}${i.src}`),
    brand: product.brand ? { '@type': 'Brand', name: product.brand } : undefined,
    itemCondition: product.condition === 'new' ? 'https://schema.org/NewCondition' : 'https://schema.org/UsedCondition',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />

      <div className="border-b border-line bg-surface">
        <nav aria-label="Breadcrumb" className="container-x py-4 text-sm">
          <ol className="flex flex-wrap items-center gap-2 text-muted">
            <li><Link href={`/${lang}`} className="underline-offset-4 hover:text-navy hover:underline">{common.home}</Link></li>
            <li aria-hidden>/</li>
            <li><Link href={`/${lang}/san-pham`} className="underline-offset-4 hover:text-navy hover:underline">{dict.nav.products}</Link></li>
            {cat && (
              <>
                <li aria-hidden>/</li>
                <li><Link href={`/${lang}/san-pham?danh-muc=${cat.slug}`} className="underline-offset-4 hover:text-navy hover:underline">{t(cat.name, lang)}</Link></li>
              </>
            )}
            <li aria-hidden>/</li>
            <li aria-current="page" className="font-semibold text-navy">{name}</li>
          </ol>
        </nav>
      </div>

      <section className="py-12 lg:py-16">
        <div className="container-x grid-12 gap-y-10">
          <div className="col-span-4 md:col-span-12 lg:col-span-7">
            <ProductGallery images={product.images} alt={name} />
          </div>

          <div className="col-span-4 md:col-span-12 lg:col-span-5">
            <div className="flex flex-wrap items-center gap-3">
              <ConditionBadge condition={product.condition} labels={common} />
              {sub && <span className="text-[0.9375rem] font-medium text-steel">{t(sub.name, lang)}</span>}
            </div>
            <h1 className="t-h1 mt-4 text-navy">{name}</h1>

            <ul className="mt-6 border-t border-line">
              {product.highlights.map((h, i) => (
                <li key={i} className="flex min-h-12 items-center gap-3 border-b border-line text-[1.0625rem]">
                  <span className="h-0.5 w-3 shrink-0 bg-navy" aria-hidden />
                  {t(h, lang)}
                </li>
              ))}
            </ul>

            <div className="mt-8 grid grid-cols-1 gap-3">
              <QuoteButton product={name} image={product.images[0].src} className="btn btn-accent w-full">
                {common.requestQuote} <IconArrowRight className="size-5" />
              </QuoteButton>
              {product.catalogPdf ? (
                <a href={product.catalogPdf} download className="btn btn-outline w-full">
                  <IconFile className="size-5" /> {L.catalogue}
                </a>
              ) : (
                // TODO(khach): catalogue PDF — ghi chú trạng thái, không làm nút giả
                <p className="flex items-center gap-2 text-[0.9375rem] text-muted">
                  <IconFile className="size-5 shrink-0" /> {L.cataloguePending}
                </p>
              )}
            </div>

            <a href={siteConfig.phoneHref} className="group mt-8 flex items-center gap-4 border-t border-line pt-6">
              <span className="grid size-12 shrink-0 place-items-center rounded-xs bg-navy text-white transition-colors group-hover:bg-accent group-hover:text-navy">
                <IconPhone className="size-5" />
              </span>
              <span className="text-[0.9375rem] text-muted">
                {L.help}
                <span className="mt-1 block text-xl font-bold text-navy tabular-nums">{siteConfig.phoneDisplay}</span>
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface py-12 lg:py-16">
        <div className="container-x grid-12 gap-y-10">
          {/* Data-Dense: bảng thông số — hàng 36px, khoảng cách gọn */}
          <div className="col-span-4 md:col-span-12 lg:col-span-7">
            <h2 className="text-2xl leading-8 font-bold text-navy">{L.specsTitle}</h2>
            <table className="mt-4 w-full border-collapse border border-line bg-white text-sm">
              <tbody>
                {specs.map(([k, v]) => (
                  <tr key={k} className="h-9 border-b border-line even:bg-surface/60">
                    <th scope="row" className="w-2/5 border-r border-line px-3 py-1.5 text-left align-middle font-semibold text-navy">{k}</th>
                    <td className="px-3 py-1.5 align-middle text-ink">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-span-4 md:col-span-12 lg:col-span-5">
            <h2 className="text-2xl leading-8 font-bold text-navy">{L.video}</h2>
            {product.video ? (
              <div className="mt-4 aspect-video overflow-hidden rounded-sm bg-navy">
                <iframe src={product.video} title={name} loading="lazy" allowFullScreen className="size-full" />
              </div>
            ) : (
              // TODO(khach): video vận hành
              <div className="mt-4 flex aspect-video flex-col items-center justify-center gap-3 rounded-sm border border-dashed border-line-strong bg-white p-6 text-center">
                <IconPlay className="size-10 text-muted" />
                <p className="max-w-xs text-[0.9375rem] text-muted">{L.videoPending}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section">
          <div className="container-x">
            <SectionHead title={L.related} />
            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {related.map((p) => {
                const s = findSub(p.category, p.sub)
                return <ProductCard key={p.slug} product={p} lang={lang} categoryName={s ? t(s.name, lang) : ''} labels={common} />
              })}
            </div>
          </div>
        </section>
      )}

      <PageQuickJump page="products" lang={lang} dict={dict} />
    </>
  )
}
