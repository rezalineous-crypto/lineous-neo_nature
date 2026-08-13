"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { customEase } from "./Hero";

/* ============================================================
EXPERIENCE DATA
============================================================ */

const experiences = [
  {
    src: "/purura_resort_images/purura_render_10.jpg",
    alt: "Wellness and waterfront",
    caption: "WELLNESS",
    title: "Restorative Waters",
    description:
      "Bio-filtered lagoons meet holistic wellness programming. Hydrotherapy pools, meditation pavilions, and thermal suites create a sanctuary of calm.",
    size: "large",
    offset: "mt-0",
    reveal: "left",
  },
  {
    src: "/purura_resort_images/purura_render_16.jpg",
    alt: "Cultural experiences",
    caption: "CULTURE",
    title: "Living Culture",
    description:
      "Curated events, farm-to-table dining, and immersive performances. The resort becomes a stage for Bangladesh’s rich heritage.",
    size: "medium",
    offset: "mt-24 md:mt-32",
    reveal: "bottom",
  },
  {
    src: "/purura_resort_images/purura_render_19.jpg",
    alt: "Intelligent hospitality",
    caption: "INTELLIGENCE",
    title: "Seamless Service",
    description:
      "AI-powered concierge, smart room controls, and predictive service. Technology disappears into the experience.",
    size: "small",
    offset: "mt-12 md:mt-16",
    reveal: "right",
  },
  {
    src: "/purura_resort_images/purura_render_11.jpg",
    alt: "Private villa district",
    caption: "PRIVATE VILLAS",
    title: "Personal Retreats",
    description:
      "Pod, sky, and floating villa clusters. Each a private world, yet connected to the resort’s vibrant ecosystem.",
    size: "medium",
    offset: "mt-32 md:mt-48",
    reveal: "diagonal",
  },
  {
    src: "/purura_resort_images/purura_render_20.jpg",
    alt: "Dining experience",
    caption: "DINING",
    title: "Culinary Journey",
    description:
      "Eight venues, twelve cuisines. From rooftop bars to beachside grills, every meal is an event.",
    size: "large",
    offset: "mt-16 md:mt-24",
    reveal: "top",
  },
];

/* ============================================================
TYPES
============================================================ */

type RevealImageProps = {
  children: React.ReactNode;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
  direction: "left" | "right" | "top" | "bottom" | "diagonal";
};

/* ============================================================
IMAGE REVEAL
============================================================ */

function RevealImage({
  children,
  progress,
  start,
  end,
  direction,
}: RevealImageProps) {
  let clipFrom = "inset(0% 100% 0% 0%)";
  const clipTo = "inset(0% 0% 0% 0%)";

  switch (direction) {
    case "right":
      clipFrom = "inset(0% 0% 0% 100%)";
      break;
  }

  const clipPath = useTransform(progress, [start, end], [clipFrom, clipTo]);

  const imageScale = useTransform(progress, [start, end], [1.08, 1]);

  return (
    <motion.div
      style={{
        clipPath,
      }}
      className="relative overflow-hidden"
    >
      <motion.div
        style={{
          scale: imageScale,
        }}
        className="relative will-change-transform"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ============================================================
TEXT REVEAL
============================================================ */

function ExperienceText({
  children,
  progress,
  start,
  end,
}: {
  children: React.ReactNode;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
}) {
  const y = useTransform(progress, [start, end], [35, 0]);

  const opacity = useTransform(progress, [start, start + 0.08], [0, 1]);

  return (
    <motion.div
      style={{
        y,
        opacity,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
EXPERIENCES
============================================================ */

export default function Experiences() {
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
HEADER MOVEMENT
========================================================== */

  const headerY = useTransform(scrollYProgress, [0, 0.35], [40, 0]);

  const headerOpacity = useTransform(scrollYProgress, [0, 0.18], [0, 1]);

  /* ==========================================================
BACKGROUND MOVEMENT
========================================================== */

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  return (
    <section
      id="experiences"
      ref={sectionRef}
      className="
     relative
     overflow-hidden
     bg-void
     text-bone
     py-32
     md:py-40
     lg:py-48
   "
    >
      {/* =====================================================
      BACKGROUND ARCHITECTURAL ELEMENTS
      ===================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Fine grid */}

        <div
          className="
        absolute
        inset-0
        opacity-[0.03]
        bg-[linear-gradient(to_right,#EDEDE8_1px,transparent_1px),linear-gradient(to_bottom,#EDEDE8_1px,transparent_1px)]
        dark:bg-[linear-gradient(to_right,#EDEDE8_1px,transparent_1px),linear-gradient(to_bottom,#EDEDE8_1px,transparent_1px)]
        bg-size-[80px_80px]
      "
        />

        {/* Large contour circle */}

        <motion.div
          style={{
            y: backgroundY,
          }}
          className="
        absolute
        top-[25%]
        right-[-25%]
        w-[65vw]
        h-[65vw]
        rounded-full
        border
        border-bone/[0.12]
      "
        >
          <div
            className="
          absolute
          inset-[15%]
          rounded-full
          border
          border-bone/[0.08]
        "
          />

          <div
            className="
          absolute
          inset-[30%]
          rounded-full
          border
          border-bone/[0.06]
        "
          />
        </motion.div>

        {/* Horizontal architectural rules */}

        <div
          className="
        absolute
        top-[28%]
        left-0
        right-0
        h-px
        bg-bone/[0.08]
      "
        />

        <div
          className="
        absolute
        top-[73%]
        left-0
        right-0
        h-px
        bg-bone/[0.08]
      "
        />

        {/* Vertical rule */}

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

        {/* Giant ghost word */}

        <motion.div
          style={{
            y: backgroundY,
          }}
          className="
        absolute
        top-[20%]
        -right-[8vw]
        whitespace-nowrap
        select-none
      "
        >
          <span
            className="
          font-display
          font-bold
          text-[18vw]
          leading-none
          tracking-[-0.08em]
          text-bone/[0.04]
        "
          >
            EXPERIENCE
          </span>
        </motion.div>
      </div>
      {/* =====================================================
      HEADER
      ===================================================== */}
      <div
        className="
      relative
      z-10
      px-6
      md:px-12
      lg:px-20
    "
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            style={{
              y: headerY,
              opacity: headerOpacity,
            }}
            className="max-w-5xl"
          >
            {/* Annotation */}

            <motion.p
              initial={{
                opacity: 0,
                x: -20,
              }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      x: 0,
                    }
                  : {
                      opacity: 0,
                      x: -20,
                    }
              }
              transition={{
                duration: 1,
                delay: 0.2,
                ease: customEase,
              }}
              className="
            annotation
            text-bone/50
            mb-6
          "
            >
              EXPERIENCES
            </motion.p>

            {/* Heading */}

            <h2
              className="
            text-5xl
            md:text-7xl
            lg:text-8xl
            font-bold
            leading-[0.88]
            tracking-[-0.055em]
            text-bone
            font-display
            max-w-4xl
          "
            >
              <span className="block overflow-hidden">
                <motion.span
                  initial={{
                    y: "110%",
                  }}
                  animate={
                    isInView
                      ? {
                          y: 0,
                        }
                      : {
                          y: "110%",
                        }
                  }
                  transition={{
                    duration: 1.2,
                    delay: 0.35,
                    ease: customEase,
                  }}
                  className="block uppercase"
                >
                  Curated moments
                </motion.span>
              </span>

              <span className="block overflow-hidden ml-[6vw]">
                <motion.span
                  initial={{
                    y: "110%",
                  }}
                  animate={
                    isInView
                      ? {
                          y: 0,
                        }
                      : {
                          y: "110%",
                        }
                  }
                  transition={{
                    duration: 1.2,
                    delay: 0.48,
                    ease: customEase,
                  }}
                  className="block text-chrome1/80 uppercase"
                >
                  of wonder
                </motion.span>
              </span>
            </h2>

            {/* Intro */}

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
                duration: 1,
                delay: 0.7,
                ease: customEase,
              }}
              className="
            mt-8
            max-w-xl
            text-lg
            md:text-xl
            leading-relaxed
            text-bone/70
            font-display
          "
            >
              Every experience at PURURA is designed to create lasting memories.
              From wellness to culture, dining to discovery.
            </motion.p>
          </motion.div>

          {/* Header rule */}

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
              duration: 1.3,
              delay: 0.8,
              ease: customEase,
            }}
            style={{
              originX: 0,
            }}
            className="
          mt-16
          md:mt-20
          w-full
          h-px
          bg-bone/15
        "
          />
        </div>
      </div>
      {/* =====================================================
      EDITORIAL IMAGE COLLAGE
      ===================================================== */}
      <div
        className="
      relative
      z-10
      mt-20
      md:mt-28
      px-6
      md:px-12
      lg:px-20
    "
      >
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            {experiences.map((exp, index) => {
              /*
               * Each experience gets a different section
               * of scroll progress.
               *
               * This prevents every image from revealing
               * at exactly the same rhythm.
               */

              const start = 0.12 + index * 0.12;
              const end = start + 0.12;

              // eslint-disable-next-line react-hooks/rules-of-hooks
              const imageY = useTransform(
                scrollYProgress,
                [start, end + 0.2],
                [35, -35]
              );

              return (
                <motion.div
                  key={index}
                  style={{
                    y: imageY,
                  }}
                  className={`
                relative
                ${exp.offset}
                ${index % 2 === 0 ? "mr-auto" : "ml-auto"}
                ${
                  index % 3 === 0
                    ? "w-full md:w-2/3"
                    : index % 3 === 1
                    ? "w-full md:w-1/2"
                    : "w-full md:w-3/5"
                }
              `}
                >
                  {/* =================================================
                  INDEX / CONNECTOR
                  ================================================= */}

                  <div
                    className="
                  absolute
                  -top-8
                  left-0
                  right-0
                  flex
                  items-center
                  justify-between
                  pointer-events-none
                "
                  >
                    <span className="annotation text-bone/30">
                      0{index + 1}
                    </span>

                    <div className="flex items-center gap-3">
                      <span className="annotation text-bone/25">
                        {exp.caption}
                      </span>

                      <div className="w-8 md:w-16 h-px bg-bone/15" />
                    </div>
                  </div>

                  {/* =================================================
                  IMAGE
                  ================================================= */}

                  <RevealImage
                    progress={scrollYProgress}
                    start={start}
                    end={end}
                    direction={exp.reveal as RevealImageProps["direction"]}
                  >
                    <div className="relative overflow-hidden">
                      <Image
                        src={exp.src}
                        alt={exp.alt}
                        width={
                          exp.size === "large"
                            ? 1200
                            : exp.size === "medium"
                            ? 800
                            : 600
                        }
                        height={
                          exp.size === "large"
                            ? 800
                            : exp.size === "medium"
                            ? 600
                            : 500
                        }
                        className="
                      object-cover
                      w-full
                      h-auto
                    "
                        sizes="
                      (max-width: 768px) 100vw,
                      (max-width: 1200px) 50vw,
                      33vw
                    "
                      />

                      {/* Image overlay */}

                      <div
                        className="
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black/15
                      via-transparent
                      to-white/[0.05]
                      pointer-events-none
                    "
                      />
                    </div>
                  </RevealImage>

                  {/* =================================================
                  TEXT CONTENT
                  ================================================= */}

                  <ExperienceText
                    progress={scrollYProgress}
                    start={end - 0.04}
                    end={end + 0.06}
                  >
                    <div className="mt-6 max-w-md">
                      <p
                        className="
                      annotation
                      text-champagne
                      mb-3 font-bold
                    "
                      >
                        {exp.caption}
                      </p>

                      <h3
                        className="
                      text-2xl
                      md:text-3xl
                      font-bold
                      tracking-[-0.03em]
                      text-chrome1
                      font-display
                      mb-3
                    "
                      >
                        {exp.title}
                      </h3>

                      <p
                        className="
                      text-base
                      leading-relaxed
                      text-gray-800
                      dark:text-gray-500
                      font-display
                    "
                      >
                        {exp.description}
                      </p>
                    </div>
                  </ExperienceText>

                  {/* =================================================
                  FOOTER INDEX
                  ================================================= */}

                  <ExperienceText
                    progress={scrollYProgress}
                    start={end + 0.02}
                    end={end + 0.1}
                  >
                    <div
                      className="
                    mt-4
                    flex
                    items-center
                    justify-between
                  "
                    >
                      <p className="annotation text-bone/40">
                        0{index + 1} / 0{experiences.length}
                      </p>

                      <p className="annotation text-bone/30">
                        PURURA / EXPERIENCE
                      </p>
                    </div>
                  </ExperienceText>
                </motion.div>
              );
            })}
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
          delay: 1,
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
