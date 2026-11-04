import type { Messages } from "@/messages/de";
import { Heading, SectionLabel } from "@/components/ui/SectionLabel";
export function ProcessSection({ t }: { t: Messages }) {
  return (
    <section className="mx-auto max-w-[1600px] px-6 py-24 sm:px-10 lg:px-20 lg:py-36">
      <div data-reveal className="mb-16 lg:mb-24">
        <SectionLabel>{t.process.label}</SectionLabel>
        <Heading>{t.process.title}</Heading>
      </div>
      <ol className="grid gap-px lg:grid-cols-3">
        {t.process.steps.map((s, i) => (
          <li
            key={s.title}
            data-reveal
            className="border-t border-white/15 py-8 lg:pr-12"
          >
            <span className="text-[10px] tracking-[.2em] text-white/40">
              0{i + 1}
            </span>
            <h3 className="mt-6 text-[clamp(2.2rem,4vw,4rem)] font-light tracking-[-.04em]">
              {s.title}
            </h3>
            <p className="mt-5 max-w-xs text-sm leading-6 text-white/55">
              {s.text}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
