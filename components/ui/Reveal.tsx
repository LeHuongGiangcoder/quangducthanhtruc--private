import type { CSSProperties, ElementType, ReactNode } from "react";

/**
 * Đánh dấu một khối để GSAP làm hiện khi cuộn tới.
 *
 * Bản thân nó không chạy JS — component <Motion /> ở app/page.tsx quét
 * `[data-reveal]` một lần cho cả trang (ScrollTrigger.batch), nên thêm bao
 * nhiêu section cũng không sinh thêm observer.
 */
export function Reveal({
  as: Tag = "div",
  delay = 0,
  light = false,
  className = "",
  style,
  children,
}: {
  as?: ElementType;
  /** Trễ, tính bằng ms, để các khối trong cùng một hàng hiện so le nhau. */
  delay?: number;
  /** Sáng lên khi cuộn tới (`data-light`, xem Motion.tsx). */
  light?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <Tag
      data-reveal
      data-reveal-delay={delay || undefined}
      data-light={light || undefined}
      className={className}
      style={style}
    >
      {children}
    </Tag>
  );
}
