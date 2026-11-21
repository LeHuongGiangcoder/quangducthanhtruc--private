import { Layer, Stage } from "@/components/ui/Stage";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { couple, hero } from "@/content/client";

/**
 * Trang bìa, dàn theo mockup của khách (khổ 270px): khung ảnh viền vỏ sò,
 * chữ "Wedding Day" vắt trên rèm, hai dòng mời ở chân ảnh, rồi tên hai người
 * nối bằng chữ "&" hoa mỹ.
 *
 * Khung ảnh rộng hơn Stage (300/270): hai mép vỏ sò tràn ra ngoài màn hình
 * để ảnh cặp đôi lớn hết cỡ. Stage `overflow: hidden` cắt phần tràn, nên không
 * sinh thanh cuộn ngang. Chữ "Wedding Day" và hai dòng mời đặt theo toạ độ
 * trong khung, nhân cùng tỉ lệ.
 *
 * Các lớp gắn `reveal="hero"` nên hiện theo cú chạm mở thiệp, không chờ cuộn.
 */
export function Hero() {
  return (
    <SectionWrapper section="hero" flush width="bleed" labelledBy="hero-title">
      <Stage width={270} height={476}>
        <Layer name="hero-frame" alt={hero.photoAlt} x={-15} y={12} w={300} priority reveal="hero" />
        <Layer name="wedding-day" alt="Wedding Day" x={52} y={50} w={166} z={2} reveal="hero" revealDelay={150} />

        <Layer x={18} y={331} w={234} z={2} reveal="hero">
          <p className="text-center font-display text-stage-md text-cream">
            {hero.invite.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </Layer>

        {/* Tên hai người: nhãn nhỏ nghiêng ở trên, tên in hoa ở dưới */}
        <Layer x={0} y={418} w={270} z={2} as="h1" reveal="hero" className="font-display">
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
        <Layer name="ampersand" x={108} y={402} w={54} z={3} reveal="hero" />
      </Stage>
    </SectionWrapper>
  );
}
