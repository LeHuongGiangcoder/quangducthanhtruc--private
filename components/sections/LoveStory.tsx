import { Eyebrow, Title } from "@/components/ui/Heading";
import { Layer, Stage } from "@/components/ui/Stage";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { INFO_HEIGHT, VELVET_TOP } from "@/components/sections/WeddingInfo";
import { loveStory } from "@/content/client";

/** Toạ độ dọc của từng chương, và chương lẻ/chẵn đổi bên chữ — ảnh. */
const CHAPTER_TOP = 368;
const CHAPTER_STEP = 176;

/**
 * Love Story, dàn theo mockup: chữ "Our Love Story", ảnh oval, khung giấy
 * mang câu dẫn, rồi ba chương xen kẽ chữ trái — dải phim phải.
 *
 * Nền nhung là cùng một tấm với WeddingInfo: lớp nhung đặt lệch lên đúng
 * bằng phần đã hiện ở section trên, nên đường nối không lộ.
 */
export function LoveStory() {
  const height = CHAPTER_TOP + CHAPTER_STEP * loveStory.chapters.length + 10;

  return (
    <SectionWrapper section="loveStory" flush width="bleed" labelledBy="love-story-title">
      {/* Câu dẫn là chữ vẽ sẵn trong asset — bản chữ thật cho trình đọc màn hình */}
      <p className="sr-only">{loveStory.quote}</p>

      <Stage width={270} height={height} className="bg-wine-soft">
        <Layer name="velvet-long" x={0} y={VELVET_TOP - INFO_HEIGHT} w={270} />

        {/* Đầu section chung như mọi section: eyebrow + tiêu đề hoa mỹ cùng cỡ */}
        <Layer x={0} y={22} w={270} z={2} reveal>
          <div className="flex flex-col items-center gap-tight text-center">
            <Eyebrow>{loveStory.eyebrow}</Eyebrow>
            <Title id="love-story-title">{loveStory.title}</Title>
          </div>
        </Layer>

        <Layer name="love-oval" alt={loveStory.photoAlt} x={60} y={98} w={150} z={1} reveal />
        <Layer name="bouquet-left" x={-16} y={196} w={104} z={3} sway />
        <Layer name="story-quote" x={30} y={286} w={210} z={4} reveal revealDelay={120} />

        {loveStory.chapters.map((chapter, i) => {
          const top = CHAPTER_TOP + i * CHAPTER_STEP;
          const textLeft = i % 2 === 0;

          return (
            <div key={chapter.label}>
              <Layer x={textLeft ? 16 : 146} y={top} w={textLeft ? 116 : 110} z={2} reveal>
                <article className="flex flex-col gap-stage font-display text-cream">
                  <p className="text-stage-xs italic">{chapter.label}</p>
                  <h3 className="text-stage-lg uppercase italic">{chapter.title}</h3>
                  <span aria-hidden className="h-px w-[22%] bg-cream" />
                  <p className="text-stage-sm">{chapter.body}</p>
                </article>
              </Layer>
              <Layer
                name={chapter.film}
                alt={chapter.alt}
                x={textLeft ? 134 : 4}
                y={top + 14}
                w={134}
                z={1}
                reveal
                revealDelay={120}
              />
            </div>
          );
        })}
      </Stage>
    </SectionWrapper>
  );
}
