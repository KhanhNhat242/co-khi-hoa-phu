import { NextResponse, type NextRequest } from 'next/server'

const locales = ['vi', 'en']
const defaultLocale = 'vi'

/** Chuyển hướng URL chưa có tiền tố ngôn ngữ về /vi (mặc định) hoặc /en theo trình duyệt */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))
  if (hasLocale) return

  const accept = request.headers.get('accept-language') ?? ''
  const prefersEn = /^en\b/i.test(accept.trim()) && !/\bvi\b/i.test(accept)
  const locale = prefersEn ? 'en' : defaultLocale

  request.nextUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  // Bỏ qua _next, api và mọi file tĩnh (có dấu chấm: ảnh, icon, robots.txt, sitemap.xml…)
  matcher: ['/((?!_next|api|.*\\..*).*)'],
}
