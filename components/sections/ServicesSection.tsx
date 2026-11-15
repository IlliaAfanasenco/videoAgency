import type { Messages } from "@/messages/de";
import { services } from "@/data/services";
import { Heading, SectionLabel } from "@/components/ui/SectionLabel";
import { ServiceCard } from "@/components/ui/ServiceCard";

// Editorial composition on desktop (alternating wide/narrow, offset rows); stacked on mobile.
const layout = [
  "lg:col-span-7 lg:h-[680px]",
  "lg:col-span-5 lg:h-[680px] lg:mt-28",
  "lg:col-span-5 lg:h-[580px]",
  "lg:col-span-7 lg:h-[580px] lg:mt-28",
];

export function ServicesSection({ t }: { t: Messages }) {
  return (
    <section
      id="services"
      className="mx-auto max-w-[1600px] px-6 py-24 sm:px-10 lg:px-20 lg:py-36"
    >
      <div data-reveal className="mb-14 lg:mb-24">
        <SectionLabel>{t.services.label}</SectionLabel>
        <Heading>{t.services.title}</Heading>
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-8">
        {services.map((service, i) => (
          <ServiceCard
            key={service.slug}
            service={service}
            index={i}
            more={t.services.more}
            className={`h-[440px] sm:h-[520px] ${layout[i]}`}
          />
        ))}
      </div>
    </section>
  );
}
