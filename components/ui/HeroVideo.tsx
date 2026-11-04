"use client";
import { useEffect, useRef } from "react";

const DESKTOP = {
  src: "/videos/showreel-desktop.mp4",
  poster: "/videos/showreel-desktop-poster.jpg",
};
const MOBILE = {
  src: "/videos/showreel-mobile.mp4",
  poster: "/videos/showreel-mobile-poster.jpg",
};

/**
 * Fullscreen showreel. The browser picks exactly one <source> via `media`
 * (the other file is never requested). `poster` has no media-query support,
 * so a <picture> sits behind the transparent video and doubles as the
 * fallback if autoplay is blocked or the file fails to load.
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // React does not always reflect `muted` as an attribute; iOS needs it to autoplay.
    v.muted = true;
    v.defaultMuted = true;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const start = () => {
      if (reduced.matches) {
        v.pause();
        return;
      }
      v.play().catch(() => {
        // Autoplay blocked (e.g. low-power mode): keep the poster and retry on first gesture.
        const retry = () => {
          if (!reduced.matches) v.play().catch(() => {});
        };
        window.addEventListener("pointerdown", retry, { once: true });
        window.addEventListener("touchstart", retry, { once: true });
      });
    };
    start();

    const onChange = () => (reduced.matches ? v.pause() : start());
    reduced.addEventListener("change", onChange);
    // Pause when the tab is hidden to save battery.
    const onVisibility = () => {
      if (document.hidden) v.pause();
      else if (!reduced.matches) v.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      reduced.removeEventListener("change", onChange);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div data-hero-video className="absolute inset-0">
      <picture>
        <source media="(max-width: 767px)" srcSet={MOBILE.poster} />
        <img
          src={DESKTOP.poster}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src={MOBILE.src} media="(max-width: 767px)" type="video/mp4" />
        <source src={DESKTOP.src} type="video/mp4" />
      </video>
    </div>
  );
}
