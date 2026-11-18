import type { Metadata } from "next";
import {
  defaultLocale,
  getMessages,
  locales,
  ogLocales,
  type Locale,
} from "@/lib/i18n";

/** Verified public origin. Without it nothing is canonicalised or indexed (same rule as robots.ts). */
export const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

/** Locale-prefixed path. `path` is "" for the home page, otherwise e.g. "/about". */
export const localizedPath = (locale: Locale, path = "") => `/${locale}${path}`;

type Options = {
  locale: Locale;
  /** Path below the locale segment, e.g. "/services/drone-aerial"; "" for home. */
  path?: string;
  /** Page title without the brand suffix; omit for the home page. */
  title?: string;
  description?: string;
  /** Legal pages and similar. */
  noindex?: boolean;
};

/** Title, description, canonical, hreflang and Open Graph for one localized page. */
export function pageMetadata({
  locale,
  path = "",
  title,
  description,
  noindex,
}: Options): Metadata {
  const t = getMessages(locale);
  const fullTitle = title ? `${title} | FRAME NO. 9` : t.meta.title;
  const desc = description ?? t.meta.description;
  const index = Boolean(siteOrigin) && !noindex;
  return {
    title: fullTitle,
    description: desc,
    ...(siteOrigin
      ? {
          metadataBase: new URL(siteOrigin),
          alternates: {
            canonical: localizedPath(locale, path),
            languages: {
              ...Object.fromEntries(
                locales.map((l) => [l, localizedPath(l, path)]),
              ),
              "x-default": localizedPath(defaultLocale, path),
            },
          },
        }
      : {}),
    openGraph: {
      title: fullTitle,
      description: desc,
      type: "website",
      siteName: "FRAME NO. 9",
      locale: ogLocales[locale],
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => ogLocales[l]),
      ...(siteOrigin
        ? {
            url: localizedPath(locale, path),
            images: [
              {
                url: "/videos/hero-loop-desktop-poster.jpg",
                width: 1920,
                height: 1080,
              },
            ],
          }
        : {}),
    },
    robots: { index, follow: index },
  };
}
