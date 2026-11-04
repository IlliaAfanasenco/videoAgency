import type { Messages } from "@/messages/de";
import { Logo } from "@/components/ui/Logo";
import { Modal } from "@/components/ui/Modal";
export function Footer({ t }: { t: Messages }) {
  return (
    <footer className="border-t border-white/10 px-6 py-8 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-[1480px] flex-col items-start justify-between gap-7 md:flex-row md:items-center">
        <a href="#top" aria-label="FRAME NO. 9 Home">
          <Logo />
        </a>
        <p className="text-[10px] text-white/45">{t.footer.tagline}</p>
        <div className="flex flex-wrap items-center gap-6 text-[10px] text-white/60">
          <Modal
            trigger={t.footer.legal}
            title={t.footer.legal}
            close={t.close}
          >
            <p className="leading-7 text-white/60">{t.footer.pending}</p>
          </Modal>
          <Modal
            trigger={t.footer.privacy}
            title={t.footer.privacy}
            close={t.close}
          >
            <p className="leading-7 text-white/60">{t.footer.privacyText}</p>
          </Modal>
          <a href="#top" className="flex min-h-11 items-center gap-3">
            {t.footer.top} ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
