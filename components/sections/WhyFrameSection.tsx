import type { Messages } from "@/messages/de";
import { Heading, SectionLabel } from "@/components/ui/SectionLabel";
import { WhyFocus } from "@/components/sections/WhyFocus";

// Cinematic Focus: sticky statement on the left, seven principles on the right. WhyFocus (client)
// tracks which row crosses the middle of the viewport and "focuses" it like a camera frame.
export function WhyFrameSection({ t }: { t: Messages }) {
  const total = t.why.items.length;
  return (
    <section id="why" className="container-x relative py-(--section-y)">
      <WhyFocus
        items={t.why.items}
        closing={t.why.closing}
        action={t.request}
        head={
          <>
            <div data-reveal>
              <SectionLabel index={5}>{t.why.label}</SectionLabel>
              <Heading className="text-[clamp(2.2rem,4.2vw,4.2rem)]">
                {t.why.title}
              </Heading>
              <p className="mt-6 max-w-md text-base leading-8 text-white/65 lg:mt-8">
                {t.why.lead}
              </p>
            </div>
          </>
        }
        total={total}
      />
    </section>
  );
}
