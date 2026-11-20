/**
 * HỆ THỐNG THIẾT KẾ — nguồn duy nhất cho màu, chữ và khoảng cách.
 *
 * Mọi giá trị ở đây được layout.tsx in ra thành CSS variable trên :root, và
 * app/globals.css map chúng vào utility của Tailwind (`bg-cream`, `py-section`,
 * `text-h2`…). Nghĩa là:
 *
 *   • Đổi màu / font / nhịp khoảng cách của cả site → sửa DUY NHẤT file này.
 *   • Component KHÔNG được viết số padding/margin cứng. Luôn dùng utility đã
 *     map sẵn: px-gutter, py-section, gap-block, gap-stack, gap-tight.
 *
 * Khoảng cách viết theo mobile-first: số đầu trong clamp() là giá trị trên
 * điện thoại, số cuối là trên desktop, ở giữa là nhịp giãn theo chiều rộng.
 * Breakpoint dùng chung (khớp mặc định Tailwind):
 *   sm 40rem/640px · md 48rem/768px · lg 64rem/1024px · xl 80rem/1280px
 * Thêm biến thể `short:` cho máy nằm ngang (max-height 32rem).
 */

/* ---------------------------------------------------------------- PALETTE */

export const palette = {
  /** Nền chính của trang và của các section sáng — trùng màu kem của bộ asset */
  cream: "#fcebd3",
  creamDeep: "#f3dcbd",
  /** Nền của các section tối — đỏ rượu của bộ nhận diện (dải ruy băng, ô chữ nhật) */
  wine: "#620000",
  wineDeep: "#470000",
  /** Đỏ nhung — màu trung bình của nền nhung trong Love Story */
  wineSoft: "#812023",
  /** Chữ trên nền sáng: chính màu đỏ rượu, như chữ trên tấm kem */
  ink: "#620000",
  inkSoft: "#7d3a2c",
  /** Nhấn: vàng nhẫn cưới */
  gold: "#a3824f",
  goldSoft: "#e2c99c",
  /** Vàng sáng của tên cặp đôi trên cánh cửa màn mở thiệp */
  goldLight: "#f6dba3",
  /** Màu rèm tối nhất của sân khấu màn mở thiệp — lấp hai bên trên màn rộng */
  night: "#170409",
  /** Nền thẻ, khung ảnh */
  surface: "#fffaf2",
  line: "#dcbf98",
} as const;

/**
 * Bảng màu theo "tông" của section. SectionWrapper nhận `tone` và đặt
 * --section-bg / --section-fg / --section-accent, nên nút, gạch, input bên
 * trong tự đổi màu theo section mà không cần truyền prop.
 */
export const tones = {
  light: {
    bg: palette.cream,
    fg: palette.ink,
    muted: palette.inkSoft,
    accent: palette.gold,
    line: palette.line,
    contrast: palette.wine,
  },
  paper: {
    bg: palette.creamDeep,
    fg: palette.ink,
    muted: palette.inkSoft,
    accent: palette.gold,
    line: palette.line,
    contrast: palette.wine,
  },
  dark: {
    bg: palette.wine,
    fg: palette.cream,
    muted: palette.goldSoft,
    accent: palette.goldSoft,
    line: "rgba(252, 235, 211, 0.35)",
    contrast: palette.cream,
  },
} as const;

export type Tone = keyof typeof tones;

/* ------------------------------------------------------------- TYPOGRAPHY */

/**
 * Ba họ chữ. Giá trị là CSS variable do next/font sinh ra trong layout.tsx
 * (--ff-display / --ff-script / --ff-flourish; body dùng chung Benguiat với display) — đổi font thì sửa cả hai nơi.
 *
 * Lưu ý tiếng Việt: chỉ chọn font có subset "vietnamese" trên Google Fonts.
 * Font script mua ngoài thường thiếu dấu (ơ, ư, đ, dấu chồng) nên không dùng
 * làm font mặc định cho chữ có dấu.
 */
export const fonts = {
  display: 'var(--ff-display), Georgia, "Times New Roman", serif',
  body: 'var(--ff-display), Georgia, "Times New Roman", serif',
  script: 'var(--ff-script), "Apple Chancery", cursive',
  /**
   * Chữ hoa mỹ của bộ nhận diện (Bellissima). Font này THIẾU ơ ư ứ ậ ễ — chỉ
   * dùng cho chữ Latin không dấu: "Thank", "Dress Code", "Gem Center"…
   * Chữ tiếng Việt viết tay thì dùng `script`.
   */
  flourish: 'var(--ff-flourish), var(--ff-script), cursive',
} as const;

/** Thang chữ. Không được dùng size nào ngoài danh sách này. */
export const typeScale = {
  display: { size: "clamp(3rem, 12vw, 7rem)", line: "0.92", tracking: "-0.015em" },
  h1: { size: "clamp(2.5rem, 8vw, 4.75rem)", line: "0.98", tracking: "-0.01em" },
  h2: { size: "clamp(1.875rem, 5.2vw, 3rem)", line: "1.08", tracking: "-0.005em" },
  h3: { size: "clamp(1.375rem, 3.2vw, 2rem)", line: "1.18", tracking: "0em" },
  h4: { size: "clamp(1.125rem, 2.2vw, 1.375rem)", line: "1.3", tracking: "0em" },
  lead: { size: "clamp(1.0625rem, 1.5vw, 1.1875rem)", line: "1.65", tracking: "0em" },
  body: { size: "1rem", line: "1.7", tracking: "0em" },
  small: { size: "0.875rem", line: "1.6", tracking: "0em" },
  /** Dòng chữ nhỏ in hoa trên tiêu đề section */
  eyebrow: { size: "0.8125rem", line: "1.2", tracking: "0.22em" },
} as const;

/**
 * Thang chữ trong <Stage> — các trang dàn theo mockup (hero, thông tin, love
 * story, thank you). Đơn vị `cqw` = % bề rộng của Stage, nên chữ co giãn
 * cùng ảnh và luôn nằm đúng chỗ trong tấm kem / khung ảnh ở mọi bề rộng máy.
 * Số trong chú thích là cỡ chữ trên iPhone 390px.
 */
export const stageScale = {
  xs: { size: "2.9cqw", line: "1.35" }, // ~11px
  sm: { size: "3.3cqw", line: "1.5" }, // ~13px
  md: { size: "3.9cqw", line: "1.35" }, // ~15px
  lg: { size: "5cqw", line: "1.15" }, // ~19.5px
  xl: { size: "6.2cqw", line: "1.05" }, // ~24px
  "2xl": { size: "8.8cqw", line: "1" }, // ~34px
  "3xl": { size: "12.5cqw", line: "1" }, // ~49px
  "4xl": { size: "11.5cqw", line: "1.15" }, // ~45px — tên cặp đôi ở màn mở thiệp
} as const;

export const weights = {
  body: "400",
  bodyMedium: "500",
  bodyBold: "600",
  display: "400",
} as const;

/* ---------------------------------------------------------------- SPACING */

/**
 * Nhịp dọc của trang. Chỉ có năm bậc — mọi khoảng cách trong site phải rơi
 * vào một trong năm bậc này.
 *
 *   gutter  lề ngang của container (đã cộng safe-area cho máy có tai thỏ)
 *   section khoảng cách trên/dưới của một section
 *   block   khoảng cách giữa hai khối lớn trong cùng section
 *   stack   khoảng cách giữa các phần tử trong một khối
 *   tight   khoảng cách giữa các dòng chữ đi liền nhau
 */
export const spacing = {
  gutter: "clamp(1.25rem, 5vw, 3rem)",
  section: "clamp(3.5rem, 9vw, 8rem)",
  block: "clamp(2rem, 5vw, 4rem)",
  stack: "1.25rem",
  tight: "0.625rem",
  /** Hai bậc khoảng cách bên trong <Stage>, co theo bề rộng Stage như chữ */
  stage: "1.6cqw",
  stageLg: "4.5cqw",
} as const;

export const sizes = {
  /** Vùng chạm tối thiểu — WCAG 2.5.8 / iOS HIG */
  tap: "2.75rem",
  /**
   * Chiều cao một "valance" — dải hoạ tiết vắt ngang mép trên một section.
   * Section nào treo valance thì chừa đúng khoảng này ở trên (`pt-valance`),
   * để nội dung canh giữa không trôi lên nằm dưới hoạ tiết trên màn rộng-thấp.
   */
  valance: "clamp(7rem, 18vw, 11rem)",
  /** Nút dùng chung một bề rộng để không so le khi đứng cạnh nhau */
  btn: "14rem",
  containerSite: "72rem",
  /**
   * Bề rộng tối đa của cả trang. Thiệp dựng cho điện thoại; trên máy tính
   * trang đứng thành một cột giữa nền đỏ rượu thay vì kéo giãn mockup.
   */
  page: "30rem",
  containerProse: "40rem",
} as const;

export const radius = {
  paper: "2px",
  card: "8px",
  btn: "999px",
} as const;

export const shadow = {
  paper: "0 10px 28px -14px rgb(64 18 30 / 0.3)",
  lift: "0 22px 50px -22px rgb(64 18 30 / 0.45)",
} as const;

/**
 * Quầng sáng của chữ vàng trên cánh cửa ở màn mở thiệp — chữ phát sáng như
 * đèn sân khấu hắt vào. Không phải bóng đổ: không lệch, chỉ toả đều.
 */
export const textGlow = {
  gold: "0 0 0.35em rgb(255 214 150 / 0.45)",
} as const;

/* ----------------------------------------------------------------- MOTION */

export const motion = {
  ease: "cubic-bezier(0.22, 1, 0.36, 1)",
  durationFast: "200ms",
  durationBase: "420ms",
  durationSlow: "900ms",
  /**
   * Màn mở thiệp, ba nhịp gối lên nhau:
   *   cửa mở chậm → khi cửa mở được ~1/3 thì sân khấu bắt đầu tiến dần vào ô
   *   cửa → gần cuối cú tiến, cả màn nhoè đi và tan, hero hiện ra từ chỗ nhoè.
   */
  gateDoors: "2600ms",
  gateZoom: "3400ms",
  gateBlur: "1600ms",
  /** GSAP đọc hai số này trong components/ui/Motion.tsx */
  revealDistance: 28,
  revealStagger: 0.12,
} as const;

/* -------------------------------------------------- CSS VARIABLE EXPORTER */

/**
 * Dựng khối `:root { … }` từ các token ở trên. layout.tsx chèn chuỗi này vào
 * một thẻ <style>, nên không cần build step và không cần sửa CSS khi đổi theme.
 */
export function themeCssVars(): string {
  const lines: string[] = [];
  const push = (name: string, value: string) => lines.push(`  --t-${name}: ${value};`);

  for (const [key, value] of Object.entries(palette)) {
    push(`color-${kebab(key)}`, value);
  }

  push("font-display", fonts.display);
  push("font-body", fonts.body);
  push("font-script", fonts.script);
  push("font-flourish", fonts.flourish);

  for (const [key, step] of Object.entries(stageScale)) {
    push(`stage-${key}`, step.size);
    push(`stage-leading-${key}`, step.line);
  }

  for (const [key, step] of Object.entries(typeScale)) {
    push(`text-${kebab(key)}`, step.size);
    push(`leading-${kebab(key)}`, step.line);
    push(`tracking-${kebab(key)}`, step.tracking);
  }

  for (const [key, value] of Object.entries(weights)) {
    push(`weight-${kebab(key)}`, value);
  }

  for (const [key, value] of Object.entries(spacing)) {
    push(`space-${kebab(key)}`, value);
  }

  for (const [key, value] of Object.entries(sizes)) {
    push(`size-${kebab(key)}`, value);
  }

  for (const [key, value] of Object.entries(radius)) {
    push(`radius-${kebab(key)}`, value);
  }

  for (const [key, value] of Object.entries(shadow)) {
    push(`shadow-${kebab(key)}`, value);
  }

  push("ease", motion.ease);
  push("duration-fast", motion.durationFast);
  push("duration-base", motion.durationBase);
  push("duration-slow", motion.durationSlow);
  push("gate-doors", motion.gateDoors);
  push("gate-zoom", motion.gateZoom);
  push("gate-blur", motion.gateBlur);

  for (const [key, value] of Object.entries(textGlow)) {
    push(`glow-${kebab(key)}`, value);
  }

  /* Tông mặc định của trang, trước khi section nào đặt tông của nó. */
  const base = tones.light;
  push("section-bg", base.bg);
  push("section-fg", base.fg);
  push("section-muted", base.muted);
  push("section-accent", base.accent);
  push("section-line", base.line);
  push("section-contrast", base.contrast);

  const toneBlocks = Object.entries(tones)
    .map(([name, tone]) =>
      [
        `[data-tone="${name}"] {`,
        `  --t-section-bg: ${tone.bg};`,
        `  --t-section-fg: ${tone.fg};`,
        `  --t-section-muted: ${tone.muted};`,
        `  --t-section-accent: ${tone.accent};`,
        `  --t-section-line: ${tone.line};`,
        `  --t-section-contrast: ${tone.contrast};`,
        `}`,
      ].join("\n"),
    )
    .join("\n");

  return `:root {\n${lines.join("\n")}\n}\n${toneBlocks}`;
}

function kebab(value: string): string {
  return value.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`);
}
