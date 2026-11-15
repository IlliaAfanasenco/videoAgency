import type { Messages } from "@/messages/de";
import { SectionLabel } from "@/components/ui/SectionLabel";

// Pure typography on purpose: no frame animation (explicit client request).
export function PhilosophySection({ t }: { t: Messages }) {
  return (
    <section
      id="philosophy"
      className="mx-auto max-w-[1600px] px-6 py-24 sm:px-10 lg:px-20 lg:py-44"
    >
      <div data-reveal>
        <SectionLabel>{t.philosophy.label}</SectionLabel>
        <p className="text-[clamp(2.2rem,6.4vw,6.6rem)] font-light leading-[1.04] tracking-[-.05em]">
          {t.philosophy.lines.map((line, i) => (
            <span
              key={line}
              className={`block ${i === 1 ? "text-white/50" : ""}`}
            >
              {line}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
