import type { Messages } from "@/messages/de";
import type { Locale } from "@/lib/i18n";
import { services, serviceHref } from "@/data/services";
import { Heading, SectionLabel } from "@/components/ui/SectionLabel";
import { ServiceCard } from "@/components/ui/ServiceCard";

// Editorial composition on desktop: three rows of alternating wide/narrow cards (7/5, 5/7, 7/5);
// the right-hand card of each row is offset downwards. Stacked, full-size cards below lg.
const layout = [
  "lg:col-span-7 lg:h-[640px]",
  "lg:col-span-5 lg:h-[640px] lg:mt-24",
  "lg:col-span-5 lg:h-[560px]",
  "lg:col-span-7 lg:h-[560px] lg:mt-24",
  "lg:col-span-7 lg:h-[640px]",
  "lg:col-span-5 lg:h-[640px] lg:mt-24",
];

export function ServicesSection({
  t,
  locale,
}: {
  t: Messages;
  locale: Locale;
}) {
  return (
    <section id="services" className="container-x py-(--section-y)">
      <div data-reveal className="mb-14 lg:mb-24">
        <SectionLabel index={2}>{t.services.label}</SectionLabel>
        <Heading>{t.services.title}</Heading>
      </div>
      <div className="group/grid grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-8">
        {services.map((service, i) => (
          <ServiceCard
            key={service.id}
            service={service}
            index={i}
            locale={locale}
            href={serviceHref(service, locale)}
            more={t.services.more}
            className={`h-[440px] sm:h-[520px] ${layout[i]}`}
          />
        ))}
      </div>
    </section>
  );
}
