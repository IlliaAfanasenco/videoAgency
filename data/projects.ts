import type { Locale } from "@/lib/i18n";

type Localized<T> = Record<Locale, T>;

export const projectCategories = [
  { id: "drone", label: "Drone" },
  { id: "weddings-events", label: "Weddings & Events" },
  { id: "social-media", label: "Social Media" },
  { id: "commercial", label: "Commercial" },
] as const;

export type ProjectCategory = (typeof projectCategories)[number]["id"];

export type Project = {
  id: string;
  slug: string;
  category: ProjectCategory;
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
 *   id: "…", slug: "…", category: "drone",
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
        ["drone", "/images/services/drone.jpg"],
        ["weddings-events", "/images/services/weddings-events.jpg"],
        ["commercial", "/images/services/commercial.jpg"],
        ["social-media", "/images/services/social-media.jpg"],
        ["drone", "/images/services/drone.jpg"],
      ].map(([category, image], i) => ({
        id: `demo-${i + 1}`,
        slug: `demo-${i + 1}`,
        category: category as ProjectCategory,
        title: { de: `Demo ${i + 1}`, en: `Demo ${i + 1}` },
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
