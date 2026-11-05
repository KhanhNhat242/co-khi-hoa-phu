'use client'

import { type Ref, useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'

export type CarouselItem = { id: string; title: string; image: string }
type Props = { title: string; items: CarouselItem[]; navLabel: string }

/**
 * Ảnh thực tế (trang Dự án) — carousel 3D cong theo ảnh mẫu khách gửi (ngoại lệ mục 6 + R1 trong REQUIREMENTS).
 * - SSR + mobile + prefers-reduced-motion: carousel vuốt ngang (scroll-snap), mỗi thẻ có chú thích đè đáy ảnh.
 * - ≥1024px, không giảm chuyển động: sân khấu sticky; tiến độ cuộn trong section → thẻ ở giữa.
 *   Thẻ giữa thẳng + có chú thích; thẻ 2 bên nghiêng vào trong, không chữ. Không nút prev/next (chỉ dải chấm).
 */
export default function ProjectCarousel(props: Props) {
  const [enhanced, setEnhanced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)')
    const sync = () => setEnhanced(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  return enhanced ? <Stage {...props} /> : <SwipeList {...props} />
}

function Heading({ title }: { title: string }) {
  return (
    <header className="container-x text-center">
      <h2 className="t-h2 mx-auto max-w-[720px]">{title}</h2>
      <span aria-hidden className="mx-auto mt-4 block h-0.5 w-16 bg-accent" />
    </header>
  )
}

function Caption({ text, ref }: { text: string; ref?: Ref<HTMLElement> }) {
  return (
    <figcaption
      ref={ref}
      className="absolute inset-x-0 bottom-0 bg-linear-to-t from-navy/90 via-navy/55 to-transparent px-5 pt-12 pb-5 text-base leading-6 font-semibold sm:px-6 sm:pt-16 sm:pb-6 sm:text-lg sm:leading-7 text-white lg:px-8 lg:pb-8 lg:text-xl lg:leading-8"
    >
      {text}
    </figcaption>
  )
}

/* ───────────────────────── Bản vuốt ngang ───────────────────────── */
function SwipeList({ title, items }: Props) {
  return (
    <div className="section">
      <Heading title={title} />
      <ul className="container-x mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 lg:mt-14 lg:gap-6">
        {items.map((it) => (
          <li key={it.id} className="w-[85%] shrink-0 snap-center sm:w-[60%] lg:w-[46%]">
            <figure className="relative aspect-[4/3] overflow-hidden rounded-[16px] bg-surface">
              <Image src={it.image} alt="" fill sizes="(min-width:1024px) 46vw, (min-width:640px) 60vw, 85vw" className="object-cover" />
              <Caption text={it.title} />
            </figure>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ───────────────────────── Sân khấu 3D sticky ───────────────────────── */
const STEP_VH = 55 // mỗi ảnh chiếm 55vh quãng cuộn

function Stage({ title, items, navLabel }: Props) {
  const n = items.length
  const wrapRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLElement | null)[]>([])
  const capRefs = useRef<(HTMLElement | null)[]>([])
  const [active, setActive] = useState(0)

  const apply = useCallback((p: number) => {
    slideRefs.current.forEach((el, i) => {
      if (!el) return
      const w = el.offsetWidth
      const o = i - p
      const a = Math.abs(o)
      const sign = Math.sign(o)
      // thẻ kề lệch 80% bề rộng, thẻ xa hơn dồn sát về mép
      const x = sign * (Math.min(a, 1) * 0.8 + Math.max(a - 1, 0) * 0.45) * w
      const rot = -sign * Math.min(a, 1.4) * 38 // cạnh trong lùi ra sau → mặt cong lõm như ảnh mẫu
      const z = -Math.min(a, 2) * 140
      el.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(1)}px, 0, ${z.toFixed(1)}px) rotateY(${rot.toFixed(2)}deg)`
      el.style.zIndex = String(100 - Math.round(a * 10))
      el.style.opacity = String(Math.max(0, Math.min(1, 2.4 - a)))
      el.style.filter = a < 0.02 ? 'none' : `brightness(${(1 - Math.min(a, 2) * 0.12).toFixed(3)})`
      const cap = capRefs.current[i]
      if (cap) cap.style.opacity = String(Math.max(0, 1 - a * 2.5))
    })
  }, [])

  useEffect(() => {
    let raf = 0
    const tick = () => {
      raf = 0
      const wrap = wrapRef.current
      if (!wrap) return
      const total = wrap.offsetHeight - window.innerHeight
      const t = total > 0 ? Math.min(1, Math.max(0, -wrap.getBoundingClientRect().top / total)) : 0
      const raw = t * (n - 1)
      // dừng ở mỗi ảnh một đoạn rồi mới chuyển (smoothstep trên 50% giữa quãng) → ảnh giữa luôn thẳng, đọc được chữ
      const base = Math.floor(raw)
      const f = Math.min(1, Math.max(0, (raw - base - 0.25) / 0.5))
      const p = Math.min(n - 1, base + f * f * (3 - 2 * f))
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
    const total = wrap.offsetHeight - window.innerHeight
    const top = wrap.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + (total * i) / (n - 1) + 1, behavior: 'smooth' })
  }

  return (
    <div ref={wrapRef} style={{ height: `calc(100svh + ${(n - 1) * STEP_VH}svh)` }} className="relative">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden pt-(--header-h)">
        <Heading title={title} />

        <div className="relative mt-10 h-[min(calc(100svh-var(--header-h)-17rem),30rem)] [perspective:1400px]">
          {items.map((it, i) => (
            <figure
              key={it.id}
              ref={(el) => { slideRefs.current[i] = el }}
              aria-hidden={i !== active}
              className="absolute top-1/2 left-1/2 aspect-[4/3] h-full overflow-hidden rounded-[16px] bg-surface shadow-[0_32px_64px_-32px_rgb(11_42_74/0.55)] will-change-transform"
            >
              <Image src={it.image} alt="" fill sizes="640px" className="object-cover" />
              <Caption text={it.title} ref={(el) => { capRefs.current[i] = el }} />
            </figure>
          ))}
        </div>

        <ol className="mt-6 flex justify-center gap-2" aria-label={navLabel}>
          {items.map((it, i) => (
            <li key={it.id}>
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-label={`${String(i + 1).padStart(2, '0')} · ${it.title}`}
                aria-current={i === active ? 'step' : undefined}
                className="group grid h-11 w-8 place-items-center"
              >
                <span className={`block h-1 w-full rounded-full transition-colors ${i === active ? 'bg-accent' : 'bg-line-strong/40 group-hover:bg-line-strong'}`} />
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
