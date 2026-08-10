"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

type SmoothScrollProps = {
  children: ReactNode;
};

const lenisOptions = {
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 0.8,
  touchMultiplier: 1.5,
  autoRaf: true,
};

export default function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
}
