import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { isLocale, getMessages } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Motion } from "@/components/animation/Motion";
import { LegalPage } from "@/components/sections/LegalPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return pageMetadata({
    locale,
    path: "/impressum",
    title: getMessages(locale).legal.impressum.title,
    noindex: true,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getMessages(locale);
  return (
    <Motion>
      <Header t={t} locale={locale} path="/impressum" />
      <div id="top" />
      <LegalPage t={t} locale={locale} doc={t.legal.impressum} />
      <Footer t={t} locale={locale} />
    </Motion>
  );
}
