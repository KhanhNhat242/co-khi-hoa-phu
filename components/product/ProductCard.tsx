import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/data/products'
import { plainText, t, type Locale } from '@/lib/i18n'
import QuoteButton from '@/components/quote/QuoteButton'

export type CardLabels = { new: string; used: string; requestQuote: string; viewSpecs: string }

type Props = {
  product: Product
  lang: Locale
  /** Không còn hiển thị trên thẻ (khách bỏ thẻ tag 2026-11-09) — giữ để các nơi gọi không phải sửa */
  categoryName?: string
  labels: CardLabels
  priority?: boolean
}

/**
 * Thẻ sản phẩm (bố cục theo ảnh mẫu khách gửi 2026-11-09): thẻ trắng bo góc, ảnh trên ô nền xám
 * (KHÔNG đè gì lên ảnh, R1), tên + hãng/model,
 * 2 dòng thông số, nút "Yêu cầu báo giá" (không giá, R4). Tên & ảnh dẫn tới trang chi tiết.
 */
export default function ProductCard({ product, lang, labels, priority }: Props) {
  const name = t(product.name, lang)
  const href = `/${lang}/san-pham/${product.slug}`
  const cover = product.images[0]
  // Góc phải: hãng; nếu không có hãng thì model — trừ khi tên máy đã chứa model (tránh lặp)
  const maker =
    product.brand ?? (product.model && !plainText(name).includes(product.model) ? product.model : undefined)

  return (
    <article className="card-lift group flex h-full flex-col rounded-[14px] border border-line bg-white p-3 shadow-[0_12px_28px_-22px_rgb(11_42_74/0.45)]">
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden rounded-[10px] bg-surface" tabIndex={-1} aria-hidden>
        <Image
          src={cover.src}
          alt=""
          fill
          sizes="(min-width:1280px) 300px, (min-width:640px) 45vw, 100vw"
          priority={priority}
          className="object-contain p-2"
        />
      </Link>

      <div className="flex flex-1 flex-col px-1 pt-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="min-w-0 text-base leading-6 font-bold text-navy">
            <Link href={href} className="underline-offset-4 hover:underline">{name}</Link>
          </h3>
          {maker && <span className="shrink-0 pt-0.5 text-[0.9375rem] leading-6 font-bold text-navy">{maker}</span>}
        </div>

        <p className="mt-3 text-sm leading-5 text-muted">{product.highlights.map((h) => t(h, lang)).join(' · ')}</p>

        <div className="mt-auto pt-4">
          <QuoteButton
            product={name}
            image={cover.src}
            className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-accent px-4 text-sm font-semibold text-navy transition-colors hover:bg-amber"
          >
            {labels.requestQuote}
          </QuoteButton>
        </div>
      </div>
    </article>
  )
}
