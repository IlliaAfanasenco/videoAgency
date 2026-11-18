import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { PublishedCase } from "@/data/cases";
import { getService } from "@/data/services";

/** Compact case card (portfolio grid, related cases on service pages). */
export function CaseTile({
  item,
  locale,
  sampleLabel,
}: {
  item: PublishedCase;
  locale: Locale;
  sampleLabel: string;
}) {
  return (
    <Link
      href={`/${locale}/work/${item.slug}`}
      data-mock-case={item.mock ? "" : undefined}
      className="group relative block aspect-[4/3] overflow-hidden bg-[#111] sm:aspect-video"
    >
      <Image
        src={item.image}
        alt=""
        fill
        sizes="(max-width: 1023px) 100vw, 50vw"
        style={{ objectPosition: item.focus }}
        className="object-cover brightness-[.75] transition duration-[900ms] ease-out motion-safe:group-hover:scale-[1.04] group-hover:brightness-95"
      />
      <span className="absolute inset-0 bg-linear-to-t from-black/85 via-transparent to-black/20" />
      {item.mock && (
        <span className="absolute left-4 top-4 border border-white/40 px-2 py-1 text-[9px] uppercase tracking-[.18em] text-white/80">
          {sampleLabel}
        </span>
      )}
      <span className="absolute inset-x-5 bottom-5 sm:inset-x-7 sm:bottom-7">
        <span className="block text-[10px] uppercase tracking-[.18em] text-gold">
          {item.services.map((id) => getService(id).short).join(" · ")}
        </span>
        <span className="mt-2 block text-xl font-light sm:text-2xl">
          {item.title}
        </span>
      </span>
    </Link>
  );
}
