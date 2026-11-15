import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";

// Only published once the verified public origin is configured (same rule as robots.ts).
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!origin) return [];
  return ["", "/about", "/portfolio"].flatMap((path) =>
    locales.map((locale) => ({
      url: `${origin}/${locale}${path}`,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${origin}/${l}${path}`]),
        ),
      },
    })),
  );
}
