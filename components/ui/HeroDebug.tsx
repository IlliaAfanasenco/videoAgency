"use client";
import { useEffect, useState, useSyncExternalStore } from "react";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Temporary on-screen diagnostics. Only active with `?debugHero=1`.
 * If this panel never appears on a device, client JavaScript did not hydrate.
 */
export function HeroDebug() {
  const on = useSyncExternalStore(
    () => () => {},
    () => new URLSearchParams(window.location.search).get("debugHero") === "1",
    () => false,
  );
  const [lines, setLines] = useState<string[]>([]);
  const [img, setImg] = useState("loading…");

  useEffect(() => {
    if (!on) return;
    const probe = new Image();
    probe.onload = () =>
      setImg(`loaded ${probe.naturalWidth}x${probe.naturalHeight}`);
    probe.onerror = () => setImg("ERROR (not loaded)");
    probe.src = "/images/dji-matrice.webp";
    const collect = () => {
      const out: string[] = [];
      const mq = (q: string) => window.matchMedia(q).matches;
      out.push("hydrated: yes (JS running)");
      out.push(
        `viewport: ${innerWidth}x${innerHeight} dpr ${devicePixelRatio}`,
      );
      out.push(
        `reduced-motion: ${mq("(prefers-reduced-motion: reduce)")} | max-w1023: ${mq("(max-width: 1023px)")} | min-h600: ${mq("(min-height: 600px)")}`,
      );
      (["mobile", "desktop"] as const).forEach((kind) => {
        const svg = document.querySelector<SVGSVGElement>(
          `[data-hero-svg="${kind}"]`,
        );
        if (!svg) return out.push(`${kind} svg: NOT IN DOM`);
        const cs = getComputedStyle(svg);
        const r = svg.getBoundingClientRect();
        let minOpacity = 1;
        for (let n: Element | null = svg; n; n = n.parentElement)
          minOpacity = Math.min(
            minOpacity,
            parseFloat(getComputedStyle(n).opacity),
          );
        out.push(
          `${kind} svg: display ${cs.display} vis ${cs.visibility} op ${cs.opacity} (min anc ${minOpacity}) size ${Math.round(r.width)}x${Math.round(r.height)}`,
        );
        const route = svg.querySelector<SVGPathElement>("[data-route]");
        const drone = svg.querySelector<SVGGElement>("[data-drone]");
        const image = svg.querySelector("image");
        out.push(
          `  route: ${route ? `dashoffset ${route.style.strokeDashoffset || "none"}` : "missing"} | drone g: ${drone ? `op ${getComputedStyle(drone).opacity}` : "missing"} | <image>: ${image ? "yes" : "missing"}`,
        );
      });
      out.push(`dji-matrice.webp: ${img}`);
      const hero = document.querySelector<HTMLElement>("#top");
      const triggers = ScrollTrigger.getAll();
      out.push(
        `ScrollTrigger: ${triggers.length} active | pinned: ${triggers.some((t) => t.pin)} | hero position: ${hero ? getComputedStyle(hero).position : "?"} | progress: ${triggers[0] ? triggers[0].progress.toFixed(2) : "-"}`,
      );
      const v = document.querySelector<HTMLVideoElement>("#top video");
      out.push(
        v
          ? `video: ${v.currentSrc.split("/").pop()} paused ${v.paused} t ${v.currentTime.toFixed(1)}`
          : "video: missing",
      );
      setLines(out);
    };
    collect();
    const id = window.setInterval(collect, 700);
    return () => window.clearInterval(id);
  }, [on, img]);

  if (!on) return null;
  return (
    <pre className="pointer-events-none fixed inset-x-1 top-24 z-[60] max-h-[60svh] overflow-hidden whitespace-pre-wrap break-words rounded bg-black/85 p-2 font-mono text-[9px] leading-tight text-lime-300">
      {lines.join("\n")}
    </pre>
  );
}
