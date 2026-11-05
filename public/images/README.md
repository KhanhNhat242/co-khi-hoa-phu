# Danh sách ảnh — kiểm soát tem / watermark (AGENTS.md → R1)

Mỗi ảnh hoặc thư mục ảnh thêm vào đây phải có một dòng ở bảng dưới.
Không chắc có tem → ghi "Có (chưa xác minh)" và xử lý như có tem.

| File / thư mục | Nguồn | Có tem / watermark? | Vị trí tem | Ghi chú |
|---|---|---|---|---|
| `Logo/70672.png` | Khách (Drive) | Không | — | Logo chính thức 112×116, chữ đen → luôn đặt trên ô nền trắng |
| `temp-logo.png` | Template | Không | — | Không dùng nữa, có thể xoá |
| `SanPham/*.jpg` (66 ảnh, 440×330; `91869_440x280.jpg` là ảnh gian hàng) | Khách (Drive) | **Có — tất cả** | Chạy chéo giữa ảnh hoặc ở góc ("Công ty TNHH Cơ Khí Hoà Phú / hoaphuco.com.vn / 0913.813.412") | Chưa thấy tem "Thành Nhân" nhưng vẫn coi như có tem: luôn 4:3 `object-contain`, không chữ/nhãn/gradient đè lên |
| `Ảnh đối tác/*` (33 logo, 157×61) | Khách (Drive) | Không | — | Logo đối tác, hiển thị nguyên bản (grayscale → màu khi hover) |
| `hero-banner.png` (1448×1086) | Khách | Không | — | Không còn dùng (đã thay bằng hero-banner2) |
| `hero-banner2.png` (2400×1792, 6MB) | Khách | Không | — | Ảnh hero trang chủ. **Nền trắng chưa tách** (alpha đặc) → hiển thị bằng `mix-blend-multiply` + `.hero-fade`; next/image tự nén sang WebP |
