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
  | "thankYou"
  | "thankYouGrid";

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
  "weddingInfo",
  "loveStory",
  "gallery",
  "agenda",
  "dresscode",
  "rsvp",
  "thankYou",
  "thankYouGrid",
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
  /* Màn mở thiệp dàn bằng <Stage> theo mockup sân khấu (nền, hai cánh cửa,
     hai chùm hoa nằm trong Intro.tsx) — ở đây chỉ còn tông màu. */
  intro: { anchor: "intro", tone: "dark" },
  /* Ba trang đầu (hero, thông tin, love story) dàn bằng <Stage> theo đúng
     mockup của khách — hoa, tấm kem, nền nhung đều nằm trong file section
     dưới dạng toạ độ mockup, nên ở đây chỉ còn tông màu. */
  hero: { anchor: "hero", tone: "dark" },
  weddingInfo: { anchor: "wedding-info", tone: "dark" },
  loveStory: { anchor: "love-story", tone: "dark" },
  gallery: {
    anchor: "gallery",
    tone: "dark",
    decor: [
      { name: "bouquet-right", at: "-top-[2%] -right-[10%] w-[34%]", parallax: 12 },
      { name: "bouquet-left", at: "-bottom-[3%] -left-[12%] w-[34%]", parallax: 18 },
    ],
  },
  agenda: {
    anchor: "agenda",
    tone: "light",
    decor: [
      // Vân đồng mức: ~26% phía trên của file có các nét dừng lơ lửng theo một
      // đường chéo (file bị cắt bằng mặt nạ). Ảnh cao 137% section, neo đáy:
      // đoạn đó bị đẩy lên quá mép trên và cắt đi; đáy file trùng đáy section.
      {
        name: "contour-lines",
        at: "inset-0 overflow-hidden [&_img]:absolute [&_img]:bottom-0 [&_img]:h-[137%]",
      },
    ],
  },
  dresscode: {
    anchor: "dresscode",
    tone: "dark",
    background: "velvet",
    overlay: 0,
    decor: [
      { name: "drape-left", at: "top-0 left-0 w-[22%]" },
    ],
  },
  rsvp: {
    anchor: "rsvp",
    tone: "dark",
    decor: [{ name: "bouquet-right", at: "-top-[3%] -right-[6%] w-[30%]" }],
  },
  thankYou: { anchor: "thank-you", tone: "dark" },
  thankYouGrid: { anchor: "thank-you-album", tone: "dark" },
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
  dateShort: "20.12.2026",
  /** Giờ làm lễ, theo mockup của khách. */
  timeLabel: "19:00",
  /** Ngày âm — theo mockup; 20/12/2026 là 12/11 Bính Ngọ. */
  lunar: "tức ngày 12 tháng 11 năm Bính Ngọ",
};

export const venue = {
  /** Tên viết bằng chữ hoa mỹ Latin (Bellissima) — giữ không dấu. */
  name: "Gem Center",
  hall: "POLLUX – tầng 3",
  address: "8 Nguyễn Bỉnh Khiêm, P. Sài Gòn, TP. HCM",
  /** PLACEHOLDER — thay bằng link Maps ghim sẵn của sảnh. */
  mapUrl: "https://www.google.com/maps",
  mapLabel: "Xem bản đồ",
  note: "Kính mời quý khách tới sớm ít phút để kịp chụp hình cùng gia đình.",
};

/* ------------------------------------------------------------------ INTRO */

export const intro = {
  /** Dòng nhỏ trên tên hai người. */
  lead: "the wedding of",
  note: "Trân trọng kính mời",
  /** Nút mở thiệp. Chính cú chạm này bật nhạc — xem ExperienceProvider. */
  cta: "Mở thiệp",
};

/* ------------------------------------------------------------------- HERO */

export const hero = {
  /** Ảnh cặp đôi đã nằm sẵn trong khung của bộ nhận diện (brand/elements/hero-frame). */
  photoAlt: "Quang Đức và Thanh Trúc trong khung ảnh Wedding Day",
  /** Hai dòng mời đặt ở chân ảnh. */
  invite: ["Trân trọng kính mời bạn đến", "chung vui cùng chúng mình"],
  groomLabel: "chú rể",
  brideLabel: "cô dâu",
};

/* -------------------------------------------------------------- LOVE STORY */

export const loveStory = {
  eyebrow: "Chuyện của chúng mình",
  /** Tiêu đề hoa mỹ — chỉ chữ Latin không dấu (xem `<Title>`). */
  title: "Our Love Story",
  /** Ảnh oval dưới tiêu đề — ảnh đã cắt sẵn trong brand/elements/love-oval. */
  photoAlt: "Thanh Trúc và Quang Đức trong ảnh cưới",
  /** Câu dẫn nằm trong khung giấy dưới ảnh oval (brand/elements/story-quote). */
  quote: "Mỗi câu chuyện tình yêu đều có một khởi đầu riêng. Và đây là câu chuyện của chúng mình.",
  /**
   * Ba chương, mỗi chương một ảnh trong dải phim. `film` là tên hoạ tiết trong
   * brand/elements — ảnh đã lồng sẵn vào khung phim của bộ nhận diện.
   */
  chapters: [
    {
      label: "Chapter 1",
      title: "Những ánh nhìn thoáng qua",
      body: "Trúc và Đức biết nhau từ những năm học trò ở trường Bùi Thị Xuân: hai người bạn khác lớp, vài lần kiếm cớ gặp gỡ vu vơ, những cái vẫy tay qua khung cửa lớp. Một lời kết bạn từ Đức mở đầu cho một mối quan hệ êm đềm mà bền bỉ. Rồi Đức đi du học, mỗi người một bước chuyển của riêng mình.",
      film: "film-corridor",
      alt: "Hai đứa đi ngang nhau trên hành lang trường",
    },
    {
      label: "Chapter 2",
      title: "5 năm yêu xa",
      body: "Tưởng chỉ dừng lại ở tình bạn tuổi học trò, Đức và Trúc bất ngờ kết nối lại vào Tết năm 2016. Những cuộc trò chuyện lệch hai múi giờ, những cuộc gọi video cách nửa vòng trái đất, những lưu luyến trong buổi hẹn cuối mỗi dịp hè. Năm năm yêu xa trôi qua với thật nhiều kỉ niệm.",
      film: "film-basketball",
      alt: "Sân bóng rổ của trường, nơi gắn với những năm yêu xa",
    },
    {
      label: "Chapter 3",
      title: "Cuộc gặp lại & sự dung hoà",
      body: "Rồi thêm năm năm nữa cùng nhau trưởng thành, chứng kiến phiên bản hoàn thiện hơn mỗi ngày của nhau. Sau 13 năm quen biết và hơn 10 năm yêu thương, Trúc và Đức cùng mở một cánh cửa mới, trong phiên bản đặc biệt nhất của chính mình: cô dâu và chú rể.",
      film: "film-wedding",
      alt: "Cô dâu chú rể trong ảnh cưới",
    },
  ] as const,
};

/* ---------------------------------------------------------------- GALLERY */

export const gallery = {
  eyebrow: "Album ảnh",
  /** Tiêu đề hoa mỹ — chỉ chữ Latin không dấu (xem `<Title>`). */
  title: "Our Gallery",
  note: "Những tấm hình chúng mình thương nhất.",
  shots: [
    { src: "/images/gallery-01.jpg", alt: "Cô dâu chú rể hôn nhau giữa vườn" },
    { src: "/images/gallery-02.jpg", alt: "Hai người nắm tay bước đi, ảnh đen trắng" },
    { src: "/images/gallery-03.jpg", alt: "Cô dâu chú rể trên lối đi trong vườn" },
    { src: "/images/gallery-04.jpg", alt: "Chú rể kéo tay cô dâu xoay vòng" },
    { src: "/images/gallery-05.jpg", alt: "Chú rể dắt cô dâu chạy trước bức tường, ảnh đen trắng" },
    { src: "/images/gallery-06.jpg", alt: "Cô dâu chú rể đứng giữa khu vườn xanh" },
    { src: "/images/gallery-07.jpg", alt: "Chú rể ngả cô dâu trước bức tường hoa văn" },
    { src: "/images/gallery-08.jpg", alt: "Cô dâu chú rể bước đi trên bãi cỏ" },
    { src: "/images/gallery-09.jpg", alt: "Chú rể và cô dâu ngồi trên lan can đá" },
  ],
};

/* ------------------------------------------------------------ WEDDING INFO */

export const weddingInfo = {
  title: "Thông tin lễ cưới",
  /** Dòng đầu trên tấm kem, ghép với ceremony.timeLabel. */
  ceremonyLine: "Lễ Thành Hôn diễn ra vào lúc",
  venueLabel: "Địa điểm",
};

/* ----------------------------------------------------------------- AGENDA */

export const agenda = {
  eyebrow: "Chương trình",
  /** Tiêu đề hoa mỹ — chỉ chữ Latin không dấu (xem `<Title>`). */
  title: "Agenda",
  intro: "Trình tự buổi lễ và giờ dự kiến của buổi tiệc.",
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
    { name: "Đỏ rượu vang", hex: "#620000" },
    { name: "Kem ngà", hex: "#fcebd3" },
    { name: "Vàng đồng", hex: "#a3824f" },
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

  /**
   * Tiêu đề hoa mỹ ở đầu tấm giấy kem, cùng bậc chữ với tiêu đề các section
   * khác (`<Title>`). Chỉ chữ Latin không dấu.
   */
  heading: "Dear,",
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
  title: "Cảm ơn quý khách",
  /** Trang 1: ảnh đen trắng làm nền, hai tấm polaroid chồng lên. */
  background: "/images/thankyou-reflection.jpg",
  polaroids: [
    { src: "/images/polaroid-groom.webp", alt: "Chú rể Quang Đức trong vườn", caption: "Quang Đức" },
    { src: "/images/polaroid-bride.webp", alt: "Cô dâu Thanh Trúc trước cổng sắt", caption: "Thanh Trúc" },
  ],
  /** Trang 2: lưới 3×3 ảnh, ô giữa là lời cảm ơn. */
  grid: "/images/thankyou-grid.webp",
  gridAlt: "Tám khoảnh khắc trong bộ ảnh cưới của Quang Đức và Thanh Trúc",
  /** Ô giữa: một chữ hoa mỹ (Latin, không dấu) và một dòng chữ hoa. */
  /** Tiêu đề hoa mỹ ở ô giữa lưới ảnh, mỗi phần tử một dòng. */
  words: ["Thank", "you"],
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
