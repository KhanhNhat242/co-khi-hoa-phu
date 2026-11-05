'use client'

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import dynamic from 'next/dynamic'
import type { FormLabels } from './QuoteForm'
import type { QuoteTarget } from './QuoteDrawer'
import type { Locale } from '@/lib/i18n'

const QuoteDrawer = dynamic(() => import('./QuoteDrawer'), { ssr: false })

const QuoteContext = createContext<(target?: QuoteTarget) => void>(() => {})

export const useQuote = () => useContext(QuoteContext)

type Props = {
  lang: Locale
  labels: { form: FormLabels; title: string; lead: string; selected: string; close: string }
  children: ReactNode
}

export default function QuoteProvider({ lang, labels, children }: Props) {
  const [open, setOpen] = useState(false)
  const [used, setUsed] = useState(false)
  const [target, setTarget] = useState<QuoteTarget>(null)
  const [round, setRound] = useState(0)

  const openQuote = useCallback((t: QuoteTarget = null) => {
    setTarget(t)
    setRound((r) => r + 1)
    setUsed(true)
    setOpen(true)
  }, [])

  return (
    <QuoteContext.Provider value={openQuote}>
      {children}
      {used && (
        <QuoteDrawer
          open={open}
          onClose={() => setOpen(false)}
          target={target}
          round={round}
          lang={lang}
          labels={labels}
        />
      )}
    </QuoteContext.Provider>
  )
}
