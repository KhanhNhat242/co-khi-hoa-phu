'use client'

import Image from 'next/image'
import { ConfigProvider, Drawer } from 'antd'
import QuoteForm, { type FormLabels } from './QuoteForm'
import type { Locale } from '@/lib/i18n'
import { IconClose } from '@/components/ui/Icons'

export type QuoteTarget = { name: string; image?: string } | null

type Props = {
  open: boolean
  onClose: () => void
  target: QuoteTarget
  round: number
  lang: Locale
  labels: { form: FormLabels; title: string; lead: string; selected: string; close: string }
}

/** Theme antd dùng chung tokens (R6): bo 2px, animation ≤ 200ms */
const theme = {
  token: {
    colorPrimary: '#1E4E8C',
    colorText: '#1A1F2B',
    colorBorder: '#DDE2EA',
    borderRadius: 2,
    boxShadow: 'none',
    boxShadowSecondary: 'none',
    motionDurationFast: '0.1s',
    motionDurationMid: '0.15s',
    motionDurationSlow: '0.2s',
    fontFamily: 'var(--font-inter), system-ui, sans-serif',
  },
}

/**
 * Ngăn kéo báo giá trượt từ phải (antd Drawer). Chỉ được tải phía client khi mở lần đầu
 * (next/dynamic, ssr:false) — antd dùng Date.now() khi render nên không prerender được.
 */
export default function QuoteDrawer({ open, onClose, target, round, lang, labels }: Props) {
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return (
    <ConfigProvider theme={{ ...theme, token: { ...theme.token, motion: !reduce } }}>
      <Drawer
        open={open}
        onClose={onClose}
        placement="right"
        size={480}
        closable={false}
        destroyOnHidden
        styles={{ body: { padding: 0 } }}
        title={null}
        aria-labelledby="quote-drawer-title"
      >
        <div className="flex min-h-full flex-col">
          <div className="flex items-start justify-between gap-4 border-b-4 border-accent bg-navy px-6 py-6 text-white">
            <div>
              <p id="quote-drawer-title" className="text-xl leading-7 font-bold">{labels.title}</p>
              <p className="mt-2 text-[0.9375rem] leading-6 text-white/85">{labels.lead}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={labels.close}
              className="grid size-11 shrink-0 place-items-center rounded-xs border border-white/40 transition-colors hover:border-white hover:bg-white hover:text-navy"
            >
              <IconClose className="size-5" />
            </button>
          </div>
          {target && (
            <div className="flex items-center gap-4 border-b border-line bg-surface px-6 py-4">
              {target.image && (
                // Ảnh thu nhỏ: object-contain, không đè gì lên ảnh (R1)
                <div className="machine-frame w-24 shrink-0 rounded-xs border border-line bg-white">
                  <Image src={target.image} alt={target.name} fill sizes="96px" />
                </div>
              )}
              <div>
                <p className="t-label text-steel">{labels.selected}</p>
                <p className="mt-1 font-semibold text-navy">{target.name}</p>
              </div>
            </div>
          )}
          <div className="px-6 py-6">
            <QuoteForm key={round} lang={lang} labels={labels.form} defaultProduct={target?.name ?? ''} twoCol={false} />
          </div>
        </div>
      </Drawer>
    </ConfigProvider>
  )
}
