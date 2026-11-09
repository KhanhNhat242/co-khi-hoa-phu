'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IconArrowRight } from '@/components/ui/Icons'

export type ScrollerItem = {
  slug: string
  name: string
  summary: string
  image: string
  href: string
  count: number
  subs: { name: string; href: string }[]
  moreCount: number
}

type Labels = { viewCategory: string; products: string; more: string; goTo: string }

/**
 * 5 nhóm sản phẩm — chồng thẻ 3D chạy theo cuộn (sticky).
 * - SSR + mobile + prefers-reduced-motion: danh sách tĩnh (đầy đủ nội dung, SEO).
 * - Desktop (≥1024px, không giảm chuyển động): nâng cấp thành sân khấu sticky; tiến độ cuộn → thẻ ở giữa.
 * - Ảnh có tem: object-contain, không đè chữ (R1). Chỉ nghiêng/di chuyển cả thẻ, không cắt ảnh.
 * Ngoại lệ đã duyệt: animation gắn với cuộn (không giới hạn 200ms) — REQUIREMENTS mục 6.
 */
export default function CategoryScroller({ items, labels }: { items: ScrollerItem[]; labels: Labels }) {
  const [enhanced, setEnhanced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)')
    const sync = () => setEnhanced(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  return enhanced ? <Stage items={items} labels={labels} /> : <StaticList items={items} labels={labels} />
}

/* ───────────────────────── Bản tĩnh ───────────────────────── */
function StaticList({ items, labels }: { items: ScrollerItem[]; labels: Labels }) {
  return (
    <ol className="container-x grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {items.map((c, i) => (
        <li key={c.slug} className="flex flex-col rounded-sm border border-white/20 bg-white text-ink">
          <Link href={c.href} tabIndex={-1} aria-hidden className="machine-frame block border-b border-line">
            <Image src={c.image} alt="" fill sizes="(min-width:1024px) 400px, (min-width:768px) 50vw, 100vw" />
          </Link>
          <div className="flex flex-1 flex-col p-4 lg:p-6">
            <p className="text-sm font-semibold text-steel tabular-nums">{String(i + 1).padStart(2, '0')}</p>
            <h3 className="mt-1 text-xl leading-7 font-bold text-navy">
              <Link href={c.href} className="underline-offset-4 hover:underline">{c.name}</Link>
            </h3>
            <p className="mt-2 text-[0.9375rem] leading-6 text-muted">{c.summary}</p>
            <div className="mt-auto pt-6">
              <Link href={c.href} className="flex min-h-11 items-center justify-between border-t border-line pt-4 font-semibold text-navy hover:text-steel">
                <span>
                  {labels.viewCategory}
                  {c.count > 0 && <span className="font-normal text-muted"> · {c.count} {labels.products}</span>}
                </span>
                <IconArrowRight className="size-5" />
              </Link>
            </div>
          </div>
        </li>
      ))}
    </ol>
  )
}

/* ───────────────────────── Sân khấu 3D sticky ───────────────────────── */
const STEP_VH = 70 // mỗi nhóm chiếm 70vh quãng cuộn
// Sân khấu cao vừa nội dung (không full màn hình) và dính ở giữa vùng dưới header
// → không còn khoảng trống lớn giữa tiêu đề section và thẻ đầu tiên.
const STAGE_H = 'min(calc(100svh - var(--header-h) - 48px), 600px)'
const STAGE_TOP = `calc(var(--header-h) + (100svh - var(--header-h) - ${STAGE_H}) / 2)`

function Stage({ items, labels }: { items: ScrollerItem[]; labels: Labels }) {
  const n = items.length
  const wrapRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const [active, setActive] = useState(0)

  const apply = useCallback(
    (p: number) => {
      const card = cardRefs.current[0]
      const stage = card?.parentElement
      const w = card?.offsetWidth ?? 442
      const h = card?.offsetHeight ?? 333
      // Thẻ đặt ở góc (0,0) của sân khấu; căn giữa bằng toạ độ làm tròn tuyệt đối theo pixel nguyên
      // (tính cả phần lẻ vị trí sân khấu) → ảnh không bị lệch nửa pixel (mờ)
      const sr = stage?.getBoundingClientRect()
      const fracX = sr ? sr.left - Math.floor(sr.left) : 0
      const fracY = sr ? sr.top - Math.floor(sr.top) : 0
      const x0 = Math.round((sr?.width ?? w) / 2 - w / 2 + fracX) - fracX
      const y0 = Math.round((sr?.height ?? h) / 2 - h / 2 + fracY) - fracY
      cardRefs.current.forEach((el, i) => {
        if (!el) return
        const o = i - p // vị trí tương đối so với thẻ giữa
        const a = Math.abs(o)
        const sign = Math.sign(o)
        el.style.zIndex = String(100 - Math.round(a * 10))
        el.tabIndex = Math.round(p) === i ? 0 : -1
        if (a < 0.02) {
          // Thẻ đang ở giữa: chỉ dịch 2D, không nghiêng/scale/filter → ảnh hiển thị 1:1, nét nhất
          el.style.transform = `translate(${x0}px, ${y0}px)`
          el.style.opacity = '1'
          el.style.filter = 'none'
          return
        }
        // thẻ kề: lệch 66% chiều cao; thẻ xa hơn: dồn về mép (như ảnh mẫu)
        const y = sign * (Math.min(a, 1) * 0.66 + Math.max(a - 1, 0) * 0.34) * h
        const rot = -sign * Math.min(a, 1.6) * 24 // thẻ trên nghiêng ra sau phía trên, thẻ dưới ngược lại
        const scale = 1 - Math.min(a, 2.5) * 0.08
        el.style.transform = `translate3d(${x0}px, ${Math.round(y0 + y)}px, 0) rotateX(${rot.toFixed(2)}deg) scale(${scale.toFixed(3)})`
        el.style.opacity = String(Math.max(0, 1 - Math.max(a - 0.6, 0) * 0.45))
        el.style.filter = `brightness(${(1 - Math.min(a, 2) * 0.22).toFixed(3)})`
      })
    },
    [],
  )

  useEffect(() => {
    let raf = 0
    const tick = () => {
      raf = 0
      const wrap = wrapRef.current
      if (!wrap) return
      const stage = stageRef.current
      const rect = wrap.getBoundingClientRect()
      const stickyTop = stage ? parseFloat(getComputedStyle(stage).top) || 0 : 0
      const total = wrap.offsetHeight - (stage?.offsetHeight ?? window.innerHeight)
      const t = total > 0 ? Math.min(1, Math.max(0, (stickyTop - rect.top) / total)) : 0
      const p = t * (n - 1)
      apply(p)
      setActive(Math.round(p))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }
    tick()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [apply, n])

  const goTo = (i: number) => {
    const wrap = wrapRef.current
    if (!wrap) return
    const stage = stageRef.current
    const stickyTop = stage ? parseFloat(getComputedStyle(stage).top) || 0 : 0
    const total = wrap.offsetHeight - (stage?.offsetHeight ?? window.innerHeight)
    const top = wrap.getBoundingClientRect().top + window.scrollY - stickyTop
    window.scrollTo({ top: top + (total * i) / (n - 1) + 1, behavior: 'smooth' })
  }

  const c = items[active]

  return (
    <div ref={wrapRef} style={{ height: `calc(${STAGE_H} + ${(n - 1) * STEP_VH}svh)` }} className="relative">
      <div ref={stageRef} style={{ top: STAGE_TOP, height: STAGE_H }} className="sticky flex items-center overflow-hidden">
        <div className="container-x grid-12 w-full items-center">
          {/* Cột trái: số thứ tự, tên nhóm, danh mục con */}
          <div className="col-span-3 self-center" aria-live="polite">
            <div key={c.slug} className="fade-in">
              <p className="text-[7rem] leading-none font-extralight tracking-[-0.04em] text-white tabular-nums">
                {String(active + 1).padStart(2, '0')}
              </p>
              <span aria-hidden className="mt-6 block h-px w-12 bg-white/60" />
              <h3 className="mt-6 text-[2.25rem] leading-[1.1] font-bold tracking-[-0.02em] text-white">{c.name}</h3>
              <ul className="mt-6 space-y-1">
                {c.subs.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} className="t-label inline-flex min-h-7 items-center text-white/80 hover:text-white hover:underline">
                      {s.name}
                    </Link>
                  </li>
                ))}
                {c.moreCount > 0 && <li className="t-label text-white/60">+{c.moreCount} {labels.more}</li>}
              </ul>
            </div>
          </div>

          {/* Giữa: chồng thẻ 3D — thẻ 442px = ảnh gốc 440×330 + viền 1px → hiển thị 1:1, không phóng to */}
          <div style={{ height: STAGE_H }} className="relative col-span-6 [perspective:1200px]">
            {items.map((it, i) => (
              <Link
                key={it.slug}
                ref={(el) => { cardRefs.current[i] = el }}
                href={it.href}
                aria-label={it.name}
                className="absolute top-0 left-0 block w-[min(100%,442px)] overflow-hidden rounded-sm border border-white/20 bg-white"
              >
                <span className="relative block aspect-[4/3] bg-white">
                  <Image src={it.image} alt="" width={440} height={330} unoptimized className="size-full object-contain" />
                </span>
              </Link>
            ))}
          </div>

          {/* Cột phải: mô tả, CTA, chỉ báo vị trí */}
          <div className="col-span-3 flex gap-6 self-center">
            <span aria-hidden className="w-px shrink-0 self-stretch bg-white/40" />
            <div className="min-w-0">
              <div key={c.slug} className="fade-in">
                <p className="text-[0.9375rem] leading-6 text-white/85">{c.summary}</p>
                {c.count > 0 && (
                  <p className="t-label mt-4 text-white/80 tabular-nums">{c.count} {labels.products}</p>
                )}
                <Link href={c.href} className="btn btn-accent btn-sm mt-6">
                  {labels.viewCategory} <IconArrowRight className="size-5" />
                </Link>
              </div>
              <ol className="mt-10 flex gap-2" aria-label={labels.goTo}>
                {items.map((it, i) => (
                  <li key={it.slug}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={`${String(i + 1).padStart(2, '0')} · ${it.name}`}
                      aria-current={i === active ? 'step' : undefined}
                      className="group grid h-11 w-8 place-items-center"
                    >
                      <span className={`block h-1 w-full transition-colors ${i === active ? 'bg-accent' : 'bg-white/30 group-hover:bg-white/70'}`} />
                    </button>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
