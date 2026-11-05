import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { hasLocale, t } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionaries'
import { projects } from '@/data/projects'
import { partnerLogos } from '@/data/partners'
import PageHero from '@/components/layout/PageHero'
import PageQuickJump from '@/components/layout/PageQuickJump'
import SectionHead from '@/components/ui/SectionHead'
import VideoGallery from '@/components/video/VideoGallery'
import { videos } from '@/data/videos'

export async function generateMetadata({ params }: PageProps<'/[lang]/du-an'>): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const dict = getDictionary(lang)
  return {
    title: dict.nav.projects,
    description: dict.projects.lead,
    alternates: { canonical: `/${lang}/du-an`, languages: { vi: '/vi/du-an', en: '/en/du-an' } },
  }
}

export default async function ProjectsPage({ params }: PageProps<'/[lang]/du-an'>) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = getDictionary(lang)
  const { projects: P, common } = dict

  return (
    <>
      <PageHero
        title={P.title}
        lead={P.lead}
        crumbs={[{ href: `/${lang}`, label: common.home }, { label: dict.nav.projects }]}
      />

      {/* Ảnh thực tế — bento 3 cột: 1 ô lớn 2×2 + các ô 1×1 */}
      <section className="section">
        <div className="container-x">
          {/* TODO(khach): tên đối tác & khu vực từng hạng mục — một ghi chú chung thay vì badge lặp lại */}
          <SectionHead title={P.gridTitle} action={<p className="todo-badge">{P.pendingNote}</p>} />
          <div className="mt-12 grid grid-cols-1 grid-flow-dense gap-4 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6">
            {projects.map((p) => {
              const big = p.size === 'lg'
              return (
                <figure
                  key={p.id}
                  className={`flex flex-col rounded-sm border border-line bg-white ${big ? 'md:col-span-2 lg:row-span-2' : ''}`}
                >
                  {/* Ảnh contain trên nền xám — không đè chữ (R1) */}
                  <div className={`relative bg-surface ${big ? 'aspect-[440/280] lg:aspect-auto lg:min-h-[320px] lg:flex-1' : 'aspect-[4/3]'}`}>
                    <Image
                      src={p.image}
                      alt=""
                      fill
                      sizes={big ? '(min-width:1024px) 800px, 100vw' : '(min-width:1024px) 400px, 100vw'}
                      className="object-contain"
                    />
                  </div>
                  <figcaption className="border-t border-line p-4 text-[0.9375rem] leading-6 font-semibold text-navy lg:px-6">
                    {t(p.title, lang)}
                  </figcaption>
                </figure>
              )
            })}
          </div>
        </div>
      </section>

      {/* Video giới thiệu máy móc — phát ngay trên trang (YouTube nhúng) */}
      <section id="video" className="section border-t border-line bg-surface">
        <div className="container-x">
          <SectionHead title={P.videosTitle} lead={P.videosLead} />
          <div className="mt-12 lg:mt-16">
            <VideoGallery
              videos={videos.map((v) => ({ id: v.id, title: t(v.title, lang) }))}
              labels={{ play: P.videoPlay, close: P.videoClose, openYoutube: P.videoOpenYoutube, dialogLabel: P.videoDialog }}
            />
          </div>
        </div>
      </section>

      {/* Đối tác — Social Proof: lưới logo */}
      <section className="section border-t border-line">
        <div className="container-x">
          <SectionHead title={P.partnersTitle} lead={P.partnersLead} />
          <ul
            aria-label={P.partnersTitle}
            className="mt-12 grid grid-cols-2 border-t border-l border-line bg-white sm:grid-cols-3 md:grid-cols-4 lg:mt-16 lg:grid-cols-6"
          >
            {partnerLogos.map((src) => (
              <li key={src} className="grid h-24 place-items-center border-r border-b border-line p-4">
                <Image src={src} alt="" width={157} height={61} className="max-h-14 w-auto object-contain" unoptimized />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PageQuickJump page="projects" lang={lang} dict={dict} />
    </>
  )
}
