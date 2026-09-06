"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { RotateCw } from "lucide-react";

interface FlippingCardProps {
  className?: string;
  height?: number;
  width?: number;
  frontContent?: React.ReactNode;
  backContent?: React.ReactNode;
}

/**
 * A 3D card that flips between a front and back face.
 *
 * The flip is deliberate rather than incidental: it never reacts to the
 * pointer crossing the card. Each face carries its own copy of the flip
 * control pinned to its bottom-left corner, so the control belongs to the card
 * and turns with it — flip to the back and the back's control spins in while
 * the front's spins away. The control is shaded by default and lights up in
 * the site's amber-gold on hover; clicking it toggles to the other face.
 *
 * The faces are translucent, so the animated background behind the page glows
 * through the card. Keep the fill opaque enough to read the text.
 */
export function FlippingCard({
  className,
  frontContent,
  backContent,
  height = 300,
  width = 350,
}: FlippingCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="group relative [perspective:1000px]"
      style={
        {
          "--height": `${height}px`,
          "--width": `${width}px`,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          "relative rounded-xl border border-neutral-300/80 bg-white/50 shadow-lg shadow-black/40 [transform-style:preserve-3d] transition-all duration-700 group-hover:border-[#FFB300]/70 group-hover:shadow-[0_0_0_1px_rgba(255,179,0,0.35),0_0_30px_rgba(255,179,0,0.22)] dark:border-white/15 dark:bg-neutral-950/40",
          "h-[var(--height)] w-[var(--width)]",
          className
        )}
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* Front Face — translucent so the animation behind drifts through.
            The /60 opacity keeps the page's bright spots dim enough to read
            text on top; raise it (e.g. /70) for less see-through or lower it
            (e.g. /50) for a glassier card. */}
        <div className="absolute inset-0 h-full w-full rounded-[inherit] bg-white/70 text-neutral-950 [backface-visibility:hidden] [transform:rotateY(0deg)] dark:bg-zinc-950/60 dark:text-neutral-50">
          {/* Interior amber light — glows up from the card's background when the
              card is hovered/touched, sitting behind the text layer. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(circle at 50% 40%, rgba(255,179,0,0.28), rgba(255,179,0,0.09) 46%, transparent 70%)",
            }}
          />
          <div className="relative h-full w-full [transform:translateZ(70px)_scale(.93)]">
            {frontContent}
            <FlipToggle flipped={flipped} onToggle={() => setFlipped((f) => !f)} />
          </div>
        </div>

        {/* Back Face */}
        <div className="absolute inset-0 h-full w-full rounded-[inherit] bg-white/70 text-neutral-950 [backface-visibility:hidden] [transform:rotateY(180deg)] dark:bg-zinc-950/60 dark:text-neutral-50">
          {/* Back face gets the same interior amber glow on hover. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(circle at 50% 40%, rgba(255,179,0,0.28), rgba(255,179,0,0.09) 46%, transparent 70%)",
            }}
          />
          <div className="relative h-full w-full [transform:translateZ(70px)_scale(.93)]">
            {backContent}
            <FlipToggle flipped={flipped} onToggle={() => setFlipped((f) => !f)} />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * The flip control. Rendered inside a face so it spins with the card: shaded
 * by default, it highlights in the amber-gold and swaps its arrow's direction
 * when hovered.
 */
function FlipToggle({
  flipped,
  onToggle,
}: {
  flipped: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={flipped ? "Show card front" : "Show card back"}
      title={flipped ? "Show card front" : "Show card back"}
      onClick={onToggle}
      className="absolute bottom-3 left-3 z-20 flex size-9 items-center justify-center rounded-full border border-white/25 bg-black/40 text-neutral-200 shadow-md shadow-black/40 backdrop-blur-sm transition-colors duration-200 hover:border-[#FFB300] hover:bg-[#FFB300]/20 hover:text-[#FFB300]"
    >
      <RotateCw
        size={16}
        className={cn(
          "transition-transform duration-700",
          flipped ? "-scale-x-100" : "scale-x-100"
        )}
      />
    </button>
  );
}

export default FlippingCard;
