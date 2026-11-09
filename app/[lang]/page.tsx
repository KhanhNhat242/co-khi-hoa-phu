import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { hasLocale, t } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionaries'
import { categories } from '@/data/categories'
import { products } from '@/data/products'
import { partnerLogos } from '@/data/partners'
import QuoteButton from '@/components/quote/QuoteButton'
import SectionHead from '@/components/ui/SectionHead'
import CategoryScroller from '@/components/home/CategoryScroller'
import PartnerMarquee from '@/components/home/PartnerMarquee'
import FoldText from '@/components/ui/FoldText'
import PageQuickJump from '@/components/layout/PageQuickJump'
import { IconArrowRight } from '@/components/ui/Icons'

export default async function HomePage({ params }: PageProps<'/[lang]'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = getDictionary(lang)
  const { hero, home, common } = dict

  return (
    <>
      {/* ── HERO: nền gradient loang phủ toàn bộ (kể cả dưới header & dưới ảnh), ảnh hoà nền bằng multiply ──
          Ngoại lệ đã duyệt cho Flat (REQUIREMENTS mục 6): gradient chỉ dùng ở hero trang chủ. */}
      <section
        id="hero"
        className="hero-mesh relative isolate -mt-(--header-h) overflow-hidden pt-(--header-h) text-navy lg:flex lg:min-h-svh lg:items-center"
      >
        <div className="container-x relative z-10">
          <div className="py-14 lg:w-[54%] lg:py-20 lg:pr-8 xl:w-[46%]">
            {/* Tiêu đề hiệu ứng FoldText (React Bits + GSAP): chữ gập như giấy rồi mở ra, rê chuột gần thì gập nhẹ.
                FoldText tự có bản chữ ẩn (sr-only) cho SEO/trình đọc màn hình; tự giảm chuyển động khi prefers-reduced-motion. */}
            <h1 className="mt-6 [text-wrap:balance]">
              <FoldText
                text={hero.title}
                foldStyle="paper"
                splitBy="char"
                hinge="top"
                trigger="scroll"
                foldAngle={92}
                duration={0.65}
                stagger={0.045}
                staggerFrom="start"
                ease="power3.out"
                loopDelay={1.4}
                hoverRefold
                refoldRadius={140}
                refoldAngle={45}
                perspective={700}
                creaseShading={0.55}
                fontSize="clamp(2.5rem, 1.2rem + 3.6vw, 4rem)"
                fontWeight={800}
                style={{ lineHeight: 1.08, letterSpacing: '-0.03em' }}
              />
            </h1>
            {/* Chữ đè lên ảnh banner: navy đậm + quầng sáng mờ quanh chữ để tách khỏi chi tiết kim loại phía sau */}
            <p className="hero-legible mt-6 max-w-[520px] text-base leading-7 font-medium text-navy lg:text-lg lg:leading-8">{hero.lead2}</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
              <QuoteButton className="btn btn-accent">
                {common.requestQuote}
                <IconArrowRight className="size-5" />
              </QuoteButton>
              <Link
                href={`/${lang}/san-pham`}
                className="group inline-flex min-h-12 items-center gap-2 font-semibold text-navy underline-offset-8 hover:underline"
              >
                {common.viewProducts}
                <IconArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Ảnh nhà xưởng (hero-banner3.png, ảnh chụp tông tối, không tem/watermark) — desktop: chiếm ~55% bên phải,
            phủ kín chiều cao (object-cover), mép trái chuyển tiếp mềm vào nền gradient (mask nhiều nấc, ~55% bề rộng ảnh) để cột chữ bên trái luôn nằm trên nền sáng.
            Mobile: khối ảnh dưới nội dung, mép trên mờ vào gradient. */}
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-[56%]">
          <div className="relative aspect-[735/490] w-full lg:aspect-auto lg:h-full">
            <Image
              src="/images/hero-banner3.png"
              alt={hero.imageAlt}
              fill
              priority
              sizes="(min-width:1024px) 56vw, 100vw"
              className="object-cover [mask-image:linear-gradient(to_bottom,transparent_0,#000_22%)] lg:[mask-image:linear-gradient(to_right,transparent_0%,rgb(0_0_0/0.18)_14%,rgb(0_0_0/0.55)_28%,rgb(0_0_0/0.88)_42%,#000_55%)]"
            />
          </div>
        </div>
      </section>

      {/* ── 5 NHÓM SẢN PHẨM — chồng thẻ 3D chạy theo cuộn (bản tĩnh cho mobile / giảm chuyển động) ── */}
      <section className="bg-navy-950 pt-14 text-white lg:pt-24">
        <div className="container-x">
          <SectionHead
            dark
            title={home.catsTitle}
            lead={home.catsLead}
            action={
              <Link href={`/${lang}/san-pham`} className="btn btn-outline-light">
                {common.viewAll} <IconArrowRight className="size-5" />
              </Link>
            }
          />
        </div>
        <div className="pt-12 pb-14 lg:pt-0 lg:pb-16">
          <CategoryScroller
            items={categories.map((c) => {
              const catHref = `/${lang}/san-pham?danh-muc=${c.slug}`
              const shown = c.children.slice(0, 4)
              return {
                slug: c.slug,
                name: t(c.name, lang),
                summary: t(c.summary, lang),
                image: c.image,
                href: catHref,
                count: products.filter((p) => p.category === c.slug).length,
                subs: shown.map((s) => ({ name: t(s.name, lang), href: `${catHref}&nhom=${s.slug}` })),
                moreCount: c.children.length - shown.length,
              }
            })}
            labels={{ viewCategory: home.viewCategory, products: dict.products.results, more: home.more, goTo: home.catsTitle }}
          />
        </div>
      </section>

      {/* ── ĐỐI TÁC — carousel 3 hàng tự cuộn ngang, xen kẽ chiều (tràn full chiều ngang) ── */}
      <section className="section border-t border-line bg-surface">
        <div className="container-x">
          {/* Tiêu đề căn giữa (khác SectionHead) — đường kẻ ngắn phía trên giữ chất Swiss */}
          <header className="mx-auto max-w-2xl text-center">
            <span aria-hidden className="mx-auto block h-0.5 w-12 bg-navy" />
            <h2 className="t-h2 mt-6">{home.partnersTitle}</h2>
          </header>
        </div>
        <div className="mt-10 lg:mt-12">
          <PartnerMarquee
            logos={partnerLogos}
            rows={3}
            labels={{ pause: home.partnersPause, play: home.partnersPlay, region: home.partnersTitle }}
          />
        </div>
      </section>

      {/* <PageQuickJump page="home" lang={lang} dict={dict} /> */}
    </>
  )
}
