import type { Localized } from '@/lib/i18n'

/**
 * Dữ liệu sản phẩm demo — dựng từ ảnh khách gửi (public/images/SanPham).
 *
 * TODO(khach): xác nhận tên máy, hãng/model, tình trạng mới/đã qua sử dụng
 *   (hiện suy ra từ ảnh), thông số kỹ thuật chi tiết, video, catalogue PDF.
 * AGENTS.md → R2: KHÔNG tự đặt thông số số liệu. `highlights` chỉ nêu hãng/model
 *   đọc được trên ảnh và công dụng chung của loại máy.
 * AGENTS.md → R1: mọi ảnh đều có watermark → hasStamp: true → luôn object-contain.
 */
export type Condition = 'new' | 'used'

export type ProductImage = { src: string; hasStamp: boolean }

export type Product = {
  slug: string
  category: string
  sub: string
  condition: Condition
  brand?: string
  model?: string
  name: Localized
  /** 2 dòng thông số chính hiển thị trên thẻ (4–6 từ/dòng) */
  highlights: [Localized, Localized]
  images: ProductImage[]
  video?: string
  catalogPdf?: string
  featured?: boolean
}

const im = (...files: string[]): ProductImage[] =>
  files.map((f) => ({ src: `/images/SanPham/${f}`, hasStamp: true }))

const WOOD = 'may-che-bien-go'

export const products: Product[] = [
  // ——— Máy chà nhám ———
  {
    slug: 'may-cha-nham-choi-dtl-20d',
    category: WOOD, sub: 'may-cha-nham', condition: 'new', model: 'DTL-20D', featured: true,
    name: { vi: 'Máy chà nhám chổi DTL-20D', en: 'DTL-20D brush sanding machine' },
    highlights: [
      { vi: 'Model DTL-20D, bàn làm việc rộng', en: 'Model DTL-20D, wide work table' },
      { vi: 'Chà nhám chi tiết cong, phào', en: 'Sands curved parts and mouldings' },
    ],
    images: im('362512139131_440x330.jpg'),
  },
  {
    slug: 'may-cha-nham-choi-hai-dau-dtw-60a',
    category: WOOD, sub: 'may-cha-nham', condition: 'new', model: 'DTW-60A', featured: true,
    name: { vi: 'Máy chà nhám chổi hai đầu DTW-60A', en: 'DTW-60A double-head brush sander' },
    highlights: [
      { vi: 'Model DTW-60A, hai đầu chổi', en: 'Model DTW-60A, two brush heads' },
      { vi: 'Hai người thao tác cùng lúc', en: 'Two operators at once' },
    ],
    images: im('176549083021_440x330.jpg'),
  },
  {
    slug: 'may-cha-nham-thung-sheng-shing',
    category: WOOD, sub: 'may-cha-nham', condition: 'used', brand: 'Sheng Shing',
    name: { vi: 'Máy chà nhám thùng Sheng Shing', en: 'Sheng Shing wide-belt sander' },
    highlights: [
      { vi: 'Hãng Sheng Shing, Đài Loan', en: 'Sheng Shing, made in Taiwan' },
      { vi: 'Chà nhám tấm khổ rộng', en: 'Sands wide panels evenly' },
    ],
    images: im('769098419149_440x330.jpg', '372391088619_440x330.jpg'),
  },
  {
    slug: 'may-cha-nham-thung-kho-rong',
    category: WOOD, sub: 'may-cha-nham', condition: 'used',
    name: { vi: 'Máy chà nhám thùng khổ rộng', en: 'Wide-belt panel sander' },
    highlights: [
      { vi: 'Băng nhám khổ rộng, hút bụi', en: 'Wide belt with dust extraction' },
      { vi: 'Hoàn thiện bề mặt ván ghép', en: 'Finishes glued panel surfaces' },
    ],
    images: im('156881586442_440x330.jpg'),
  },
  {
    slug: 'may-cha-nham-thung-mot-truc',
    category: WOOD, sub: 'may-cha-nham', condition: 'used',
    name: { vi: 'Máy chà nhám thùng một trục', en: 'Single-head drum sander' },
    highlights: [
      { vi: 'Bảng điều khiển điện tử', en: 'Digital control panel' },
      { vi: 'Chà nhám phẳng chi tiết gỗ', en: 'Flat sanding of wood parts' },
    ],
    images: im('540756052252_440x330.jpg'),
  },
  {
    slug: 'may-cha-nham-canh-bang-dai',
    category: WOOD, sub: 'may-cha-nham', condition: 'new',
    name: { vi: 'Máy chà nhám cạnh băng dài', en: 'Long-belt edge sander' },
    highlights: [
      { vi: 'Băng nhám dài, bàn nâng hạ', en: 'Long belt, adjustable table' },
      { vi: 'Chà cạnh và mặt phẳng', en: 'Sands edges and flat faces' },
    ],
    images: im('840425182411_440x330.jpg'),
  },
  {
    slug: 'may-cha-nham-bang-canh',
    category: WOOD, sub: 'may-cha-nham', condition: 'used',
    name: { vi: 'Máy chà nhám băng cạnh bàn trượt', en: 'Sliding-table belt edge sander' },
    highlights: [
      { vi: 'Bàn trượt có tay quay', en: 'Hand-wheel sliding table' },
      { vi: 'Chà nhám cạnh chi tiết dài', en: 'Sands edges of long parts' },
    ],
    images: im('539492125120_440x330.jpg'),
  },
  // ——— Máy bào ———
  {
    slug: 'may-bao-goodtek',
    category: WOOD, sub: 'may-bao', condition: 'new', brand: 'GOODTEK', featured: true,
    name: { vi: 'Máy bào cuốn công nghiệp GOODTEK', en: 'GOODTEK industrial thickness planer' },
    highlights: [
      { vi: 'Hãng GOODTEK, bảng điều khiển', en: 'GOODTEK, front control panel' },
      { vi: 'Bào phẳng phôi gỗ khổ rộng', en: 'Planes wide timber stock' },
    ],
    images: im('095609374630_440x330.jpg'),
  },
  {
    slug: 'may-bao-bon-mat',
    category: WOOD, sub: 'may-bao', condition: 'used',
    name: { vi: 'Máy bào bốn mặt công nghiệp', en: 'Industrial four-sided moulder' },
    highlights: [
      { vi: 'Nhiều trục dao liên tục', en: 'Multiple cutter spindles' },
      { vi: 'Bào định hình thanh gỗ', en: 'Profiles timber in one pass' },
    ],
    images: im('065762189629_440x330.jpg', '835382763873_440x330.jpg'),
  },
  {
    slug: 'may-bao-bon-mat-kikukawa',
    category: WOOD, sub: 'may-bao', condition: 'used', brand: 'KIKUKAWA',
    name: { vi: 'Máy bào bốn mặt KIKUKAWA', en: 'KIKUKAWA four-sided moulder' },
    highlights: [
      { vi: 'Hãng KIKUKAWA, Nhật Bản', en: 'KIKUKAWA, made in Japan' },
      { vi: 'Bào định hình thanh dài', en: 'Profiles long timber pieces' },
    ],
    images: im('896727440867_440x330.jpg'),
  },
  {
    slug: 'may-bao-bon-mat-kho-lon',
    category: WOOD, sub: 'may-bao', condition: 'used',
    name: { vi: 'Máy bào bốn mặt khổ lớn', en: 'Large four-sided moulder' },
    highlights: [
      { vi: 'Thân máy dài, có che chắn', en: 'Long frame with safety hood' },
      { vi: 'Sản xuất thanh gỗ hàng loạt', en: 'Batch production of timber' },
    ],
    images: im('241375878429_440x330.jpg'),
  },
  {
    slug: 'may-bao-cuon-mot-mat',
    category: WOOD, sub: 'may-bao', condition: 'used',
    name: { vi: 'Máy bào cuốn một mặt', en: 'Single-sided thickness planer' },
    highlights: [
      { vi: 'Thân gang chắc chắn', en: 'Rigid cast-iron body' },
      { vi: 'Bào chuẩn độ dày phôi', en: 'Planes stock to thickness' },
    ],
    images: im('295342699918_440x330.jpg'),
  },
  // ——— Máy CNC ———
  {
    slug: 'may-cnc-shoda-nc-261',
    category: WOOD, sub: 'may-cnc', condition: 'used', brand: 'SHODA', model: 'NC-261', featured: true,
    name: { vi: 'Máy CNC SHODA NC-261', en: 'SHODA NC-261 CNC router' },
    highlights: [
      { vi: 'Hãng SHODA, Nhật Bản', en: 'SHODA, made in Japan' },
      { vi: 'Nhiều đầu trục gia công', en: 'Multi-spindle routing head' },
    ],
    images: im('126319985088_440x330.jpg'),
  },
  {
    slug: 'may-cnc-shoda-nhieu-dau',
    category: WOOD, sub: 'may-cnc', condition: 'used', brand: 'SHODA',
    name: { vi: 'Máy CNC router SHODA nhiều đầu', en: 'SHODA multi-head CNC router' },
    highlights: [
      { vi: 'Hãng SHODA, bàn gia công dài', en: 'SHODA, long machining table' },
      { vi: 'Gia công định hình hàng loạt', en: 'Batch profile machining' },
    ],
    images: im('867529244721_440x330.jpg', '879933834320_440x330.jpg'),
  },
  // ——— Máy ép ———
  {
    slug: 'may-ep-nong-qiulin',
    category: WOOD, sub: 'may-ep', condition: 'used', brand: 'Qiulin',
    name: { vi: 'Máy ép nóng nhiều tầng Qiulin', en: 'Qiulin multi-daylight hot press' },
    highlights: [
      { vi: 'Hãng Qiulin, nhiều tầng ép', en: 'Qiulin, multiple daylights' },
      { vi: 'Ép dán ván và veneer', en: 'Presses panels and veneer' },
    ],
    images: im('233878436391_440x330.jpg'),
  },
  {
    slug: 'may-ep-nong-orma',
    category: WOOD, sub: 'may-ep', condition: 'used', brand: 'ORMA',
    name: { vi: 'Máy ép nóng thủy lực ORMA', en: 'ORMA hydraulic hot press' },
    highlights: [
      { vi: 'Hãng ORMA, Italy', en: 'ORMA, made in Italy' },
      { vi: 'Ép tấm khổ lớn', en: 'Presses large-format panels' },
    ],
    images: im('898445871496_440x330.jpg'),
  },
  {
    slug: 'may-ep-nong-thuy-luc',
    category: WOOD, sub: 'may-ep', condition: 'used',
    name: { vi: 'Máy ép nóng thủy lực khổ dài', en: 'Long-bed hydraulic hot press' },
    highlights: [
      { vi: 'Hệ xi lanh thủy lực', en: 'Hydraulic cylinder system' },
      { vi: 'Ép dán ván ghép, tấm phủ', en: 'Presses laminated boards' },
    ],
    images: im('797000191521_440x330.jpg'),
  },
  {
    slug: 'may-ep-nguoi-thuy-luc',
    category: WOOD, sub: 'may-ep', condition: 'used',
    name: { vi: 'Máy ép nguội thủy lực', en: 'Hydraulic cold press' },
    highlights: [
      { vi: 'Bàn ép lớn, nhiều xi lanh', en: 'Large bed, multiple cylinders' },
      { vi: 'Ép dán ván không gia nhiệt', en: 'Cold-presses glued panels' },
    ],
    images: im('295811058280_440x330.jpg'),
  },
  // ——— Máy ghép ———
  {
    slug: 'may-ghep-go-xoay-kuboke',
    category: WOOD, sub: 'may-ghep', condition: 'new', brand: 'KUBOKE',
    name: { vi: 'Máy ghép gỗ xoay KUBOKE', en: 'KUBOKE rotary clamp carrier' },
    highlights: [
      { vi: 'Thương hiệu KUBOKE – Hoà Phú', en: 'KUBOKE brand by Hoa Phu' },
      { vi: 'Ghép thanh gỗ thành tấm', en: 'Glues strips into panels' },
    ],
    images: im('159981781826455_440x330.jpg'),
  },
  {
    slug: 'may-ghep-go-xoay-thuy-luc',
    category: WOOD, sub: 'may-ghep', condition: 'used',
    name: { vi: 'Máy ghép gỗ xoay thủy lực', en: 'Hydraulic rotary clamp carrier' },
    highlights: [
      { vi: 'Nhiều tầng kẹp xoay vòng', en: 'Multiple rotating clamp tiers' },
      { vi: 'Ghép tấm năng suất cao', en: 'High-output panel gluing' },
    ],
    images: im('212230662445_440x330.jpg', '306412019220_440x330.jpg'),
  },
  {
    slug: 'ban-ghep-khung-dung',
    category: WOOD, sub: 'may-ghep', condition: 'used',
    name: { vi: 'Bàn ghép gỗ khung đứng', en: 'Vertical frame clamp rack' },
    highlights: [
      { vi: 'Khung thép, kẹp khí nén', en: 'Steel frame, pneumatic clamps' },
      { vi: 'Ghép tấm tiết kiệm diện tích', en: 'Space-saving panel gluing' },
    ],
    images: im('450913549686_440x330.jpg', '293154979829_440x330.jpg'),
  },
  // ——— Máy phay mộng / phay ———
  {
    slug: 'may-phay-truc-dung-taichan',
    category: WOOD, sub: 'may-phay-mong', condition: 'used', brand: 'TAICHAN',
    name: { vi: 'Máy phay trục đứng TAICHAN', en: 'TAICHAN spindle moulder' },
    highlights: [
      { vi: 'Hãng TAICHAN, Đài Loan', en: 'TAICHAN, made in Taiwan' },
      { vi: 'Phay mộng, phay định hình', en: 'Tenoning and profile shaping' },
    ],
    images: im('200657974387_440x330.jpg'),
  },
  {
    slug: 'may-phay-truc-dung-ban-rong',
    category: WOOD, sub: 'may-phay-mong', condition: 'new',
    name: { vi: 'Máy phay trục đứng bàn rộng', en: 'Wide-table spindle moulder' },
    highlights: [
      { vi: 'Bàn rộng, hai tay quay', en: 'Wide table, twin hand wheels' },
      { vi: 'Phay mộng chi tiết lớn', en: 'Tenons large workpieces' },
    ],
    images: im('822957880839_440x330.jpg'),
  },
  {
    slug: 'may-phay-mong-hai-dau',
    category: WOOD, sub: 'may-phay-mong', condition: 'used',
    name: { vi: 'Máy phay mộng hai đầu', en: 'Double-end tenoner' },
    highlights: [
      { vi: 'Gia công hai đầu cùng lúc', en: 'Machines both ends at once' },
      { vi: 'Làm mộng chi tiết nội thất', en: 'Tenons furniture components' },
    ],
    images: im('134701780025_440x330.jpg', '360112600205_440x330.jpg'),
  },
  {
    slug: 'may-phay-mong-finger',
    category: WOOD, sub: 'may-phay-mong', condition: 'used',
    name: { vi: 'Máy phay mộng finger', en: 'Finger-joint shaper' },
    highlights: [
      { vi: 'Bàn đẩy phôi tự động', en: 'Automatic stock-feed table' },
      { vi: 'Tạo mộng răng lược', en: 'Cuts finger-joint profiles' },
    ],
    images: im('053794879239_440x330.jpg', '101702352606_440x330.jpg'),
  },
  {
    slug: 'may-phay-chep-hinh-kr-100',
    category: WOOD, sub: 'may-phay-mong', condition: 'used', model: 'KR-100',
    name: { vi: 'Máy phay chép hình bàn xoay KR-100', en: 'KR-100 rotary copy shaper' },
    highlights: [
      { vi: 'Model KR-100, bàn xoay tròn', en: 'Model KR-100, rotary table' },
      { vi: 'Phay chép hình chi tiết cong', en: 'Copy-shapes curved parts' },
    ],
    images: im('251708933647_440x330.jpg', '188442698700_440x330.jpg'),
  },
  // ——— Máy cưa / tiện / dán cạnh ———
  {
    slug: 'may-cua-ban-kuboke',
    category: WOOD, sub: 'may-cua', condition: 'new', brand: 'KUBOKE',
    name: { vi: 'Máy cưa bàn KUBOKE', en: 'KUBOKE table saw' },
    highlights: [
      { vi: 'Thương hiệu KUBOKE – Hoà Phú', en: 'KUBOKE brand by Hoa Phu' },
      { vi: 'Cưa xẻ, rọc phôi gỗ', en: 'Rips and cross-cuts timber' },
    ],
    images: im('945138274217_440x330.jpg'),
  },
  {
    slug: 'may-cua-can-radial',
    category: WOOD, sub: 'may-cua', condition: 'used',
    name: { vi: 'Máy cưa cần radial', en: 'Radial arm saw' },
    highlights: [
      { vi: 'Bàn gỗ lớn, đầu cưa trượt', en: 'Large table, sliding head' },
      { vi: 'Cắt ngang phôi gỗ dài', en: 'Cross-cuts long timber' },
    ],
    images: im('560063484240_440x330.jpg'),
  },
  {
    slug: 'may-cua-long-cong-nghiep',
    category: WOOD, sub: 'may-cua', condition: 'used',
    name: { vi: 'Máy cưa lọng công nghiệp', en: 'Industrial jigsaw machine' },
    highlights: [
      { vi: 'Thân gang, bàn làm việc rộng', en: 'Cast frame, wide table' },
      { vi: 'Cắt đường cong chi tiết', en: 'Cuts curved profiles' },
    ],
    images: im('742520674876_440x330.jpg'),
  },
  {
    slug: 'may-tien-go-tu-dong',
    category: WOOD, sub: 'may-tien', condition: 'used',
    name: { vi: 'Máy tiện gỗ tự động', en: 'Automatic wood lathe' },
    highlights: [
      { vi: 'Tiện chép hình tự động', en: 'Automatic copy turning' },
      { vi: 'Tiện chân bàn, chân ghế', en: 'Turns table and chair legs' },
    ],
    images: im('911705702788_440x330.jpg'),
  },
  {
    slug: 'may-dan-canh-brandt',
    category: WOOD, sub: 'may-dan-canh', condition: 'used', brand: 'BRANDT',
    name: { vi: 'Máy dán cạnh tự động BRANDT', en: 'BRANDT automatic edge bander' },
    highlights: [
      { vi: 'Hãng BRANDT, Đức', en: 'BRANDT, made in Germany' },
      { vi: 'Dán cạnh tấm thẳng', en: 'Straight panel edge banding' },
    ],
    images: im('298267537609_440x330.jpg'),
  },
  {
    slug: 'may-dan-canh-cam-tay',
    category: WOOD, sub: 'may-dan-canh', condition: 'new',
    name: { vi: 'Máy dán cạnh cầm tay', en: 'Portable edge bander' },
    highlights: [
      { vi: 'Nhỏ gọn, chỉnh nhiệt độ', en: 'Compact, adjustable heat' },
      { vi: 'Dán cạnh cong tại chỗ', en: 'Bands curved edges on site' },
    ],
    images: im('613782087498_440x330.jpg', '689635064594_440x330.jpg'),
  },
  // ——— Dây chuyền ———
  {
    slug: 'day-chuyen-ghep-finger-tu-dong',
    category: 'day-chuyen-san-xuat', sub: 'finger-ghep', condition: 'used',
    name: { vi: 'Dây chuyền ghép finger tự động', en: 'Automatic finger-jointing line' },
    highlights: [
      { vi: 'Phay finger, tráng keo, ép nối', en: 'Shaping, gluing and jointing' },
      { vi: 'Nối thanh gỗ ngắn thành dài', en: 'Joins short pieces into lengths' },
    ],
    images: im('795651582630_440x330.jpg', '112856670590_440x330.jpg'),
  },
  // ——— Băng tải ———
  {
    slug: 'bang-tai-xich-khung-thep',
    category: 'bang-tai-cong-nghiep', sub: 'xich', condition: 'used',
    name: { vi: 'Băng tải xích khung thép', en: 'Steel-frame chain conveyor' },
    highlights: [
      { vi: 'Khung thép dài, truyền xích', en: 'Long steel frame, chain drive' },
      { vi: 'Vận chuyển phôi trong xưởng', en: 'Moves stock across the plant' },
    ],
    images: im('947022703402_440x330.jpg'),
  },
  // ——— Gia công cơ khí ———
  {
    slug: 'bo-nguon-thuy-luc',
    category: 'gia-cong-co-khi', sub: 'nguon-thuy-luc', condition: 'new',
    name: { vi: 'Bộ nguồn thủy lực theo yêu cầu', en: 'Custom hydraulic power unit' },
    highlights: [
      { vi: 'Van điều khiển, đồng hồ áp', en: 'Control valves, pressure gauges' },
      { vi: 'Cấp lực cho máy ép, máy ghép', en: 'Powers presses and clamps' },
    ],
    images: im('166317102675_440x330.jpg'),
  },
  // ——— Máy nén khí & thiết bị ———
  {
    slug: 'may-nen-khi-mitsuseiki-zv22',
    category: 'may-nen-khi-thiet-bi', sub: 'may-nen-khi', condition: 'new', brand: 'Mitsuseiki', model: 'ZV22',
    name: { vi: 'Máy nén khí trục vít Mitsuseiki ZV22', en: 'Mitsuseiki ZV22 screw compressor' },
    highlights: [
      { vi: 'Trục vít biến tần ZV22', en: 'ZV22 inverter screw drive' },
      { vi: 'Kèm máy sấy khí, bình chứa', en: 'With air dryer and tank' },
    ],
    images: im('339056029723_440x330.jpg'),
  },
  {
    slug: 'may-nen-khi-hitachi-hiscrew-75',
    category: 'may-nen-khi-thiet-bi', sub: 'may-nen-khi', condition: 'used', brand: 'Hitachi', model: 'Hiscrew 75',
    name: { vi: 'Máy nén khí Hitachi Hiscrew 75', en: 'Hitachi Hiscrew 75 compressor' },
    highlights: [
      { vi: 'Hãng Hitachi, trục vít biến tần', en: 'Hitachi inverter screw type' },
      { vi: 'Cấp khí nén cho cả xưởng', en: 'Supplies air to the plant' },
    ],
    images: im('453860942366_440x330.jpg'),
  },
  {
    slug: 'may-cat-otc-super-plasma-d-12000',
    category: 'may-nen-khi-thiet-bi', sub: 'cat-plasma', condition: 'used', brand: 'OTC', model: 'D-12000',
    name: { vi: 'Máy cắt OTC Super Plasma D-12000', en: 'OTC Super Plasma D-12000 cutter' },
    highlights: [
      { vi: 'Hãng OTC, Nhật Bản', en: 'OTC, made in Japan' },
      { vi: 'Cắt kim loại tấm bằng plasma', en: 'Plasma cutting of sheet metal' },
    ],
    images: im('231926425416_440x330.jpg'),
  },
  {
    slug: 'may-han-inverter-elecon',
    category: 'may-nen-khi-thiet-bi', sub: 'thiet-bi-han', condition: 'used', brand: 'ELECON',
    name: { vi: 'Máy hàn Inverter ELECON', en: 'ELECON inverter welder' },
    highlights: [
      { vi: 'Công nghệ Inverter tiết kiệm', en: 'Energy-saving inverter design' },
      { vi: 'Hàn kết cấu, chi tiết máy', en: 'Welds frames and machine parts' },
    ],
    images: im('397946883880_440x330.jpg'),
  },
  {
    slug: 'thiet-bi-han-cong-nghiep',
    category: 'may-nen-khi-thiet-bi', sub: 'thiet-bi-han', condition: 'used',
    name: { vi: 'Thiết bị hàn công nghiệp các loại', en: 'Assorted industrial welding units' },
    highlights: [
      { vi: 'Máy hàn MIG, TIG, que', en: 'MIG, TIG and stick welders' },
      { vi: 'Phụ kiện, dây hàn đi kèm', en: 'Cables and accessories included' },
    ],
    images: im('918685093431_440x330.jpg'),
  },
]

export const findProduct = (slug: string) => products.find((p) => p.slug === slug)

export const brands = Array.from(
  new Set(products.map((p) => p.brand).filter((b): b is string => Boolean(b))),
).sort((a, b) => a.localeCompare(b))

export const heroSlides = ['may-cha-nham-choi-dtl-20d', 'may-bao-goodtek', 'may-cnc-shoda-nc-261']
  .map((s) => findProduct(s))
  .filter((p): p is Product => Boolean(p))
