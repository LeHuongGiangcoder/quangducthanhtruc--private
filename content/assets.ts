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
    "silk-sheer": { src: "/brand/backgrounds/silk-sheer.webp", width: 900, height: 2014 },
    "silk-wine": { src: "/brand/backgrounds/silk-wine.webp", width: 1125, height: 2000 },
    "venue-setting": { src: "/brand/backgrounds/venue-setting.webp", width: 1400, height: 1136 },
  },

  /** Hoạ tiết rời (hoa, ruy băng, con dấu) — nền trong suốt */
  elements: {
    "bouquet-foot": { src: "/brand/elements/bouquet-foot.webp", width: 540, height: 900 },
    "bouquet-top": { src: "/brand/elements/bouquet-top.webp", width: 619, height: 900 },
    "butterfly": { src: "/brand/elements/butterfly.webp", width: 640, height: 466 },
    "calla-bouquet": { src: "/brand/elements/calla-bouquet.webp", width: 800, height: 819 },
    "crest": { src: "/brand/elements/crest.webp", width: 560, height: 635 },
    "gilt-bloom": { src: "/brand/elements/gilt-bloom.webp", width: 640, height: 692 },
    "gilt-frame": { src: "/brand/elements/gilt-frame.webp", width: 1000, height: 1411 },
    "line-bouquet": { src: "/brand/elements/line-bouquet.webp", width: 300, height: 543 },
    "line-cake": { src: "/brand/elements/line-cake.webp", width: 300, height: 543 },
    "line-dove": { src: "/brand/elements/line-dove.webp", width: 300, height: 372 },
    "line-hearts": { src: "/brand/elements/line-hearts.webp", width: 300, height: 310 },
    "line-rings": { src: "/brand/elements/line-rings.webp", width: 300, height: 288 },
    "line-toast": { src: "/brand/elements/line-toast.webp", width: 300, height: 452 },
    "ribbon-bow": { src: "/brand/elements/ribbon-bow.webp", width: 1000, height: 921 },
    "rose": { src: "/brand/elements/rose.webp", width: 1100, height: 926 },
    "silk-swag": { src: "/brand/elements/silk-swag.webp", width: 800, height: 523 },
    "stamp": { src: "/brand/elements/stamp.webp", width: 700, height: 884 },
    "tassel": { src: "/brand/elements/tassel.webp", width: 291, height: 900 },
    "wax-seal": { src: "/brand/elements/wax-seal.webp", width: 760, height: 776 },
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
