"use client";

import { useExperience } from "@/components/experience/ExperienceProvider";
import { music } from "@/content/client";

/**
 * Nút bật/tắt nhạc, nổi ở góc dưới phải. Chỉ hiện sau khi thiệp đã mở và
 * file nhạc phát được; kê trên vạch home của iPhone bằng safe-area.
 */
export function MusicToggle() {
  const { opened, hasAudio, musicOn, toggleMusic } = useExperience();

  if (!opened || !hasAudio) return null;

  return (
    <button
      type="button"
      onClick={toggleMusic}
      aria-pressed={musicOn}
      aria-label={
        musicOn ? `Tắt nhạc: ${music.title}` : `Bật nhạc: ${music.title}`
      }
      className="fixed z-50 flex size-tap items-center justify-center rounded-btn border border-line bg-surface/85 text-ink shadow-paper backdrop-blur-sm"
      style={{
        right: "max(var(--t-space-gutter), env(safe-area-inset-right))",
        bottom: "calc(var(--t-space-stack) + env(safe-area-inset-bottom))",
      }}
    >
      {/* Nốt nhạc đôi; tắt nhạc thì có gạch chéo đè lên */}
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="size-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 18V5l11-2v13" />
        <circle cx="6.5" cy="18" r="2.5" fill="currentColor" />
        <circle cx="17.5" cy="16" r="2.5" fill="currentColor" />
        {musicOn ? null : <path d="M3 3l18 18" />}
      </svg>
    </button>
  );
}
