import 'server-only'
import { noOrphan, type Locale } from './i18n'
import vi from '@/dictionaries/vi.json'
import en from '@/dictionaries/en.json'

export type Dictionary = typeof vi

function deepNoOrphan<T>(value: T): T {
  if (typeof value === 'string') return noOrphan(value) as T
  if (Array.isArray(value)) return value.map(deepNoOrphan) as T
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, deepNoOrphan(v)]),
    ) as T
  }
  return value
}

const cache: Record<Locale, Dictionary> = {
  vi: deepNoOrphan(vi),
  en: deepNoOrphan(en as Dictionary),
}

export const getDictionary = (lang: Locale): Dictionary => cache[lang]
