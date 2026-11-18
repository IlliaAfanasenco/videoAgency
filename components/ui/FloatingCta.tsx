"use client";
import { useEffect, useState } from "react";

// Floating "talk to us" pill. Shown once the hero is behind you, hidden again while the contact form
// is on screen or the mobile menu is open. Pure IntersectionObserver (no scroll handlers, no GSAP),
// so it cannot interfere with ScrollTrigger pins. The link is a plain anchor to the existing form:
// Lenis (anchors) or the browser performs the scroll, honouring scroll-padding-top and reduced motion.
export function FloatingCta({ label }: { label: string }) {
  const [heroGone, setHeroGone] = useState(false);
  const [formNear, setFormNear] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    const form = document.getElementById("contact-form");
    const menu = document.getElementById("mobile-menu");
    const observers: IntersectionObserver[] = [];
    if (hero) {
      const io = new IntersectionObserver(([e]) =>
        // Gone = fully scrolled past upwards (a pinned hero still counts as visible).
        setHeroGone(!e.isIntersecting && e.boundingClientRect.bottom <= 0),
      );
      io.observe(hero);
      observers.push(io);
    }
    if (form) {
      // Bottom margin: start hiding slightly before the form enters the screen.
      const io = new IntersectionObserver(
        ([e]) => setFormNear(e.isIntersecting),
        {
          rootMargin: "0px 0px 20% 0px",
        },
      );
      io.observe(form);
      observers.push(io);
    }
    let mo: MutationObserver | undefined;
    if (menu) {
      const sync = () => setMenuOpen(menu.hasAttribute("open"));
      mo = new MutationObserver(sync);
      mo.observe(menu, { attributes: true, attributeFilter: ["open"] });
      sync();
    }
    return () => {
      observers.forEach((o) => o.disconnect());
      mo?.disconnect();
    };
  }, []);

  const visible = heroGone && !formNear && !menuOpen;
  return (
    <a
      href="#contact-form"
      // Plain anchor does the scroll; also move focus to the form so keyboard / screen-reader users land in it.
      onClick={() =>
        document.getElementById("contact-form")?.focus({ preventScroll: true })
      }
      inert={!visible}
      className={`group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-30 inline-flex min-h-12 items-center gap-3 rounded-full bg-gold/95 py-3 pl-6 pr-5 text-xs font-medium tracking-[.02em] text-[#0a0a0a] shadow-[0_12px_32px_-10px_rgb(0_0_0/.75),0_0_0_1px_rgb(255_255_255/.08)] transition duration-500 ease-out hover:bg-[#d8bb82] hover:shadow-[0_14px_36px_-10px_rgb(0_0_0/.85),0_0_0_1px_rgb(255_255_255/.12)] focus-visible:bg-[#d8bb82] sm:right-6 sm:bottom-6 sm:text-[13px] lg:right-8 lg:bottom-8 ${visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
    >
      {label}
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 12 12 4M5.5 4H12v6.5" />
      </svg>
    </a>
  );
}
