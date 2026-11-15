import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { isLocale, getMessages } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Motion } from "@/components/animation/Motion";
import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return { title: `${getMessages(locale).about.page.meta} | FRAME NO. 9` };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getMessages(locale);
  const a = t.about;
  const p = a.page;
  return (
    <Motion>
      <Header t={t} locale={locale} path="/about" />
      <div id="top" />
      <main id="main-content" tabIndex={-1}>
        {/* Intro */}
        <section className="mx-auto max-w-[1600px] px-6 pb-16 pt-36 sm:px-10 lg:px-20 lg:pb-28 lg:pt-48">
          <h1 className="whitespace-pre-line text-[clamp(2.6rem,8vw,8.2rem)] font-light leading-[1.02] tracking-[-.055em]">
            {a.title}
          </h1>
          <p className="mt-8 text-lg font-light text-white/80 lg:text-2xl">
            {a.slogan}
          </p>
        </section>
        <div className="relative mx-auto aspect-[4/3] max-w-[1800px] overflow-hidden bg-[#111] sm:aspect-[16/9] lg:aspect-[21/9]">
          <Image
            src="/images/about/frame.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover brightness-[.85]"
          />
        </div>

        {/* Philosophy */}
        <section className="mx-auto grid max-w-[1600px] gap-8 px-6 py-20 sm:px-10 lg:grid-cols-[.6fr_1.4fr] lg:gap-24 lg:px-20 lg:py-36">
          <div data-reveal>
            <SectionLabel>{p.philosophy.label}</SectionLabel>
          </div>
          <div data-reveal>
            <h2 className="text-[clamp(2rem,4.6vw,4.6rem)] font-light leading-[1.06] tracking-[-.045em]">
              {p.philosophy.title}
            </h2>
            <div className="mt-8 max-w-xl space-y-5 text-base leading-8 text-white/65">
              {p.philosophy.text.map((x) => (
                <p key={x}>{x}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Our Perspective: large typographic rows */}
        <section className="mx-auto max-w-[1600px] px-6 pb-20 sm:px-10 lg:px-20 lg:pb-36">
          <div data-reveal className="mb-10 lg:mb-14">
            <SectionLabel>{p.perspective.label}</SectionLabel>
            <p className="text-lg font-light text-white/70">
              {p.perspective.title}
            </p>
          </div>
          <ul className="border-t border-white/12">
            {p.perspective.items.map((item) => (
              <li
                key={item.title}
                data-reveal
                className="grid gap-3 border-b border-white/12 py-7 lg:grid-cols-[1.3fr_1fr] lg:items-center lg:gap-16 lg:py-10"
              >
                <h3 className="text-[clamp(1.7rem,4vw,3.8rem)] font-light leading-[1.05] tracking-[-.04em]">
                  {item.title}
                </h3>
                <p className="max-w-md text-sm leading-7 text-white/55">
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* From idea to execution */}
        <section className="mx-auto max-w-[1100px] px-6 pb-20 text-center sm:px-10 lg:pb-36">
          <div data-reveal>
            <SectionLabel>{p.process.label}</SectionLabel>
            <h2 className="text-[clamp(2rem,4.2vw,4rem)] font-light tracking-[-.04em]">
              {p.process.title}
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-white/65">
              {p.process.text}
            </p>
            <a
              href={`/${locale}#approach`}
              className="mt-6 inline-flex min-h-11 items-center text-sm text-white/80 underline underline-offset-4 hover:text-white"
            >
              {p.process.link} →
            </a>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="border-t border-white/10 px-6 py-24 text-center sm:px-10 lg:py-40">
          <div data-reveal>
            <p className="text-[clamp(2.2rem,6vw,6rem)] font-light leading-[1.05] tracking-[-.05em]">
              {p.closing.title}
            </p>
            <div className="mt-10">
              <Button
                href={`/${locale}#contact`}
                className="border-white bg-white text-black hover:bg-white/80 hover:text-black"
              >
                {p.closing.action}
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer t={t} locale={locale} />
    </Motion>
  );
}
