"use client";

import { AnimatePresence, motion } from "framer-motion";

interface HotspotProps {
  x: number;
  y: number;

  popupX: number;
  popupY: number;

  label: string;
  description: string;

  index: number;

  align?: "left" | "center" | "right";

  isHovered: boolean;
  isDimmed: boolean;

  onHover: () => void;
  onLeave: () => void;
}

export default function Hotspot({
  x,
  y,
  popupX,
  popupY,
  label,
  description,
  index,
  align = "center",
  isHovered,
  isDimmed,
  onHover,
  onLeave,
}: HotspotProps) {
  const popupTransform =
    align === "left"
      ? "translateX(0)"
      : align === "right"
      ? "translateX(-100%)"
      : "translateX(-50%)";

  return (
    <>
      {/* CONNECTION LINE */}
      <svg
        className="pointer-events-none absolute inset-0 z-[35] h-full w-full overflow-visible"
        aria-hidden="true"
      >
        <motion.line
          x1={`${x}%`}
          y1={`${y}%`}
          x2={`${popupX}%`}
          y2={`${popupY}%`}
          stroke="#C9A45A"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
          initial={{
            pathLength: 0,
            opacity: 0,
          }}
          animate={{
            pathLength: isHovered ? 1 : 0,
            opacity: isHovered ? 0.9 : 0,
          }}
          transition={{
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1],
          }}
        />

        <motion.circle
          cx={`${popupX}%`}
          cy={`${popupY}%`}
          r="2.5"
          fill="#C9A45A"
          vectorEffect="non-scaling-stroke"
          initial={{
            opacity: 0,
            scale: 0,
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0,
          }}
          transition={{
            duration: 0.3,
          }}
        />
      </svg>

      {/* LOCATION MARKER */}
      <motion.button
        type="button"
        aria-label={`Explore ${label}`}
        className="absolute z-40 -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${x}%`,
          top: `${y}%`,
        }}
        animate={{
          opacity: isDimmed ? 0.3 : 1,
          scale: isHovered ? 1.15 : 1,
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        {/* Wide ambient glow */}
        <motion.span
          className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-champagne/20 blur-md"
          animate={{
            scale: isHovered ? 1.15 : 0.8,
            opacity: isHovered ? 0.8 : 0.35,
          }}
          transition={{
            duration: 0.5,
          }}
        />

        {/* Outer pulse ring */}
        <motion.span
          className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-champagne/70"
          animate={{
            scale: isHovered ? [1, 1.8] : [1, 1.45],
            opacity: isHovered ? [0.8, 0] : [0.45, 0],
          }}
          transition={{
            duration: isHovered ? 1.2 : 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />

        {/* Dark separation ring */}
        <span className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/70 bg-[#101a17]/60 shadow-[0_0_12px_rgba(0,0,0,.45)]" />

        {/* Champagne ring */}
        <motion.span
          className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-champagne"
          animate={{
            rotate: isHovered ? 180 : 0,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{
            duration: 0.5,
          }}
        />

        {/* Core */}
        <motion.span
          className="relative block h-4 w-4 rounded-full border-2 border-white bg-champagne shadow-[0_0_12px_rgba(201,164,90,.95)]"
          animate={{
            boxShadow: isHovered
              ? [
                  "0 0 10px rgba(201,164,90,.9)",
                  "0 0 28px rgba(201,164,90,1)",
                  "0 0 10px rgba(201,164,90,.9)",
                ]
              : "0 0 14px rgba(201,164,90,.9)",
          }}
          transition={{
            duration: 1.4,
            repeat: isHovered ? Infinity : 0,
          }}
        >
          <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
        </motion.span>

        {/* Tiny crosshair */}
        {/* <span className="pointer-events-none absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2">
          <span className="absolute left-1/2 top-0 h-2 w-px -translate-x-1/2 bg-champagne/80" />
          <span className="absolute bottom-0 left-1/2 h-2 w-px -translate-x-1/2 bg-champagne/80" />
          <span className="absolute left-0 top-1/2 h-px w-2 -translate-y-1/2 bg-champagne/80" />
          <span className="absolute right-0 top-1/2 h-px w-2 -translate-y-1/2 bg-champagne/80" />
        </span> */}
      </motion.button>

      {/* POPUP */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="pointer-events-none absolute z-[50] w-[230px] sm:w-[260px]"
            style={{
              left: `${popupX}%`,
              top: `${popupY}%`,
              transform: popupTransform,
            }}
            initial={{
              opacity: 0,
              y: 8,
              scale: 0.96,
              filter: "blur(6px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              y: 5,
              scale: 0.97,
              filter: "blur(5px)",
            }}
            transition={{
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="relative overflow-hidden border border-white/15 bg-[#101a17]/85 p-4 shadow-[0_20px_70px_rgba(0,0,0,.45)] backdrop-blur-xl">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-champagne/80">
                  {String(index).padStart(2, "0")}
                </span>

                <span className="flex items-center gap-1.5 font-mono text-[7px] uppercase tracking-[0.2em] text-white/35">
                  <span className="h-1.5 w-1.5 rounded-full bg-champagne shadow-[0_0_8px_rgba(201,164,90,.9)]" />
                  Location
                </span>
              </div>

              <h3 className="font-display text-[15px] font-medium leading-[1.15] tracking-[-0.02em] text-white">
                {label}
              </h3>

              <p className="mt-2 font-sans text-[10px] leading-[1.55] text-white/50">
                {description}
              </p>

              <div className="mt-4 flex items-center gap-2">
                <span className="h-px w-7 bg-champagne/60" />

                <span className="font-mono text-[7px] uppercase tracking-[0.2em] text-white/30">
                  Explore
                </span>
              </div>

              {/* Corner accents */}
              <span className="absolute left-0 top-0 h-5 w-px bg-champagne/80" />
              <span className="absolute left-0 top-0 h-px w-5 bg-champagne/80" />

              <span className="absolute bottom-0 right-0 h-5 w-px bg-champagne/40" />
              <span className="absolute bottom-0 right-0 h-px w-5 bg-champagne/40" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
