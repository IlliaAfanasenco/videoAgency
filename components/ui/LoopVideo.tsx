"use client";
import { useEffect, useRef } from "react";

// Muted looping clip for cards. Plays only near the viewport; the poster behind it is the fallback
// when autoplay is blocked or reduced motion is on.
export function LoopVideo({
  src,
  poster,
  className = "",
  style,
}: {
  src: string;
  poster: string;
  className?: string;
  style?: React.CSSProperties;
}) {
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
      { rootMargin: "150px 0px" },
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
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        style={style}
        className={className}
      />
      <video
        ref={ref}
        src={src}
        style={style}
        className={className}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
      />
    </>
  );
}
