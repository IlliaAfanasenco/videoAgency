import type { Messages } from "@/messages/de";
import { Heading, SectionLabel } from "@/components/ui/SectionLabel";

// Sequence of four steps joined by a thin line: vertical on mobile/tablet, horizontal on desktop.
export function ProcessSection({ t }: { t: Messages }) {
  return (
    <section
      id="approach"
      className="mx-auto max-w-[1600px] px-6 py-16 sm:px-10 lg:px-20 lg:py-28"
    >
      <div data-reveal className="mb-10 lg:mb-16">
        <SectionLabel>{t.process.label}</SectionLabel>
        <Heading>{t.process.title}</Heading>
      </div>
      <ol className="ml-1 border-l border-white/20 lg:ml-0 lg:grid lg:grid-cols-4 lg:border-l-0 lg:border-t">
        {t.process.steps.map((s, i) => (
          <li
            key={s.title}
            data-reveal
            className="relative pb-9 pl-7 before:absolute before:-left-[3px] before:top-1.5 before:size-[5px] before:rounded-full before:bg-white last:pb-0 lg:pb-0 lg:pl-0 lg:pr-8 lg:pt-8 lg:before:-top-[3px] lg:before:left-0"
          >
            <span className="text-[10px] tracking-[.2em] text-white/40">
              0{i + 1}
            </span>
            <h3 className="mt-2 text-[clamp(1.8rem,3vw,3rem)] font-light uppercase tracking-[-.03em] lg:mt-5">
              {s.title}
            </h3>
            <p className="mt-3 max-w-xs text-sm leading-6 text-white/55">
              {s.text}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
