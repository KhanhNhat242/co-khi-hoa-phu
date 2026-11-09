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

**Ngoại lệ đã duyệt (khách yêu cầu 2026-11-05) — chỉ ở hero trang chủ:**
- Nền gradient loang (`.hero-mesh`) và làm mờ mép ảnh (`.hero-fade`).
- Section 5 nhóm sản phẩm (trang chủ): nền navy tối, animation gắn với cuộn (không áp giới hạn 200ms), tự tắt khi `prefers-reduced-motion` hoặc màn hình < 1024px.
- Carousel logo đối tác (trang chủ): marquee + thẻ bo góc/bóng mềm theo ảnh mẫu khách gửi. Dừng khi hover/focus, có nút tạm dừng, tắt hẳn khi `prefers-reduced-motion` (hiện lưới tĩnh).
- **Ngoại lệ R1 (khách duyệt 2026-11-05):** section Câu chuyện (trang Giới thiệu) dùng 3 ô ảnh dọc `object-cover` + zoom khi hover (SHODA NC-261, ORMA, Sheng Shing). Watermark trên ảnh là của Hoà Phú, không phải tem Thành Nhân. Không áp dụng cho nơi khác.
- Section 3 mảng dịch vụ (trang Dịch vụ, ảnh mẫu khách gửi 2026-11-05): ≥1280px 3 thẻ xếp ngang bo 20px. **Mặc định:** ảnh phủ kín thẻ (`object-cover`) + lớp phủ navy chuyển sắc, tiêu đề và nút chữ trắng **đè lên ảnh**. **Hover / focus bàn phím** (`:focus-visible` — bấm chuột mở form rồi đóng thì thẻ về mặc định): thẻ giãn rộng, ảnh chạy sang ô bên phải rộng 296px, cao bằng tiêu đề + mô tả, lớp phủ tắt, hiện mô tả dưới tiêu đề (900ms). <1280px: lưới tĩnh ảnh contain + chữ. **Ngoại lệ R1 (khách duyệt 2026-11-05):** cho phép chữ/lớp phủ đè và cắt ảnh ở section này — 3 ảnh chỉ có watermark của Hoà Phú, không thấy tem Thành Nhân.
- Section Ảnh thực tế (trang Dự án, ảnh mẫu khách gửi 2026-11-05): tiêu đề căn giữa + **carousel 3D cong** (thẻ giữa thẳng, thẻ 2 bên nghiêng vào trong), không nút prev/next; ≥1024px & không giảm chuyển động: sân khấu sticky, cuộn lên/xuống trong section để chuyển ảnh (có dải chấm chọn ảnh); chỉ thẻ chính có chú thích **đè lên ảnh** (lớp phủ navy dưới đáy), thẻ phụ không chữ. Mobile/giảm chuyển động: carousel vuốt ngang (scroll-snap), mỗi thẻ có chú thích. **Ngoại lệ R1** (theo cùng căn cứ khách đã duyệt cho Giới thiệu/Dịch vụ): 6 ảnh chỉ có watermark Hoà Phú/KUBOKE, không thấy tem Thành Nhân → cho phép `object-cover` + chữ đè.
- Section Quy trình 4 bước (trang Dịch vụ): infographic theo ảnh mẫu khách gửi (2026-11-05) — nửa vòng tròn chứa tiêu đề, đường cong nét đứt nối 4 chấm, số thứ tự tròn + thẻ bo tròn kiểu viên thuốc nền xanh nhạt `steel-50`, hover → nền `steel` chữ trắng (200ms) và cung tiến trình chạy dọc đường nét đứt tới chấm của bước đang hover (600ms, tắt khi `prefers-reduced-motion`). Không ảnh (không liên quan R1). Mobile: danh sách dọc với đường nét đứt.
- Section Quy mô & điểm mạnh (trang Giới thiệu): chồng thẻ chạy theo cuộn, thẻ bo 20px + bóng mềm theo mẫu khách gửi; ảnh trong thẻ vẫn contain, không phủ chữ (R1).
- Nút liên hệ nổi (Gọi/Zalo/Messenger) và icon mạng xã hội ở footer: **hình tròn, không viền** (khách yêu cầu 2026-11-09).
- Thẻ video (trang Dự án, ảnh mẫu khách gửi 2026-11-09): kiểu "poster" nền navy bo 14px + bóng mềm, thumbnail bo góc (contain, R1), tên lớn 2 dòng, hàng dưới "Xem video" + nút play tròn cam. Không thêm năm/điểm đánh giá như ảnh mẫu (R2).
- Header trong suốt hoà vào hero, chỉ còn logo + 7 mục menu dồn trái + nút chuyển ngôn ngữ VI/EN ở góc phải; cuộn qua hero thì chuyển về header navy đầy đủ (animation 200ms). Các trang khác luôn dùng header navy.

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
| Q11 | ~~Video phản chiếu cho ReflectiveCard~~ | Không còn cần (đã bỏ ReflectiveCard) |

---

## 12. Nhật ký thay đổi

| Ngày | Người | Thay đổi |
|---|---|---|
| 2026-11-05 | Dev | Khởi tạo tài liệu từ Phiếu Dev 42 |
| 2026-11-09 | Dev | Thẻ sản phẩm: bỏ hẳn thẻ tag "Tình trạng · Nhóm máy" theo yêu cầu khách. |
| 2026-11-09 | Dev | Bộ lọc trang Sản phẩm sát ảnh mẫu hơn: chip bo tròn (chọn = nền navy, bỏ dấu tick), tiêu đề nhóm nhỏ, khoảng cách gọn, ô tìm kiếm bo tròn. Chip giữ cao 40px (vùng bấm). |
| 2026-11-09 | Dev | Thẻ sản phẩm: bỏ nút "Chi tiết"; tình trạng + nhóm máy gộp thành 1 thẻ tag ở góc trên-phải (hàng riêng trên ảnh, R1). |
| 2026-11-09 | Dev | Thẻ sản phẩm (danh sách + sản phẩm liên quan) làm lại theo ảnh mẫu: thẻ trắng bo góc, ảnh trên ô xám, tên + hãng/model cùng hàng, 2 nút bo tròn "Chi tiết" + "Yêu cầu báo giá". Thêm key `common.details`. |
| 2026-11-09 | Dev | Dự án – Video giới thiệu máy: thẻ video đổi sang kiểu poster theo ảnh mẫu (nền navy, thumbnail bo góc, tên lớn, hàng "Xem video" + nút play). |
| 2026-11-09 | Dev | Giới thiệu – Quy mô & điểm mạnh: bớt khoảng trống — sân khấu dính cao vừa nội dung (≤600px) giữa vùng dưới header, chồng thẻ dời sát danh sách, khung ảnh trong thẻ theo đúng tỉ lệ gốc (bỏ dải trắng). |
| 2026-11-09 | Dev | Header ở trạng thái hero (trong suốt): bỏ ô nền trắng sau logo (logo PNG nền trong suốt) để không lệch màu với gradient; header navy vẫn giữ ô trắng. |
| 2026-11-09 | Dev | Hero: chuyển tiếp gradient mềm giữa ảnh banner và nền bên trái (mask nhiều nấc trên ~55% bề rộng ảnh). |
| 2026-11-09 | Dev | Logo đối tác: khung logo 84×84 → 88×64px (logo vuông gốc ~57px chỉ phóng ≤1,15 lần, logo ngang vẫn đủ rộng) để logo nét hơn. |
| 2026-11-09 | Dev | Hero trang chủ đổi ảnh sang `hero-banner3.png` (ảnh chụp nhà xưởng tông tối, 735×490): bỏ `mix-blend-multiply`, ảnh 56% bên phải `object-cover` + mờ mép trái vào gradient. Lưu ý: ảnh gốc độ phân giải thấp, hiển thị full chiều cao bị phóng to ~1,8 lần. |
| 2026-11-09 | Dev | Logo đối tác to hơn: tạo bản cắt viền trắng `public/images/doi-tac/*.png` từ ảnh gốc khách gửi (giữ nguyên thư mục gốc), logo lấp đầy ô thẻ. |
| 2026-11-09 | Dev | 5 nhóm sản phẩm (trang chủ): sân khấu sticky cao vừa nội dung (≤600px) và dính giữa vùng dưới header, bỏ khoảng trống lớn giữa tiêu đề section và thẻ đầu tiên. |
| 2026-11-09 | Dev | Header thấp hơn: 72px → 56px (`--header-h`), logo 40px, bỏ dòng mô tả "Máy & thiết bị ngành gỗ" cạnh tên công ty (theo yêu cầu khách). |
| 2026-11-09 | Dev | Nút liên hệ nổi + icon Zalo/Messenger/Facebook ở footer: bỏ viền trắng, đổi sang hình tròn. |
| 2026-11-06 | Dev | Chi tiết máy: bảng thông số chuyển từ section riêng lên cột phải cạnh ảnh, dạng thanh thu gọn có animation mở (`components/product/SpecsAccordion.tsx`). |
| 2026-11-06 | Dev | Trang Sản phẩm làm lại bố cục theo ảnh mẫu (sidebar không khung, thanh công cụ có Sắp xếp, thẻ nền xám). Giá/giỏ hàng trong ảnh mẫu thay bằng nút báo giá (R4); nhãn không đè ảnh (R1). |
| 2026-11-05 | Dev | Trang chi tiết sản phẩm & tin tức: `export const instant = false` (Next 16 partialPrefetching) — giữ nội dung đầy đủ trong HTML prerender thay vì tách Suspense + skeleton (R7). |
| 2026-11-05 | Dev | Dự án: section Ảnh thực tế từ bento → carousel 3D cong chạy theo cuộn (`components/projects/ProjectCarousel.tsx`), tiêu đề căn giữa, chú thích đè lên ảnh chính. |
| 2026-11-05 | Dev | 3 mảng dịch vụ: mặc định tiêu đề đè lên ảnh phủ kín thẻ, hover ảnh chạy sang phải + hiện mô tả. Khách duyệt ngoại lệ R1 cho section này. |
| 2026-11-05 | Dev | 3 mảng dịch vụ (Dịch vụ) làm lại theo ảnh mẫu: thẻ ngang, hover giãn thẻ + hiện ảnh (`components/services/ServiceCards.tsx`). |
| 2026-11-05 | Dev | ProcessArc: mặc định mọi bước nền xanh nhạt, hover đổi nền đậm + cung tiến trình chạy tới bước đó (theo yêu cầu khách). |
| 2026-11-05 | Dev | Quy trình 4 bước (Dịch vụ) làm lại theo ảnh mẫu infographic khách gửi (`components/services/ProcessArc.tsx`) — ngoại lệ bo tròn lớn ghi ở mục 6. |
| 2026-11-05 | Dev | Section Câu chuyện (Giới thiệu) làm lại theo ảnh mẫu khách gửi: tiêu đề giữa + đoạn trích + 3 ô ảnh dọc hover zoom (thay ReflectiveCard). Khách duyệt ngoại lệ R1 cho phép cắt ảnh dọc ở section này. |
| 2026-11-05 | Dev | Ảnh gian hàng (trang Giới thiệu) đặt trong ReflectiveCard (React Bits, WebGL): `components/ui/ReflectiveCard/` — sửa `[HoaPhu]`: bỏ icon @hugeicons (khách chọn không cài thư viện), chuyển cập nhật ref vào `useLayoutEffect` (rule react-hooks/refs). Chưa có video phản chiếu (Q11). |
| 2026-11-05 | Dev | Tiêu đề hero đổi sang **FoldText** (React Bits + **GSAP 3.15**, khách đồng ý cài thư viện): `components/ui/FoldText/` (giữ nguyên bản gốc + `index.ts` khai báo kiểu). Trang Giới thiệu: Quy mô & điểm mạnh thành chồng thẻ theo cuộn (`components/about/StrengthDeck.tsx`). |
| 2026-11-05 | Dev | Section đối tác trang chủ: lưới tĩnh → carousel 3 hàng tự cuộn xen kẽ chiều (`components/home/PartnerMarquee.tsx`), dùng cả 33 logo. |
| 2026-11-05 | Dev | Chồng thẻ 5 nhóm: thẻ 442px = ảnh gốc 440×330 hiển thị 1:1 (không phóng to, toạ độ pixel nguyên, ảnh gốc không nén lại) cho nét hơn; lưới 3/6/3 để thẻ nằm giữa. Header rút gọn ở hero thêm nút VI/EN. |
| 2026-11-05 | Dev | Section 5 nhóm sản phẩm làm lại theo ảnh mẫu khách gửi: chồng thẻ 3D sticky chạy theo cuộn (`components/home/CategoryScroller.tsx`). |
| 2026-11-05 | Dev | Hero dùng `hero-banner2.png` + nền gradient loang; header trong suốt khi ở vùng hero (xem mục 6 – ngoại lệ). Lưu ý: `hero-banner2.png` **chưa được tách nền thật** (alpha 100% đặc, nền trắng) → dùng `mix-blend-multiply` trên nền sáng; nếu muốn hero tông tối cần file PNG tách nền thật. |
| 2026-11-05 | Dev | Trang Dự án thêm section video giới thiệu máy (`data/videos.ts`, 8 link YouTube khách gửi, tên đối chiếu tiêu đề gốc). Nhúng `youtube-nocookie.com`, iframe chỉ tải khi bấm; thumbnail `i.ytimg.com` (đã thêm `images.remotePatterns`). Mã model không còn bị ngắt dòng ở dấu gạch nối (`noOrphan`). |
| 2026-11-05 | Dev | Hero trang chủ làm lại theo ảnh mẫu khách gửi: bỏ slider máy, dùng ảnh `public/images/hero-banner.png` (không có tem, được đảo màu bằng CSS). Tiêu đề rút gọn từ thông điệp gợi ý ("Giải pháp máy móc trọn gói cho ngành gỗ."), phần "từ tư vấn, chế tạo đến lắp đặt" chuyển xuống lead. Dải thông số chỉ dùng dữ liệu thật (5 nhóm SP, máy mới & cũ, hotline). |
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
| Trang chủ `/vi` | Hero vừa 1 màn hình: nền **gradient loang** tông sáng phủ toàn bộ (kể cả dưới header và dưới ảnh), chữ trái (kicker, tiêu đề, lead, nút báo giá + link sản phẩm, dải 3 thông số), ảnh `hero-banner3.png` (ảnh chụp nhà xưởng, không tem) chiếm ~56% bên phải, **cao full màn hình, `object-cover`**, mép trái mờ dần vào gradient để cột chữ nằm trên nền sáng (mobile: khối ảnh dưới nội dung, mờ mép trên) · 5 nhóm sản phẩm: **chồng thẻ 3D chạy theo cuộn** (sticky; trái: số thứ tự + tên + danh mục con; phải: mô tả + nút + chỉ báo vị trí; mobile/giảm chuyển động: danh sách tĩnh) · **carousel logo đối tác 3 hàng** tự cuộn ngang xen kẽ chiều (hàng 1 & 3: phải→trái, hàng 2: trái→phải), thẻ trắng bo góc + bóng mềm, có nút tạm dừng |
| Giới thiệu | Câu chuyện: tiêu đề giữa, trái đoạn trích + ghi chú KUBOKE + nút báo giá, phải **3 ô ảnh dọc** (ô giữa cao hơn; hover/focus: ô to ra + ảnh zoom, ô khác mờ; mỗi ô link tới trang máy) · Quy mô xưởng & điểm mạnh: **chồng thẻ chạy theo cuộn** (sticky; trái: tiêu đề + danh sách 4 điểm mạnh bấm được; phải: thẻ navy ảnh contain + nội dung + nhãn `Chờ khách xác nhận` + nút báo giá; mobile/giảm chuyển động: lưới tĩnh) |
| Sản phẩm | Theo ảnh mẫu khách gửi (2026-11-06): sidebar lọc 25% **không khung**, các nhóm thu gọn được (tìm kiếm · danh mục dạng chip + nhóm con · tình trạng · thương hiệu), ngăn bằng đường kẻ · cột phải: tiêu đề nhóm đang xem + "Hiển thị N sản phẩm" + **ô Sắp xếp** (mặc định / tên A→Z / Z→A, lưu trên URL `sap-xep`) · lưới 3 cột thẻ theo ảnh mẫu khách gửi 2026-11-09: thẻ trắng bo 14px, ảnh contain trên ô nền xám bo góc (không đè gì lên ảnh, R1), không có nhãn tình trạng/nhóm trên thẻ (khách bỏ 2026-11-09 — tình trạng vẫn lọc được ở sidebar và hiện ở trang chi tiết), tên máy bên trái + hãng/model bên phải (chỗ "giá" trong mẫu — không hiển thị giá, R4), 2 dòng thông số, 1 nút bo tròn "Yêu cầu báo giá" (cam) full chiều ngang; tên & ảnh dẫn tới trang chi tiết |
| Dịch vụ | 3 mảng dịch vụ (**thẻ ngang giãn khi hover, hiện ảnh**) · **quy trình 4 bước dạng infographic** (≥1024px: nửa vòng tròn tiêu đề bên trái + đường cong nét đứt + 4 thẻ viên thuốc so le theo cung; <1024px: danh sách dọc) · CTA |
| Dự án / Tin tức | Ảnh thực tế: **carousel 3D cong chạy theo cuộn** (khu vực: chờ xác nhận) · **Video giới thiệu máy móc** (8 video YouTube, lưới 4×2, phát trong hộp thoại ngay trên trang) · logo đối tác · thẻ bài viết `line-clamp-2` |
| Chi tiết máy | Trái: gallery ảnh · Phải: nhãn + tên + điểm nổi bật + nút báo giá/catalogue + **Thông số kỹ thuật dạng thanh thu gọn** (ảnh mẫu khách gửi 2026-11-06: tiêu đề + dấu +/−, bấm để trượt mở danh sách "Nhãn: giá trị", 300ms, mặc định đóng) + hotline · Sản phẩm cùng danh mục |
| Liên hệ | 40% thông tin + bản đồ · 60% form 8 trường |

**Sai khác so với bản mô tả (cố ý):** bản mô tả ghi "máy tiện Sheng Shing", nhưng ảnh Sheng Shing trong kho là **máy chà nhám thùng** → dùng đúng theo ảnh. Bộ lọc thương hiệu chỉ hiện hãng có sản phẩm (FERM chưa có ảnh → chưa hiện).
