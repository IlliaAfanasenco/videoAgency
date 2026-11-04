"use client";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
export function Motion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const lenis = new Lenis({ anchors: true, duration: 1.15 });
      const tick = (time: number) => lenis.raf(time * 1000);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      const ctx = gsap.context(() => {
        gsap.from("[data-hero-video]", {
          scale: 1.06,
          duration: 2.2,
          ease: "power2.out",
        });
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from("[data-eyebrow]", { opacity: 0, y: 12, duration: 0.8 })
          .from(
            "[data-title-line]",
            { yPercent: 110, duration: 1.3, stagger: 0.13 },
            0.15,
          )
          .from(
            "[data-hero-copy]",
            { opacity: 0, y: 18, duration: 1, stagger: 0.15 },
            0.7,
          );
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) =>
          gsap.from(el, {
            y: 35,
            opacity: 0,
            duration: 1.1,
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          }),
        );
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) =>
          gsap.fromTo(
            el,
            { yPercent: -4 },
            {
              yPercent: 4,
              ease: "none",
              scrollTrigger: {
                trigger: el.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            },
          ),
        );
      }, root);
      return () => {
        ctx.revert();
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    });
    // Hero is pinned while one master timeline drives the media zoom, the drone along the route,
    // the line drawing and the text fade. Same timeline for desktop and mobile; each uses its own SVG.
    const flight = (kind: "desktop" | "mobile", end: string) => {
      const svg = root.current?.querySelector(`[data-hero-svg="${kind}"]`);
      const route = svg?.querySelector<SVGPathElement>("[data-route]");
      const drone = svg?.querySelector<SVGGElement>("[data-drone]");
      const spin = drone?.querySelector<SVGGElement>("[data-drone-spin]");
      if (!route || !drone) return;
      const image = svg?.querySelector<SVGImageElement>("image");
      const follow = root.current?.querySelector<HTMLElement>(
        "[data-drone-follow]",
      );
      const followSpin = follow?.querySelector<HTMLElement>(
        "[data-drone-follow-spin]",
      );
      // Cursor follow only on desktop layouts with a real mouse.
      const canFollow =
        kind === "desktop" &&
        !!svg &&
        !!image &&
        !!follow &&
        !!followSpin &&
        window.matchMedia("(pointer: fine) and (hover: hover)").matches;
      const length = route.getTotalLength();
      // Outer <g> only translates along the route; the inner <g data-drone-spin> only spins.
      const place = (progress: number) => {
        const p = route.getPointAtLength(length * progress);
        drone.setAttribute(
          "transform",
          `translate(${p.x.toFixed(2)} ${p.y.toFixed(2)})`,
        );
        route.style.strokeDashoffset = String(1 - progress);
      };
      // Without JS (or if this never runs) the SVG stays fully visible; the draw-on state is applied here.
      let cleanupFollow: (() => void) | undefined;
      const initialTransform = drone.getAttribute("transform") ?? "";
      route.style.strokeDasharray = "1";
      place(0);
      const ctx = gsap.context(() => {
        gsap.fromTo(
          drone,
          { opacity: 0 },
          { opacity: 1, duration: 1, delay: 1.2 },
        );
        // Constant spin around the drone's own centre (inner group origin = 0,0), independent of scroll.
        if (spin)
          gsap.to(spin, {
            rotation: 360,
            svgOrigin: "0 0",
            duration: 8,
            ease: "none",
            repeat: -1,
          });
        // Same spin on the fixed twin, created at the same moment so both stay in phase.
        if (canFollow && followSpin)
          gsap.to(followSpin, {
            rotation: 360,
            duration: 8,
            ease: "none",
            repeat: -1,
          });

        // --- Hand-off between the SVG drone and the fixed cursor-follow drone ---
        type Mode = "svg" | "follow" | "returning";
        let mode: Mode = "svg";
        let size = 0;
        let pointer: { x: number; y: number } | null = null;
        let qx: ((v: number) => unknown) | undefined;
        let qy: ((v: number) => unknown) | undefined;
        let returnStart = 0;
        if (canFollow && follow) {
          qx = gsap.quickTo(follow, "x", { duration: 0.7, ease: "power3.out" });
          qy = gsap.quickTo(follow, "y", { duration: 0.7, ease: "power3.out" });
        }
        const svgCenter = () => {
          const r = image!.getBoundingClientRect();
          return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
        };
        // On-screen size of the SVG drone (viewBox units -> CSS px).
        const svgSize = () =>
          Number(image!.getAttribute("width")) *
          ((svg as SVGSVGElement).getScreenCTM()?.a ?? 1);
        const clamp = (v: number, max: number) => {
          const m = size * 0.55; // rotor-tip radius: keep the whole drone on screen
          return Math.min(Math.max(v, m), Math.max(m, max - m));
        };
        const aim = (x: number, y: number) => {
          qx?.(clamp(x, innerWidth) - size / 2);
          qy?.(clamp(y, innerHeight) - size / 2);
        };
        const enterFollow = () => {
          const c = svgCenter();
          size = svgSize();
          const inside =
            c.x >= 0 && c.x <= innerWidth && c.y >= 0 && c.y <= innerHeight;
          const sx = inside ? c.x : clamp(c.x, innerWidth);
          const sy = inside ? c.y : clamp(c.y, innerHeight);
          // 1) place the fixed drone exactly on top of the SVG drone ...
          gsap.set(follow!, {
            width: size,
            height: size,
            x: sx - size / 2,
            y: sy - size / 2,
          });
          // 2) ... and only then swap which one is visible (same frame, same position/size/phase).
          follow!.style.visibility = "visible";
          drone.style.visibility = "hidden";
          mode = "follow";
          if (pointer) aim(pointer.x, pointer.y); // 3) glide toward the cursor
        };
        const finishReturn = () => {
          drone.style.visibility = "";
          follow!.style.visibility = "hidden";
          mode = "svg";
          gsap.ticker.remove(returnStep);
        };
        const returnStep = () => {
          if (mode !== "returning") return gsap.ticker.remove(returnStep);
          const c = svgCenter();
          aim(c.x, c.y);
          const cx = Number(gsap.getProperty(follow!, "x")) + size / 2;
          const cy = Number(gsap.getProperty(follow!, "y")) + size / 2;
          if (
            Math.hypot(cx - c.x, cy - c.y) < 3 ||
            performance.now() - returnStart > 1500
          )
            finishReturn();
        };
        const leave = () => {
          if (!canFollow) return;
          if (mode === "svg") enterFollow();
          else if (mode === "returning") {
            gsap.ticker.remove(returnStep);
            mode = "follow";
            if (pointer) aim(pointer.x, pointer.y);
          }
        };
        const enterBack = () => {
          if (!canFollow || mode !== "follow") return;
          mode = "returning";
          returnStart = performance.now();
          gsap.ticker.add(returnStep);
        };
        const onMove = (e: PointerEvent) => {
          if (e.pointerType !== "mouse") return;
          pointer = { x: e.clientX, y: e.clientY };
          if (mode === "follow") aim(pointer.x, pointer.y);
        };
        const onResize = () => {
          if (mode === "svg") return;
          size = svgSize();
          gsap.set(follow!, { width: size, height: size });
          const t = mode === "follow" && pointer ? pointer : svgCenter();
          aim(t.x, t.y);
        };
        if (canFollow) {
          window.addEventListener("pointermove", onMove, { passive: true });
          window.addEventListener("resize", onResize);
          cleanupFollow = () => {
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("resize", onResize);
            gsap.ticker.remove(returnStep);
          };
        }

        const state = { p: 0 };
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: "#top",
            start: "top top",
            end,
            pin: true,
            pinSpacing: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: 1,
            onLeave: leave,
            onEnterBack: enterBack,
            // Page (re)loaded already scrolled past the hero: go straight to follow mode.
            onRefresh: (self) => {
              if (canFollow && mode === "svg" && self.scroll() > self.end)
                enterFollow();
            },
          },
        });
        tl.fromTo(
          "[data-hero-media]",
          { scale: 1 },
          { scale: 1.15, duration: 1 },
          0,
        )
          .to(state, { p: 1, duration: 1, onUpdate: () => place(state.p) }, 0)
          .to(
            "[data-hero-content], [data-hero-fade]",
            { opacity: 0, yPercent: -8, duration: 0.3 },
            0.55,
          );
      }, root);
      return () => {
        cleanupFollow?.();
        ctx.revert();
        if (follow) {
          follow.style.visibility = "";
          gsap.set(follow, { clearProps: "all" });
        }
        drone.style.visibility = "";
        route.style.strokeDasharray = "";
        route.style.strokeDashoffset = "";
        drone.style.opacity = "";
        drone.setAttribute("transform", initialTransform);
      };
    };
    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => flight("desktop", "+=300%"),
    );
    // Skipped on short landscape screens: a pinned hero taller than the viewport would be cut off.
    mm.add(
      "(max-width: 1023px) and (min-height: 600px) and (prefers-reduced-motion: no-preference)",
      () => flight("mobile", "+=250%"),
    );
    // Reduced motion: nothing to do. The SVG's default state is a static composition
    // (whole route drawn, drone at the start), so it stays visible without any animation.
    return () => mm.revert();
  }, []);
  return (
    <div ref={root}>
      {children}
      {/* Cursor-follow drone: a viewport-fixed twin of the hero SVG drone (desktop + mouse only).
          Kept hidden until the hero scroll ends; never intercepts pointer events. */}
      <div
        data-drone-follow
        aria-hidden="true"
        className="pointer-events-none invisible fixed top-0 left-0 z-30"
      >
        <div data-drone-follow-spin className="size-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/dji-matrice.webp"
            alt=""
            draggable={false}
            className="size-full select-none"
          />
        </div>
      </div>
    </div>
  );
}
