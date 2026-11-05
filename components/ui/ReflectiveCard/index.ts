import type { ComponentType, CSSProperties, ReactNode } from 'react'
// Component JS gốc (React Bits, biến thể JS-CSS) — chỉ khai báo kiểu ở đây
import ReflectiveCardJs from './ReflectiveCard.jsx'

export type ReflectiveCardProps = {
  name?: string
  role?: string
  badge?: string
  status?: string
  statusColor?: string
  idLabel?: string
  idValue?: string
  /** Thay toàn bộ nội dung mặc định (thẻ ID) bằng nội dung riêng */
  children?: ReactNode
  theme?: 'dark' | 'light'
  videoSrc?: string
  webcam?: boolean
  onWebcamError?: (error: unknown) => void
  tint?: string
  metalness?: number
  roughness?: number
  blurStrength?: number
  grayscale?: number
  warp?: number
  warpScale?: number
  shine?: number
  bevel?: number
  glare?: number
  enableTilt?: boolean
  tiltStrength?: number
  intro?: boolean
  /** Số (px) hoặc chuỗi CSS */
  width?: number | string
  height?: number | string
  radius?: number
  className?: string
  style?: CSSProperties
}

const ReflectiveCard = ReflectiveCardJs as unknown as ComponentType<ReflectiveCardProps>
export default ReflectiveCard
