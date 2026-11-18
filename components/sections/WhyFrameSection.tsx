import type { Messages } from "@/messages/de";
import { Heading, SectionLabel } from "@/components/ui/SectionLabel";

// Editorial layout: statement on the left (sticky on desktop), seven principles as a typographic list.
export function WhyFrameSection({ t }: { t: Messages }) {
  return (
    <section
      id="why"
      className="container-x grid gap-10 py-(--section-y) lg:grid-cols-[.85fr_1.15fr] lg:gap-24"
    >
      <div data-reveal className="lg:sticky lg:top-32 lg:self-start">
        <SectionLabel index={5}>{t.why.label}</SectionLabel>
        <Heading className="text-[clamp(2.2rem,4.2vw,4.2rem)]">
          {t.why.title}
        </Heading>
        <p className="mt-8 max-w-md text-base leading-8 text-white/65">
          {t.why.lead}
        </p>
      </div>
      <ul className="divide-y divide-white/12 border-y border-white/12">
        {t.why.items.map((item, i) => (
          <li
            key={item.title}
            data-reveal
            className="grid gap-x-8 gap-y-2 py-5 sm:grid-cols-[1fr_1fr] sm:items-baseline lg:py-6"
          >
            <h3 className="flex items-baseline gap-4 text-[clamp(1.2rem,1.7vw,1.7rem)] font-light tracking-[-.02em]">
              <span className="text-[10px] tracking-[.2em] text-white/40">
                0{i + 1}
              </span>
              {item.title}
            </h3>
            <p className="pl-9 text-sm leading-6 text-white/55 sm:pl-0">
              {item.text}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
