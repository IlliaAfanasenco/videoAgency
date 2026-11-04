import type { Messages } from "@/messages/de";
import { Heading, SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectCard, type Project } from "@/components/ui/ProjectCard";
const images = ["automotive", "real-estate", "events", "industry"];
// Asymmetric editorial layout (desktop); stacked on mobile.
const layout = [
  "lg:col-span-7 lg:h-[640px]",
  "lg:col-span-5 lg:h-[640px] lg:mt-24",
  "lg:col-span-5 lg:h-[560px]",
  "lg:col-span-7 lg:h-[560px] lg:mt-24",
];
export function ProjectsSection({ t }: { t: Messages }) {
  const projects: Project[] = images.map((id, i) => ({
    id,
    image: `/images/${id}.jpg`,
    title: t.projects.categories[i],
    description: t.projects.descriptions[i],
  }));
  return (
    <section
      id="projects"
      className="mx-auto max-w-[1600px] px-6 py-24 sm:px-10 lg:px-20 lg:py-36"
    >
      <div data-reveal className="mb-16 lg:mb-24">
        <SectionLabel>{t.projects.label}</SectionLabel>
        <Heading>{t.projects.title}</Heading>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            t={t}
            className={`h-[420px] ${layout[index]}`}
          />
        ))}
      </div>
      <p className="mt-10 text-[9px] tracking-[.14em] text-white/35">
        {t.projects.note}
      </p>
    </section>
  );
}
