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
  "rsvp",
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
  /**
   * Cách trải ảnh nền:
   *   • "cover" (mặc định) — một ảnh phủ kín section
   *   • "tile" — ảnh rộng bằng section, lặp dọc. Dùng cho section rất dài,
   *     nơi "cover" sẽ phóng hoa văn lên gấp mấy lần. Ảnh nên là ô lặp liền
   *     mép trên–dưới (vd. ảnh gốc + bản lật dọc nối vào nhau).
   */
  backgroundFit?: "cover" | "tile";
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
  loveStory: {
    anchor: "love-story",
    tone: "mist",
    background: "damask-cream-tile",
    backgroundFit: "tile",
    overlay: 0,
  },
  gallery: {
    anchor: "gallery",
    tone: "light",
    background: "damask-cream",
    overlay: 0,
  },
  agenda: {
    anchor: "agenda",
    tone: "dark",
    background: "damask-wine",
    overlay: 0,
  },
  // Cùng nền damask đỏ rượu với Agenda và RSVP để ba section đọc liền một mạch
  dresscode: { anchor: "dresscode", tone: "dark", background: "damask-wine", overlay: 0 },
  rsvp: {
    anchor: "rsvp",
    tone: "light",
    background: "damask-cream",
    overlay: 0,
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
  /** Giờ đón khách. Lịch, đồng hồ đếm ngược và link Google Calendar đều tính từ đây. */
  startISO: "2026-12-20T18:00:00+07:00",
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
  mapUrl:
    "https://www.google.com/maps/place/GEM+Center/@10.7901279,106.6997917,970m/data=!3m2!1e3!4b1!4m6!3m5!1s0x317528b4d5ef2cff:0x7119dc5f357813ee!8m2!3d10.7901279!4d106.702372!16s%2Fg%2F11b7hnnvfm",
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
  /** Ảnh cặp đôi tràn kín màn hình — ảnh dọc 2:3, xem public/images/README.md. */
  photo: "/images/hero.jpg",
  photoAlt: "Thanh Trúc và Quang Đức khoe nhẫn cưới trước tấm rèm",
  groomLabel: "chú rể",
  brideLabel: "cô dâu",
};

/* -------------------------------------------------------------- LOVE STORY */

export const loveStory = {
  /**
   * Đầu section: `title` là dòng nhỏ phía trên, `names` là tiêu đề viết tay.
   */
  title: "Our Love Story",
  names: "Đức & Trúc",
  /**
   * Ba đoạn kể nối nhau như một mạch truyện, không nhãn chương hay tên chương,
   * xen kẽ ảnh trái — chữ phải. `photo` là ảnh trần, component lồng vào
   * khung polaroid và cắt về cùng tỉ lệ 4:5. Mỗi phần tử của `body` là một đoạn.
   */
  chapters: [
    {
      body: [
        "Biết nhau từ những năm tháng học trò tại trường Bùi Thị Xuân, cả hai là những người bạn khác lớp, đôi lần thấy nhau nơi sân trường, những cái vẫy tay qua khung cửa lớp quen thuộc, một lời kết bạn mở đầu cho một mối quan hệ êm đềm mà bền bỉ suốt nhiều năm sau đó.",
      ],
      photo: { src: "/brand/elements/story-shot-1.webp", width: 402, height: 472 },
      alt: "Hai đứa đi ngang nhau trên hành lang trường",
    },
    {
      body: [
        "Hết cấp ba, cả hai tập trung cho những bước chuyển quan trọng của riêng mình.",
        "Tưởng chừng câu chuyện chỉ dừng lại ở một tình bạn tuổi học trò, Đức và Trúc bất ngờ kết nối lại vào dịp Tết năm 2016.",
      ],
      photo: { src: "/images/story-2.webp", width: 600, height: 900 },
      alt: "Cô dâu ngồi trên bãi cỏ cạnh bức tường đá",
    },
    {
      body: [
        "Những cuộc trò chuyện đan xen vào hai múi giờ trái ngược nhau. Những cuộc gọi video kết nối hai cuộc sống cách nhau nửa vòng trái đất. Những lưu luyến trong buổi hẹn cuối cùng mỗi dịp hè gặp lại.",
        "Năm năm yêu xa cứ thế trôi qua với thật nhiều kỷ niệm và cung bậc cảm xúc.",
      ],
      photo: { src: "/images/story-3.webp", width: 600, height: 900 },
      alt: "Chú rể đứng dưới vòm cây trước lối vào nhà đá",
    },
  ],
  /**
   * Đoạn nối ba chương với đoạn kết: hai nửa câu đứng hai bên cặp nhẫn
   * (brand/elements/rings-gold), sợi chỉ đỏ xuyên qua nhẫn ở giữa.
   */
  interlude: [
    "Rồi lại thêm năm năm nữa, cùng nhau trưởng thành, đi qua nhiều thay đổi",
    "và chứng kiến phiên bản hoàn thiện hơn mỗi ngày của đối phương.",
  ],
  interludeRings: "rings-gold",
  /**
   * Đoạn kết trên nền nhung đỏ: ba ảnh (một dọc bên trái, hai ngang bên
   * phải) rồi đoạn chữ.
   */
  finale: {
    photos: [
      { src: "/images/story-finale-1.webp", alt: "Cô dâu chú rể nắm tay trước tấm rèm xanh rêu" },
      { src: "/images/story-finale-3.webp", alt: "Bàn tay chú rể đưa chiếc nhẫn về phía tay cô dâu" },
      { src: "/images/story-finale-2.webp", alt: "Cô dâu chú rể ngồi trò chuyện, cười với nhau" },
    ],
    body: [
      "Để hôm nay, sau 13 năm quen biết và hơn 10 năm yêu thương, Trúc và Đức sẽ cùng nhau mở một cánh cửa mới, bước sang một chương mới, trong phiên bản đặc biệt nhất của chính mình: cô dâu và chú rể.",
      "Và câu chuyện ấy sẽ còn được viết tiếp, qua từng trải nghiệm, sự trưởng thành và những phiên bản mới mà cả hai sẽ cùng nhau gặp gỡ.",
    ],
  },
};

/* ---------------------------------------------------------------- GALLERY */

export const gallery = {
  /** Tiêu đề section — tiếng Việt, `<Title>` tự dùng font script có dấu. */
  title: "Album ảnh",
  /** Ảnh ở public/gallery/td1…td22.jpg, dọc 2:3, theo đúng thứ tự tên file. */
  shots: Array.from({ length: 22 }, (_, i) => ({
    src: `/gallery/td${i + 1}.jpg`,
    alt: `Ảnh cưới của Quang Đức và Thanh Trúc, tấm ${i + 1}`,
  })),
};

/* ------------------------------------------------------------ WEDDING INFO */

export const weddingInfo = {
  title: "Thời gian & Địa điểm",
  /** Dòng đầu trên tấm kem, ghép với ceremony.timeLabel. */
  ceremonyLine: "Lễ Thành Hôn diễn ra vào lúc",
  venueLabel: "Địa điểm",
};

/* ----------------------------------------------------------------- AGENDA */

export const agenda = {
  title: "Chương trình",
  items: [
    { time: "18:00", title: "Đón Khách - Chụp Hình" },
    { time: "19:00", title: "Nghi Thức Lễ" },
    { time: "21:00", title: "Chào Khách" },
  ] as { time: string; title: string; note?: string }[],
  /** Ghi chú trang phục, nằm cuối section Chương trình. */
  dresscode: {
    title: "Trang phục",
    headline: "Trang trọng, lịch sự",
    note: "*Vui lòng không mặc màu trắng",
  },
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

  /** Đầu tấm giấy kem: tiêu đề viết tay + dòng chữ hoa bên dưới. */
  heading: "Thư mời",
  title: "Tham dự lễ cưới",
  deadline: "Vui lòng phản hồi trước ngày 10 . 12 . 2026",

  /**
   * Thứ tự ở đây = thứ tự cột trong Sheet của khách. Đổi key hoặc thêm field
   * thì phải chạy lại: ~/glow-tools/glow-rsvp.sh fields <client> --fields "…"
   */
  fields: {
    name: { label: "1 - Họ tên", placeholder: "Nguyễn Văn A" },
    contact: {
      label: "2 - Số điện thoại / Email",
      placeholder: "09xx xxx xxx hoặc email",
    },
    attending: {
      label: "3 - Xác nhận tham dự",
      yes: "Sẽ đến chung vui",
      no: "Tiếc quá, mình/gia đình không tham dự được",
    },
    /** Chọn "Khác" thì hiện ô gõ số người. */
    guests: {
      label: "4 - Số lượng người tham dự",
      options: ["1", "2"],
      other: "Khác",
      otherPlaceholder: "Nhập số người",
    },
    meal: {
      label: "5 - Lưu ý ăn uống",
      placeholder: "Ăn chay/dị ứng món ăn",
    },
    message: {
      label: "6 - Lời chúc gửi Đức & Trúc",
      placeholder: "Chúc hai bạn trăm năm hạnh phúc…",
    },
  },

  submit: "Gửi xác nhận tham dự",
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
  grid: "/images/thankyou-grid-v3.webp",
  /** Nền lụa hiện qua viền và ô giữa (đã khoét trong suốt) của lưới */
  gridBackground: "/back.png",
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
  title: "Có em đời bỗng vui",
  volume: 0.55,
};

/* ------------------------------------------------------------------- META */

export const meta = {
  /** Domain thật của site — dùng để dựng link ảnh OG tuyệt đối. */
  siteUrl: "https://quangducthanhtruc.gloweb.site",
  title: "Quang Đức & Thanh Trúc — Thiệp cưới",
  description:
    "Trân trọng kính mời quý khách đến chung vui cùng gia đình chúng tôi ngày 20.12.2026 tại GEM Center.",
  /**
   * Ảnh hiện khi dán link lên Zalo / Facebook — ảnh NGANG đúng 1200×630
   * (1.91:1) để nền tảng khỏi tự cắt giữa. Ảnh dọc sẽ bị cắt mất mặt.
   */
  ogImage: "/images/og.jpg",
  locale: "vi_VN",
  lang: "vi",
};
