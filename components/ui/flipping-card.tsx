"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

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
 * The flip is driven by Pointer Events and applied as an inline transform, so
 * it never depends on a global capability probe or on CSS rules that could
 * fight each other. A mouse or pen flips on enter and unflips on leave (the
 * familiar hover), while a touch flips on tap — the same interaction on every
 * device, and it reacts the moment the pointer crosses the card.
 */
export function FlippingCard({
  className,
  frontContent,
  backContent,
  height = 300,
  width = 350,
}: FlippingCardProps) {
  const [flipped, setFlipped] = useState(false);
  // The pointer type of the last touch/click, so a tap (touch) can be told
  // apart from a mouse click in the onClick handler below.
  const lastPointerType = useRef<string>("mouse");

  // Hover-capable pointers (mouse/trackpad/pen) flip on enter/leave. Touch
  // pointers can't hover, so they're ignored here and handled by onClick.
  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "touch") setFlipped(true);
  };
  const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "touch") setFlipped(false);
  };
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    lastPointerType.current = e.pointerType;
  };

  return (
    <div
      className="[perspective:1000px]"
      style={
        {
          "--height": `${height}px`,
          "--width": `${width}px`,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          "relative rounded-xl border border-neutral-200 bg-white shadow-lg transition-transform duration-700 [transform-style:preserve-3d] dark:border-neutral-800 dark:bg-neutral-950",
          "h-[var(--height)] w-[var(--width)]",
          className
        )}
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        onClick={() => {
          if (lastPointerType.current === "touch") setFlipped((f) => !f);
        }}
      >
        {/* Front Face */}
        <div className="absolute inset-0 h-full w-full rounded-[inherit] bg-white text-neutral-950 [transform-style:preserve-3d] [backface-visibility:hidden] [transform:rotateY(0deg)] dark:bg-zinc-950 dark:text-neutral-50">
          <div className="[transform:translateZ(70px)_scale(.93)] h-full w-full">
            {frontContent}
          </div>
        </div>
        {/* Back Face */}
        <div className="absolute inset-0 h-full w-full rounded-[inherit] bg-white text-neutral-950 [transform-style:preserve-3d] [backface-visibility:hidden] [transform:rotateY(180deg)] dark:bg-zinc-950 dark:text-neutral-50">
          <div className="[transform:translateZ(70px)_scale(.93)] h-full w-full">
            {backContent}
          </div>
        </div>
      </div>
    </div>
  );
}
