"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type TooltipProps = {
  text: string;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
};

export default function Tooltip({ text, children, side = "bottom" }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  const sideClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-3",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-3",
    left: "right-full top-1/2 -translate-y-1/2 mr-3",
    right: "left-full top-1/2 -translate-y-1/2 ml-3",
  };

  const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 -mt-1 border-t-graphite border-l-transparent border-r-transparent border-b-transparent",
    bottom: "bottom-full left-1/2 -translate-x-1/2 -mb-1 border-b-graphite border-l-transparent border-r-transparent border-t-transparent",
    left: "left-full top-1/2 -translate-y-1/2 -ml-1 border-l-graphite border-t-transparent border-b-transparent border-r-transparent",
    right: "right-full top-1/2 -translate-y-1/2 -mr-1 border-r-graphite border-t-transparent border-b-transparent border-l-transparent",
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: side === "bottom" ? -4 : 4, x: side === "left" ? 4 : side === "right" ? -4 : 0 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: side === "bottom" ? -4 : 4, x: side === "left" ? 4 : side === "right" ? -4 : 0 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute z-50 ${sideClasses[side]}`}
          >
            <div
              className="relative px-3 py-1.5 rounded-full bg-graphite border border-line shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl"
            >
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-bone whitespace-nowrap">
                {text}
              </span>
              <div className={`absolute w-2 h-2 rotate-45 bg-graphite border-l border-b border-line ${arrowClasses[side]}`} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
