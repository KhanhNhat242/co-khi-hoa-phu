'use client'

import { useState } from 'react'
import Image from 'next/image'

type Props = {
  logos: string[]
  rows?: number
  labels: { pause: string; play: string; region: string }
}

/**
 * Carousel logo đối tác nhiều hàng, tự cuộn ngang xen kẽ chiều (hàng lẻ: phải → trái, hàng chẵn: trái → phải).
 * Ngoại lệ đã duyệt (REQUIREMENTS mục 6): thẻ bo góc + bóng mềm, marquee.
 * Accessible: có nút tạm dừng; dừng khi hover/focus; tắt chuyển động khi prefers-reduced-motion.
 * Nội dung lặp lần 2 chỉ để nối vòng → aria-hidden.
 */
export default function PartnerMarquee({ logos, rows = 3, labels }: Props) {
  const [paused, setPaused] = useState(false)

  // Chia đều logo vào các hàng (xen kẽ để mỗi hàng có logo khác nhau)
  const lines = Array.from({ length: rows }, (_, r) => logos.filter((_, i) => i % rows === r))

  return (
    <div
      className={`partner-marquee relative ${paused ? 'is-paused' : ''}`}
      role="region"
      aria-label={labels.region}
    >
      <div className="flex flex-col gap-2 lg:gap-3">
        {lines.map((line, r) => (
          <div
            key={r}
            className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)] py-3"
          >
            <ul
              className={`marquee-row flex w-max gap-3 lg:gap-4 ${r % 2 === 0 ? 'marquee-rtl' : 'marquee-ltr'}`}
              style={{ animationDuration: `${line.length * 4.5}s` }}
            >
              {[...line, ...line].map((src, i) => (
                <li
                  key={i}
                  aria-hidden={i >= line.length || undefined}
                  className="grid size-24 shrink-0 place-items-center rounded-[14px] bg-white p-3 shadow-[0_6px_20px_-10px_rgb(11_42_74/0.22)] lg:size-28"
                >
                  <Image src={src} alt="" width={157} height={61} className="h-auto max-h-14 w-full object-contain" unoptimized />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container-x mt-6 flex justify-center">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          className="inline-flex min-h-11 items-center gap-2 rounded-xs border border-line-strong bg-white px-4 text-sm font-semibold text-navy transition-colors hover:border-navy"
        >
          {paused ? (
            <svg viewBox="0 0 24 24" className="size-4" aria-hidden fill="currentColor"><path d="M7 5v14l12-7z" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" className="size-4" aria-hidden fill="currentColor"><rect x="6" y="5" width="4" height="14" /><rect x="14" y="5" width="4" height="14" /></svg>
          )}
          {paused ? labels.play : labels.pause}
        </button>
      </div>
    </div>
  )
}
