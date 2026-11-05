import type { Localized } from '@/lib/i18n'

/**
 * Hình ảnh thực tế (nhà xưởng, gian hàng triển lãm) từ kho ảnh khách gửi.
 * TODO(khach): tên đối tác/nhà máy, khu vực triển khai (TP.HCM / Bình Dương / Đồng Nai…)
 *   cho từng hạng mục. AGENTS.md → R2: không tự gán khu vực hay tên khách hàng.
 */
export type Project = {
  id: string
  title: Localized
  image: string
  /** Kích thước ô trong bento grid */
  size: 'lg' | 'sm'
}

const img = (f: string) => `/images/SanPham/${f}`

export const projects: Project[] = [
  {
    id: 'kuboke-booth',
    size: 'lg',
    title: {
      vi: 'Gian hàng KUBOKE của Hoà Phú tại triển lãm ngành chế biến gỗ',
      en: 'Hoa Phu’s KUBOKE booth at a woodworking industry exhibition',
    },
    image: img('91869_440x280.jpg'),
  },
  {
    id: 'kuboke-clamp',
    size: 'sm',
    title: {
      vi: 'Trình diễn máy ghép gỗ xoay KUBOKE sản xuất tại Việt Nam',
      en: 'Live demo of the Vietnam-made KUBOKE rotary clamp carrier',
    },
    image: img('159981781826455_440x330.jpg'),
  },
  {
    id: 'workshop-dust',
    size: 'sm',
    title: {
      vi: 'Nhà xưởng gỗ vận hành máy bào cùng hệ thống hút bụi',
      en: 'Wood workshop running planers with a dust extraction system',
    },
    image: img('024414336162_440x330.jpg'),
  },
  {
    id: 'finger-line',
    size: 'sm',
    title: {
      vi: 'Dây chuyền ghép finger tự động vận hành tại nhà xưởng',
      en: 'Automatic finger-jointing line running on the factory floor',
    },
    image: img('795651582630_440x330.jpg'),
  },
  {
    id: 'clamp-carrier',
    size: 'sm',
    title: {
      vi: 'Cụm máy ghép gỗ xoay thủy lực tại xưởng sản xuất',
      en: 'Hydraulic rotary clamp carriers installed at a production site',
    },
    image: img('212230662445_440x330.jpg'),
  },
  {
    id: 'compressor',
    size: 'sm',
    title: {
      vi: 'Cụm máy nén khí trục vít, máy sấy khí và bình chứa',
      en: 'Screw compressor package with air dryer and receiver tank',
    },
    image: img('339056029723_440x330.jpg'),
  },
]
