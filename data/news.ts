import type { Localized } from '@/lib/i18n'

/**
 * Tin tức kỹ thuật — cẩm nang vận hành & bảo dưỡng (kiến thức chung, không nêu số liệu của Hoà Phú).
 * TODO(khach): duyệt nội dung, bổ sung bài viết thực tế và ngày đăng.
 */
export type Article = {
  slug: string
  title: Localized
  summary: Localized
  image: string
  body: Localized[]
}

const img = (f: string) => `/images/SanPham/${f}`

export const articles: Article[] = [
  {
    slug: 'bao-duong-may-cha-nham-thung',
    image: img('769098419149_440x330.jpg'),
    title: {
      vi: 'Hướng dẫn bảo dưỡng máy chà nhám thùng định kỳ cho xưởng gỗ',
      en: 'A practical routine maintenance guide for wide-belt sanders in wood shops',
    },
    summary: {
      vi: 'Vệ sinh bụi, kiểm tra băng nhám, căn chỉnh con lăn và hệ khí nén đúng lịch giúp máy chạy ổn định, bề mặt gỗ đồng đều hơn.',
      en: 'Cleaning dust, checking belts, aligning rollers and servicing the air system on schedule keeps the sander stable and the finish consistent.',
    },
    body: [
      {
        vi: 'Bụi gỗ bám lâu ngày trong thùng máy làm nóng động cơ và giảm độ bám của băng nhám. Cuối mỗi ca nên thổi sạch bụi và kiểm tra đường ống hút.',
        en: 'Dust that builds up inside the cabinet heats the motor and reduces belt grip. Blow out the machine and check extraction ducts at the end of every shift.',
      },
      {
        vi: 'Băng nhám mòn không đều, rách mép hoặc bị bết keo cần thay ngay. Khi lắp băng mới, kiểm tra hướng chạy và độ căng theo khuyến cáo của nhà sản xuất.',
        en: 'Replace belts that wear unevenly, tear at the edges or clog with resin. When fitting a new belt, check the running direction and tension per the manufacturer’s guidance.',
      },
      {
        vi: 'Định kỳ kiểm tra con lăn ép, bàn tải và bộ dao động băng. Sai lệch nhỏ cũng gây sọc trên bề mặt ván, tốn công chà lại ở công đoạn sau.',
        en: 'Inspect pressure rollers, the feed bed and the belt oscillation unit regularly. Even small misalignment leaves streaks that cost extra rework downstream.',
      },
    ],
  },
  {
    slug: 'luu-y-mua-may-go-da-qua-su-dung',
    image: img('126319985088_440x330.jpg'),
    title: {
      vi: 'Năm lưu ý quan trọng khi chọn mua máy chế biến gỗ đã qua sử dụng',
      en: 'Five key checks before buying a used woodworking machine for your plant',
    },
    summary: {
      vi: 'Kiểm tra thân máy, trục chính, hệ điện, phụ tùng thay thế và chạy thử thực tế trước khi quyết định đầu tư máy cũ.',
      en: 'Inspect the frame, spindles, electrics and spare-part availability, and run a real test before investing in a used machine.',
    },
    body: [
      {
        vi: 'Thân máy và bàn làm việc phải phẳng, không nứt hay hàn vá. Đây là phần quyết định độ chính xác lâu dài của máy.',
        en: 'The frame and table must be flat, with no cracks or weld repairs. They determine the machine’s long-term accuracy.',
      },
      {
        vi: 'Trục chính, ổ bi và hộp số cần chạy êm, không rung lắc hay phát tiếng lạ. Hệ điện và bảng điều khiển nên được kiểm tra bởi thợ có kinh nghiệm.',
        en: 'Spindles, bearings and gearboxes should run smoothly without vibration or noise. Have an experienced technician check the electrics and controls.',
      },
      {
        vi: 'Cuối cùng, hãy hỏi rõ nguồn phụ tùng thay thế và yêu cầu chạy thử với phôi gỗ thực tế của xưởng mình.',
        en: 'Finally, confirm where spare parts come from and ask for a test run using your own timber stock.',
      },
    ],
  },
  {
    slug: 'chon-bang-tai-cho-day-chuyen-go',
    image: img('947022703402_440x330.jpg'),
    title: {
      vi: 'Cách chọn loại băng tải phù hợp cho dây chuyền sản xuất đồ gỗ',
      en: 'How to choose the right conveyor type for a furniture production line',
    },
    summary: {
      vi: 'Con lăn, PVC, cao su, xích hay lưới inox: mỗi loại băng tải hợp với tải trọng, nhiệt độ và công đoạn khác nhau trong xưởng.',
      en: 'Roller, PVC, rubber, chain or stainless mesh: each conveyor suits different loads, temperatures and stages in the plant.',
    },
    body: [
      {
        vi: 'Băng tải con lăn phù hợp vận chuyển tấm, kiện hàng nặng. Băng PVC nhẹ, sạch, hợp công đoạn sơn và đóng gói.',
        en: 'Roller conveyors suit heavy panels and packed goods. Lightweight, clean PVC belts work well for coating and packing stages.',
      },
      {
        vi: 'Ở khu sấy UV hoặc hồng ngoại, nên chọn băng Kevlar chịu nhiệt hoặc lưới inox để đảm bảo độ bền và an toàn.',
        en: 'In UV or infrared curing zones, heat-resistant Kevlar belts or stainless mesh offer better durability and safety.',
      },
      {
        vi: 'Băng tải xích dùng cho phôi dài, tải trọng lớn. Hãy cung cấp kích thước phôi và mặt bằng xưởng để được tư vấn chính xác.',
        en: 'Chain conveyors handle long, heavy stock. Share your stock sizes and floor layout to get an accurate recommendation.',
      },
    ],
  },
  {
    slug: 'van-hanh-may-nen-khi-truc-vit',
    image: img('339056029723_440x330.jpg'),
    title: {
      vi: 'Vận hành máy nén khí trục vít an toàn và tiết kiệm điện năng',
      en: 'Running screw air compressors safely while cutting energy consumption',
    },
    summary: {
      vi: 'Đặt máy nơi thông thoáng, xả nước bình chứa, thay lọc đúng hạn và xử lý rò rỉ đường ống giúp giảm đáng kể chi phí điện.',
      en: 'Good ventilation, draining the receiver, timely filter changes and fixing pipe leaks noticeably reduce power costs.',
    },
    body: [
      {
        vi: 'Máy nén khí cần đặt ở nơi khô ráo, thông thoáng, tránh bụi gỗ bay vào cửa hút gió làm nghẹt lọc.',
        en: 'Install the compressor in a dry, ventilated area away from wood dust that clogs the intake filter.',
      },
      {
        vi: 'Xả nước ngưng trong bình chứa hằng ngày và dùng máy sấy khí để bảo vệ xi lanh, van khí nén của các máy phía sau.',
        en: 'Drain condensate from the receiver daily and use an air dryer to protect downstream cylinders and valves.',
      },
      {
        vi: 'Rò rỉ trên đường ống là nguyên nhân hao điện phổ biến. Nên kiểm tra các khớp nối định kỳ, nhất là sau khi di dời máy.',
        en: 'Pipe leaks are a common source of wasted energy. Check fittings regularly, especially after relocating machines.',
      },
    ],
  },
]

export const findArticle = (slug: string) => articles.find((a) => a.slug === slug)
