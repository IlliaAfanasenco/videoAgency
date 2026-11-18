import type { Locale } from "@/lib/i18n";

type Localized<T> = Record<Locale, T>;

/** Stable ids. Cases, projects and the contact form all refer to these. Order = display order. */
export const serviceIds = [
  "social-media-strategy",
  "hotels-hospitality",
  "business-commercial",
  "weddings-events",
  "drone-aerial",
  "photo-video",
] as const;
export type ServiceId = (typeof serviceIds)[number];

export type Service = {
  id: ServiceId;
  /** URL slug of /[locale]/services/[slug]. */
  slug: string;
  /** Brand-style English title (same in DE and EN). */
  title: string;
  /** Short filter label. */
  short: string;
  /** One or two lines for cards. */
  description: Localized<string>;
  /** Poster / still. Replace with final material (see README "Media"). */
  image: string;
  /** Optional muted loop; `image` stays as poster/fallback. */
  video?: string;
  /** CSS object-position for cropping. */
  focus: string;
  /**
   * TEMPORARY MEDIA: the image/video is borrowed from another category of the client's own showreel
   * until original material exists. Remove this flag when final media is in place.
   */
  placeholder?: boolean;
  /** Offerings for the detail page. */
  offerings: Localized<string[]>;
};

export const services: Service[] = [
  {
    id: "social-media-strategy",
    slug: "social-media-strategy",
    title: "Social Media & Strategy",
    short: "Social Media",
    description: {
      de: "Content-Strategie, Reels, Shorts und ein klares visuelles Markenbild.",
      en: "Content strategy, Reels, Shorts and a clear visual brand identity.",
      uk: "Контент-стратегія, Reels, Shorts і чітка візуальна айдентика бренду.",
      el: "Στρατηγική περιεχομένου, Reels, Shorts και ξεκάθαρη οπτική ταυτότητα brand.",
    },
    image: "/videos/service-social-poster.jpg",
    video: "/videos/service-social-loop.mp4",
    focus: "50% 45%",
    offerings: {
      de: [
        "Creative Strategy",
        "Content-Strategie & Planung",
        "Reels & Shorts",
        "Social-Media-Aufbau & -Betreuung",
        "Visuelle Markenentwicklung",
        "Audit & Optimierung",
      ],
      en: [
        "Creative Strategy",
        "Content Strategy & Planning",
        "Reels & Shorts",
        "Social Media Growth & Management",
        "Visual Brand Development",
        "Audit & Optimisation",
      ],
      uk: [
        "Креативна стратегія",
        "Контент-стратегія та планування",
        "Reels і Shorts",
        "Розвиток і ведення соцмереж",
        "Розробка візуального образу бренду",
        "Аудит і оптимізація",
      ],
      el: [
        "Δημιουργική στρατηγική",
        "Στρατηγική περιεχομένου & σχεδιασμός",
        "Reels & Shorts",
        "Ανάπτυξη & διαχείριση social media",
        "Ανάπτυξη οπτικής ταυτότητας",
        "Έλεγχος & βελτιστοποίηση",
      ],
    },
  },
  {
    id: "hotels-hospitality",
    slug: "hotels-hospitality",
    title: "Hotels & Hospitality",
    short: "Hotels",
    description: {
      de: "Foto und Video für Hotels, Apartments, Reiseanbieter, SPA und Gastronomie.",
      en: "Photo and video for hotels, apartments, travel companies, spas and hospitality.",
      uk: "Фото й відео для готелів, апартаментів, туристичних компаній, спа та ресторанів.",
      el: "Φωτογραφία και βίντεο για ξενοδοχεία, διαμερίσματα, ταξιδιωτικές εταιρείες, spa και εστίαση.",
    },
    image: "/videos/service-commercial-poster.jpg",
    video: "/videos/service-commercial-loop.mp4",
    focus: "50% 62%",
    placeholder: true,
    offerings: {
      de: [
        "Hotel- & Resort-Imagefilme",
        "Zimmer- & Apartment-Fotografie",
        "SPA & Wellness",
        "Tourismus & Destinationen",
        "Social Content für Buchungen",
      ],
      en: [
        "Hotel & Resort Brand Films",
        "Room & Apartment Photography",
        "Spa & Wellness",
        "Tourism & Destinations",
        "Social Content for Bookings",
      ],
      uk: [
        "Брендові фільми для готелів і курортів",
        "Фотографія номерів і апартаментів",
        "Спа та велнес",
        "Туризм і напрями",
        "Контент для соцмереж, що приносить бронювання",
      ],
      el: [
        "Εταιρικές ταινίες για ξενοδοχεία & resorts",
        "Φωτογραφία δωματίων & διαμερισμάτων",
        "Spa & Wellness",
        "Τουρισμός & προορισμοί",
        "Περιεχόμενο social για κρατήσεις",
      ],
    },
  },
  {
    id: "business-commercial",
    slug: "business-commercial",
    title: "Business & Commercial",
    short: "Business",
    description: {
      de: "Kommerzielle Videoproduktion für Restaurants, Shops, Marken und Unternehmen.",
      en: "Commercial video production for restaurants, shops, brands and companies.",
      uk: "Комерційне відеовиробництво для ресторанів, магазинів, брендів і компаній.",
      el: "Εμπορική παραγωγή βίντεο για εστιατόρια, καταστήματα, brands και εταιρείες.",
    },
    image: "/videos/about-car-desktop-poster.jpg",
    focus: "50% 50%",
    placeholder: true,
    offerings: {
      de: [
        "Werbefilme",
        "Markenvideos",
        "Unternehmensfilme",
        "Produktvideos",
        "Restaurant- & Lifestyle-Filme",
      ],
      en: [
        "Commercial Films",
        "Brand Videos",
        "Corporate Films",
        "Product Videos",
        "Restaurant & Lifestyle Films",
      ],
      uk: [
        "Рекламні ролики",
        "Брендові відео",
        "Корпоративні фільми",
        "Відео про продукт",
        "Фільми для ресторанів і лайфстайлу",
      ],
      el: [
        "Διαφημιστικά βίντεο",
        "Βίντεο brand",
        "Εταιρικές ταινίες",
        "Βίντεο προϊόντων",
        "Ταινίες για εστίαση & lifestyle",
      ],
    },
  },
  {
    id: "weddings-events",
    slug: "weddings-events",
    title: "Weddings & Events",
    short: "Weddings & Events",
    description: {
      de: "Hochzeitsfilme, Events, Konzerte, Aftermovies und private Feiern.",
      en: "Wedding films, events, concerts, aftermovies and private celebrations.",
      uk: "Весільні фільми, події, концерти, афтермуві та приватні свята.",
      el: "Γαμήλιες ταινίες, εκδηλώσεις, συναυλίες, aftermovies και ιδιωτικές γιορτές.",
    },
    image: "/videos/service-weddings-poster.jpg",
    video: "/videos/service-weddings-loop.mp4",
    focus: "70%",
    offerings: {
      de: [
        "Hochzeitsfilme & Highlights",
        "Destination Weddings",
        "Firmenevents",
        "Festivals, Konzerte & Aftermovies",
        "Private Feiern",
      ],
      en: [
        "Wedding Films & Highlights",
        "Destination Weddings",
        "Corporate Events",
        "Festivals, Concerts & Aftermovies",
        "Private Celebrations",
      ],
      uk: [
        "Весільні фільми та хайлайти",
        "Весілля за кордоном",
        "Корпоративні заходи",
        "Фестивалі, концерти та афтермуві",
        "Приватні свята",
      ],
      el: [
        "Γαμήλιες ταινίες & highlights",
        "Γάμοι σε προορισμούς",
        "Εταιρικές εκδηλώσεις",
        "Φεστιβάλ, συναυλίες & aftermovies",
        "Ιδιωτικές γιορτές",
      ],
    },
  },
  {
    id: "drone-aerial",
    slug: "drone-aerial",
    title: "Drone & Aerial",
    short: "Drone",
    description: {
      de: "Professionelle Luftaufnahmen für Business, Immobilien, Tourismus und Events.",
      en: "Professional aerial footage for business, real estate, tourism and events.",
      uk: "Професійна аерозйомка для бізнесу, нерухомості, туризму та подій.",
      el: "Επαγγελματικές εναέριες λήψεις για επιχειρήσεις, ακίνητα, τουρισμό και εκδηλώσεις.",
    },
    image: "/videos/service-drone-poster.jpg",
    video: "/videos/service-drone-loop.mp4",
    focus: "center",
    offerings: {
      de: [
        "Drohnen-Cinematography",
        "FPV-Drohnenproduktionen",
        "Immobilien & Architektur",
        "Tourismus & Destinationen",
        "Event- & Corporate-Luftaufnahmen",
      ],
      en: [
        "Drone Cinematography",
        "FPV Drone Productions",
        "Real Estate & Architecture",
        "Tourism & Destinations",
        "Event & Corporate Aerials",
      ],
      uk: [
        "Кінематографічна аерозйомка",
        "FPV-дрони: зйомка",
        "Нерухомість і архітектура",
        "Туризм і напрями",
        "Аерозйомка подій і компаній",
      ],
      el: [
        "Κινηματογραφικές λήψεις drone",
        "Παραγωγές με FPV drone",
        "Ακίνητα & αρχιτεκτονική",
        "Τουρισμός & προορισμοί",
        "Εναέριες λήψεις εκδηλώσεων & εταιρειών",
      ],
    },
  },
  {
    id: "photo-video",
    slug: "photo-video-production",
    title: "Photo & Video Production",
    short: "Photo & Video",
    description: {
      de: "Foto- und Videoproduktion, Schnitt, Color Grading und fertiger Content.",
      en: "Photo and video production, editing, colour grading and finished content.",
      uk: "Фото- й відеопродакшн, монтаж, колірна корекція та готовий контент.",
      el: "Παραγωγή φωτογραφίας και βίντεο, μοντάζ, color grading και έτοιμο περιεχόμενο.",
    },
    image: "/videos/showreel-desktop-poster.jpg",
    focus: "50% 40%",
    placeholder: true,
    offerings: {
      de: [
        "Fotoproduktion",
        "Videoproduktion",
        "Schnitt & Postproduktion",
        "Color Grading & Sounddesign",
        "Content für alle Kanäle",
      ],
      en: [
        "Photo Production",
        "Video Production",
        "Editing & Post-Production",
        "Colour Grading & Sound Design",
        "Content for Every Channel",
      ],
      uk: [
        "Фотопродакшн",
        "Відеопродакшн",
        "Монтаж і постпродакшн",
        "Колірна корекція та саунд-дизайн",
        "Контент для кожного каналу",
      ],
      el: [
        "Παραγωγή φωτογραφίας",
        "Παραγωγή βίντεο",
        "Μοντάζ & post-production",
        "Color grading & ηχητικός σχεδιασμός",
        "Περιεχόμενο για κάθε κανάλι",
      ],
    },
  },
];

export const getService = (id: ServiceId) => services.find((s) => s.id === id)!;
export const getServiceBySlug = (slug: string) =>
  services.find((s) => s.slug === slug);
export const serviceHref = (s: Service, locale: Locale) =>
  `/${locale}/services/${s.slug}`;
