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

const ms = (value: string) => Number.parseInt(value, 10);

type Phase = "idle" | "opening" | "done";

/**
 * Màn mở thiệp — sân khấu rèm nhung, hai cánh cửa đỏ khép, hai chùm hoa hai
 * bên, tên cặp đôi chữ vàng trên cửa. Dàn theo mockup khổ 1080 × 1920.
 *
 * Bấm "Mở thiệp":
 *   1. nhạc bật ngay trong cú chạm (trình duyệt chỉ cho phát nhạc như vậy);
 *   2. chữ mờ đi, hai cánh cửa xoay quanh bản lề mép ngoài, lộ ô cửa sáng;
 *   3. sân khấu tiến vào ô cửa rồi tan — đúng lúc đó hero bắt đầu hiện.
 *
 * Toàn bộ chuyển động là CSS transition theo `data-phase` (xem `.gate` trong
 * globals.css), thời lượng lấy từ `motion.gateDoors` / `motion.gateZoom`.
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

    const doors = ms(motion.gateDoors);
    const zoom = ms(motion.gateZoom);
    timers.current.push(
      window.setTimeout(revealHero, doors * 0.8),
      window.setTimeout(() => setPhase("done"), doors * 0.8 + zoom + 100),
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
                  "--x": side === "left" ? DOOR.leftX : DOOR.leftX + DOOR.w,
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

        {monogram ? (
          <Layer x={474} y={70} w={132} className="gate-fade">
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
            <p className="font-display text-stage-sm text-cream">{intro.note}</p>
            <button
              type="button"
              onClick={handleOpen}
              disabled={phase !== "idle"}
              className="min-h-tap w-[78%] rounded-btn border border-tone-line bg-wine-soft font-display text-stage-md uppercase text-cream shadow-lift transition-transform duration-200 ease-glow hover:[@media(hover:hover)]:-translate-y-px"
            >
              {intro.cta}
            </button>
          </div>
        </Layer>

        <Layer name="gate-flowers-left" x={-10} y={880} w={440} z={3} priority />
        <Layer name="gate-flowers-right" x={650} y={890} w={440} z={3} priority />
      </Stage>
    </div>
  );
}
