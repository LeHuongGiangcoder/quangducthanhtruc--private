import Image from "next/image";

import { Layer, Stage } from "@/components/ui/Stage";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ceremony, venue, weddingInfo } from "@/content/client";
import { element } from "@/lib/assets";

/** Đỉnh khía chữ V của nền nhung, tính theo đơn vị Stage — LoveStory nối tiếp từ đây. */
export const VELVET_TOP = 600;
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
        <Layer name="contour-lines" x={0} y={170} w={270} z={1} />
        <Layer name="florals-top" x={0} y={-6} w={270} z={2} parallax={8} />
        <Layer name="drape-left" x={0} y={470} w={110} z={2} />

        {/* Chữ trên tấm kem đi theo tông sáng: đỏ rượu trên nền kem */}
        <Layer x={40} y={182} w={190} z={3} reveal>
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
        <Layer name="bouquet-right" x={158} y={452} w={115} z={5} />
      </Stage>
    </SectionWrapper>
  );
}
