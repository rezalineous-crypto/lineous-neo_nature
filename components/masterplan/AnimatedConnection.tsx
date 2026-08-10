"use client";

import { motion } from "framer-motion";

interface AnimatedConnectionProps {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  accentColor: string;
  isActive: boolean;
}

export default function AnimatedConnection({
  fromX,
  fromY,
  toX,
  toY,
  accentColor,
  isActive,
}: AnimatedConnectionProps) {
  // Create a curved path from hotspot to panel
  const midX = (fromX + toX) / 2;
  const midY = Math.min(fromY, toY) - 40;

  const path = `M ${fromX} ${fromY} Q ${midX} ${midY} ${toX} ${toY}`;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 20 }}
      aria-hidden="true"
    >
      <motion.path
        d={path}
        fill="none"
        stroke={accentColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: isActive ? 1 : 0,
          opacity: isActive ? 0.6 : 0,
        }}
        transition={{
          pathLength: { duration: 0.6, ease: "easeInOut" },
          opacity: { duration: 0.3 },
        }}
        style={{
          filter: `drop-shadow(0 0 6px ${accentColor}60)`,
        }}
      />

      {/* Glow layer */}
      <motion.path
        d={path}
        fill="none"
        stroke={accentColor}
        strokeWidth="4"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: isActive ? 1 : 0,
          opacity: isActive ? 0.15 : 0,
        }}
        transition={{
          pathLength: { duration: 0.6, ease: "easeInOut" },
          opacity: { duration: 0.3 },
        }}
      />
    </svg>
  );
}
