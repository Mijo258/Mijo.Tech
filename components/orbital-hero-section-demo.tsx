"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { OrbitalHeroSection } from "@/components/ui/orbital-hero-section";

/** True while the viewport is narrow. Drives the layout swap below. */
function useNarrow(query = "(max-width: 767px)") {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(query);
    const sync = () => setNarrow(m.matches);
    sync();
    m.addEventListener("change", sync);
    return () => m.removeEventListener("change", sync);
  }, [query]);
  return narrow;
}

/**
 * A hero built around the background rather than laid on top of it.
 *
 * Three things keep the copy readable without dimming the picture:
 *
 * 1. The Sun is pushed off centre with `focus`, so the busy half and the
 *    reading half never overlap.
 * 2. `scrim` darkens the edge the text sits on and fades out before the coils,
 *    which a flat overlay could not do without greying the whole frame.
 * 3. The text block is capped in width, so a long line never runs into the art.
 *
 * On a narrow screen there is no room to put those halves side by side, so the
 * whole thing turns through 90°: art low, copy high, veil from the top.
 */
export default function OrbitalHeroSectionDemo() {
  const narrow = useNarrow();

  return (
    <section className="relative min-h-svh w-full">
      <OrbitalHeroSection
        focus={narrow ? [0.5, 0.86] : [0.74, 0.42]}
        scrim={narrow ? "top" : "left"}
        scrimStrength={narrow ? 0.94 : 0.92}
        viewRadius={narrow ? 2.1 : 3.1}
        lead={narrow ? 0.05 : 0.12}
        // A phone has no room to stand the art beside the copy: the text alone
        // takes most of the screen. So there it drops back to a quiet texture.
        glow={narrow ? 0.5 : 1}
      >
        <div className="flex h-full min-h-svh items-start px-6 pt-14 sm:px-10 md:items-center md:pt-0 lg:px-20">
          <div className="max-w-[38rem]">
            <h1 className="font-[family-name:var(--font-alex-brush)] text-[3.25rem] leading-[1.2] tracking-normal text-white sm:text-7xl lg:text-[5.5rem] xl:text-[6.5rem]">
              Mijo
              <span className="text-white/80">.tech</span>
            </h1>

            <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-white/70 md:mt-7">
              Innovate, build and integrate. You imagine and we make it real.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 md:mt-10">
              <Link
                href="/features"
                className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90"
              >
                Get started
              </Link>
              <a
                href="#"
                className="rounded-full border border-white/20 px-6 py-3 text-sm text-white/80 transition hover:border-white/40 hover:text-white"
              >
                Read the maths
              </a>
            </div>
          </div>
        </div>
      </OrbitalHeroSection>
    </section>
  );
}
