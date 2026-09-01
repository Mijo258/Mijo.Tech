import { FlippingCard } from "@/components/ui/flipping-card";
import { type ProjectData } from "@/components/ui/projects-data";

/**
 * A single, large flipping card for one project. The front shows an image
 * header with a scrollable text area beneath; the back is a scrollable
 * write-up with a button. Both faces have generous room for long text.
 */
function ProjectFront({ project }: { project: ProjectData }) {
  return (
    <div className="flex h-full w-full flex-col">
      {/* Image header */}
      <div className="relative h-44 shrink-0 overflow-hidden">
        <img
          src={project.imageSrc}
          alt={project.imageAlt}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-3 left-5 right-5">
          <h3 className="font-[family-name:var(--font-lexend)] text-2xl font-semibold text-white">
            {project.title}
          </h3>
          <p className="font-[family-name:var(--font-lexend)] text-[13px] text-white/70">
            {project.tagline}
          </p>
        </div>
      </div>

      {/* Scrollable text area — plenty of room for the project write-up */}
      <div className="min-h-0 flex-1 overflow-y-auto p-5">
        <p className="font-[family-name:var(--font-lexend)] whitespace-pre-line text-[14px] leading-relaxed text-neutral-300">
          {project.frontText}
        </p>
      </div>
    </div>
  );
}

function ProjectBack({ project }: { project: ProjectData }) {
  return (
    <div className="flex h-full w-full flex-col p-6">
      <h3 className="font-[family-name:var(--font-lexend)] text-xl font-semibold text-neutral-50">
        {project.backTitle ?? `About ${project.title}`}
      </h3>

      {/* Scrollable text area — the long-form story goes here */}
      <div className="mt-4 min-h-0 flex-1 overflow-y-auto">
        <p className="font-[family-name:var(--font-lexend)] whitespace-pre-line text-[14px] leading-relaxed text-neutral-300">
          {project.backText}
        </p>
      </div>

      {project.link ? (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="mt-5 inline-flex h-10 shrink-0 items-center justify-center rounded-md bg-foreground px-5 text-[14px] font-medium text-background transition-opacity hover:opacity-90"
        >
          {project.buttonText}
        </a>
      ) : (
        <button
          type="button"
          onClick={(e) => e.stopPropagation()}
          className="mt-5 h-10 shrink-0 rounded-md bg-foreground px-5 text-[14px] font-medium text-background"
        >
          {project.buttonText}
        </button>
      )}
    </div>
  );
}

export function ProjectCard({ project }: { project: ProjectData }) {
  return (
    <FlippingCard
      frontContent={<ProjectFront project={project} />}
      backContent={<ProjectBack project={project} />}
      className="h-[min(82svh,600px)] w-[min(92vw,460px)]"
    />
  );
}

export default ProjectCard;
