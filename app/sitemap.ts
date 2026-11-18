import type { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/lib/i18n";
import { getCases } from "@/data/cases";
import { services } from "@/data/services";

// Only published once the verified public origin is configured (same rule as robots.ts).
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!origin) return [];
  return [
    "",
    "/about",
    "/portfolio",
    ...services.map((s) => `/services/${s.slug}`),
    ...getCases().map((c) => `/work/${c.slug}`),
  ].flatMap((path) =>
    locales.map((locale) => ({
      url: `${origin}/${locale}${path}`,
      alternates: {
        languages: Object.fromEntries([
          ...locales.map((l) => [l, `${origin}/${l}${path}`]),
          ["x-default", `${origin}/${defaultLocale}${path}`],
        ]),
      },
    })),
  );
}
