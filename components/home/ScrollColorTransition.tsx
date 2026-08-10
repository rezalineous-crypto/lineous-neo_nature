"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const sectionColors = [
  { start: 0, end: 0.15, color: [10, 10, 12] },
  { start: 0.15, end: 0.30, color: [245, 245, 240] },
  { start: 0.30, end: 0.45, color: [10, 10, 12] },
  { start: 0.45, end: 0.55, color: [10, 10, 12] },
  { start: 0.55, end: 0.65, color: [10, 10, 12] },
  { start: 0.65, end: 0.75, color: [10, 10, 12] },
  { start: 0.75, end: 0.85, color: [245, 245, 240] },
  { start: 0.85, end: 0.92, color: [27, 40, 28] },
  { start: 0.92, end: 0.97, color: [229, 229, 224] },
  { start: 0.97, end: 1.0, color: [10, 10, 12] },
];

export default function ScrollColorTransition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const r = useTransform(
    scrollYProgress,
    sectionColors.map((s) => s.start),
    sectionColors.map((s) => s.color[0])
  );
  const g = useTransform(
    scrollYProgress,
    sectionColors.map((s) => s.start),
    sectionColors.map((s) => s.color[1])
  );
  const b = useTransform(
    scrollYProgress,
    sectionColors.map((s) => s.start),
    sectionColors.map((s) => s.color[2])
  );

  const backgroundColor = useTransform([r, g, b], ([latestR, latestG, latestB]) => {
    const rVal = Math.round(latestR as number);
    const gVal = Math.round(latestG as number);
    const bVal = Math.round(latestB as number);
    return `rgb(${rVal}, ${gVal}, ${bVal})`;
  });

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0">
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundColor,
          opacity: 0.15,
        }}
      />
    </div>
  );
}
