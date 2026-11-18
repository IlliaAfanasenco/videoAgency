import Image from "next/image";
import Link from "next/link";
import { LoopVideo } from "@/components/ui/LoopVideo";
import type { Service } from "@/data/services";
import type { Locale } from "@/lib/i18n";

/** Large cinematic card: full-bleed video, number, big title, short line, CTA. Links to the service page. */
export function ServiceCard({
  service,
  index,
  locale,
  href,
  more,
  className = "",
}: {
  service: Service;
  index: number;
  locale: Locale;
  href: string;
  more: string;
  className?: string;
}) {
  const media =
    "object-cover brightness-[.72] transition duration-[900ms] ease-out motion-safe:group-hover:scale-[1.05] group-hover:brightness-95 group-focus-visible:brightness-95";
  return (
    <Link
      href={href}
      data-reveal
      className={`group relative block min-w-0 overflow-hidden bg-[#111] transition-opacity duration-500 lg:group-hover/grid:[&:not(:hover)]:opacity-55 ${className}`}
    >
      {service.video ? (
        <LoopVideo
          src={service.video}
          poster={service.image}
          style={{ objectPosition: service.focus }}
          className={`absolute inset-0 size-full ${media}`}
        />
      ) : (
        <Image
          src={service.image}
          alt=""
          fill
          sizes="(max-width: 1023px) 100vw, 58vw"
          style={{ objectPosition: service.focus }}
          className={media}
        />
      )}
      <span className="absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-black/25" />
      <span className="absolute left-5 top-5 flex items-center gap-3 text-[10px] tracking-[.2em] text-white/75 sm:left-8 sm:top-8">
        {String(index + 1).padStart(2, "0")}
        <span
          aria-hidden="true"
          className="h-px w-8 origin-left bg-gold/70 transition-all duration-500 group-hover:w-16"
        />
      </span>
      <span className="absolute inset-x-5 bottom-6 sm:inset-x-8 sm:bottom-8">
        <span className="block text-[clamp(1.6rem,2.6vw,2.7rem)] font-light uppercase leading-[1.05] tracking-[-.02em] transition-transform duration-500 lg:group-hover:-translate-y-1">
          {service.title}
        </span>
        <span className="mt-3 block max-w-md text-sm leading-6 text-white/75">
          {service.description[locale]}
        </span>
        <span className="mt-5 flex min-h-11 items-center gap-3 text-[11px] tracking-[.14em] text-white/90">
          {more}
          <span
            aria-hidden="true"
            className="text-lg leading-none text-gold transition-transform duration-300 group-hover:translate-x-1.5"
          >
            →
          </span>
        </span>
      </span>
    </Link>
  );
}
