import type { Messages } from "@/messages/de";
import { Heading, SectionLabel } from "@/components/ui/SectionLabel";
import { ServicesList } from "@/components/ui/ServicesList";
export function ServicesSection({ t }: { t: Messages }) {
  return (
    <section
      id="services"
      className="mx-auto max-w-[1600px] px-6 py-24 sm:px-10 lg:px-20 lg:py-36"
    >
      <div data-reveal className="mb-16 lg:mb-24">
        <SectionLabel>{t.services.label}</SectionLabel>
        <Heading>{t.services.title}</Heading>
      </div>
      <ServicesList items={t.services.items} />
    </section>
  );
}
