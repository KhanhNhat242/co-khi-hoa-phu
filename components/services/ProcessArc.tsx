import type { CSSProperties } from 'react'
import { IconGear, IconPhone, IconSearch, IconWrench } from '@/components/ui/Icons'

type Step = { title: string; text: string }
type Props = { eyebrow: string; title: string; steps: Step[] }

/*
 * Quy trình dạng infographic (ảnh mẫu khách gửi — ngoại lệ mục 6 REQUIREMENTS).
 * ≥1024px: nửa vòng tròn chứa tiêu đề + cung nét đứt đồng tâm, mỗi bước là 1 chấm trên cung
 *          nối sang số thứ tự tròn + thẻ viên thuốc (toạ độ tính từ hình học bên dưới).
 * <1024px: danh sách dọc, đường nét đứt chạy sau các số thứ tự.
 */
const ROW_H = 120
const GAP = 16
const CX = 200 // tâm vòng tròn (px, tính từ mép trái khối)
const RING_R = 160
const RING_W = 28
const ARC_R = 270

const icons = [IconPhone, IconSearch, IconGear, IconWrench]

export default function ProcessArc({ eyebrow, title, steps }: Props) {
  const h = steps.length * ROW_H + (steps.length - 1) * GAP
  const cy = h / 2
  const points = steps.map((_, i) => {
    const y = i * (ROW_H + GAP) + ROW_H / 2
    return { x: CX + Math.sqrt(ARC_R ** 2 - (y - cy) ** 2), y }
  })
  const endDy = cy - 8
  const endX = CX + Math.sqrt(ARC_R ** 2 - endDy ** 2)
  // Tiến trình theo góc trên cung (đầu trên → đầu dưới): dashoffset = 1 − tỉ lệ (pathLength = 1)
  const startAngle = Math.asin(-endDy / ARC_R)
  const progressVars = Object.fromEntries(
    points.map((p, i) => {
      const f = (Math.asin((p.y - cy) / ARC_R) - startAngle) / (2 * -startAngle)
      return [`--p${i}`, (1 - f).toFixed(4)]
    }),
  )

  return (
    <div className="process-arc relative lg:h-(--h)" style={{ '--h': `${h}px`, ...progressVars } as CSSProperties}>
      <svg
        aria-hidden
        className="absolute top-0 left-0 hidden lg:block"
        width={CX + ARC_R + 40}
        height={h}
        viewBox={`0 0 ${CX + ARC_R + 40} ${h}`}
        fill="none"
      >
        {/* nửa vòng tròn: nửa trên navy, nửa dưới steel */}
        <path d={`M${CX} ${cy - RING_R} A${RING_R} ${RING_R} 0 0 1 ${CX + RING_R} ${cy}`} className="stroke-navy" strokeWidth={RING_W} />
        <path d={`M${CX + RING_R} ${cy} A${RING_R} ${RING_R} 0 0 1 ${CX} ${cy + RING_R}`} className="stroke-steel" strokeWidth={RING_W} />
        {/* cung nét đứt */}
        <path
          d={`M${endX} 8 A${ARC_R} ${ARC_R} 0 0 1 ${endX} ${h - 8}`}
          className="stroke-line-strong"
          strokeWidth={2}
          strokeDasharray="6 6"
        />
        {/* cung tiến trình: chạy từ đầu trên tới chấm của bước đang hover (CSS .process-arc trong globals.css) */}
        <path
          d={`M${endX} 8 A${ARC_R} ${ARC_R} 0 0 1 ${endX} ${h - 8}`}
          pathLength={1}
          className="process-arc__progress stroke-steel"
          strokeWidth={4}
          strokeLinecap="round"
        />
        <circle cx={endX} cy={8} r={6} className="fill-navy" />
        <circle cx={endX} cy={h - 8} r={6} className="fill-navy" />
        {points.map((p, i) => (
          <g key={p.y}>
            <line x1={p.x + 8} y1={p.y} x2={p.x + 28} y2={p.y} className="stroke-navy" strokeWidth={2} />
            <circle cx={p.x} cy={p.y} r={8} data-dot={i} className="process-arc__dot fill-white stroke-steel" strokeWidth={3} />
          </g>
        ))}
      </svg>

      <header className="text-center lg:absolute lg:top-1/2 lg:left-4 lg:w-[296px] lg:-translate-y-1/2 lg:text-left">
        <p className="text-sm leading-5 font-semibold tracking-[0.12em] text-accent-ink uppercase">{eyebrow}</p>
        <h2 className="t-h2 mt-2 lg:text-[1.75rem] lg:leading-9">{title}</h2>
      </header>

      <ol className="relative mt-10 space-y-4 lg:absolute lg:inset-0 lg:mt-0 lg:space-y-0">
        <span aria-hidden className="absolute top-0 bottom-0 left-7 border-l-2 border-dashed border-line-strong lg:hidden" />
        {steps.map((step, i) => {
          const Icon = icons[i % icons.length]
          return (
            <li
              key={step.title}
              data-step={i}
              className="group/step relative flex items-center lg:absolute lg:top-(--y) lg:right-0 lg:left-(--x) lg:h-[120px]"
              style={{ '--x': `${Math.round(points[i].x + 28)}px`, '--y': `${points[i].y - ROW_H / 2}px` } as CSSProperties}
            >
              <span
                aria-hidden
                className="relative z-10 grid size-14 shrink-0 place-items-center rounded-full bg-navy text-xl font-bold text-white tabular-nums ring-4 ring-surface lg:size-16 lg:text-2xl"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div
                className="-ml-7 flex flex-1 items-center gap-4 self-stretch rounded-[28px] bg-steel-50 py-5 pr-5 pl-11 transition-colors duration-200 ease-out group-hover/step:bg-steel lg:-ml-8 lg:rounded-full lg:py-4 lg:pr-8 lg:pl-14"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg leading-7 font-bold text-navy transition-colors duration-200 group-hover/step:text-white">
                    <span className="sr-only">{i + 1}. </span>
                    {step.title}
                  </h3>
                  <p className="mt-1 text-[0.9375rem] leading-6 text-muted transition-colors duration-200 group-hover/step:text-white/90">
                    {step.text}
                  </p>
                </div>
                <Icon className="hidden size-10 shrink-0 text-steel transition-colors duration-200 group-hover/step:text-white xl:block" />
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
