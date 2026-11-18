"use client";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import type { Project } from "@/data/projects";
import type { PublishedCase } from "@/data/cases";
import { services, type ServiceId } from "@/data/services";
import {
  ProjectGallery,
  type GalleryLabels,
} from "@/components/ui/ProjectGallery";
import { CaseTile } from "@/components/work/CaseTile";

/**
 * Portfolio with one filter over both case studies and video projects. Filter pills are the six
 * service categories; items can belong to several. All six stay visible (dimmed while empty).
 */
export function PortfolioBrowser({
  cases,
  projects,
  locale,
  labels,
  sampleLabel,
}: {
  cases: PublishedCase[];
  projects: Project[];
  locale: Locale;
  labels: GalleryLabels;
  sampleLabel: string;
}) {
  const [filter, setFilter] = useState<"all" | ServiceId>("all");
  const visibleCases =
    filter === "all" ? cases : cases.filter((c) => c.services.includes(filter));
  const visibleProjects =
    filter === "all"
      ? projects
      : projects.filter((p) => p.services.includes(filter));
  const has = (id: ServiceId) =>
    cases.some((c) => c.services.includes(id)) ||
    projects.some((p) => p.services.includes(id));
  const nothing = visibleCases.length + visibleProjects.length === 0;
  return (
    <div>
      <div
        role="group"
        aria-label={labels.filters}
        className="-mx-5 mb-10 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0 [scrollbar-width:none]"
      >
        {[{ id: "all", short: labels.all }, ...services].map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={filter === c.id}
            onClick={() => setFilter(c.id as typeof filter)}
            className={`min-h-11 shrink-0 rounded-full border px-5 text-xs transition ${filter === c.id ? "border-white bg-white text-black" : "border-white/25 text-white/70 hover:border-white/60"} ${c.id !== "all" && !has(c.id as ServiceId) ? "opacity-50" : ""}`}
          >
            {c.short}
          </button>
        ))}
      </div>
      {nothing && (
        <p className="border border-white/10 px-6 py-10 text-sm text-white/55">
          {labels.emptyFiltered}
        </p>
      )}
      {visibleCases.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-8">
          {visibleCases.map((c) => (
            <CaseTile
              key={c.slug}
              item={c}
              locale={locale}
              sampleLabel={sampleLabel}
            />
          ))}
        </div>
      )}
      {visibleProjects.length > 0 && (
        <div className={visibleCases.length > 0 ? "mt-5 lg:mt-8" : ""}>
          <ProjectGallery
            projects={visibleProjects}
            locale={locale}
            labels={labels}
          />
        </div>
      )}
    </div>
  );
}
