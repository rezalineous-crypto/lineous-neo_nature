"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type Pointer = {
  id: string;
  label: string;
  position: string;
  expandPosition: string;
  color: string;
  border: string;
};

const pointers: Pointer[] = [
  {
    id: "discover",
    label: "DISCOVER",
    position: "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2",
    expandPosition: "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2",
    color: "rgba(53, 94, 104, 0.82)",
    border: "rgba(211, 225, 222, 0.7)",
  },
  {
    id: "invest",
    label: "INVEST",
    position: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
    expandPosition: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
    color: "rgba(112, 99, 60, 0.78)",
    border: "rgba(221, 201, 146, 0.85)",
  },
  {
    id: "retreat",
    label: "RETREAT",
    position: "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2",
    expandPosition: "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2",
    color: "rgba(61, 96, 105, 0.82)",
    border: "rgba(197, 168, 102, 0.9)",
  },
];

const backgroundStates = {
  idle: "radial-gradient(circle at 50% 42%, rgba(105,143,150,0.24), transparent 32%), radial-gradient(circle at 20% 80%, rgba(30,94,108,0.35), transparent 38%), linear-gradient(135deg,#163f4d 0%,#0d3445 48%,#092c3b 100%)",

  discover:
    "radial-gradient(circle at 50% 38%, rgba(143,181,185,0.38), transparent 30%), radial-gradient(circle at 20% 70%, rgba(36,111,126,0.42), transparent 42%), linear-gradient(135deg,#1b5260 0%,#104052 48%,#0b3040 100%)",

  invest:
    "radial-gradient(circle at 50% 55%, rgba(181,159,101,0.22), transparent 30%), radial-gradient(circle at 70% 30%, rgba(72,101,85,0.35), transparent 40%), linear-gradient(135deg,#183f45 0%,#123b43 48%,#0d3039 100%)",

  retreat:
    "radial-gradient(circle at 38% 48%, rgba(105,151,158,0.34), transparent 32%), radial-gradient(circle at 70% 70%, rgba(42,91,103,0.4), transparent 40%), linear-gradient(135deg,#164956 0%,#0f3949 48%,#092f3e 100%)",
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function InvestmentBanner() {
  const [hovered, setHovered] = useState<string | null>(null);

  const background =
    hovered === "discover"
      ? backgroundStates.discover
      : hovered === "invest"
        ? backgroundStates.invest
        : hovered === "retreat"
          ? backgroundStates.retreat
          : backgroundStates.idle;

  return (
    <section className="relative min-h-[720px] w-full overflow-hidden bg-[#123f52] text-white md:min-h-screen">

      {/* =====================================================
          BACKGROUND
          ===================================================== */}

      <motion.div
        animate={{ background }}
        transition={{ duration: 1.1, ease }}
        className="absolute inset-0"
      />

      <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_20%_30%,white_0.6px,transparent_0.8px),radial-gradient(circle_at_70%_60%,white_0.5px,transparent_0.8px)] [background-size:90px_90px,130px_130px]" />

      <motion.div
        animate={{
          scale: hovered ? 1.15 : 1,
          opacity: hovered ? 0.2 : 0.12,
        }}
        transition={{ duration: 1.2, ease }}
        className="absolute left-1/2 top-[42%] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9bb9b4]/20 blur-[100px]"
      />

      {/* =====================================================
          CENTRAL SYSTEM
          ===================================================== */}

      <div className="absolute left-1/2 top-[44%] h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 md:h-[500px] md:w-[500px]">

        {/* Orbit */}
        <motion.div
          animate={{
            scale: hovered ? 1.015 : 1,
            borderColor:
              hovered === "invest"
                ? "rgba(221,201,146,0.6)"
                : hovered
                  ? "rgba(210,226,223,0.6)"
                  : "rgba(255,255,255,0.45)",
          }}
          transition={{ duration: 0.9, ease }}
          className="absolute inset-0 rounded-full border"
        />

        {/* =================================================
            POINTERS
            ================================================= */}

        {pointers.map((pointer) => {
          const isHovered = hovered === pointer.id;

          return (
            <div
              key={pointer.id}
              className={`absolute z-30 ${pointer.position}`}
              onMouseEnter={() => setHovered(pointer.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* ---------------------------------------------
                  EXTERNAL LABEL

                  This exists BEFORE hover.
                  --------------------------------------------- */}

              <motion.span
                animate={{
                  opacity: isHovered ? 0 : 1,
                  x:
                    pointer.id === "retreat"
                      ? -12
                      : 0,
                  y:
                    pointer.id === "discover"
                      ? -24
                      : pointer.id === "invest"
                        ? 24
                        : 0,
                }}
                transition={{ duration: 0.4, ease }}
                className={`pointer-events-none absolute whitespace-nowrap font-sans text-[11px] font-medium tracking-[0.22em] text-white/90 ${
                  pointer.id === "discover"
                    ? "bottom-full left-1/2 -translate-x-1/2"
                    : pointer.id === "invest"
                      ? "left-1/2 top-full -translate-x-1/2"
                      : "right-full top-1/2 -translate-y-1/2"
                }`}
              >
                {pointer.label}
              </motion.span>

              {/* ---------------------------------------------
                  DOT → CIRCLE
                  --------------------------------------------- */}

              <motion.button
                type="button"
                aria-label={pointer.label}
                animate={{
                  width: isHovered ? 140 : 16,
                  height: isHovered ? 140 : 16,
                  backgroundColor: isHovered ? pointer.color : "#ffffff",
                  borderWidth: isHovered ? 1 : 0,
                  borderColor: pointer.border,
                  boxShadow: isHovered
                    ? "0 0 55px rgba(190,210,205,0.16)"
                    : "0 0 20px rgba(255,255,255,0.35)",
                }}
                transition={{
                  duration: 0.65,
                  ease,
                }}
                className="relative flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full backdrop-blur-md"
              >
                {/* -----------------------------------------
                    LABEL INSIDE EXPANDED CIRCLE
                    ----------------------------------------- */}

                <motion.span
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    scale: isHovered ? 1 : 0.75,
                  }}
                  transition={{
                    duration: 0.35,
                    delay: isHovered ? 0.18 : 0,
                    ease,
                  }}
                  className="absolute whitespace-nowrap font-sans text-[11px] font-medium tracking-[0.22em] text-white"
                >
                  {pointer.label}
                </motion.span>
              </motion.button>
            </div>
          );
        })}

        {/* =================================================
            MAIN HEADLINE
            ================================================= */}

        <motion.div
          animate={{
            x:
              hovered === "discover"
                ? 8
                : hovered === "retreat"
                  ? 14
                  : hovered === "invest"
                    ? -5
                    : 0,
            scale: hovered ? 1.015 : 1,
          }}
          transition={{ duration: 0.9, ease }}
          className="absolute left-[38%] top-1/2 w-[390px] -translate-y-1/2 md:left-[34%] md:w-[470px]"
        >
          <h1 className="font-display text-[62px] font-light leading-[0.88] tracking-[-0.045em] text-white md:text-[76px] lg:text-[82px]">
            <span className="block">ELEGANCE</span>
            <span className="block">DRIVES</span>
            <span className="block">VALUE</span>
          </h1>
        </motion.div>
      </div>

      {/* =====================================================
          SCROLL
          ===================================================== */}

      <div className="absolute bottom-12 left-8 hidden flex-col items-center gap-5 md:flex">
        <span className="[writing-mode:vertical-rl] rotate-180 font-sans text-[11px] font-medium tracking-[0.28em] text-white/90">
          SCROLL
        </span>

        <motion.span
          animate={{ scaleY: [0.35, 1, 0.35], opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="h-20 w-px origin-top bg-white/70"
        />
      </div>

      {/* =====================================================
          DESCRIPTION
          ===================================================== */}

      <motion.div
        animate={{ opacity: hovered ? 0.65 : 0.9 }}
        transition={{ duration: 0.6, ease }}
        className="absolute bottom-12 right-8 max-w-[390px] md:right-16 lg:right-[18%]"
      >
        <p className="font-sans text-sm leading-[1.45] text-white/90 md:text-[15px]">
          The PURURA reflects a refined vision of progress, creating inspiring
          environments where timeless design and enduring quality come together
          seamlessly.
        </p>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
    </section>
  );
}