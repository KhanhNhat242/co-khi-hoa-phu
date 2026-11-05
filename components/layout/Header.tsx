'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Locale } from '@/lib/i18n'
import QuoteButton from '@/components/quote/QuoteButton'
import { IconClose, IconMenu, IconPhone, IconSearch } from '@/components/ui/Icons'

type NavItem = { href: string; label: string }

type Props = {
  lang: Locale
  brand: string
  tagline: string
  logo: string
  nav: NavItem[]
  phone: { display: string; href: string }
  labels: {
    searchPlaceholder: string; search: string; menu: string; close: string; switchLang: string
    requestQuote: string; openSearch: string
  }
}

/** Header sticky navy — Flat, không shadow; CTA báo giá luôn trong nav (Trust & Authority) */
export default function Header({ lang, brand, tagline, logo, nav, phone, labels }: Props) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  // Đóng menu/tìm kiếm khi chuyển trang
  const [lastPath, setLastPath] = useState(pathname)
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setMenuOpen(false)
    setSearchOpen(false)
  }

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus()
  }, [searchOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchOpen(false)
        setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const isActive = (href: string) =>
    href === `/${lang}` ? pathname === href : pathname === href || pathname.startsWith(href + '/')

  const otherLang: Locale = lang === 'vi' ? 'en' : 'vi'
  const switchHref = pathname.replace(/^\/(vi|en)(?=\/|$)/, `/${otherLang}`) || `/${otherLang}`

  const searchForm = (id: string) => (
    <form action={`/${lang}/san-pham`} role="search" className="flex w-full gap-2">
      <label htmlFor={id} className="sr-only">{labels.search}</label>
      <input
        ref={id === 'q-desktop' ? searchRef : undefined}
        id={id}
        name="q"
        type="search"
        placeholder={labels.searchPlaceholder}
        className="field min-w-0 flex-1"
      />
      <button type="submit" className="btn btn-accent px-4" aria-label={labels.search}>
        <IconSearch className="size-5" />
        <span className="max-sm:sr-only">{labels.search}</span>
      </button>
    </form>
  )

  return (
    <header className="sticky top-0 z-50 border-b border-navy-950 bg-navy text-white">
      <div className="container-x flex h-(--header-h) items-center gap-4 xl:gap-6">
        <Link href={`/${lang}`} className="flex shrink-0 items-center gap-3" aria-label={brand}>
          <span className="grid size-12 place-items-center rounded-xs bg-white p-1">
            <Image src={logo} alt="" width={38} height={39} priority />
          </span>
          <span className="leading-tight">
            <span className="block text-base font-bold tracking-wide uppercase">{brand}</span>
            <span className="block text-sm text-white/80">{tagline}</span>
          </span>
        </Link>

        <nav aria-label="Main" className="ml-auto hidden lg:block">
          <ul className="flex items-center">
            {nav.map((item) => {
              const active = isActive(item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`flex h-(--header-h) items-center border-b-2 px-3 text-[0.9375rem] font-medium whitespace-nowrap transition-colors ${
                      active ? 'border-white text-white' : 'border-transparent text-white/80 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <button
            type="button"
            onClick={() => setSearchOpen((o) => !o)}
            aria-expanded={searchOpen}
            aria-controls="site-search"
            aria-label={labels.openSearch}
            className={`hidden size-11 place-items-center rounded-xs border transition-colors lg:grid ${
              searchOpen ? 'border-white bg-white text-navy' : 'border-white/40 hover:border-white'
            }`}
          >
            {searchOpen ? <IconClose className="size-5" /> : <IconSearch className="size-5" />}
          </button>
          <Link
            href={switchHref}
            hrefLang={otherLang}
            aria-label={labels.switchLang}
            className="flex h-11 items-center rounded-xs border border-white/40 text-sm font-bold transition-colors hover:border-white"
          >
            <span className={`px-2.5 py-2.5 ${lang === 'vi' ? 'bg-white text-navy' : 'text-white/80'}`}>VI</span>
            <span className={`px-2.5 py-2.5 ${lang === 'en' ? 'bg-white text-navy' : 'text-white/80'}`}>EN</span>
          </Link>
          <QuoteButton className="btn btn-accent btn-sm hidden xl:inline-flex">{labels.requestQuote}</QuoteButton>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? labels.close : labels.menu}
            className="grid size-11 place-items-center rounded-xs border border-white/40 lg:hidden"
          >
            {menuOpen ? <IconClose className="size-5" /> : <IconMenu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Thanh tìm kiếm mở rộng (desktop) — micro-interaction */}
      <div id="site-search" hidden={!searchOpen} className="fade-in border-t border-white/20 bg-navy-950">
        <div className="container-x py-4">{searchForm('q-desktop')}</div>
      </div>

      {/* Menu mobile */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="fade-in fixed inset-x-0 top-(--header-h) bottom-0 overflow-y-auto bg-navy-950 lg:hidden"
      >
        <div className="container-x py-6">
          {searchForm('q-mobile')}
          <ul className="mt-6 border-t border-white/20">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-white/20">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={`flex min-h-14 items-center text-lg font-semibold ${isActive(item.href) ? 'text-amber' : 'text-white'}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 grid grid-cols-1 gap-3">
            <QuoteButton className="btn btn-accent w-full">{labels.requestQuote}</QuoteButton>
            <a href={phone.href} className="btn btn-outline-light w-full">
              <IconPhone className="size-5" /> {phone.display}
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
