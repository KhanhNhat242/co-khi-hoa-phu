'use client'

import { useActionState, useEffect, useId, useRef, useState } from 'react'
import { submitQuote, type QuoteField, type QuoteState } from '@/lib/actions'
import type { Locale } from '@/lib/i18n'
import { IconCheck } from '@/components/ui/Icons'

export type FormLabels = {
  name: string; phone: string; email: string; company: string; product: string
  quantity: string; province: string; message: string; messagePlaceholder: string
  submit: string; submitting: string; successTitle: string; successText: string; again: string
}

type Props = {
  lang: Locale
  labels: FormLabels
  defaultProduct?: string
  /** Bố cục 2 cột trên màn hình rộng */
  twoCol?: boolean
  onAgain?: () => void
}

const initial: QuoteState = { status: 'idle' }

/** Form "Yêu cầu báo giá" — Conversion-Optimized (REQUIREMENTS mục 6): ô 48px, focus 3px, lỗi cạnh trường */
export default function QuoteForm(props: Omit<Props, 'onAgain'>) {
  const [round, setRound] = useState(0)
  return <QuoteFormInner key={round} {...props} onAgain={() => setRound((r) => r + 1)} />
}

function QuoteFormInner({ lang, labels, defaultProduct = '', twoCol = true, onAgain }: Props) {
  const [state, action, pending] = useActionState(submitQuote, initial)
  const uid = useId()
  const formRef = useRef<HTMLFormElement>(null)
  const successRef = useRef<HTMLDivElement>(null)

  // Accessible: lỗi → đưa focus về trường lỗi đầu tiên; thành công → focus thông báo
  useEffect(() => {
    if (state.status === 'error') {
      formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
    }
    if (state.status === 'success') successRef.current?.focus()
  }, [state])

  if (state.status === 'success') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="fade-in flex flex-col items-start gap-4 rounded-sm border-2 border-success bg-success-50 p-6 outline-none"
      >
        <span className="grid size-12 place-items-center rounded-xs bg-success text-white">
          <IconCheck className="size-6" />
        </span>
        <h3 className="text-xl leading-7 font-bold text-navy">{labels.successTitle}</h3>
        <p className="text-ink">{labels.successText}</p>
        <button type="button" className="btn btn-outline btn-sm" onClick={onAgain}>
          {labels.again}
        </button>
      </div>
    )
  }

  const v = state.values ?? {}
  const err = state.errors ?? {}
  const span2 = twoCol ? 'sm:col-span-2' : ''

  const field = (
    name: QuoteField,
    opts: {
      required?: boolean; type?: string; full?: boolean; textarea?: boolean; placeholder?: string
      defaultValue?: string; inputMode?: 'tel' | 'email' | 'numeric'; autoComplete?: string
    } = {},
  ) => {
    const id = `${uid}-${name}`
    const error = err[name]
    const common = {
      id,
      name,
      defaultValue: v[name] ?? opts.defaultValue,
      'aria-invalid': Boolean(error),
      'aria-describedby': error ? `${id}-err` : undefined,
      'aria-required': opts.required || undefined,
      className: 'field',
    }
    return (
      <div className={opts.full ? span2 : ''}>
        <label htmlFor={id} className="mb-2 block text-[0.9375rem] leading-6 font-semibold text-navy">
          {labels[name]}
          {opts.required && <span className="text-danger" aria-hidden> *</span>}
        </label>
        {opts.textarea ? (
          <textarea {...common} rows={4} placeholder={opts.placeholder} className="field resize-y" />
        ) : (
          <input
            {...common}
            type={opts.type ?? 'text'}
            inputMode={opts.inputMode}
            autoComplete={opts.autoComplete}
          />
        )}
        {error && (
          <p id={`${id}-err`} className="mt-2 flex items-center gap-2 text-sm leading-5 font-medium text-danger">
            <span aria-hidden className="grid size-4 shrink-0 place-items-center rounded-full bg-danger text-[10px] font-bold text-white">!</span>
            {error}
          </p>
        )}
      </div>
    )
  }

  return (
    <form ref={formRef} action={action} noValidate className={`grid grid-cols-1 gap-6 ${twoCol ? 'sm:grid-cols-2 sm:gap-x-6' : ''}`}>
      <input type="hidden" name="lang" value={lang} />
      {state.status === 'error' && state.message && (
        <p className={`rounded-xs border-l-4 border-danger bg-danger-50 px-4 py-3 text-[0.9375rem] font-medium text-danger ${span2}`} role="alert">
          {state.message}
        </p>
      )}
      {field('name', { required: true, autoComplete: 'name' })}
      {field('phone', { required: true, type: 'tel', inputMode: 'tel', autoComplete: 'tel' })}
      {field('email', { type: 'email', inputMode: 'email', autoComplete: 'email' })}
      {field('company', { autoComplete: 'organization' })}
      {field('product', { full: !twoCol, defaultValue: defaultProduct })}
      {field('quantity', { inputMode: 'numeric' })}
      {field('province', { full: true, autoComplete: 'address-level1' })}
      {field('message', { full: true, textarea: true, placeholder: labels.messagePlaceholder })}
      <div className={span2}>
        <button type="submit" disabled={pending} aria-busy={pending} className="btn btn-accent h-14 w-full text-[1.0625rem]">
          {pending && (
            <span aria-hidden className="spin size-5 rounded-full border-2 border-navy border-t-transparent" />
          )}
          {pending ? labels.submitting : labels.submit}
        </button>
      </div>
    </form>
  )
}
