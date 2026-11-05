import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/data/products'
import { t, type Locale } from '@/lib/i18n'
import QuoteButton from '@/components/quote/QuoteButton'
import ConditionBadge from './ConditionBadge'

export type CardLabels = { new: string; used: string; requestQuote: string; viewSpecs: string }

type Props = {
  product: Product
  lang: Locale
  categoryName: string
  labels: CardLabels
  priority?: boolean
}

/**
 * Thẻ sản phẩm — Flat: viền 1px, bo 4px, không shadow; hover nhấc thẻ 4px (ảnh giữ nguyên).
 * Thanh trạng thái TRÊN ảnh, không đè lên ảnh (R1); nút báo giá trên mọi thẻ (R4).
 */
export default function ProductCard({ product, lang, categoryName, labels, priority }: Props) {
  const name = t(product.name, lang)
  const href = `/${lang}/san-pham/${product.slug}`
  const cover = product.images[0]

  return (
    <article className="card-lift flex h-full flex-col rounded-sm border border-line bg-white">
      <div className="flex min-h-12 items-center justify-between gap-3 border-b border-line px-4">
        <ConditionBadge condition={product.condition} labels={labels} />
        {(product.brand || product.model) && (
          <span className="truncate text-sm font-semibold text-muted">{product.brand ?? product.model}</span>
        )}
      </div>

      <Link href={href} className="machine-frame block" tabIndex={-1} aria-hidden>
        <Image
          src={cover.src}
          alt=""
          fill
          sizes="(min-width:1280px) 300px, (min-width:768px) 45vw, 100vw"
          priority={priority}
        />
      </Link>

      <div className="flex flex-1 flex-col border-t border-line p-4 lg:p-6">
        <p className="text-sm leading-5 font-medium text-steel">{categoryName}</p>
        <h3 className="mt-2 text-lg leading-6 font-bold text-navy">
          <Link href={href} className="underline-offset-4 hover:underline">{name}</Link>
        </h3>
        <ul className="mt-4 space-y-2 border-t border-line pt-4 text-[0.9375rem] leading-6 text-muted">
          {product.highlights.map((h, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-[0.6875rem] h-0.5 w-2 shrink-0 bg-navy" aria-hidden />
              <span>{t(h, lang)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto grid grid-cols-1 gap-2 pt-6">
          <QuoteButton product={name} image={cover.src} className="btn btn-accent btn-sm w-full">
            {labels.requestQuote}
          </QuoteButton>
          <Link href={href} className="btn btn-outline btn-sm w-full">
            {labels.viewSpecs}
          </Link>
        </div>
      </div>
    </article>
  )
}
