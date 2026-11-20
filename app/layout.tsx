import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Pinyon_Script } from "next/font/google";

import { meta } from "@/content/client";
import { palette, themeCssVars } from "@/content/theme";
import "./globals.css";

/*
  Font của bộ nhận diện, nằm ở public/font.

  ITC Benguiat Book Condensed có đủ dấu tiếng Việt (đã kiểm ơ ư đ ứ ậ ỹ ễ) —
  dùng cho cả tiêu đề lẫn chữ thường, như trên mockup. Có italic thật cho
  tên chương Love Story, nên trình duyệt không phải kéo nghiêng giả.

  Bellissima Script THIẾU ơ ư ứ ậ ễ, nên chỉ được gắn vào `font-flourish` cho
  chữ Latin không dấu. Chữ viết tay tiếng Việt vẫn đi qua Pinyon Script.
*/
const benguiat = localFont({
  variable: "--ff-display",
  src: [
    { path: "../public/font/ITC Benguiat Book Condensed Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/font/ITC Benguiat Book Condensed Italic.ttf", weight: "400", style: "italic" },
  ],
  display: "swap",
});

const flourish = localFont({
  variable: "--ff-flourish",
  src: "../public/font/BellissimaScriptPro.otf",
  display: "swap",
});

const script = Pinyon_Script({
  variable: "--ff-script",
  subsets: ["latin", "vietnamese"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(meta.siteUrl),
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    locale: meta.locale,
    images: [{ url: meta.ogImage }],
  },
  twitter: { card: "summary_large_image", images: [meta.ogImage] },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  /* Cho layout chạm tới sát tai thỏ — đó là điều làm env(safe-area-inset-*)
     trong globals.css có tác dụng. */
  viewportFit: "cover",
  themeColor: palette.wine,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={meta.lang}
      className={`${benguiat.variable} ${script.variable} ${flourish.variable}`}
    >
      <head>
        {/* Token của content/theme.ts, in ra dưới dạng CSS variable */}
        <style>{themeCssVars()}</style>
        {/* JS tắt thì không ai làm chúng hiện — trả lại opacity ngay */}
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important}`}</style>
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
