"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { customEase } from "./Hero";

const smoothEase: [number, number, number, number] = [
  0.16,
  1,
  0.3,
  1,
];

export default function Legacy() {
  const sectionRef = useRef<HTMLElement>(null);

  /*
   * ================================================================
   * STICKY HORIZONTAL SCROLL
   *
   * The section is 300vh tall.
   *
   * While the user scrolls through those 300vh, the inner viewport
   * stays fixed and the horizontal track travels from:
   *
   * 0vw → -200vw
   *
   * This creates three full-screen horizontal scenes.
   * ================================================================
   */

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    mass: 0.25,
  });

  /*
   * ================================================================
   * HORIZONTAL TRACK
   * ================================================================
   */

  const trackX = useTransform(
    progress,
    [0, 1],
    ["0vw", "-200vw"]
  );

  /*
   * ================================================================
   * SCENE 01 — GIANT TYPOGRAPHY
   * ================================================================
   */

  const titleX = useTransform(
    progress,
    [0, 0.28, 0.38],
    ["0vw", "-5vw", "-22vw"]
  );

  const titleScale = useTransform(
    progress,
    [0, 0.25, 0.4],
    [1, 0.96, 0.82]
  );

  const titleOpacity = useTransform(
    progress,
    [0, 0.28, 0.43],
    [1, 1, 0]
  );

  /*
   * ================================================================
   * SCENE 02 — ARCHITECTURAL IMAGE
   * ================================================================
   */

  const imageScale = useTransform(
    progress,
    [0.25, 0.42, 0.67],
    [0.84, 1, 1.04]
  );

  const imageY = useTransform(
    progress,
    [0.25, 0.45, 0.67],
    ["8vh", "0vh", "-3vh"]
  );

  const imageOpacity = useTransform(
    progress,
    [0.27, 0.36, 0.68],
    [0, 1, 1]
  );

  const imageRotate = useTransform(
    progress,
    [0.28, 0.45, 0.68],
    [1.8, 0, -0.6]
  );

  const imageInnerX = useTransform(
    progress,
    [0.28, 0.48, 0.68],
    ["5%", "0%", "-3%"]
  );

  /*
   * ================================================================
   * SCENE 02 — IMAGE LABEL
   * ================================================================
   */

  const imageLabelX = useTransform(
    progress,
    [0.34, 0.52, 0.68],
    ["35px", "0px", "-25px"]
  );

  /*
   * ================================================================
   * SCENE 03 — CLOSING STATEMENT
   * ================================================================
   */

  const closingOpacity = useTransform(
    progress,
    [0.62, 0.74, 0.92],
    [0, 1, 1]
  );

  const closingY = useTransform(
    progress,
    [0.62, 0.74, 0.95],
    ["80px", "0px", "-20px"]
  );

  const closingScale = useTransform(
    progress,
    [0.65, 0.78, 1],
    [0.92, 1, 1.02]
  );

  /*
   * ================================================================
   * SCENE 03 — LARGE BACKGROUND WORD
   * ================================================================
   */

  const escapeX = useTransform(
    progress,
    [0.65, 0.82, 1],
    ["12vw", "0vw", "-6vw"]
  );

  const escapeOpacity = useTransform(
    progress,
    [0.66, 0.8, 1],
    [0, 0.08, 0.13]
  );

  /*
   * ================================================================
   * ARCHITECTURAL GRID PARALLAX
   * ================================================================
   */

  const gridX = useTransform(
    progress,
    [0, 1],
    ["0vw", "-35vw"]
  );

  /*
   * ================================================================
   * GOLD AXIS
   * ================================================================
   */

  const axisProgress = useTransform(
    progress,
    [0, 0.35, 0.68, 1],
    [0, 0.45, 0.78, 1]
  );

  /*
   * ================================================================
   * PROGRESS INDICATOR
   * ================================================================
   */

  const progressWidth = useTransform(
    progress,
    [0, 1],
    ["0%", "100%"]
  );

  return (
    <section
      id="legacy"
      ref={sectionRef}
      className="relative h-[300vh] bg-void"
    >
      {/* ==============================================================
          STICKY VIEWPORT

          IMPORTANT:
          The outer section intentionally does NOT have overflow-hidden.
          This allows position: sticky to behave correctly.
          ==============================================================
      */}

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* ============================================================
            FIXED BACKGROUND
        ============================================================ */}

        <div className="pointer-events-none absolute inset-0 z-0">
          {/* Main atmospheric glow */}
          <div
            className="absolute left-1/2 top-1/2 h-[70vw] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(196,153,78,0.075) 0%, rgba(196,153,78,0.025) 34%, transparent 68%)",
              filter: "blur(20px)",
            }}
          />

          {/* Secondary atmosphere */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 75% 45%, rgba(126,153,169,0.035), transparent 40%)",
            }}
          />

          {/* Moving architectural grid */}
          <motion.div
            style={{ x: gridX }}
            className="absolute -inset-[20%] opacity-[0.15]"
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(
                    to right,
                    rgba(255,255,255,0.055) 1px,
                    transparent 1px
                  ),
                  linear-gradient(
                    to bottom,
                    rgba(255,255,255,0.055) 1px,
                    transparent 1px
                  )
                `,
                backgroundSize: "90px 90px",
                maskImage:
                  "radial-gradient(circle at 50% 50%, black 0%, transparent 70%)",
                WebkitMaskImage:
                  "radial-gradient(circle at 50% 50%, black 0%, transparent 70%)",
              }}
            />
          </motion.div>

          {/* Large architectural circles */}
          <div className="absolute left-[50%] top-[48%] h-[55vw] w-[55vw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.045]" />

          <div className="absolute left-[50%] top-[48%] h-[37vw] w-[37vw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-champagne/[0.07]" />

          <div className="absolute left-[50%] top-[48%] h-[20vw] w-[20vw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.035]" />

          {/* Vertical axis */}
          <div className="absolute bottom-0 left-1/2 top-0 w-px bg-gradient-to-b from-transparent via-white/[0.035] to-transparent" />

          {/* Horizontal axis */}
          <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-white/[0.035] to-transparent" />
        </div>

        {/* ============================================================
            TOP METADATA
        ============================================================ */}

        <div className="pointer-events-none absolute left-8 right-8 top-8 z-50 flex items-start justify-between md:left-12 md:right-12 md:top-10 lg:left-20 lg:right-20 lg:top-14">
          <div>
            <p className="annotation text-bone/50">
              37° 41&rsquo; 22&Prime;N
            </p>

            <div className="mt-2 flex items-center gap-3">
              <span className="h-px w-7 bg-champagne/40" />

              <p className="annotation text-bone/25">
                VALUKA / BANGLADESH
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="annotation text-bone/25">
              PURURA / 001
            </p>

            <p className="mt-2 annotation text-champagne/40">
              FUTURE / PLACE / VALUE
            </p>
          </div>
        </div>

        {/* ============================================================
            HORIZONTAL TRACK
        ============================================================ */}

        <motion.div
          style={{ x: trackX }}
          className="relative z-10 flex h-full w-[300vw]"
        >
          {/* ==========================================================
              PANEL 01 — THE FUTURE OF ESCAPE
          ========================================================== */}

          <div className="relative h-full w-screen shrink-0">
            <motion.div
              style={{
                x: titleX,
                scale: titleScale,
                opacity: titleOpacity,
              }}
              className="absolute left-[7vw] top-1/2 w-[88vw] -translate-y-1/2"
            >
              <motion.h2
                initial={{
                  opacity: 0,
                  y: 80,
                  filter: "blur(12px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 1.5,
                  delay: 0.25,
                  ease: customEase,
                }}
                className="text-giant font-display leading-[0.82] tracking-[-0.055em] text-bone text-shadow-lg"
              >
                THE{" "}
                <span className="text-chrome1 dark:text-champagne">
                  FUTURE
                </span>

                <br />

                <span className="ml-[7vw]">
                  OF{" "}
                  <span className="text-chrome1 dark:text-champagne">
                    ESCAPE
                  </span>
                </span>
              </motion.h2>

              {/* Editorial annotation */}
              <motion.div
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 1,
                  delay: 1.05,
                  ease: customEase,
                }}
                className="mt-10 flex items-center gap-4"
              >
                <span className="h-px w-12 bg-champagne/50" />

                <span className="annotation text-bone/35">
                  A NEW DIMENSION OF PLACE
                </span>
              </motion.div>
            </motion.div>

            {/* Panel edge marker */}
            <div className="absolute bottom-[14%] left-[7vw]">
              <p className="annotation text-bone/20">
                01 / 03
              </p>
            </div>
          </div>

          {/* ==========================================================
              PANEL 02 — ARCHITECTURAL VISION
          ========================================================== */}

          <div className="relative h-full w-screen shrink-0">
            <motion.div
              style={{
                y: imageY,
                scale: imageScale,
                opacity: imageOpacity,
                rotate: imageRotate,
              }}
              className="absolute left-[9vw] top-[15%] w-[72vw] max-w-[1100px] md:left-[12vw] md:w-[67vw] lg:left-[13vw] lg:w-[61vw]"
            >
              {/* Registration corners */}
              <span className="absolute -left-4 -top-4 z-30 h-8 w-8 border-l border-t border-champagne/55" />

              <span className="absolute -right-4 -top-4 z-30 h-8 w-8 border-r border-t border-champagne/55" />

              <span className="absolute -bottom-4 -left-4 z-30 h-8 w-8 border-b border-l border-champagne/55" />

              <span className="absolute -bottom-4 -right-4 z-30 h-8 w-8 border-b border-r border-champagne/55" />

              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden border border-white/10 bg-[#0c0c0c]">
                <motion.div
                  style={{
                    x: imageInnerX,
                  }}
                  className="absolute inset-0 scale-[1.08]"
                >
                  <Image
                    src="/purura_resort_images/purura_render_01.jpg"
                    alt="PURURA — Architectural Vision"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 90vw, 65vw"
                  />
                </motion.div>

                {/* Image darkness */}
                <div className="absolute inset-0 bg-gradient-to-t from-void/55 via-transparent to-black/10" />

                {/* Architectural scan */}
                <motion.div
                  initial={{ y: "-120%" }}
                  animate={{ y: "120%" }}
                  transition={{
                    duration: 3.5,
                    delay: 0.5,
                    ease: [0.65, 0, 0.35, 1],
                  }}
                  className="absolute inset-x-0 top-0 h-[25%] bg-gradient-to-b from-transparent via-white/[0.04] to-transparent"
                />
              </div>

              {/* Image title */}
              <motion.div
                style={{
                  x: imageLabelX,
                }}
                className="absolute -bottom-12 left-0 flex items-center gap-4"
              >
                <span className="h-px w-12 bg-champagne/50" />

                <div>
                  <p className="annotation text-bone/45">
                    ARCHITECTURAL VISION
                  </p>

                  <p className="mt-1 annotation text-bone/20">
                    MASTERPLAN / 01
                  </p>
                </div>
              </motion.div>

              {/* Top right coordinates */}
              <div className="absolute -right-1 -top-9 text-right">
                <p className="annotation text-bone/20">
                  01.03
                </p>

                <p className="mt-1 annotation text-champagne/35">
                  FUTURE RESORT
                </p>
              </div>
            </motion.div>

            {/* Panel number */}
            <div className="absolute bottom-[14%] left-[13vw]">
              <p className="annotation text-bone/20">
                02 / 03
              </p>
            </div>
          </div>

          {/* ==========================================================
              PANEL 03 — REGENERATIVE HOSPITALITY
          ========================================================== */}

          <div className="relative h-full w-screen shrink-0">
            {/* Huge background ESCAPE */}
            <motion.div
              style={{
                x: escapeX,
                opacity: escapeOpacity,
              }}
              className="pointer-events-none absolute left-[5vw] top-1/2 -translate-y-1/2 whitespace-nowrap"
            >
              <span className="font-display text-[25vw] font-semibold uppercase tracking-[-0.08em] text-bone">
                ESCAPE
              </span>
            </motion.div>

            {/* Main statement */}
            <motion.div
              style={{
                y: closingY,
                opacity: closingOpacity,
                scale: closingScale,
              }}
              className="absolute left-[10vw] top-1/2 w-[76vw] max-w-[1100px] -translate-y-1/2"
            >
              <p className="annotation mb-8 text-champagne/60">
                REGENERATIVE HOSPITALITY
              </p>

              <h3 className="max-w-[1050px] font-display text-[clamp(2.7rem,6.5vw,7rem)] leading-[0.95] tracking-[-0.045em] text-bone">
                Where nature,
                <br />
                technology, and
                <br />
                <span className="text-chrome1 dark:text-champagne">
                  human aspiration
                </span>{" "}
                converge.
              </h3>

              <div className="mt-12 flex max-w-[600px] items-start gap-5">
                <span className="mt-2 h-px w-12 shrink-0 bg-champagne/50" />

                <p className="font-display text-base leading-[1.7] text-bone/45 md:text-lg">
                  A destination shaped around the idea that hospitality
                  can become more than an escape — it can become a
                  relationship between people, place, and the future.
                </p>
              </div>
            </motion.div>

            {/* Final technical data */}
            <div className="absolute bottom-[14%] left-[10vw] flex items-center gap-8">
              <p className="annotation text-bone/20">
                03 / 03
              </p>

              <span className="h-px w-12 bg-bone/10" />

              <p className="annotation text-bone/20">
                PURURA / VALUKA
              </p>
            </div>
          </div>
        </motion.div>

        {/* ============================================================
            CENTER GOLD AXIS
        ============================================================ */}

        <div className="pointer-events-none absolute bottom-[17%] left-0 right-0 z-40">
          <div className="mx-auto h-px w-[42vw] bg-white/[0.05]" />

          <motion.div
            style={{
              scaleX: axisProgress,
            }}
            className="absolute left-1/2 top-0 h-px w-[42vw] origin-left -translate-x-1/2 bg-gradient-to-r from-transparent via-champagne/60 to-transparent"
          />
        </div>

        {/* ============================================================
            BOTTOM INTERFACE
        ============================================================ */}

        <div className="pointer-events-none absolute bottom-7 left-8 right-8 z-50 flex items-center justify-between md:left-12 md:right-12 lg:left-20 lg:right-20">
          <div className="flex items-center gap-3">
            <span className="annotation text-bone/25">
              LEGACY
            </span>

            <span className="h-px w-10 bg-bone/10" />

            <span className="annotation text-bone/20">
              PURURA
            </span>
          </div>

          <div className="hidden items-center gap-4 sm:flex">
            <span className="annotation text-bone/20">
              SCROLL TO EXPLORE
            </span>

            <div className="relative h-px w-24 overflow-hidden bg-white/10">
              <motion.div
                style={{
                  width: progressWidth,
                }}
                className="absolute inset-y-0 left-0 bg-champagne/60"
              />
            </div>
          </div>
        </div>

        {/* ============================================================
            SIDE REGISTRATION LINES
        ============================================================ */}

        <div className="pointer-events-none absolute bottom-0 left-[6vw] top-0 z-40 hidden w-px bg-white/[0.025] lg:block" />

        <div className="pointer-events-none absolute bottom-0 right-[6vw] top-0 z-40 hidden w-px bg-white/[0.025] lg:block" />

        {/* Bottom border */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-50 h-px bg-bone/10" />
      </div>
    </section>
  );
}