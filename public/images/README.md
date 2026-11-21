# public/images

Tên file là cố định — `content/client.ts` trỏ thẳng vào các tên này, nên làm
khách mới chỉ cần ghi đè file, không phải sửa code:

| File | Dùng ở | Ghi chú |
|---|---|---|
| `og.jpg` | ảnh OG khi dán link (Zalo / Facebook) | **ngang, đúng 1200×630** — ảnh dọc bị nền tảng cắt giữa, mất mặt. Đặt mặt hai người ở giữa khung để bản cắt vuông (Zalo) vẫn đủ |
| `gallery-01…09.jpg` | Album "Our Journey" | dọc, 2:3 — ảnh 01 trải ngang làm ảnh mở |
| `thankyou-reflection.jpg` | nền trang cảm ơn 1 | ảnh đen trắng của cặp đôi ở nửa trên, nửa dưới là bóng phản chiếu mờ dựng từ chính ảnh đó (tỉ lệ 602:854 của mockup) |
| `polaroid-groom.webp` / `polaroid-bride.webp` | hai tấm polaroid trang cảm ơn 1 | lấy từ `Group 10.png` / `Group 11 (1).png` của khách, đã phẳng nền trắng |
| `thankyou-grid.webp` | lưới 3×3 trang cảm ơn 2 | lấy từ `thank you.png`; ô giữa đã tô trơn màu đỏ rượu, chữ "Thank / YOU" là chữ thật đặt lên |

Ảnh ở Hero, Love Story (oval, ba dải phim) KHÔNG nằm ở đây — chúng đã được
lồng sẵn vào khung trong bộ nhận diện, nên nằm ở `brand/elements/`.

Ảnh gốc của thợ chụp (40–60MB mỗi ảnh) nằm ở `/photos-original/` và file
thiết kế gốc ở `/brand/source/` — cả hai đều gitignore. Bản trong thư mục
này là bản web (cạnh dài 1400–1600px, JPEG q80 / WebP q84).
