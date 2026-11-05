import type { ReactNode } from 'react'

type Props = {
  title: string
  lead?: string
  action?: ReactNode
  /** Nền tối (navy) */
  dark?: boolean
}

/**
 * Tiêu đề section kiểu Swiss: đường kẻ 2px, tiêu đề (cột trái) | lead + hành động (cột phải)
 * trên lưới 12 cột. Không eyebrow lặp tiêu đề, không đánh số trang trí.
 */
export default function SectionHead({ title, lead, action, dark }: Props) {
  return (
    <header className={`grid-12 gap-y-4 border-t-2 pt-6 lg:pt-8 ${dark ? 'border-white' : 'border-navy'}`}>
      <h2 className={`t-h2 col-span-4 md:col-span-12 lg:col-span-6 ${dark ? '!text-white' : ''}`}>{title}</h2>
      {(lead || action) && (
        <div className="col-span-4 flex flex-col items-start gap-6 md:col-span-12 lg:col-span-5 lg:col-start-8">
          {lead && <p className={`t-lead ${dark ? '!text-white/85' : ''}`}>{lead}</p>}
          {action}
        </div>
      )}
    </header>
  )
}
