import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { isLocale, locales, getMessages } from "@/lib/i18n";
import { getCase, getCases } from "@/data/cases";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Motion } from "@/components/animation/Motion";
import { CaseDetail } from "@/components/work/CaseDetail";

type Params = Promise<{ locale: string; slug: string }>;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getCases().map((c) => ({ locale, slug: c.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const item = getCase(slug);
  if (!isLocale(locale) || !item) notFound();
  return pageMetadata({
    locale,
    path: `/work/${slug}`,
    title: item.title,
    description: item.summary?.[locale],
  });
}

export default async function CasePage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  const item = getCase(slug);
  if (!isLocale(locale) || !item) notFound();
  const t = getMessages(locale);
  const all = getCases();
  const next = all[(all.findIndex((c) => c.slug === slug) + 1) % all.length];
  return (
    <Motion>
      <Header t={t} locale={locale} path={`/work/${slug}`} />
      <div id="top" />
      <CaseDetail
        item={item}
        next={next.slug === slug ? undefined : next}
        locale={locale}
        t={t}
      />
      <Footer t={t} locale={locale} />
    </Motion>
  );
}
