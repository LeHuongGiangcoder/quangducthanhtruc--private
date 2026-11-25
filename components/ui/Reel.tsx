"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/Button";

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={`size-5 fill-none stroke-current stroke-[1.5] ${dir === "left" ? "" : "-scale-x-100"}`}
    >
      <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Băng ảnh kéo ngang (`.reel`) kèm thanh điều hướng bên dưới: nút trái,
 * số đếm "3 / 9", nút phải. Vuốt hay bấm nút đều được; số đếm theo tấm đang
 * nằm giữa băng. Con phải là các `<li>`.
 *
 * Chỉ phần này là client component — ảnh bên trong vẫn render từ server.
 */
export function Reel({ label, children }: { label: string; children: ReactNode }) {
  const ref = useRef<HTMLUListElement>(null);
  const count = Children.count(children);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const center = el.scrollLeft + el.clientWidth / 2;
      let best = 0;
      let gap = Infinity;
      Array.from(el.children as HTMLCollectionOf<HTMLElement>).forEach((item, i) => {
        const d = Math.abs(item.offsetLeft + item.offsetWidth / 2 - center);
        if (d < gap) {
          gap = d;
          best = i;
        }
      });
      setIndex(best);
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const go = (i: number) => {
    const el = ref.current;
    const item = el?.children[i] as HTMLElement | undefined;
    if (!el || !item) return;
    el.scrollTo({ left: item.offsetLeft - (el.clientWidth - item.offsetWidth) / 2 });
  };

  return (
    <div className="flex flex-col gap-stack">
      {/* tabIndex để cuộn được bằng phím mũi tên khi focus vào băng ảnh */}
      <ul ref={ref} className="reel relative" aria-label={label} tabIndex={0}>
        {children}
      </ul>

      <div className="flex items-center justify-center gap-block">
        <Button
          variant="icon"
          aria-label="Ảnh trước"
          disabled={index === 0}
          onClick={() => go(index - 1)}
        >
          <Chevron dir="left" />
        </Button>
        <p aria-live="polite" className="text-center font-body text-small tabular-nums text-tone-fg">
          {index + 1} / {count}
        </p>
        <Button
          variant="icon"
          aria-label="Ảnh sau"
          disabled={index === count - 1}
          onClick={() => go(index + 1)}
        >
          <Chevron dir="right" />
        </Button>
      </div>
    </div>
  );
}
