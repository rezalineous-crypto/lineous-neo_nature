"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export default function Loader() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: [0, 1, 1, 0],
      transition: {
        duration: 1.4,
        ease: [0.16, 1, 0.3, 1],
        times: [0, 0.2, 0.8, 1],
      },
    });
  }, [controls]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-void"
      animate={controls}
      onAnimationComplete={() => {
        // Hide loader after animation
        const loader = document.querySelector("[data-loader]");
        if (loader) {
          loader.setAttribute("style", "display: none");
        }
      }}
      data-loader
    >
      <div className="flex flex-col items-center gap-8">
        <motion.h1
          className="font-display text-4xl font-light tracking-tight text-bone md:text-6xl"
          initial={{ letterSpacing: "0.5em", opacity: 0 }}
          animate={{
            letterSpacing: "-0.02em",
            opacity: 1,
            transition: {
              duration: 1.2,
              ease: [0.16, 1, 0.3, 1],
            },
          }}
        >
          <span className="text-gradient-chrome">Purura</span>
        </motion.h1>

        {/* Chrome progress bar */}
        <div className="h-[1px] w-48 overflow-hidden rounded-full bg-line">
          <motion.div
            className="h-full w-full origin-left"
            style={{
              background:
                "linear-gradient(115deg, var(--color-chrome1), var(--color-chrome2), var(--color-chrome3))",
            }}
            initial={{ scaleX: 0 }}
            animate={{
              scaleX: [0, 1, 1, 0],
              transition: {
                duration: 1.4,
                ease: [0.16, 1, 0.3, 1],
                times: [0, 0.6, 0.8, 1],
              },
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
