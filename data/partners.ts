import fs from 'node:fs'
import path from 'node:path'

/**
 * Logo đối tác do khách gửi. Bản gốc (157×60, nhiều viền trắng) ở public/images/Ảnh đối tác;
 * bản dùng trên web đã cắt viền trắng (sharp trim, PNG) ở public/images/doi-tac để logo lấp đầy ô.
 * Đọc 1 lần lúc build.
 */
const DIR = 'doi-tac'

export const partnerLogos: string[] = fs
  .readdirSync(path.join(process.cwd(), 'public', 'images', DIR))
  .filter((f) => /\.(jpe?g|png|gif|webp)$/i.test(f))
  .sort()
  .map((f) => encodeURI(`/images/${DIR}/${f}`))
