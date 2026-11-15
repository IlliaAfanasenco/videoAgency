import type { Messages } from "@/messages/de";
import type { Locale } from "@/lib/i18n";
import { getFeaturedProjects } from "@/data/projects";
import { Heading, SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectGallery } from "@/components/ui/ProjectGallery";
import { Button } from "@/components/ui/Button";

export function SelectedWorkSection({
  t,
  locale,
}: {
  t: Messages;
  locale: Locale;
}) {
  const projects = getFeaturedProjects(3);
  return (
    <section
      id="projects"
      className="mx-auto max-w-[1600px] px-6 py-24 sm:px-10 lg:px-20 lg:py-36"
    >
      <div data-reveal className="mb-14 lg:mb-20">
        <SectionLabel>{t.work.label}</SectionLabel>
        <Heading>{t.work.title}</Heading>
      </div>
      {projects.length > 0 ? (
        <ProjectGallery
          projects={projects}
          locale={locale}
          labels={t.work.gallery}
          featuredLayout
        />
      ) : (
        <p className="border border-white/10 px-6 py-12 text-sm text-white/55 lg:py-16">
          {t.work.empty}
        </p>
      )}
      <div className="mt-10 lg:mt-14">
        <Button href={`/${locale}/portfolio`}>{t.work.action}</Button>
      </div>
    </section>
  );
}
