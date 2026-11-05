import Link from 'next/link'

type Crumb = { href?: string; label: string }

type Props = { eyebrow?: string; title: string; lead: string; crumbs: Crumb[] }

/**
 * Đầu trang con — Swiss: nền navy phẳng, breadcrumb, H1 (8 cột) | lead (4 cột) trên lưới 12 cột.
 * Không hoạ tiết, không gradient.
 */
export default function PageHero({ eyebrow, title, lead, crumbs }: Props) {
  return (
    <section className="bg-navy text-white">
      <div className="container-x pt-8 pb-12 lg:pt-10 lg:pb-16">
        <nav aria-label="Breadcrumb" className="text-sm">
          <ol className="flex flex-wrap items-center gap-2 text-white/80">
            {crumbs.map((c, i) => (
              <li key={i} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden>/</span>}
                {c.href ? (
                  <Link href={c.href} className="underline-offset-4 hover:text-white hover:underline">{c.label}</Link>
                ) : (
                  <span aria-current="page" className="text-white">{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <div className="grid-12 mt-8 gap-y-6 border-t-2 border-white pt-8 lg:mt-12">
          <div className="col-span-4 md:col-span-12 lg:col-span-7">
            {eyebrow && <p className="t-label mb-4 text-amber">{eyebrow}</p>}
            <h1 className="t-h1">{title}</h1>
          </div>
          <p className="col-span-4 text-base leading-7 text-white/85 md:col-span-9 lg:col-span-4 lg:col-start-9 lg:self-end lg:text-[1.0625rem]">
            {lead}
          </p>
        </div>
      </div>
    </section>
  )
}
