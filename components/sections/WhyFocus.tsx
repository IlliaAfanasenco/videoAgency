"use client";
import { useCallback, useEffect, useRef, useState } from "react";

type Item = { title: string; text: string };

const pad = (n: number) => String(n).padStart(2, "0");

// Scroll-linked focus: an IntersectionObserver band around the viewport middle picks the active row.
// No pin, no scroll handler, no ScrollTrigger: nothing to clean up beyond the observers.
export function WhyFocus({
  items,
  closing,
  action,
  head,
  total,
}: {
  items: Item[];
  closing: string;
  action: string;
  head: React.ReactNode;
  total: number;
}) {
  const [active, setActive] = useState(0);
  const list = useRef<HTMLOListElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const rows = useRef<(HTMLLIElement | null)[]>([]);

  // Active row = the one crossing a thin band at ~50% (desktop) / ~42% (mobile) of the viewport.
  useEffect(() => {
    const els = rows.current.filter((r): r is HTMLLIElement => !!r);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting)
            setActive(els.indexOf(e.target as HTMLLIElement));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Move the focus frame onto the active row (transform + height only).
  const place = useCallback(() => {
    const row = rows.current[active];
    const f = frame.current;
    if (!row || !f) return;
    f.style.transform = `translate3d(0, ${row.offsetTop}px, 0)`;
    f.style.height = `${row.offsetHeight}px`;
  }, [active]);
  useEffect(() => {
    place();
    const l = list.current;
    if (!l) return;
    const ro = new ResizeObserver(place);
    ro.observe(l);
    return () => ro.disconnect();
  }, [place]);

  const focusRow = (i: number) => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    rows.current[i]?.scrollIntoView({
      block: "center",
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-24">
      <div className="lg:sticky lg:top-28 lg:self-start">
        {head}
        {/* Desktop only: running counter + tick scale, decorative */}
        <div
          aria-hidden="true"
          className="relative mt-14 hidden select-none lg:block"
        >
          <div className="flex items-end gap-3 leading-none">
            <span className="relative block h-[clamp(5rem,9vw,9rem)] w-[2.1ch] overflow-hidden text-[clamp(5rem,9vw,9rem)] font-extralight tabular-nums tracking-[-.06em] text-gold/90">
              {items.map((_, i) => (
                <span
                  key={i}
                  className="absolute inset-0 transition-[transform,opacity] duration-700 ease-[cubic-bezier(.2,.7,.2,1)]"
                  style={{
                    transform: `translateY(${(i - active) * 40}%)`,
                    opacity: i === active ? 1 : 0,
                  }}
                >
                  {pad(i + 1)}
                </span>
              ))}
            </span>
            <span className="pb-2 text-sm tabular-nums tracking-[.2em] text-white/35">
              / {pad(total)}
            </span>
          </div>
          <div className="mt-6 flex gap-2">
            {items.map((_, i) => (
              <span
                key={i}
                className={`h-px w-8 origin-left transition-[background-color,transform] duration-500 ${
                  i === active
                    ? "scale-x-150 bg-gold"
                    : i < active
                      ? "bg-gold/45"
                      : "bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="relative">
          {/* Focus frame: corner guides that glide to the active row (desktop). */}
          <div
            ref={frame}
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 hidden transition-[transform,height] duration-700 ease-[cubic-bezier(.2,.7,.2,1)] motion-reduce:transition-none lg:block"
          >
            {[
              "left-0 top-0 border-l border-t",
              "right-0 top-0 border-r border-t",
              "bottom-0 left-0 border-b border-l",
              "bottom-0 right-0 border-b border-r",
            ].map((c) => (
              <span key={c} className={`absolute size-4 border-gold/80 ${c}`} />
            ))}
            <span className="absolute inset-0 bg-[linear-gradient(90deg,rgb(201_169_110/.07),transparent_70%)]" />
          </div>

          <ol
            ref={list}
            className="relative divide-y divide-white/10 border-y border-white/10"
          >
            {items.map((item, i) => {
              const on = i === active;
              return (
                <li
                  key={item.title}
                  ref={(el) => {
                    rows.current[i] = el;
                  }}
                  data-active={on}
                  className="group relative px-0 py-7 sm:py-9 lg:flex lg:flex-col lg:justify-center lg:min-h-[clamp(9.5rem,24vh,13rem)] lg:px-8 lg:py-8"
                >
                  {/* mobile accent: gold hairline draws in under the active block */}
                  <span
                    aria-hidden="true"
                    className={`absolute bottom-[-1px] left-0 h-px w-full origin-left bg-gold transition-transform duration-700 ease-out lg:hidden ${on ? "scale-x-100" : "scale-x-0"}`}
                  />
                  <button
                    type="button"
                    onClick={() => focusRow(i)}
                    aria-current={on ? "true" : undefined}
                    className="flex w-full items-baseline gap-4 text-left sm:gap-6"
                  >
                    <span
                      className={`w-8 shrink-0 text-xs tabular-nums tracking-[.2em] transition-colors duration-500 sm:text-sm ${on ? "text-gold" : "text-white/35"}`}
                    >
                      {pad(i + 1)}
                    </span>
                    <h3
                      className={`text-[clamp(1.45rem,2.1vw+.6rem,2.6rem)] font-light leading-[1.1] tracking-[-.03em] transition-[color,transform] duration-700 ease-[cubic-bezier(.2,.7,.2,1)] ${
                        on
                          ? "text-white lg:translate-x-3"
                          : "text-white/80 lg:text-white/30"
                      }`}
                    >
                      {item.title}
                    </h3>
                  </button>
                  {/* Description: always visible on mobile; expands on desktop for the active row */}
                  <div
                    className={`grid pl-12 transition-[grid-template-rows,opacity] duration-700 ease-[cubic-bezier(.2,.7,.2,1)] sm:pl-14 lg:pl-14 ${
                      on
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[1fr] opacity-100 lg:grid-rows-[0fr] lg:opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p
                        className={`max-w-lg pt-3 text-sm leading-7 text-white/60 transition-transform duration-700 sm:text-base lg:pt-4 lg:text-white/70 ${on ? "lg:translate-x-3" : "lg:translate-y-2"}`}
                      >
                        {item.text}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Closing line: compact, not a full screen */}
        <div className="mt-12 flex flex-col items-start gap-6 sm:mt-16 sm:flex-row sm:items-end sm:justify-between lg:pl-8">
          <p
            data-reveal
            className="whitespace-pre-line text-[clamp(1.9rem,3vw+.5rem,3.4rem)] font-light leading-[1.08] tracking-[-.04em]"
          >
            {closing.split("\n")[0]}
            {"\n"}
            <span className="text-gold">{closing.split("\n")[1]}</span>
          </p>
          <a
            href="#contact-form"
            className="group inline-flex min-h-11 items-center gap-3 text-xs uppercase tracking-[.18em] text-white/80 transition-colors hover:text-gold"
          >
            <span className="h-px w-8 bg-gold/60 transition-all duration-500 group-hover:w-14" />
            {action}
          </a>
        </div>
      </div>
    </div>
  );
}
