import Image from "next/image";

import { Layer, Stage } from "@/components/ui/Stage";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ceremony, venue, weddingInfo } from "@/content/client";
import { element } from "@/lib/assets";

/**
 * Mép trên nền nhung (hai góc của khía chữ V), theo đơn vị Stage — LoveStory
 * nối tiếp từ đây. Chọn để hai cạnh chữ V của nhung đè khít lên hai cạnh đáy
 * tấm kem và cái bướu tròn của nhung lấp vào vết khuyết ở đáy tấm kem; lệch
 * xuống là lộ một dải đỏ phẳng của nền section giữa kem và nhung.
 */
export const VELVET_TOP = 570;
export const INFO_HEIGHT = 720;

/**
 * Thiệp mời chính, dàn theo mockup: chùm hoa và tấm thoi đỏ ở trên, tấm kem
 * hình lục giác ở giữa mang ngày giờ + địa điểm, vân đường đồng mức hai bên,
 * tam giác đỏ sẫm và chùm hoa ở dưới, rồi nền nhung của Love Story cắt chữ V
 * lên đáy tấm kem.
 *
 * Nền nhung bắt đầu ở đây và chạy tiếp trong LoveStory (cùng toạ độ), nên
 * hai section nối liền nhau như một tấm.
 */
export function WeddingInfo() {
  const rings = element("rings");

  return (
    <SectionWrapper section="weddingInfo" flush width="bleed" labelledBy="wedding-info-title">
      <h2 id="wedding-info-title" className="sr-only">
        {weddingInfo.title}
      </h2>

      <Stage width={270} height={INFO_HEIGHT}>
        <Layer name="cream-panel" x={-30} y={40} w={330} z={1} />
        {/* Nhóm vân bên phải bị cắt theo một đường chéo 45° trong file — đặt
            để đường cắt nằm ngay dưới cạnh trái-dưới của tấm thoi, nét vân
            trông như luồn xuống dưới tấm thoi chứ không dừng lơ lửng. */}
        <Layer name="contour-lines" x={0} y={128} w={270} z={1} />
        {/* Tấm thoi đỏ như nắp phong bì: đỉnh nằm trọn trong khung, không chạm mép trên */}
        <Layer name="diamond-flap" x={127} y={8} w={143.3} z={2} />
        <Layer name="florals-left" x={-14} y={-6} w={88} z={2} parallax={8} />
        <Layer name="drape-left" x={0} y={470} w={110} z={2} />

        {/* Chữ trên tấm kem đi theo tông sáng: đỏ rượu trên nền kem. Đặt dưới
            đuôi chùm hoa trái và dưới cạnh tấm thoi để không lớp nào đè chữ. */}
        <Layer x={40} y={202} w={190} z={3} reveal>
          <div data-tone="light" className="flex flex-col items-center text-center font-display text-tone-fg">
            <p className="text-stage-md">
              {weddingInfo.ceremonyLine} {ceremony.timeLabel}
            </p>
            <p className="mt-stage text-stage-lg uppercase">{ceremony.weekday}</p>
            <p className="text-stage-2xl">{ceremony.dateShort}</p>
            <p className="mt-stage text-stage-xs italic">({ceremony.lunar})</p>

            {rings ? (
              <Image
                src={rings.src}
                alt=""
                width={rings.width ?? 500}
                height={rings.height ?? 413}
                unoptimized
                className="mt-stage-lg h-auto w-[22%]"
              />
            ) : null}

            <p className="mt-stage-lg text-stage-xs uppercase">{weddingInfo.venueLabel}</p>
            <p className="font-flourish text-stage-3xl">{venue.name}</p>
            <p className="mt-stage text-stage-sm">{venue.hall}</p>
            <p className="text-stage-sm">{venue.address}</p>

            <a
              href={venue.mapUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-ticket mt-stage-lg font-display text-stage-lg"
            >
              {venue.mapLabel}
            </a>
          </div>
        </Layer>

        <Layer name="velvet-long" x={0} y={VELVET_TOP} w={270} z={4} />
        <Layer name="bouquet-right" x={166} y={476} w={106} z={5} />
      </Stage>
    </SectionWrapper>
  );
}
