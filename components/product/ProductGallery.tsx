'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { ProductImage } from '@/data/products'

/** Gallery chi tiết máy — ảnh 4:3 object-contain, không overlay (R1), chuyển ảnh 200ms */
export default function ProductGallery({ images, alt }: { images: ProductImage[]; alt: string }) {
  const [active, setActive] = useState(0)
  const img = images[active]
  return (
    <div>
      <div className="machine-frame rounded-sm border border-line bg-white">
        <Image key={img.src} src={img.src} alt={alt} fill priority sizes="(min-width:1024px) 600px, 100vw" className="fade-in" />
      </div>
      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-2">
          {images.map((im, i) => (
            <button
              key={im.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`${alt} ${i + 1}`}
              aria-pressed={i === active}
              className={`machine-frame rounded-xs border-2 bg-white transition-colors ${
                i === active ? 'border-navy' : 'border-line hover:border-line-strong'
              }`}
            >
              <Image src={im.src} alt="" fill sizes="140px" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
