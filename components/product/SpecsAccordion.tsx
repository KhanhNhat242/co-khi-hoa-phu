'use client'

import { useId, useState } from 'react'

type Props = { title: string; specs: [string, string][] }

/**
 * Thông số kỹ thuật dạng thanh thu gọn (ảnh mẫu khách gửi 2026-11-06) — cột phải trang chi tiết máy.
 * Bấm thanh tiêu đề: nội dung trượt mở (grid-rows 0fr → 1fr, 300ms), dấu + xoay thành −.
 * Nội dung luôn có trong HTML (SEO); khi đóng thì `inert` để bàn phím/trình đọc màn hình bỏ qua.
 */
export default function SpecsAccordion({ title, specs }: Props) {
  const [open, setOpen] = useState(false)
  const id = useId()

  return (
    <div className="border-b border-line-strong">
      <h2>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((o) => !o)}
          className="flex min-h-14 w-full items-center justify-between gap-4 py-3 text-left text-xl leading-7 font-semibold text-navy"
        >
          {title}
          <span aria-hidden className="relative size-4 shrink-0">
            <span className="absolute top-1/2 left-0 h-0.5 w-4 -translate-y-1/2 bg-current" />
            <span
              className={`absolute top-0 left-1/2 h-4 w-0.5 -translate-x-1/2 bg-current transition-transform duration-300 ease-out ${
                open ? 'scale-y-0 rotate-90' : ''
              }`}
            />
          </span>
        </button>
      </h2>

      <div
        id={id}
        role="region"
        aria-label={title}
        inert={!open}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden">
          {/* Data-Dense: hàng gọn, nhãn đậm : giá trị */}
          <dl className="pb-5 text-[0.9375rem] leading-6">
            {specs.map(([k, v]) => (
              <div key={k} className="flex flex-wrap gap-x-1.5 border-t border-line py-2">
                <dt className="font-semibold text-navy">{k}:</dt>
                <dd className="text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
