# public/images

Tên file là cố định — `content/client.ts` trỏ thẳng vào các tên này, nên làm
khách mới chỉ cần ghi đè file, không phải sửa code:

| File | Dùng ở | Tỉ lệ nên dùng |
|---|---|---|
| `intro.jpg` | nền màn mở thiệp | dọc, 3:4 |
| `hero.jpg` | nền trang bìa | dọc, 4:5 — cũng là ảnh OG khi dán link |
| `couple-01.jpg` | Love Story — Chương 1, Những ánh nhìn thoáng qua | dọc, 3:4 |
| `couple-02.jpg` | Love Story — Chương 2, 5 năm yêu xa | dọc, 3:4 |
| `couple-03.jpg` | Love Story — Chương 3, Cuộc gặp lại & Sự dung hoà | dọc, 3:4 |
| `couple-04.jpg` | Love Story — Chương 4, váy cưới / tagline | dọc, 3:4 |
| `couple-05.jpg` | Thông tin lễ cưới | dọc, 4:5 |
| `couple-06.jpg` | Lời cảm ơn | dọc, 4:5 |
| `gallery-01…06.jpg` | Album | dọc, 2:3 |

Thêm ảnh album thì thêm `gallery-07.jpg`… rồi khai trong `gallery.shots`.
Ảnh nào cũng được `object-cover` nên tỉ lệ lệch một chút không bị méo, chỉ bị
cắt bớt hai mép.

Ảnh hiện tại là ảnh PLACEHOLDER tự sinh (nền kem, viền vàng, có ghi tên file
và tỉ lệ ngay trên ảnh) — phải thay hết trước khi gửi khách.
