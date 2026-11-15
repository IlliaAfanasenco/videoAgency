"use client";
import { useEffect, useRef } from "react";

const DESKTOP = {
  src: "/videos/about-car-desktop.mp4",
  poster: "/videos/about-car-desktop-poster.jpg",
};
const MOBILE = {
  src: "/videos/about-car-mobile.mp4",
  poster: "/videos/about-car-mobile-poster.jpg",
};

// Muted looping clip that only plays while near the viewport. The poster <picture> sits behind the
// (transparent until playing) video and is the fallback if autoplay is blocked or reduced motion is on.
export function ShowcaseVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let near = false;
    const sync = () => {
      if (near && !reduced.matches && !document.hidden)
        v.play().catch(() => {});
      else v.pause();
    };
    const io = new IntersectionObserver(
      ([e]) => {
        near = e.isIntersecting;
        sync();
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(v);
    reduced.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      reduced.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <>
      <picture>
        <source media="(max-width: 767px)" srcSet={MOBILE.poster} />
        <img
          src={DESKTOP.poster}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 size-full object-cover"
        />
      </picture>
      <video
        ref={ref}
        data-showcase-video
        className="absolute inset-0 size-full object-cover"
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src={MOBILE.src} media="(max-width: 767px)" type="video/mp4" />
        <source src={DESKTOP.src} type="video/mp4" />
      </video>
    </>
  );
}
