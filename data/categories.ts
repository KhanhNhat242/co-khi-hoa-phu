import type { Localized } from '@/lib/i18n'

// Cây danh mục — khớp REQUIREMENTS mục 3 (AGENTS.md → R3).
export type SubCategory = { slug: string; name: Localized }
export type Category = {
  slug: string
  name: Localized
  /** Danh sách rút gọn hiển thị trên thẻ trang chủ (12–18 từ) */
  summary: Localized
  /** Ảnh đại diện — đều có watermark → object-contain (R1) */
  image: string
  children: SubCategory[]
}

const img = (file: string) => `/images/SanPham/${file}`

export const categories: Category[] = [
  {
    slug: 'may-che-bien-go',
    name: { vi: 'Máy chế biến gỗ', en: 'Woodworking machines' },
    summary: {
      vi: 'Máy ghép, cưa, chà nhám, sấy UV, bào, khoan, phay mộng, tiện, dán cạnh và CNC.',
      en: 'Clamp carriers, saws, sanders, UV dryers, planers, drills, tenoners, lathes, edge banders and CNC.',
    },
    image: img('362512139131_440x330.jpg'),
    children: [
      { slug: 'may-ghep', name: { vi: 'Máy ghép', en: 'Clamp carriers' } },
      { slug: 'may-cua', name: { vi: 'Máy cưa', en: 'Saws' } },
      { slug: 'may-cha-nham', name: { vi: 'Máy chà nhám', en: 'Sanders' } },
      { slug: 'may-say-uv', name: { vi: 'Máy sấy UV / hồng ngoại', en: 'UV / infrared dryers' } },
      { slug: 'may-bao', name: { vi: 'Máy bào', en: 'Planers & moulders' } },
      { slug: 'may-khoan', name: { vi: 'Máy khoan', en: 'Drilling machines' } },
      { slug: 'may-phay-mong', name: { vi: 'Máy phay mộng', en: 'Tenoners & shapers' } },
      { slug: 'may-tien', name: { vi: 'Máy tiện', en: 'Lathes' } },
      { slug: 'may-dan-canh', name: { vi: 'Máy dán cạnh', en: 'Edge banders' } },
      { slug: 'may-cnc', name: { vi: 'Máy CNC', en: 'CNC machines' } },
      { slug: 'may-ep', name: { vi: 'Máy ép nóng / nguội', en: 'Hot & cold presses' } },
    ],
  },
  {
    slug: 'day-chuyen-san-xuat',
    name: { vi: 'Dây chuyền sản xuất', en: 'Production lines' },
    summary: {
      vi: 'Dây chuyền ghép finger tự động, sơn và sấy UV ván sàn, sơn tấm tự động.',
      en: 'Automatic finger-jointing lines, UV coating and curing lines for flooring, automatic panel coating lines.',
    },
    image: img('795651582630_440x330.jpg'),
    children: [
      { slug: 'finger-ghep', name: { vi: 'Dây chuyền finger / ghép', en: 'Finger-jointing lines' } },
      { slug: 'son-say-uv-van-san', name: { vi: 'Sơn & sấy UV ván sàn', en: 'UV flooring coating' } },
      { slug: 'son-tam', name: { vi: 'Sơn tấm tự động', en: 'Automatic panel coating' } },
    ],
  },
  {
    slug: 'bang-tai-cong-nghiep',
    name: { vi: 'Băng tải công nghiệp', en: 'Industrial conveyors' },
    summary: {
      vi: 'Băng tải con lăn, PVC, cao su, xích, Kevlar chịu nhiệt và lưới inox theo yêu cầu.',
      en: 'Roller, PVC, rubber, chain, heat-resistant Kevlar and stainless mesh conveyors built to order.',
    },
    image: img('947022703402_440x330.jpg'),
    children: [
      { slug: 'con-lan', name: { vi: 'Băng tải con lăn', en: 'Roller conveyors' } },
      { slug: 'pvc', name: { vi: 'Băng tải PVC', en: 'PVC belt conveyors' } },
      { slug: 'cao-su', name: { vi: 'Băng tải cao su', en: 'Rubber belt conveyors' } },
      { slug: 'xich', name: { vi: 'Băng tải xích', en: 'Chain conveyors' } },
      { slug: 'kevlar', name: { vi: 'Kevlar chịu nhiệt', en: 'Heat-resistant Kevlar' } },
      { slug: 'luoi-inox', name: { vi: 'Lưới inox', en: 'Stainless mesh' } },
    ],
  },
  {
    slug: 'gia-cong-co-khi',
    name: { vi: 'Gia công cơ khí', en: 'Mechanical fabrication' },
    summary: {
      vi: 'Chi tiết máy, phụ kiện ngành gỗ như khung ghế nhôm, hộp giảm tốc, bộ nguồn thủy lực.',
      en: 'Machine parts, woodworking accessories such as aluminium chair frames, gearboxes and hydraulic power units.',
    },
    image: img('166317102675_440x330.jpg'),
    children: [
      { slug: 'chi-tiet-may', name: { vi: 'Chi tiết máy', en: 'Machine parts' } },
      { slug: 'phu-kien-nganh-go', name: { vi: 'Phụ kiện ngành gỗ', en: 'Woodworking accessories' } },
      { slug: 'hop-giam-toc', name: { vi: 'Hộp giảm tốc', en: 'Gearboxes' } },
      { slug: 'nguon-thuy-luc', name: { vi: 'Bộ nguồn thủy lực', en: 'Hydraulic power units' } },
    ],
  },
  {
    slug: 'may-nen-khi-thiet-bi',
    name: { vi: 'Máy nén khí & thiết bị', en: 'Compressors & equipment' },
    summary: {
      vi: 'Máy nén khí, máy sấy khí, máy hàn, máy cắt plasma và dụng cụ cầm tay FERM.',
      en: 'Air compressors, air dryers, welders, plasma cutters and FERM power tools.',
    },
    image: img('339056029723_440x330.jpg'),
    children: [
      { slug: 'may-nen-khi', name: { vi: 'Máy nén khí', en: 'Air compressors' } },
      { slug: 'may-say-khi', name: { vi: 'Máy sấy khí', en: 'Air dryers' } },
      { slug: 'thiet-bi-han', name: { vi: 'Thiết bị hàn', en: 'Welding equipment' } },
      { slug: 'cat-plasma', name: { vi: 'Máy cắt plasma', en: 'Plasma cutters' } },
      { slug: 'dung-cu-ferm', name: { vi: 'Dụng cụ cầm tay FERM', en: 'FERM power tools' } },
    ],
  },
]

export const findCategory = (slug: string) => categories.find((c) => c.slug === slug)

export const findSub = (catSlug: string, subSlug: string) =>
  findCategory(catSlug)?.children.find((s) => s.slug === subSlug)
