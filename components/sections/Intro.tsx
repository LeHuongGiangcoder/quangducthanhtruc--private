"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";

import { useExperience } from "@/components/experience/ExperienceProvider";
import { Stage } from "@/components/ui/Stage";
import type { ElementName } from "@/content/assets";
import { couple, intro } from "@/content/client";
import { motion } from "@/content/theme";
import { background, element } from "@/lib/assets";

/**
 * Toạ độ đọc thẳng trên bộ tách layer của khách (khổ 3544 × 7678, xem
 * brand/source/intro-layers). Mỗi lớp: góc trên-trái + bề rộng.
 */
const STAGE = { w: 3544, h: 7678 };
const DOORS = { y: 1251, w: 1695, rightX: 1849 };
/** Khe sáng giữa hai cánh cửa. */
const SEAM = { x: 1695, w: 154 };
const CTA = { x: 1291, y: 6231, w: 968 };

const ms = (value: string) => Number.parseInt(value, 10);

/** Ba mốc của cú mở thiệp, tính từ lúc chạm — CSS đọc lại qua biến `--gate-*-at`. */
const doorsAt = ms(motion.gateClear) * 0.45;
const zoomAt = doorsAt + ms(motion.gateDoors) * 0.32;
const blurAt = zoomAt + ms(motion.gateZoom) * 0.55;

/** Ảnh phải tải xong trước khi màn mở thiệp hiện lên, để không lớp nào hiện trễ. */
const CRITICAL: ElementName[] = [
  "intro-door-left",
  "intro-door-right",
  "intro-sleeve",
  "intro-card",
  "intro-names",
  "intro-flowers-left",
  "intro-flowers-right",
];

type Phase = "loading" | "idle" | "opening" | "done";

/** Kiểu hiện lên lúc vào trang và kiểu rút đi lúc mở thiệp — xem `.gate-in` / `[data-exit]`. */
type Enter = "rise" | "fall" | "focus" | "bloom-left" | "bloom-right";
type Exit = "fade" | "drop" | "part-left" | "part-right" | "float";

/**
 * Một lớp ảnh của màn mở thiệp. Lớp ngoài giữ vị trí và nhận chuyển động rút
 * đi, lớp trong nhận chuyển động hiện lên — tách hai thẻ để khách bấm mở giữa
 * chừng thì hai chuyển động cộng vào nhau chứ không giật.
 */
function Art({
  name,
  x,
  y,
  w,
  enter,
  at = 0,
  exit,
  outAt = 0,
}: {
  name: ElementName;
  x: number;
  y: number;
  w: number;
  enter: Enter;
  /** Mốc bắt đầu hiện, theo phần của `motion.gateEnter` (0–1). */
  at?: number;
  exit: Exit;
  /** Mốc bắt đầu rút, theo phần của `motion.gateClear` (0–1). */
  outAt?: number;
}) {
  const art = element(name);
  if (!art) return null;
  return (
    <div
      aria-hidden
      data-exit={exit}
      className="stage-layer pointer-events-none select-none"
      style={{ "--x": x, "--y": y, "--w": w, "--out-at": outAt } as CSSProperties}
    >
      <div className="gate-in" data-in={enter} style={{ "--in-at": at } as CSSProperties}>
        <Image
          src={art.src}
          alt=""
          width={art.width ?? 800}
          height={art.height ?? 800}
          priority
          unoptimized
          draggable={false}
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}

/**
 * Màn mở thiệp — ô cửa đỏ khép hờ, khe sáng giữa hai cánh, tấm thiệp kem đặt
 * trong bao đỏ, hai chùm hoa rum ở chân. Dàn từ bộ tách layer của khách.
 *
 * Vào trang: nền hiện dần, monogram hạ xuống, bao thiệp rồi tấm thiệp trồi
 * lên, chữ lần lượt rõ nét, hai chùm hoa nở vào từ hai góc. Khe cửa thở nhẹ.
 *
 * Bấm "Mở thiệp":
 *   1. nhạc bật ngay trong cú chạm (trình duyệt chỉ cho phát nhạc như vậy);
 *   2. chữ tan, tấm thiệp nhún nhẹ rồi trượt xuống, hai chùm hoa dạt ra;
 *   3. khe sáng loé lên, hai cánh cửa từ từ mở vào trong, ánh sáng tràn ra;
 *   4. sân khấu tiến dần vào ô sáng, rồi cả màn nhoè đi — hero hiện từ chỗ nhoè.
 *
 * Mọi chuyển động là CSS theo `data-phase` (`.gate` trong globals.css), thời
 * lượng lấy từ `motion.gate*` trong theme.ts. Ai bật giảm chuyển động thì vào
 * thẳng hero.
 */
export function Intro() {
  const { opened, open, revealHero } = useExperience();
  const [phase, setPhase] = useState<Phase>("loading");
  const timers = useRef<number[]>([]);

  useEffect(() => {
    let cancelled = false;
    const ready = () => {
      if (!cancelled) setPhase((p) => (p === "loading" ? "idle" : p));
    };
    const srcs = [background("intro-hall"), ...CRITICAL.map(element)]
      .filter((a) => a !== null)
      .map((a) => a.src);
    Promise.all(
      srcs.map((src) => {
        const img = new window.Image();
        img.src = src;
        return img.decode().catch(() => undefined);
      }),
    ).then(ready);
    // Mạng chậm thì không bắt khách chờ mãi — hiện với những gì đã có
    const fallback = window.setTimeout(ready, 3500);
    return () => {
      cancelled = true;
      window.clearTimeout(fallback);
    };
  }, []);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  if (phase === "done" || (opened && phase !== "opening")) return null;

  const hall = background("intro-hall");
  const cta = element("intro-cta-label");

  function handleOpen() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      open();
      setPhase("done");
      return;
    }

    open({ reveal: false });
    setPhase("opening");
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
      style={
        {
          "--gate-doors-at": `${doorsAt}ms`,
          "--gate-zoom-at": `${zoomAt}ms`,
          "--gate-blur-at": `${blurAt}ms`,
        } as CSSProperties
      }
    >
      <div className="gate-scene">
        <Stage width={STAGE.w} height={STAGE.h} className="gate-stage">
          {/* Nền nhung + lòng cửa sáng. Ảnh này dựng từ layer 3 của khách,
              phần dưới hai cánh cửa thay bằng ánh sáng để cửa mở ra là sáng */}
          {hall ? (
            <Image src={hall.src} alt="" fill priority unoptimized className="object-cover" />
          ) : null}

          {/* Ánh sáng tràn ra khi cửa mở — rọi lên cả nền, nằm dưới hai cánh */}
          <div aria-hidden className="gate-glow" />

          {(["left", "right"] as const).map((side) => {
            const art = element(side === "left" ? "intro-door-left" : "intro-door-right");
            if (!art) return null;
            return (
              <div
                key={side}
                aria-hidden
                data-side={side}
                className="stage-layer gate-door"
                style={
                  {
                    "--x": side === "left" ? 0 : DOORS.rightX,
                    "--y": DOORS.y,
                    "--w": DOORS.w,
                  } as CSSProperties
                }
              >
                <Image
                  src={art.src}
                  alt=""
                  width={art.width ?? 763}
                  height={art.height ?? 2715}
                  priority
                  unoptimized
                  draggable={false}
                  className="h-auto w-full"
                />
              </div>
            );
          })}

          {/* Khe sáng thở nhẹ khi chờ, loé lên lúc cửa bắt đầu mở */}
          <div
            aria-hidden
            className="stage-layer gate-beam"
            style={{ "--x": SEAM.x - 200, "--y": DOORS.y, "--w": SEAM.w + 400 } as CSSProperties}
          />

          <Art name="intro-monogram" x={1312} y={286} w={919} enter="fall" at={0.12} exit="float" outAt={0.35} />
          <Art name="intro-sleeve" x={0} y={2312} w={STAGE.w} enter="rise" at={0.18} exit="drop" outAt={0.06} />
          <Art name="intro-card" x={0} y={1783} w={STAGE.w} enter="rise" at={0.26} exit="drop" />
          <Art name="intro-lead" x={1416} y={2436} w={683} enter="focus" at={0.44} exit="fade" />
          <Art name="intro-names" x={742} y={3498} w={2090} enter="focus" at={0.52} exit="fade" outAt={0.04} />
          <Art name="intro-note" x={1158} y={5679} w={1195} enter="focus" at={0.62} exit="fade" outAt={0.08} />

          {cta ? (
            <div
              className="stage-layer"
              data-exit="fade"
              style={{ "--x": CTA.x, "--y": CTA.y, "--w": CTA.w, "--out-at": 0 } as CSSProperties}
            >
              <div className="gate-in" data-in="focus" style={{ "--in-at": 0.7 } as CSSProperties}>
                <button
                  type="button"
                  onClick={handleOpen}
                  disabled={phase !== "idle"}
                  className="gate-cta"
                >
                  <Image
                    src={cta.src}
                    alt={intro.cta}
                    width={cta.width ?? 436}
                    height={cta.height ?? 128}
                    priority
                    unoptimized
                    draggable={false}
                    className="h-auto w-full"
                  />
                </button>
              </div>
            </div>
          ) : null}

          <Art name="intro-flowers-right" x={902} y={6041} w={2642} enter="bloom-right" at={0.3} exit="part-right" outAt={0.1} />
          <Art name="intro-flowers-left" x={0} y={6401} w={1219} enter="bloom-left" at={0.36} exit="part-left" outAt={0.14} />

          {/* Chữ trên thiệp là ảnh của thiết kế — bản chữ thật cho trình đọc màn hình */}
          <h1 className="sr-only">
            {intro.lead} {couple.groom} &amp; {couple.bride}. {intro.note}
          </h1>
        </Stage>
      </div>
    </div>
  );
}
