"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import { useExperience } from "@/components/experience/ExperienceProvider";
import { Layer, Stage } from "@/components/ui/Stage";
import { couple, intro } from "@/content/client";
import { background, element } from "@/lib/assets";
import { motion } from "@/content/theme";

/** Hai cánh cửa phủ khít ô cửa sáng trên nền (x 146–964, y 297–1621 của 1080 × 1920). */
const DOOR = { y: 271, w: 429, leftX: 126 };
/** Mép trong của hai file cửa trong suốt ~4px — gối hai cánh lên nhau để khép kín, không lộ khe sáng. */
const DOOR_OVERLAP = 8;
/** Đường nối hai cánh, nơi vệt sáng lọt qua. */
const SEAM_X = DOOR.leftX + DOOR.w - DOOR_OVERLAP / 2;

const ms = (value: string) => Number.parseInt(value, 10);

type Phase = "idle" | "opening" | "done";

/**
 * Màn mở thiệp — sân khấu rèm nhung, hai cánh cửa đỏ khép, hai chùm hoa hai
 * bên, tên cặp đôi chữ vàng trên cửa. Dàn theo mockup khổ 1080 × 1920.
 *
 * Bấm "Mở thiệp":
 *   1. nhạc bật ngay trong cú chạm (trình duyệt chỉ cho phát nhạc như vậy);
 *   2. chữ mờ đi, cửa hé một khe — vệt sáng vàng lọt qua — rồi hai cánh từ
 *      từ xoay vào trong quanh bản lề mép ngoài, ánh vàng sau cửa sáng dần;
 *   3. cửa đang mở thì sân khấu đã tiến dần vào ô cửa sáng;
 *   4. gần cuối cú tiến, cả màn nhoè đi và tan — hero hiện ra từ chỗ nhoè.
 *
 * Toàn bộ chuyển động là CSS transition theo `data-phase` (xem `.gate` trong
 * globals.css), thời lượng lấy từ `motion.gateDoors` / `gateZoom` / `gateBlur`.
 * Ai bật giảm chuyển động thì bỏ qua hiệu ứng, vào thẳng hero.
 */
export function Intro() {
  const { opened, open, revealHero } = useExperience();
  const [phase, setPhase] = useState<Phase>("idle");
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  if (phase === "done" || (opened && phase === "idle")) return null;

  const stage = background("gate-stage");
  const monogram = element("monogram-cream");

  function handleOpen() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      open();
      setPhase("done");
      return;
    }

    open({ reveal: false });
    setPhase("opening");

    // Cùng hai mốc với `--gate-zoom-at` / `--gate-blur-at` trong globals.css
    const zoomAt = ms(motion.gateDoors) * 0.35;
    const blurAt = zoomAt + ms(motion.gateZoom) * 0.6;
    timers.current.push(
      // Hero bắt đầu hiện đúng lúc màn cửa nhoè đi — hai lớp nhoè chéo nhau
      window.setTimeout(revealHero, blurAt),
      window.setTimeout(() => setPhase("done"), blurAt + ms(motion.gateBlur) + 100),
    );
  }

  return (
    <div
      data-tone="dark"
      data-phase={phase}
      role="dialog"
      aria-modal="true"
      aria-label={`${intro.lead} ${couple.groom} & ${couple.bride}`}
      className="gate text-tone-fg"
    >
      <Stage width={1080} height={1920} className="gate-scene">
        {stage ? (
          <Image src={stage.src} alt="" fill priority unoptimized className="object-cover" />
        ) : null}

        {/* Ánh vàng sau cánh cửa — nằm dưới hai cánh, sáng dần lên khi cửa mở */}
        <Layer x={146} y={297} w={818}>
          <div aria-hidden className="gate-glow" />
        </Layer>

        {(["left", "right"] as const).map((side) => {
          const art = element(side === "left" ? "gate-door-left" : "gate-door-right");
          if (!art) return null;
          return (
            <div
              key={side}
              aria-hidden
              data-side={side}
              className="stage-layer gate-door"
              style={
                {
                  "--x": side === "left" ? DOOR.leftX : DOOR.leftX + DOOR.w - DOOR_OVERLAP,
                  "--y": DOOR.y,
                  "--w": DOOR.w,
                } as CSSProperties
              }
            >
              <Image
                src={art.src}
                alt=""
                width={art.width ?? 429}
                height={art.height ?? 1376}
                priority
                unoptimized
                className="h-auto w-full"
              />
            </div>
          );
        })}

        {/* Vệt sáng lọt qua khe cửa — trên hai cánh, dưới chữ và hoa */}
        <Layer x={SEAM_X - 60} y={DOOR.y} w={120} z={1}>
          <div aria-hidden className="gate-beam" />
        </Layer>

        {monogram ? (
          /* Giữa dải rèm treo phía trên (0–297), không sát mép màn */
          <Layer x={474} y={140} w={132} className="gate-fade">
            <Image
              src={monogram.src}
              alt=""
              width={monogram.width ?? 500}
              height={monogram.height ?? 389}
              priority
              unoptimized
              className="h-auto w-full"
            />
          </Layer>
        ) : null}

        <Layer x={90} y={500} w={900} z={2} className="gate-fade">
          <h1 className="flex flex-col items-center text-center">
            <span className="font-display text-stage-md text-cream">{intro.lead}</span>
            <span className="mt-stage font-script text-stage-4xl text-gold-light text-glow-gold">
              {couple.groom}
            </span>
            {/* "&" đậm nét kiểu serif như mockup — nét script của Pinyon quá mảnh ở cỡ này */}
            <span className="font-display text-stage-xl italic text-gold-light text-glow-gold">&amp;</span>
            <span className="font-script text-stage-4xl text-gold-light text-glow-gold">
              {couple.bride}
            </span>
          </h1>
        </Layer>

        <Layer x={330} y={1340} w={420} z={2} className="gate-fade">
          <div className="flex flex-col items-center gap-stage text-center">
            <p className="font-body text-stage-sm text-cream">{intro.note}</p>
            <button
              type="button"
              onClick={handleOpen}
              disabled={phase !== "idle"}
              className="min-h-tap w-[78%] rounded-btn border border-tone-line bg-wine-soft font-body text-stage-md uppercase text-cream shadow-lift transition-transform duration-200 ease-glow hover:[@media(hover:hover)]:-translate-y-px"
            >
              {intro.cta}
            </button>
          </div>
        </Layer>

        <Layer name="gate-flowers-left" x={-10} y={980} w={440} z={3} priority />
        <Layer name="gate-flowers-right" x={650} y={990} w={440} z={3} priority />
      </Stage>
    </div>
  );
}
