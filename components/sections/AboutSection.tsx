import type { Messages } from "@/messages/de";
import type { Locale } from "@/lib/i18n";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { ShowcaseVideo } from "@/components/ui/ShowcaseVideo";

// Cinematic showcase: short headline, a 16:9 film frame that opens up to full width on desktop
// (scroll-scrubbed, no pin), then one closing line + CTA. Mobile: plain wide frame, no animation.
export function AboutSection({ t, locale }: { t: Messages; locale: Locale }) {
  return (
    <section id="about" className="overflow-x-clip pt-(--section-y)">
      <div className="container-x">
        <div data-reveal>
          <SectionLabel index={1}>{t.about.label}</SectionLabel>
        </div>
        <h2
          data-reveal
          className="text-[clamp(2.4rem,8vw,7.5rem)] font-light leading-[1] tracking-[-.055em]"
        >
          {t.about.title}
        </h2>
      </div>

      <div data-showcase className="relative mt-8 lg:mt-14">
        <div
          data-showcase-frame
          className="relative aspect-video w-full overflow-hidden bg-[#0b0b0b]"
        >
          <ShowcaseVideo />
        </div>
        <p
          data-showcase-phrase
          className="container-x pt-5 text-sm tracking-[.02em] text-white/70 lg:absolute lg:inset-x-0 lg:bottom-8 lg:pt-0 lg:text-xl lg:text-white lg:[text-shadow:0_1px_18px_rgba(0,0,0,.55)]"
        >
          {t.about.phrase}
        </p>
      </div>

      <div className="container-x py-(--section-y)">
        <div data-reveal className="max-w-3xl">
          <h3 className="text-[clamp(1.9rem,4.4vw,4rem)] font-light leading-[1.05] tracking-[-.045em]">
            {t.about.closingTitle}
          </h3>
          <p className="mt-4 text-base text-white/65 lg:text-lg">
            {t.about.closingText}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
            <Button href={`/${locale}/portfolio`} className="sm:w-auto">
              {t.about.action}
            </Button>
            <a
              href={`/${locale}#contact`}
              className="inline-flex min-h-11 items-center justify-center text-sm text-white/65 underline-offset-4 transition hover:text-white hover:underline"
            >
              {t.request}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
