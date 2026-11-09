# Danh sách ảnh — kiểm soát tem / watermark (AGENTS.md → R1)

Mỗi ảnh hoặc thư mục ảnh thêm vào đây phải có một dòng ở bảng dưới.
Không chắc có tem → ghi "Có (chưa xác minh)" và xử lý như có tem.

| File / thư mục | Nguồn | Có tem / watermark? | Vị trí tem | Ghi chú |
|---|---|---|---|---|
| `Logo/70672.png` | Khách (Drive) | Không | — | Logo chính thức 112×116, chữ đen → luôn đặt trên ô nền trắng |
| `temp-logo.png` | Template | Không | — | Không dùng nữa, có thể xoá |
| `SanPham/*.jpg` (66 ảnh, 440×330; `91869_440x280.jpg` là ảnh gian hàng) | Khách (Drive) | **Có — tất cả** | Chạy chéo giữa ảnh hoặc ở góc ("Công ty TNHH Cơ Khí Hoà Phú / hoaphuco.com.vn / 0913.813.412") | Chưa thấy tem "Thành Nhân" nhưng vẫn coi như có tem: luôn 4:3 `object-contain`, không chữ/nhãn/gradient đè lên |
| `Ảnh đối tác/*` (33 logo, 157×61) | Khách (Drive) | Không | — | Logo đối tác, hiển thị nguyên bản (grayscale → màu khi hover) |
| `doi-tac/*.png` (33 logo) | Tạo từ `Ảnh đối tác/*` (cắt viền trắng bằng sharp) | Không | — | Bản dùng trên web (carousel đối tác trang chủ) — logo lấp đầy ô |
| `hero-banner.png` (1448×1086) | Khách | Không | — | Không còn dùng (đã thay bằng hero-banner2) |
| `hero-banner2.png` (2400×1792, 6MB) | Khách | Không | — | Không còn dùng (đã thay bằng hero-banner3) |
| `hero-banner3.png` (735×490) | Khách | Không | — | Ảnh hero trang chủ (ảnh chụp nhà xưởng, không watermark) → `object-cover` + mask mờ mép trái (class trong `app/[lang]/page.tsx`). Độ phân giải thấp so với hero full màn hình |
