import type { Metadata } from "next";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import { isLocale, locales, getMessages } from "@/lib/i18n";
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
  const title =
    locale === "de"
      ? "FRAME NO. 9 | Videoproduktion mit Kamera & Drohne"
      : "FRAME NO. 9 | Cinematic Video Production with Camera & Drone";
  const description =
    locale === "de"
      ? "Frame No. 9: zwei Videografen für Cinematic Content mit Kamera und Drohne – für Marken, Hotels, Events, Hochzeiten und Immobilien."
      : "Frame No. 9: two videographers creating cinematic content with camera and drone for brands, hotels, events, weddings and real estate.";
  const origin = process.env.NEXT_PUBLIC_SITE_URL;
  return {
    title,
    description,
    ...(origin
      ? {
          metadataBase: new URL(origin),
          alternates: {
            canonical: `/${locale}`,
            languages: { de: "/de", en: "/en", "x-default": "/de" },
          },
        }
      : {}),
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "FRAME NO. 9",
      locale: locale === "de" ? "de_DE" : "en_GB",
      ...(origin
        ? {
            images: [
              { url: "/images/hero-drone.png", width: 1672, height: 941 },
            ],
          }
        : {}),
    },
    robots: { index: Boolean(origin), follow: Boolean(origin) },
  };
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
