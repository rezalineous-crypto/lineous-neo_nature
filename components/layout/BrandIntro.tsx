"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1];
const smoothEase: [number, number, number, number] = [0.76, 0, 0.24, 1];

const exitDuration = 1500;

type BrandIntroProps = {
  onComplete: () => void;
  minimumDuration?: number;
};

export default function BrandIntro({
  onComplete,
  minimumDuration = 3000,
}: BrandIntroProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const revealTimer = window.setTimeout(() => {
      setIsExiting(true);
    }, minimumDuration);

    const completeTimer = window.setTimeout(() => {
      onComplete();
    }, minimumDuration + exitDuration);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(completeTimer);
    };
  }, [minimumDuration, onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="brand-intro"
          className="fixed inset-0 z-[100] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          {/* ============================================================
              BASE
          ============================================================ */}

          <motion.div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 46%, rgba(215, 186, 123, 0.12), transparent 36%), #f4efe6",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: customEase }}
          />

          {/* ============================================================
              SUBTLE PAPER / FILM GRAIN
          ============================================================ */}

          <div
            className="pointer-events-none absolute inset-0 z-[1] opacity-[0.025]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='.8'/%3E%3C/svg%3E\")",
            }}
          />

          {/* ============================================================
              ARCHITECTURAL GRID
          ============================================================ */}

          <motion.div
            className="pointer-events-none absolute inset-0 z-[2]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: customEase }}
          >
            {/* Main vertical construction lines */}

            <div
              className="absolute bottom-0 left-[11%] top-0 w-px"
              style={{ background: "rgba(63, 58, 50, 0.055)" }}
            />

            <div
              className="absolute bottom-0 left-[50%] top-0 w-px"
              style={{ background: "rgba(63, 58, 50, 0.035)" }}
            />

            <div
              className="absolute bottom-0 right-[12%] top-0 w-px"
              style={{ background: "rgba(63, 58, 50, 0.055)" }}
            />

            {/* Horizontal construction line */}

            <div
              className="absolute left-0 right-0 top-[11%] h-px"
              style={{ background: "rgba(63, 58, 50, 0.04)" }}
            />

            <div
              className="absolute bottom-[11%] left-0 right-0 h-px"
              style={{ background: "rgba(63, 58, 50, 0.045)" }}
            />

            {/* Fine inner frame */}

            <div
              className="absolute inset-[18px] border"
              style={{ borderColor: "rgba(186, 145, 69, 0.16)" }}
            />

            <div
              className="absolute inset-[32px] border"
              style={{ borderColor: "rgba(63, 58, 50, 0.035)" }}
            />
          </motion.div>

          {/* ============================================================
              CORNER ARCHITECTURAL DETAILS
          ============================================================ */}

          <motion.div
            className="pointer-events-none absolute inset-[18px] z-[3] sm:inset-[28px]"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 1.3, delay: 0.25, ease: customEase }}
          >
            {/* Top left */}

            <div
              className="absolute left-0 top-0 h-16 w-16 border-l border-t sm:h-20 sm:w-20"
              style={{ borderColor: "rgba(190, 149, 73, 0.28)" }}
            />

            {/* Top right */}

            <div
              className="absolute right-0 top-0 h-16 w-16 border-r border-t sm:h-20 sm:w-20"
              style={{ borderColor: "rgba(190, 149, 73, 0.28)" }}
            />

            {/* Bottom left */}

            <div
              className="absolute bottom-0 left-0 h-16 w-16 border-b border-l sm:h-20 sm:w-20"
              style={{ borderColor: "rgba(190, 149, 73, 0.28)" }}
            />

            {/* Bottom right */}

            <div
              className="absolute bottom-0 right-0 h-16 w-16 border-b border-r sm:h-20 sm:w-20"
              style={{ borderColor: "rgba(190, 149, 73, 0.28)" }}
            />
          </motion.div>

          {/* ============================================================
              LARGE ARCHITECTURAL CIRCLES
          ============================================================ */}

          <motion.div
            className="pointer-events-none absolute right-[-24%] top-[8%] z-[2] aspect-square w-[72vw] max-w-[1050px]"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.8, delay: 0.15, ease: customEase }}
          >
            <div
              className="absolute inset-0 rounded-full border"
              style={{ borderColor: "rgba(67, 61, 51, 0.075)" }}
            />

            <div
              className="absolute inset-[13%] rounded-full border"
              style={{ borderColor: "rgba(67, 61, 51, 0.055)" }}
            />

            <div
              className="absolute inset-[26%] rounded-full border"
              style={{ borderColor: "rgba(67, 61, 51, 0.045)" }}
            />

            <div
              className="absolute inset-[39%] rounded-full border"
              style={{ borderColor: "rgba(67, 61, 51, 0.035)" }}
            />

            {/* Small registration point */}

            <motion.div
              className="absolute left-[13%] top-[48%] h-2 w-2 rounded-full"
              style={{
                background: "#c7a25b",
                boxShadow: "0 0 0 4px rgba(199, 162, 91, 0.08)",
              }}
              animate={{
                scale: [1, 1.35, 1],
                opacity: [0.45, 0.9, 0.45],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Small moving arc */}

            <motion.div
              className="absolute inset-[13%] rounded-full border-t border-transparent"
              style={{
                borderRightColor: "rgba(194, 155, 83, 0.22)",
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 28,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>

          {/* ============================================================
              LEFT EDITORIAL MARKER
          ============================================================ */}

          <motion.div
            className="absolute left-[7%] top-[19%] z-[6] hidden lg:block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -25 }}
            transition={{ duration: 0.9, delay: 0.65, ease: customEase }}
          >
            <div className="flex items-center gap-3">
              <span
                className="h-px w-8"
                style={{ background: "rgba(191, 151, 77, 0.45)" }}
              />

              <span
                className="font-mono text-[8px] uppercase tracking-[0.42em]"
                style={{ color: "rgba(61, 57, 50, 0.45)" }}
              >
                An intentional departure
              </span>
            </div>
          </motion.div>

          {/* ============================================================
              RIGHT EDITORIAL MARKER
          ============================================================ */}

          <motion.div
            className="absolute right-[7%] top-[50%] z-[6] hidden -translate-y-1/2 lg:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 25 }}
            transition={{ duration: 0.9, delay: 0.75, ease: customEase }}
          >
            <div className="flex flex-col items-center gap-3">
              <span
                className="h-8 w-px"
                style={{ background: "rgba(191, 151, 77, 0.45)" }}
              />

              <span
                className="font-mono text-[7px] uppercase tracking-[0.4em]"
                style={{
                  color: "rgba(61, 57, 50, 0.38)",
                  writingMode: "vertical-rl",
                }}
              >
                Purura / 2026
              </span>

              <span
                className="h-8 w-px"
                style={{ background: "rgba(191, 151, 77, 0.45)" }}
              />
            </div>
          </motion.div>

          {/* ============================================================
              CENTRAL BRAND COMPOSITION
          ============================================================ */}

          <div className="absolute inset-0 z-[7] flex items-center justify-center">
            <motion.div
              className="relative flex w-full max-w-[1400px] flex-col items-center px-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                scale: 1.025,
                filter: "blur(3px)",
              }}
              transition={{ duration: 0.8, ease: customEase }}
            >
              {/* Tiny top identity */}

              <motion.div
                className="mb-8 flex items-center gap-4 sm:mb-10"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{
                  duration: 0.85,
                  delay: 0.25,
                  ease: customEase,
                }}
              >
                <span
                  className="h-px w-7 sm:w-10"
                  style={{ background: "rgba(187, 145, 69, 0.45)" }}
                />

                <span
                  className="font-mono text-[7px] uppercase tracking-[0.55em] sm:text-[8px]"
                  style={{ color: "rgba(66, 61, 53, 0.5)" }}
                >
                  A New Beginning
                </span>

                <span
                  className="h-px w-7 sm:w-10"
                  style={{ background: "rgba(187, 145, 69, 0.45)" }}
                />
              </motion.div>

              {/* ========================================================
                  PURURA WORDMARK
              ======================================================== */}

              <div className="relative">
                {/* Soft gold atmospheric glow */}

                <motion.div
                  className="pointer-events-none absolute left-1/2 top-1/2 h-[55%] w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[70px]"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(202, 165, 91, 0.17), transparent 70%)",
                  }}
                  initial={{ opacity: 0, scale: 0.65 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 1.8,
                    delay: 0.35,
                    ease: customEase,
                  }}
                />

                {/* Wordmark reveal mask */}

                <motion.div
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0% 0 0)" }}
                  exit={{
                    clipPath: "inset(0 0 0 100%)",
                  }}
                  transition={{
                    duration: 1.45,
                    delay: 0.42,
                    ease: smoothEase,
                  }}
                >
                  <span
                    className="relative block whitespace-nowrap font-display text-[clamp(4.8rem,16vw,13.5rem)] font-semibold leading-[0.78] tracking-[-0.095em]"
                    style={{
                      color: "#c8a158",
                      textShadow: "0 8px 30px rgba(163, 126, 55, 0.08)",
                    }}
                  >
                    PURURA
                  </span>
                </motion.div>
              </div>

              {/* ========================================================
                  GOLD DIVIDER
              ======================================================== */}

              <motion.div
                className="relative mt-10 h-px sm:mt-12"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 150, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{
                  duration: 1.05,
                  delay: 1.05,
                  ease: smoothEase,
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(187, 144, 69, 0.7), transparent)",
                  }}
                />

                <motion.div
                  className="absolute left-1/2 top-1/2 h-[3px] w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    background: "#c8a158",
                    boxShadow: "0 0 12px rgba(200, 161, 88, 0.35)",
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 1.35,
                    ease: customEase,
                  }}
                />
              </motion.div>

              {/* ========================================================
                  SUBTITLE
              ======================================================== */}

              <motion.div
                className="mt-6 flex flex-col items-center"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{
                  duration: 0.9,
                  delay: 1.2,
                  ease: customEase,
                }}
              >
                <span
                  className="font-mono text-[9px] font-medium uppercase tracking-[0.52em]"
                  style={{ color: "rgba(57, 53, 47, 0.62)" }}
                >
                  Regenerative Hospitality
                </span>

                <span
                  className="mt-3 text-[7px] uppercase tracking-[0.38em]"
                  style={{ color: "rgba(181, 142, 70, 0.55)" }}
                >
                  Nature · Architecture · Future
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* ============================================================
              TOP CENTER BRAND MARK
          ============================================================ */}

          <motion.div
            className="absolute left-1/2 top-[40px] z-[8] -translate-x-1/2"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.8,
              delay: 0.75,
              ease: customEase,
            }}
          >
            <span
              className="font-mono text-[7px] uppercase tracking-[0.55em]"
              style={{ color: "rgba(57, 53, 47, 0.32)" }}
            >
              PURURA
            </span>
          </motion.div>

          {/* ============================================================
              BOTTOM STATUS
          ============================================================ */}

          <motion.div
            className="absolute bottom-[38px] left-1/2 z-[8] -translate-x-1/2"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{
              duration: 0.8,
              delay: 0.85,
              ease: customEase,
            }}
          >
            <div className="flex items-center gap-3 whitespace-nowrap">
              <span
                className="font-mono text-[7px] uppercase tracking-[0.42em]"
                style={{ color: "rgba(57, 53, 47, 0.34)" }}
              >
                Entering the experience
              </span>

              <span className="relative flex h-1.5 w-1.5">
                <motion.span
                  className="absolute inset-0 rounded-full"
                  style={{ background: "#c8a158" }}
                  animate={{
                    scale: [1, 2, 1],
                    opacity: [0.55, 0, 0.55],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <span
                  className="relative h-1.5 w-1.5 rounded-full"
                  style={{ background: "#c8a158" }}
                />
              </span>
            </div>
          </motion.div>

          {/* ============================================================
              EXIT SHUTTERS
          ============================================================ */}

          {/* ============================================================
    EXIT SHUTTERS — OPEN OUTWARD
============================================================ */}

          <motion.div
            className="absolute inset-x-0 top-0 z-[5] h-1/2"
            style={{
              background: "#f4efe6",
              borderBottom: "1px solid rgba(191, 151, 77, 0.15)",
            }}
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{
              duration: exitDuration / 1000,
              ease: smoothEase,
            }}
          />

          <motion.div
            className="absolute inset-x-0 bottom-0 z-[5] h-1/2"
            style={{
              background: "#f4efe6",
              borderTop: "1px solid rgba(191, 151, 77, 0.15)",
            }}
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              duration: exitDuration / 1000,
              ease: smoothEase,
            }}
          />

          {/* ============================================================
              CENTRAL GOLD REVEAL
          ============================================================ */}

          <motion.div
            className="absolute left-1/2 top-1/2 z-[30] h-px w-[120vw] -translate-x-1/2 -translate-y-1/2 origin-center"
            style={{
              background: "#c9a45d",
              boxShadow: "0 0 24px rgba(201, 164, 93, 0.22)",
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            exit={{
              scaleX: [0, 1, 1],
              opacity: [0, 0.9, 0],
            }}
            transition={{
              duration: 0.85,
              delay: 0.15,
              times: [0, 0.38, 1],
              ease: smoothEase,
            }}
          />

          {/* ============================================================
              FINAL VIGNETTE
          ============================================================ */}

          <div
            className="pointer-events-none absolute inset-0 z-[10]"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 48%, rgba(68, 61, 49, 0.055) 100%)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
