// Nguồn duy nhất cho thông tin công ty (AGENTS.md → R3). Không hard-code ở component.
export const siteConfig = {
  name: { vi: 'Công ty TNHH Cơ Khí Hoà Phú', en: 'Hoa Phu Mechanical Co., Ltd.' },
  shortName: { vi: 'Cơ Khí Hoà Phú', en: 'Hoa Phu Machinery' },
  address: {
    vi: '49/6 Đường số 14, Khu phố 3, TP. Thủ Đức, TP. Hồ Chí Minh',
    en: '49/6 Street No. 14, Quarter 3, Thu Duc City, Ho Chi Minh City',
  },
  contactPerson: 'Nguyễn Ngọc Quỳnh',
  phoneDisplay: '0913 813 412',
  phoneHref: 'tel:+84913813412',
  zalo: 'https://zalo.me/0913813412',
  messenger: 'https://m.me/hoaphuco',
  facebook: 'https://www.facebook.com/hoaphuco',
  mapsLink: 'https://maps.app.goo.gl/Aspa2vVBo35gtCNp9',
  mapsEmbed:
    'https://www.google.com/maps?q=' +
    encodeURIComponent('49/6 Đường số 14, Khu phố 3, Thủ Đức, Hồ Chí Minh') +
    '&output=embed',
  logo: '/images/Logo/70672.png',
  // TODO(khach): email nhận báo giá, giờ làm việc, mã số thuế
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
} as const
