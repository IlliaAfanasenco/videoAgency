import type { Messages } from "@/messages/de";
import { Button } from "@/components/ui/Button";
import { HeroVideo } from "@/components/ui/HeroVideo";
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
              x="-30"
              y="-30"
              width="60"
              height="60"
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
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Button
              href="#contact"
              className="border-white bg-white text-black hover:bg-white/80 hover:text-black"
            >
              {t.request}
            </Button>
            <Button href="#projects">{t.hero.explore}</Button>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-6 bottom-12 flex items-center justify-between text-[10px] tracking-[.2em] text-white/50 sm:inset-x-10 lg:inset-x-20">
        <span />
        <a
          href="#about"
          className="flex items-center gap-4 text-[9px] uppercase"
        >
          Scroll <span className="text-xl">↓</span>
        </a>
      </div>
    </section>
  );
}
