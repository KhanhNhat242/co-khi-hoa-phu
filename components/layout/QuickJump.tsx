import Link from 'next/link'
import { IconArrowRight } from '@/components/ui/Icons'

type Props = {
  label: string
  title: string
  text: string
  href: string
  alsoLabel: string
  also: { href: string; label: string }[]
}

/** Dải chuyển trang nhanh cuối mỗi trang — Flat, lưới 12 cột */
export default function QuickJump({ label, title, text, href, alsoLabel, also }: Props) {
  return (
    <section className="border-t border-line bg-white">
      <div className="container-x grid-12 gap-y-6 py-12 lg:py-16">
        <Link
          href={href}
          className="group col-span-4 flex items-center gap-6 rounded-sm bg-navy p-6 text-white transition-colors hover:bg-steel md:col-span-12 lg:col-span-8 lg:p-8"
        >
          <span className="min-w-0 flex-1">
            <span className="t-label text-amber">{label}</span>
            <span className="mt-2 block text-xl leading-7 font-bold lg:text-2xl lg:leading-8">{title}</span>
            <span className="mt-2 block text-[0.9375rem] leading-6 text-white/85">{text}</span>
          </span>
          <span className="grid size-12 shrink-0 place-items-center rounded-xs bg-accent text-navy">
            <IconArrowRight className="size-6 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
        <div className="col-span-4 md:col-span-12 lg:col-span-4 lg:self-center">
          <p className="t-label text-muted">{alsoLabel}</p>
          <ul className="mt-2 border-t border-line">
            {also.map((a) => (
              <li key={a.href} className="border-b border-line">
                <Link
                  href={a.href}
                  className="flex min-h-12 items-center justify-between font-semibold text-navy transition-colors hover:text-steel"
                >
                  {a.label}
                  <IconArrowRight className="size-5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
