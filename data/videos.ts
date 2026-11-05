import type { Localized } from '@/lib/i18n'

/**
 * Video giới thiệu máy móc (YouTube) — trang Dự án.
 * Thứ tự & tên tiếng Việt theo khách cung cấp; đã đối chiếu tiêu đề gốc qua YouTube oEmbed (2026-11-05).
 * Thumbnail có watermark → hiển thị contain, không đè nút play lên ảnh (R1).
 */
export type Video = { id: string; title: Localized }

export const videos: Video[] = [
  { id: '4KsGNx0T600', title: { vi: 'Máy cưa sọc phách nhiều lưỡi', en: 'MAC-15 multi-blade thin cutting frame saw' } },
  { id: 'bqzK4i-jJdM', title: { vi: 'Máy phay CNC chân ghế HH-CNC-85-6TC', en: 'HH-CNC-85-6TC linear CNC profiling machine' } },
  { id: 'KxvOnCTvfcI', title: { vi: 'Máy phay mộng cửa lá xách LH-110', en: 'LH-110 automatic louver groover' } },
  { id: 'DY_HEI6Zkws', title: { vi: 'Máy chép hình tròn tải nặng có trục chà nhám LH-80-4PS', en: 'LH-80-4PS heavy-duty copy shaper with sanding attachment' } },
  { id: 'dFwYg_a8pjU', title: { vi: 'Máy chép hình tròn bên trong LH-23', en: 'LH-23 inner copy shaper' } },
  { id: '_O4u6Z8hkBg', title: { vi: 'Máy chép hình tròn LH-28-WS', en: 'LH-28-WS copy shaper with feed support' } },
  { id: 'TcAa89ZBHSo', title: { vi: 'Máy chép hình tròn LH-28TC', en: 'LH-28TC copy shaper with two cutter heads' } },
  { id: '6-HI5qy-y7w', title: { vi: 'Máy chép hình tròn LH-28', en: 'LH-28 copy shaper' } },
]

export const ytThumb = (id: string) => `https://i.ytimg.com/vi/${id}/mqdefault.jpg`
export const ytEmbed = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
export const ytWatch = (id: string) => `https://www.youtube.com/watch?v=${id}`
