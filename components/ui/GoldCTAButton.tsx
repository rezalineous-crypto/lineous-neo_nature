"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface GoldCTAButtonProps {
  href?: string;
  label?: string;
  className?: string;
}

export default function GoldCTAButton({
  href = "/investment",
  label = "Invest now",
  className = "",
}: GoldCTAButtonProps) {
  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={{
        rest: { scale: 1, boxShadow: "0 0 0 rgba(196, 165, 82, 0)" },
        hover: { scale: 1.03, boxShadow: "0 8px 30px rgba(196, 165, 82, 0.35)" },
        tap: { scale: 0.97, boxShadow: "0 2px 10px rgba(196, 165, 82, 0.2)" },
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`relative inline-flex ${className} overflow-hidden`}
    >
      <Link
        href={href}
        className="group relative flex h-10 w-[142px] items-center overflow-visible bg-[#C4A552] px-5 md:h-11 md:w-[154px] md:px-6"
      >
        {/* Subtle surface movement */}
        <motion.span
          variants={{
            rest: { x: "-120%", opacity: 0 },
            hover: { x: "120%", opacity: 0.16 },
          }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-y-0 left-[-30%] w-1/2 skew-x-[-18deg] bg-white"
        />

        {/* Text */}
        <motion.span
          variants={{
            rest: { x: 0 },
            hover: { x: 2 },
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 whitespace-nowrap font-display text-[20px] font-light tracking-[-0.045em] text-[#182019] md:text-[21px]"
        >
          {label}
        </motion.span>

        {/* Architectural line */}
        <span className="absolute left-[calc(100%-20px)] top-1/2 h-px w-[62px] -translate-y-1/2 bg-[#182019]/65 md:w-[72px]" />

        {/* Hover line highlight */}
        <motion.span
          variants={{
            rest: { scaleX: 0, opacity: 0 },
            hover: { scaleX: 1, opacity: 0.7 },
          }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-[calc(100%-20px)] top-1/2 h-px w-[62px] origin-left -translate-y-1/2 bg-[#F0E4BC] md:w-[72px]"
        />

        {/* Small endpoint */}
        <motion.span
          variants={{
            rest: { scale: 0.6, opacity: 0.4 },
            hover: { scale: 1, opacity: 1 },
          }}
          transition={{ duration: 0.3 }}
          className="absolute left-[calc(100%+40px)] top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-[#182019]"
        />
      </Link>
    </motion.div>
  );
}
