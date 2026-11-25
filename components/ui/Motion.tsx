"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { motion } from "@/content/theme";

gsap.registerPlugin(ScrollTrigger);

/** Sự kiện phát ra khi khách bấm "Mở thiệp" — ExperienceProvider bắn ra. */
export const OPEN_EVENT = "glow:open";

type Thread = {
  path: SVGPathElement;
  length: number;
  /** reach[i] = điểm thấp nhất (y) mà nét đã chạm tới khi vẽ được i × STEP px */
  reach: number[];
  /** Độ dài nét tại điểm neo của `[data-thread-rest]` — chỗ nhẫn hiện ra. */
  rest: number | null;
};

const THREAD_STEP = 4;

/**
 * Dựng đường cong của một sợi chỉ `[data-thread]` từ vị trí thật của các
 * `[data-thread-pin]` bên trong: chạy thẳng sau mỗi ảnh (mép trên → mép dưới),
 * và võng chữ S giữa mép dưới ảnh này với mép trên ảnh kế. Pin cỡ 0 (điểm
 * cuối) thì chỉ là một điểm.
 *
 * Trả về thêm bảng `reach` để biết vẽ tới đâu thì đầu chỉ xuống tới độ cao
 * nào — nhờ vậy đầu chỉ bám đúng một vạch trên màn hình khi cuộn, kể cả ở
 * những đoạn chạy ngang hay đoạn khuất sau ảnh.
 */
function buildThread(root: HTMLElement): Thread | null {
  const svg = root.querySelector<SVGSVGElement>("svg[data-thread-svg]");
  const path = svg?.querySelector("path");
  if (!svg || !path) return null;

  const box = root.getBoundingClientRect();
  const pins = Array.from(root.querySelectorAll<HTMLElement>("[data-thread-pin]")).map((pin) => {
    const r = pin.getBoundingClientRect();
    // `data-thread-in` / `data-thread-out`: chỉ vào ở đâu trên mép trên, ra ở
    // đâu trên mép dưới (tỉ lệ bề ngang pin, mặc định giữa) — cho sợi chỉ xiên
    // qua một vật thay vì rơi thẳng.
    const at = (key: "threadIn" | "threadOut") => {
      const f = Number(pin.dataset[key]);
      return r.left - box.left + r.width * (Number.isFinite(f) && pin.dataset[key] ? f : 0.5);
    };
    return { xin: at("threadIn"), xout: at("threadOut"), top: r.top - box.top, bottom: r.bottom - box.top };
  });
  if (pins.length < 2) return null;

  // Đoạn đi qua một pin có chiều cao: thẳng nếu vào/ra cùng một x, còn không
  // thì một nét cong chữ S mềm từ điểm vào xuống điểm ra.
  const through = (p: (typeof pins)[number]) => {
    const h = p.bottom - p.top;
    if (h <= 1) return "";
    if (Math.abs(p.xin - p.xout) < 1) return ` L ${p.xout} ${p.bottom}`;
    return ` C ${p.xin} ${p.top + h * 0.5} ${p.xout} ${p.bottom - h * 0.5} ${p.xout} ${p.bottom}`;
  };

  let d = `M ${pins[0].xin} ${pins[0].top}` + through(pins[0]);
  for (let i = 1; i < pins.length; i++) {
    const a = pins[i - 1];
    const b = pins[i];
    const gap = Math.max(1, b.top - a.bottom);
    // Võng chữ S giữa hai pin; không võng quá khoảng hở kẻo nét tự thắt nút.
    const sag = Math.min(Math.max(80, gap * 0.6), gap * 0.9);
    // Hai pin gần như thẳng hàng thì nét sẽ rơi thẳng tuột — uốn nó thành một
    // đường cung nhẹ, lần lượt sang trái / phải.
    const bow = Math.abs(b.xin - a.xout) < gap * 0.25 ? gap * 0.3 * (i % 2 ? 1 : -1) : 0;
    d += ` C ${a.xout + bow} ${a.bottom + sag} ${b.xin + bow} ${b.top - sag} ${b.xin} ${b.top}`;
    d += through(b);
  }

  svg.setAttribute("viewBox", `0 0 ${box.width} ${box.height}`);
  path.setAttribute("d", d);
  const length = path.getTotalLength();
  path.style.strokeDasharray = `${length}`;

  const reach: number[] = [];
  let low = -Infinity;
  for (let l = 0; l <= length; l += THREAD_STEP) {
    low = Math.max(low, path.getPointAtLength(l).y);
    reach.push(low);
  }

  // Chỗ vật trượt (nhẫn) đứng chờ: điểm neo của nó trên ô `[data-thread-rest]`
  let rest: number | null = null;
  const restEl = root.querySelector<HTMLElement>("[data-thread-rest]");
  const rider = root.querySelector<HTMLElement>("[data-thread-rider]");
  if (restEl && rider) {
    const r = restEl.getBoundingClientRect();
    const ay = Number(rider.dataset.anchorY ?? 0.5);
    const restY = r.top - box.top + r.height * ay;
    for (let l = 0; l <= length; l += 2) {
      if (path.getPointAtLength(l).y >= restY) {
        rest = l;
        break;
      }
    }
  }
  return { path, length, reach, rest };
}

/** Đoạn nét (px) để vật trượt hiện ra trước điểm chờ, và để tan đi ở cuối. */
const RIDER_APPEAR = 60;
const RIDER_EXIT = 80;
const RIDER_TILT = 35;

/**
 * Đặt các lớp `[data-thread-rider]` theo độ dài nét đã vẽ: ẩn trước điểm chờ,
 * hiện dần ngay trước đó, rồi bám đầu chỉ (nghiêng theo hướng nét) và co lại,
 * tan đi ở đoạn cuối — tới đúng điểm cuối của sợi chỉ. Mọi lớp dùng chung một
 * transform nên khớp nhau từng pixel.
 */
function placeRiders(root: HTMLElement, thread: Thread, drawn: number) {
  const riders = root.querySelectorAll<HTMLElement>("[data-thread-rider]");
  const restEl = root.querySelector<HTMLElement>("[data-thread-rest]");
  if (!riders.length || !restEl || thread.rest === null) return;

  const { path, length, rest } = thread;
  const w = restEl.getBoundingClientRect().width;
  const ax = Number(riders[0].dataset.anchorX ?? 0.5);
  const ay = Number(riders[0].dataset.anchorY ?? 0.5);
  // Cao theo tỉ lệ ảnh gốc, không đo lại (rect đã bị xoay / co)
  const img = riders[0].querySelector("img");
  const h = img && img.width ? (w * img.height) / img.width : w;

  const at = Math.min(length, Math.max(rest, drawn));
  const p = path.getPointAtLength(at);
  let rotation = 0;
  if (drawn > rest) {
    const a = path.getPointAtLength(Math.max(0, at - 3));
    const b = path.getPointAtLength(Math.min(length, at + 3));
    const deg = (-Math.atan2(b.x - a.x, b.y - a.y) * 180) / Math.PI;
    rotation = Math.max(-RIDER_TILT, Math.min(RIDER_TILT, deg));
  }

  const appear = Math.min(1, Math.max(0, (drawn - (rest - RIDER_APPEAR)) / RIDER_APPEAR));
  const exitStart = Math.max(rest, length - RIDER_EXIT);
  const t = Math.min(1, Math.max(0, (drawn - exitStart) / (length - exitStart || 1)));
  // Co lại cỡ chiếc nhẫn trong tay chú rể, tan ở phần ba cuối
  const scale = (0.85 + 0.15 * appear) * (1 - 0.94 * t);
  const opacity = t >= 1 ? 0 : appear * (t < 0.65 ? 1 : 1 - (t - 0.65) / 0.35);

  gsap.set(riders, {
    width: w,
    x: p.x - ax * w,
    y: p.y - ay * h,
    rotation,
    scale,
    opacity,
    transformOrigin: `${ax * 100}% ${ay * 100}%`,
  });
}

/** Độ dài cần vẽ để đầu chỉ vừa chạm độ cao `y` (toạ độ trong khối sợi chỉ). */
function drawnTo(thread: Thread, y: number): number {
  const { reach, length } = thread;
  let lo = 0;
  let hi = reach.length - 1;
  if (y < reach[0]) return 0;
  // Đầu chỉ đã qua điểm thấp nhất: vẽ trọn, kể cả phần lẻ dưới một STEP
  if (y >= reach[reach.length - 1]) return length;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (reach[mid] <= y) lo = mid;
    else hi = mid - 1;
  }
  return Math.min(length, lo * THREAD_STEP);
}

/**
 * Toàn bộ chuyển động của trang, gom vào một chỗ:
 *
 *   [data-reveal]        hiện dần khi cuộn tới (một batch cho cả trang)
 *   [data-parallax="N"]  trôi chậm hơn trang N% khi cuộn
 *   [data-hero]          hiện khi thiệp được mở, không chờ cuộn
 *   [data-light]         nhận `data-lit` khi cuộn tới (~60% màn), mất khi cuộn ngược
 *   [data-thread]        sợi chỉ SVG nối các [data-thread-pin], vẽ dần theo cuộn
 *   [data-thread-rider]  vật trượt theo đầu chỉ, từ [data-thread-rest] tới cuối chỉ
 *
 * Section chỉ cần gắn attribute, không section nào tự gọi GSAP — nhờ vậy
 * chúng vẫn là server component và không có hai hệ animation chạy song song.
 */
export function Motion() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Ai tắt hiệu ứng thì hiện hết ngay, không dựng trigger nào.
    if (reduce) {
      gsap.set("[data-reveal]", { opacity: 1 });
      for (const node of document.querySelectorAll<HTMLElement>("[data-light]")) {
        node.dataset.lit = "";
      }
      // Sợi chỉ hiện đủ ngay, chỉ cần dựng lại khi đổi cỡ màn
      const threads = gsap.utils.toArray<HTMLElement>("[data-thread]");
      const draw = () => {
        for (const root of threads) {
          const thread = buildThread(root);
          if (!thread) continue;
          thread.path.style.strokeDashoffset = "0";
          // Không trượt: nhẫn đứng yên ở điểm chờ, sợi chỉ luồn qua
          if (thread.rest !== null) placeRiders(root, thread, thread.rest);
        }
      };
      draw();
      window.addEventListener("resize", draw);
      return () => window.removeEventListener("resize", draw);
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.batch("[data-reveal]:not([data-hero])", {
        start: "top 88%",
        once: true,
        onEnter: (batch) => {
          for (const node of batch as HTMLElement[]) {
            const delay = Number(node.dataset.revealDelay ?? 0) / 1000;
            gsap.fromTo(
              node,
              { opacity: 0, y: motion.revealDistance },
              {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                delay,
                overwrite: "auto",
              },
            );
          }
        },
      });

      for (const node of gsap.utils.toArray<HTMLElement>("[data-light]")) {
        ScrollTrigger.create({
          trigger: node,
          start: "top 60%",
          onEnter: () => (node.dataset.lit = ""),
          onLeaveBack: () => delete node.dataset.lit,
        });
      }

      /*
        Sợi chỉ: dựng lại đường cong mỗi lần ScrollTrigger tính lại bố cục
        (đổi cỡ màn, ảnh tải xong). Khi cuộn, đầu chỉ bám vạch 65% chiều cao
        màn hình: vẽ tới đúng chỗ nét chạm vạch đó, quickTo làm mượt.
      */
      for (const root of gsap.utils.toArray<HTMLElement>("[data-thread]")) {
        let thread = buildThread(root);
        if (!thread) continue;
        const path = thread.path;
        path.style.strokeDashoffset = `${thread.length}`;
        // Nhẫn bám đúng độ dài nét đang hiện (đã làm mượt), không bám cuộn
        const ride = () => {
          if (!thread) return;
          const offset = parseFloat(path.style.strokeDashoffset) || 0;
          // quickTo tiến tiệm cận — dưới 0.5px coi như đã tới nơi
          placeRiders(root, thread, offset < 0.5 ? thread.length : thread.length - offset);
        };
        const setOffset = gsap.quickTo(path, "strokeDashoffset", {
          duration: 0.5,
          ease: "power2.out",
          onUpdate: ride,
        });

        const update = () => {
          if (!thread) return;
          const y = window.innerHeight * 0.65 - root.getBoundingClientRect().top;
          setOffset(thread.length - drawnTo(thread, y));
        };

        ScrollTrigger.create({
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          onUpdate: update,
          onLeave: update,
          onLeaveBack: update,
          onRefresh: () => {
            thread = buildThread(root);
            update();
            ride();
          },
        });
      }

      for (const node of gsap.utils.toArray<HTMLElement>("[data-parallax]")) {
        gsap.to(node, {
          yPercent: -Number(node.dataset.parallax),
          ease: "none",
          scrollTrigger: {
            trigger: node.closest("section") ?? node,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    });

    /*
      Hero nằm ngay dưới màn mở thiệp nên không bao giờ "cuộn tới" — nó hiện
      theo chính cú chạm mở thiệp. Nếu trang không có màn mở thiệp thì
      ExperienceProvider bắn sự kiện này ngay khi mount.
    */
    const onOpen = () => {
      // Hiện ra từ nhoè, khớp với màn mở thiệp đang nhoè đi phía trên
      gsap.fromTo(
        "[data-hero]",
        { opacity: 0, y: 24, filter: "blur(12px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          clearProps: "filter",
          duration: 1.6,
          ease: "power3.out",
          stagger: motion.revealStagger,
          delay: 0.15,
          overwrite: "auto",
        },
      );
      ScrollTrigger.refresh();
    };

    window.addEventListener(OPEN_EVENT, onOpen);

    return () => {
      window.removeEventListener(OPEN_EVENT, onOpen);
      ctx.revert();
    };
  }, []);

  return null;
}
