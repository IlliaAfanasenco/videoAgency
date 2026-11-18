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
        className="container-x flex min-h-[max(640px,100svh)] flex-col justify-between gap-10 pb-[calc(5.25rem+env(safe-area-inset-bottom))] pt-28 sm:gap-16 sm:pb-28 will-change-transform sm:pt-32 lg:min-h-[max(800px,100svh)] lg:pb-32 lg:pt-36"
      >
        <p
          data-hero-copy
          className="text-[clamp(1.5rem,4.3vw,4.4rem)] font-light leading-[1.05] tracking-[-.05em]"
        >
          {t.hero.philosophy.map((line, i) => (
            <span
              key={line}
              className={`block ${i === 1 ? "text-white/50" : "text-white"}`}
            >
              {line}
            </span>
          ))}
        </p>
        <div className="grid items-end gap-x-12 gap-y-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] xl:grid-cols-[minmax(0,1fr)_26rem] xl:gap-x-16">
          <div>
            <p
              data-eyebrow
              className="mb-3 text-[9px] tracking-[.24em] text-white/55 sm:mb-5 sm:text-[10px]"
            >
              {t.hero.label}
            </p>
            <h1 className="text-[clamp(1.75rem,3.3vw,3rem)] font-light leading-[1.08] max-sm:text-[clamp(1.75rem,7vw,2.5rem)] tracking-[-.05em]">
              {t.hero.lines.map((line, i) => (
                <span key={line}>
                  {i > 0 && " "}
                  <span className="inline-block overflow-hidden align-top">
                    <span
                      data-title-line
                      className={`block pb-1 ${i === 2 ? "text-white/55" : ""}`}
                    >
                      {line}
                    </span>
                  </span>
                </span>
              ))}
            </h1>
          </div>
          <div className="lg:max-w-[460px] lg:justify-self-end">
            <p
              data-hero-copy
              className="mt-1 max-w-[460px] text-[13px] leading-[1.45] text-white/70 sm:mt-0 sm:text-sm sm:leading-6 lg:text-base"
            >
              {t.hero.description}
            </p>
            <ul
              data-hero-copy
              aria-label={t.hero.tags.join(", ")}
              className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[9px] uppercase tracking-[.2em] text-white/50 sm:mt-4 sm:gap-x-5 sm:text-[10px]"
            >
              {t.hero.tags.map((tag, i) => (
                <li key={tag} className="flex items-center gap-3 sm:gap-5">
                  {i > 0 && (
                    <span aria-hidden="true" className="h-px w-3 bg-gold/60" />
                  )}
                  {tag}
                </li>
              ))}
            </ul>
            <div
              data-hero-copy
              className="mt-3.5 flex items-center gap-2.5 max-sm:flex-nowrap sm:mt-5 sm:flex-wrap sm:gap-4 lg:mt-6"
            >
              <Button
                href="#contact"
                className="border-white bg-white text-black hover:bg-white/80 hover:text-black max-sm:h-11 max-sm:min-w-0 max-sm:gap-2 max-sm:whitespace-nowrap max-sm:px-3.5 max-sm:py-0 max-sm:text-[11px] min-[360px]:max-sm:gap-3 min-[360px]:max-sm:px-4 min-[360px]:max-sm:text-xs"
              >
                {t.request}
              </Button>
              <Button
                href="#projects"
                className="max-sm:h-11 max-sm:min-w-0 max-sm:gap-2 max-sm:whitespace-nowrap max-sm:px-3.5 max-sm:py-0 max-sm:text-[11px] min-[360px]:max-sm:gap-3 min-[360px]:max-sm:px-4 min-[360px]:max-sm:text-xs"
              >
                {t.hero.explore}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="container-x absolute inset-x-0 bottom-[calc(1.5rem+env(safe-area-inset-bottom))] sm:bottom-12 flex items-center justify-between text-[10px] tracking-[.2em] text-white/50">
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
