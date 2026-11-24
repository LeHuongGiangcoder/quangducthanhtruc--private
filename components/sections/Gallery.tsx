import Image from "next/image";

import { SectionHead } from "@/components/ui/Heading";
import { Reel } from "@/components/ui/Reel";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { gallery } from "@/content/client";

/**
 * Album: tiêu đề chữ hoa mỹ trên nền đỏ rượu, rồi một băng ảnh kéo ngang
 * (`.reel`) — ảnh trần, không khung. Mỗi tấm chiếm 4/5 bề ngang nên tấm kế
 * tiếp hé vào từ mép phải, báo cho khách biết còn vuốt được. Bên dưới là
 * nút trái/phải và số đếm "1 / 9" (`<Reel>`).
 *
 * Ảnh KHÔNG có hiệu ứng hiện khi cuộn — khách lướt album nhanh, ảnh phải có
 * sẵn ở đó chứ không trồi lên từng tấm.
 *
 * Tải ảnh: album nằm xa dưới màn đầu nên không `priority` (preload sẽ giành
 * băng thông của ảnh bìa). Ba tấm đầu tải sẵn ngay sau trang, vì lazy-load
 * của trình duyệt thường không tính trước các tấm còn khuất bên phải băng
 * ngang; các tấm sau lazy như thường. Ô trống có nền `bg-tone-line` để
 * khách thấy khung ảnh trong lúc chờ, không phải một khoảng trắng.
 */
const EAGER = 3;

export function Gallery() {
  return (
    <SectionWrapper section="gallery" labelledBy="gallery-title">
      <SectionHead
        eyebrow={gallery.eyebrow}
        title={gallery.title}
        titleId="gallery-title"
        intro={gallery.note}
      />

      <Reel label={gallery.title}>
        {gallery.shots.map((shot, i) => (
          <li
            key={shot.src}
            className="relative aspect-[2/3] w-4/5 overflow-hidden rounded-paper bg-tone-line"
          >
            <Image
              src={shot.src}
              alt={shot.alt}
              fill
              sizes="(max-width: 30rem) 80vw, 24rem"
              loading={i < EAGER ? "eager" : "lazy"}
              className="object-cover"
              draggable={false}
            />
          </li>
        ))}
      </Reel>
    </SectionWrapper>
  );
}
