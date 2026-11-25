import Image from "next/image";

import { Eyebrow, Title } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { Layer, Stage } from "@/components/ui/Stage";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { loveStory } from "@/content/client";
import { background, element } from "@/lib/assets";

/**
 * Nền nhung của đoạn kết (brand/backgrounds/story-finale-velvet, 1080 × 2500):
 * ảnh story-finale cũ nối dài bằng chính dải nhung của nó. Ba ảnh mới đặt
 * đúng vào ba ô ảnh cũ — toạ độ đọc trên ảnh 1080 rồi chia 4 sang Stage 270,
 * nới thêm 0.25 mỗi phía để không hở viền ảnh cũ.
 */
const velvet = background("story-finale-velvet");
const rings = element(loveStory.interludeRings);
/**
 * Lòng chung của hai nhẫn trên ảnh rings-gold (tỉ lệ bề ngang × bề cao):
 * dải trong suốt nằm trong CẢ HAI vòng, x 46–52%, y 22–60%. Sợi chỉ đi qua
 * x 49%, và đây là điểm neo nhẫn vào đầu chỉ khi trượt.
 */
const RING_LENS = { x: 0.49, y: 0.42 };
/** Nhẫn trong tay chú rể, theo đơn vị Stage 270 của khối ảnh cuối. */
const HAND_RING = { x: 135.75 + 0.51 * 115.25, y: 28.75 + 0.26 * 78.75 };
const FINALE_PHOTOS_HEIGHT = 196;
const FINALE_SLOTS = [
  { x: 19.75, y: 28.75, w: 112.5, ratio: "aspect-[112.5/160.75]" },
  { x: 135.75, y: 28.75, w: 115.25, ratio: "aspect-[115.25/78.75]" },
  { x: 135.75, y: 110.75, w: 115.25, ratio: "aspect-[115.25/78.75]" },
] as const;

/**
 * Love Story, dàn theo mockup 1080 × 4394, ba khúc:
 *
 *   1. Đầu section chữ thật: "Our Love Story" / "Đức & Trúc" / câu dẫn
 *      (<SectionHead>, như mọi section khác).
 *   2. Ba đoạn kể trên nền giấy xám ngà (tông `mist`), nối nhau như một mạch
 *      truyện — không nhãn hay tên chương: cụm ảnh polaroid và chữ xen kẽ
 *      trái — phải. Khúc này chạy theo dòng chảy chứ không đặt toạ độ,
 *      vì chữ thật của cặp đôi dài hơn chữ mẫu và phải tự đẩy chiều cao.
 *   3. Một đoạn căn giữa nối sang đoạn kết.
 *   4. Đoạn kết trên nền nhung đỏ — ba ảnh cặp đôi, rồi đoạn chữ.
 */
export function LoveStory() {
  const { chapters, interlude, finale } = loveStory;

  return (
    <SectionWrapper
      section="loveStory"
      flush
      width="bleed"
      labelledBy="love-story-title"
    >
      <div data-thread className="relative">
        <svg
          data-thread-svg
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 size-full overflow-visible"
        >
          <path className="thread-path" />
        </svg>

        {/* Đầu section bằng chữ thật. Sợi chỉ bắt đầu ngay dưới chữ "Đức & Trúc". */}
        <div className="relative z-20 px-gutter pt-section">
          <Reveal className="mb-block flex flex-col items-center gap-tight text-center">
            <Eyebrow>{loveStory.title}</Eyebrow>
            <div className="relative">
              <Title id="love-story-title">{loveStory.names}</Title>
              <span data-thread-pin aria-hidden className="absolute top-full left-1/2 block" />
            </div>
          </Reveal>
        </div>

        <ol className="stage-flow relative z-20 flex flex-col gap-block px-gutter pt-stack">
          {chapters.map((chapter, i) => {
            const photoLeft = i % 2 === 0;

            return (
              <li key={chapter.photo.src} className="grid grid-cols-2 items-center gap-stack">
                <Reveal className={photoLeft ? "order-1" : "order-2"}>
                  {/* Polaroid viền mỏng, xoay so le trái — phải; thẻ đỏ lệch phía sau */}
                  <div data-thread-pin className="relative isolate">
                    <span
                      aria-hidden
                      data-side={photoLeft ? "left" : "right"}
                      className={`polaroid-backing ${photoLeft ? "rotate-6" : "-rotate-6"}`}
                    />
                    <figure className={`polaroid ${photoLeft ? "-rotate-3" : "rotate-3"}`}>
                      <Image
                        src={chapter.photo.src}
                        alt={chapter.alt}
                        width={chapter.photo.width}
                        height={chapter.photo.height}
                        sizes="(max-width: 30rem) 45vw, 14rem"
                        className="aspect-4/5 object-cover"
                      />
                    </figure>
                  </div>
                </Reveal>

                <Reveal
                  delay={120}
                  className={`flex flex-col gap-stack font-body text-stage-sm ${photoLeft ? "order-2" : "order-1"}`}
                >
                  {chapter.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </Reveal>
              </li>
            );
          })}
        </ol>

        {/* Đoạn nối: hai nửa câu hai bên, ô giữa chừa chỗ cho cặp nhẫn và là
            một điểm của sợi chỉ (chạy thẳng qua lòng chung của hai nhẫn). */}
        <div className="stage-flow relative z-20 px-gutter pt-section pb-section">
          <Reveal className="grid grid-cols-[1fr_20%_1fr] items-center gap-stack font-body text-stage-sm">
            <p className="text-right">{interlude[0]}</p>
            <div
              data-thread-pin
              data-thread-rest
              data-thread-in={RING_LENS.x}
              data-thread-out={RING_LENS.x}
              className={rings ? "aspect-[497/435]" : undefined}
            />
            <p className="text-left">{interlude[1]}</p>
          </Reveal>
        </div>

        {/*
          Cặp nhẫn trượt theo sợi chỉ (Motion.tsx, `[data-thread-rider]`): hiện
          ra khi đầu chỉ chạm ô giữa đoạn nối, rồi trượt theo đầu chỉ xuống tay
          chú rể trong ảnh trao nhẫn và tan vào đó.

          Hai lớp cùng một ảnh để sợi chỉ luồn TRONG hai nhẫn: lớp sau nằm dưới
          nét chỉ (chỉ đè lên vành trên), lớp trước chỉ giữ nửa dưới từ 60% —
          dưới lòng chung — nằm trên nét chỉ (vành dưới đè lên chỉ). SVG chỉ ở
          z-10, nên lớp sau z-[5], lớp trước z-[15].
        */}
        {rings
          ? (["back", "front"] as const).map((layer) => (
              <div
                key={layer}
                aria-hidden
                data-thread-rider={layer}
                data-anchor-x={RING_LENS.x}
                data-anchor-y={RING_LENS.y}
                className={`pointer-events-none absolute top-0 left-0 opacity-0 ${
                  layer === "back" ? "z-[5]" : "z-[15] [clip-path:inset(60%_0_0_0)]"
                }`}
              >
                <Image
                  src={rings.src}
                  alt=""
                  width={rings.width ?? 497}
                  height={rings.height ?? 435}
                  sizes="(max-width: 30rem) 20vw, 6rem"
                  className="h-auto w-full"
                />
              </div>
            ))
          : null}

        <div data-tone="dark" className="relative isolate bg-wine-deep text-tone-fg">
          {velvet ? (
            <Image
              src={velvet.src}
              alt=""
              fill
              sizes="(max-width: 30rem) 100vw, 30rem"
              className="-z-10 object-cover object-top"
            />
          ) : null}

          <Stage width={270} height={FINALE_PHOTOS_HEIGHT}>
            {finale.photos.map((photo, i) => {
              const slot = FINALE_SLOTS[i];
              return (
                <Layer key={photo.src} x={slot.x} y={slot.y} w={slot.w} reveal revealDelay={i * 100}>
                  <div className={`relative overflow-hidden ${slot.ratio}`}>
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 30rem) 45vw, 14rem"
                      className="object-cover"
                    />
                  </div>
                </Layer>
              );
            })}
            {/* Điểm cuối sợi chỉ: chiếc nhẫn trong tay chú rể ở ảnh trao nhẫn
                (ô trên bên phải, nhẫn ở 51% × 26% của ô) */}
            <Layer x={HAND_RING.x} y={HAND_RING.y} w={1}>
              <span data-thread-pin className="block" />
            </Layer>
          </Stage>

          <div className="stage-flow px-gutter pt-stack pb-section">
            <Reveal className="flex flex-col gap-stack text-center font-body text-stage-sm">
              {finale.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
