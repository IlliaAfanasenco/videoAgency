import type { Metadata } from "next";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import { isLocale, locales, getMessages } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import "../globals.css";
const geist = localFont({
  src: [
    {
      path: "../../public/fonts/geist-light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/geist-regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-geist-sans",
});
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return pageMetadata({ locale });
}
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getMessages(locale);
  return (
    <html lang={locale} className={geist.variable}>
      <body>
        <a
          href="#main-content"
          className="fixed left-5 top-4 z-50 -translate-y-24 bg-white px-5 py-3 text-black focus:translate-y-0"
        >
          {t.skip}
        </a>
        {children}
      </body>
    </html>
  );
}
