# TÀI LIỆU YÊU CẦU — WEBSITE CÔNG TY TNHH CƠ KHÍ HOÀ PHÚ

> **Nguồn:** Phiếu Dev số 42 (`co-khi-hoa-phu.pdf`), do sale ghi.
> **Đây là nguồn sự thật (source of truth) duy nhất về yêu cầu của dự án.** Mọi tính năng, nội dung, thiết kế đều phải truy được về một mục trong file này.
> Khi yêu cầu thay đổi → sửa file này **trước**, ghi vào mục [Nhật ký thay đổi](#12-nhật-ký-thay-đổi), rồi mới sửa code.

---

## 0. Trạng thái phiếu dev

| Trường | Giá trị |
|---|---|
| STT phiếu | 42 |
| Dev phụ trách | _(chưa điền)_ |
| Trạng thái demo | **Đang làm** |
| Link demo | _(chưa có)_ |
| Trạng thái gửi sale | _(chưa điền)_ |
| Ưu tiên (GĐ chọn) | _(chưa có)_ |
| Hạn giao demo | _(chưa có — **nhắc: SALE GHI HẠN**)_ |
| Ngày gửi khách | _(chưa có)_ |
| Phản hồi của khách | _(chưa có)_ |

> Quy trình phiếu: dev điền 3 ô vàng (Dev phụ trách, Trạng thái demo, Link demo). Khi chọn **"Xong – chờ sale gửi"** thì phiếu tự đóng.

---

## 1. Thông tin hồ sơ

| Trường | Giá trị |
|---|---|
| Ngày giao hồ sơ | 21/10/2026 |
| Sale phụ trách | Khánh Duy |
| Mã DN | DN0073 |
| Tên doanh nghiệp | **CÔNG TY TNHH CƠ KHÍ HOÀ PHÚ** |
| Ngành | Xưởng sản xuất (cơ khí, in ấn, bao bì) — thực tế: máy & thiết bị ngành chế biến gỗ, băng tải, gia công cơ khí |
| Địa chỉ | 49/6 Đường số 14, Khu phố 3, Thành phố Thủ Đức, TP. Hồ Chí Minh |
| Người liên hệ | Nguyễn Ngọc Quỳnh |
| SĐT / Zalo | **0913 813 412** |
| Facebook Page | https://www.facebook.com/hoaphuco |
| Google Maps | https://maps.app.goo.gl/Aspa2vVBo35gtCNp9 |
| Website hiện tại | Không có |
| Khách đồng ý xem demo | Có |
| Logo (Drive) | https://drive.google.com/drive/u/0/folders/19I8pcJ6J97vXvtebwMvhjkaApn0gBtXQ |
| Ảnh / tư liệu (Drive) | https://drive.google.com/drive/u/0/folders/19I8pcJ6J97vXvtebwMvhjkaApn0gBtXQ _(cùng thư mục với logo)_ |
| Website tham khảo khách thích | _(không có)_ |
| Nội dung sẵn có (giới thiệu, bảng giá, giờ mở cửa…) | _(không có)_ |

### Giá trị liên hệ chuẩn hoá (dùng trong code)

| Mục đích | Giá trị |
|---|---|
| Hiển thị | `0913 813 412` |
| `tel:` | `tel:+84913813412` |
| Zalo | `https://zalo.me/0913813412` |
| Messenger | `https://m.me/hoaphuco` |
| Facebook | `https://www.facebook.com/hoaphuco` |
| Google Maps (link) | `https://maps.app.goo.gl/Aspa2vVBo35gtCNp9` |

> Tất cả giá trị trên phải nằm ở **một file cấu hình duy nhất** (xem `AGENTS.md` → Rule R3), không hard-code rải rác.

---

## 2. Mục tiêu website

- **Mục tiêu chính:** Giới thiệu công ty / dịch vụ.
- **Mục tiêu chuyển đổi:** khách để lại **yêu cầu báo giá** hoặc liên hệ qua Zalo / Messenger / Hotline.
- **Không bán hàng online:** **KHÔNG có giỏ hàng, KHÔNG thanh toán** — máy móc bán qua báo giá.

---

## 3. Sản phẩm / dịch vụ chính (5 nhóm)

Đây cũng là **cây danh mục cấp 1** của website.

### 3.1. Máy chế biến gỗ (mới và đã qua sử dụng)
Máy ghép, máy cưa, máy chà nhám, máy sấy UV / hồng ngoại, máy bào, máy khoan, máy phay mộng, máy tiện, máy dán cạnh, máy CNC.

### 3.2. Dây chuyền sản xuất
- Dây chuyền finger / ghép tự động
- Dây chuyền sơn và sấy UV ván sàn
- Dây chuyền sơn tấm tự động

### 3.3. Băng tải công nghiệp
Băng tải con lăn, PVC, cao su, xích, Kevlar chịu nhiệt, lưới inox.

### 3.4. Gia công cơ khí
Chi tiết máy, phụ kiện ngành gỗ (khung ghế nhôm…), hộp giảm tốc, bộ nguồn thủy lực.

### 3.5. Máy nén khí & thiết bị công nghiệp
Máy nén khí, máy sấy khí, thiết bị công nghiệp (hàn, cắt plasma), dụng cụ cầm tay **FERM**.

### Cây danh mục đề xuất (nhiều cấp)

```
Sản phẩm
├── Máy chế biến gỗ
│   ├── Máy ghép · Máy cưa · Máy chà nhám · Máy sấy UV/hồng ngoại
│   ├── Máy bào · Máy khoan · Máy phay mộng · Máy tiện
│   └── Máy dán cạnh · Máy CNC
├── Dây chuyền sản xuất
│   ├── Dây chuyền finger/ghép tự động
│   ├── Dây chuyền sơn & sấy UV ván sàn
│   └── Dây chuyền sơn tấm tự động
├── Băng tải công nghiệp
│   └── Con lăn · PVC · Cao su · Xích · Kevlar chịu nhiệt · Lưới inox
├── Gia công cơ khí
│   └── Chi tiết máy · Phụ kiện ngành gỗ · Hộp giảm tốc · Bộ nguồn thủy lực
└── Máy nén khí & thiết bị công nghiệp
    └── Máy nén khí · Máy sấy khí · Thiết bị hàn · Cắt plasma · Dụng cụ cầm tay FERM
```

### Bộ lọc tối thiểu
- Danh mục (cấp 1 → cấp 2)
- Tình trạng: **Mới / Đã qua sử dụng** (bắt buộc vì phiếu nêu rõ "mới và đã qua sử dụng")
- Thương hiệu (ví dụ FERM) — chỉ hiển thị khi có dữ liệu
- (Tuỳ chọn) Ứng dụng / ngành sử dụng

---

## 4. Khách hàng mục tiêu

- Xưởng và nhà máy sản xuất **đồ gỗ nội thất, ván sàn, gỗ xuất khẩu**.
- Doanh nghiệp cần **băng tải, dây chuyền** hoặc **gia công cơ khí theo yêu cầu**.
- Khu vực: TP.HCM, Bình Dương, Đồng Nai và các tỉnh phía Nam. ⚠️ **[cần xác nhận với khách]**

→ Hệ quả thiết kế: người xem là chủ xưởng / kỹ thuật / mua hàng — cần **tra cứu nhanh thông số**, **ảnh máy rõ**, **CTA báo giá luôn trong tầm tay**, dùng tốt trên điện thoại.

---

## 5. Điểm mạnh / USP

⚠️ **[cần xin khách]** — chưa có dữ liệu thật về:
- Số năm kinh nghiệm
- Quy mô xưởng
- Có tự thiết kế & chế tạo dây chuyền theo yêu cầu không
- Chính sách bảo hành, bảo trì
- Lắp đặt tận nơi
- Khách hàng / dự án tiêu biểu

**Thông điệp gợi ý (được phép dùng):**
> "Giải pháp máy móc và dây chuyền trọn gói cho ngành chế biến gỗ – từ tư vấn, chế tạo đến lắp đặt."

> 🔒 Không được bịa số liệu, tên khách hàng, chứng chỉ, giải thưởng. Xem `AGENTS.md` → Rule R2.

---

## 6. Nhận diện & phong cách

- **Màu chủ đạo:** xanh navy hoặc xanh công nghiệp.
- **Màu nhấn:** cam / vàng.
- **Nền:** trắng, xám nhạt.
- **Phong cách:** công nghiệp hiện đại, chuyên nghiệp; **ảnh máy móc lớn**; bố cục rõ ràng, **dễ tra cứu**.
- **Logo:** lấy từ Drive (hiện trong repo chỉ có `public/images/temp-logo.png` — tạm).

### Design tokens đề xuất (chốt trong `app/globals.css`)

| Token | Giá trị | Dùng cho |
|---|---|---|
| `--color-primary` | `#0B2A4A` (navy) | Header, footer, tiêu đề, nút chính phụ |
| `--color-primary-600` | `#1E4E8C` (xanh công nghiệp) | Link, hover, icon |
| `--color-accent` | `#F28C1B` (cam) | CTA "Yêu cầu báo giá", điểm nhấn |
| `--color-accent-2` | `#FFC20E` (vàng) | Badge, gạch chân, highlight nhỏ |
| `--color-bg` | `#FFFFFF` | Nền chính |
| `--color-surface` | `#F3F5F8` (xám nhạt) | Nền section xen kẽ, card |
| `--color-text` | `#1A1F2B` | Chữ chính |
| `--color-muted` | `#4A5363` (đổi từ `#5B6575` để đạt ~7:1) | Chữ phụ |
| `--color-border` | `#DDE2EA` | Viền trang trí, phân cách |
| `--color-line-strong` | `#7A8494` | Viền ô nhập / điều khiển (≥3:1, WCAG 1.4.11) |
| `--color-accent-ink` | `#B4530A` | Chữ màu cam trên nền trắng (5:1) |
| `--color-success` / `--color-danger` | `#15803D` / `#B91C1C` | Trạng thái form |

> Cam/vàng **chỉ để nhấn** (CTA, badge) — không dùng làm nền diện rộng.
> **Tương phản đã kiểm:** chữ trắng trên cam `#F28C1B` chỉ 2.46:1 → **cấm**. Nút cam dùng chữ navy `#0B2A4A` (5.91:1) hoặc `#1A1F2B` (6.7:1); nếu bắt buộc chữ trắng thì nền phải là `#C2410C` (5.18:1). Trắng/navy 14.5:1 · link `#1E4E8C`/trắng 8.3:1 · chữ tối/vàng `#FFC20E` 10.2:1.

### Phong cách (chốt 2026-11-05)
**Swiss Modernism 2.0 + Flat Design + Trust & Authority + Accessible & Ethical.**

| Token / quy tắc | Giá trị |
|---|---|
| Lưới | 12 cột, gutter 24px (desktop) / 16px (mobile), đơn vị **8px** cho mọi khoảng cách |
| Font | Inter (subset `vietnamese`), 400–700; body 16/24, tối thiểu 14px cho chú thích |
| `--radius` | **2px** nút & ô nhập; **tối đa 4px** cho thẻ (không bo tròn lớn) |
| `--shadow` | **none** — thay bằng viền `--color-border`; không gradient |
| Animation | **≤ 200ms**, chỉ đổi màu/opacity/nhấc 4px; tắt hoàn toàn khi `prefers-reduced-motion` |
| Focus | Viền 3px `--color-accent` + offset 2px, không bao giờ ẩn |
| Vùng bấm | ≥ 44×44px |

**Style bổ trợ theo khu vực:**
- *Feature-Rich Showcase* — 5 nhóm sản phẩm (trang chủ) và trang Dịch vụ: thẻ hover nhấc 4px, **không** tác động lên ảnh (an toàn tem).
- *Data-Dense Dashboard* — **chỉ** bảng thông số kỹ thuật: hàng cao 36px, khoảng cách gọn. Không áp dụng cho phần còn lại.
- *Conversion-Optimized* — **chỉ** form Yêu cầu báo giá: ô nhập 48px, viền focus 3px, màu lỗi/thành công rõ. Không dùng cho trang danh mục.
- *Social Proof-Focused* — lưới logo đối tác ở trang Dự án (testimonial chờ dữ liệu thật — Q3).
- *Micro-interactions* — trạng thái bộ lọc, ô tìm kiếm, nút gửi form.

---

## 7. Chức năng cần có

| # | Chức năng | Ghi chú bắt buộc |
|---|---|---|
| F1 | **Danh mục sản phẩm nhiều cấp có bộ lọc** | Theo cây ở mục 3; lọc theo danh mục, tình trạng mới/cũ, thương hiệu |
| F2 | **Trang chi tiết máy** | Gallery ảnh, **video**, **bảng thông số kỹ thuật**, **tải catalogue PDF** |
| F3 | **Nút "Yêu cầu báo giá" trên TỪNG sản phẩm + form** | Có ở card danh sách và trang chi tiết; form tự điền sẵn tên sản phẩm |
| F4 | **Tìm kiếm sản phẩm** | Ô tìm kiếm ở header; tìm theo tên, danh mục, từ khoá |
| F5 | **Nút nổi: Chat Zalo, Messenger, Gọi hotline** | Luôn hiển thị mọi trang, không che nội dung/CTA chính trên mobile |
| F6 | **Google Maps** | Nhúng bản đồ ở trang Liên hệ (và footer nếu phù hợp) |
| F7 | **Trang Dự án / Khách hàng tiêu biểu** | Nội dung thật **[cần xin khách]** |
| F8 | **Tin tức kỹ thuật** | Danh sách + trang chi tiết bài viết |
| F9 | **Song ngữ Tiếng Việt + English** | Mặc định `vi`; có nút chuyển ngôn ngữ |
| ✗ | ~~Giỏ hàng / thanh toán~~ | **KHÔNG làm** — bán qua báo giá |

### Form "Yêu cầu báo giá" — trường tối thiểu
Họ tên\*, Số điện thoại/Zalo\*, Email, Tên công ty, Sản phẩm quan tâm (tự điền), Số lượng, Nội dung yêu cầu, Tỉnh/TP.
- Validate phía server (bắt buộc), thông báo lỗi bằng đúng ngôn ngữ đang xem.
- Kênh nhận lead (email / Google Sheet / Zalo OA) **[cần xác nhận]** — giai đoạn demo chỉ cần validate + hiển thị thông báo thành công.

---

## 8. Sơ đồ trang (sitemap)

| Trang | Route (`vi`) | Route (`en`) |
|---|---|---|
| Trang chủ | `/vi` | `/en` |
| Giới thiệu | `/vi/gioi-thieu` | `/en/about` |
| Sản phẩm (tất cả) | `/vi/san-pham` | `/en/products` |
| Danh mục | `/vi/san-pham/[danh-muc]` | `/en/products/[category]` |
| Chi tiết sản phẩm | `/vi/san-pham/[danh-muc]/[slug]` | `/en/products/[category]/[slug]` |
| Dịch vụ gia công / chế tạo | `/vi/dich-vu` | `/en/services` |
| Dự án / Khách hàng tiêu biểu | `/vi/du-an` | `/en/projects` |
| Tin tức kỹ thuật | `/vi/tin-tuc` + `/vi/tin-tuc/[slug]` | `/en/news` + `/en/news/[slug]` |
| Liên hệ (form + bản đồ) | `/vi/lien-he` | `/en/contact` |
| Tìm kiếm | `/vi/tim-kiem?q=` | `/en/search?q=` |

> Nếu muốn đơn giản cho demo, có thể dùng chung slug tiếng Anh cho cả hai ngôn ngữ (`/vi/products`, `/en/products`) — nhưng phải chọn **một** cách và áp dụng nhất quán. Quyết định ghi vào mục 12.

### Trang chủ — các khối nội dung
1. Hero: ảnh máy móc lớn + thông điệp gợi ý (mục 5) + CTA "Yêu cầu báo giá" & "Xem sản phẩm".
2. 5 nhóm sản phẩm/dịch vụ (mục 3) dạng thẻ có ảnh.
3. Sản phẩm nổi bật.
4. Năng lực / Vì sao chọn Hoà Phú — **placeholder có đánh dấu**, chờ USP thật.
5. Dự án tiêu biểu.
6. Tin tức kỹ thuật mới.
7. Khối CTA liên hệ + bản đồ.

---

## 9. Ràng buộc & lưu ý bắt buộc

### 9.1. ⛔ KHÔNG ĐƯỢC ĐÈ TEM CỦA THÀNH NHÂN
Phiếu nhắc **3 lần** — đây là yêu cầu nghiêm ngặt nhất của dự án.

Áp dụng cho mọi ảnh/video có tem (watermark/logo/dấu) "Thành Nhân":
- **Không** đặt chữ, overlay, gradient, badge, nút, logo khác, khung… **đè lên vùng tem**.
- **Không** crop / `object-cover` làm mất tem; **không** làm mờ, xoá, chỉnh sửa, che tem.
- **Không** chèn watermark/logo Hoà Phú lên trên tem.
- Ảnh có tem dùng `object-contain` hoặc khung đúng tỉ lệ gốc; hero/banner chỉ dùng ảnh có tem nếu chữ đặt ở vùng **không** chạm tem.
- Không chắc ảnh có tem hay không → coi như **có**.
- ⚠️ **[cần xác nhận với sale]** ngữ cảnh chính xác của "tem Thành Nhân" (tem nằm trên ảnh tư liệu? trên máy? quan hệ giữa Hoà Phú và Thành Nhân?). Trong lúc chờ, áp dụng toàn bộ quy tắc trên.

### 9.2. Không giỏ hàng, không hiển thị giá
Mọi CTA mua hàng là **"Yêu cầu báo giá"** / "Liên hệ".

### 9.3. Không bịa nội dung
Mọi thông tin đánh dấu [cần xin khách] / [cần xác nhận] → dùng placeholder có đánh dấu `TODO(khach)`, không bịa số liệu cụ thể.

---

## 10. Yêu cầu phi chức năng

- **Responsive, mobile-first** (tối thiểu 360px).
- **Font hỗ trợ tiếng Việt** đầy đủ dấu (subset `vietnamese`).
- **SEO:** metadata riêng mỗi trang, cả 2 ngôn ngữ, `hreflang`, Open Graph, sitemap.xml, robots.txt, JSON-LD (`Organization`/`LocalBusiness`, `Product`, `Article`).
- **Hiệu năng:** ảnh qua `next/image`, lazy-load, video không tự phát nặng.
- **Truy cập (a11y):** alt cho ảnh, tương phản AA, điều hướng bàn phím, nhãn form.
- `<html lang>` đúng theo ngôn ngữ hiện tại.

---

## 11. Câu hỏi mở / cần xin khách

| # | Nội dung | Trạng thái |
|---|---|---|
| Q1 | Hạn giao demo | Chờ sale ghi |
| Q2 | USP: số năm kinh nghiệm, quy mô xưởng, tự chế tạo dây chuyền?, bảo hành/bảo trì, lắp đặt tận nơi | Chờ khách |
| Q3 | Danh sách khách hàng / dự án tiêu biểu (có được nêu tên không?) | Chờ khách |
| Q4 | Xác nhận khu vực phục vụ (HCM, Bình Dương, Đồng Nai, các tỉnh phía Nam) | Chờ khách |
| Q5 | Ngữ cảnh "tem Thành Nhân" | Chờ sale |
| Q6 | Logo chính thức + ảnh máy (tải từ Drive) | Chờ tải |
| Q7 | Catalogue PDF, video, thông số kỹ thuật từng máy | Chờ khách |
| Q8 | Email nhận báo giá / kênh nhận lead | Chờ khách |
| Q9 | Nội dung giới thiệu, giờ làm việc, mã số thuế | Chờ khách |
| Q10 | Nội dung tiếng Anh do ai duyệt | Chờ sale |

---

## 12. Nhật ký thay đổi

| Ngày | Người | Thay đổi |
|---|---|---|
| 2026-11-05 | Dev | Khởi tạo tài liệu từ Phiếu Dev 42 |
| 2026-11-05 | Dev | Đổi phong cách toàn site sang Swiss Modernism 2.0 + Flat + Trust & Authority + Accessible & Ethical (mục 6). Bỏ hoạ tiết trang trí, shadow, gradient, animation dài; font đổi sang Inter; logo đối tác tĩnh (không marquee); header thêm nút báo giá. |
| 2026-11-05 | Dev | Áp dụng bản mô tả giao diện "Multi-page Architecture" (xem mục 13). Quyết định: **slug tiếng Việt dùng chung cho cả vi/en** (`/en/san-pham`…); tìm kiếm dùng `/[lang]/san-pham?q=` (không có trang `/tim-kiem` riêng); thêm danh mục con "Máy ép nóng / nguội" vào Máy chế biến gỗ vì kho ảnh có nhiều máy ép. |

---

## 13. Chuẩn giao diện (bản mô tả multi-page, đã duyệt 2026-11-05)

**Spacing:** section 88px desktop / 52px mobile, nền trắng ↔ `#F3F5F8` xen kẽ; grid gap 24–32px / 16–20px; card padding 20–24px / 16px.
**Định lượng chữ:** H1/H2 6–12 từ (hero được phép dài theo thông điệp gợi ý); lead 25–40 từ, rộng tối đa 680px; thẻ máy = tên 5–10 từ + 2 dòng thông số.
**Không rớt 1 chữ xuống dòng cuối** ở mọi đoạn text (desktop/tablet/mobile): `noOrphan()` + `text-wrap: pretty/balance`.
**Ảnh:** khung 4:3 `object-contain` trên nền trắng/xám; nhãn, chữ, icon KHÔNG đè lên ảnh.
**Header:** sticky navy, logo, tìm kiếm, VI/EN. **Cuối trang:** dải Quick-Jump gợi ý trang tiếp. **Báo giá:** drawer trượt từ phải, điền sẵn tên máy. **Nút nổi:** cột phải-dưới (desktop) / thanh đáy (mobile).

| Trang | Khối |
|---|---|
| Trang chủ `/vi` | Split hero 50/50 vừa 1 màn hình (trái navy + CTA, phải slider DTL-20D / GOODTEK / SHODA) · 5 nhóm sản phẩm (bố cục 3+2) · logo đối tác |
| Giới thiệu | Câu chuyện + ảnh gian hàng KUBOKE · Quy mô xưởng + 4 thẻ USP (`Chờ khách xác nhận`) |
| Sản phẩm | Sidebar lọc 25% (danh mục 2 cấp, Tất cả/Mới/Đã qua sử dụng, thương hiệu) + lưới 3 cột |
| Dịch vụ | 3 mảng dịch vụ · stepper 4 bước · CTA |
| Dự án / Tin tức | Bento ảnh thực tế (khu vực: chờ xác nhận) + logo đối tác · thẻ bài viết `line-clamp-2` |
| Liên hệ | 40% thông tin + bản đồ · 60% form 8 trường |

**Sai khác so với bản mô tả (cố ý):** bản mô tả ghi "máy tiện Sheng Shing", nhưng ảnh Sheng Shing trong kho là **máy chà nhám thùng** → dùng đúng theo ảnh. Bộ lọc thương hiệu chỉ hiện hãng có sản phẩm (FERM chưa có ảnh → chưa hiện).
