import { LoopVideo } from "@/components/ui/LoopVideo";

type Variant = "desktop" | "mobile";

const IMG = "absolute inset-0 size-full object-cover will-change-transform";

// One visual per step, built only from the agency's own footage (posters / loops already in /public).
// Static default = the finished frame, so reduced-motion and no-JS show a complete composition.
// ProcessAnimation scrubs the inner [data-s-*] layers; this file holds no animation logic.
export function ProcessScene({
  index,
  variant,
}: {
  index: number;
  variant: Variant;
}) {
  const desktop = variant === "desktop";
  // On desktop all four scenes are stacked and the script reveals them; hide 2-4 until it runs.
  const base = `absolute inset-0 overflow-hidden bg-[#0a0a0a] ${desktop && index > 0 ? "invisible" : ""}`;
  /* eslint-disable @next/next/no-img-element */
  switch (index) {
    case 0:
      // DISCOVER: aerial location scouting with a reticle + scan sweep.
      return (
        <div data-scene={0} aria-hidden="true" className={base}>
          <img
            data-s-img
            src="/videos/service-drone-poster.jpg"
            alt=""
            draggable={false}
            className={IMG}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-black/25" />
          <div data-s-grid className="absolute inset-0">
            <span className="absolute inset-y-0 left-1/3 w-px bg-white/20" />
            <span className="absolute inset-y-0 left-2/3 w-px bg-white/20" />
            <span className="absolute inset-x-0 top-1/3 h-px bg-white/20" />
            <span className="absolute inset-x-0 top-2/3 h-px bg-white/20" />
          </div>
          <div
            data-s-scan
            className="absolute inset-0 border-b border-gold/70 bg-linear-to-b from-transparent to-gold/10 opacity-0"
          />
          <div className="absolute inset-0 grid place-items-center">
            <div
              data-s-reticle
              className="relative aspect-square w-[22%] min-w-14 max-w-40 rounded-full border border-gold/80"
            >
              <span className="absolute left-1/2 top-[-12%] h-[24%] w-px bg-gold/80" />
              <span className="absolute bottom-[-12%] left-1/2 h-[24%] w-px bg-gold/80" />
              <span className="absolute left-[-12%] top-1/2 h-px w-[24%] bg-gold/80" />
              <span className="absolute right-[-12%] top-1/2 h-px w-[24%] bg-gold/80" />
              <span className="absolute left-1/2 top-1/2 size-1 -translate-1/2 rounded-full bg-gold" />
            </div>
          </div>
        </div>
      );
    case 1: {
      // CREATE: storyboard built from three real frames, filling in one after another.
      const frames = desktop
        ? [
            "/images/services/commercial.jpg",
            "/videos/service-weddings-poster.jpg",
            "/images/fpv-coast.jpg",
          ]
        : [
            "/videos/service-commercial-poster.jpg",
            "/videos/service-weddings-poster.jpg",
            "/images/fpv-coast.jpg",
          ];
      return (
        <div data-scene={1} aria-hidden="true" className={base}>
          <div className="absolute inset-0 grid place-items-center p-[4%]">
            <div className="w-full">
              <div className="grid grid-cols-3 gap-[3%]">
                {frames.map((src, n) => (
                  <div
                    key={src}
                    data-panel
                    className={`relative overflow-hidden ring-1 ring-gold/45 ${desktop ? "aspect-[16/10]" : "aspect-[3/4] md:aspect-[4/5]"}`}
                  >
                    <div className="absolute inset-0 overflow-hidden">
                      <img
                        data-panel-img
                        src={src}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        className={IMG}
                      />
                    </div>
                    <div
                      data-panel-shade
                      className="absolute inset-0 bg-[#0a0a0a] opacity-0"
                    />
                    <span className="absolute left-2 top-1.5 text-[9px] tracking-[.2em] text-gold sm:text-[10px]">
                      0{n + 1}
                    </span>
                  </div>
                ))}
              </div>
              <div className="relative mt-[4%] h-3">
                <span
                  data-sb-line
                  className="absolute inset-x-0 top-1/2 h-px origin-left bg-gold/50"
                />
                <span className="absolute inset-x-0 top-1/2 h-1.5 -translate-y-1/2 bg-[repeating-linear-gradient(90deg,rgb(201_169_110/.5)_0_1px,transparent_1px_8%)]" />
              </div>
            </div>
          </div>
        </div>
      );
    }
    case 2:
      // PRODUCE: real clip inside a camera viewfinder (REC, timecode, focus box).
      return (
        <div data-scene={2} aria-hidden="true" className={base}>
          <div data-s-media className="absolute inset-0">
            <LoopVideo
              src={
                desktop
                  ? "/videos/about-car-desktop.mp4"
                  : "/videos/about-car-mobile.mp4"
              }
              poster={
                desktop
                  ? "/videos/about-car-desktop-poster.jpg"
                  : "/videos/about-car-mobile-poster.jpg"
              }
              className="absolute inset-0 size-full object-cover"
            />
          </div>
          <div data-s-vf className="absolute inset-[4%]">
            <span className="absolute left-0 top-0 size-4 border-l border-t border-gold sm:size-6" />
            <span className="absolute right-0 top-0 size-4 border-r border-t border-gold sm:size-6" />
            <span className="absolute bottom-0 left-0 size-4 border-b border-l border-gold sm:size-6" />
            <span className="absolute bottom-0 right-0 size-4 border-b border-r border-gold sm:size-6" />
          </div>
          <div
            data-s-rec
            className="absolute left-[8%] top-[9%] flex items-center gap-2 text-[9px] tabular-nums tracking-[.2em] text-white sm:text-[11px]"
          >
            <span className="size-1.5 animate-pulse rounded-full bg-red-500 sm:size-2" />
            <span data-tc>00:00:08:12</span>
          </div>
          <div className="absolute inset-0 grid place-items-center">
            <div
              data-s-focus
              className="aspect-square w-[14%] min-w-10 max-w-28 border border-gold/80"
            />
          </div>
        </div>
      );
    default:
      // DELIVER: graded final frame, letterbox bars, brand mark.
      return (
        <div data-scene={3} aria-hidden="true" className={base}>
          <img
            data-s-img
            src="/videos/showreel-desktop-poster.jpg"
            alt=""
            loading="lazy"
            decoding="async"
            draggable={false}
            className={`${IMG} object-[50%_30%]`}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-black/10" />
          <div
            data-s-grade
            className="absolute inset-0 bg-black/60 opacity-0"
          />
          <div
            data-s-frame
            className="absolute inset-x-[3%] bottom-[15%] top-[15%] border border-gold/50"
          />
          <div
            data-bar-top
            className="absolute inset-x-0 top-0 h-[12%] bg-black"
          />
          <div
            data-bar-bot
            className="absolute inset-x-0 bottom-0 flex h-[12%] items-center justify-between bg-black px-[4%] text-[8px] tracking-[.3em] text-gold sm:text-[10px]"
          >
            <span className="tabular-nums text-white/50">2.39:1</span>
            <span data-mark>FRAME NO. 9</span>
          </div>
          <div data-s-flash className="absolute inset-0 bg-white opacity-0" />
        </div>
      );
  }
  /* eslint-enable @next/next/no-img-element */
}
