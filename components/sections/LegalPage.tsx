import type { Messages } from "@/messages/de";
import type { Locale } from "@/lib/i18n";
import { Heading } from "@/components/ui/SectionLabel";

/** Development placeholder: structure only. No legal data is invented here. */
export function LegalPage({
  t,
  locale,
  doc,
}: {
  t: Messages;
  locale: Locale;
  doc: { title: string; sections: string[] };
}) {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="container-x pb-24 pt-36 lg:pt-44"
    >
      <div className="mx-auto max-w-[900px]">
        <p className="mb-6 inline-block border border-amber-200/50 px-3 py-1.5 text-[10px] tracking-[.18em] text-amber-100/90">
          {t.legal.badge}
        </p>
        <Heading className="text-[clamp(2.2rem,5vw,4.5rem)]">
          {doc.title}
        </Heading>
        <p className="mt-6 max-w-xl text-sm leading-7 text-white/60">
          {t.legal.note}
        </p>
        <div className="mt-12 divide-y divide-white/12 border-y border-white/12">
          {doc.sections.map((s) => (
            <section key={s} className="py-6">
              <h2 className="text-lg font-light">{s}</h2>
              <p className="mt-2 text-sm text-white/45">{t.legal.pending}</p>
            </section>
          ))}
        </div>
        <a
          href={`/${locale}`}
          className="mt-10 inline-flex min-h-11 items-center text-sm text-white/70 hover:text-white"
        >
          ← {t.legal.back}
        </a>
      </div>
    </main>
  );
}
