import { Layer, Stage } from "@/components/ui/Stage";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { couple, hero } from "@/content/client";

/**
 * Trang bìa, dàn theo mockup của khách (khổ 270px): khung ảnh viền vỏ sò,
 * chữ "Wedding Day" vắt trên rèm, hai dòng mời ở chân ảnh, rồi tên hai người
 * nối bằng chữ "&" hoa mỹ.
 *
 * Các lớp gắn `reveal="hero"` nên hiện theo cú chạm mở thiệp, không chờ cuộn.
 */
export function Hero() {
  return (
    <SectionWrapper section="hero" flush width="bleed" labelledBy="hero-title">
      <Stage width={270} height={418}>
        <Layer name="hero-frame" alt={hero.photoAlt} x={7} y={12} w={256} priority reveal="hero" />
        <Layer name="wedding-day" alt="Wedding Day" x={64} y={44} w={142} z={2} reveal="hero" revealDelay={150} />

        <Layer x={35} y={284} w={200} z={2} reveal="hero">
          <p className="text-center font-display text-stage-md text-cream">
            {hero.invite.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </Layer>

        {/* Tên hai người: nhãn nhỏ nghiêng ở trên, tên in hoa ở dưới */}
        <Layer x={0} y={360} w={270} z={2} as="h1" reveal="hero" className="font-display">
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
        <Layer name="ampersand" x={108} y={344} w={54} z={3} reveal="hero" />
      </Stage>
    </SectionWrapper>
  );
}
