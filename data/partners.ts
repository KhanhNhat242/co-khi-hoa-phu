import fs from 'node:fs'
import path from 'node:path'

/** Logo đối tác do khách gửi (public/images/Ảnh đối tác). Đọc 1 lần lúc build. */
const DIR = 'Ảnh đối tác'

export const partnerLogos: string[] = fs
  .readdirSync(path.join(process.cwd(), 'public', 'images', DIR))
  .filter((f) => /\.(jpe?g|png|gif|webp)$/i.test(f))
  .sort()
  .map((f) => encodeURI(`/images/${DIR}/${f}`))
