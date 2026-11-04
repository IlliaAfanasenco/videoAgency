# AEROVISION

Cinematic drone / FPV agency frontend built in the existing Next.js 16 project.

## Run

```sh
npm install
npm run dev
npm run lint
npm run build
npm start
```

`/` redirects to `/de`. `/de` and `/en` share the same server-rendered sections and typed dictionaries. The locale root layout sets the actual HTML language. Architecture follows the local Pixardia project: locale layouts, explicit locale validation, centralized motion, reusable UI and separate content.

`build` uses supported Next.js Webpack mode because Turbopack's CSS worker cannot bind its internal port in the current restricted environment. `npm run build:turbo` retains the default Turbopack option.

## Structure

- `app/[locale]`: localized root layout, metadata and page composition.
- `messages`: German and English dictionaries.
- `components/layout`: fixed header, native-dialog mobile navigation and footer.
- `components/sections`: Hero, Projects, FPV, Why, Coverage and Contact.
- `components/ui`: buttons, headings, project cards, accessible dialogs and local project brief.
- `components/animation/Motion.tsx`: scoped GSAP / ScrollTrigger / Lenis lifecycle.
- `lib/gsap.ts`: one plugin registration point.
- `public/images`, `public/fonts`: local images and self-hosted Geist with OFL license.

Motion respects reduced-motion changes and reverts timelines, scroll triggers and ticker subscriptions on teardown. Text stays visible with JavaScript disabled. Native dialogs provide Escape handling, modal focus containment and focus restoration.

## Content and publication

The supplied hero image is retained. Other photos are illustrative Unsplash fallbacks, not claims of completed client work. The project cards explicitly label this. Requested marketing figures and pilot claims are supplied copy and should be verified by the owner before release.

There is no real showreel, contact address, social profile, company identity or legal copy in the supplied content. Showreel and legal dialogs explain their pending state. The contact flow creates a local brief and copies it; it does not pretend to send leads. No database, analytics or API is installed.

Next iteration: provide the actual video, portfolio case studies, contact destination, social URLs and company details. Replace the brief submission handler with a validated `/api/contact` integration; Prisma and rate limiting can be added at that boundary without changing the page sections.

Set `NEXT_PUBLIC_SITE_URL` to the verified deployment origin to enable canonical/hreflang URLs, absolute OpenGraph imagery and indexing. Until then this preview is noindex. Do not set an invented domain.

## Image sources

All fallback photographs are stored locally; no external photo request is made by visitors.

- Automotive: https://images.unsplash.com/photo-1492144534655-ae79c964c9d7
- Real estate: https://images.unsplash.com/photo-1600596542815-ffad4c1539a9
- Events: https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3
- Industry: https://images.unsplash.com/photo-1513828583688-c52646db42da
- Coast: https://images.unsplash.com/photo-1510414842594-a61c69b5ae57
- Mountains: https://images.unsplash.com/photo-1464822759023-fed622ff2c3b

## Verification

Production build and ESLint pass. Browser checks covered German/English navigation, mobile menu, project/contact dialogs, Escape and focus restoration. Layout overflow checks passed at 375, 390, 430, 768, 1024, 1280, 1440 and 1920 px. Production browser logs showed no warnings or hydration errors in the checked flows.
# videoAgency
