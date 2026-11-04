"use client";
import { useEffect, useRef, useState } from "react";
import type { Messages } from "@/messages/de";
import type { Locale } from "@/lib/i18n";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { gsap } from "@/lib/gsap";
const anchors = ["top", "projects", "services", "about", "contact"];
export function Header({ t, locale }: { t: Messages; locale: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDialogElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const update = () => {
      // Mobile: stay transparent for as long as the hero (pinned or not) still covers the
      // area under the header; switch only once it has actually scrolled out of the way.
      const hero = document.getElementById("top");
      if (hero && window.matchMedia("(max-width: 1023px)").matches) {
        const headerHeight =
          document.querySelector("header")?.getBoundingClientRect().height ??
          80;
        setScrolled(hero.getBoundingClientRect().bottom <= headerHeight);
      } else {
        setScrolled(window.scrollY > 30);
      }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    const opener = toggle.current;
    const dialog = panel.current;
    dialog?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.from("[data-menu-link]", {
          y: 35,
          opacity: 0,
          duration: 0.7,
          stagger: 0.07,
          ease: "power3.out",
        });
      }, dialog!);
      return () => ctx.revert();
    });
    return () => {
      mm.revert();
      dialog?.close();
      document.body.style.overflow = overflow;
      opener?.focus();
    };
  }, [open]);
  const languages = (
    <div className="flex items-center gap-3 text-[10px]">
      {(["de", "en"] as const).map((l) => (
        <a
          key={l}
          href={`/${l}`}
          lang={l}
          hrefLang={l}
          aria-current={locale === l ? "page" : undefined}
          className={
            locale === l
              ? "text-white"
              : "text-white/40 transition hover:text-white"
          }
        >
          {l.toUpperCase()}
        </a>
      ))}
    </div>
  );
  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition duration-500 ${scrolled ? "border-b border-white/10 bg-[#050505]/85 backdrop-blur-xl" : "bg-transparent"}`}
    >
      <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6 sm:px-10 lg:px-16">
        <a href="#top" aria-label="FRAME NO. 9 Home">
          <Logo />
        </a>
        <nav aria-label={t.menu} className="hidden items-center gap-7 xl:flex">
          {t.nav.map((label, i) => (
            <a
              key={label}
              href={`#${anchors[i]}`}
              className="text-[11px] text-white/60 transition hover:text-white"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-7 xl:flex">
          {languages}
          <Button href="#contact" className="min-h-9 px-4 py-2 text-[10px]">
            {t.request}
          </Button>
        </div>
        <button
          ref={toggle}
          onClick={() => setOpen(true)}
          aria-label={t.menu}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="flex size-11 flex-col items-center justify-center gap-1.5 xl:hidden"
        >
          <span className="h-px w-6 bg-white" />
          <span className="h-px w-6 bg-white" />
        </button>
      </div>
      <dialog
        aria-label={t.menu}
        id="mobile-menu"
        ref={panel}
        onCancel={() => setOpen(false)}
        className="fixed inset-0 m-0 h-[100svh] max-h-none w-screen max-w-none bg-[#080909] px-7 py-6 text-white backdrop:bg-black"
        data-lenis-prevent
      >
        <div className="flex items-center justify-between">
          <Logo />
          <button
            aria-label={t.close}
            onClick={() => setOpen(false)}
            className="size-11 text-3xl"
          >
            ×
          </button>
        </div>
        <nav aria-label={t.menu} className="mt-[12svh] flex flex-col gap-6">
          {t.nav.map((label, i) => (
            <a
              data-menu-link
              key={label}
              href={`#${anchors[i]}`}
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-5 text-[clamp(2rem,7vw,4rem)] font-light tracking-tight"
            >
              <span className="text-xs text-white/35">0{i + 1}</span>
              {label}
            </a>
          ))}
        </nav>
        <div className="mt-12 border-t border-white/15 pt-7">{languages}</div>
      </dialog>
    </header>
  );
}
