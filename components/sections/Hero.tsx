import Image from "next/image";

import { Layer, Stage } from "@/components/ui/Stage";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Title } from "@/components/ui/Heading";
import { couple, hero } from "@/content/client";

/**
 * Trang bìa: ảnh cặp đôi tràn kín một màn hình, chữ "Wedding Day" vắt trên
 * rèm ở đầu ảnh, tên hai người nối bằng chữ "&" hoa mỹ ở chân ảnh.
 *
 * Ảnh phủ bằng `object-cover` nên mọi tỉ lệ màn đều kín, chỉ xén hai bên.
 * Ảnh để sạch, không phủ dải màu ở chân. Máy nằm ngang
 * (`short:`) thì bỏ chiều cao màn hình, giữ ảnh theo tỉ lệ 2:3 của nó.
 *
 * Hai cụm chữ vẫn dàn bằng <Stage> theo toạ độ mockup 270px, nên chữ co cùng
 * bề rộng cột trang như mọi trang khác.
 *
 * Các lớp gắn `reveal="hero"` / `data-hero` nên hiện theo cú chạm mở thiệp.
 */
export function Hero() {
  return (
    <SectionWrapper
      section="hero"
      flush
      width="bleed"
      labelledBy="hero-title"
      className="flex h-svh flex-col justify-between short:h-auto short:aspect-2/3"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src={hero.photo}
          alt={hero.photoAlt}
          fill
          priority
          /* Ảnh phủ theo chiều cao màn (2:3 → rộng ≈ 67vh), không theo bề ngang */
          sizes="(max-height: 32rem) 30rem, 67vh"
          className="object-cover"
        />
      </div>

      {/* Chữ đỏ rượu trên rèm kem: mượn tông light để nét đậm của Title viền
          màu mực, không phải màu kem + quầng vàng của tông dark. Đặt sát mép
          trên để không đè lên đầu chú rể. */}
      <div data-tone="light" className="pt-stack px-gutter text-center text-tone-fg">
        <div data-hero data-reveal-delay={150}>
          <Title as="p">Wedding Day</Title>
        </div>
      </div>

      <div className="glow-shade pb-section">
        {/* Tên hai người: nhãn nhỏ nghiêng ở trên, tên in hoa ở dưới */}
        <Stage width={270} height={74}>
          <Layer x={0} y={16} w={270} z={2} as="h1" reveal="hero" className="font-display">
            <span id="hero-title" className="grid grid-cols-2">
              <span className="flex flex-col items-center gap-tight">
                <span className="text-stage-xs italic">{hero.groomLabel}</span>
                <span className="text-stage-xl uppercase">{couple.groom}</span>
              </span>
              <span className="flex flex-col items-center gap-tight">
                <span className="text-stage-xs italic">{hero.brideLabel}</span>
                <span className="text-stage-xl uppercase">{couple.bride}</span>
              </span>
            </span>
          </Layer>
          <Layer name="ampersand" x={108} y={0} w={54} z={3} reveal="hero" />
        </Stage>
      </div>
    </SectionWrapper>
  );
}
