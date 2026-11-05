import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { hasLocale, t } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionaries'
import PageHero from '@/components/layout/PageHero'
import PageQuickJump from '@/components/layout/PageQuickJump'
import QuoteButton from '@/components/quote/QuoteButton'
import { IconArrowRight } from '@/components/ui/Icons'
import StrengthDeck from '@/components/about/StrengthDeck'
import Link from 'next/link'
import { findProduct } from '@/data/products'

export async function generateMetadata({ params }: PageProps<'/[lang]/gioi-thieu'>): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const dict = getDictionary(lang)
  return {
    title: dict.nav.about,
    description: dict.about.lead,
    alternates: { canonical: `/${lang}/gioi-thieu`, languages: { vi: '/vi/gioi-thieu', en: '/en/gioi-thieu' } },
  }
}

// Ảnh minh hoạ cho 4 điểm mạnh (theo thứ tự about.usp) — đều có watermark → hiển thị contain (R1)
const strengthImages = [
  '/images/SanPham/91869_440x280.jpg', // Kinh nghiệm: gian hàng triển lãm
  '/images/SanPham/795651582630_440x330.jpg', // Tự thiết kế & chế tạo dây chuyền: dây chuyền ghép finger
  '/images/SanPham/024414336162_440x330.jpg', // Bảo hành – bảo trì: xưởng & hệ thống hút bụi
  '/images/SanPham/212230662445_440x330.jpg', // Lắp đặt tận nơi: cụm máy ghép tại xưởng
]

// 3 ảnh minh hoạ cho section Câu chuyện (khác với ảnh của StrengthDeck) — slug sản phẩm để lấy tên + link
// Ngoại lệ R1 đã duyệt (khách, 2026-11-05): ô ảnh dọc object-cover + zoom khi hover; watermark là của Hoà Phú.
const storyProducts = ['may-cnc-shoda-nc-261', 'may-ep-nong-orma', 'may-cha-nham-thung-sheng-shing']

export default async function AboutPage({ params }: PageProps<'/[lang]/gioi-thieu'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = getDictionary(lang)
  const { about, common } = dict

  return (
    <>
      <PageHero
        title={about.title}
        lead={about.lead}
        crumbs={[{ href: `/${lang}`, label: common.home }, { label: dict.nav.about }]}
      />

      {/* Câu chuyện & hiện diện thương mại — tiêu đề giữa; trái: đoạn trích + nút; phải: 3 ô ảnh dọc, hover phóng to */}
      <section className="section">
        <div className="container-x">
          <header className="text-center">
            <h2 className="t-h2">{about.storyTitle}</h2>
            <span aria-hidden className="mx-auto mt-4 block h-0.5 w-16 bg-accent" />
          </header>

          <div className="mt-12 grid grid-cols-1 items-center gap-12 lg:mt-16 lg:grid-cols-2 lg:gap-16">
            <div className="text-center">
              <blockquote className="mx-auto max-w-[560px] text-[1.0625rem] leading-8 font-medium text-ink lg:text-lg lg:leading-8">
                “{about.storyText}”
              </blockquote>
              <p className="mx-auto mt-6 max-w-[480px] text-[0.9375rem] leading-6 text-muted">
                {about.brandNote}
              </p>
              <QuoteButton className="btn btn-accent mt-8">
                {common.requestQuote} <IconArrowRight className="size-5" />
              </QuoteButton>
            </div>

            {/* 3 ô ảnh dọc (ô giữa cao hơn). Hover/focus: ô to ra + ảnh zoom, các ô còn lại mờ nhẹ.
                Ngoại lệ R1 đã duyệt cho section này (watermark Hoà Phú, không phải tem Thành Nhân). */}
            <ul className="group/story flex items-center justify-center gap-3 sm:gap-4">
              {storyProducts.map((slug, i) => {
                const p = findProduct(slug)
                if (!p) return null
                const name = t(p.name, lang)
                return (
                  <li
                    key={slug}
                    className={`w-[30%] max-w-[200px] transition-opacity duration-500 group-has-[a:hover]/story:opacity-70 has-[a:hover]:!opacity-100 ${
                      i === 1 ? 'aspect-[9/16]' : 'aspect-[9/13]'
                    }`}
                  >
                    <Link
                      href={`/${lang}/san-pham/${p.slug}`}
                      aria-label={name}
                      className="group/tile relative block size-full overflow-hidden rounded-[16px] bg-surface shadow-[0_16px_32px_-18px_rgb(11_42_74/0.5)] transition-transform duration-500 ease-out hover:z-10 hover:scale-[1.08] focus-visible:z-10 focus-visible:scale-[1.08]"
                    >
                      <Image
                        src={p.images[0].src}
                        alt={name}
                        fill
                        sizes="(min-width:1024px) 200px, 30vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover/tile:scale-[1.15] group-focus-visible/tile:scale-[1.15]"
                      />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* Quy mô xưởng & điểm mạnh — chồng thẻ chạy theo cuộn (bản tĩnh cho mobile / giảm chuyển động) */}
      <section className="border-t border-line bg-surface py-14 lg:py-0">
        <div className="container-x">
          <StrengthDeck
            header={
              <>
                <h2 className="t-h2">{about.scaleTitle}</h2>
                <p className="t-lead mt-4">{about.scaleLead}</p>
              </>
            }
            items={about.usp.map((u, i) => ({
              title: u.title,
              text: u.text,
              image: strengthImages[i % strengthImages.length],
              imageAlt: u.title,
            }))}
            labels={{ requestQuote: common.requestQuote, pending: common.pendingClient, listLabel: about.scaleTitle }}
          />
        </div>
      </section>

      <PageQuickJump page="about" lang={lang} dict={dict} />
    </>
  )
}
