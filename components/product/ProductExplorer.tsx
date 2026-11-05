'use client'

import { useMemo, useState, useTransition } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { Category } from '@/data/categories'
import type { Product } from '@/data/products'
import { t, type Locale } from '@/lib/i18n'
import ProductCard, { type CardLabels } from './ProductCard'
import { IconCheck, IconChevronDown, IconClose, IconFilter, IconSearch } from '@/components/ui/Icons'

type Labels = CardLabels & {
  filters: string; categories: string; allCategories: string; condition: string; brands: string
  search: string; reset: string; results: string; empty: string; showFilters: string
  hideFilters: string; all: string; selected: string; clearSearch: string
}

type Props = {
  lang: Locale
  products: Product[]
  categories: Category[]
  brands: string[]
  labels: Labels
}

const fold = (s: string) =>
  s.normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/đ/gi, 'd').toLowerCase()

/**
 * F1 + F4: danh mục 2 cấp, lọc tình trạng/thương hiệu, tìm kiếm — trạng thái trên URL (R7).
 * Micro-interactions: chip chọn có dấu tick, ô tìm có nút xoá, dải "Đang chọn" gỡ nhanh từng bộ lọc.
 */
export default function ProductExplorer({ lang, products, categories, brands, labels }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const cat = params.get('danh-muc') ?? ''
  const sub = params.get('nhom') ?? ''
  const cond = params.get('tinh-trang') ?? ''
  const brandParam = params.get('hang') ?? ''
  const brandSel = useMemo(() => brandParam.split(',').filter(Boolean), [brandParam])
  const q = params.get('q') ?? ''
  const [draft, setDraft] = useState(q)
  const [lastQ, setLastQ] = useState(q)
  if (lastQ !== q) {
    setLastQ(q)
    setDraft(q)
  }

  const update = (patch: Record<string, string | null>) => {
    const next = new URLSearchParams(params.toString())
    for (const [k, v] of Object.entries(patch)) {
      if (v) next.set(k, v)
      else next.delete(k)
    }
    const qs = next.toString()
    startTransition(() => router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false }))
  }

  const filtered = useMemo(() => {
    const fq = fold(q.trim())
    return products.filter((p) => {
      if (cat && p.category !== cat) return false
      if (sub && p.sub !== sub) return false
      if (cond && p.condition !== cond) return false
      if (brandSel.length && !(p.brand && brandSel.includes(p.brand))) return false
      if (fq) {
        const hay = fold([p.name.vi, p.name.en, p.brand ?? '', p.model ?? '', p.sub, p.category].join(' '))
        if (!fq.split(/\s+/).every((w) => hay.includes(w))) return false
      }
      return true
    })
  }, [products, cat, sub, cond, brandSel, q])

  const findCat = (slug: string) => categories.find((x) => x.slug === slug)
  const catName = (slug: string, subSlug: string) => {
    const c = findCat(slug)
    const s = c?.children.find((x) => x.slug === subSlug)
    return s ? t(s.name, lang) : c ? t(c.name, lang) : ''
  }
  const countIn = (slug: string, subSlug?: string) =>
    products.filter((p) => p.category === slug && (!subSlug || p.sub === subSlug)).length

  // Dải bộ lọc đang chọn
  const chips: { key: string; label: string; clear: () => void }[] = []
  if (q) chips.push({ key: 'q', label: `“${q}”`, clear: () => update({ q: null }) })
  if (cat) chips.push({ key: 'cat', label: catName(cat, sub), clear: () => update({ 'danh-muc': null, nhom: null }) })
  if (cond) chips.push({ key: 'cond', label: cond === 'new' ? labels.new : labels.used, clear: () => update({ 'tinh-trang': null }) })
  for (const b of brandSel) {
    chips.push({ key: `b-${b}`, label: b, clear: () => update({ hang: brandSel.filter((x) => x !== b).join(',') || null }) })
  }

  const segBtn = (value: string, label: string) => {
    const on = cond === value
    return (
      <button
        key={value || 'all'}
        type="button"
        onClick={() => update({ 'tinh-trang': value || null })}
        aria-pressed={on}
        className={`min-h-11 flex-1 px-2 text-[0.9375rem] font-medium whitespace-nowrap transition-colors ${
          on ? 'bg-navy text-white' : 'bg-white text-ink hover:bg-surface'
        }`}
      >
        {label}
      </button>
    )
  }

  const groupTitle = (text: string) => (
    <p className="t-label mb-3 border-t border-line pt-4 text-navy">{text}</p>
  )

  const filtersPanel = (
    <div className="space-y-6">
      <form
        role="search"
        onSubmit={(e) => {
          e.preventDefault()
          update({ q: draft.trim() || null })
        }}
      >
        <label htmlFor="explorer-q" className="mb-2 block text-[0.9375rem] font-semibold text-navy">{labels.search}</label>
        <div className="relative">
          <input
            id="explorer-q"
            name="q"
            type="search"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="field pr-24 [&::-webkit-search-cancel-button]:hidden"
          />
          <div className="absolute top-1/2 right-1 flex -translate-y-1/2 items-center">
            {draft && (
              <button
                type="button"
                onClick={() => {
                  setDraft('')
                  update({ q: null })
                }}
                aria-label={labels.clearSearch}
                className="fade-in grid size-10 place-items-center rounded-xs text-muted transition-colors hover:text-navy"
              >
                <IconClose className="size-4" />
              </button>
            )}
            <button type="submit" aria-label={labels.search} className="grid size-10 place-items-center rounded-xs bg-navy text-white transition-colors hover:bg-steel">
              <IconSearch className="size-5" />
            </button>
          </div>
        </div>
      </form>

      <div>
        {groupTitle(labels.condition)}
        <div className="flex divide-x divide-line-strong overflow-hidden rounded-xs border border-line-strong" role="group" aria-label={labels.condition}>
          {segBtn('', labels.all)}
          {segBtn('new', labels.new)}
          {segBtn('used', labels.used)}
        </div>
      </div>

      <div>
        {groupTitle(labels.categories)}
        <ul>
          <li>
            <button
              type="button"
              onClick={() => update({ 'danh-muc': null, nhom: null })}
              aria-pressed={!cat}
              className={`flex min-h-11 w-full items-center gap-2 border-l-2 px-3 text-left text-[0.9375rem] transition-colors ${
                !cat ? 'border-navy bg-steel-50 font-semibold text-navy' : 'border-transparent text-ink hover:bg-surface'
              }`}
            >
              <span className="flex-1">{labels.allCategories}</span>
              <span className="text-sm text-muted tabular-nums">{products.length}</span>
            </button>
          </li>
          {categories.map((c) => {
            const active = cat === c.slug
            return (
              <li key={c.slug}>
                <button
                  type="button"
                  onClick={() => update({ 'danh-muc': active && !sub ? null : c.slug, nhom: null })}
                  aria-expanded={active}
                  className={`flex min-h-11 w-full items-center gap-2 border-l-2 px-3 text-left text-[0.9375rem] transition-colors ${
                    active ? 'border-navy bg-steel-50 font-semibold text-navy' : 'border-transparent text-ink hover:bg-surface'
                  }`}
                >
                  <span className="flex-1">{t(c.name, lang)}</span>
                  <span className="text-sm text-muted tabular-nums">{countIn(c.slug)}</span>
                  <IconChevronDown className={`size-4 shrink-0 transition-transform ${active ? 'rotate-180' : ''}`} />
                </button>
                {active && (
                  <ul className="fade-in mb-2 ml-3 border-l border-line">
                    {c.children.map((s) => {
                      const n = countIn(c.slug, s.slug)
                      const on = sub === s.slug
                      return (
                        <li key={s.slug}>
                          <button
                            type="button"
                            onClick={() => update({ nhom: on ? null : s.slug })}
                            aria-pressed={on}
                            className={`flex min-h-10 w-full items-center gap-2 px-3 text-left text-[0.9375rem] transition-colors ${
                              on ? 'font-semibold text-navy' : n ? 'text-ink hover:text-navy' : 'text-muted hover:text-navy'
                            }`}
                          >
                            <span className={`grid size-4 shrink-0 place-items-center rounded-xs border ${on ? 'border-navy bg-navy text-white' : 'border-line-strong'}`}>
                              {on && <IconCheck className="size-3" />}
                            </span>
                            <span className="flex-1">{t(s.name, lang)}</span>
                            <span className="text-sm text-muted tabular-nums">{n}</span>
                          </button>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>
      </div>

      {brands.length > 0 && (
        <div>
          {groupTitle(labels.brands)}
          <div className="flex flex-wrap gap-2">
            {brands.map((b) => {
              const on = brandSel.includes(b)
              return (
                <button
                  key={b}
                  type="button"
                  aria-pressed={on}
                  onClick={() => {
                    const next = on ? brandSel.filter((x) => x !== b) : [...brandSel, b]
                    update({ hang: next.join(',') || null })
                  }}
                  className={`inline-flex min-h-10 items-center gap-1.5 rounded-xs border px-3 text-sm font-medium transition-colors ${
                    on ? 'border-navy bg-navy text-white' : 'border-line-strong bg-white text-ink hover:border-navy'
                  }`}
                >
                  {on && <IconCheck className="size-3.5" />}
                  {b}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="grid-12 gap-y-8">
      <aside className="col-span-4 md:col-span-12 lg:sticky lg:top-[calc(var(--header-h)+24px)] lg:col-span-3 lg:self-start">
        <button
          type="button"
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
          aria-controls="filters-panel"
          className="btn btn-outline w-full lg:hidden"
        >
          <IconFilter className="size-5" />
          {mobileOpen ? labels.hideFilters : labels.showFilters}
          {chips.length > 0 && <span className="rounded-xs bg-navy px-1.5 text-sm text-white tabular-nums">{chips.length}</span>}
        </button>
        <div
          id="filters-panel"
          className={`${mobileOpen ? 'mt-4 block' : 'hidden'} rounded-sm border border-line bg-white p-4 lg:block lg:max-h-[calc(100svh-var(--header-h)-48px)] lg:overflow-y-auto lg:p-6`}
        >
          <p className="mb-6 hidden items-center gap-2 text-lg font-bold text-navy lg:flex">
            <IconFilter className="size-5" /> {labels.filters}
          </p>
          {filtersPanel}
        </div>
      </aside>

      <div className="col-span-4 md:col-span-12 lg:col-span-9">
        <div className="mb-6 flex min-h-11 flex-wrap items-center gap-2 border-b border-line pb-4" aria-live="polite">
          <p className={`mr-2 text-[0.9375rem] transition-opacity ${isPending ? 'opacity-50' : ''}`}>
            <strong className="text-navy tabular-nums">{filtered.length}</strong> {labels.results}
          </p>
          {chips.length > 0 && (
            <>
              <span className="text-sm text-muted">{labels.selected}:</span>
              {chips.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={c.clear}
                  className="fade-in inline-flex min-h-9 items-center gap-1.5 rounded-xs border border-navy bg-steel-50 pr-2 pl-3 text-sm font-medium text-navy transition-colors hover:bg-navy hover:text-white"
                >
                  {c.label}
                  <IconClose className="size-3.5" aria-hidden />
                  <span className="sr-only">({labels.reset})</span>
                </button>
              ))}
              <button
                type="button"
                onClick={() => startTransition(() => router.replace(pathname, { scroll: false }))}
                className="min-h-9 px-2 text-sm font-semibold text-accent-ink underline underline-offset-4"
              >
                {labels.reset}
              </button>
            </>
          )}
        </div>

        {filtered.length === 0 ? (
          <p className="rounded-sm border border-dashed border-line-strong bg-white p-8 text-center text-muted">{labels.empty}</p>
        ) : (
          <div className={`grid grid-cols-1 gap-4 transition-opacity sm:grid-cols-2 xl:grid-cols-3 xl:gap-6 ${isPending ? 'opacity-60' : ''}`}>
            {filtered.map((p, i) => (
              <ProductCard key={p.slug} product={p} lang={lang} categoryName={catName(p.category, p.sub)} labels={labels} priority={i < 3} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
