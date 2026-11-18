"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { projectCategories, type Project } from "@/data/projects";
import type { Locale } from "@/lib/i18n";

export type GalleryLabels = {
  all: string;
  filters: string;
  play: string;
  close: string;
  demo: string;
  emptyFiltered: string;
};

const categoryLabel = (id: Project["category"]) =>
  projectCategories.find((c) => c.id === id)?.label ?? id;

function VideoDialog({
  project,
  locale,
  labels,
  onClose,
}: {
  project: Project | null;
  locale: Locale;
  labels: GalleryLabels;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const node = dialog.current;
    if (!node || !project) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    node.showModal();
    return () => {
      document.body.style.overflow = overflow;
      node.close(); // native close restores focus to the opening card
    };
  }, [project]);
  return (
    <dialog
      ref={dialog}
      aria-label={project?.title[locale]}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => e.target === dialog.current && onClose()}
      className="fixed inset-0 m-auto max-h-[94svh] w-[min(96vw,1100px)] max-w-none overflow-hidden border border-white/15 bg-[#050505] p-0 text-white backdrop:bg-black/90"
      data-lenis-prevent
    >
      {project && (
        <div>
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <div className="min-w-0">
              <h2 className="truncate text-base font-light sm:text-xl">
                {project.title[locale]}
              </h2>
              <p className="text-[10px] tracking-[.18em] text-white/50">
                {categoryLabel(project.category)}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={labels.close}
              className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/25 text-2xl"
            >
              ×
            </button>
          </div>
          {/* Mounted only while open: nothing is downloaded beforehand and closing stops playback. */}
          <video
            key={project.id}
            src={project.video}
            poster={project.image}
            controls
            autoPlay
            playsInline
            preload="auto"
            className="block max-h-[78svh] w-full bg-black object-contain"
          />
          {project.description && (
            <p className="px-4 py-4 text-sm text-white/60 sm:px-6">
              {project.description[locale]}
            </p>
          )}
        </div>
      )}
    </dialog>
  );
}

function Card({
  project,
  locale,
  labels,
  onOpen,
  className = "",
}: {
  project: Project;
  locale: Locale;
  labels: GalleryLabels;
  onOpen: (p: Project, el: HTMLButtonElement) => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={(e) => onOpen(project, e.currentTarget)}
      aria-label={`${labels.play}: ${project.title[locale]}`}
      className={`group relative block w-full overflow-hidden bg-[#111] text-left ${className}`}
    >
      <Image
        src={project.image}
        alt=""
        fill
        sizes="(max-width: 1023px) 100vw, 50vw"
        className="object-cover brightness-[.75] transition duration-[900ms] ease-out motion-safe:group-hover:scale-[1.04] group-hover:brightness-95"
      />
      <span className="absolute inset-0 bg-linear-to-t from-black/85 via-transparent to-black/20" />
      {project.demo && (
        <span className="absolute left-4 top-4 border border-white/40 px-2 py-1 text-[9px] tracking-[.18em] text-white/80">
          {labels.demo}
        </span>
      )}
      <span
        aria-hidden="true"
        className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full border border-white/40 bg-black/30 text-sm backdrop-blur-sm transition group-hover:bg-white group-hover:text-black"
      >
        ▶
      </span>
      <span className="absolute inset-x-5 bottom-5 sm:inset-x-7 sm:bottom-7">
        <span className="block text-[10px] tracking-[.18em] text-white/60">
          {categoryLabel(project.category)}
        </span>
        <span className="mt-2 block text-xl font-light sm:text-2xl">
          {project.title[locale]}
        </span>
      </span>
    </button>
  );
}

export function ProjectGallery({
  projects,
  locale,
  labels,
  filterable = false,
  featuredLayout = false,
}: {
  projects: Project[];
  locale: Locale;
  labels: GalleryLabels;
  filterable?: boolean;
  featuredLayout?: boolean;
}) {
  const [filter, setFilter] = useState<"all" | Project["category"]>("all");
  const [open, setOpen] = useState<Project | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const visible =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);
  const present = projectCategories.filter((c) =>
    projects.some((p) => p.category === c.id),
  );
  // After the dialog has closed (child cleanup runs first), return focus to the card that opened it.
  useEffect(() => {
    if (!open) opener.current?.focus();
  }, [open]);
  const close = () => setOpen(null);
  return (
    <div>
      {filterable && (
        <div
          role="group"
          aria-label={labels.filters}
          className="-mx-5 mb-10 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0 [scrollbar-width:none]"
        >
          {[{ id: "all", label: labels.all }, ...projectCategories].map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={filter === c.id}
              onClick={() => setFilter(c.id as typeof filter)}
              className={`min-h-11 shrink-0 rounded-full border px-5 text-xs transition ${filter === c.id ? "border-white bg-white text-black" : "border-white/25 text-white/70 hover:border-white/60"} ${c.id !== "all" && !present.some((p) => p.id === c.id) ? "opacity-50" : ""}`}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}
      {visible.length === 0 ? (
        <p className="border border-white/10 px-6 py-10 text-sm text-white/55">
          {labels.emptyFiltered}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-8">
          {visible.map((p, i) => (
            <Card
              key={p.id}
              project={p}
              locale={locale}
              labels={labels}
              onOpen={(proj, el) => {
                opener.current = el;
                setOpen(proj);
              }}
              className={`aspect-[4/3] sm:aspect-video ${featuredLayout && i === 0 ? "sm:col-span-2 sm:aspect-[21/9]" : ""}`}
            />
          ))}
        </div>
      )}
      <VideoDialog
        project={open}
        locale={locale}
        labels={labels}
        onClose={close}
      />
    </div>
  );
}
