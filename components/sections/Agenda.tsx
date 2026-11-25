import { Heading, Lead, SectionHead, Title } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { agenda } from "@/content/client";

/**
 * Chương trình — trình tự buổi lễ, rồi ghi chú trang phục ở cuối: giờ bên trái, một viên thoi trên trục dọc, nội dung bên
 * phải. Trục kẻ bằng border của phần tử giữa nên nó tự dài đúng bằng hàng,
 * không cần đo chiều cao bằng JS.
 *
 * Mỗi mốc gắn `data-light`: chưa cuộn tới thì nhạt, cuộn tới thì giờ và viên
 * thoi sáng lên (Motion.tsx + `[data-light]` trong globals.css).
 */
export function Agenda() {
  return (
    <SectionWrapper section="agenda" labelledBy="agenda-title">
      <SectionHead title={agenda.title} titleId="agenda-title" />

      {/* Cả cụm timeline căn giữa trang: ol co theo nội dung rồi mx-auto */}
      <ol className="mx-auto flex w-fit max-w-full flex-col">
        {agenda.items.map((item, i) => {
          const first = i === 0;
          const last = i === agenda.items.length - 1;
          return (
            <Reveal
              as="li"
              key={`${item.time}-${item.title}`}
              delay={i * 80}
              light
              className="grid grid-cols-[4.5rem_1.5rem_auto] items-start gap-x-stack sm:grid-cols-[6rem_1.5rem_auto]"
            >
              <p className="light-key pt-1 text-right font-display text-h4">
                {item.time}
              </p>

              {/* Trục dọc liền một mạch: mỗi hàng kẻ một đoạn phía trên viên thoi
                (trừ hàng đầu) và một đoạn kéo tới đáy hàng (trừ hàng cuối), nên
                các đoạn chạm nhau và chạm viên thoi, không đứt quãng. */}
              <div
                aria-hidden
                className="flex flex-col items-center self-stretch"
              >
                <span
                  className={`h-2 w-px shrink-0 ${first ? "" : "bg-tone-line"}`}
                />
                <span className="light-dot size-2 shrink-0 rotate-45" />
                {last ? null : <span className="w-px flex-1 bg-tone-line" />}
              </div>

              {/* Hàng cuối không chừa đáy — trước đây `last:pb-0` luôn khớp (div này là con
                cuối của <li>) nên không hàng nào có khoảng đáy và các hàng dính nhau */}
              <div
                className={`flex flex-col gap-tight ${last ? "" : "pb-block"}`}
              >
                <Heading level="h4" className="light-title">
                  {item.title}
                </Heading>
                {item.note ? (
                  <p className="text-small text-tone-muted">{item.note}</p>
                ) : null}
              </div>
            </Reveal>
          );
        })}
      </ol>

      {/* Trang phục đi cùng section Chương trình, như trên thiệp giấy */}
      <Reveal className="mt-block flex flex-col items-center gap-tight text-center">
        <Title as="h3">{agenda.dresscode.title}</Title>
        <p className="text-lead">{agenda.dresscode.headline}</p>
        <Lead>{agenda.dresscode.note}</Lead>
      </Reveal>
    </SectionWrapper>
  );
}
