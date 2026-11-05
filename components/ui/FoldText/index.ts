import type { ComponentType, CSSProperties } from 'react'
// Component JS gốc (React Bits, biến thể JS-CSS) — giữ nguyên, chỉ khai báo kiểu đúng ở đây
import FoldTextJs from './FoldText.jsx'

export type FoldTextProps = {
  text?: string
  splitBy?: 'char' | 'word' | 'line'
  hinge?: 'top' | 'bottom' | 'left' | 'right'
  foldStyle?: 'paper' | 'blinds' | 'flip'
  duration?: number
  stagger?: number
  staggerFrom?: 'start' | 'end' | 'center' | 'edges' | 'random'
  foldAngle?: number
  ease?: string
  perspective?: number
  creaseShading?: number
  trigger?: 'mount' | 'scroll' | 'hover' | 'loop'
  loopDelay?: number
  hoverRefold?: boolean
  refoldRadius?: number
  refoldAngle?: number
  /** Số (px) hoặc chuỗi CSS, vd. clamp(...) */
  fontSize?: number | string
  fontWeight?: number
  color?: string
  className?: string
  style?: CSSProperties
}

const FoldText = FoldTextJs as unknown as ComponentType<FoldTextProps>
export default FoldText
