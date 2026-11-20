import Image from "next/image";

import { Caption } from "@/components/ui/Heading";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { Reveal } from "@/components/ui/Reveal";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { gallery } from "@/content/client";
import { element } from "@/lib/assets";

/**
 * Album: chữ "Our Journey" của bộ nhận diện trên nền đỏ rượu, ảnh xếp hai cột
 * so le như ảnh in dán lên thiệp. Cột phải lùi xuống một nhịp để hai cột
 * không thẳng hàng; ảnh đầu tiên trải hết bề ngang làm ảnh mở.
 */
export function Gallery() {
  const title = element("our-journey");
  const [lead, ...rest] = gallery.shots;
  const left = rest.filter((_, i) => i % 2 === 0);
  const right = rest.filter((_, i) => i % 2 === 1);

  return (
    <SectionWrapper section="gallery" labelledBy="gallery-title">
      <Reveal className="mb-block flex flex-col items-center gap-tight text-center">
        <h2 id="gallery-title" className="w-[68%]">
          {title ? (
            <Image
              src={title.src}
              alt={gallery.title}
              width={title.width ?? 800}
              height={title.height ?? 430}
              sizes="20rem"
              className="h-auto w-full"
            />
          ) : (
            <span className="font-flourish text-h1">{gallery.title}</span>
          )}
        </h2>
        <Caption className="text-lead">{gallery.note}</Caption>
      </Reveal>

      {lead ? (
        <Reveal>
          <ImageFrame src={lead.src} alt={lead.alt} ratio="4 / 5" sizes="(max-width: 30rem) 90vw, 27rem" />
        </Reveal>
      ) : null}

      <div className="mt-stack grid grid-cols-2 gap-stack">
        {[left, right].map((column, c) => (
          <div key={c} className={`flex flex-col gap-stack ${c === 1 ? "pt-block" : ""}`}>
            {column.map((shot, i) => (
              <Reveal key={shot.src} delay={c * 90 + i * 40}>
                <ImageFrame
                  src={shot.src}
                  alt={shot.alt}
                  ratio="2 / 3"
                  tilt={c === 0 ? -1 : 1}
                  sizes="(max-width: 30rem) 45vw, 14rem"
                />
              </Reveal>
            ))}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
