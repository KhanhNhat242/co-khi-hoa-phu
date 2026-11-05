import { siteConfig } from '@/lib/site-config'
import { IconMessenger, IconPhone, IconZalo } from '@/components/ui/Icons'

type Props = { labels: { call: string; callShort: string; zalo: string; messenger: string } }

/**
 * Cụm liên hệ nổi (F5) — Flat: ô vuông bo 2px, viền thay shadow.
 * Desktop = cột sát mép phải dưới; mobile = thanh ngang dưới đáy (body có padding-bottom).
 */
export default function FloatingContact({ labels }: Props) {
  const items = [
    { href: siteConfig.phoneHref, label: labels.call, short: labels.callShort, icon: IconPhone, cls: 'bg-accent text-navy border-accent', ext: false },
    { href: siteConfig.zalo, label: labels.zalo, short: 'Zalo', icon: IconZalo, cls: 'bg-steel text-white border-white', ext: true },
    { href: siteConfig.messenger, label: labels.messenger, short: 'Messenger', icon: IconMessenger, cls: 'bg-navy text-white border-white', ext: true },
  ]
  return (
    <>
      <div className="fixed right-4 bottom-6 z-40 hidden flex-col gap-2 lg:flex">
        {items.map(({ href, label, icon: Icon, cls, ext }) => (
          <a
            key={href}
            href={href}
            {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            aria-label={label}
            className={`group relative grid size-12 place-items-center rounded-xs border-2 transition-transform hover:-translate-x-1 ${cls}`}
          >
            <Icon className="size-6" />
            <span className="pointer-events-none absolute right-full mr-2 rounded-xs bg-navy px-3 py-2 text-sm font-semibold whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              {label}
            </span>
          </a>
        ))}
      </div>
      <nav
        aria-label="Contact"
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-navy-950 bg-navy pb-[env(safe-area-inset-bottom)] lg:hidden"
      >
        {items.map(({ href, short, label, icon: Icon, ext }, i) => (
          <a
            key={href}
            href={href}
            {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            aria-label={label}
            className={`flex h-16 items-center justify-center gap-2 text-[0.9375rem] font-semibold ${
              i === 0 ? 'bg-accent text-navy' : 'text-white'
            } ${i === 2 ? 'border-l border-white/20' : ''}`}
          >
            <Icon className="size-5" />
            <span>{short}</span>
          </a>
        ))}
      </nav>
    </>
  )
}
