import type { Locale } from "@/lib/i18n";
import type { ServiceId } from "@/data/services";

type Localized<T> = Record<Locale, T>;

export type Project = {
  id: string;
  slug: string;
  /** One or more service categories (used by the portfolio filter). */
  services: ServiceId[];
  title: Localized<string>;
  /** Optional short line shown in the video dialog. */
  description?: Localized<string>;
  /** Cover image shown on cards (also used as the video poster). */
  image: string;
  /** Optimised H.264 MP4. Only requested after a visitor opens the dialog. */
  video: string;
  orientation?: "landscape" | "portrait";
  featured: boolean;
  /** Lower numbers come first. */
  order: number;
  /** Marks temporary demo entries. They are labelled as such in the UI. */
  demo?: boolean;
};

/**
 * PUBLISHED PROJECTS. Add one object per confirmed client project:
 *
 * {
 *   id: "…", slug: "…", services: ["drone-aerial"],
 *   title: { de: "…", en: "…" },
 *   image: "/portfolio/<slug>.jpg", video: "/portfolio/<slug>.mp4",
 *   featured: true, order: 1,
 * }
 *
 * Empty until the client confirms which films may be shown (see report).
 */
const published: Project[] = [];

/**
 * Layout test data. Only active with NEXT_PUBLIC_PORTFOLIO_DEMO=1 (never in a normal build).
 * They reuse existing site media, are not client projects and carry a visible "Demo" badge.
 */
const demo: Project[] =
  process.env.NEXT_PUBLIC_PORTFOLIO_DEMO === "1"
    ? [
        ["drone-aerial", "/images/services/drone.jpg"],
        ["weddings-events", "/images/services/weddings-events.jpg"],
        ["business-commercial", "/images/services/commercial.jpg"],
        ["social-media-strategy", "/images/services/social-media.jpg"],
        ["hotels-hospitality", "/images/services/drone.jpg"],
        ["photo-video", "/images/services/commercial.jpg"],
      ].map(([service, image], i) => ({
        id: `demo-${i + 1}`,
        slug: `demo-${i + 1}`,
        services: [service as ServiceId],
        title: {
          de: `Demo ${i + 1}`,
          en: `Demo ${i + 1}`,
          uk: `Демо ${i + 1}`,
          el: `Demo ${i + 1}`,
        },
        image,
        video: "/videos/hero-loop-desktop.mp4",
        featured: i < 3,
        order: i + 1,
        demo: true,
      }))
    : [];

const all = [...published, ...demo].sort((a, b) => a.order - b.order);

export const getProjects = () => all;
export const getFeaturedProjects = (limit = 3) =>
  all.filter((p) => p.featured).slice(0, limit);
