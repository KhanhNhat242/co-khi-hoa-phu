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

/**
 * Header sticky — 2 trạng thái:
 * - "hero" (trang chủ, khi còn trong vùng #hero): nền trong suốt hoà vào gradient hero, chỉ còn logo + menu dồn trái.
 * - "solid": nền navy đầy đủ (tên công ty, tìm kiếm, VI/EN, nút báo giá).
 * Chuyển trạng thái có animation ≤ 200ms (màu nền, menu trượt bằng flex-grow, nhóm phải hiện dần).
 */
export default function Header({ lang, brand, tagline, logo, nav, phone, labels }: Props) {
  const pathname = usePathname()
  const isHome = pathname === `/${lang}`
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [overHero, setOverHero] = useState(isHome)
  const searchRef = useRef<HTMLInputElement>(null)
  const headerRef = useRef<HTMLElement>(null)

  // Đóng menu/tìm kiếm khi chuyển trang; đặt lại trạng thái hero theo trang
  const [lastPath, setLastPath] = useState(pathname)
  if (lastPath !== pathname) {
    setLastPath(pathname)
    setMenuOpen(false)
    setSearchOpen(false)
    setOverHero(isHome)
  }

  // Theo dõi: header còn nằm trong vùng hero hay đã cuộn qua
  useEffect(() => {
    if (!isHome) return
    const hero = document.getElementById('hero')
    if (!hero) return
    const update = () => {
      const h = headerRef.current?.offsetHeight ?? 72
      setOverHero(hero.getBoundingClientRect().bottom > h + 1)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [isHome, pathname])

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

  const heroMode = isHome && overHero && !menuOpen && !searchOpen

  const isActive = (href: string) =>
    href === `/${lang}` ? pathname === href : pathname === href || pathname.startsWith(href + '/')

  const otherLang: Locale = lang === 'vi' ? 'en' : 'vi'
  const switchHref = pathname.replace(/^\/(vi|en)(?=\/|$)/, `/${otherLang}`) || `/${otherLang}`

  // Nhóm chỉ hiện ở trạng thái solid: ẩn có animation, không nhận focus khi ẩn
  const reveal = heroMode
    ? 'pointer-events-none invisible translate-x-2 opacity-0'
    : 'visible translate-x-0 opacity-100'
  const fx = 'transition-[opacity,transform,visibility,max-width] duration-200 ease-out'

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

  const outline = heroMode ? 'border-navy/30 hover:border-navy' : 'border-white/40 hover:border-white'

  return (
    <header
      ref={headerRef}
      data-mode={heroMode ? 'hero' : 'solid'}
      className={`sticky top-0 z-50 border-b transition-colors duration-200 ease-out ${
        heroMode ? 'border-transparent bg-transparent text-navy' : 'border-navy-950 bg-navy text-white'
      }`}
    >
      <div className="container-x flex h-(--header-h) items-center gap-4">
        <Link href={`/${lang}`} className="flex shrink-0 items-center gap-3" aria-label={brand}>
          <span className="grid size-12 place-items-center rounded-xs bg-white p-1">
            <Image src={logo} alt="" width={38} height={39} priority />
          </span>
          {/* Tên công ty: thu gọn trong trạng thái hero */}
          <span
            aria-hidden={heroMode}
            className={`overflow-hidden leading-tight whitespace-nowrap ${fx} ${heroMode ? 'max-w-0 opacity-0' : 'max-w-[260px] opacity-100'}`}
          >
            <span className="block text-base font-bold tracking-wide uppercase">{brand}</span>
            <span className={`block text-sm ${heroMode ? 'text-muted' : 'text-white/80'}`}>{tagline}</span>
          </span>
        </Link>

        {/* Khoảng đệm co giãn: hero = 0 (menu dồn trái), solid = giãn (menu về bên phải như cũ) */}
        <div aria-hidden className={`hidden transition-[flex-grow] duration-200 ease-out lg:block ${heroMode ? 'grow-0 basis-6' : 'grow basis-0'}`} />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center">
            {nav.map((item) => {
              const active = isActive(item.href)
              const tone = heroMode
                ? active ? 'border-navy text-navy' : 'border-transparent text-navy/80 hover:text-navy'
                : active ? 'border-white text-white' : 'border-transparent text-white/80 hover:text-white'
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`flex h-(--header-h) items-center border-b-2 px-3 text-[0.9375rem] font-medium whitespace-nowrap transition-colors ${tone}`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className={`ml-auto flex items-center gap-2 transition-[flex-grow] duration-200 ease-out lg:ml-0 ${heroMode ? 'lg:grow' : 'lg:grow-0'}`}>
          <div className="flex items-center lg:ml-auto">
            {/* Tìm kiếm: ẩn ở trạng thái hero — co độ rộng về 0 để không để lại khoảng trống */}
            <div className={`hidden overflow-hidden lg:block ${fx} ${reveal} ${heroMode ? 'max-w-0' : 'mr-2 max-w-11'}`}>
              <button
                type="button"
                onClick={() => setSearchOpen((o) => !o)}
                aria-expanded={searchOpen}
                aria-controls="site-search"
                aria-label={labels.openSearch}
                className={`grid size-11 place-items-center rounded-xs border transition-colors ${
                  searchOpen ? 'border-white bg-white text-navy' : outline
                }`}
              >
                {searchOpen ? <IconClose className="size-5" /> : <IconSearch className="size-5" />}
              </button>
            </div>
            {/* Chuyển ngôn ngữ: luôn hiển thị (kể cả header rút gọn ở hero) */}
            <Link
              href={switchHref}
              hrefLang={otherLang}
              aria-label={labels.switchLang}
              className={`flex h-11 items-center overflow-hidden rounded-xs border text-sm font-bold transition-colors ${outline}`}
            >
              {(['vi', 'en'] as const).map((l) => (
                <span
                  key={l}
                  className={`px-2.5 py-2.5 transition-colors ${
                    lang === l ? (heroMode ? 'bg-navy text-white' : 'bg-white text-navy') : 'opacity-80'
                  }`}
                >
                  {l.toUpperCase()}
                </span>
              ))}
            </Link>
            {/* Nút báo giá: ẩn ở trạng thái hero — co độ rộng về 0 */}
            <div className={`hidden overflow-hidden xl:block ${fx} ${reveal} ${heroMode ? 'max-w-0' : 'ml-2 max-w-[220px]'}`}>
              <QuoteButton className="btn btn-accent btn-sm">{labels.requestQuote}</QuoteButton>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? labels.close : labels.menu}
            className={`grid size-11 place-items-center rounded-xs border transition-colors lg:hidden ${outline}`}
          >
            {menuOpen ? <IconClose className="size-5" /> : <IconMenu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Thanh tìm kiếm mở rộng (desktop) */}
      <div id="site-search" hidden={!searchOpen} className="fade-in border-t border-white/20 bg-navy-950">
        <div className="container-x py-4">{searchForm('q-desktop')}</div>
      </div>

      {/* Menu mobile */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="fade-in fixed inset-x-0 top-(--header-h) bottom-0 overflow-y-auto bg-navy-950 text-white lg:hidden"
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
          <Link
            href={switchHref}
            hrefLang={otherLang}
            className="mt-6 flex min-h-12 items-center justify-between border-b border-white/20 font-semibold"
          >
            {labels.switchLang}
            <span className="text-sm opacity-80">{otherLang.toUpperCase()}</span>
          </Link>
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
