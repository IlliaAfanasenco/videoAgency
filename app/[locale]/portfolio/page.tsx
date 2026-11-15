import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, getMessages } from "@/lib/i18n";
import { getProjects } from "@/data/projects";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Motion } from "@/components/animation/Motion";
import { Heading, SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectGallery } from "@/components/ui/ProjectGallery";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getMessages(locale);
  return { title: `${t.portfolio.title} | FRAME NO. 9` };
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getMessages(locale);
  const projects = getProjects();
  return (
    <Motion>
      <Header t={t} locale={locale} path="/portfolio" />
      {/* Zero-height anchor: keeps the header solid and gives the footer's "back to top" a target. */}
      <div id="top" />
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto max-w-[1600px] px-6 pb-24 pt-36 sm:px-10 lg:px-20 lg:pb-36 lg:pt-44"
      >
        <div className="mb-12 lg:mb-16">
          <SectionLabel>{t.portfolio.label}</SectionLabel>
          <Heading className="text-[clamp(2.4rem,5vw,5rem)]">
            {t.portfolio.title}
          </Heading>
          <p className="mt-6 max-w-lg text-sm leading-7 text-white/60">
            {t.portfolio.intro}
          </p>
        </div>
        {projects.length > 0 ? (
          <ProjectGallery
            projects={projects}
            locale={locale}
            labels={t.work.gallery}
            filterable
          />
        ) : (
          <p className="border border-white/10 px-6 py-12 text-sm text-white/55">
            {t.work.empty}
          </p>
        )}
      </main>
      <Footer t={t} locale={locale} />
    </Motion>
  );
}
