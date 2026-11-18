import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { isLocale, locales, getMessages } from "@/lib/i18n";
import { getServiceBySlug, serviceHref, services } from "@/data/services";
import { getCases } from "@/data/cases";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Motion } from "@/components/animation/Motion";
import { Button } from "@/components/ui/Button";
import { LoopVideo } from "@/components/ui/LoopVideo";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CaseTile } from "@/components/work/CaseTile";

type Params = Promise<{ locale: string; slug: string }>;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    services.map((s) => ({ locale, slug: s.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);
  if (!isLocale(locale) || !service) notFound();
  return pageMetadata({
    locale,
    path: `/services/${slug}`,
    title: service.title,
    description: service.description[locale],
  });
}

export default async function ServicePage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);
  if (!isLocale(locale) || !service) notFound();
  const t = getMessages(locale);
  const d = t.services.detail;
  const related = getCases().filter((c) => c.services.includes(service.id));
  const index = services.indexOf(service);
  const next = services[(index + 1) % services.length];
  return (
    <Motion>
      <Header t={t} locale={locale} path={`/services/${slug}`} />
      <div id="top" />
      <main id="main-content" tabIndex={-1}>
        <section className="relative flex min-h-[72svh] items-end overflow-hidden bg-[#111]">
          {service.video ? (
            <LoopVideo
              src={service.video}
              poster={service.image}
              style={{ objectPosition: service.focus }}
              className="absolute inset-0 size-full object-cover brightness-[.6]"
            />
          ) : (
            <Image
              src={service.image}
              alt=""
              fill
              priority
              sizes="100vw"
              style={{ objectPosition: service.focus }}
              className="object-cover brightness-[.6]"
            />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-black/20 to-black/40" />
          <div className="container-x relative pb-12 pt-40 lg:pb-20">
            <Link
              href={`/${locale}#services`}
              className="mb-8 inline-flex min-h-11 items-center text-xs tracking-[.14em] text-white/70 hover:text-white"
            >
              ← {d.back}
            </Link>
            <p className="text-[10px] tracking-[.2em] text-gold">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h1 className="mt-4 text-[clamp(2.4rem,7vw,7rem)] font-light uppercase leading-[1.02] tracking-[-.05em]">
              {service.title}
            </h1>
            <p className="mt-6 max-w-xl text-base font-light leading-8 text-white/80 lg:text-xl lg:leading-9">
              {service.description[locale]}
            </p>
          </div>
        </section>

        <section className="container-x py-16 lg:py-24">
          <div data-reveal>
            <SectionLabel>{d.offerings}</SectionLabel>
            <ul className="grid border-t border-white/12 sm:grid-cols-2 sm:gap-x-12">
              {service.offerings[locale].map((x) => (
                <li
                  key={x}
                  className="flex items-center gap-4 border-b border-white/12 py-4 text-base font-light"
                >
                  <span
                    aria-hidden="true"
                    className="size-1.5 shrink-0 rounded-full bg-gold"
                  />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="container-x pb-16 lg:pb-24">
          <div data-reveal>
            <SectionLabel>{d.related}</SectionLabel>
            {related.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-8">
                {related.map((c) => (
                  <CaseTile
                    key={c.slug}
                    item={c}
                    locale={locale}
                    sampleLabel={t.work.cases.sample}
                  />
                ))}
              </div>
            ) : (
              <p className="border border-white/10 px-6 py-10 text-sm text-white/55">
                {d.noProjects}
              </p>
            )}
          </div>
        </section>

        <section className="border-t border-white/10 py-20 text-center lg:py-28">
          <div data-reveal className="container-x">
            <p className="text-[clamp(2rem,5vw,4.5rem)] font-light leading-[1.05] tracking-[-.05em]">
              {d.ctaTitle}
            </p>
            <div className="mt-10">
              <Button
                href={`/${locale}#contact`}
                className="border-white bg-white text-black hover:bg-white/80 hover:text-black"
              >
                {d.cta}
              </Button>
            </div>
          </div>
        </section>

        <Link
          href={serviceHref(next, locale)}
          className="group container-x flex items-center justify-between gap-6 border-t border-white/10 py-10 lg:py-14"
        >
          <span>
            <span className="block text-[10px] uppercase tracking-[.2em] text-white/45">
              {t.work.cases.detail.next}
            </span>
            <span className="mt-2 block text-[clamp(1.4rem,3.5vw,3rem)] font-light uppercase tracking-[-.04em]">
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
      </main>
      <Footer t={t} locale={locale} />
    </Motion>
  );
}
