import { notFound } from "next/navigation";
import { isLocale, getMessages } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Motion } from "@/components/animation/Motion";
import { Hero } from "@/components/sections/Hero";
import { SelectedWorkSection } from "@/components/sections/SelectedWorkSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { WhyFrameSection } from "@/components/sections/WhyFrameSection";
import { FloatingCta } from "@/components/ui/FloatingCta";
import { ContactSection } from "@/components/sections/ContactSection";
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
        <AboutSection t={t} locale={locale} />
        <ServicesSection t={t} />
        <SelectedWorkSection t={t} locale={locale} />
        <ProcessSection t={t} />
        <WhyFrameSection t={t} />
        <ContactSection t={t} locale={locale} />
      </main>
      <Footer t={t} locale={locale} />
      <FloatingCta label={t.floatingCta} />
    </Motion>
  );
}
