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
    return { x: r.left + r.width / 2 - box.left, top: r.top - box.top, bottom: r.bottom - box.top };
  });
  if (pins.length < 2) return null;

  let d = `M ${pins[0].x} ${pins[0].top} L ${pins[0].x} ${pins[0].bottom}`;
  for (let i = 1; i < pins.length; i++) {
    const a = pins[i - 1];
    const b = pins[i];
    const sag = Math.max(80, (b.top - a.bottom) * 0.6);
    d += ` C ${a.x} ${a.bottom + sag} ${b.x} ${b.top - sag} ${b.x} ${b.top}`;
    if (b.bottom - b.top > 1) d += ` L ${b.x} ${b.bottom}`;
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
  return { path, length, reach };
}

/** Độ dài cần vẽ để đầu chỉ vừa chạm độ cao `y` (toạ độ trong khối sợi chỉ). */
function drawnTo(thread: Thread, y: number): number {
  const { reach, length } = thread;
  let lo = 0;
  let hi = reach.length - 1;
  if (y < reach[0]) return 0;
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
          if (thread) thread.path.style.strokeDashoffset = "0";
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
        const setOffset = gsap.quickTo(path, "strokeDashoffset", { duration: 0.5, ease: "power2.out" });

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
