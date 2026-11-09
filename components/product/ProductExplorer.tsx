'use client'

import { type ReactNode, useMemo, useState, useTransition } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { Category } from '@/data/categories'
import type { Product } from '@/data/products'
import { t, type Locale } from '@/lib/i18n'
import ProductCard, { type CardLabels } from './ProductCard'
import { IconChevronDown, IconClose, IconFilter, IconSearch } from '@/components/ui/Icons'

export type ExplorerLabels = CardLabels & {
  filters: string; categories: string; allCategories: string; condition: string; brands: string
  search: string; reset: string; results: string; empty: string; showFilters: string
  hideFilters: string; all: string; selected: string; clearSearch: string
  showing: string; sortBy: string; sortDefault: string; sortNameAsc: string; sortNameDesc: string
}

type Props = {
  lang: Locale
  products: Product[]
  categories: Category[]
  brands: string[]
  labels: ExplorerLabels
}

const fold = (s: string) =>
  s.normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/đ/gi, 'd').toLowerCase()

/** Chip lọc dạng viên bo tròn (ảnh mẫu khách gửi) — chọn: nền navy chữ trắng; chưa chọn: nền trắng viền mảnh */
function Chip({ on, onClick, children, count }: { on: boolean; onClick: () => void; children: ReactNode; count?: number }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`inline-flex min-h-10 items-center gap-1.5 rounded-full border px-3.5 text-left text-sm leading-5 font-medium transition-colors ${
        on ? 'border-navy bg-navy text-white' : 'border-line bg-white text-ink hover:border-navy'
      }`}
    >
      <span>{children}</span>
      {count !== undefined && <span className={`text-[0.8125rem] tabular-nums ${on ? 'text-white/75' : 'text-muted'}`}>{count}</span>}
    </button>
  )
}

/** Nhóm bộ lọc thu gọn được (details/summary — không cần JS) */
function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details open className="group/filter border-b border-line py-3">
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-ink [&::-webkit-details-marker]:hidden">
        {title}
        <IconChevronDown className="size-4 shrink-0 text-muted transition-transform group-open/filter:rotate-180" />
      </summary>
      <div className="pt-1 pb-2">{children}</div>
    </details>
  )
}

/**
 * F1 + F4: danh mục 2 cấp, lọc tình trạng/thương hiệu, tìm kiếm, sắp xếp — trạng thái trên URL (R7).
 * Bố cục theo ảnh mẫu khách gửi (REQUIREMENTS mục 13): sidebar không khung, chip lọc, thanh công cụ có Sắp xếp.
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
  const sort = params.get('sap-xep') ?? ''
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
    const list = products.filter((p) => {
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
    if (sort === 'ten-az' || sort === 'ten-za') {
      const dir = sort === 'ten-az' ? 1 : -1
      list.sort((a, b) => dir * t(a.name, lang).localeCompare(t(b.name, lang), lang))
    }
    return list
  }, [products, cat, sub, cond, brandSel, q, sort, lang])

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

  const activeCat = cat ? findCat(cat) : undefined
  const heading = cat ? catName(cat, sub) : labels.allCategories

  const filtersPanel = (
    <>
      <form
        role="search"
        className="border-b border-line pb-4"
        onSubmit={(e) => {
          e.preventDefault()
          update({ q: draft.trim() || null })
        }}
      >
        <label htmlFor="explorer-q" className="mb-2 block text-sm font-semibold text-ink">{labels.search}</label>
        <div className="relative">
          <input
            id="explorer-q"
            name="q"
            type="search"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="field rounded-full! pr-24 pl-4 [&::-webkit-search-cancel-button]:hidden"
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
                className="fade-in grid size-10 place-items-center rounded-full text-muted transition-colors hover:text-navy"
              >
                <IconClose className="size-4" />
              </button>
            )}
            <button type="submit" aria-label={labels.search} className="grid size-10 place-items-center rounded-full bg-navy text-white transition-colors hover:bg-steel">
              <IconSearch className="size-5" />
            </button>
          </div>
        </div>
      </form>

      <Group title={labels.categories}>
        <div className="flex flex-wrap gap-1.5">
          <Chip on={!cat} onClick={() => update({ 'danh-muc': null, nhom: null })} count={products.length}>
            {labels.all}
          </Chip>
          {categories.map((c) => (
            <Chip
              key={c.slug}
              on={cat === c.slug}
              onClick={() => update({ 'danh-muc': cat === c.slug ? null : c.slug, nhom: null })}
              count={countIn(c.slug)}
            >
              {t(c.name, lang)}
            </Chip>
          ))}
        </div>
        {activeCat && (
          <div className="fade-in mt-4 border-l-2 border-line pl-3">
            <p className="mb-2 text-sm font-medium text-muted">{t(activeCat.name, lang)}</p>
            <div className="flex flex-wrap gap-1.5">
              {activeCat.children.map((s) => (
                <Chip key={s.slug} on={sub === s.slug} onClick={() => update({ nhom: sub === s.slug ? null : s.slug })} count={countIn(activeCat.slug, s.slug)}>
                  {t(s.name, lang)}
                </Chip>
              ))}
            </div>
          </div>
        )}
      </Group>

      <Group title={labels.condition}>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label={labels.condition}>
          <Chip on={!cond} onClick={() => update({ 'tinh-trang': null })}>{labels.all}</Chip>
          <Chip on={cond === 'new'} onClick={() => update({ 'tinh-trang': 'new' })}>{labels.new}</Chip>
          <Chip on={cond === 'used'} onClick={() => update({ 'tinh-trang': 'used' })}>{labels.used}</Chip>
        </div>
      </Group>

      {brands.length > 0 && (
        <Group title={labels.brands}>
          <div className="flex flex-wrap gap-1.5">
            {brands.map((b) => {
              const on = brandSel.includes(b)
              return (
                <Chip
                  key={b}
                  on={on}
                  onClick={() => {
                    const next = on ? brandSel.filter((x) => x !== b) : [...brandSel, b]
                    update({ hang: next.join(',') || null })
                  }}
                >
                  {b}
                </Chip>
              )
            })}
          </div>
        </Group>
      )}
    </>
  )

  return (
    <div className="grid-12 gap-y-6">
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
          // overflow-y-auto cắt cả chiều ngang → chừa 8px mỗi bên (lùi lề trái −8px) để viền focus 3px của ô tìm kiếm/chip không bị cắt
          className={`${mobileOpen ? 'mt-4 block' : 'hidden'} lg:block lg:max-h-[calc(100svh-var(--header-h)-48px)] lg:overflow-y-auto lg:-ml-2 lg:pr-2 lg:pl-2`}
        >
          <p className="mb-4 hidden text-sm font-semibold tracking-[0.08em] text-muted uppercase lg:block">{labels.filters}</p>
          {filtersPanel}
        </div>
      </aside>

      <div className="col-span-4 md:col-span-12 lg:col-span-9">
        {/* Thanh công cụ: tiêu đề nhóm đang xem · số kết quả · sắp xếp */}
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <h2 className="text-2xl leading-8 font-bold text-navy lg:text-[1.75rem] lg:leading-9">{heading}</h2>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className={`text-[0.9375rem] text-muted transition-opacity ${isPending ? 'opacity-50' : ''}`} aria-live="polite">
              {labels.showing} <strong className="text-navy tabular-nums">{filtered.length}</strong> {labels.results}
            </p>
            <label className="flex items-center gap-2 text-[0.9375rem] text-muted">
              {labels.sortBy}
              <span className="relative">
                <select
                  value={sort}
                  onChange={(e) => update({ 'sap-xep': e.target.value || null })}
                  className="min-h-11 cursor-pointer appearance-none rounded-xs border border-line-strong bg-white py-2 pr-9 pl-3 text-[0.9375rem] font-medium text-ink hover:border-ink"
                >
                  <option value="">{labels.sortDefault}</option>
                  <option value="ten-az">{labels.sortNameAsc}</option>
                  <option value="ten-za">{labels.sortNameDesc}</option>
                </select>
                <IconChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-navy" />
              </span>
            </label>
          </div>
        </div>

        {chips.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
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
          </div>
        )}

        <div className="mt-6">
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
    </div>
  )
}
