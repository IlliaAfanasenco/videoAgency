import type { Messages } from "@/messages/de";
import { Heading, SectionLabel } from "@/components/ui/SectionLabel";
import { ProcessScene } from "@/components/sections/ProcessScene";
import { ProcessAnimation } from "@/components/sections/ProcessAnimation";

/* eslint-disable @next/next/no-img-element */
const Drone = ({ className }: { className: string }) => (
  <img
    src="/images/dji-matrice.webp"
    alt=""
    aria-hidden="true"
    width={1200}
    height={1200}
    draggable={false}
    className={className}
  />
);

function Head({ t }: { t: Messages }) {
  return (
    <>
      <SectionLabel index={4}>{t.process.label}</SectionLabel>
      <Heading>{t.process.title}</Heading>
    </>
  );
}

// Cinematic journey. Desktop (>=1024, motion allowed): one pinned stage, four scenes driven by scroll,
// horizontal gold progress line with a drone riding it. Otherwise: vertical rail, one card per step.
// Both layouts are driven by ProcessAnimation (single GSAP matchMedia); this file is markup only.
export function ProcessSection({ t }: { t: Messages }) {
  const steps = t.process.steps;
  return (
    <section
      id="approach"
      className="container-x py-(--section-y) journey:py-0"
    >
      <ProcessAnimation />

      {/* ---------- Desktop: pinned scroll story ---------- */}
      <div
        data-pj-panel
        className="hidden h-svh min-h-[620px] flex-col pb-10 pt-24 journey:flex"
      >
        <div data-reveal className="mb-5 shrink-0">
          <div data-pj-head>
            <Head t={t} />
          </div>
        </div>
        <div
          data-pj-stage
          className="relative min-h-0 flex-1 overflow-hidden rounded-2xl bg-[#0a0a0a] ring-1 ring-white/10"
        >
          {steps.map((s, i) => (
            <ProcessScene key={s.title} index={i} variant="desktop" />
          ))}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgb(0_0_0/.45))]" />
          <span
            data-pj-counter
            aria-hidden="true"
            className="absolute right-5 top-4 z-10 text-[11px] tabular-nums tracking-[.25em] text-white/70"
          >
            01 / 04
          </span>
        </div>
        <div className="mt-10 shrink-0">
          <div data-pj-rail className="relative h-px bg-white/15">
            <div
              data-pj-fill
              className="absolute inset-0 origin-left bg-gold"
              style={{ transform: "scaleX(0)" }}
            />
            {steps.map((s, i) => (
              <span
                key={s.title}
                data-pj-node
                className="absolute top-1/2 size-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/35"
                style={{ left: `${i * 25}%` }}
              />
            ))}
            <div
              data-pj-drone
              className="pointer-events-none absolute bottom-[7px] left-0 size-11 -translate-x-1/2"
            >
              <Drone className="size-full select-none opacity-90 drop-shadow-[0_6px_10px_rgb(0_0_0/.6)]" />
              <span className="absolute left-1/2 top-full h-1 w-px bg-gold/70" />
            </div>
          </div>
          <ol className="grid grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} data-pj-step className="pr-8 pt-6">
                <span
                  data-pj-num
                  className="text-[10px] tracking-[.2em] text-white/40 transition-colors duration-500"
                >
                  0{i + 1}
                </span>
                <h3 className="mt-2 text-[clamp(1.5rem,2.4vw,2.6rem)] font-light uppercase leading-none tracking-[-.03em]">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-xs text-[13px] leading-5 text-white/55">
                  {s.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* ---------- Mobile / tablet / reduced motion: vertical rail ---------- */}
      <div className="journey:hidden">
        <div data-reveal className="mb-10">
          <Head t={t} />
        </div>
        <ol
          data-pj-list
          className="relative ml-1 space-y-12 pl-7 md:space-y-14"
        >
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-0 top-0 w-px bg-white/15"
          />
          <span
            data-pj-mfill
            aria-hidden="true"
            className="absolute bottom-0 left-0 top-0 w-px origin-top bg-gold"
            style={{ transform: "scaleY(0)" }}
          />
          <div
            data-pj-mdrone
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-10 size-7 -translate-x-1/2 -translate-y-1/2"
          >
            <Drone className="size-full select-none opacity-90 drop-shadow-[0_3px_6px_rgb(0_0_0/.6)]" />
          </div>
          {steps.map((s, i) => (
            <li
              key={s.title}
              data-pj-card
              className="relative md:grid md:grid-cols-[1.15fr_1fr] md:items-center md:gap-8"
            >
              <span
                data-pj-node
                className="absolute -left-[31px] top-2 size-[7px] rounded-full bg-white/35"
              />
              <div
                data-pj-media
                className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#0a0a0a] ring-1 ring-white/10"
              >
                <ProcessScene index={i} variant="mobile" />
              </div>
              <div data-pj-step className="mt-5 md:mt-0">
                <span
                  data-pj-num
                  className="block text-[10px] tracking-[.2em] text-white/40 transition-colors duration-500"
                >
                  0{i + 1}
                </span>
                <h3 className="mt-2 text-[clamp(1.8rem,7vw,2.6rem)] font-light uppercase leading-none tracking-[-.03em]">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-xs text-sm leading-6 text-white/55">
                  {s.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
