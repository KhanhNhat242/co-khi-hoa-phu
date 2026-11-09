'use client'

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import Image from 'next/image'
import QuoteButton from '@/components/quote/QuoteButton'
import { IconArrowRight } from '@/components/ui/Icons'

export type Strength = { title: string; text: string; image: string; imageAlt: string }

type Labels = { requestQuote: string; pending: string; listLabel: string }

const DESKTOP_QUERY = '(min-width: 64rem)'
const REDUCED_QUERY = '(prefers-reduced-motion: reduce)'

/**
 * Sân khấu dính cao vừa nội dung (không full màn hình) và nằm giữa vùng dưới header
 * → không thừa khoảng trống trên/dưới section. Mỗi lần chuyển thẻ ứng với STEP_SVH quãng cuộn.
 */
const STAGE_H = 'min(calc(100svh - var(--header-h) - 48px), 600px)'
const STAGE_TOP = `calc(var(--header-h) + (100svh - var(--header-h) - ${STAGE_H}) / 2)`
const STEP_SVH = 60

/** Vị trí dính (px từ mép trên viewport) + chiều cao sân khấu, đọc từ CSS đã tính */
const stageMetrics = (stage: HTMLElement | null) => ({
  top: stage ? parseFloat(getComputedStyle(stage).top) || 0 : 0,
  height: stage?.offsetHeight ?? window.innerHeight,
})

/** Tỉ lệ ảnh lấy từ tên file kiểu `_440x280.jpg` (ảnh kho khách gửi) — mặc định 4:3 */
const imageRatio = (src: string) => {
  const m = src.match(/_(\d+)x(\d+)\.\w+$/)
  return m ? `${m[1]} / ${m[2]}` : '4 / 3'
}

/**
 * Biến đổi cho thẻ thứ i khi "vị trí" cuộn là position (0 → n-1).
 * d < 0: thẻ đang trượt xuống rời đi; d ≥ 0: thẻ còn trong chồng (lệch + xoay dần về sau).
 */
function cardStyle(index: number, position: number) {
  const d = index - position
  if (d < 0) {
    const e = Math.min(-d, 1)
    return {
      transform: `translate3d(0, ${e * 120}%, 0) rotate(${e * 8}deg)`,
      opacity: e < 0.6 ? 1 : Math.max(0, 1 - (e - 0.6) / 0.4),
      filter: 'none',
    }
  }
  const depth = Math.min(d, 3)
  return {
    transform: `translate3d(${-depth * 26}px, ${-depth * 18}px, 0) rotate(${-depth * 5}deg) scale(${1 - depth * 0.05})`,
    opacity: d <= 2.4 ? 1 : Math.max(0, (3 - d) / 0.6),
    filter: `brightness(${1 - depth * 0.12})`,
  }
}

function cssVars(index: number, position: number): CSSProperties {
  const { transform, opacity, filter } = cardStyle(index, position)
  return { '--card-tf': transform, '--card-op': String(opacity), '--card-filter': filter } as CSSProperties
}

/**
 * "Quy mô xưởng & điểm mạnh" dạng chồng thẻ chạy theo cuộn.
 * Desktop: cột trái (tiêu đề + danh sách) và cột phải (chồng thẻ) cùng dính trong vùng cuộn cao n × 70svh;
 * tiến độ cuộn quyết định thẻ nào ở trên cùng. Mobile & prefers-reduced-motion: thẻ xếp lưới bình thường.
 * Ngoại lệ đã duyệt (REQUIREMENTS mục 6): animation theo cuộn, thẻ bo góc lớn + bóng mềm.
 */
export default function StrengthDeck({
  items,
  header,
  labels,
}: {
  items: readonly Strength[]
  header: ReactNode
  labels: Labels
}) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLLIElement | null)[]>([])
  const [active, setActive] = useState(0)
  const [interactive, setInteractive] = useState(false)
  const count = items.length

  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_QUERY)
    const reduced = window.matchMedia(REDUCED_QUERY)
    let frame = 0

    const update = () => {
      frame = 0
      const section = sectionRef.current
      if (!section) return
      const { top: offset, height } = stageMetrics(stageRef.current)
      const rect = section.getBoundingClientRect()
      const scrollable = rect.height - height
      const progress = scrollable > 0 ? Math.min(Math.max((offset - rect.top) / scrollable, 0), 1) : 0
      const position = progress * (count - 1)
      cardRefs.current.forEach((card, index) => {
        if (!card) return
        const { transform, opacity, filter } = cardStyle(index, position)
        card.style.setProperty('--card-tf', transform)
        card.style.setProperty('--card-op', String(opacity))
        card.style.setProperty('--card-filter', filter)
      })
      setActive((current) => {
        const next = Math.min(Math.round(position), count - 1)
        return next === current ? current : next
      })
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    const sync = () => {
      const enabled = desktop.matches && !reduced.matches
      setInteractive(enabled)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (enabled) {
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onScroll)
        update()
      }
    }

    sync()
    desktop.addEventListener('change', sync)
    reduced.addEventListener('change', sync)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      desktop.removeEventListener('change', sync)
      reduced.removeEventListener('change', sync)
    }
  }, [count])

  /** Cuộn tới vị trí để thẻ thứ index nằm trên cùng */
  function goTo(index: number) {
    const section = sectionRef.current
    if (!section) return
    const { top: offset, height } = stageMetrics(stageRef.current)
    const rect = section.getBoundingClientRect()
    const scrollable = rect.height - height
    const sectionTop = window.scrollY + rect.top
    const target = sectionTop - offset + (index / (count - 1)) * scrollable + 1
    const smooth = !window.matchMedia(REDUCED_QUERY).matches
    window.scrollTo({ top: target, behavior: smooth ? 'smooth' : 'auto' })
  }

  return (
    <div
      ref={sectionRef}
      style={{ '--deck-h': `calc(${STAGE_H} + ${(count - 1) * STEP_SVH}svh)`, '--stage-h': STAGE_H, '--stage-top': STAGE_TOP } as CSSProperties}
      className="lg:h-(--deck-h) motion-reduce:lg:h-auto"
    >
      <div
        ref={stageRef}
        className="grid grid-cols-1 gap-10 lg:sticky lg:top-(--stage-top) lg:h-(--stage-h) lg:grid-cols-12 lg:items-center lg:gap-8 motion-reduce:lg:static motion-reduce:lg:h-auto"
      >
        {/* Cột trái: tiêu đề + danh sách điểm mạnh (điều hướng chồng thẻ) */}
        <div className="lg:col-span-5">
          {header}
          <ol aria-label={labels.listLabel} className="mt-8 hidden border-t border-line lg:block motion-reduce:lg:hidden">
            {items.map((item, index) => {
              const isActive = index === active
              return (
                <li key={item.title} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => goTo(index)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`group flex min-h-13 w-full items-center gap-4 text-left text-lg transition-colors duration-200 ${isActive ? 'font-bold text-navy' : 'font-medium text-muted hover:text-ink'
                      }`}
                  >
                    <span
                      aria-hidden
                      className={`h-0.5 shrink-0 transition-[width] duration-300 ${isActive ? 'w-8 bg-accent' : 'w-3 bg-line-strong'}`}
                    />
                    {item.title}
                  </button>
                </li>
              )
            })}
          </ol>
        </div>

        {/* Cột phải: chồng thẻ */}
        {/* Chồng thẻ dời sát về phía danh sách; pl chừa chỗ cho các thẻ phía sau xoè sang trái */}
        <div className="lg:col-span-6 lg:col-start-7 lg:flex lg:justify-start lg:pl-16">
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:relative lg:block lg:h-[31rem] lg:w-[23.75rem] motion-reduce:lg:grid motion-reduce:lg:h-auto motion-reduce:lg:w-auto">
            {items.map((item, index) => {
              const hidden = interactive && index !== active
              return (
                <li
                  key={item.title}
                  ref={(node) => {
                    cardRefs.current[index] = node
                  }}
                  inert={hidden}
                  aria-hidden={hidden ? true : undefined}
                  style={{ ...cssVars(index, 0), zIndex: count - index }}
                  className="lg:absolute lg:inset-x-0 lg:top-0 lg:[filter:var(--card-filter)] lg:[opacity:var(--card-op)] lg:[transform:var(--card-tf)] lg:will-change-transform motion-reduce:lg:static motion-reduce:lg:[filter:none] motion-reduce:lg:[opacity:1] motion-reduce:lg:[transform:none]"
                >
                  <StrengthCard item={item} labels={labels} />
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

function StrengthCard({ item, labels }: { item: Strength; labels: Labels }) {
  return (
    <article className="flex w-full flex-col overflow-hidden rounded-[20px] bg-navy text-white shadow-[0_24px_48px_-20px_rgb(11_42_74/0.55)]">
      {/* Thẻ cao theo nội dung (không kéo giãn) → nút nằm ngay dưới mô tả, không thừa khoảng trống */}
      {/* Ảnh có watermark → khung đúng tỉ lệ gốc (không dải trắng), object-contain, KHÔNG phủ chữ/gradient (R1) */}
      <div className="relative shrink-0 bg-white" style={{ aspectRatio: imageRatio(item.image) }}>
        <Image src={item.image} alt={item.imageAlt} fill sizes="(min-width:1024px) 380px, (min-width:640px) 50vw, 100vw" className="object-contain" />
      </div>
      <div className="flex flex-col p-6">
        <h3 className="text-[1.5rem] leading-tight font-bold tracking-[-0.015em]">{item.title}</h3>
        {item.text && <p className="mt-2 text-[0.9375rem] leading-6 text-white/85">{item.text}</p>}
        <div className="pt-6">
          <QuoteButton className="btn btn-accent btn-sm">
            {labels.requestQuote} <IconArrowRight className="size-5" />
          </QuoteButton>
        </div>
      </div>
    </article>
  )
}
