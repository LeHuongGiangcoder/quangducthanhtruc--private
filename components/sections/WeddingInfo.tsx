import Image from "next/image";

import { Layer, Stage } from "@/components/ui/Stage";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ceremony, venue, weddingInfo } from "@/content/client";
import { element } from "@/lib/assets";

/**
 * Mép trên nền nhung (hai góc của khía chữ V), theo đơn vị Stage — LoveStory
 * nối tiếp từ đây. Chọn để cái bướu tròn của nhung lấp vào vết khuyết ở đáy
 * tấm kem; tấm kem nằm trên nhung nên hai cạnh chữ V của nhung khuất dưới mép kem.
 */
export const VELVET_TOP = 459;
export const INFO_HEIGHT = 609;

/**
 * Hai lớp vắt qua đường nối sang Love Story, như ảnh mockup: tấm thoi đỏ bên
 * trái và chùm hoa bên phải chạy xuống quá đáy section. Stage cắt gọn ở mép
 * mình, nên LoveStory vẽ lại đúng hai lớp này lệch lên `INFO_HEIGHT` — phần
 * thừa hiện tiếp ở section dưới, liền một mảnh.
 */
export const SPILL_LAYERS = [
  { name: "drape-left", x: 0, y: 396, w: 135 },
  { name: "bouquet-right", x: 160, y: 403, w: 115 },
] as const;
const [drape, bouquet] = SPILL_LAYERS;

/**
 * Thiệp mời chính, dàn theo mockup: chùm hoa và tấm thoi đỏ ở trên, tấm kem
 * hình lục giác ở giữa mang ngày giờ + địa điểm, vân đường đồng mức hai bên,
 * tam giác đỏ sẫm và chùm hoa ở dưới, rồi nền nhung của Love Story cắt chữ V
 * lên đáy tấm kem.
 *
 * Thứ tự chồng lớp, từ dưới lên: nhung, hai chùm hoa và tấm thoi đỏ (đều nấp
 * sau mép tấm kem — chỉ lộ phần nằm ngoài kem) → tấm kem → vân → tam giác đỏ
 * sẫm bên trái (đè cả kem lẫn nhung) → chữ.
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
        <Layer name="velvet-long" x={0} y={VELVET_TOP} w={270} z={1} />
        <Layer {...bouquet} z={2} />
        {/* Tấm thoi đỏ và chùm hoa trái nằm sau tấm kem: mép vai trên của kem
            cắt ngang chúng, như mockup */}
        <Layer name="diamond-flap" x={127} y={25.5} w={143.3} z={2} />
        <Layer name="florals-left" x={-6} y={20} w={120} z={2} parallax={8} />
        {/* Bản rút ngắn của tấm kem: bớt một đoạn thân thẳng để vai trên hạ
            xuống sát dòng chữ đầu còn đáy chữ V nằm ngay dưới nút bản đồ */}
        <Layer name="cream-panel-short" x={-30} y={90} w={330} z={3} />
        {/* Vân đã cắt sẵn theo hình tấm kem (nét chạy tới mép giấy là hết, không
            tràn ra ngoài). Đường cắt chéo 45° sẵn có của nhóm bên phải trùng
            với vai phải của tấm kem. */}
        <Layer name="contour-on-panel" x={0} y={91} w={270} z={4} />
        <Layer {...drape} z={5} />

        {/* Chữ trên tấm kem đi theo tông sáng: đỏ rượu trên nền kem. Đặt dưới
            đuôi chùm hoa trái và dưới cạnh tấm thoi để không lớp nào đè chữ. */}
        <Layer x={40} y={202} w={190} z={6} reveal>
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

      </Stage>
    </SectionWrapper>
  );
}
