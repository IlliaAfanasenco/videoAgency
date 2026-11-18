import { intlLocales, type Locale } from "@/lib/i18n";
import type { ServiceId } from "@/data/services";

type Localized<T> = Record<Locale, T>;

/**
 * CASE STUDIES.
 *
 * Two kinds of entries:
 *  - `mock: true`: FICTIONAL examples (names, places, prices) that only demonstrate the format. The UI
 *    labels them "Example project". They are not client work.
 *  - real projects: omit `mock`, fill only what is confirmed. Every content field except the ones
 *    marked required is optional and its section simply does not render when missing.
 *
 * `published: false` keeps an entry out of the site (cards, routes, sitemap) until it is complete.
 * To go live with a real project: add the real media, fill the confirmed fields, remove `published: false`.
 * NEVER add invented results, numbers, prices or testimonials.
 */
export type CaseStudy = {
  slug: string;
  /** Fictional demo entry. Rendered with an "Example project" label; never as a client claim. */
  mock?: boolean;
  /** Defaults to true. Set to false while material is missing. */
  published?: boolean;
  /** One or more service categories (drives filtering and labels). */
  services: ServiceId[];
  title: string;
  /** Client / business name if it may be shown. */
  client?: string;
  location?: Localized<string>;
  /** Short sentence for cards. */
  summary?: Localized<string>;
  /** Longer intro for the detail hero. */
  intro?: Localized<string>;
  /** Kind of work, e.g. "Social media content". */
  type?: Localized<string>;
  /** Task / brief. */
  goal?: Localized<string>;
  /** What was done. */
  created?: Localized<string>;
  /** Concrete deliverables. */
  deliverables?: Localized<string[]>;
  /** Confirmed results only (no invented metrics). */
  results?: Localized<string[]>;
  timeline?: Localized<string>;
  /** Mock cases only. Real cases must not show invented prices. */
  priceFrom?: number;
  priceRange?: [number, number];
  /** Cover image (card + detail hero). Required to publish. */
  image?: string;
  /** CSS object-position for the cover. */
  focus?: string;
  /** Selected frames / photos. */
  gallery?: string[];
  /** Optional preview video. */
  video?: string;
};

export type PublishedCase = CaseStudy & { image: string };

const sample = (c: Omit<CaseStudy, "mock"> & { image: string }): CaseStudy => ({
  ...c,
  mock: true,
});

export const cases: CaseStudy[] = [
  /**
   * REAL PROJECT, material pending. Valentina's work for a medical practice.
   * Fill in photos/videos, brief, delivered services and results when the client provides them,
   * then delete `published: false`. Do not publish with placeholders.
   */
  {
    slug: "allgemeinpraxis-meckenbeuren",
    published: false,
    services: ["social-media-strategy"],
    title: "Allgemeinpraxis — Meckenbeuren",
    client: "Allgemeinpraxis Meckenbeuren",
    location: {
      de: "Meckenbeuren",
      en: "Meckenbeuren",
      uk: "Меккенбойрен",
      el: "Μέκενμπόιρεν",
    },
    // summary, intro, type, goal, created, deliverables, results, timeline, image, gallery, video: pending
  },
  sample({
    slug: "lakeview-wedding-story",
    services: ["weddings-events", "photo-video"],
    title: "Lakeview Wedding Story",
    summary: {
      de: "Hochzeitsfilm mit Fokus auf Emotion und Atmosphäre.",
      en: "Wedding film focused on emotion and atmosphere.",
      uk: "Весільний фільм, зосереджений на емоціях і атмосфері.",
      el: "Γαμήλια ταινία με επίκεντρο το συναίσθημα και την ατμόσφαιρα.",
    },
    intro: {
      de: "Ein Hochzeitstag am See: ruhige Bilder, echte Gefühle.",
      en: "A wedding day by the lake: calm imagery, genuine emotion.",
      uk: "Весілля біля озера: спокійні кадри, щирі емоції.",
      el: "Ένας γάμος δίπλα στη λίμνη: ήρεμες εικόνες, αληθινό συναίσθημα.",
    },
    location: {
      de: "Bodensee",
      en: "Lake Constance",
      uk: "Боденське озеро",
      el: "Λίμνη της Κωνσταντίας",
    },
    type: {
      de: "Hochzeitsfilm",
      en: "Wedding film",
      uk: "Весільний фільм",
      el: "Γαμήλια ταινία",
    },
    goal: {
      de: "Den Tag unaufdringlich und ohne gestellte Szenen einfangen.",
      en: "Capture the day unobtrusively, without staged scenes.",
      uk: "Зафільмувати день ненав’язливо, без постановочних сцен.",
      el: "Να αποτυπωθεί η μέρα διακριτικά, χωρίς σκηνοθετημένες σκηνές.",
    },
    created: {
      de: "Begleitung von den Vorbereitungen bis zum ersten Tanz, mit Drohnenaufnahmen der Uferlandschaft.",
      en: "Coverage from the preparations to the first dance, with drone shots of the shoreline.",
      uk: "Зйомка від приготувань до першого танцю, з аерокадрами берегової лінії.",
      el: "Κάλυψη από τις προετοιμασίες έως τον πρώτο χορό, με λήψεις drone της ακτογραμμής.",
    },
    deliverables: {
      de: ["Highlight-Film", "2 vertikale Reels", "Drohnenaufnahmen"],
      en: ["Highlight film", "2 vertical reels", "Drone shots"],
      uk: ["Хайлайт-фільм", "2 вертикальні reels", "Аерозйомка"],
      el: ["Highlight film", "2 κάθετα reels", "Λήψεις drone"],
    },
    timeline: {
      de: "1 Drehtag, Lieferung in 10 Tagen",
      en: "1 shooting day, delivery in 10 days",
      uk: "1 знімальний день, здача за 10 днів",
      el: "1 ημέρα γυρισμάτων, παράδοση σε 10 ημέρες",
    },
    priceFrom: 900,
    priceRange: [900, 1800],
    image: "/images/services/weddings-events.jpg",
    gallery: ["/images/events.jpg", "/images/about/frame.jpg"],
  }),
  sample({
    slug: "petra-kitchen-launch",
    services: ["social-media-strategy", "business-commercial"],
    title: "Petra Kitchen Launch",
    summary: {
      de: "Social-first Visuals und Kurzvideos zur Restaurant-Eröffnung.",
      en: "Social-first visuals and short-form video for a restaurant opening.",
      uk: "Візуали для соцмереж і короткі відео до відкриття ресторану.",
      el: "Οπτικό υλικό για social και σύντομα βίντεο για τα εγκαίνια ενός εστιατορίου.",
    },
    intro: {
      de: "Appetitliche Bilder, schnelle Schnitte, gebaut für Instagram und TikTok.",
      en: "Appetising imagery and quick cuts, built for Instagram and TikTok.",
      uk: "Апетитні кадри й динамічний монтаж для Instagram і TikTok.",
      el: "Λαχταριστές εικόνες και γρήγορο μοντάζ, φτιαγμένα για Instagram και TikTok.",
    },
    location: { de: "München", en: "Munich", uk: "Мюнхен", el: "Μόναχο" },
    type: {
      de: "Social-Kampagne",
      en: "Social campaign",
      uk: "Кампанія в соцмережах",
      el: "Καμπάνια social media",
    },
    goal: {
      de: "Aufmerksamkeit zur Eröffnung und ein wiedererkennbarer Stil für die Kanäle.",
      en: "Attention at the opening and a recognisable style for the channels.",
      uk: "Увага до відкриття та впізнаваний стиль каналів.",
      el: "Προσοχή στα εγκαίνια και ένα αναγνωρίσιμο ύφος για τα κανάλια.",
    },
    created: {
      de: "Ein Konzepttag in Küche und Gastraum: Markenclip, Reels in Serien-Optik, Food-Visuals.",
      en: "One concept day in kitchen and dining room: brand clip, reels in a series look, food visuals.",
      uk: "Один концептуальний день на кухні та в залі: брендовий ролик, reels в єдиному стилі, фуд-візуали.",
      el: "Μία ημέρα γυρισμάτων σε κουζίνα και σαλόνι: βίντεο brand, reels σε ενιαίο ύφος, φωτογραφίες φαγητού.",
    },
    deliverables: {
      de: ["Markenclip", "5 Reels", "Food-Visuals"],
      en: ["Brand clip", "5 reels", "Food visuals"],
      uk: ["Брендовий ролик", "5 reels", "Фуд-візуали"],
      el: ["Βίντεο brand", "5 reels", "Εικόνες φαγητού"],
    },
    timeline: {
      de: "1–2 Drehtage, Lieferung in 14 Tagen",
      en: "1–2 shooting days, delivery in 14 days",
      uk: "1–2 знімальні дні, здача за 14 днів",
      el: "1–2 ημέρες γυρισμάτων, παράδοση σε 14 ημέρες",
    },
    priceFrom: 1200,
    priceRange: [1200, 2600],
    image: "/images/services/social-media.jpg",
    gallery: ["/images/services/commercial.jpg", "/images/industry.jpg"],
  }),
  sample({
    slug: "alpine-escape",
    services: ["hotels-hospitality", "drone-aerial"],
    title: "Alpine Escape",
    summary: {
      de: "Imagefilm für ein Boutique-Hotel mit Spa.",
      en: "Brand film for a boutique hotel and spa.",
      uk: "Брендовий фільм для бутик-готелю зі спа.",
      el: "Εταιρική ταινία για ένα boutique ξενοδοχείο με spa.",
    },
    intro: {
      de: "Ruhe, Weite, Handwerk: das Gefühl anzukommen.",
      en: "Calm, space, craft: the feeling of arriving.",
      uk: "Спокій, простір, майстерність: відчуття прибуття.",
      el: "Ηρεμία, χώρος, τέχνη: η αίσθηση της άφιξης.",
    },
    location: { de: "Tirol", en: "Tyrol", uk: "Тіроль", el: "Τιρόλο" },
    type: {
      de: "Markenfilm",
      en: "Brand film",
      uk: "Брендовий фільм",
      el: "Εταιρική ταινία",
    },
    goal: {
      de: "Das Haus als Rückzugsort positionieren und Direktbuchungen stützen.",
      en: "Position the hotel as a retreat and support direct bookings.",
      uk: "Позиціонувати готель як місце відпочинку й підтримати прямі бронювання.",
      el: "Να τοποθετηθεί το ξενοδοχείο ως καταφύγιο και να ενισχυθούν οι απευθείας κρατήσεις.",
    },
    created: {
      de: "Zwei Drehtage zu Sonnenaufgang und Abendlicht, inklusive Drohnenaufnahmen.",
      en: "Two shooting days at sunrise and evening light, including drone footage.",
      uk: "Два знімальні дні на сході сонця та у вечірньому світлі, включно з аерозйомкою.",
      el: "Δύο ημέρες γυρισμάτων σε ανατολή και βραδινό φως, με λήψεις drone.",
    },
    deliverables: {
      de: ["Markenfilm", "Drohnenaufnahmen", "Clips für Anzeigen"],
      en: ["Brand film", "Drone footage", "Clips for ads"],
      uk: ["Брендовий фільм", "Аерозйомка", "Кліпи для реклами"],
      el: ["Εταιρική ταινία", "Λήψεις drone", "Κλιπ για διαφημίσεις"],
    },
    timeline: {
      de: "2 Drehtage, Lieferung in 3 Wochen",
      en: "2 shooting days, delivery in 3 weeks",
      uk: "2 знімальні дні, здача за 3 тижні",
      el: "2 ημέρες γυρισμάτων, παράδοση σε 3 εβδομάδες",
    },
    priceFrom: 2400,
    priceRange: [2400, 4800],
    image: "/images/services/drone.jpg",
    gallery: ["/images/mountain-cta.jpg", "/images/fpv-coast.jpg"],
  }),
  sample({
    slug: "momentum-launch-night",
    services: ["weddings-events", "business-commercial"],
    title: "Momentum Launch Night",
    summary: {
      de: "Produktlaunch-Event als kinematografisches Aftermovie.",
      en: "Product launch event as a cinematic aftermovie.",
      uk: "Захід із запуску продукту як кінематографічний афтермуві.",
      el: "Εκδήλωση παρουσίασης προϊόντος ως κινηματογραφικό aftermovie.",
    },
    intro: {
      de: "Bühne, Licht, Publikum: am nächsten Morgen als Teaser online.",
      en: "Stage, lighting, crowd: online as a teaser the next morning.",
      uk: "Сцена, світло, публіка: наступного ранку онлайн у вигляді тизера.",
      el: "Σκηνή, φωτισμός, κοινό: online ως teaser το επόμενο πρωί.",
    },
    location: { de: "Berlin", en: "Berlin", uk: "Берлін", el: "Βερολίνο" },
    type: {
      de: "Event-Recap",
      en: "Event recap",
      uk: "Підсумок події",
      el: "Αφηγηματική κάλυψη εκδήλωσης",
    },
    goal: {
      de: "Die Energie des Abends festhalten, schnell nutzbar für Presse und Social Media.",
      en: "Capture the energy of the evening, quickly usable for press and social.",
      uk: "Зберегти енергію вечора, швидко придатну для преси та соцмереж.",
      el: "Να αποτυπωθεί η ενέργεια της βραδιάς, άμεσα αξιοποιήσιμη για τύπο και social.",
    },
    created: {
      de: "Zwei Kameras begleiteten Aufbau, Bühne und Gäste; Teaser noch in der Nacht, danach das Aftermovie.",
      en: "Two cameras covered setup, stage and guests; teaser the same night, aftermovie after.",
      uk: "Дві камери знімали монтаж, сцену та гостей; тизер — тієї ж ночі, афтермуві — згодом.",
      el: "Δύο κάμερες κάλυψαν την προετοιμασία, τη σκηνή και τους καλεσμένους· teaser την ίδια νύχτα, aftermovie αργότερα.",
    },
    deliverables: {
      de: ["Eventfilm", "Teaser", "Social-Clips"],
      en: ["Event film", "Teaser", "Social clips"],
      uk: ["Фільм про подію", "Тизер", "Кліпи для соцмереж"],
      el: ["Ταινία εκδήλωσης", "Teaser", "Κλιπ για social"],
    },
    timeline: {
      de: "1 Abend, Teaser in 24 h, Film in 7 Tagen",
      en: "1 evening, teaser in 24 h, film in 7 days",
      uk: "1 вечір, тизер за 24 год, фільм за 7 днів",
      el: "1 βράδυ, teaser σε 24 ώρες, ταινία σε 7 ημέρες",
    },
    priceFrom: 1100,
    priceRange: [1100, 2400],
    image: "/images/events.jpg",
    gallery: ["/images/services/commercial.jpg", "/images/automotive.jpg"],
  }),
];

const isPublished = (c: CaseStudy): c is PublishedCase =>
  c.published !== false && !!c.image;

/** Cases visible on the site. */
export const getCases = (): PublishedCase[] => cases.filter(isPublished);
export const getCase = (slug: string) =>
  getCases().find((c) => c.slug === slug);
/** Entries still waiting for material (for the content checklist). */
export const getPendingCases = () => cases.filter((c) => !isPublished(c));

export const formatPrice = (amount: number, locale: Locale) =>
  `${new Intl.NumberFormat(intlLocales[locale]).format(amount)} €`;
