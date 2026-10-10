"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

interface GoldCTAButtonProps {
  href?: string;
  label?: string;
  className?: string;
  /** Optional custom icon. Rendered twice for the swap animation, so keep it a simple SVG. */
  icon?: ReactNode;
}

/* Default icon: arrow pointing up-right */
function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[15px] w-[15px]"
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export default function GoldCTAButton({
  href = "/investment",
  label = "Invest now",
  className = "",
  icon,
}: GoldCTAButtonProps) {
  const reduceMotion = useReducedMotion();
  const iconNode = icon ?? <ArrowIcon />;

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={{
        rest: {
          scale: 1,
          boxShadow: "0 0 0 0 rgba(201, 164, 90, 0)",
        },
        hover: {
          scale: 1.025,
          boxShadow: "0 14px 40px -8px rgba(201, 164, 90, 0.55)",
        },
        tap: {
          scale: 0.97,
          boxShadow: "0 4px 14px -4px rgba(201, 164, 90, 0.35)",
        },
      }}
      transition={{ duration: 0.5, ease }}
      className={`relative inline-flex rounded-full ${className}`}
    >
      <Link
        href={href}
        className="group relative inline-flex h-11 items-center gap-4 rounded-full bg-champagne pl-6 pr-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] ring-1 ring-inset ring-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ivory focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal md:h-12 md:pl-7"
      >
        {/* Light sweep, clipped to the pill */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
        >
          <motion.span
            variants={{
              rest: { x: "-140%" },
              hover: { x: "260%" },
            }}
            transition={{ duration: 1, ease }}
            className="absolute inset-y-0 left-0 w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-ivory/55 to-transparent"
          />
        </span>

        {/* Label: rolls up and is replaced by a copy sliding in from below */}
        <span className="relative block h-[1.3em] overflow-hidden whitespace-nowrap font-display text-[18px] font-normal leading-[1.3] tracking-[-0.03em] text-charcoal md:text-[19px]">
          <motion.span
            variants={{
              rest: { y: "0%" },
              hover: { y: "-50%" },
            }}
            transition={{ duration: 0.6, ease }}
            className="flex flex-col"
          >
            <span className="block h-[1.3em]">{label}</span>
            <span aria-hidden="true" className="block h-[1.3em]">
              {label}
            </span>
          </motion.span>
        </span>

        {/* Icon chip */}
        <span className="relative flex h-8 w-8 shrink-0 items-center justify-center md:h-9 md:w-9">
          {/* Idle attention pulse; fades out on hover */}
          {!reduceMotion && (
            <motion.span
              aria-hidden="true"
              variants={{ rest: { opacity: 1 }, hover: { opacity: 0 } }}
              transition={{ duration: 0.3 }}
              className="pointer-events-none absolute inset-0"
            >
              <motion.span
                animate={{ scale: [1, 1.75], opacity: [0.55, 0] }}
                transition={{
                  duration: 1.8,
                  ease: "easeOut",
                  repeat: Infinity,
                  repeatDelay: 1.4,
                }}
                className="absolute inset-0 rounded-full border border-charcoal/60"
              />
            </motion.span>
          )}

          {/* Chip body */}
          <motion.span
            variants={{
              rest: { scale: 1, rotate: 0 },
              hover: { scale: 1.1, rotate: 0 },
              tap: { scale: 0.92 },
            }}
            transition={{ duration: 0.45, ease }}
            className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-charcoal text-champagne transition-colors duration-500 group-hover:bg-ivory group-hover:text-charcoal"
          >
            {/* Icon leaving toward the top-right */}
            <motion.span
              variants={{
                rest: { x: "0%", y: "0%" },
                hover: { x: "160%", y: "-160%" },
              }}
              transition={{ duration: 0.5, ease }}
              className="absolute flex items-center justify-center"
            >
              {iconNode}
            </motion.span>

            {/* Icon entering from the bottom-left */}
            <motion.span
              aria-hidden="true"
              variants={{
                rest: { x: "-160%", y: "160%" },
                hover: { x: "0%", y: "0%" },
              }}
              transition={{ duration: 0.5, delay: 0.06, ease }}
              className="absolute flex items-center justify-center"
            >
              {iconNode}
            </motion.span>
          </motion.span>
        </span>
      </Link>
    </motion.div>
  );
}
