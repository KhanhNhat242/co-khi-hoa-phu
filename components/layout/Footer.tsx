import Image from 'next/image'
import Link from 'next/link'
import { siteConfig } from '@/lib/site-config'
import { categories } from '@/data/categories'
import { t, type Locale } from '@/lib/i18n'
import type { Dictionary } from '@/lib/dictionaries'
import { IconMessenger, IconPhone, IconPin, IconUser, IconZalo } from '@/components/ui/Icons'

type Props = { lang: Locale; dict: Dictionary; nav: { href: string; label: string }[] }

const linkCls = 'inline-flex min-h-8 items-center text-white/85 transition-colors hover:text-white hover:underline underline-offset-4'

export default function Footer({ lang, dict, nav }: Props) {
  return (
    <footer className="bg-navy-950 text-white">
      <div className="container-x py-14 lg:py-20">
        <div className="grid-12 gap-y-10">
          <div className="col-span-4 md:col-span-12 lg:col-span-4">
            <div className="flex items-center gap-3">
              <span className="grid size-12 shrink-0 place-items-center rounded-xs bg-white p-1">
                <Image src={siteConfig.logo} alt="" width={38} height={39} />
              </span>
              <p className="text-base font-bold uppercase">{t(siteConfig.name, lang)}</p>
            </div>
            <p className="mt-6 max-w-sm text-[0.9375rem] leading-6 text-white/85">{dict.footer.about}</p>
            <div className="mt-6 flex gap-2">
              <a href={siteConfig.zalo} target="_blank" rel="noopener noreferrer" aria-label="Zalo" className="grid size-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20">
                <IconZalo className="size-6" />
              </a>
              <a href={siteConfig.messenger} target="_blank" rel="noopener noreferrer" aria-label="Messenger" className="grid size-11 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20">
                <IconMessenger className="size-5" />
              </a>
              <a href={siteConfig.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid size-11 place-items-center rounded-full bg-white/10 text-lg font-bold transition-colors hover:bg-white/20">
                f
              </a>
            </div>
          </div>

          <nav aria-label={dict.footer.pages} className="col-span-2 md:col-span-3 lg:col-span-2">
            <p className="t-label border-t border-white/30 pt-4 text-white">{dict.footer.pages}</p>
            <ul className="mt-4 space-y-1 text-[0.9375rem]">
              {nav.map((n) => (
                <li key={n.href}><Link href={n.href} className={linkCls}>{n.label}</Link></li>
              ))}
            </ul>
          </nav>

          <nav aria-label={dict.footer.categories} className="col-span-2 md:col-span-4 lg:col-span-3">
            <p className="t-label border-t border-white/30 pt-4 text-white">{dict.footer.categories}</p>
            <ul className="mt-4 space-y-1 text-[0.9375rem]">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/${lang}/san-pham?danh-muc=${c.slug}`} className={linkCls}>{t(c.name, lang)}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-4 md:col-span-5 lg:col-span-3">
            <p className="t-label border-t border-white/30 pt-4 text-white">{dict.footer.contact}</p>
            <ul className="mt-4 space-y-4 text-[0.9375rem] leading-6">
              <li className="flex gap-3">
                <IconPin className="mt-0.5 size-5 shrink-0" />
                <a href={siteConfig.mapsLink} target="_blank" rel="noopener noreferrer" className="text-white/85 hover:text-white hover:underline">
                  {t(siteConfig.address, lang)}
                </a>
              </li>
              <li className="flex gap-3 text-white/85">
                <IconUser className="mt-0.5 size-5 shrink-0 text-white" />
                {siteConfig.contactPerson}
              </li>
              <li className="flex gap-3">
                <IconPhone className="mt-0.5 size-5 shrink-0" />
                <a href={siteConfig.phoneHref} className="text-lg font-bold hover:underline">{siteConfig.phoneDisplay}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/20">
        <p className="container-x py-6 text-sm text-center text-white/80">
          © 2026 {t(siteConfig.name, lang)}
        </p>
      </div>
    </footer>
  )
}
