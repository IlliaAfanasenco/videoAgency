import type { Messages } from "@/messages/de";
import type { Locale } from "@/lib/i18n";
import { getCases } from "@/data/cases";
import { Heading, SectionLabel } from "@/components/ui/SectionLabel";
import { CaseCard } from "@/components/work/CaseCard";
import { Button } from "@/components/ui/Button";

export function SelectedWorkSection({
  t,
  locale,
}: {
  t: Messages;
  locale: Locale;
}) {
  const cases = getCases();
  return (
    <section id="projects" className="container-x py-(--section-y)">
      <div data-reveal className="mb-14 lg:mb-20">
        <SectionLabel index={3}>{t.work.label}</SectionLabel>
        <Heading>{t.work.title}</Heading>
        <p className="mt-6 max-w-xl text-sm leading-7 text-white/60 sm:text-base sm:leading-8">
          {t.work.cases.intro}
        </p>
      </div>
      {cases.length > 0 ? (
        <div className="space-y-16 lg:space-y-24">
          {cases.map((item, i) => (
            <CaseCard
              key={item.slug}
              item={item}
              index={i}
              locale={locale}
              t={t}
            />
          ))}
        </div>
      ) : (
        <p className="border border-white/10 px-6 py-12 text-sm text-white/55 lg:py-16">
          {t.work.empty}
        </p>
      )}
      <p className="mt-12 text-[10px] uppercase tracking-[.18em] text-white/40">
        {t.work.cases.note}
      </p>
      <div className="mt-6">
        <Button href={`/${locale}/portfolio`}>{t.work.action}</Button>
      </div>
    </section>
  );
}
