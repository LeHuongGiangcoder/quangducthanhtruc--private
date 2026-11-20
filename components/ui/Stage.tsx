import Image from "next/image";
import type { CSSProperties, ElementType, ReactNode } from "react";

import type { ElementName } from "@/content/assets";
import { element } from "@/lib/assets";

/**
 * Stage — một trang dàn theo mockup, như một tấm poster.
 *
 * Dùng khi khách gửi thiết kế dạng từng lớp ảnh (hoa, tấm kem, khung ảnh…)
 * và vị trí của chúng phải khớp mockup. Stage giữ đúng tỉ lệ mockup, và mọi
 * lớp bên trong đặt bằng toạ độ đọc thẳng trên mockup:
 *
 *   <Stage width={270} height={420}>          ← mockup 270px bề ngang
 *     <Layer name="hero-frame" x={6} y={14} w={258} />
 *   </Stage>
 *
 * Chữ bên trong dùng `text-stage-*` (đơn vị cqw), nên chữ co cùng ảnh và
 * không bao giờ tràn khỏi tấm kem khi đổi máy.
 */
export function Stage({
  width,
  height,
  className = "",
  children,
}: {
  /** Bề ngang mockup — đơn vị của mọi toạ độ bên trong. */
  width: number;
  height: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`stage ${className}`}
      style={{ "--sw": width, "--sh": height } as CSSProperties}
    >
      {children}
    </div>
  );
}

type LayerProps = {
  /** Toạ độ góc trên-trái và bề rộng, theo đơn vị của Stage. Âm được: tràn mép. */
  x: number;
  y: number;
  w: number;
  /** Hoạ tiết trong brand/elements. Bỏ trống thì Layer bọc `children`. */
  name?: ElementName;
  /** Có alt = ảnh mang nghĩa (ảnh cặp đôi, chữ của thiết kế). Không có = trang trí. */
  alt?: string;
  rotate?: number;
  /** Thứ tự chồng lớp trong Stage. */
  z?: number;
  /** Hiện dần khi cuộn tới (`data-reveal`) — hoặc theo cú mở thiệp (`"hero"`). */
  reveal?: boolean | "hero";
  revealDelay?: number;
  parallax?: number;
  sway?: boolean;
  priority?: boolean;
  as?: ElementType;
  className?: string;
  children?: ReactNode;
};

/**
 * Một lớp trong Stage. Lớp ngoài giữ vị trí + góc xoay, lớp trong nhận
 * `data-reveal` — vì GSAP ghi đè `transform` của phần tử nó animate, góc xoay
 * mà nằm chung một thẻ thì sẽ mất khi hiện.
 */
export function Layer({
  x,
  y,
  w,
  name,
  alt,
  rotate,
  z,
  reveal = false,
  revealDelay,
  parallax,
  sway = false,
  priority = false,
  as: Tag = "div",
  className = "",
  children,
}: LayerProps) {
  const art = name ? element(name) : null;
  if (name && !art) return null;

  const decorative = Boolean(art) && !alt;

  return (
    <Tag
      aria-hidden={decorative || undefined}
      className={`stage-layer ${decorative ? "pointer-events-none select-none" : ""} ${className}`}
      style={
        {
          "--x": x,
          "--y": y,
          "--w": w,
          zIndex: z,
          transform: rotate ? `rotate(${rotate}deg)` : undefined,
        } as CSSProperties
      }
    >
      <div
        data-reveal={reveal ? true : undefined}
        data-hero={reveal === "hero" ? true : undefined}
        data-reveal-delay={revealDelay || undefined}
        data-parallax={parallax || undefined}
        className={sway ? "animate-sway origin-top" : undefined}
      >
        {art ? (
          <Image
            src={art.src}
            alt={alt ?? ""}
            width={art.width ?? 800}
            height={art.height ?? 800}
            priority={priority}
            /* Hoạ tiết của Stage đã xuất sẵn webp ~1000px trong brand/ —
               cho qua bộ tối ưu chỉ tốn thêm một vòng nén lại (và lớp nhung
               dài 4400px làm bộ tối ưu treo hẳn ở chế độ dev). */
            unoptimized
            className="h-auto w-full"
          />
        ) : (
          children
        )}
      </div>
    </Tag>
  );
}
