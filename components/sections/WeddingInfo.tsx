import { ButtonLink } from "@/components/ui/Button";
import { Layer, Stage } from "@/components/ui/Stage";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ceremony, venue, weddingInfo } from "@/content/client";

/**
 * Thời gian & Địa điểm, dàn theo mockup 1080 × 1920: nền lụa đỏ, chữ
 * "Thời gian & Địa điểm" vàng, tấm thiệp nổi hoa văn có dấu sáp, và nút
 * XEM BẢN ĐỒ. Cả trang là một ảnh vẽ sẵn (brand/elements/venue-card) —
 * bản chữ thật nằm trong khối sr-only cho trình đọc màn hình, còn nút bản đồ
 * là một <ButtonLink> thật phủ kín lên nút vẽ trong ảnh.
 */
export function WeddingInfo() {
  return (
    <SectionWrapper section="weddingInfo" flush width="bleed" labelledBy="wedding-info-title">
      <h2 id="wedding-info-title" className="sr-only">
        {weddingInfo.title}
      </h2>
      <div className="sr-only">
        <p>
          {weddingInfo.ceremonyLine} {ceremony.timeLabel}, {ceremony.weekday} {ceremony.dateShort} (
          {ceremony.lunar}).
        </p>
        <p>
          {weddingInfo.venueLabel}: {venue.name}, {venue.hall}, {venue.address}.
        </p>
      </div>

      <Stage width={270} height={480}>
        <Layer name="venue-card" x={0} y={0} w={270} />

        {/* Nút vẽ trong ảnh nằm ở 91–179 × 416–434 (đơn vị Stage). Nút thật
            (cùng kiểu, cùng cỡ với nút gửi RSVP) đặt giữa đúng chỗ đó và phủ
            kín nút vẽ, nên cả site chỉ có một kiểu nút. */}
        <Layer x={0} y={425} w={270} z={2}>
          <div className="flex -translate-y-1/2 justify-center">
            <ButtonLink
              variant="primary"
              href={venue.mapUrl}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${venue.mapLabel} — ${venue.name}`}
            >
              {venue.mapLabel}
            </ButtonLink>
          </div>
        </Layer>
      </Stage>
    </SectionWrapper>
  );
}
