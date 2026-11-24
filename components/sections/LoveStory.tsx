import Image from "next/image";

import { Reveal } from "@/components/ui/Reveal";
import { Layer, Stage } from "@/components/ui/Stage";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { loveStory } from "@/content/client";
import { element } from "@/lib/assets";

/** Chiều cao ảnh story-finale (1080 × 1195) và mép trên đoạn chữ, đơn vị Stage. */
const FINALE_HEIGHT = 298.75;
const FINALE_TEXT_TOP = 205;

/**
 * Love Story, dàn theo mockup 1080 × 4394, ba khúc:
 *
 *   1. Rèm nhung + "Our Love Story / Đức & Trúc" + câu dẫn — một ảnh vẽ sẵn
 *      trong Stage (chữ thật nằm ở h2 và câu dẫn sr-only phía trên).
 *   2. Ba đoạn kể trên nền giấy xám ngà (tông `mist`), nối nhau như một mạch
 *      truyện — không nhãn hay tên chương: cụm ảnh polaroid và chữ xen kẽ
 *      trái — phải. Khúc này chạy theo dòng chảy chứ không đặt toạ độ,
 *      vì chữ thật của cặp đôi dài hơn chữ mẫu và phải tự đẩy chiều cao.
 *   3. Đoạn kết trên nền đỏ rượu — ba ảnh vẽ sẵn, đoạn chữ dưới ảnh là chữ thật.
 */
export function LoveStory() {
  const { chapters, finale } = loveStory;

  return (
    <SectionWrapper section="loveStory" flush width="bleed" labelledBy="love-story-title">
      <h2 id="love-story-title" className="sr-only">
        {loveStory.title} — {loveStory.names}
      </h2>
      <p className="sr-only">{loveStory.quote}</p>

      <Stage width={270} height={225}>
        <Layer name="story-curtain" x={0} y={0} w={270} />
      </Stage>

      <ol className="stage-flow flex flex-col gap-block px-gutter pt-stack pb-section">
        {chapters.map((chapter, i) => {
          const photo = element(chapter.photo);
          const photoLeft = i % 2 === 0;

          return (
            <li key={chapter.photo} className="grid grid-cols-2 items-center gap-stack">
              {photo ? (
                <Reveal className={photoLeft ? "order-1" : "order-2"}>
                  {/* Polaroid viền mỏng, xoay so le trái — phải; thẻ đỏ lệch phía sau */}
                  <div className="relative isolate">
                    <span
                      aria-hidden
                      data-side={photoLeft ? "left" : "right"}
                      className={`polaroid-backing ${photoLeft ? "rotate-6" : "-rotate-6"}`}
                    />
                    <figure className={`polaroid ${photoLeft ? "-rotate-3" : "rotate-3"}`}>
                      <Image
                        src={photo.src}
                        alt={chapter.alt}
                        width={photo.width ?? 400}
                        height={photo.height ?? 480}
                        unoptimized
                      />
                    </figure>
                  </div>
                </Reveal>
              ) : null}

              <Reveal
                as="p"
                delay={120}
                className={`font-display text-stage-sm ${photoLeft ? "order-2" : "order-1"}`}
              >
                {chapter.body}
              </Reveal>
            </li>
          );
        })}
      </ol>

      <Stage width={270} height={FINALE_HEIGHT}>
        <Layer name="story-finale" alt={finale.alt} x={0} y={0} w={270} />
        <Layer x={30} y={FINALE_TEXT_TOP} w={210} z={2} reveal>
          <p data-tone="dark" className="text-center font-display text-stage-sm text-tone-fg">
            {finale.body}
          </p>
        </Layer>
      </Stage>
    </SectionWrapper>
  );
}
