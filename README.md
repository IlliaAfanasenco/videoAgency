# FRAME NO. 9 — Creative Agency

Website of the creative agency FRAME NO. 9. Next.js 16 (App Router), React 19, Tailwind 4, GSAP + Lenis. German is the primary language, English is available.

## Run

```sh
npm install
npm run dev       # development
npm run lint
npm run build     # production build (webpack mode)
npm start
```

`/` redirects to `/de`.

## Pages

| Route | Content |
|---|---|
| `/[locale]` | Hero, About, What We Do, Selected Work, Our Approach, Why FRAME NO. 9, Contact |
| `/[locale]/about` | About page |
| `/[locale]/portfolio` | Portfolio with category filters and video dialog |
| `/[locale]/impressum`, `/[locale]/datenschutz` | **Draft placeholders**, not legal documents (noindex) |
| `/api/contact` | Contact form endpoint |

## Structure

- `app/[locale]`: localized pages and metadata. `app/sitemap.ts`, `app/robots.ts`.
- `messages/de.ts`, `messages/en.ts`: all UI text (typed; English must match the German shape).
- `data/projects.ts`: portfolio projects. `data/services.ts`: the four service categories with full offering lists for future detail pages. `data/contact.ts`: public contact details from environment.
- `lib/contact-schema.ts` (shared validation), `lib/mail.ts` (sending), `lib/i18n.ts`, `lib/gsap.ts`.
- `components/sections`, `components/ui`, `components/layout`, `components/animation/Motion.tsx`.

## Content that is still missing

Nothing below is invented; empty places render nothing or an honest empty state.

- **Portfolio**: `published` in `data/projects.ts` is empty. Add one object per confirmed project (see the comment there) and put files in `public/portfolio/`. `NEXT_PUBLIC_PORTFOLIO_DEMO=1` shows labelled demo tiles for layout testing only.
- **Contact details**: set `NEXT_PUBLIC_CONTACT_EMAIL` and `NEXT_PUBLIC_INSTAGRAM_URL`.
- **Legal pages**: Impressum and Datenschutz need operator data and reviewed legal text.
- **Service detail pages**: set `href` per service in `data/services.ts` once the pages exist.

## Contact form

`POST /api/contact` validates (same rules as the browser), applies a honeypot and a simple per-instance rate limit, then sends through the Resend HTTPS API (`lib/mail.ts`). Without configuration it answers 503 and the form shows an error; it never reports success unless the mail provider accepted the message.

Environment (see `.env.example`): `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (verified sender). Add a rate limit at the hosting/WAF level in production.

## Media

- Hero loop: `public/videos/hero-loop-desktop.mp4` (1080p) and `hero-loop-mobile.mp4` (720×1280), H.264, no audio, with posters. Cut from the client showreel; the original is not stored in the repository.
- `public/images/services/*` and `public/images/about/frame.jpg` are stills from the client showreel. Replace with final material when available.
- `public/images/*.jpg` (automotive, real-estate, events, industry, fpv-coast, mountain-cta) and `public/videos/showreel-*`, `hero-video.mp4`, `hero-poster.jpg` are **no longer used**. They are kept until the client confirms they can go.

## Motion

Hero scroll flight and cursor-following drone are desktop-only (pointer: fine). Everything respects `prefers-reduced-motion`. Mobile has no pinned hero and no drone.

## Release

Set `NEXT_PUBLIC_SITE_URL` to the verified origin to enable indexing, canonical/hreflang, sitemap and absolute Open Graph image. Until then the site is `noindex`. Do not set an invented domain.
