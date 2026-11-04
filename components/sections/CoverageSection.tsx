import type { Messages } from "@/messages/de";
import { Heading, SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
export function CoverageSection({ t }: { t: Messages }) {
  return (
    <section className="overflow-hidden border-t border-white/10">
      <div className="mx-auto grid max-w-[1440px] items-center gap-8 px-6 py-16 sm:px-10 lg:grid-cols-2 lg:px-20">
        <div data-reveal>
          <SectionLabel>{t.coverage.label}</SectionLabel>
          <Heading>{t.coverage.title}</Heading>
          <p className="mb-7 mt-6 max-w-sm text-sm leading-6 text-white/55">
            {t.coverage.description}
          </p>
          <Button href="#contact">{t.coverage.action}</Button>
        </div>
        <svg
          role="img"
          aria-label={t.coverage.map}
          viewBox="0 0 600 520"
          className="mx-auto w-full max-w-[560px]"
        >
          <defs>
            <radialGradient id="mapLight">
              <stop stopColor="#34383b" stopOpacity=".45" />
              <stop offset="1" stopColor="#050505" stopOpacity="0" />
            </radialGradient>
            <filter id="routeGlow">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>
          <ellipse cx="300" cy="280" rx="270" ry="230" fill="url(#mapLight)" />
          <path
            d="m252 42 35 12 2 28 30 6 24-16 20 5 16-19 16 12 12 34 28 12-6 22 22 31-10 24 15 29-18 16 12 30-21 17-15 38-28 22 15 20-18 29 11 23-22 8 11 26-22 21-37-12-17 10-29-11-31 5-19-13-22 8-9-28 8-34-24-19 13-23-25-15 2-33-16-20 13-29-10-24 17-13 13-33 23-4-8-21 22-12-10-21 22-5-2-27 22-6 3-24Z"
            fill="#101213"
            stroke="#414448"
            strokeWidth=".8"
          />
          <path
            d="M248 94 264 431M188 186l214 55M172 283l193 71M238 149l139 214"
            fill="none"
            stroke="#fff"
            strokeOpacity=".06"
            strokeDasharray="3 8"
          />
          <path
            data-route
            d="M105 145C350 10 571 230 315 348S351 483 356 399"
            fill="none"
            stroke="#d9ecf7"
            strokeWidth="5"
            opacity=".4"
            filter="url(#routeGlow)"
          />
          <path
            data-route
            d="M105 145C350 10 571 230 315 348S351 483 356 399"
            fill="none"
            stroke="#dcebf4"
            strokeWidth="1.1"
          />
          {[
            { name: "Hamburg", x: 284, y: 132 },
            { name: "Berlin", x: 394, y: 208 },
            { name: "Köln", x: 190, y: 282 },
            { name: "München", x: 356, y: 399 },
          ].map((city) => (
            <g key={city.name}>
              <circle
                cx={city.x}
                cy={city.y}
                r="7"
                fill="white"
                opacity=".08"
              />
              <circle cx={city.x} cy={city.y} r="2.5" fill="white" />
              <text
                x={city.x + 12}
                y={city.y + 4}
                fill="#ccc"
                fontSize="11"
                fontFamily="Arial, sans-serif"
              >
                {city.name}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
}
