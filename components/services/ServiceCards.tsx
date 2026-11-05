'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import QuoteButton from '@/components/quote/QuoteButton'
import { IconArrowRight } from '@/components/ui/Icons'

type Card = { title: string; text: string; image: string }
type Props = { cards: Card[]; ctaLabel: string }

/*
 * 3 mảng dịch vụ (ảnh mẫu khách gửi — ngoại lệ mục 6 REQUIREMENTS, kể cả ngoại lệ R1 cho section này).
 * ≥1280px (CSS .svc-* trong globals.css): mặc định ảnh phủ kín thẻ + lớp phủ, tiêu đề/nút chữ trắng đè lên ảnh.
 *   Hover hoặc focus bàn phím (:focus-visible — bấm chuột mở form rồi đóng thì thẻ về mặc định):
 *   thẻ giãn rộng, ảnh chạy sang ô bên phải cao bằng tiêu đề + mô tả, lớp phủ tắt, hiện mô tả.
 *   Chiều cao đó đo từ bản sao ẩn (.svc-card__measure, rộng đúng bằng cột chữ lúc mở) → biến --svc-open-h.
 * <1280px: lưới tĩnh, ảnh contain ở trên + chữ dưới.
 */
export default function ServiceCards({ cards, ctaLabel }: Props) {
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const measures = [...list.querySelectorAll<HTMLElement>('.svc-card__measure')]
    const sync = () => {
      for (const m of measures) {
        const card = m.closest<HTMLElement>('.svc-card')
        if (card && m.offsetHeight) card.style.setProperty('--svc-open-h', `${m.offsetHeight}px`)
      }
    }
    const ro = new ResizeObserver(sync)
    measures.forEach((m) => ro.observe(m))
    document.fonts?.ready.then(sync)
    return () => ro.disconnect()
  }, [])

  return (
    <ul ref={listRef} className="svc-list grid grid-cols-1 gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <li key={card.title} className="svc-card group/card overflow-hidden rounded-[20px] bg-steel-50 ring-1 ring-transparent">
          <div className="svc-card__media relative aspect-[4/3] border-b border-line bg-white">
            <Image
              src={card.image}
              alt=""
              fill
              sizes="(min-width:1280px) 420px, (min-width:768px) 33vw, 100vw"
              className="svc-card__img object-contain"
            />
            <span aria-hidden className="svc-card__shade hidden" />
          </div>

          {/* bản sao ẩn để đo chiều cao tiêu đề + mô tả lúc thẻ mở (chỉ ≥1280px) */}
          <div aria-hidden className="svc-card__measure hidden">
            <p className="text-[1.625rem] leading-9 font-bold tracking-[-0.02em] [text-wrap:balance]">{card.title}</p>
            <p className="mt-3 text-[0.9375rem] leading-6">{card.text}</p>
          </div>

          <div className="svc-card__body flex flex-col">
            <div className="flex">
              <div className="min-w-0 flex-1 p-6 pb-0 xl:p-0">
                <h3 className="svc-card__title text-xl leading-7 font-bold text-navy xl:text-[1.625rem] xl:leading-9">
                  {card.title}
                </h3>
                <p className="svc-card__desc mt-3 text-[0.9375rem] leading-6 text-muted">{card.text}</p>
              </div>
              {/* chừa chỗ cho ảnh khi thẻ mở (chỉ ≥1280px) */}
              <div aria-hidden className="svc-card__slot hidden" />
            </div>

            <div className="svc-card__cta mt-auto p-6 pt-5 xl:p-0 xl:pt-5">
              <QuoteButton
                product={card.title}
                className="svc-card__btn inline-flex min-h-11 items-center gap-3 rounded-full pr-1 text-[0.9375rem] font-semibold text-navy"
              >
                {ctaLabel}
                <span
                  aria-hidden
                  className="grid size-10 place-items-center rounded-full bg-white text-navy ring-1 ring-line transition-colors duration-300 group-hover/card:bg-accent group-hover/card:ring-accent group-has-[:focus-visible]/card:bg-accent"
                >
                  <IconArrowRight className="size-5 -rotate-45" />
                </span>
              </QuoteButton>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
