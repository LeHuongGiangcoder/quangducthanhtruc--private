import Image from "next/image";

import { SectionHead } from "@/components/ui/Heading";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { gallery } from "@/content/client";

/**
 * Album: tiêu đề chữ hoa mỹ trên nền đỏ rượu, rồi một băng ảnh kéo ngang
 * (`.reel`) — ảnh trần, không khung. Mỗi tấm chiếm 4/5 bề ngang nên tấm kế
 * tiếp hé vào từ mép phải, báo cho khách biết còn vuốt được.
 *
 * Ảnh KHÔNG có hiệu ứng hiện khi cuộn — khách lướt album nhanh, ảnh phải có
 * sẵn ở đó chứ không trồi lên từng tấm.
 */
export function Gallery() {
  return (
    <SectionWrapper section="gallery" labelledBy="gallery-title">
      <SectionHead
        eyebrow={gallery.eyebrow}
        title={gallery.title}
        titleId="gallery-title"
        intro={gallery.note}
      />

      {/* tabIndex để cuộn được bằng phím mũi tên khi focus vào băng ảnh */}
      <ul className="reel" aria-label={gallery.title} tabIndex={0}>
        {gallery.shots.map((shot, i) => (
          <li key={shot.src} className="relative aspect-[2/3] w-4/5 overflow-hidden rounded-paper">
            <Image
              src={shot.src}
              alt={shot.alt}
              fill
              sizes="(max-width: 30rem) 80vw, 24rem"
              priority={i === 0}
              className="object-cover"
              draggable={false}
            />
          </li>
        ))}
      </ul>
    </SectionWrapper>
  );
}
