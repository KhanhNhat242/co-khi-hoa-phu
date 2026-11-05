'use server'

import vi from '@/dictionaries/vi.json'
import en from '@/dictionaries/en.json'

export type QuoteField =
  | 'name' | 'phone' | 'email' | 'company' | 'product' | 'quantity' | 'province' | 'message'

export type QuoteState = {
  status: 'idle' | 'error' | 'success'
  errors?: Partial<Record<QuoteField, string>>
  message?: string
  values?: Partial<Record<QuoteField, string>>
}

const PHONE = /^(\+?84|0)\d{9,10}$/
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Nhận yêu cầu báo giá — validate phía server (AGENTS.md → R7).
 * TODO(khach): kênh nhận lead (email / Google Sheet / Zalo OA). Giai đoạn demo chỉ ghi log,
 *   KHÔNG gửi email.
 */
export async function submitQuote(_prev: QuoteState, formData: FormData): Promise<QuoteState> {
  const dict = formData.get('lang') === 'en' ? en.form : vi.form
  const get = (k: QuoteField) => String(formData.get(k) ?? '').trim().slice(0, 2000)

  const values = {
    name: get('name'), phone: get('phone'), email: get('email'), company: get('company'),
    product: get('product'), quantity: get('quantity'), province: get('province'), message: get('message'),
  }

  const errors: QuoteState['errors'] = {}
  if (!values.name) errors.name = dict.errRequired
  if (!values.phone) errors.phone = dict.errRequired
  else if (!PHONE.test(values.phone.replace(/[\s.\-()]/g, ''))) errors.phone = dict.errPhone
  if (values.email && !EMAIL.test(values.email)) errors.email = dict.errEmail

  if (Object.keys(errors).length > 0) {
    return { status: 'error', errors, message: dict.errGeneral, values }
  }

  console.info('[quote-request]', JSON.stringify(values))
  return { status: 'success' }
}
