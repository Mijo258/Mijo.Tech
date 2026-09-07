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
      {/* Image header — a plain <img>: the fixed h-44 header keeps the layout
          stable (no shift while it loads), and lazy loading keeps these
          below-the-fold images cheap. */}
      <div className="relative h-44 shrink-0 overflow-hidden">
        <img
          src={project.imageSrc}
          alt={project.imageAlt}
          loading="lazy"
          decoding="async"
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

        {project.tech?.length ? (
          <ul
            aria-label="Built with"
            className="mt-5 flex flex-wrap gap-2"
          >
            {project.tech.map((item) => (
              <li
                key={item}
                className="rounded-full border border-[#FFB300]/30 bg-[#FFB300]/10 px-3 py-1 font-[family-name:var(--font-lexend)] text-[11.5px] text-[#FFB300]"
              >
                {item}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {/* Action sits bottom-right, leaving the bottom-left corner clear for
          the card's flip control. Shown only when a live link exists. */}
      {project.link ? (
        <div className="mt-5 flex shrink-0 justify-end">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex h-10 items-center justify-center rounded-md bg-gradient-to-b from-[#ffc22e] to-[#e8a000] px-5 text-[14px] font-medium text-black shadow-[0_4px_18px_rgba(255,179,0,0.35)] transition-[filter,transform] duration-200 hover:brightness-110 active:scale-[0.98]"
          >
            {project.buttonText}
          </a>
        </div>
      ) : null}
    </div>
  );
}

export function ProjectCard({ project }: { project: ProjectData }) {
  return (
    <FlippingCard
      frontContent={<ProjectFront project={project} />}
      backContent={<ProjectBack project={project} />}
      className="mx-auto h-[min(82svh,600px)] w-full max-w-[460px]"
    />
  );
}

export default ProjectCard;
