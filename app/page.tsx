import { ExperienceProvider } from "@/components/experience/ExperienceProvider";
import { GuestProvider } from "@/components/experience/GuestProvider";
import { Agenda } from "@/components/sections/Agenda";
import { Dresscode } from "@/components/sections/Dresscode";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { LoveStory } from "@/components/sections/LoveStory";
import { Rsvp } from "@/components/sections/Rsvp";
import { ThankYou, ThankYouGrid } from "@/components/sections/ThankYou";
import { WeddingInfo } from "@/components/sections/WeddingInfo";
import { Motion } from "@/components/ui/Motion";
import { MusicToggle } from "@/components/ui/MusicToggle";
import { sections, type SectionId } from "@/content/client";

/**
 * Mỗi section một entry. Thêm section mới thì khai tên trong `SectionId`
 * (content/client.ts) rồi thêm một dòng ở đây — không sửa gì khác.
 */
const SECTIONS: Record<SectionId, () => React.ReactNode> = {
  intro: Intro,
  hero: Hero,
  loveStory: LoveStory,
  gallery: Gallery,
  weddingInfo: WeddingInfo,
  agenda: Agenda,
  dresscode: Dresscode,
  rsvp: Rsvp,
  thankYou: ThankYou,
  thankYouGrid: ThankYouGrid,
};

/** Màn mở thiệp phủ kín màn hình nên nó đứng ngoài <main>. */
const OVERLAYS: SectionId[] = ["intro"];

export default function Page() {
  const gated = sections.includes("intro");
  const overlays = sections.filter((id) => OVERLAYS.includes(id));
  const flow = sections.filter((id) => !OVERLAYS.includes(id));

  return (
    <GuestProvider>
      <ExperienceProvider gated={gated}>
        {/* Toàn bộ chuyển động của trang nằm ở đây, section không tự gọi GSAP */}
        <Motion />

        {overlays.map((id) => {
          const Section = SECTIONS[id];
          return <Section key={id} />;
        })}

        {/* Cột trang: thiệp dựng cho điện thoại, trên màn rộng đứng giữa nền đỏ rượu */}
        <main className="page-column">
          {/* Thứ tự render đúng theo mảng `sections` trong content/client.ts */}
          {flow.map((id) => {
            const Section = SECTIONS[id];
            return <Section key={id} />;
          })}
        </main>

        <MusicToggle />
      </ExperienceProvider>
    </GuestProvider>
  );
}
