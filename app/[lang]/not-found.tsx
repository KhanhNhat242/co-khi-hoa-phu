import Link from 'next/link'
import vi from '@/dictionaries/vi.json'
import en from '@/dictionaries/en.json'

/** 404 song ngữ (not-found không đọc được params → hiển thị cả 2 ngôn ngữ) */
export default function NotFound() {
  return (
    <section className="bg-navy py-20 text-white lg:py-32">
      <div className="container-x grid-12">
        <div className="col-span-4 border-t-2 border-white pt-8 md:col-span-12 lg:col-span-8">
          <p className="text-6xl leading-none font-bold tabular-nums">404</p>
          <h1 className="t-h1 mt-8">{vi.notFound.title}</h1>
          <p className="mt-4 max-w-lg text-white/85">{vi.notFound.text}</p>
          <p lang="en" className="mt-6 text-white/85">{en.notFound.title}</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link href="/vi" className="btn btn-accent">{vi.notFound.back}</Link>
            <Link href="/en" className="btn btn-outline-light">{en.notFound.back}</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
