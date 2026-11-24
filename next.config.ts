import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ảnh khách là file tĩnh trong public/, không qua loader ngoài.
  images: {
    /*
      Chỉ WebP, không AVIF: AVIF nén lâu gấp nhiều lần nên lượt xem đầu tiên
      của mỗi cỡ ảnh phải chờ server nén xong (album 9 ảnh chậm thấy rõ),
      trong khi WebP ở cỡ ảnh điện thoại chỉ nặng hơn chút ít.
    */
    formats: ["image/webp"],
  },
};

export default nextConfig;
