import Image from "next/image";
import Link from "next/link";
import type { Messages } from "@/messages/de";
import type { Locale } from "@/lib/i18n";
import { formatPrice, type CaseStudy } from "@/data/cases";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";

const Fact = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div>
    <dt className="text-[10px] uppercase tracking-[.2em] text-white/45">
      {label}
    </dt>
    <dd className="mt-2 text-sm leading-6 text-white/85">{children}</dd>
  </div>
);

/** Case detail template. Renders any CaseStudy, so real content needs no layout changes. */
export function CaseDetail({
  item,
  next,
  locale,
  t,
}: {
  item: CaseStudy;
  next?: CaseStudy;
  locale: Locale;
  t: Messages;
}) {
  const d = t.work.cases.detail;
  const [min, max] = item.priceRange;
  return (
    <main
      id="main-content"
      tabIndex={-1}
      data-mock-case={item.mock ? "" : undefined}
    >
      {/* Hero */}
      <section className="relative flex min-h-[78svh] items-end overflow-hidden bg-[#111]">
        <Image
          src={item.image}
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectPosition: item.focus }}
          className="object-cover brightness-[.6]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-black/20 to-black/40" />
        <div className="container-x relative pb-12 pt-40 lg:pb-20">
          <Link
            href={`/${locale}#projects`}
            className="mb-8 inline-flex min-h-11 items-center text-xs tracking-[.14em] text-white/70 hover:text-white"
          >
            ← {d.back}
          </Link>
          <p className="text-[10px] uppercase tracking-[.2em] text-gold">
            {item.category[locale]}
          </p>
          <h1 className="mt-4 text-[clamp(2.6rem,7vw,7rem)] font-light leading-[1.02] tracking-[-.05em]">
            {item.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base font-light leading-8 text-white/80 lg:text-xl lg:leading-9">
            {item.intro[locale]}
          </p>
        </div>
      </section>

      {/* Facts */}
      <section className="container-x border-b border-white/10 py-10">
        <dl className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          <Fact label={d.project}>{item.title}</Fact>
          <Fact label={d.location}>{item.location[locale]}</Fact>
          <Fact label={d.type}>{item.type[locale]}</Fact>
          <Fact label={d.timeline}>{item.timeline[locale]}</Fact>
        </dl>
      </section>

      {/* Goal / created / deliverables */}
      <section className="container-x grid gap-14 py-16 lg:grid-cols-[1.1fr_.9fr] lg:gap-24 lg:py-28">
        <div className="space-y-12">
          <div data-reveal>
            <SectionLabel>{d.goal}</SectionLabel>
            <p className="max-w-xl text-lg font-light leading-8 text-white/80">
              {item.goal[locale]}
            </p>
          </div>
          <div data-reveal>
            <SectionLabel>{d.created}</SectionLabel>
            <p className="max-w-xl text-base leading-8 text-white/65">
              {item.created[locale]}
            </p>
          </div>
          <p data-reveal className="max-w-xl text-sm leading-7 text-white/55">
            <span className="text-white/80">{d.suitable}: </span>
            {item.suitableFor[locale]}
          </p>
        </div>
        <div data-reveal className="space-y-12">
          <div>
            <SectionLabel>{d.deliverables}</SectionLabel>
            <ul className="border-t border-white/12">
              {item.deliverables[locale].map((x) => (
                <li
                  key={x}
                  className="flex items-center gap-4 border-b border-white/12 py-4 text-base font-light"
                >
                  <span
                    aria-hidden="true"
                    className="size-1.5 rounded-full bg-gold"
                  />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-white/12 p-6 sm:p-8">
            <p className="text-[10px] uppercase tracking-[.2em] text-white/45">
              {d.investment}
            </p>
            <p className="mt-3 text-4xl font-light tracking-[-.03em]">
              <span className="mr-2 text-sm text-white/50">{d.startingAt}</span>
              {formatPrice(item.priceFrom, locale)}
            </p>
            <p className="mt-6 border-t border-white/12 pt-6 text-sm leading-7 text-white/65">
              {d.similarLead}{" "}
              <strong className="font-normal text-white">
                {formatPrice(item.priceFrom, locale)}
              </strong>
              . {d.similarRange}{" "}
              <strong className="font-normal text-white">
                {formatPrice(min, locale)} – {formatPrice(max, locale)}
              </strong>
              .
            </p>
            <p className="mt-3 text-xs leading-6 text-white/45">
              {d.similarNote}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="container-x pb-16 lg:pb-28">
        <div data-reveal>
          <SectionLabel>{d.gallery}</SectionLabel>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:gap-6">
          <div
            data-reveal
            className="relative aspect-video overflow-hidden bg-[#111] sm:col-span-2 sm:aspect-[21/9]"
          >
            <Image
              src={item.image}
              alt=""
              fill
              sizes="(max-width: 1440px) 100vw, 1312px"
              className="object-cover brightness-[.7]"
            />
            <span className="absolute inset-0 bg-black/25" />
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-black/30 backdrop-blur-sm"
            >
              ▶
            </span>
            <span className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[.2em] text-white/70 sm:bottom-6 sm:left-6">
              {d.teaser}
            </span>
          </div>
          {item.gallery.slice(0, 2).map((src) => (
            <div
              key={src}
              data-reveal
              className="relative aspect-video overflow-hidden bg-[#111]"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 639px) 100vw, 50vw"
                className="object-cover brightness-[.8]"
              />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 py-20 text-center lg:py-32">
        <div data-reveal className="container-x">
          <p className="text-[clamp(2rem,5vw,4.5rem)] font-light leading-[1.05] tracking-[-.05em]">
            {d.ctaTitle}
          </p>
          <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-white/60">
            {d.ctaText}
          </p>
          <div className="mt-10">
            <Button
              href={`/${locale}#contact`}
              className="border-white bg-white text-black hover:bg-white/80 hover:text-black"
            >
              {d.ctaAction}
            </Button>
          </div>
          {item.mock && (
            <p className="mx-auto mt-12 max-w-md text-[10px] leading-5 tracking-[.12em] text-white/35">
              {d.sampleNote}
            </p>
          )}
        </div>
      </section>

      {next && (
        <Link
          href={`/${locale}/work/${next.slug}`}
          className="group container-x flex items-center justify-between gap-6 border-t border-white/10 py-10 lg:py-14"
        >
          <span>
            <span className="block text-[10px] uppercase tracking-[.2em] text-white/45">
              {d.next}
            </span>
            <span className="mt-2 block text-[clamp(1.6rem,3.5vw,3rem)] font-light tracking-[-.04em]">
              {next.title}
            </span>
          </span>
          <span
            aria-hidden="true"
            className="text-3xl transition-transform group-hover:translate-x-2"
          >
            →
          </span>
        </Link>
      )}
    </main>
  );
}
