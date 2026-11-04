import Image from "next/image";
import type { Messages } from "@/messages/de";
import { Heading, SectionLabel } from "@/components/ui/SectionLabel";
export function AboutSection({ t }: { t: Messages }) {
  return (
    <section
      id="about"
      className="mx-auto grid max-w-[1600px] gap-14 px-6 py-24 sm:px-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-24 lg:px-20 lg:py-40"
    >
      <div>
        <div data-reveal>
          <SectionLabel>{t.about.label}</SectionLabel>
          <Heading className="text-[clamp(2.4rem,4.6vw,4.6rem)]">
            {t.about.title}
          </Heading>
        </div>
        <div className="mt-10 max-w-md space-y-5 text-sm leading-7 text-white/60 lg:text-base lg:leading-8">
          {t.about.text.map((p) => (
            <p key={p} data-reveal>
              {p}
            </p>
          ))}
        </div>
      </div>
      <figure data-reveal className="relative">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#111] sm:aspect-[5/4] lg:aspect-[4/5]">
          {/* Placeholder until a real team / behind-the-scenes photo is supplied */}
          <Image
            data-parallax
            src="/images/fpv-coast.jpg"
            alt=""
            fill
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="scale-110 object-cover brightness-75"
          />
        </div>
        <figcaption className="mt-3 text-[9px] uppercase tracking-[.2em] text-white/35">
          {t.about.photo}
        </figcaption>
      </figure>
    </section>
  );
}
