import Image from "next/image";
import type { Messages } from "@/messages/de";
import { Heading } from "@/components/ui/SectionLabel";
import { Modal } from "@/components/ui/Modal";
import { ContactBrief } from "@/components/ui/ContactBrief";
export function FinalCta({ t }: { t: Messages }) {
  return (
    <section
      id="contact"
      className="relative isolate flex min-h-[560px] items-center justify-center overflow-hidden px-6 py-28 text-center lg:min-h-[720px]"
    >
      <Image
        data-parallax
        src="/images/mountain-cta.jpg"
        alt={t.contact.title.replace("\n", " ")}
        fill
        sizes="100vw"
        className="-z-30 scale-110 object-cover object-[center_45%]"
      />
      <div className="absolute inset-0 -z-20 bg-black/55" />
      <div data-reveal>
        <Heading className="text-[clamp(2.2rem,5.5vw,5.5rem)]">
          {t.contact.title}
        </Heading>
        <p className="mt-5 text-sm text-white/75">{t.contact.description}</p>
        <Modal
          title={t.contact.brief}
          close={t.close}
          className="mt-8 inline-flex min-h-12 items-center gap-7 rounded-full bg-white px-7 text-xs text-black transition hover:bg-white/80"
          trigger={
            <>
              {t.contact.action}
              <span aria-hidden="true">→</span>
            </>
          }
        >
          <ContactBrief t={t} />
        </Modal>
      </div>
    </section>
  );
}
