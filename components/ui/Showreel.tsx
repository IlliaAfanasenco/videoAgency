import type { Messages } from "@/messages/de";
import { Modal } from "./Modal";
import { Button } from "./Button";
export function Showreel({ t }: { t: Messages }) {
  return (
    <Modal
      title={t.reel.title}
      close={t.close}
      className="group inline-flex min-h-11 items-center gap-3 text-xs text-white/80"
      trigger={
        <>
          <span
            className="flex size-9 items-center justify-center rounded-full border border-white/40 transition-transform group-hover:scale-110"
            aria-hidden="true"
          >
            ▷
          </span>
          {t.hero.reel}
        </>
      }
    >
      <p className="mb-8 leading-7 text-white/65">{t.reel.text}</p>
      <Button href="#projects">{t.reel.action}</Button>
    </Modal>
  );
}
