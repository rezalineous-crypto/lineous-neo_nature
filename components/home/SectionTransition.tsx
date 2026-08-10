"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { customEase } from "./Hero";

interface SectionTransitionProps {
  fromBg?: string;
  toBg?: string;
  direction?: "up" | "down";
}

export default function SectionTransition({
  fromBg = "bg-void",
  toBg = "bg-void",
  direction = "down",
}: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1]);

  return (
    <div
      ref={ref}
      className={`relative h-24 md:h-32 ${fromBg} overflow-hidden`}
    >
      {/* Gradient transition */}
      <motion.div
        style={{ opacity, scale }}
        className={`absolute inset-0 bg-gradient-to-b ${direction === "down" ? "from-transparent to-black/20" : "from-black/20 to-transparent"}`}
      />

      {/* Thin architectural line */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-bone/10" />

      {/* Subtle decorative element */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: customEase }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-px bg-bone/20"
      />
    </div>
  );
}
