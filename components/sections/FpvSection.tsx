import Image from "next/image";
import type { Messages } from "@/messages/de";
import { Heading, SectionLabel } from "@/components/ui/SectionLabel";
import { Showreel } from "@/components/ui/Showreel";
export function FpvSection({ t }: { t: Messages }) {
  return (
    <section
      id="services"
      className="grid border-y border-white/10 lg:min-h-[550px] lg:grid-cols-[1.1fr_1fr]"
    >
      <div className="relative min-h-[340px] overflow-hidden sm:min-h-[460px]">
        <Image
          data-parallax
          src="/images/fpv-coast.jpg"
          alt={t.fpv.label}
          fill
          sizes="(max-width:1023px) 100vw, 53vw"
          className="scale-110 object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-transparent to-black/25" />
        <span className="absolute bottom-7 left-7 text-[9px] tracking-[.22em]">
          FPV / A DIFFERENT POINT OF VIEW
        </span>
      </div>
      <div
        data-reveal
        className="flex flex-col justify-center px-6 py-16 sm:px-10 lg:px-16 xl:px-20"
      >
        <SectionLabel>{t.fpv.label}</SectionLabel>
        <Heading>{t.fpv.title}</Heading>
        <p className="mt-6 max-w-sm text-sm leading-6 text-white/55">
          {t.fpv.description}
        </p>
        <div className="mt-8">
          <Showreel t={t} />
        </div>
        <div className="mt-10 grid max-w-md grid-cols-3 gap-4">
          {["120+", "100%", "4K+"].map((value, i) => (
            <div key={value}>
              <p className="text-3xl font-light tracking-tight">{value}</p>
              <p className="mt-1 text-[10px] text-white/45">
                {t.fpv.metrics[i]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
