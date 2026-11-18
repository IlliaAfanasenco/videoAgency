"use client";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const pad = (n: number) => String(n).padStart(2, "0");
const timecode = (sec: number) =>
  `00:00:${pad(Math.floor(sec) % 60)}:${pad(Math.floor(sec * 24) % 24)}`;

// Inner animation of one scene (duration 1, linear = driven 1:1 by whichever scroll range owns it).
function sceneTimeline(scene: HTMLElement) {
  const $ = gsap.utils.selector(scene);
  const tl = gsap.timeline({ defaults: { ease: "none" } });
  switch (Number(scene.dataset.scene)) {
    case 0:
      tl.fromTo(
        $("[data-s-img]"),
        { scale: 1.2, yPercent: -3 },
        { scale: 1.04, yPercent: 3, duration: 1 },
        0,
      )
        .fromTo(
          $("[data-s-grid]"),
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          0.05,
        )
        .fromTo(
          $("[data-s-reticle]"),
          { scale: 1.7, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" },
          0.1,
        )
        .fromTo(
          $("[data-s-scan]"),
          { yPercent: -100, opacity: 1 },
          { yPercent: 100, opacity: 1, duration: 0.9, ease: "power1.inOut" },
          0.05,
        );
      break;
    case 1:
      tl.fromTo(
        $("[data-panel]"),
        { opacity: 0, y: 26, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.3,
          stagger: 0.18,
          ease: "power2.out",
        },
        0.05,
      )
        .fromTo(
          $("[data-panel-shade]"),
          { opacity: 1 },
          { opacity: 0, duration: 0.3, stagger: 0.18 },
          0.25,
        )
        .fromTo(
          $("[data-panel-img]"),
          { scale: 1.2 },
          { scale: 1, duration: 0.8, stagger: 0.1 },
          0.05,
        )
        .fromTo(
          $("[data-sb-line]"),
          { scaleX: 0 },
          { scaleX: 1, duration: 0.8 },
          0.1,
        );
      break;
    case 2: {
      const tc = { v: 0 };
      const label = $("[data-tc]")[0] as HTMLElement | undefined;
      tl.fromTo(
        $("[data-s-media]"),
        { scale: 1.15 },
        { scale: 1, duration: 1 },
        0,
      )
        .fromTo(
          $("[data-s-vf]"),
          { scale: 1.08, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.35, ease: "power2.out" },
          0.05,
        )
        .fromTo(
          $("[data-s-rec]"),
          { opacity: 0 },
          { opacity: 1, duration: 0.2 },
          0.15,
        )
        .fromTo(
          $("[data-s-focus]"),
          { scale: 1.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" },
          0.2,
        )
        .to(
          tc,
          {
            v: 8.5,
            duration: 1,
            onUpdate: () => {
              if (label) label.textContent = timecode(tc.v);
            },
          },
          0,
        );
      break;
    }
    default:
      tl.fromTo(
        $("[data-s-img]"),
        { scale: 1.12 },
        { scale: 1, duration: 1 },
        0,
      )
        .fromTo(
          $("[data-s-grade]"),
          { opacity: 1 },
          { opacity: 0, duration: 0.8 },
          0,
        )
        .fromTo(
          $("[data-s-flash]"),
          { opacity: 0.5 },
          { opacity: 0, duration: 0.25, ease: "power2.out" },
          0.05,
        )
        .fromTo(
          $("[data-bar-top]"),
          { yPercent: -100 },
          { yPercent: 0, duration: 0.45, ease: "power3.out" },
          0.1,
        )
        .fromTo(
          $("[data-bar-bot]"),
          { yPercent: 100 },
          { yPercent: 0, duration: 0.45, ease: "power3.out" },
          0.1,
        )
        .fromTo(
          $("[data-s-frame]"),
          { scale: 1.05, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" },
          0.4,
        )
        .fromTo(
          $("[data-mark]"),
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
          0.6,
        );
  }
  return tl;
}

function desktop(root: HTMLElement) {
  const q = <T extends HTMLElement>(s: string) =>
    gsap.utils.toArray<T>(s, root);
  const panel = q("[data-pj-panel]")[0];
  const rail = q("[data-pj-rail]")[0];
  const fill = q("[data-pj-fill]")[0];
  const drone = q("[data-pj-drone]")[0];
  const head = q("[data-pj-head]")[0];
  const counter = q("[data-pj-counter]")[0];
  const scenes = q("[data-pj-stage] [data-scene]");
  const steps = q("[data-pj-panel] [data-pj-step]");
  const nodes = q("[data-pj-panel] [data-pj-node]");
  if (!panel || !rail || !fill || !drone || scenes.length !== 4) return;

  root.setAttribute("data-pj-ready", "");
  let current = -1;
  const setActive = (idx: number) => {
    if (idx === current) return;
    current = idx;
    steps.forEach((el, j) => el.classList.toggle("is-active", j === idx));
    nodes.forEach((el, j) => {
      el.classList.toggle("is-active", j === idx);
      el.classList.toggle("is-done", j <= idx);
    });
    if (counter) counter.textContent = `0${idx + 1} / 04`;
  };
  setActive(0);

  const railW = () => rail.offsetWidth;
  const master = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: panel,
      start: "top top",
      end: "+=240%",
      pin: true,
      pinSpacing: true,
      scrub: 0.6,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
    onUpdate: () => setActive(Math.min(3, Math.floor(master.time() + 0.2))),
  });

  // Four units of timeline = four steps; step i starts at t = i and sits at node i (0, 25, 50, 75% of the rail).
  // Fill and drone share one linear tween so they stay locked together to the pixel.
  master
    .fromTo(fill, { scaleX: 0 }, { scaleX: 1, duration: 4 }, 0)
    .fromTo(drone, { x: 0 }, { x: () => railW(), duration: 4 }, 0)
    .fromTo(
      drone.querySelector("img"),
      { rotation: -14 },
      { rotation: 14, duration: 4 },
      0,
    )
    .to(
      drone,
      { y: -5, duration: 0.5, repeat: 7, yoyo: true, ease: "sine.inOut" },
      0,
    )
    .to(head, { yPercent: -10, opacity: 0.45, duration: 4 }, 0);

  scenes.forEach((scene, i) => {
    if (i > 0)
      master.fromTo(
        scene,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.3 },
        i - 0.3,
      );
    master.add(sceneTimeline(scene), Math.max(0, i - 0.3));
  });

  return () => {
    root.removeAttribute("data-pj-ready");
    steps.forEach((el) => el.classList.remove("is-active"));
    nodes.forEach((el) => el.classList.remove("is-active", "is-done"));
  };
}

function mobile(root: HTMLElement) {
  const q = <T extends HTMLElement>(s: string, scope: HTMLElement = root) =>
    gsap.utils.toArray<T>(s, scope);
  const list = q("[data-pj-list]")[0];
  const fill = q("[data-pj-mfill]")[0];
  const drone = q("[data-pj-mdrone]")[0];
  const cards = q("[data-pj-card]");
  if (!list || !fill || !drone || !cards.length) return;

  root.setAttribute("data-pj-ready", "");

  // Vertical gold progress + drone sliding down the rail, one scrubbed timeline for the whole list.
  gsap
    .timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: list,
        start: "top 65%",
        end: "bottom 65%",
        scrub: true,
        invalidateOnRefresh: true,
      },
    })
    .fromTo(fill, { scaleY: 0 }, { scaleY: 1 }, 0)
    .fromTo(drone, { y: 0 }, { y: () => list.offsetHeight }, 0);

  cards.forEach((card) => {
    const media = q("[data-pj-media]", card)[0];
    const step = q("[data-pj-step]", card)[0];
    const node = q("[data-pj-node]", card)[0];
    const scene = q("[data-scene]", card)[0];

    ScrollTrigger.create({
      trigger: card,
      start: "top 62%",
      end: "bottom 62%",
      toggleClass: { targets: [step, node], className: "is-active" },
      onEnter: () => node.classList.add("is-done"),
      onLeaveBack: () => node.classList.remove("is-done"),
    });
    // Reveal in both directions: media wipes open, text rises (children only; the step itself carries the dimming).
    gsap.from(media, {
      clipPath: "inset(0 0 100% 0)",
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 88%",
        toggleActions: "play none none reverse",
      },
    });
    gsap.from(Array.from(step.children), {
      y: 22,
      opacity: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
    // Scene micro-animation follows the card's own scroll range.
    if (scene)
      gsap
        .timeline({
          scrollTrigger: {
            trigger: media,
            start: "top 85%",
            end: "bottom 35%",
            scrub: 0.5,
          },
        })
        .add(sceneTimeline(scene));
  });

  return () => {
    root.removeAttribute("data-pj-ready");
    root
      .querySelectorAll(".is-active, .is-done")
      .forEach((el) => el.classList.remove("is-active", "is-done"));
  };
}

// Single owner of every PROCESS animation (replaces the old static list): one gsap.matchMedia,
// everything created inside it is reverted (and its ScrollTriggers/pin killed) on breakpoint change or unmount.
export function ProcessAnimation() {
  useEffect(() => {
    const root = document.getElementById("approach");
    if (!root) return;
    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => desktop(root),
    );
    mm.add(
      "(max-width: 1023.98px) and (prefers-reduced-motion: no-preference)",
      () => mobile(root),
    );
    return () => mm.revert();
  }, []);
  return null;
}
