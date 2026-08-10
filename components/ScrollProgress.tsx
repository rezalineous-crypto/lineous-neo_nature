"use client";

import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed left-0 top-0 z-[100] h-[2px] w-full origin-left"
      style={{
        scaleX: scrollYProgress,
        background: "linear-gradient(115deg, var(--color-chrome1), var(--color-chrome2), var(--color-chrome3))",
      }}
    />
  );
}
