import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { hasLocale, t, type Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionaries'
import { categories, findSub } from '@/data/categories'
import { brands, products } from '@/data/products'
import PageHero from '@/components/layout/PageHero'
import PageQuickJump from '@/components/layout/PageQuickJump'
import ProductExplorer from '@/components/product/ProductExplorer'
import ProductCard, { type CardLabels } from '@/components/product/ProductCard'

export async function generateMetadata({ params }: PageProps<'/[lang]/san-pham'>): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const dict = getDictionary(lang)
  return {
    title: dict.products.title,
    description: dict.products.lead,
    alternates: { canonical: `/${lang}/san-pham`, languages: { vi: '/vi/san-pham', en: '/en/san-pham' } },
  }
}

export default async function ProductsPage({ params }: PageProps<'/[lang]/san-pham'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = getDictionary(lang)
  const labels = { ...dict.products, ...dict.common }

  return (
    <>
      <PageHero
        title={dict.products.title}
        lead={dict.products.lead}
        crumbs={[{ href: `/${lang}`, label: dict.common.home }, { label: dict.nav.products }]}
      />
      <section className="bg-surface py-12 lg:py-16">
        <div className="container-x">
          {/* Bộ lọc đọc searchParams phía client → bọc Suspense riêng; fallback là bản tĩnh đầy đủ (SEO) */}
          <Suspense fallback={<StaticCatalogue lang={lang} labels={labels} />}>
            <ProductExplorer lang={lang} products={products} categories={categories} brands={brands} labels={labels} />
          </Suspense>
        </div>
      </section>
      <PageQuickJump page="products" lang={lang} dict={dict} />
    </>
  )
}

function StaticCatalogue({ lang, labels }: { lang: Locale; labels: CardLabels & { results: string } }) {
  return (
    <div className="grid-12 gap-y-8">
      <div className="col-span-4 hidden h-[480px] rounded-sm border border-line bg-white lg:col-span-3 lg:block" aria-hidden />
      <div className="col-span-4 md:col-span-12 lg:col-span-9">
        <p className="mb-6 min-h-11 border-b border-line pb-4 text-[0.9375rem]">
          <strong className="text-navy tabular-nums">{products.length}</strong> {labels.results}
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 xl:gap-6">
          {products.map((p) => {
            const s = findSub(p.category, p.sub)
            return <ProductCard key={p.slug} product={p} lang={lang} categoryName={s ? t(s.name, lang) : ''} labels={labels} />
          })}
        </div>
      </div>
    </div>
  )
}
