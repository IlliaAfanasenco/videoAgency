import Image from "next/image";
import type { Service } from "@/data/services";

export function ServiceCard({
  service,
  index,
  more,
  className = "",
}: {
  service: Service;
  index: number;
  more: string;
  className?: string;
}) {
  const Tag = service.href ? "a" : "div";
  return (
    <Tag
      {...(service.href ? { href: service.href } : {})}
      data-reveal
      className={`group relative block min-w-0 overflow-hidden bg-[#111] ${className}`}
    >
      <Image
        src={service.image}
        alt=""
        fill
        sizes="(max-width: 1023px) 100vw, 58vw"
        style={{ objectPosition: service.focus }}
        className="object-cover brightness-[.72] transition duration-[900ms] ease-out motion-safe:group-hover:scale-[1.04] group-hover:brightness-90"
      />
      <span className="absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-black/25" />
      <span className="absolute left-5 top-5 text-[10px] tracking-[.2em] text-white/70 sm:left-8 sm:top-8">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="absolute inset-x-5 bottom-6 sm:inset-x-8 sm:bottom-8">
        <span className="block text-[clamp(1.6rem,2.6vw,2.7rem)] font-light uppercase leading-[1.05] tracking-[-.02em]">
          {service.title}
        </span>
        <span className="mt-3 block text-sm text-white/70">
          {service.subtitle}
        </span>
        {service.href && (
          <span className="mt-6 flex min-h-11 items-center gap-3 text-[11px] tracking-[.14em] text-white/85">
            {more}
            <span
              aria-hidden="true"
              className="text-lg leading-none transition-transform duration-300 group-hover:translate-x-1.5"
            >
              →
            </span>
          </span>
        )}
      </span>
    </Tag>
  );
}
