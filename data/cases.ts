import type { Locale } from "@/lib/i18n";

type Localized<T> = Record<Locale, T>;

/**
 * CASE STUDIES.
 *
 * ⚠ MOCK CONTENT: every entry below is fictional (names, places, budgets, scope) and exists only to
 * demonstrate the future portfolio format. To go live, replace an entry with a real project:
 *  - set `mock: false` (or remove the field),
 *  - swap `image` / `gallery` for real frames (optionally add `video`),
 *  - update texts and `priceFrom` / `priceRange` with confirmed figures.
 * Cards, the home section, detail pages, routes and the sitemap all read from this file only.
 */
export type CaseStudy = {
  slug: string;
  /** Fictional demo entry. Rendered as a discreet "sample" note; never as a client claim. */
  mock?: boolean;
  category: Localized<string>;
  title: string;
  /** Short sentence for cards. */
  summary: Localized<string>;
  /** Longer intro for the detail page hero. */
  intro: Localized<string>;
  location: Localized<string>;
  type: Localized<string>;
  goal: Localized<string>;
  created: Localized<string>;
  deliverables: Localized<string[]>;
  /** Short deliverables for the card (a subset, or the same list). */
  cardDeliverables: Localized<string>;
  timeline: Localized<string>;
  /** Starting price in EUR. */
  priceFrom: number;
  /** Typical range for comparable projects in EUR. */
  priceRange: [number, number];
  suitableFor: Localized<string>;
  /** Cover image used on the card and in the detail hero. */
  image: string;
  /** CSS object-position for the cover. */
  focus?: string;
  /** Selected frames (placeholders until real stills exist). */
  gallery: string[];
  /** Optional looping preview video. */
  video?: string;
};

export const cases: CaseStudy[] = [
  {
    slug: "lakeview-wedding-story",
    mock: true,
    category: { de: "Hochzeit & Events", en: "Weddings & Events" },
    title: "Lakeview Wedding Story",
    summary: {
      de: "Kinematografische Hochzeitsbegleitung mit Fokus auf Emotion, Atmosphäre und zeitlose Erinnerungen.",
      en: "Cinematic wedding coverage focused on emotion, atmosphere and timeless memories.",
    },
    intro: {
      de: "Ein Hochzeitstag am See: ruhige Bilder, echte Gefühle und ein Film, den das Paar in zwanzig Jahren noch genauso gern ansieht.",
      en: "A wedding day by the lake: calm imagery, genuine emotion and a film the couple will still love watching in twenty years.",
    },
    location: { de: "Bodensee", en: "Lake Constance" },
    type: { de: "Hochzeitsfilm", en: "Wedding film" },
    goal: {
      de: "Die Atmosphäre und die emotionalen Höhepunkte des Tages einfangen – unaufdringlich und ohne gestellte Szenen.",
      en: "Capture the atmosphere and emotional highlights of the day – unobtrusively and without staged scenes.",
    },
    created: {
      de: "Wir haben den Tag von den Vorbereitungen bis zum ersten Tanz begleitet, mit zwei Kameras, Funkmikrofonen für die Trauung und Drohnenaufnahmen der Uferlandschaft. Im Schnitt entstand ein Highlight-Film mit natürlichem Farbton und ruhigem Rhythmus.",
      en: "We followed the day from the preparations to the first dance, using two cameras, lavalier audio for the ceremony and drone shots of the shoreline. In the edit, this became a highlight film with a natural colour palette and a calm rhythm.",
    },
    deliverables: {
      de: ["1 Highlight-Film", "2 vertikale Reels", "Drohnenaufnahmen"],
      en: ["1 highlight film", "2 vertical reels", "Drone shots"],
    },
    cardDeliverables: {
      de: "Highlight-Film, Social-Teaser, vertikale Reels",
      en: "Highlight film, social teaser, vertical reels",
    },
    timeline: {
      de: "1 Drehtag, Lieferung in 10 Tagen",
      en: "1 shooting day, delivery in 10 days",
    },
    priceFrom: 900,
    priceRange: [900, 1800],
    suitableFor: {
      de: "Paare und Hochzeitsplaner, die mehr als reine Dokumentation möchten.",
      en: "Couples and planners who want more than plain documentation.",
    },
    image: "/images/services/weddings-events.jpg",
    gallery: [
      "/images/events.jpg",
      "/images/about/frame.jpg",
      "/images/services/drone.jpg",
    ],
  },
  {
    slug: "petra-kitchen-launch",
    mock: true,
    category: {
      de: "Commercial / Food / Social Media",
      en: "Commercial / Food / Social Media",
    },
    title: "Petra Kitchen Launch",
    summary: {
      de: "Social-first Visuals und eine Kurzvideo-Kampagne für die Eröffnung eines Restaurants.",
      en: "Social-first visuals and short-form campaign for a restaurant launch.",
    },
    intro: {
      de: "Zur Eröffnung sollte das Restaurant sofort sichtbar sein: appetitliche Bilder, schnelle Schnitte und Inhalte, die für Instagram und TikTok gebaut sind.",
      en: "For the opening, the restaurant needed to be seen right away: appetising imagery, quick cuts and content built for Instagram and TikTok.",
    },
    location: { de: "München", en: "Munich" },
    type: { de: "Social-Kampagne", en: "Social campaign" },
    goal: {
      de: "Vor und zur Eröffnung Aufmerksamkeit erzeugen und einen wiedererkennbaren visuellen Stil für die Social-Kanäle etablieren.",
      en: "Build attention before and at the opening and establish a recognisable visual style for the social channels.",
    },
    created: {
      de: "Ein Konzepttag in Küche und Gastraum: Markenclip, fünf Reels mit klarer Serien-Optik und ein Set an Food-Visuals für Menü, Website und Anzeigen.",
      en: "One concept day in the kitchen and dining room: a brand clip, five reels with a consistent series look and a set of food visuals for the menu, website and ads.",
    },
    deliverables: {
      de: ["1 Markenclip", "5 Reels", "Food-Visuals"],
      en: ["1 brand clip", "5 reels", "Food visuals"],
    },
    cardDeliverables: {
      de: "Markenclip, 5 Reels, Food-Visuals",
      en: "Brand clip, 5 reels, food visuals",
    },
    timeline: {
      de: "1–2 Drehtage, Lieferung in 14 Tagen",
      en: "1–2 shooting days, delivery in 14 days",
    },
    priceFrom: 1200,
    priceRange: [1200, 2600],
    suitableFor: {
      de: "Restaurants, Cafés und Food-Marken mit anstehender Eröffnung oder neuer Karte.",
      en: "Restaurants, cafés and food brands with an upcoming opening or new menu.",
    },
    image: "/images/services/social-media.jpg",
    gallery: [
      "/images/services/commercial.jpg",
      "/images/industry.jpg",
      "/images/events.jpg",
    ],
  },
  {
    slug: "alpine-escape",
    mock: true,
    category: {
      de: "Hospitality / Commercial",
      en: "Hospitality / Commercial",
    },
    title: "Alpine Escape",
    summary: {
      de: "Ein hochwertiger Imagefilm für ein Boutique-Hotel mit Spa-Erlebnis.",
      en: "A premium visual identity film for a boutique hotel and spa experience.",
    },
    intro: {
      de: "Ruhe, Weite und Handwerk: ein Film, der nicht Zimmer zeigt, sondern das Gefühl, anzukommen.",
      en: "Calm, space and craft: a film that doesn't just show rooms, but the feeling of arriving.",
    },
    location: { de: "Tirol", en: "Tyrol" },
    type: { de: "Markenfilm", en: "Brand film" },
    goal: {
      de: "Das Haus als Rückzugsort positionieren und Direktbuchungen mit starkem Bildmaterial unterstützen.",
      en: "Position the hotel as a retreat and support direct bookings with strong visual material.",
    },
    created: {
      de: "Zwei Drehtage über Sonnenaufgang und Abendlicht: Markenfilm, Drohnenaufnahmen von Anreise und Landschaft sowie kurze Bildclips für Anzeigen und Buchungsseite.",
      en: "Two shooting days covering sunrise and evening light: a brand film, drone footage of the approach and landscape, and short image clips for ads and the booking page.",
    },
    deliverables: {
      de: ["1 Markenfilm", "Drohnenaufnahmen", "Bildclips für Anzeigen"],
      en: ["1 brand film", "Drone footage", "Image clips for ads"],
    },
    cardDeliverables: {
      de: "Markenfilm, Drohnenaufnahmen, Bildclips für Anzeigen",
      en: "Brand film, drone footage, image clips for ads",
    },
    timeline: {
      de: "2 Drehtage, Lieferung in 3 Wochen",
      en: "2 shooting days, delivery in 3 weeks",
    },
    priceFrom: 2400,
    priceRange: [2400, 4800],
    suitableFor: {
      de: "Hotels, Resorts und Boutique-Häuser, die ihre Marke emotional erzählen wollen.",
      en: "Hotels, resorts and boutique properties that want to tell their brand story emotionally.",
    },
    image: "/images/services/drone.jpg",
    gallery: [
      "/images/mountain-cta.jpg",
      "/images/fpv-coast.jpg",
      "/images/real-estate.jpg",
    ],
  },
  {
    slug: "momentum-launch-night",
    mock: true,
    category: {
      de: "Events / Brand Experience",
      en: "Events / Brand Experience",
    },
    title: "Momentum Launch Night",
    summary: {
      de: "Schnelle Eventbegleitung für einen Produktlaunch, geliefert als kinematografisches Aftermovie.",
      en: "Fast-paced event coverage for a product launch with cinematic aftermovie delivery.",
    },
    intro: {
      de: "Ein Launch-Abend mit Bühne, Licht und Publikum – am nächsten Morgen schon als Teaser online, wenige Tage später als voller Film.",
      en: "A launch evening with stage, lighting and crowd – online as a teaser the next morning and as a full film a few days later.",
    },
    location: { de: "Berlin", en: "Berlin" },
    type: { de: "Event-Recap", en: "Event recap" },
    goal: {
      de: "Die Energie des Abends festhalten und schnell nutzbares Material für Presse und Social Media liefern.",
      en: "Capture the energy of the evening and deliver material that can be used quickly for press and social media.",
    },
    created: {
      de: "Ein Team mit zwei Kameras begleitete Aufbau, Bühne und Gäste. Noch in der Nacht entstand ein Teaser, anschließend ein Aftermovie mit Social-Cutdowns.",
      en: "A two-camera team covered setup, stage and guests. A teaser was cut the same night, followed by an aftermovie with social cutdowns.",
    },
    deliverables: {
      de: ["1 Eventfilm", "Teaser-Schnitt", "Social-Clips"],
      en: ["1 event film", "Teaser edit", "Social clips"],
    },
    cardDeliverables: {
      de: "Eventfilm, Teaser-Schnitt, Social-Clips",
      en: "Event film, teaser edit, social clips",
    },
    timeline: {
      de: "1 Abend, Teaser in 24 h, Film in 7 Tagen",
      en: "1 evening, teaser in 24 h, film in 7 days",
    },
    priceFrom: 1100,
    priceRange: [1100, 2400],
    suitableFor: {
      de: "Marken und Agenturen mit Produktlaunches, Firmenevents oder Konferenzen.",
      en: "Brands and agencies with product launches, corporate events or conferences.",
    },
    image: "/images/events.jpg",
    gallery: [
      "/images/services/commercial.jpg",
      "/images/automotive.jpg",
      "/images/services/weddings-events.jpg",
    ],
  },
];

export const getCases = () => cases;
export const getCase = (slug: string) => cases.find((c) => c.slug === slug);

export const formatPrice = (amount: number, locale: Locale) =>
  `${new Intl.NumberFormat(locale === "de" ? "de-DE" : "en-GB").format(amount)} €`;
