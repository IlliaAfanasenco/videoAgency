import Image from "next/image";
import Link from "next/link";
import type { Messages } from "@/messages/de";
import type { Locale } from "@/lib/i18n";
import { formatPrice, type PublishedCase } from "@/data/cases";
import { getService } from "@/data/services";

/** One case as an editorial row: media on one side, commercial facts on the other (alternates on desktop). */
export function CaseCard({
  item,
  index,
  locale,
  t,
}: {
  item: PublishedCase;
  index: number;
  locale: Locale;
  t: Messages;
}) {
  const c = t.work.cases;
  const href = `/${locale}/work/${item.slug}`;
  const flip = index % 2 === 1;
  return (
    <article
      data-reveal
      data-mock-case={item.mock ? "" : undefined}
      className="group relative grid gap-6 lg:grid-cols-12 lg:items-stretch lg:gap-10"
    >
      <Link
        href={href}
        tabIndex={-1}
        aria-hidden="true"
        className={`relative block aspect-[4/3] overflow-hidden bg-[#111] sm:aspect-video lg:col-span-7 lg:aspect-auto lg:min-h-[420px] ${flip ? "lg:order-2" : ""}`}
      >
        <Image
          src={item.image}
          alt=""
          fill
          sizes="(max-width: 1023px) 100vw, 58vw"
          style={{ objectPosition: item.focus }}
          className="object-cover brightness-[.78] transition duration-[900ms] ease-out motion-safe:group-hover:scale-[1.04] group-hover:brightness-95"
        />
        <span className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/30" />
        <span className="absolute left-4 top-4 text-[10px] tracking-[.2em] text-white/80 sm:left-6 sm:top-6">
          CASE {String(index + 1).padStart(2, "0")}
        </span>
        <span className="absolute right-4 top-4 flex items-center gap-2 text-[10px] tracking-[.2em] text-white/70 sm:right-6 sm:top-6">
          <span className="size-1.5 rounded-full bg-gold" />
          {item.mock ? c.sample : c.framePreview}
        </span>
        <span
          aria-hidden="true"
          className="absolute bottom-4 left-4 flex size-12 items-center justify-center rounded-full border border-white/40 bg-black/30 text-sm backdrop-blur-sm transition group-hover:bg-white group-hover:text-black sm:bottom-6 sm:left-6"
        >
          ▶
        </span>
      </Link>
      <div
        className={`flex flex-col justify-center lg:col-span-5 ${flip ? "lg:order-1" : ""}`}
      >
        <p className="text-[10px] uppercase tracking-[.2em] text-gold">
          {item.services.map((id) => getService(id).short).join(" · ")}
        </p>
        <h3 className="mt-4 text-[clamp(1.8rem,3vw,2.9rem)] font-light leading-[1.05] tracking-[-.04em]">
          <Link
            href={href}
            className="after:absolute after:inset-0 lg:after:hidden"
          >
            {item.title}
          </Link>
        </h3>
        {item.summary && (
          <p className="mt-4 max-w-md text-sm leading-7 text-white/65">
            {item.summary[locale]}
          </p>
        )}
        {(item.deliverables || item.priceFrom !== undefined) && (
          <dl className="mt-7 grid gap-5 border-t border-white/12 pt-6 sm:grid-cols-[1fr_auto] sm:items-end">
            {item.deliverables && (
              <div>
                <dt className="text-[10px] uppercase tracking-[.2em] text-white/45">
                  {c.deliverables}
                </dt>
                <dd className="mt-2 text-sm leading-6 text-white/80">
                  {item.deliverables[locale].join(", ")}
                </dd>
              </div>
            )}
            {item.priceFrom !== undefined && (
              <div className="sm:text-right">
                <dt className="sr-only">{t.work.cases.detail.investment}</dt>
                <dd className="text-xl font-light tracking-[-.02em] sm:text-2xl">
                  <span className="mr-2 text-xs text-white/50">{c.from}</span>
                  {formatPrice(item.priceFrom, locale)}
                </dd>
              </div>
            )}
          </dl>
        )}
        <Link
          href={href}
          aria-label={`${c.viewCase}: ${item.title}`}
          className="mt-7 inline-flex min-h-11 items-center gap-4 self-start text-[11px] uppercase tracking-[.16em] text-white/90 transition hover:text-white"
        >
          {c.viewCase}
          <span
            aria-hidden="true"
            className="text-lg leading-none transition-transform duration-300 group-hover:translate-x-1.5"
          >
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
