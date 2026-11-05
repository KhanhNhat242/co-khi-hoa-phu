'use client'

import type { ReactNode } from 'react'
import { useQuote } from './QuoteProvider'
import { plainText } from '@/lib/i18n'

type Props = {
  product?: string
  image?: string
  className?: string
  children: ReactNode
}

/** Nút "Yêu cầu báo giá" — mở drawer trượt, tự điền tên máy (AGENTS.md → R4) */
export default function QuoteButton({ product, image, className = 'btn btn-accent', children }: Props) {
  const open = useQuote()
  return (
    <button
      type="button"
      className={className}
      onClick={() => open(product ? { name: plainText(product), image } : null)}
    >
      {children}
    </button>
  )
}
