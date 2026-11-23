import Image from "next/image";

import { Reveal } from "@/components/ui/Reveal";
import { Layer, Stage } from "@/components/ui/Stage";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { loveStory } from "@/content/client";
import { element } from "@/lib/assets";

/**
 * Love Story, dàn theo mockup 1080 × 4394, ba khúc:
 *
 *   1. Rèm nhung + khung vàng + "Our Love Story / Đức & Trúc" + câu dẫn —
 *      một ảnh vẽ sẵn trong Stage.
 *   2. Ba chương trên nền giấy xám ngà (tông `mist`): cụm ảnh polaroid và chữ
 *      xen kẽ trái — phải. Khúc này chạy theo dòng chảy chứ không đặt toạ độ,
 *      vì chữ thật của cặp đôi dài hơn chữ mẫu và phải tự đẩy chiều cao.
 *   3. Chương cuối trên nền đỏ rượu — tiêu đề và ba ảnh vẽ sẵn, đoạn chữ
 *      dưới ảnh là chữ thật.
 */
export function LoveStory() {
  const { chapters, finale } = loveStory;

  return (
    <SectionWrapper section="loveStory" flush width="bleed" labelledBy="love-story-title">
      <h2 id="love-story-title" className="sr-only">
        {loveStory.title} — {loveStory.names}
      </h2>
      <p className="sr-only">{loveStory.quote}</p>

      <Stage width={270} height={400}>
        <Layer name="story-curtain" alt={loveStory.photoAlt} x={0} y={0} w={270} />
      </Stage>

      <ol className="stage-flow flex flex-col gap-block px-gutter pt-stack pb-section">
        {chapters.map((chapter, i) => {
          const photo = element(chapter.photo);
          const photoLeft = i % 2 === 0;

          return (
            <li key={chapter.label} className="grid grid-cols-2 items-center gap-stack">
              {photo ? (
                <Reveal className={photoLeft ? "order-1" : "order-2"}>
                  <Image
                    src={photo.src}
                    alt={chapter.alt}
                    width={photo.width ?? 406}
                    height={photo.height ?? 440}
                    unoptimized
                    className="h-auto w-full"
                  />
                </Reveal>
              ) : null}

              <Reveal
                as="article"
                delay={120}
                className={`flex flex-col gap-stage font-display ${photoLeft ? "order-2" : "order-1"}`}
              >
                <p className="text-stage-lg italic">{chapter.label}</p>
                <span aria-hidden className="h-px w-3/4 bg-tone-line" />
                <h3 className="mt-stage text-stage-md uppercase">{chapter.title}</h3>
                <p className="text-stage-sm text-tone-muted">{chapter.body}</p>
              </Reveal>
            </li>
          );
        })}
      </ol>

      <Stage width={270} height={333.75}>
        <Layer name="story-finale" alt={finale.alt} x={0} y={0} w={270} />
        <h3 className="sr-only">
          {finale.label}: {finale.title}
        </h3>
        <Layer x={30} y={240} w={210} z={2} reveal>
          <p data-tone="dark" className="text-center font-display text-stage-sm text-tone-fg">
            {finale.body}
          </p>
        </Layer>
      </Stage>
    </SectionWrapper>
  );
}
