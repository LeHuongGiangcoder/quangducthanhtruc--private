import type { BackgroundName, DividerName, ElementName, TextureName } from "@/content/assets";
import type { Tone } from "@/content/theme";

/**
 * NỘI DUNG CỦA KHÁCH — làm site mới thì sửa duy nhất file này (và theme.ts,
 * public/images, public/audio). Không cần mở components.
 *
 * ⚠️ Toàn bộ giá trị dưới đây là PLACEHOLDER. Trước khi gửi khách phải thay
 * hết: tên, ngày giờ, địa chỉ, link Maps, ảnh, nhạc, RSVP endpoint.
 *
 * Ngày giờ luôn viết dạng ISO kèm offset Việt Nam (+07:00) để lịch và đồng hồ
 * đếm ngược không lệch múi giờ.
 */

/* --------------------------------------------------------------- SECTIONS */

/** Mọi section có trong khung nền. */
export type SectionId =
  | "intro"
  | "hero"
  | "loveStory"
  | "gallery"
  | "weddingInfo"
  | "agenda"
  | "dresscode"
  | "rsvp"
  | "thankYou";

/**
 * Thứ tự hiển thị. Bỏ một section khỏi mảng này là nó không render nữa —
 * không cần xoá code. Đổi chỗ hai dòng là đổi thứ tự trên trang.
 *
 * `intro` là màn mở thiệp, luôn nằm ngoài luồng cuộn; để nó trong mảng thì
 * có cổng mở thiệp, bỏ ra thì trang mở thẳng vào hero.
 */
export const sections: SectionId[] = [
  "intro",
  "hero",
  "loveStory",
  "gallery",
  "weddingInfo",
  "agenda",
  "dresscode",
  "rsvp",
  "thankYou",
];

/* ----------------------------------------------------------- MẶT NHÌN */

/**
 * Một hoạ tiết rời đặt lên nền section.
 *
 * `at` là chuỗi utility Tailwind định vị + bề rộng, ví dụ
 * `"top-[6%] -left-[4%] w-[28%]"`. Dùng % thay vì rem để hoạ tiết co theo
 * section trên điện thoại; `hideOnMobile` cho những cái màn hẹp không còn chỗ.
 */
export type DecorPlacement = {
  name: ElementName;
  at: string;
  rotate?: number;
  /**
   * Chỉ đặt khi người dùng yêu cầu. Mặc định 1 — xem "Ba luật thiết kế" trong
   * CLAUDE.md: không làm mờ hoạ tiết cho chìm vào nền.
   */
  opacity?: number;
  /** Lắc lư nhẹ, cho thứ trông như đang treo hoặc rung rinh. */
  sway?: boolean;
  /** Trôi chậm hơn trang bao nhiêu % khi cuộn. */
  parallax?: number;
  hideOnMobile?: boolean;
};

export type SectionDesign = {
  /** id trong HTML — cũng là cái dùng cho link neo `#...`. */
  anchor: string;
  /** Bảng màu, xem `tones` trong content/theme.ts. */
  tone: Tone;
  /**
   * Ảnh nền full-bleed. Nhận hai kiểu:
   *   • tên trong `assets.backgrounds` — ảnh của design system, ở brand/
   *   • đường dẫn bắt đầu bằng "/" — ảnh của chính cặp đôi, ở public/images
   * null = chỉ dùng màu nền của tông.
   */
  background?: BackgroundName | `/${string}` | null;
  /** Độ mờ của lớp phủ trên ảnh nền, 0–1. Cao hơn = chữ dễ đọc hơn. */
  overlay?: number;
  /** Vân giấy lặp kín nền. */
  texture?: TextureName | null;
  /** Dải ngăn cưỡi lên đường nối với section phía trên. */
  divider?: DividerName | null;
  decor?: DecorPlacement[];
};

/**
 * Mặt nhìn của từng section — tông màu, nền, hoạ tiết.
 *
 * Tách khỏi file section để đổi diện mạo là sửa nội dung chứ không sửa code.
 * Tên asset lấy từ `content/assets.ts`, file đó do `npm run assets` sinh ra
 * sau khi bạn thả file vào `brand/`. Gõ sai tên là TypeScript báo đỏ ngay.
 *
 * Khung nền để trống hết phần nền — site chạy bằng màu phẳng của theme.
 */
export const design: Record<SectionId, SectionDesign> = {
  intro: {
    anchor: "intro",
    tone: "dark",
    background: "silk-wine",
    overlay: 0.42,
    decor: [
      { name: "crest", at: "top-[7%] left-1/2 -translate-x-1/2 w-[26%]" },
      { name: "bouquet-foot", at: "bottom-[-2%] -left-[10%] w-[46%]", parallax: 14 },
      { name: "bouquet-top", at: "bottom-[-4%] -right-[12%] w-[44%]", parallax: 20, hideOnMobile: true },
    ],
  },
  hero: {
    anchor: "hero",
    tone: "light",
    background: "/images/hero.jpg",
    overlay: 0.62,
    texture: "paper-ivory",
    decor: [
      /* Dải lụa là một cái "valance" vắt ngang mép trên: kéo lên cao để chỉ
         còn nếp rủ phía dưới, tên cặp đôi không bao giờ chạm vào nó. */
      { name: "silk-swag", at: "-top-[16%] left-0 w-full" },
      /* Hoa ở góc trái — góc phải đã có nút nhạc đứng. */
      { name: "rose", at: "bottom-[4%] -left-[9%] w-[28%]", rotate: -6, sway: true },
    ],
  },
  loveStory: {
    anchor: "love-story",
    tone: "paper",
    texture: "paper-ivory",
    divider: "lace-band",
    decor: [
      { name: "ribbon-bow", at: "top-[3%] -left-[7%] w-[24%]", rotate: -10, parallax: 18 },
      { name: "butterfly", at: "top-[14%] right-[4%] w-[16%]", sway: true, hideOnMobile: true },
    ],
  },
  gallery: {
    anchor: "gallery",
    tone: "light",
    texture: "paper-ivory",
    decor: [{ name: "gilt-bloom", at: "top-[4%] -right-[6%] w-[22%]", rotate: 8, parallax: 24 }],
  },
  weddingInfo: {
    anchor: "wedding-info",
    tone: "dark",
    background: "damask-wine",
    overlay: 0.74,
    divider: "lace-band",
    decor: [
      { name: "calla-bouquet", at: "top-[5%] -left-[9%] w-[32%]", parallax: 16 },
      { name: "tassel", at: "top-0 right-[7%] w-[9%]", sway: true },
    ],
  },
  agenda: {
    anchor: "agenda",
    tone: "light",
    background: "damask-cream",
    overlay: 0.82,
    decor: [{ name: "line-rings", at: "top-[5%] left-[5%] w-[14%]", hideOnMobile: true }],
  },
  dresscode: {
    anchor: "dresscode",
    tone: "paper",
    texture: "paper-ivory",
    divider: "lace-band",
    decor: [{ name: "wax-seal", at: "bottom-[6%] -right-[5%] w-[22%]", rotate: 6 }],
  },
  rsvp: {
    anchor: "rsvp",
    tone: "light",
    texture: "paper-ivory",
    decor: [{ name: "stamp", at: "top-[4%] right-[5%] w-[16%]", rotate: -7, hideOnMobile: true }],
  },
  thankYou: {
    anchor: "thank-you",
    tone: "dark",
    background: "silk-wine",
    overlay: 0.74,
    divider: "lace-band",
    decor: [{ name: "crest", at: "bottom-[6%] left-1/2 -translate-x-1/2 w-[22%]" }],
  },
};

/* ------------------------------------------------------------------ COUPLE */

export const couple = {
  /** Tên hiển thị lớn ở hero và màn mở thiệp */
  groom: "Quang Đức",
  bride: "Thanh Trúc",
  /** Tên đầy đủ, dùng trong phần thông tin lễ cưới */
  groomFull: "Họ Tên Đầy Đủ Chú Rể",
  brideFull: "Họ Tên Đầy Đủ Cô Dâu",
  hashtag: "#QuangDucThanhTruc",
};

/** Bố mẹ hai bên — hiện ở section Thông tin lễ cưới */
export const families = [
  {
    side: "Nhà trai",
    people: [
      { role: "Ông", name: "Họ Tên Bố Chú Rể" },
      { role: "Bà", name: "Họ Tên Mẹ Chú Rể" },
    ],
    home: "Địa chỉ nhà trai",
  },
  {
    side: "Nhà gái",
    people: [
      { role: "Ông", name: "Họ Tên Bố Cô Dâu" },
      { role: "Bà", name: "Họ Tên Mẹ Cô Dâu" },
    ],
    home: "Địa chỉ nhà gái",
  },
];

/* -------------------------------------------------------------- NGÀY & GIỜ */

export const ceremony = {
  /** Giờ khai tiệc. Lịch, đồng hồ đếm ngược và link Google Calendar đều tính từ đây. */
  startISO: "2026-12-20T17:30:00+07:00",
  /** Giờ tan tiệc — chỉ dùng cho link thêm vào lịch. */
  endISO: "2026-12-20T21:30:00+07:00",
  weekday: "Chủ Nhật",
  dateShort: "20 . 12 . 2026",
  timeLabel: "17:30",
  /** Ngày âm — gia đình tự đọc, không tính tự động. PLACEHOLDER, nhờ gia đình xác nhận. */
  lunar: "Tức ngày 02 tháng 11 năm Bính Ngọ",
};

export const venue = {
  name: "GEM Center",
  hall: "Tên sảnh — Tầng X",
  address: "8 Nguyễn Bỉnh Khiêm, Phường Đa Kao, Quận 1, TP. Hồ Chí Minh",
  /** PLACEHOLDER — thay bằng link Maps ghim sẵn của sảnh. */
  mapUrl: "https://www.google.com/maps",
  mapLabel: "Xem bản đồ",
  note: "Kính mời quý khách tới sớm ít phút để kịp chụp hình cùng gia đình.",
};

/* ------------------------------------------------------------------ INTRO */

export const intro = {
  eyebrow: "Save the Date",
  /** Nút mở thiệp. Chính cú chạm này bật nhạc — xem ExperienceProvider. */
  cta: "Mở thiệp",
  note: "Trân trọng kính mời",
};

/* ------------------------------------------------------------------- HERO */

export const hero = {
  eyebrow: "Trân trọng kính mời",
  headline: "đến chung vui cùng gia đình chúng tôi",
  scrollHint: "Cuộn xuống",
};

/* -------------------------------------------------------------- LOVE STORY */

export const loveStory = {
  eyebrow: "Chuyện của chúng mình",
  title: "Love Story",
  intro: "Vuốt sang để đi lại chặng đường mười năm của chúng mình.",
  /** Bốn chương, đúng bốn bảng trưng bày ở tiệc cưới. */
  chapters: [
    {
      year: "Chương 1",
      title: "Những ánh nhìn thoáng qua",
      body: "Kỷ niệm thời học sinh và những rung cảm đầu đời, khi hai đứa chỉ đứng từ xa nhìn nhau, thoáng qua nhau.",
      photo: "/images/couple-01.jpg",
      alt: "PLACEHOLDER — ảnh pre-wedding chụp ở bối cảnh thời học sinh",
    },
    {
      year: "06 . 02 . 2016",
      title: "5 năm yêu xa",
      body: "Ngày chúng mình chọn làm ngày kỷ niệm, mở đầu cho năm năm thương nhau qua màn hình và những chuyến bay.",
      photo: "/images/couple-02.jpg",
      alt: "PLACEHOLDER — ảnh chụp trong những năm yêu xa",
    },
    {
      year: "2020 — 2023",
      title: "Cuộc gặp lại & Sự dung hoà",
      body: "Năm 2020 Đức về Việt Nam, và năm 2023 chúng mình chính thức về chung một nhà.",
      photo: "/images/couple-03.jpg",
      alt: "PLACEHOLDER — ảnh những năm về chung một nhà",
    },
    {
      year: "Chương 4",
      title: "A decade of quiet love & timeless harmony",
      body: "Một thập kỷ thương nhau lặng lẽ — thanh xuân đi qua và ở lại thành một đời sống yên bình.",
      photo: "/images/couple-04.jpg",
      alt: "PLACEHOLDER — ảnh pre-wedding cô dâu mặc váy cưới",
    },
  ],
  /** Nhịp kết, đứng riêng dưới băng ảnh. Để null thì không hiện. */
  finale: {
    year: "20 . 12 . 2026",
    title: "Và chúng mình cưới",
    body: "Hẹn gặp quý khách tại GEM Center trong ngày trọng đại.",
  },
};

/* ---------------------------------------------------------------- GALLERY */

export const gallery = {
  eyebrow: "Album",
  title: "Khoảnh khắc của chúng mình",
  note: "Những tấm hình chúng mình thương nhất.",
  /** Chữ gợi ý cho người xem biết dải ảnh kéo ngang được. */
  hint: "Vuốt sang để xem tiếp",
  shots: [
    { src: "/images/gallery-01.jpg", alt: "Ảnh cưới số 1" },
    { src: "/images/gallery-02.jpg", alt: "Ảnh cưới số 2" },
    { src: "/images/gallery-03.jpg", alt: "Ảnh cưới số 3" },
    { src: "/images/gallery-04.jpg", alt: "Ảnh cưới số 4" },
    { src: "/images/gallery-05.jpg", alt: "Ảnh cưới số 5" },
    { src: "/images/gallery-06.jpg", alt: "Ảnh cưới số 6" },
  ],
};

/* ------------------------------------------------------------ WEDDING INFO */

export const weddingInfo = {
  eyebrow: "Thông tin lễ cưới",
  title: "Ngày chúng mình về chung một nhà",
  intro: "Kính mời quý khách tới dự tiệc mừng lễ thành hôn của chúng mình tại GEM Center.",
  saveTheDateLabel: "Save the date",
  venueLabel: "Địa điểm",
  calendarLabel: "Thêm vào lịch",
  photo: "/images/couple-05.jpg",
  photoAlt: "Cô dâu và chú rể",
};

/* ----------------------------------------------------------------- AGENDA */

export const agenda = {
  eyebrow: "Chương trình",
  title: "Trình tự buổi lễ",
  intro: "Giờ dự kiến của buổi tiệc.",
  items: [
    { time: "17:30", title: "Đón khách", note: "Quý khách nhận chỗ và chụp hình lưu niệm" },
    { time: "18:00", title: "Làm lễ", note: "Nghi thức thành hôn" },
    { time: "18:30", title: "Khai tiệc", note: "Mở tiệc cùng gia đình hai bên" },
    { time: "19:30", title: "Tiệc sau lễ", note: "Âm nhạc và chúc phúc" },
  ],
};

/* -------------------------------------------------------------- DRESSCODE */

export const dresscode = {
  eyebrow: "Trang phục",
  title: "Dress Code",
  headline: "Thanh lịch & trang trọng",
  note: "Để khung hình ngày cưới thật hoà hợp, kính mời quý khách chọn trang phục theo bảng màu dưới đây.",
  /** Để mảng rỗng thì phần bảng màu tự ẩn. */
  swatches: [
    { name: "Đỏ rượu vang", hex: "#600f20" },
    { name: "Kem ngà", hex: "#f2e8d7" },
    { name: "Vàng đồng", hex: "#a48210" },
    { name: "Trắng", hex: "#ffffff" },
  ],
  avoid: "Xin hạn chế trang phục màu trắng tinh của cô dâu.",
};

/* ------------------------------------------------------------------- RSVP */

/**
 * RSVP đi qua Glow RSVP Hub. KHÔNG tự tạo Google Sheet, KHÔNG dán Apps Script:
 * chạy skill `glow-rsvp` để nó tạo Sheet và điền ba giá trị dưới đây.
 *
 *   mode "general"      — một form mở, ai có link site cũng trả lời được
 *   mode "personalized" — mỗi khách một link `?to=<slug>`, site gọi tên khách
 *
 * `endpoint` để TRỐNG trong khung nền. Secret của hub không bao giờ nằm trong
 * repo — nó ở ~/.glow/rsvp.env.
 */
export const rsvp = {
  mode: "general" as "general" | "personalized",
  /** URL của Glow RSVP Hub — skill glow-rsvp điền vào. */
  endpoint: "https://script.google.com/macros/s/AKfycbxB9Oc65toi-UmEfTB_J6d3l8LQoNQvhpyY1IaIIKR2h8I59K1NxvCGTZckTqLaT5y_/exec",
  /** Slug của khách, trùng subdomain: ten-khach.gloweb.site → "ten-khach" */
  client: "quangducthanhtruc",

  eyebrow: "R.S.V.P",
  title: "Quý khách sẽ đến chứ?",
  note: "Nhắn giúp chúng mình một tiếng để gia đình chuẩn bị chỗ ngồi chu đáo.",
  deadline: "Vui lòng phản hồi trước ngày 10 . 12 . 2026",

  /**
   * Thứ tự ở đây = thứ tự cột trong Sheet của khách. Đổi key hoặc thêm field
   * thì phải chạy lại: ~/glow-tools/glow-rsvp.sh fields <client> --fields "…"
   */
  fields: {
    name: { label: "Họ và tên", placeholder: "Nguyễn Văn A" },
    contact: {
      label: "Số điện thoại / Email",
      placeholder: "09xx xxx xxx hoặc email",
    },
    attending: {
      label: "Quý khách có tham dự?",
      yes: "Có, tôi sẽ đến",
      no: "Rất tiếc, tôi xin vắng",
    },
    guests: { label: "Số lượng khách", none: "Tôi đi một mình", max: 4 },
    companions: {
      label: "Tên khách đi cùng (nếu có)",
      placeholder: "Mỗi người một dòng, hoặc cách nhau bằng dấu phẩy",
    },
    meal: {
      label: "Ưu tiên món ăn (không bắt buộc)",
      placeholder: "Ăn chay, dị ứng hải sản…",
    },
    message: {
      label: "Lời chúc gửi cô dâu chú rể (không bắt buộc)",
      placeholder: "Chúc hai bạn trăm năm hạnh phúc…",
    },
  },

  submit: "Gửi phản hồi",
  sending: "Đang gửi…",
  successTitle: "Đã nhận được!",
  successNote: "Cảm ơn quý khách. Chúng mình sẽ giữ sẵn một chỗ thật đẹp.",
  errorNote: "Gửi chưa được, quý khách thử lại giúp chúng mình một lần nữa nhé.",
  /** Chào khách vào bằng link riêng — chỉ dùng khi mode "personalized". */
  greeting: "Thân mời",
};

/* --------------------------------------------------------------- THANK YOU */

export const thankYou = {
  eyebrow: "Thank you",
  title: "Cảm ơn quý khách",
  lines: [
    "Cảm ơn quý khách đã dành thời gian",
    "đồng hành cùng chúng mình trong ngày trọng đại.",
  ],
  signature: "Quang Đức & Thanh Trúc",
  image: "/images/couple-06.jpg",
  imageAlt: "Cô dâu và chú rể",
};

/* ------------------------------------------------------------------ NHẠC */

/**
 * Nhạc nền. `src` để "" thì nút nhạc tự ẩn và trang vẫn chạy bình thường.
 * Nhạc chỉ bật từ chính cú chạm "Mở thiệp" — trình duyệt trên điện thoại
 * không cho phát nhạc ngoài một thao tác của người dùng.
 */
export const music = {
  src: "/audio/music.mp3",
  enabled: true,
  title: "PLACEHOLDER — tên bài hát & nghệ sĩ",
  volume: 0.55,
};

/* ------------------------------------------------------------------- META */

export const meta = {
  /** Domain thật của site — dùng để dựng link ảnh OG tuyệt đối. */
  siteUrl: "https://quangducthanhtruc.gloweb.site",
  title: "Quang Đức & Thanh Trúc — Thiệp cưới",
  description:
    "Trân trọng kính mời quý khách đến chung vui cùng gia đình chúng tôi ngày 20.12.2026 tại GEM Center.",
  /** Ảnh hiện khi dán link lên Zalo / Facebook. */
  ogImage: "/images/hero.jpg",
  locale: "vi_VN",
  lang: "vi",
};
