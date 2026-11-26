import { ButtonLink } from "@/components/ui/Button";
import { Title } from "@/components/ui/Heading";
import { Layer, Stage } from "@/components/ui/Stage";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { ceremony, venue, weddingInfo } from "@/content/client";

/**
 * Thời gian & Địa điểm, dàn theo mockup 1080 × 1920: nền lụa đỏ, tiêu đề
 * `<Title>` đồng bộ font/size/weight với toàn site, tấm thiệp nổi hoa văn
 * có dấu sáp (brand/elements/venue-card), và nút XEM BẢN ĐỒ thật phủ lên nút
 * vẽ trong ảnh. Bản chữ chi tiết cho trình đọc màn hình nằm trong khối sr-only.
 */
export function WeddingInfo() {
  return (
    <SectionWrapper section="weddingInfo" flush width="bleed" labelledBy="wedding-info-title">
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

        {/* Tiêu đề thật dùng chung <Title> đặt giữa khoảng lụa phía trên dấu sáp */}
        <Layer x={0} y={51} w={270} z={2} reveal>
          <div className="-translate-y-1/2 text-center">
            <Title id="wedding-info-title" className="whitespace-nowrap">
              {weddingInfo.title}
            </Title>
          </div>
        </Layer>

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
