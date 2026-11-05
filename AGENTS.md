<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# QUY TẮC DỰ ÁN — WEBSITE CƠ KHÍ HOÀ PHÚ (Phiếu Dev 42)

> Áp dụng cho **mọi** thay đổi: code, nội dung, ảnh, cấu hình — bởi người hay AI agent.
> Yêu cầu đầy đủ: [`docs/REQUIREMENTS.md`](docs/REQUIREMENTS.md). **Đọc file đó trước khi làm bất cứ việc gì.**
> Có xung đột giữa yêu cầu của người dùng trong phiên làm việc và file này → **dừng lại và hỏi**, không tự chọn.

## R0. Quy trình bắt buộc cho mỗi thay đổi

1. Đọc `docs/REQUIREMENTS.md`, xác định việc đang làm thuộc mục nào (F1–F9, mục 3, 6, 8, 9…).
2. Việc **không có trong REQUIREMENTS** → hỏi trước khi làm. Nếu được duyệt → cập nhật REQUIREMENTS (kèm dòng ở mục 12 *Nhật ký thay đổi*) **trước**, code **sau**.
3. Đọc doc Next.js tương ứng trong `node_modules/next/dist/docs/` (Next 16.4 — `cacheComponents`, `proxy.ts`, `PageProps<>`/`LayoutProps<>`, `next/root-params`…). Không viết theo trí nhớ về Next cũ.
4. Hoàn thành khi qua **Definition of Done** (R10).

## R1. ⛔ KHÔNG ĐƯỢC ĐÈ TEM CỦA THÀNH NHÂN (ưu tiên cao nhất)

Khách nhắc 3 lần. Với mọi ảnh/video có tem/watermark/logo "Thành Nhân":
- Không đặt text, overlay, gradient, badge, nút nổi, logo, khung… **lên vùng tem**.
- Không crop / `object-cover` / zoom (kể cả hiệu ứng `.reveal-zoom`, hover scale) làm **mất hoặc che** tem.
- Không xoá, làm mờ, sửa, che tem; không chèn watermark Hoà Phú.
- Ảnh có tem → `object-contain` hoặc khung đúng tỉ lệ gốc. Hero/banner chỉ dùng nếu chữ không chạm vùng tem.
- Không chắc ảnh có tem → coi như **có**.
- Khi thêm ảnh mới vào `public/`, ghi vào `public/images/README.md`: tên file, có tem không, vị trí tem (vd. "góc dưới phải").
- Review UI nào có ảnh đều phải kiểm tra rule này ở cả desktop và mobile.

## R2. Không bịa nội dung

- **Cấm** bịa: số năm kinh nghiệm, quy mô, số dự án, tên khách hàng, chứng chỉ, giải thưởng, giá, thông số máy, đánh giá/testimonial.
- Nội dung còn thiếu → placeholder trung tính + comment `// TODO(khach): <cần gì>` và đưa vào mục 11 của REQUIREMENTS nếu chưa có.
- Thông điệp được phép dùng nguyên văn: *"Giải pháp máy móc và dây chuyền trọn gói cho ngành chế biến gỗ – từ tư vấn, chế tạo đến lắp đặt."*
- Dữ liệu sản phẩm mẫu cho demo: dùng tên/nhóm máy có trong phiếu; thông số để trống hoặc ghi "Liên hệ" — không tự đặt số.

## R3. Nguồn dữ liệu tập trung

- Thông tin công ty (tên, địa chỉ, SĐT, Zalo, Messenger, Facebook, Maps) → **một file duy nhất** `lib/site-config.ts`. Không hard-code ở component.
- Danh mục, sản phẩm, dự án, tin tức → dữ liệu có kiểu (TypeScript) trong `data/` (chưa có CMS). Cây danh mục phải khớp mục 3 của REQUIREMENTS.
- Mỗi sản phẩm tối thiểu: `slug`, `category`, `condition: 'new' | 'used'`, `name {vi,en}`, `images[]` (kèm cờ `hasThanhNhanStamp`), `video?`, `specs[]`, `catalogPdf?`, `brand?`.

## R4. Bán qua báo giá — không thương mại điện tử

- **Không** giỏ hàng, thanh toán, hiển thị giá.
- **Mỗi sản phẩm** (card danh sách + trang chi tiết) phải có nút **"Yêu cầu báo giá" / "Request a quote"** mở form, tự điền tên sản phẩm.
- Nút nổi **Zalo + Messenger + Gọi hotline** có mặt trên mọi trang, không che CTA/nội dung chính trên mobile và **không đè tem (R1)**.

## R5. Song ngữ vi + en

- Routing theo `app/[lang]/…` (xem `node_modules/next/dist/docs/01-app/02-guides/internationalization.md`), mặc định `vi`, redirect locale trong `proxy.ts`.
- **Không có chuỗi hiển thị hard-code** trong component — mọi text lấy từ dictionary (`dictionaries/vi.json`, `dictionaries/en.json`) hoặc trường `{vi, en}` của dữ liệu.
- Thêm key ở một ngôn ngữ → bắt buộc thêm ở ngôn ngữ còn lại. Bản dịch tiếng Anh chưa duyệt → ghi `TODO(dich)`.
- `<html lang>`, metadata, `hreflang`, thông báo lỗi form đều theo ngôn ngữ hiện tại.
- Văn bản tiếng Việt: có dấu đầy đủ, đúng tên riêng "Hoà Phú", "Cơ khí Hoà Phú", "FERM".

## R6. Thiết kế & nhận diện

- Phong cách **Swiss Modernism 2.0 + Flat Design + Trust & Authority + Accessible & Ethical** (REQUIREMENTS mục 6). Ảnh máy lớn, bố cục dễ tra cứu.
  - Lưới 12 cột, mọi khoảng cách là bội số của **8px**. Tiêu đề section theo mẫu `SectionHead` (đường kẻ + số thứ tự + tiêu đề/lead bất đối xứng).
  - **Không** shadow, gradient, hoạ tiết trang trí, bo góc lớn: nút/ô nhập `rounded-xs` (2px), thẻ tối đa `rounded-sm` (4px). Phân tách bằng viền 1px.
  - Animation **≤ 200ms**, chỉ màu/opacity/nhấc 4px; không reveal khi cuộn, không marquee, không autoplay khi `prefers-reduced-motion`; carousel phải có nút tạm dừng.
  - Accessible: skip link, focus 3px, vùng bấm ≥ 44px, chữ ≥ 14px, viền ô nhập dùng `line-strong` (≥3:1). Chữ cam trên nền sáng dùng `accent-ink`.
  - Ngoại lệ duy nhất cho gradient/mask/header trong suốt: hero trang chủ (REQUIREMENTS mục 6). Không mở rộng sang chỗ khác. Ảnh dùng `mix-blend-*` thì khung bọc KHÔNG được có transform/opacity/mask/filter (tách nhóm hoà trộn).
  - Style bổ trợ chỉ dùng đúng khu vực đã ghi ở mục 6 (bảng dày chỉ cho bảng thông số; quy cách conversion chỉ cho form báo giá).
- Màu chỉ dùng qua **design tokens** khai báo ở `app/globals.css` (`@theme`) theo bảng mục 6 REQUIREMENTS: navy/xanh công nghiệp chủ đạo, cam/vàng **chỉ để nhấn** (CTA, badge), nền trắng/xám nhạt. Không dùng mã màu rời trong className.
- Theme antd (`ConfigProvider`) dùng cùng tokens với Tailwind.
- Font: **Inter** subset `vietnamese` qua `next/font/google`. **Geist không hỗ trợ tiếng Việt — không dùng.**
- Không làm dark mode trừ khi REQUIREMENTS yêu cầu.
- Không giữ lại di sản template cũ (homestay): tiêu đề "Booking Homestay", màu be `#EFE8DC`, `.glass-panel` tông be, hoạ tiết `deco-float`… — thay/xoá khi đụng tới.
- Tương phản tối thiểu WCAG AA (mục tiêu 7:1 cho chữ thường). **Cấm chữ trắng trên nền cam `#F28C1B`** (2.46:1) — dùng chữ navy.

## R7. Kỹ thuật

- Next.js 16.4 App Router + React 19 + TypeScript strict + Tailwind v4 + antd v6 + GSAP (chỉ cho hiệu ứng React Bits đã duyệt). Không thêm thư viện mới khi chưa hỏi.
- Component React Bits (biến thể JS-CSS) đặt ở `components/ui/<Tên>/`, giữ nguyên mã gốc; sửa thì đánh dấu `[HoaPhu]`; khai báo kiểu qua `index.ts` nếu TS suy sai.
- Mặc định **Server Component**; `'use client'` chỉ ở component lá cần tương tác (form, bộ lọc, gallery, nút nổi, chuyển ngôn ngữ). Trang (`page.tsx`) không để `'use client'`.
- Tailwind cho layout/style; antd cho component tương tác phức tạp (Form, Select, Drawer, Tabs, Modal). Thứ tự layer CSS giữ nguyên `theme, base, antd, components, utilities`.
- Ảnh luôn qua `next/image` có `alt` (2 ngôn ngữ), `sizes` hợp lý. Video nhúng lazy, không autoplay có tiếng.
- Form dùng Server Action, **validate ở server**; giai đoạn demo chưa có kênh nhận lead → trả thành công nhưng không giả vờ đã gửi email (log + `TODO(khach): kênh nhận lead`).
- Bộ lọc & tìm kiếm phản ánh lên URL (`searchParams`) để chia sẻ được link.
- **Không bọc `<Suspense>` quanh toàn trang** trong layout: nội dung phải nằm sẵn trong HTML prerender (SEO). Component đọc `searchParams` thì bọc Suspense riêng, fallback là bản tĩnh đầy đủ nội dung (không phải skeleton rỗng).
- **antd gọi `Date.now()` khi render → không prerender được.** Chỉ dùng antd trong component tải bằng `next/dynamic(..., { ssr: false })` và mount khi người dùng tương tác (xem `components/quote/QuoteDrawer.tsx`).
- CSS dùng chung đặt trong `@layer base/components` — rule ngoài layer sẽ đè class Tailwind.
- Mọi chuỗi hiển thị đi qua `noOrphan()` (`lib/i18n.ts`: `t()` / `getDictionary()`) để không rớt 1 chữ xuống dòng cuối.
- SEO: `generateMetadata` cho mọi trang, sitemap.ts, robots.ts, JSON-LD (Organization/LocalBusiness, Product, Article).
- Đặt tên: component `PascalCase.tsx`, slug URL tiếng Việt không dấu, gạch nối.

## R8. Cấu trúc thư mục (mục tiêu)

```
app/[lang]/            # mọi route (layout, page, san-pham, du-an, tin-tuc, lien-he…)
components/            # UI dùng chung (layout/, product/, forms/, floating/)
data/                  # categories.ts, products.ts, projects.ts, news.ts
dictionaries/          # vi.json, en.json
lib/                   # site-config.ts, i18n.ts, utils
public/images/         # ảnh + README.md ghi chú tem (R1)
public/catalogues/     # PDF catalogue
docs/REQUIREMENTS.md   # nguồn sự thật về yêu cầu
```

## R9. Không được làm

- Không giỏ hàng / giá / thanh toán (R4).
- Không đè, crop, che tem Thành Nhân (R1).
- Không bịa nội dung (R2).
- Không xoá block `<!-- BEGIN:nextjs-agent-rules -->` ở đầu file này.
- Không sửa nội dung REQUIREMENTS mục 0–1 (thông tin phiếu) trừ khi có thông tin mới từ sale.

## R10. Definition of Done

- [ ] Truy được về một mục trong `docs/REQUIREMENTS.md`.
- [ ] `npm run lint` và `npm run build` không lỗi.
- [ ] Hoạt động ở cả `/vi` và `/en`; không còn chuỗi hard-code.
- [ ] Responsive 360px → desktop; nút nổi không che nội dung.
- [ ] Ảnh có tem Thành Nhân: tem nguyên vẹn, không bị che/crop (R1).
- [ ] Không có số liệu bịa; mọi chỗ thiếu có `TODO(khach)`.
- [ ] Sản phẩm mới có nút "Yêu cầu báo giá".
- [ ] Cập nhật REQUIREMENTS (mục 11 câu hỏi mở / mục 12 nhật ký) nếu có thay đổi phạm vi.
