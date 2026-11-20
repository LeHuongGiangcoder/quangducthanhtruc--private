import { SectionHead } from "@/components/ui/Heading";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { gallery } from "@/content/client";

/**
 * Album: tiêu đề chữ hoa mỹ trên nền đỏ rượu, ảnh xếp hai cột so le như ảnh in
 * dán lên thiệp. Cột phải lùi xuống một nhịp để hai cột không thẳng hàng; ảnh
 * đầu tiên trải hết bề ngang làm ảnh mở.
 *
 * Ảnh KHÔNG có hiệu ứng hiện khi cuộn — khách lướt album nhanh, ảnh phải có
 * sẵn ở đó chứ không trồi lên từng tấm.
 */
export function Gallery() {
  const [lead, ...rest] = gallery.shots;
  const left = rest.filter((_, i) => i % 2 === 0);
  const right = rest.filter((_, i) => i % 2 === 1);

  return (
    <SectionWrapper section="gallery" labelledBy="gallery-title">
      <SectionHead
        eyebrow={gallery.eyebrow}
        title={gallery.title}
        titleId="gallery-title"
        intro={gallery.note}
      />

      {lead ? (
        <ImageFrame src={lead.src} alt={lead.alt} ratio="4 / 5" sizes="(max-width: 30rem) 90vw, 27rem" />
      ) : null}

      <div className="mt-stack grid grid-cols-2 gap-stack">
        {[left, right].map((column, c) => (
          <div key={c} className={`flex flex-col gap-stack ${c === 1 ? "pt-block" : ""}`}>
            {column.map((shot) => (
              <ImageFrame
                key={shot.src}
                src={shot.src}
                alt={shot.alt}
                ratio="2 / 3"
                tilt={c === 0 ? -1 : 1}
                sizes="(max-width: 30rem) 45vw, 14rem"
              />
            ))}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
