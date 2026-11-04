"use client";
import Image from "next/image";
import { useState } from "react";

type Item = { title: string; text: string };

// Existing project imagery reused as temporary previews, one per service.
const previews = [
  "/images/events.jpg",
  "/images/events.jpg",
  "/images/fpv-coast.jpg",
  "/images/real-estate.jpg",
  "/images/industry.jpg",
  "/images/fpv-coast.jpg",
  "/images/real-estate.jpg",
  "/images/hero-drone.png",
  "/images/automotive.jpg",
];

export function ServicesList({ items }: { items: Item[] }) {
  const [active, setActive] = useState(0);
  const [first, ...rest] = items;
  return (
    <div className="grid gap-16 lg:grid-cols-[1.1fr_.9fr] lg:gap-24">
      <div className="lg:col-span-2">
        <article
          data-reveal
          className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end"
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-[#111]">
            <Image
              src={previews[0]}
              alt=""
              fill
              loading="lazy"
              sizes="(max-width: 1023px) 100vw, 60vw"
              className="object-cover brightness-75"
            />
          </div>
          <div>
            <span className="text-[10px] tracking-[.2em] text-white/40">
              01
            </span>
            <h3 className="mt-5 text-[clamp(2rem,3.4vw,3.4rem)] font-light leading-[1.05] tracking-[-.04em]">
              {first.title}
            </h3>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/60">
              {first.text}
            </p>
          </div>
        </article>
      </div>
      <ul className="divide-y divide-white/12 border-y border-white/12">
        {rest.map((it, i) => {
          const n = i + 1;
          return (
            <li
              key={it.title}
              data-reveal
              onMouseEnter={() => setActive(n)}
              onFocus={() => setActive(n)}
              className="group grid grid-cols-[2.5rem_1fr] gap-x-3 py-6 transition-opacity lg:py-7"
            >
              <span className="pt-1.5 text-[10px] tracking-[.2em] text-white/40">
                {String(n + 1).padStart(2, "0")}
              </span>
              <div>
                <h3
                  tabIndex={0}
                  className={`text-xl font-light tracking-[-.02em] outline-offset-4 transition-colors lg:text-2xl ${active === n ? "text-white" : "lg:text-white/55"}`}
                >
                  {it.title}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-6 text-white/50">
                  {it.text}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="relative hidden lg:block">
        <div className="sticky top-28 aspect-[4/5] overflow-hidden bg-[#111]">
          {previews.map((src, i) => (
            <Image
              key={i}
              src={src}
              alt=""
              fill
              loading="lazy"
              sizes="40vw"
              className={`object-cover brightness-75 transition-opacity duration-700 ${active === i ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
