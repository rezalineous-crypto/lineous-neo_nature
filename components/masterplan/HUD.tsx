"use client";

import { motion } from "framer-motion";

interface HUDProps {
  accentColor: string;
  className?: string;
}

export default function HUD({ accentColor, className = "" }: HUDProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
      {/* Rotating outer ring */}
      <motion.div
        className="absolute top-4 right-4 w-16 h-16"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 64 64" className="w-full h-full">
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke={accentColor}
            strokeWidth="0.5"
            strokeDasharray="8 12"
            opacity="0.4"
          />
        </svg>
      </motion.div>

      {/* Scanning line */}
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{ backgroundColor: accentColor, opacity: 0.15 }}
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Corner brackets */}
      <svg className="absolute top-3 left-3 w-8 h-8" viewBox="0 0 32 32">
        <path d="M2 12 L2 2 L12 2" fill="none" stroke={accentColor} strokeWidth="1" opacity="0.5" />
      </svg>
      <svg className="absolute top-3 right-3 w-8 h-8" viewBox="0 0 32 32">
        <path d="M20 2 L30 2 L30 12" fill="none" stroke={accentColor} strokeWidth="1" opacity="0.5" />
      </svg>
      <svg className="absolute bottom-3 left-3 w-8 h-8" viewBox="0 0 32 32">
        <path d="M2 20 L2 30 L12 30" fill="none" stroke={accentColor} strokeWidth="1" opacity="0.5" />
      </svg>
      <svg className="absolute bottom-3 right-3 w-8 h-8" viewBox="0 0 32 32">
        <path d="M20 30 L30 30 L30 20" fill="none" stroke={accentColor} strokeWidth="1" opacity="0.5" />
      </svg>

      {/* Mini progress bar */}
      <div className="absolute bottom-6 left-6 w-24">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[9px] font-mono uppercase tracking-widest text-bone/40">Progress</span>
          <span className="text-[9px] font-mono text-bone/40">78%</span>
        </div>
        <div className="h-0.5 w-full bg-line/50 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: accentColor }}
            initial={{ width: "0%" }}
            animate={{ width: "78%" }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          />
        </div>
      </div>

      {/* Coordinate label */}
      <div className="absolute top-4 left-4">
        <span className="text-[9px] font-mono text-bone/30 tracking-widest">
          {accentColor === "#C9A45A" ? "21.47°N 89.82°E" : "21.47°N 89.82°E"}
        </span>
      </div>

      {/* Status light */}
      <div className="absolute top-4 right-20 flex items-center gap-1.5">
        <motion.span
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: accentColor }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="text-[9px] font-mono text-bone/40 uppercase tracking-widest">Live</span>
      </div>
    </div>
  );
}
