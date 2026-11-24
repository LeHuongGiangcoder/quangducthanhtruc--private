import { Eyebrow, Title } from "@/components/ui/Heading";
import { Layer, Stage } from "@/components/ui/Stage";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { dresscode } from "@/content/client";

/**
 * Trang phục, dàn như tấm thiệp ở bản Thời gian & Địa điểm cũ: tấm kem lục
 * giác ở giữa, mảng thoi đỏ nấp sau vai phải phía trên, tam giác đỏ đè góc
 * trái phía dưới — trên nền damask kem (đặt ở `design.dresscode`). Không có
 * vân đường đồng mức.
 *
 * Ô màu đọc hex thẳng từ client.ts — đây là chỗ duy nhất trong site được phép
 * nhận mã màu từ nội dung, vì bảng màu là nội dung của khách chứ không phải
 * theme của site.
 */
export function Dresscode() {
  return (
    <SectionWrapper section="dresscode" flush width="bleed" labelledBy="dresscode-title">
      <Stage width={270} height={560}>
        <Layer name="diamond-flap" x={127} y={0} w={143.3} z={1} />
        <Layer name="cream-panel-short" x={-30} y={40} w={330} z={2} />
        <Layer name="drape-left" x={0} y={372} w={120} z={3} />

        <Layer x={40} y={96} w={190} z={4} reveal>
          <div className="flex flex-col items-center text-center font-display text-tone-fg">
            <Eyebrow>{dresscode.eyebrow}</Eyebrow>
            <Title id="dresscode-title" className="mt-stage">
              {dresscode.title}
            </Title>
            <p className="mt-stage-lg text-stage-lg uppercase">{dresscode.headline}</p>
            <p className="mt-stage text-stage-sm">{dresscode.note}</p>

            {dresscode.swatches.length > 0 ? (
              <ul className="mt-stage-lg grid w-[72%] grid-cols-2 gap-x-stage-lg gap-y-stage-lg">
                {dresscode.swatches.map((swatch) => (
                  <li key={swatch.hex} className="flex flex-col items-center gap-tight">
                    <span
                      aria-hidden
                      className="aspect-square w-full rounded-full border border-tone-line shadow-paper"
                      style={{ backgroundColor: swatch.hex }}
                    />
                    <span className="text-stage-sm">{swatch.name}</span>
                  </li>
                ))}
              </ul>
            ) : null}

            {dresscode.avoid ? (
              <p className="mt-stage text-stage-xs italic">{dresscode.avoid}</p>
            ) : null}
          </div>
        </Layer>
      </Stage>
    </SectionWrapper>
  );
}
