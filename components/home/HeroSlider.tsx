'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IconArrowLeft, IconArrowRight } from '@/components/ui/Icons'
import ConditionBadge from '@/components/product/ConditionBadge'
import type { Condition } from '@/data/products'

export type Slide = { src: string; name: string; href: string; condition: Condition; brand?: string }

type Props = {
  slides: Slide[]
  labels: { slideLabel: string; prev: string; next: string; pause: string; play: string; new: string; used: string }
}

const INTERVAL = 6000

/**
 * Slider hero — Flat, ảnh NGUYÊN VẸN (4:3 contain, không chữ đè lên ảnh — R1).
 * Accessible: có nút tạm dừng, dừng khi hover/focus, không tự chạy khi prefers-reduced-motion.
 */
export default function HeroSlider({ slides, labels }: Props) {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [hold, setHold] = useState(false)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const go = useCallback((i: number) => setIndex((i + slides.length) % slides.length), [slides.length])
  const auto = playing && !hold && !reduced && slides.length > 1

  useEffect(() => {
    if (!auto) return
    const id = setTimeout(() => setIndex((i) => (i + 1) % slides.length), INTERVAL)
    return () => clearTimeout(id)
  }, [auto, index, slides.length])

  const s = slides[index]
  const ctrl = 'grid size-11 shrink-0 place-items-center rounded-xs border border-line-strong bg-white text-navy transition-colors hover:border-navy hover:bg-navy hover:text-white'

  return (
    <section
      className="w-full max-w-[560px]"
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocusCapture={() => setHold(true)}
      onBlurCapture={() => setHold(false)}
      aria-roledescription="carousel"
      aria-label={labels.slideLabel}
    >
      <div className="rounded-sm border border-line bg-white">
        <div className="flex min-h-12 items-center justify-between gap-3 border-b border-line px-4">
          <p className="text-sm font-semibold text-muted">
            {labels.slideLabel}{' '}
            <span className="text-navy tabular-nums">{index + 1}/{slides.length}</span>
          </p>
          <ConditionBadge condition={s.condition} labels={labels} />
        </div>

        <div className="relative aspect-[4/3] bg-white" aria-live={auto ? 'off' : 'polite'}>
          <Image
            key={s.src}
            src={s.src}
            alt={s.name}
            fill
            priority={index === 0}
            sizes="(min-width:1024px) 560px, 92vw"
            className="fade-in object-contain"
          />
        </div>

        <div className="flex items-center gap-2 border-t border-line px-4 py-2">
          <Link href={s.href} className="min-w-0 flex-1 truncate py-2 font-semibold text-navy underline-offset-4 hover:underline">
            {s.name}
          </Link>
          <button type="button" onClick={() => setPlaying((p) => !p)} aria-label={playing ? labels.pause : labels.play} aria-pressed={!playing} className={ctrl}>
            {playing ? (
              <svg viewBox="0 0 24 24" className="size-4" aria-hidden fill="currentColor"><rect x="6" y="5" width="4" height="14" /><rect x="14" y="5" width="4" height="14" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" className="size-4" aria-hidden fill="currentColor"><path d="M7 5v14l12-7z" /></svg>
            )}
          </button>
          <button type="button" onClick={() => go(index - 1)} aria-label={labels.prev} className={ctrl}>
            <IconArrowLeft className="size-5" />
          </button>
          <button type="button" onClick={() => go(index + 1)} aria-label={labels.next} className={ctrl}>
            <IconArrowRight className="size-5" />
          </button>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-3 gap-2">
        {slides.map((sl, i) => (
          <button
            key={sl.src}
            type="button"
            onClick={() => go(i)}
            aria-label={sl.name}
            aria-pressed={i === index}
            className={`relative aspect-[4/3] rounded-xs border-2 bg-white transition-colors ${
              i === index ? 'border-navy' : 'border-line hover:border-line-strong'
            }`}
          >
            <Image src={sl.src} alt="" fill sizes="180px" className="object-contain p-1" />
          </button>
        ))}
      </div>
    </section>
  )
}
