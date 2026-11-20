import { Caption } from "@/components/ui/Heading";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { Reveal } from "@/components/ui/Reveal";
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
      <Reveal className="mb-block flex flex-col items-center gap-tight text-center">
        {/* font đặt ở span: style chung của h2 (font display) thắng utility trên chính thẻ h2 */}
        <h2 id="gallery-title" className="text-display">
          <span className="ink-bold font-flourish">{gallery.title}</span>
        </h2>
        <Caption className="text-lead">{gallery.note}</Caption>
      </Reveal>

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
