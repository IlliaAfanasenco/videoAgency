import type { Messages } from "@/messages/de";
import { Heading, SectionLabel } from "@/components/ui/SectionLabel";
const icons = [
  "M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6l-8-3ZM8 12l3 3 5-6",
  "M9 3H5v4m10-4h4v4M5 17v4h4m6 0h4v-4M8 12l4-4 4 4-4 4-4-4Z",
  "M3 6h18v12H3V6Zm4 4h4v4H7v-4Zm8-1h3m-3 3h3m-3 3h3",
];
export function WhyAerovision({ t }: { t: Messages }) {
  return (
    <section
      id="about"
      className="relative mx-auto max-w-[1600px] px-6 py-24 sm:px-10 lg:px-20 lg:py-28"
    >
      <div data-reveal>
        <SectionLabel>{t.why.label}</SectionLabel>
        <Heading>{t.why.title}</Heading>
      </div>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 hidden w-1/2 text-white/20 lg:block"
        viewBox="0 0 700 250"
      >
        <path
          data-route
          d="M0 190C200 0 530 20 720 150"
          fill="none"
          stroke="currentColor"
          strokeWidth=".7"
        />
      </svg>
      <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-16">
        {t.why.titles.map((title, i) => (
          <article data-reveal key={title}>
            <span className="mb-6 flex size-12 items-center justify-center rounded-full border border-white/25">
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path d={icons[i]} />
              </svg>
            </span>
            <h3 className="text-lg font-normal">{title}</h3>
            <p className="mt-3 max-w-xs text-sm leading-6 text-white/50">
              {t.why.descriptions[i]}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
