"use client";

import { useEffect } from "react";
import ProjectCard from "@/components/ui/project-card";
import { projects, type ProjectId } from "@/components/ui/projects-data";

/**
 * Full-screen modal that pops a single, large project card up over the page.
 *
 * The backdrop is a translucent shade (not opaque) so the solar/orbital
 * animation behind it stays visible while the modal is open — the shading
 * dims it but the motion still shows through. Clicking the shaded area
 * (i.e. anywhere outside the card) dismisses it; the Escape key works too.
 */
export function ProjectsModal({
  project,
  onClose,
}: {
  project: ProjectId | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!project) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [project, onClose]);

  if (!project) return null;
  const data = projects[project];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={data.title}
      className="fixed inset-0 z-50 flex overflow-y-auto p-4"
    >
      {/* Shaded backdrop — dims the page but leaves the animation's motion visible */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        style={{ animation: "projects-fade-in 0.3s ease-out both" }}
        onClick={onClose}
      />

      {/* The card — stopPropagation keeps a click on it from closing the modal.
          `m-auto` centers it and lets the container scroll on short screens. */}
      <div
        className="relative m-auto"
        style={{ animation: "projects-pop-in 0.5s cubic-bezier(0.25, 1.1, 0.4, 1) both" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="dark">
          <ProjectCard project={data} />
        </div>
      </div>

      <style>{`
        @keyframes projects-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes projects-pop-in {
          from { opacity: 0; transform: translateY(24px) scale(0.92); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

export default ProjectsModal;
