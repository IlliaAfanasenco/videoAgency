import type { Locale } from "@/lib/i18n";

type Localized<T> = Record<Locale, T>;

export type Service = {
  /** Stable slug, reserved for the future /[locale]/services/[slug] pages. */
  slug: string;
  /** Set to the detail page URL once /services/[slug] exists. Without it the card is not a link. */
  href?: string;
  /** Real stills taken from the client's own showreel (see public/images/services). */
  image: string;
  /** Vertical focal point for cropping the image on narrow cards. */
  focus: string;
  title: string;
  subtitle: string;
  /** Full list of offerings. Not shown on the home page; used by future detail pages. */
  offerings: Localized<string[]>;
};

export const services: Service[] = [
  {
    slug: "drone-aerial-cinematography",
    image: "/images/services/drone.jpg",
    focus: "center",
    title: "Drone & Aerial Cinematography",
    subtitle: "Beyond ordinary perspectives.",
    offerings: {
      de: [
        "Professionelle Drohnen-Cinematography",
        "FPV-Drohnenproduktionen",
        "Immobilien & Architektur",
        "Hotel- & Resort-Luftaufnahmen",
        "Tourismus- & Destinationsfilme",
        "Corporate-Luftproduktionen",
        "Aerial Storytelling",
      ],
      en: [
        "Professional Drone Cinematography",
        "FPV Drone Productions",
        "Real Estate & Architecture",
        "Hotel & Resort Aerial Films",
        "Tourism & Destination Films",
        "Corporate Aerial Productions",
        "Aerial Storytelling",
      ],
    },
  },
  {
    slug: "weddings-events",
    image: "/images/services/weddings-events.jpg",
    focus: "70%",
    title: "Weddings & Events",
    subtitle: "Real moments. Timeless memories.",
    offerings: {
      de: [
        "Hochzeitsfilme",
        "Wedding Highlights",
        "Destination Weddings",
        "Firmenevents",
        "Festivals & Konzerte",
        "Private Feiern",
        "Wedding Podcast Experience",
      ],
      en: [
        "Wedding Films",
        "Wedding Highlights",
        "Destination Weddings",
        "Corporate Events",
        "Festivals & Concerts",
        "Private Celebrations",
        "Wedding Podcast Experience",
      ],
    },
  },
  {
    slug: "social-media-creative-strategy",
    image: "/images/services/social-media.jpg",
    focus: "center",
    title: "Social Media & Creative Strategy",
    subtitle: "Content with purpose. Stories with impact.",
    offerings: {
      de: [
        "Social-Media-Beratung",
        "Social-Media-Audit & Analyse",
        "Creative Strategy",
        "Content-Strategie & Planung",
        "Content Creation",
        "Social-Media-Management",
        "Performance-Analyse & Optimierung",
      ],
      en: [
        "Social Media Consultation",
        "Social Media Audit & Analysis",
        "Creative Strategy",
        "Content Strategy & Planning",
        "Content Creation",
        "Social Media Management",
        "Performance Analysis & Optimization",
      ],
    },
  },
  {
    slug: "commercial-brand-films",
    image: "/images/services/commercial.jpg",
    focus: "center",
    title: "Commercial & Brand Films",
    subtitle: "Your vision. Our creative perspective.",
    offerings: {
      de: [
        "Werbefilme",
        "Markenvideos",
        "Unternehmensfilme",
        "Produktvideos",
        "Hotel- & Hospitality-Produktionen",
        "Restaurant- & Lifestyle-Filme",
        "Promotion-Videos",
      ],
      en: [
        "Commercial Films",
        "Brand Videos",
        "Corporate Films",
        "Product Videos",
        "Hotel & Hospitality Productions",
        "Restaurant & Lifestyle Films",
        "Promotional Videos",
      ],
    },
  },
];
