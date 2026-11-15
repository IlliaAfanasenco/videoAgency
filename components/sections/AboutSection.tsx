import Image from "next/image";
import type { Messages } from "@/messages/de";
import type { Locale } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";

// Headline across the full width, then text and one real cinematic frame (no team imagery).
export function AboutSection({ t, locale }: { t: Messages; locale: Locale }) {
  return (
    <section
      id="about"
      className="mx-auto max-w-[1600px] px-6 py-20 sm:px-10 lg:px-20 lg:py-36"
    >
      <p
        data-reveal
        className="mb-6 text-[10px] uppercase tracking-[.23em] text-white/45"
      >
        {t.about.label}
      </p>
      <h2
        data-reveal
        className="whitespace-pre-line text-[clamp(2.3rem,6.2vw,6.4rem)] font-light leading-[1.04] tracking-[-.05em]"
      >
        {t.about.title}
      </h2>
      <div className="mt-12 grid gap-12 lg:mt-20 lg:grid-cols-[.8fr_1.2fr] lg:items-end lg:gap-24">
        <div>
          <p data-reveal className="text-lg font-light text-white/90">
            {t.about.slogan}
          </p>
          <div className="mt-8 max-w-md space-y-5 text-sm leading-7 text-white/60 lg:text-base lg:leading-8">
            {t.about.text.map((p) => (
              <p key={p} data-reveal>
                {p}
              </p>
            ))}
          </div>
          <div data-reveal className="mt-10">
            <Button href={`/${locale}/about`}>{t.about.action}</Button>
          </div>
        </div>
        <div
          data-reveal
          className="relative aspect-[4/3] overflow-hidden bg-[#111] lg:aspect-[16/10]"
        >
          <Image
            data-parallax
            src="/images/about/frame.jpg"
            alt=""
            fill
            sizes="(max-width: 1023px) 100vw, 60vw"
            className="scale-110 object-cover brightness-[.8]"
          />
        </div>
      </div>
    </section>
  );
}
