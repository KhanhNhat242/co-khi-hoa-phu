'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ytEmbed, ytThumb, ytWatch } from '@/data/videos'
import { IconClose, IconPlay } from '@/components/ui/Icons'

type Item = { id: string; title: string }

type Props = {
  videos: Item[]
  labels: { play: string; close: string; openYoutube: string; dialogLabel: string }
}

/**
 * Lưới video 4×2 + trình phát YouTube nhúng trong <dialog> (không mở tab mới).
 * - iframe chỉ được tải khi người dùng bấm (hiệu năng), domain youtube-nocookie (riêng tư).
 * - <dialog> native: Esc để đóng, focus được giữ trong hộp thoại, đóng là dừng video (gỡ iframe).
 * - Thumbnail có watermark: object-contain, KHÔNG đè nút play lên ảnh (R1) — biểu tượng play nằm ở thanh chữ.
 */
export default function VideoGallery({ videos, labels }: Props) {
  const [active, setActive] = useState<Item | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const openerRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const d = dialogRef.current
    if (!d) return
    if (active && !d.open) d.showModal()
    if (!active && d.open) d.close()
  }, [active])

  const close = () => {
    setActive(null)
    openerRef.current?.focus()
  }

  return (
    <>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {videos.map((v) => (
          <li key={v.id}>
            <button
              type="button"
              onClick={(e) => {
                openerRef.current = e.currentTarget
                setActive(v)
              }}
              className="card-lift group flex h-full w-full flex-col rounded-[14px] bg-navy p-2.5 text-left text-white shadow-[0_16px_32px_-20px_rgb(11_42_74/0.6)]"
            >
              {/* Thẻ kiểu "poster" theo ảnh mẫu khách gửi: ảnh bo góc trong khung tối, tên lớn, hàng thông tin phụ.
                  Thumbnail có watermark → contain trên nền đen, không đè gì lên ảnh (R1) */}
              <span className="relative block aspect-video overflow-hidden rounded-[10px] bg-black">
                <Image src={ytThumb(v.id)} alt="" fill sizes="(min-width:1024px) 300px, (min-width:640px) 50vw, 100vw" className="object-contain" />
              </span>
              <span className="flex flex-1 flex-col px-1.5 pt-3 pb-1">
                <span className="line-clamp-2 text-lg leading-6 font-semibold">{v.title}</span>
                <span className="mt-auto flex items-center justify-between gap-3 pt-3 text-sm text-white/75">
                  <span>{labels.play}</span>
                  <span aria-hidden className="grid size-8 place-items-center rounded-full bg-accent text-navy transition-transform duration-200 group-hover:scale-110">
                    <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                  </span>
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={() => active && close()}
        onClick={(e) => {
          if (e.target === e.currentTarget) close() // bấm ra ngoài khung để đóng
        }}
        aria-label={active ? `${labels.dialogLabel}: ${active.title}` : labels.dialogLabel}
        className="m-auto w-[min(1120px,calc(100vw-32px))] max-w-none bg-transparent p-0 backdrop:bg-navy-950/90"
      >
        {active && (
          <div className="fade-in rounded-sm bg-navy-950 text-white">
            <div className="flex items-center gap-4 border-b border-white/20 px-4 py-3">
              <IconPlay className="size-5 shrink-0" />
              <p className="min-w-0 flex-1 truncate font-semibold">{active.title}</p>
              <a
                href={ytWatch(active.id)}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden text-sm text-white/85 underline underline-offset-4 hover:text-white sm:inline"
              >
                {labels.openYoutube}
              </a>
              <button
                type="button"
                onClick={close}
                aria-label={labels.close}
                autoFocus
                className="grid size-11 shrink-0 place-items-center rounded-xs border border-white/40 transition-colors hover:border-white hover:bg-white hover:text-navy"
              >
                <IconClose className="size-5" />
              </button>
            </div>
            <div className="aspect-video bg-black">
              <iframe
                key={active.id}
                src={ytEmbed(active.id)}
                title={active.title}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                className="size-full"
              />
            </div>
          </div>
        )}
      </dialog>
    </>
  )
}
