import Image from "next/image";

import { Title } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Layer, Stage } from "@/components/ui/Stage";
import { thankYou } from "@/content/client";

/*
  Ảnh ở trang này đã xuất sẵn cỡ web trong public/images (dựng bằng tay từ ảnh
  gốc, xem README trong đó), nên để `unoptimized` thay vì nén lại lần nữa.
*/

/** Toạ độ hai tấm polaroid trên mockup trang cảm ơn (khổ 602 × 854). */
const POLAROIDS = [
  { x: 46, y: 186 },
  { x: 314, y: 330 },
];

/**
 * Trang cảm ơn thứ nhất: ảnh đen trắng phủ kín làm nền, hai tấm polaroid
 * (chú rể, cô dâu) đặt so le lên trên. Nửa dưới ảnh nền là bóng phản chiếu
 * mờ của chính cặp đôi, dựng sẵn trong file ảnh như mặt nước của mockup. Phần giấy trắng dưới mỗi tấm mang tên
 * viết tay, như chữ ký sau tấm ảnh in.
 */
export function ThankYou() {
  return (
    <SectionWrapper section="thankYou" flush width="bleed" labelledBy="thank-you-title">
      <h2 id="thank-you-title" className="sr-only">
        {thankYou.title}
      </h2>

      <Stage width={602} height={854}>
        <Image
          src={thankYou.background}
          alt=""
          fill
          unoptimized
          className="object-cover object-top"
        />

        {thankYou.polaroids.map((photo, i) => (
          <Layer key={photo.src} x={POLAROIDS[i].x} y={POLAROIDS[i].y} w={242} z={i + 1} reveal revealDelay={i * 160}>
            <figure className="relative shadow-lift">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={720}
                height={1279}
                unoptimized
                className="h-auto w-full"
              />
              {/* Tên viết tay nằm trên phần giấy trắng (45% dưới của tấm polaroid) */}
              <figcaption className="absolute inset-x-0 bottom-[14%] text-center font-script text-stage-xl text-wine">
                {photo.caption}
              </figcaption>
            </figure>
          </Layer>
        ))}
      </Stage>
    </SectionWrapper>
  );
}

/**
 * Trang cảm ơn thứ hai: lưới 3×3 ảnh trên nền lụa đỏ với viền trên/dưới khớp
 * đúng viền trái/phải của ảnh lưới, ô giữa là tiêu đề "Thank you" — cùng kiểu
 * và cỡ với tiêu đề của mọi section.
 * Ô giữa trong ảnh đã để trống màu đỏ rượu; chữ là chữ thật đặt lên đó.
 */
export function ThankYouGrid() {
  return (
    <SectionWrapper
      section="thankYouGrid"
      flush
      width="bleed"
      labelledBy="thank-you-grid-title"
    >
      {/* Nền lụa đỏ phủ kín cả màn hình; lưới nằm giữa theo chiều dọc. Viền và
          ô giữa của lưới đã khoét trong suốt nên nền hiện qua. */}
      <div className="absolute inset-0 -z-10">
        <Image src={thankYou.gridBackground} alt="" fill unoptimized className="object-cover" />
      </div>
      <Stage width={1080} height={1371}>
        <Image
          src={thankYou.grid}
          alt={thankYou.gridAlt}
          fill
          unoptimized
          className="object-cover"
        />

        {/* Ô giữa của lưới: x 368–712, y 467–904 trên ảnh 1080 × 1371 */}
        <Layer x={368} y={467} w={344} z={1}>
          <Reveal className="flex aspect-[344/437] flex-col items-center justify-center text-cream">
            {/* Cùng kiểu và cỡ tiêu đề với mọi section, không trộn font như ô
                "Save THE DATE" của mockup */}
            <Title id="thank-you-grid-title" className="text-center">
              {thankYou.words.map((word, i) => (
                <span key={word} className="block">
                  {i > 0 ? " " : null}
                  {word}
                </span>
              ))}
            </Title>
          </Reveal>
        </Layer>
      </Stage>
    </SectionWrapper>
  );
}
