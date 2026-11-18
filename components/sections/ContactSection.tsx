import type { Messages } from "@/messages/de";
import type { Locale } from "@/lib/i18n";
import { contactInfo } from "@/data/contact";
import { Heading, SectionLabel } from "@/components/ui/SectionLabel";
import { ContactForm } from "@/components/ui/ContactForm";

export function ContactSection({ t, locale }: { t: Messages; locale: Locale }) {
  const hasInfo = contactInfo.email || contactInfo.instagram;
  return (
    <section
      id="contact"
      className="container-x grid gap-12 py-(--section-y) lg:grid-cols-[1fr_1fr] lg:gap-24"
    >
      <div data-reveal>
        <SectionLabel index={6}>{t.nav[4]}</SectionLabel>
        <Heading className="text-[clamp(2.4rem,5.2vw,5.4rem)]">
          {t.contact.title}
        </Heading>
        <p className="mt-8 max-w-md text-base leading-8 text-white/65">
          {t.contact.text}
        </p>
        <p className="mt-8 text-lg font-light text-white/90">
          {t.contact.slogan}
        </p>
        {hasInfo && (
          <div className="mt-10 border-t border-white/12 pt-6 text-sm">
            <p className="mb-3 text-[10px] tracking-[.2em] text-white/40">
              {t.contact.direct.toUpperCase()}
            </p>
            <ul className="space-y-1">
              {contactInfo.email && (
                <li>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="inline-flex min-h-11 items-center underline-offset-4 hover:underline"
                  >
                    {contactInfo.email}
                  </a>
                </li>
              )}
              {contactInfo.instagram && (
                <li>
                  <a
                    href={contactInfo.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center underline-offset-4 hover:underline"
                  >
                    {t.contact.instagram}
                  </a>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
      {/* id: target of the floating CTA (scroll-padding on <html> keeps it clear of the header).
          Kept outside the data-reveal wrapper so its position is not offset by the reveal transform. */}
      <div id="contact-form" tabIndex={-1} className="outline-none">
        <div data-reveal>
          <ContactForm t={t} locale={locale} />
        </div>
      </div>
    </section>
  );
}
