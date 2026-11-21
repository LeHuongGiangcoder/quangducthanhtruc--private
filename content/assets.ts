/**
 * TỰ SINH — đừng sửa tay. Chạy `npm run assets` để dựng lại.
 *
 * Bản kê những gì đang có trong brand/. Nguồn thật nằm ở brand/, bản chép để
 * phục vụ nằm ở public/brand/. Gắn asset vào section ở `design` trong
 * content/client.ts; TypeScript sẽ bắt lỗi nếu gõ sai tên.
 */

export const assets = {
  /** Vân giấy / hoạ tiết lặp, trải kín nền section */
  textures: {
    "paper-ivory": { src: "/brand/textures/paper-ivory.webp", width: 512, height: 512 },
  },

  /** Ảnh nền full-bleed của một section */
  backgrounds: {
    "damask-cream": { src: "/brand/backgrounds/damask-cream.webp", width: 1125, height: 2000 },
    "damask-wine": { src: "/brand/backgrounds/damask-wine.webp", width: 1125, height: 2000 },
    "gate-stage": { src: "/brand/backgrounds/gate-stage.webp", width: 1080, height: 1920 },
    "intro-hall": { src: "/brand/backgrounds/intro-hall.webp", width: 1595, height: 3455 },
    "silk-sheer": { src: "/brand/backgrounds/silk-sheer.webp", width: 900, height: 2014 },
    "silk-wine": { src: "/brand/backgrounds/silk-wine.webp", width: 1125, height: 2000 },
    "velvet": { src: "/brand/backgrounds/velvet.webp", width: 1000, height: 1998 },
    "venue-setting": { src: "/brand/backgrounds/venue-setting.webp", width: 1400, height: 1136 },
  },

  /** Hoạ tiết rời (hoa, ruy băng, con dấu) — nền trong suốt */
  elements: {
    "ampersand": { src: "/brand/elements/ampersand.webp", width: 360, height: 321 },
    "arch-cream": { src: "/brand/elements/arch-cream.webp", width: 800, height: 1193 },
    "arch-top": { src: "/brand/elements/arch-top.webp", width: 800, height: 551 },
    "bouquet-foot": { src: "/brand/elements/bouquet-foot.webp", width: 540, height: 900 },
    "bouquet-left": { src: "/brand/elements/bouquet-left.webp", width: 560, height: 1143 },
    "bouquet-right": { src: "/brand/elements/bouquet-right.webp", width: 560, height: 1274 },
    "bouquet-top": { src: "/brand/elements/bouquet-top.webp", width: 619, height: 900 },
    "butterfly": { src: "/brand/elements/butterfly.webp", width: 640, height: 466 },
    "calla-bouquet": { src: "/brand/elements/calla-bouquet.webp", width: 800, height: 819 },
    "circle-cream": { src: "/brand/elements/circle-cream.webp", width: 400, height: 400 },
    "contour-lines": { src: "/brand/elements/contour-lines.webp", width: 1000, height: 1696 },
    "cream-panel": { src: "/brand/elements/cream-panel.webp", width: 1200, height: 2363 },
    "crest": { src: "/brand/elements/crest.webp", width: 560, height: 635 },
    "date-spaced": { src: "/brand/elements/date-spaced.webp", width: 600, height: 68 },
    "dear": { src: "/brand/elements/dear.webp", width: 500, height: 274 },
    "diamond-wine": { src: "/brand/elements/diamond-wine.webp", width: 600, height: 600 },
    "drape-left": { src: "/brand/elements/drape-left.webp", width: 600, height: 1218 },
    "film-basketball": { src: "/brand/elements/film-basketball.webp", width: 700, height: 629 },
    "film-corridor": { src: "/brand/elements/film-corridor.webp", width: 700, height: 634 },
    "film-wedding": { src: "/brand/elements/film-wedding.webp", width: 700, height: 625 },
    "florals-top": { src: "/brand/elements/florals-top.webp", width: 1100, height: 1095 },
    "gate-door-left": { src: "/brand/elements/gate-door-left.webp", width: 429, height: 1376 },
    "gate-door-right": { src: "/brand/elements/gate-door-right.webp", width: 429, height: 1376 },
    "gate-flowers-left": { src: "/brand/elements/gate-flowers-left.webp", width: 534, height: 968 },
    "gate-flowers-right": { src: "/brand/elements/gate-flowers-right.webp", width: 523, height: 950 },
    "gilt-bloom": { src: "/brand/elements/gilt-bloom.webp", width: 640, height: 692 },
    "gilt-frame": { src: "/brand/elements/gilt-frame.webp", width: 1000, height: 1411 },
    "hero-frame": { src: "/brand/elements/hero-frame.webp", width: 1100, height: 1444 },
    "intro-card": { src: "/brand/elements/intro-card.webp", width: 1595, height: 2342 },
    "intro-cta-label": { src: "/brand/elements/intro-cta-label.webp", width: 436, height: 128 },
    "intro-door-left": { src: "/brand/elements/intro-door-left.webp", width: 763, height: 2715 },
    "intro-door-right": { src: "/brand/elements/intro-door-right.webp", width: 763, height: 2715 },
    "intro-flowers-left": { src: "/brand/elements/intro-flowers-left.webp", width: 549, height: 575 },
    "intro-flowers-right": { src: "/brand/elements/intro-flowers-right.webp", width: 1189, height: 737 },
    "intro-lead": { src: "/brand/elements/intro-lead.webp", width: 307, height: 184 },
    "intro-monogram": { src: "/brand/elements/intro-monogram.webp", width: 414, height: 324 },
    "intro-names": { src: "/brand/elements/intro-names.webp", width: 940, height: 615 },
    "intro-note": { src: "/brand/elements/intro-note.webp", width: 538, height: 74 },
    "intro-sleeve": { src: "/brand/elements/intro-sleeve.webp", width: 1595, height: 2104 },
    "line-bouquet": { src: "/brand/elements/line-bouquet.webp", width: 300, height: 543 },
    "line-cake": { src: "/brand/elements/line-cake.webp", width: 300, height: 543 },
    "line-dove": { src: "/brand/elements/line-dove.webp", width: 300, height: 372 },
    "line-hearts": { src: "/brand/elements/line-hearts.webp", width: 300, height: 310 },
    "line-rings": { src: "/brand/elements/line-rings.webp", width: 300, height: 288 },
    "line-toast": { src: "/brand/elements/line-toast.webp", width: 300, height: 452 },
    "love-oval": { src: "/brand/elements/love-oval.webp", width: 800, height: 1080 },
    "love-story-title": { src: "/brand/elements/love-story-title.webp", width: 800, height: 405 },
    "monogram-cream": { src: "/brand/elements/monogram-cream.webp", width: 500, height: 389 },
    "monogram-gold": { src: "/brand/elements/monogram-gold.webp", width: 500, height: 389 },
    "monogram-wine": { src: "/brand/elements/monogram-wine.webp", width: 400, height: 311 },
    "our-journey": { src: "/brand/elements/our-journey.webp", width: 800, height: 430 },
    "ribbon-bow": { src: "/brand/elements/ribbon-bow.webp", width: 1000, height: 921 },
    "ribbon-wine": { src: "/brand/elements/ribbon-wine.webp", width: 900, height: 2326 },
    "rings": { src: "/brand/elements/rings.webp", width: 500, height: 413 },
    "rose": { src: "/brand/elements/rose.webp", width: 1100, height: 926 },
    "silk-swag": { src: "/brand/elements/silk-swag.webp", width: 800, height: 523 },
    "stamp": { src: "/brand/elements/stamp.webp", width: 700, height: 884 },
    "story-quote": { src: "/brand/elements/story-quote.webp", width: 900, height: 167 },
    "tassel": { src: "/brand/elements/tassel.webp", width: 291, height: 900 },
    "velvet-long": { src: "/brand/elements/velvet-long.webp", width: 1000, height: 4411 },
    "wave-wine": { src: "/brand/elements/wave-wine.webp", width: 900, height: 3753 },
    "wax-seal": { src: "/brand/elements/wax-seal.webp", width: 760, height: 776 },
    "wedding-day": { src: "/brand/elements/wedding-day.webp", width: 700, height: 213 },
  },

  /** Dải ngăn giữa hai section, lặp theo chiều ngang */
  dividers: {
    "lace-band": { src: "/brand/dividers/lace-band.webp", width: 1600, height: 205 },
  },
} as const;

export type TextureName = keyof typeof assets.textures;
export type BackgroundName = keyof typeof assets.backgrounds;
export type ElementName = keyof typeof assets.elements;
export type DividerName = keyof typeof assets.dividers;
