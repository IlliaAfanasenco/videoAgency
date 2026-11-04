import type { Messages } from "@/messages/de";
import { Button } from "@/components/ui/Button";
import { Showreel } from "@/components/ui/Showreel";
import { HeroVideo } from "@/components/ui/HeroVideo";
import { HeroDebug } from "@/components/ui/HeroDebug";
export function Hero({ t }: { t: Messages }) {
  return (
    <section
      id="top"
      className="relative isolate min-h-[max(640px,100svh)] overflow-hidden bg-[#050505] lg:min-h-[max(800px,100svh)]"
    >
      {/* Outer clip sits 2px above the section's bottom edge, so the scaled video can never
          bleed through the anti-aliased last pixel row (the former "thin lines" seam). */}
      <div className="absolute inset-x-0 top-0 bottom-[2px] -z-30 overflow-hidden">
        <div data-hero-media className="absolute inset-0 will-change-transform">
          <HeroVideo />
        </div>
      </div>
      <div className="absolute inset-0 -z-20 bg-linear-to-r from-[#050505]/90 via-[#050505]/30 to-transparent" />
      <div className="absolute inset-0 -z-20 bg-linear-to-t from-[#050505] via-transparent to-black/20" />
      <div className="absolute inset-x-0 top-0 -z-20 h-40 bg-linear-to-b from-black/55 to-transparent" />
      <svg
        data-hero-svg="desktop"
        aria-hidden="true"
        viewBox="0 0 1440 900"
        className="pointer-events-none absolute inset-0 -z-10 hidden h-full w-full lg:block"
      >
        <path
          data-route
          d="M470 265C540 135 811 180 1015 247C1080 290 1110 350 1160 400C1330 601 1190 664 1100 647S1090 690 1380 738"
          pathLength={1}
          fill="none"
          stroke="white"
          strokeOpacity=".4"
          strokeWidth=".8"
        />
        <g data-drone transform="translate(470 265)">
          <g data-drone-spin>
            <image
              href="/images/dji-matrice.webp"
              x="-84"
              y="-84"
              width="168"
              height="168"
              preserveAspectRatio="xMidYMid meet"
            />
          </g>
        </g>
      </svg>
      {/* Mobile route: its own continuous path for the 9:16 frame, sweeping across the top,
          down the right side and curling toward the bottom. Drone image is 160 units (rotor-tip radius ~88), so the
          path keeps >=95 units from the side edges to leave room for the full rotation radius. */}
      <svg
        data-hero-svg="mobile"
        aria-hidden="true"
        viewBox="0 0 390 844"
        preserveAspectRatio="xMidYMid meet"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full lg:hidden"
      >
        <path
          data-route
          d="M110 165C165 130 262 145 288 235C312 320 262 380 240 450C218 520 150 560 165 620C178 660 245 672 280 662"
          pathLength={1}
          fill="none"
          stroke="white"
          strokeOpacity=".45"
          strokeWidth="1"
        />
        <g data-drone transform="translate(110 165)">
          <g data-drone-spin>
            <image
              href="/images/dji-matrice.webp"
              x="-80"
              y="-80"
              width="160"
              height="160"
              preserveAspectRatio="xMidYMid meet"
            />
          </g>
        </g>
      </svg>
      <div
        data-hero-content
        className="mx-auto flex min-h-[max(640px,100svh)] max-w-[1600px] items-center px-6 pb-28 pt-40 sm:px-10 lg:min-h-[max(800px,100svh)] lg:px-20 will-change-transform"
      >
        <div className="max-w-[780px]">
          <p
            data-eyebrow
            className="mb-7 text-[9px] tracking-[.24em] text-white/55 sm:text-[10px]"
          >
            {t.hero.label}
          </p>
          <h1 className="text-[clamp(2.9rem,6.1vw,6.6rem)] font-light leading-[1.02] tracking-[-.052em]">
            {t.hero.lines.map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <span
                  data-title-line
                  className={`block pb-1 ${i === 2 ? "text-white/55" : ""}`}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <p
            data-hero-copy
            className="mt-6 max-w-[425px] text-sm leading-6 text-white/70 lg:text-base"
          >
            {t.hero.description}
          </p>
          <div
            data-hero-copy
            className="mt-8 flex flex-wrap items-center gap-6"
          >
            <Button href="#contact">{t.request}</Button>
            <Showreel t={t} />
          </div>
        </div>
      </div>
      <p
        data-hero-fade
        className="absolute right-16 top-[58%] hidden w-28 text-right text-xs leading-6 tracking-[.25em] text-white/55 xl:block"
      >
        {t.hero.aside}
      </p>
      <div className="absolute inset-x-6 bottom-12 flex items-center justify-between text-[10px] tracking-[.2em] text-white/50 sm:inset-x-10 lg:inset-x-20">
        <span className="flex items-center gap-5">
          <span className="text-white">
            01 <span className="text-white/35">/ 05</span>
          </span>
          <span className="h-px w-32 bg-white/20">
            <span className="block h-px w-8 bg-white/80" />
          </span>
        </span>
        <a
          href="#about"
          className="flex items-center gap-4 text-[9px] uppercase"
        >
          Scroll <span className="text-xl">↓</span>
        </a>
      </div>
      <HeroDebug />
    </section>
  );
}
