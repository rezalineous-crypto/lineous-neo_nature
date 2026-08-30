"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { customEase } from "./Hero";

/* ============================================================
TYPES
============================================================ */

type RevealLineProps = {
  children: React.ReactNode;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
  className?: string;
};

/* ============================================================
SCROLL REVEAL LINE
Each heading line is independently revealed from below.
============================================================ */

function RevealLine({
  children,
  progress,
  start,
  end,
  className = "",
}: RevealLineProps) {
  const y = useTransform(progress, [start, end], ["115%", "0%"]);

  const opacity = useTransform(progress, [start, start + 0.04], [0, 1]);

  return (
    <div className="overflow-hidden">
      <motion.span
        style={{
          y,
          opacity,
        }}
        className={`block will-change-transform ${className}`}
      >
        {children}
      </motion.span>{" "}
    </div>
  );
}

/* ============================================================
PHILOSOPHY
============================================================ */

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);

  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-100px",
  });

  /* ==========================================================
SCROLL PROGRESS
========================================================== */

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* ==========================================================
BACKGROUND PARALLAX
========================================================== */

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  const orbitRotate = useTransform(scrollYProgress, [0, 1], [0, 18]);

  const diagonalX = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  const secondaryDiagonalX = useTransform(
    scrollYProgress,
    [0, 1],
    ["3%", "-3%"]
  );

  /* ==========================================================
 VIDEO REVEAL
 ========================================================== */

  const videoClip1 = useTransform(scrollYProgress, [0.22, 0.36], ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"]);
  const videoScale1 = useTransform(scrollYProgress, [0.22, 0.36], [1.05, 1]);

  const videoClip2 = useTransform(scrollYProgress, [0.30, 0.44], ["inset(0% 0% 0% 100%)", "inset(0% 0% 0% 0%)"]);
  const videoScale2 = useTransform(scrollYProgress, [0.30, 0.44], [1.05, 1]);

  const videoClip3 = useTransform(scrollYProgress, [0.38, 0.52], ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"]);
  const videoScale3 = useTransform(scrollYProgress, [0.38, 0.52], [1.05, 1]);

  const videoClip4 = useTransform(scrollYProgress, [0.46, 0.60], ["inset(0% 0% 0% 100%)", "inset(0% 0% 0% 0%)"]);
  const videoScale4 = useTransform(scrollYProgress, [0.46, 0.60], [1.05, 1]);

  /* ==========================================================
COORDINATE MOVEMENT
========================================================== */

  const coordinateY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className=" relative min-h-screen overflow-hidden bg-void text-bone
   "
    >
      {/* =====================================================
ARCHITECTURAL BACKGROUND
===================================================== */}
      
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* -----------------------------------------------
        Fine architectural grid
        ----------------------------------------------- */}

        <div
          className=" absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#EDEDE8_1px,transparent_1px),linear-gradient(to_bottom,#EDEDE8_1px,transparent_1px)] bg-[size:80px_80px]
      "
        />

        {/* -----------------------------------------------
        Subtle central atmosphere
        ----------------------------------------------- */}

        <div
          className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full bg-bone/[0.03] blur-3xl
      "
        />

        {/* -----------------------------------------------
        Orbital / contour system
        ----------------------------------------------- */}

        <motion.div
          style={{
            y: backgroundY,
            rotate: orbitRotate,
          }}
          className=" absolute top-[8%] right-[-15%] w-[55vw] h-[55vw] rounded-full border border-bone/[0.12]
      "
        >
          <div
            className="
          absolute
          inset-[10%]
          rounded-full
          border
          border-bone/[0.08]
        "
          />

          <div
            className="
          absolute
          inset-[22%]
          rounded-full
          border
          border-bone/[0.06]
        "
          />

          <div
            className="
          absolute
          inset-[34%]
          rounded-full
          border
          border-bone/[0.05]
        "
          />

          {/* Orbit marker */}

          <div
            className="
          absolute
          top-1/2
          -left-1
          w-2
          h-2
          rounded-full
          bg-bone/30
        "
          />

          {/* Secondary marker */}

          <div
            className="
          absolute
          right-[18%]
          top-[10%]
          w-1.5
          h-1.5
          rounded-full
          bg-bone/25
        "
          />
        </motion.div>

        {/* -----------------------------------------------
        Horizontal construction lines
        ----------------------------------------------- */}

        <div
          className="
        absolute
        top-[23%]
        left-0
        right-0
        h-px
        bg-bone/[0.08]
      "
        />

        <div
          className="
        absolute
        top-[68%]
        left-0
        right-0
        h-px
        bg-bone/[0.08]
      "
        />

        {/* -----------------------------------------------
        Vertical construction lines
        ----------------------------------------------- */}

        <div
          className="
        absolute
        top-0
        bottom-0
        left-[12%]
        w-px
        bg-bone/[0.06]
      "
        />

        <div
          className="
        absolute
        top-0
        bottom-0
        right-[12%]
        w-px
        bg-bone/[0.06]
      "
        />

        {/* -----------------------------------------------
        Moving diagonal construction line
        ----------------------------------------------- */}

        <motion.div
          style={{
            x: diagonalX,
          }}
          className="
        absolute
        w-[120vw]
        h-px
        bg-bone/[0.06]
        rotate-[-17deg]
        top-[48%]
        left-[-10%]
      "
        />

        {/* -----------------------------------------------
        Second diagonal
        ----------------------------------------------- */}

        <motion.div
          style={{
            x: secondaryDiagonalX,
          }}
          className="
        absolute
        w-[100vw]
        h-px
        bg-bone/[0.05]
        rotate-[12deg]
        top-[34%]
        left-[20%]
      "
        />

        {/* -----------------------------------------------
        Large ghost PURURA typography
        ----------------------------------------------- */}

        <motion.div
          style={{
            y: backgroundY,
          }}
          className="
        absolute
        -top-[8vw]
        -left-[2vw]
        whitespace-nowrap
        select-none
      "
        >
          <span
            className="
          text-[22vw]
          md:text-[20vw]
          lg:text-[18vw]
          leading-none
          font-display
          font-bold
          tracking-[-0.08em]
          text-bone/[0.04]
        "
          >
            PURURA
          </span>
        </motion.div>
      </div>
      {/* =====================================================
      TOP LEFT ARCHITECTURAL ANNOTATION
      ===================================================== */}
      <motion.div
        initial={{
          opacity: 0,
          x: -30,
        }}
        animate={
          isInView
            ? {
                opacity: 1,
                x: 0,
              }
            : {
                opacity: 0,
                x: -30,
              }
        }
        transition={{
          duration: 1.2,
          delay: 0.2,
          ease: customEase,
        }}
        className="
      absolute
      top-10
      left-6
      md:top-14
      md:left-12
      lg:top-20
      lg:left-20
      z-20
      flex
      items-center
      gap-4
    "
      >
        <span className="annotation text-bone/60">PURURA</span>

        <div className="w-10 md:w-16 h-px bg-bone/30" />

        <span className="annotation text-bone/40">01 / PHILOSOPHY</span>
      </motion.div>
      {/* =====================================================
      RIGHT COORDINATE MARKERS
      ===================================================== */}
      <motion.div
        style={{
          y: coordinateY,
        }}
        className="
      absolute
      right-6
      md:right-12
      lg:right-20
      top-[35%]
      z-10
      flex
      flex-col
      items-end
      gap-2
      pointer-events-none
    "
      >
        <span className="annotation text-bone/30">23°43′ N</span>

        <span className="annotation text-bone/30">090°24′ E</span>

        <div className="w-12 h-px bg-bone/20 my-2" />

        <span className="annotation text-bone/30">VALUKA</span>
      </motion.div>
      {/* =====================================================
      LEFT SITE INFORMATION
      ===================================================== */}
      <div
        className=" absolute left-6 md:left-12 lg:left-20 bottom-[20%] z-10 hidden md:flex flex-col gap-3 pointer-events-none
    "
      >
        <span className="annotation text-bone/30">MASTERPLAN</span>

        <span className="annotation text-bone/25">SITE / 200 ACRES</span>

        <div className="flex items-center gap-3">
          <div className="w-8 h-px bg-bone/20" />

          <span className="annotation text-bone/30">01</span>
        </div>
      </div>
      {/* =====================================================
      MAIN CONTENT
      ===================================================== */}
      <div className="relative z-10 min-h-screen">
        <div
          className="
        w-full
        px-6
        md:px-12
        lg:px-20
        py-32
        md:py-40
        lg:py-48
      "
        >
          <div className="max-w-7xl mx-auto">
            {/* =================================================
            GIANT TYPOGRAPHY
            ================================================= */}

            <div className="relative max-w-6xl">
              {/* Eyebrow */}

              <motion.p
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        y: 0,
                      }
                    : {
                        opacity: 0,
                        y: 20,
                      }
                }
                transition={{
                  duration: 1,
                  delay: 0.35,
                  ease: customEase,
                }}
                className="
              annotation
              text-bone/50
              mb-8
              md:mb-10
            "
              >
                AN INTENTIONAL DEPARTURE
              </motion.p>

              {/* =================================================
              SCROLL REVEAL HEADING
              ================================================= */}

              <h2
                className="
              text-giant
              font-display
              font-medium
              leading-[0.82]
              tracking-[-0.065em]
              text-bone/90
            "
              >
                <RevealLine progress={scrollYProgress} start={0.08} end={0.18}>
                  A <span className="dark:text-chrome1">DIFFERENT</span>
                </RevealLine>

                <RevealLine
                  progress={scrollYProgress}
                  start={0.15}
                  end={0.25}
                  className="
                ml-[7vw]
                md:ml-[10vw]
              "
                >
                  KIND OF
                </RevealLine>

                <RevealLine
                  progress={scrollYProgress}
                  start={0.22}
                  end={0.32}
                  className="
                ml-[2vw]
                md:ml-[3vw]
                text-bone/40
                dark:text-chrome1
              "
                >
                  ESCAPE
                </RevealLine>
              </h2>
            </div>

            {/* =================================================
            IMAGE + ARCHITECTURAL SYSTEM
            ================================================= */}

            <div
              className="
            relative
            mt-24
            md:mt-32
            lg:mt-40
            space-y-16
            md:space-y-24
          "
            >
              {/* Vertical measurement line */}

              <motion.div
                initial={{
                  scaleY: 0,
                }}
                animate={
                  isInView
                    ? {
                        scaleY: 1,
                      }
                    : {
                        scaleY: 0,
                      }
                }
                transition={{
                  duration: 1.6,
                  delay: 0.9,
                  ease: customEase,
                }}
                style={{
                  originY: 0,
                }}
                className="
              absolute
              left-0
              top-0
              bottom-0
              w-px
              bg-bone/0
            "
              />

              {/* Row 1: Text (1/3) - Video (2/3) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 items-center">
                <motion.div
                  style={{ opacity: videoClip1 }}
                  className="lg:col-span-1 order-2 lg:order-1"
                >
                  <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-chrome1/60 mb-3">
                    Sports & Recreation
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-[-0.03em] text-bone/90 font-display mb-3">
                    Badminton Courts
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed text-bone/50 font-display">
                    World-class courts designed for both casual play and competitive matches, surrounded by lush landscape.
                  </p>
                </motion.div>
                <motion.div
                  style={{ clipPath: videoClip1, scale: videoScale1 }}
                  className="lg:col-span-2 order-1 lg:order-2 relative aspect-[16/10] overflow-hidden rounded-2xl bg-graphite"
                >
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src="/Opt video/Badminto Court-01.webm" type="video/webm" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </motion.div>
              </div>

              {/* Row 2: Video (2/3) - Text (1/3) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 items-center">
                <motion.div
                  style={{ clipPath: videoClip2, scale: videoScale2 }}
                  className="lg:col-span-2 relative aspect-[16/10] overflow-hidden rounded-2xl bg-graphite"
                >
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src="/Opt video/Pool Side View with hotel.webm" type="video/webm" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </motion.div>
                <motion.div
                  style={{ opacity: videoClip2 }}
                  className="lg:col-span-1"
                >
                  <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-chrome1/60 mb-3">
                    Hotel & Leisure
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-[-0.03em] text-bone/90 font-display mb-3">
                    Infinity Pools
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed text-bone/50 font-display">
                    Crystal-clear infinity pools that merge with the horizon, offering panoramic views of the resort landscape.
                  </p>
                </motion.div>
              </div>

              {/* Row 3: Text (1/3) - Video (2/3) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 items-center">
                <motion.div
                  style={{ opacity: videoClip3 }}
                  className="lg:col-span-1 order-2 lg:order-1"
                >
                  <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-chrome1/60 mb-3">
                    Arrival Experience
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-[-0.03em] text-bone/90 font-display mb-3">
                    Reception Pavilion
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed text-bone/50 font-display">
                    A futuristic gateway where autonomous mobility meets biometric check-in, framed by living walls and water features.
                  </p>
                </motion.div>
                <motion.div
                  style={{ clipPath: videoClip3, scale: videoScale3 }}
                  className="lg:col-span-2 order-1 lg:order-2 relative aspect-[16/10] overflow-hidden rounded-2xl bg-graphite"
                >
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src="/Opt video/reception building from pool view.webm" type="video/webm" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </motion.div>
              </div>

              {/* Row 4: Video (2/3) - Text (1/3) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 items-center">
                <motion.div
                  style={{ clipPath: videoClip4, scale: videoScale4 }}
                  className="lg:col-span-2 relative aspect-[16/10] overflow-hidden rounded-2xl bg-graphite"
                >
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src="/Opt video/Swiming activity-02.webm" type="video/webm" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </motion.div>
                <motion.div
                  style={{ opacity: videoClip4 }}
                  className="lg:col-span-1"
                >
                  <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-chrome1/60 mb-3">
                    Wellness & Aquatics
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-[-0.03em] text-bone/90 font-display mb-3">
                    Aquatic Activities
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed text-bone/50 font-display">
                    Bio-filtered lagoons and hydrotherapy spaces where water becomes a medium for restoration and play.
                  </p>
                </motion.div>
              </div>
            </div>

            {/* =================================================
            SUPPORTING STATEMENT
            ================================================= */}

            <div
              className="
            mt-24
            md:mt-32
            lg:mt-40
            grid
            grid-cols-1
            md:grid-cols-12
            gap-8
          "
            >
              {/* Number */}

              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                      }
                    : {
                        opacity: 0,
                      }
                }
                transition={{
                  duration: 1,
                  delay: 1.7,
                }}
                className="md:col-span-2"
              >
                <span className="annotation text-bone/40">01</span>
              </motion.div>

              {/* Line */}

              <motion.div
                initial={{
                  scaleX: 0,
                }}
                animate={
                  isInView
                    ? {
                        scaleX: 1,
                      }
                    : {
                        scaleX: 0,
                      }
                }
                transition={{
                  duration: 1.2,
                  delay: 1.65,
                  ease: customEase,
                }}
                style={{
                  originX: 0,
                }}
                className="
              hidden
              md:block
              md:col-span-2
              h-px
              bg-bone/20
              mt-3
            "
              />

              {/* Copy */}
              <motion.p
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        y: 0,
                      }
                    : {
                        opacity: 0,
                        y: 30,
                      }
                }
                transition={{
                  duration: 1.2,
                  delay: 1.75,
                  ease: customEase,
                }}
                className="
              md:col-span-6
              md:col-start-5
              text-lg
              md:text-xl
              lg:text-2xl
              leading-[1.5]
              text-bone/70
              font-display
            "
              >
                Where regenerative landscapes, luxury hospitality, and
                future-ready technology converge into a single, cohesive
                experience.
              </motion.p>
            </div>
          </div>
        </div>
      </div>
      {/* =====================================================
      BOTTOM ARCHITECTURAL LINE
      ===================================================== */}
      <motion.div
        initial={{
          scaleX: 0,
        }}
        animate={
          isInView
            ? {
                scaleX: 1,
              }
            : {
                scaleX: 0,
              }
        }
        transition={{
          duration: 1.5,
          delay: 1.9,
          ease: customEase,
        }}
        style={{
          originX: 0,
        }}
        className="
      absolute
      bottom-0
      inset-x-0
      h-px
      bg-bone/15
    "
      />
    </section>
  );
}
