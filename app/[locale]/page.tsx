import { notFound } from "next/navigation";
import { isLocale, getMessages } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Motion } from "@/components/animation/Motion";
import { Hero } from "@/components/sections/Hero";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { FinalCta } from "@/components/sections/FinalCta";
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getMessages(locale);
  return (
    <Motion>
      <Header t={t} locale={locale} />
      <main id="main-content" tabIndex={-1}>
        <Hero t={t} />
        <AboutSection t={t} />
        <ServicesSection t={t} />
        <ProjectsSection t={t} />
        <ProcessSection t={t} />
        <FinalCta t={t} />
      </main>
      <Footer t={t} />
    </Motion>
  );
}
