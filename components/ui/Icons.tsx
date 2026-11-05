import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement>

const base = (props: P) => ({
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  ...props,
})

export const IconPhone = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  </svg>
)

export const IconSearch = (p: P) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
)

export const IconArrowRight = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export const IconArrowLeft = (p: P) => (
  <svg {...base(p)}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
)

export const IconChevronDown = (p: P) => (
  <svg {...base(p)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
)

export const IconMenu = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
)

export const IconClose = (p: P) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)

export const IconPin = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 19 9.5C19 14.9 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
)

export const IconUser = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21a8 8 0 0 1 16 0" />
  </svg>
)

export const IconFilter = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 5h16l-6 8v6l-4-2v-4z" />
  </svg>
)

export const IconFile = (p: P) => (
  <svg {...base(p)}>
    <path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z" />
    <path d="M14 3v5h5M9 13h6M9 17h4" />
  </svg>
)

export const IconPlay = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m10 9 5 3-5 3z" />
  </svg>
)

export const IconCheck = (p: P) => (
  <svg {...base(p)}>
    <path d="m5 12 5 5 9-10" />
  </svg>
)

export const IconClock = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
)

/* ——— Icon kỹ thuật nét mảnh cho danh mục / dịch vụ ——— */
export const IconSaw = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="7" />
    <circle cx="12" cy="12" r="2" />
    <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" />
  </svg>
)

export const IconLine = (p: P) => (
  <svg {...base(p)}>
    <rect x="2" y="13" width="20" height="4" rx="2" />
    <circle cx="6" cy="15" r="1" />
    <circle cx="12" cy="15" r="1" />
    <circle cx="18" cy="15" r="1" />
    <path d="M5 13V8h4v5M13 13V6h5v7" />
  </svg>
)

export const IconConveyor = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 14h16a3 3 0 0 1 0 6H4a3 3 0 0 1 0-6z" />
    <circle cx="4" cy="17" r="1" />
    <circle cx="20" cy="17" r="1" />
    <rect x="6" y="7" width="5" height="7" />
    <rect x="13" y="9" width="5" height="5" />
  </svg>
)

export const IconGear = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1" />
  </svg>
)

export const IconCompressor = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="8" width="13" height="10" rx="2" />
    <path d="M16 11h3a2 2 0 0 1 2 2v5M7 18v2M12 18v2M6 8V5h7v3" />
    <circle cx="9.5" cy="13" r="2" />
  </svg>
)

export const IconWrench = (p: P) => (
  <svg {...base(p)}>
    <path d="M14.7 6.3a4 4 0 0 0-5.4 5.2L3 17.8V21h3.2l6.3-6.3a4 4 0 0 0 5.2-5.4l-2.6 2.6-2.4-.6-.6-2.4z" />
  </svg>
)

export const IconZalo = (p: P) => (
  <svg width={24} height={24} viewBox="0 0 24 24" aria-hidden {...p}>
    <rect width="24" height="24" rx="6" fill="currentColor" />
    <text
      x="12"
      y="15.5"
      textAnchor="middle"
      fontSize="8.5"
      fontWeight="800"
      fontFamily="Arial, sans-serif"
      fill="#0068FF"
    >
      Zalo
    </text>
  </svg>
)

export const IconMessenger = (p: P) => (
  <svg width={24} height={24} viewBox="0 0 24 24" aria-hidden {...p}>
    <path
      fill="currentColor"
      d="M12 2C6.4 2 2 6.1 2 11.6c0 2.9 1.2 5.4 3.2 7.1V22l3-1.7c1.2.3 2.4.5 3.8.5 5.6 0 10-4.1 10-9.6S17.6 2 12 2zm1 12.9-2.5-2.7-5 2.7 5.5-5.8 2.6 2.7 4.9-2.7z"
    />
  </svg>
)

export const categoryIcons: Record<string, (p: P) => React.JSX.Element> = {
  'may-che-bien-go': IconSaw,
  'day-chuyen-san-xuat': IconLine,
  'bang-tai-cong-nghiep': IconConveyor,
  'gia-cong-co-khi': IconGear,
  'may-nen-khi-thiet-bi': IconCompressor,
}
