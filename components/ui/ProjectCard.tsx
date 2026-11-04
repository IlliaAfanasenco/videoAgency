import Image from "next/image";
import { Modal } from "./Modal";
import type { Messages } from "@/messages/de";
export type Project = {
  id: string;
  image: string;
  title: string;
  description: string;
};
export function ProjectCard({
  project,
  index,
  t,
  className = "",
}: {
  project: Project;
  index: number;
  t: Messages;
  className?: string;
}) {
  return (
    <div data-reveal className={`min-w-0 ${className}`}>
      <Modal
        close={t.close}
        title={project.title}
        className="group relative block h-full min-h-[320px] w-full overflow-hidden text-left"
        trigger={
          <>
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 1023px) 100vw, 55vw"
              className="object-cover brightness-80 transition duration-700 group-hover:scale-105 group-hover:brightness-100"
            />
            <span className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent" />
            <span className="absolute inset-x-5 bottom-6 transition-transform duration-500 group-hover:-translate-y-1">
              <span className="mb-2 block text-[10px] text-white/50">
                0{index + 1}
              </span>
              <span className="flex items-center justify-between text-base">
                {project.title}
                <span className="text-white/50">↗</span>
              </span>
            </span>
          </>
        }
      >
        <div className="relative mb-6 aspect-video">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="600px"
            className="object-cover"
          />
        </div>
        <p className="text-base leading-7 text-white/65">
          {project.description}
        </p>
        <p className="mt-6 text-xs text-white/40">{t.projects.note}</p>
      </Modal>
    </div>
  );
}
