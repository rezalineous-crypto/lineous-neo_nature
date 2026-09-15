"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Scene = {
  id: "discover" | "retreat" | "experience" | "amenities";
  heading: string;
  headingBoldWords?: string[];
  accent: string;
  accentBoldWords?: string[];
  description: string;
  images: {
    back: string;
    center: string;
    front: string;
  };
};

{
  /* ======================================================
  ROUNDED OUTER CORNER FRAME
  ====================================================== */
}

const RoundedCornerFrame = ({ className = "" }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 106 106"
    preserveAspectRatio="none"
    className={`pointer-events-none absolute -inset-1 z-20 h-[calc(100%+30px)] w-[calc(100%+30px)] overflow-visible ${className}`}
    fill="none"
  >
    {/* Exposed top-left corner */}
    <path
      d="M 4 34 V 9 Q 4 4 9 4 H 34"
      stroke="#c8a158"
      strokeWidth="1.15"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Exposed bottom-right corner */}
    <path
      d="M 72 102 H 97 Q 102 102 102 97 V 72"
      stroke="#c8a158"
      strokeWidth="1.15"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/*
 * ======================================================
 * HEADING WORD WEIGHT
 * Renders a heading line, marking only the supplied
 * words as semibold while the rest stays font-light.
 * ======================================================
 */
const BoldHeadingLine = ({
  text,
  boldWords,
}: {
  text: string;
  boldWords: string[];
}) => {
  const parts = text.split(/(\s+)/);
  return (
    <>
      {parts.map((part, index) => {
        const isBold = boldWords.includes(part.toUpperCase());
        return (
          <span key={index} className={isBold ? "font-semibold" : "font-light"}>
            {part}
          </span>
        );
      })}
    </>
  );
};

const scenes: Scene[] = [
  {
    id: "discover",
    heading: "CONCEPT OF ",
    headingBoldWords: ["CONCEPT"],
    accent: "THE VISION",
    accentBoldWords: ["VISION"],
    description:
      "The Living Archipelago is envisioned as a next-generation luxury resort where futuristic architecture, immersive landscape, and intelligent water systems operate as a unified ecological framework that collectively create an immersive hospitality experience.",
    images: {
      back: "/Purura/NewImages/Overall 11.png",
      center: "/Purura/NewImages/Overall 2.png",
      front: "/Purura/NewImages/Overall 5.png",
    },
  },
  // {
  //   id: "retreat",
  //   heading: "THE ART OF",
  //   accent: "RETREAT INTO NATURE",
  //   description:
  //     "A sanctuary shaped around the rhythm of nature, where architecture becomes quieter, spaces become more intimate and every experience is designed to restore.",
  //   images: {
  //     back: "/images/resort-04.jpg",
  //     center: "/images/resort-05.jpg",
  //     front: "/images/resort-06.jpg",
  //   },
  // },
  // {
  //   id: "experience",
  //   heading: "THE ART OF",
  //   accent: "LIVING DIFFERENTLY",
  //   description:
  //     "A new expression of hospitality where immersive architecture, thoughtful technology and the surrounding landscape come together as one continuous experience.",
  //   images: {
  //     back: "/images/resort-07.jpg",
  //     center: "/images/resort-08.jpg",
  //     front: "/images/resort-09.jpg",
  //   },
  // },
  // {
  //   id: "amenities",
  //   heading: "THE ART OF",
  //   accent: "EFFORTLESS INDULGENCE",
  //   description:
  //     "Every detail has been considered to create an environment that feels effortless, intimate and deeply connected to its surroundings.",
  //   images: {
  //     back: "/images/resort-10.jpg",
  //     center: "/images/resort-11.jpg",
  //     front: "/images/resort-12.jpg",
  //   },
  // },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function InvestmentBanner() {
  const sectionRef = useRef<HTMLElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const activeSceneIndex = hoveredIndex ?? activeIndex;
  const activeScene = scenes[activeSceneIndex];

  /*
   * ============================================================
   * SCROLL PARALLAX
   * ============================================================
   */

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /*
   * Background botanical movement
   */
  const botanicalY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  const botanicalRotate = useTransform(scrollYProgress, [0, 1], [-4, 5]);

  /*
   * Back image
   */
  const backY = useTransform(scrollYProgress, [0, 1], ["-12%", "16%"]);

  const backX = useTransform(scrollYProgress, [0, 1], ["2%", "-2%"]);

  const backScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08]);

  /*
   * Center image
   */
  const centerY = useTransform(scrollYProgress, [0, 1], ["10%", "-13%"]);

  const centerX = useTransform(scrollYProgress, [0, 1], ["-2%", "3%"]);

  const centerScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1.12, 1, 1.1]
  );

  /*
   * Front image
   */
  const frontY = useTransform(scrollYProgress, [0, 1], ["-17%", "18%"]);

  const frontX = useTransform(scrollYProgress, [0, 1], ["3%", "-4%"]);

  const frontScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.08]);

  /*
   * Text parallax
   */
  const textY = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  /*
   * ============================================================
   * SCROLL-BASED TEXT REVEAL
   * ============================================================
   */
  // Heading line 1 reveal (THE ART OF)
  const headingLine1Reveal = useTransform(
    scrollYProgress,
    [0.15, 0.3],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
  );

  // Heading line 2 reveal (ESCAPE WITH ELEGANCE)
  const headingLine2Reveal = useTransform(
    scrollYProgress,
    [0.25, 0.4],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
  );

  // Description reveal
  const descriptionReveal = useTransform(
    scrollYProgress,
    [0.25, 0.45],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
  );

  /*
   * ============================================================
   * AUTOMATIC SCENE CHANGE
   * ============================================================
   */

  // useEffect(() => {
  //   if (hoveredIndex !== null) return;

  //   const timer = setInterval(() => {
  //     setActiveIndex((current) => (current + 1) % scenes.length);
  //   }, 6200);

  //   return () => clearInterval(timer);
  //   }, [hoveredIndex]);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative min-h-190 w-full overflow-hidden bg-[#f3f0e8] text-[#171713] md:min-h-screen"
      >
        {/* ============================================================
          BOTANICAL BACKGROUND
          ============================================================ */}

        <motion.div
          style={{
            y: botanicalY,
            rotate: botanicalRotate,
          }}
          className="pointer-events-none absolute bottom-[-22%] left-[-10%] z-0 h-[80%] w-[55%] opacity-[0.07]"
        >
          <svg
            viewBox="0 0 700 800"
            className="h-full w-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M330 800C327 654 313 508 260 375C211 252 127 151 0 75"
              stroke="currentColor"
              strokeWidth="2"
            />

            <path
              d="M263 382C196 334 116 315 28 325"
              stroke="currentColor"
              strokeWidth="2"
            />

            <path
              d="M289 454C365 390 449 369 548 383"
              stroke="currentColor"
              strokeWidth="2"
            />

            <path
              d="M234 312C166 251 103 220 24 212"
              stroke="currentColor"
              strokeWidth="2"
            />

            <path
              d="M216 261C274 190 346 154 432 151"
              stroke="currentColor"
              strokeWidth="2"
            />

            <path
              d="M189 215C140 150 81 110 11 91"
              stroke="currentColor"
              strokeWidth="2"
            />

            <path
              d="M176 185C207 113 260 64 327 35"
              stroke="currentColor"
              strokeWidth="2"
            />

            <path
              d="M263 382C218 348 172 337 113 340C154 375 206 391 263 382Z"
              fill="currentColor"
            />

            <path
              d="M289 454C332 411 383 389 445 385C402 431 348 454 289 454Z"
              fill="currentColor"
            />

            <path
              d="M234 312C188 270 137 244 76 232C113 278 164 305 234 312Z"
              fill="currentColor"
            />

            <path
              d="M216 261C262 206 317 172 380 157C343 211 289 246 216 261Z"
              fill="currentColor"
            />
          </svg>
        </motion.div>

        {/* ============================================================
          MAIN LAYOUT
          ============================================================ */}

        <div className="relative z-10 mx-auto flex min-h-190 max-w-375 items-center px-6 py-20 sm:px-10 md:min-h-screen md:px-12 lg:px-16 xl:px-20">
          <div className="grid w-full grid-cols-1 items-center gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-6">
            {/* ========================================================
              LEFT — EDITORIAL TEXT
              ======================================================== */}

            <motion.div
              style={{ y: textY }}
              className="relative z-30 max-w-132.5 pt-8 lg:pt-0"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeScene.id}
                  initial={{
                    opacity: 0,
                    y: 35,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -25,
                  }}
                  transition={{
                    duration: 0.85,
                    ease,
                  }}
                >
                  {/* Heading */}
                  <h2 className="font-display text-[clamp(2.8rem,4.7vw,5.1rem)] font-light uppercase leading-[0.91] tracking-[-0.045em] text-chrome1">
                    <motion.span
                      style={{ clipPath: headingLine1Reveal }}
                      className="block"
                    >
                      <BoldHeadingLine
                        text={activeScene.heading}
                        boldWords={activeScene.headingBoldWords ?? []}
                      />
                    </motion.span>

                    <motion.span
                      style={{ clipPath: headingLine2Reveal }}
                      className="mt-1 block max-w-130"
                    >
                      <BoldHeadingLine
                        text={activeScene.accent}
                        boldWords={activeScene.accentBoldWords ?? []}
                      />
                    </motion.span>
                  </h2>

                  {/* Description */}
                  <motion.p
                    style={{ clipPath: descriptionReveal }}
                    className="mt-8 font-sans text-[12px] leading-[1.55] text-[#30312c]/75 sm:text-[16px]"
                  >
                    {activeScene.description}
                  </motion.p>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* ========================================================
              RIGHT — COLLAGE
              ======================================================== */}

            <div className="relative mx-auto h-125 w-full max-w-175 sm:h-145 md:h-162.5 lg:h-172.5">
              {/* ======================================================
      BACK / LARGE ARCHITECTURAL IMAGE
      ====================================================== */}

              <motion.div
                style={{
                  y: backY,
                  x: backX,
                  scale: backScale,
                }}
                className="absolute right-0 top-0 h-[61%] w-[67%] overflow-visible"
              >
                <RoundedCornerFrame />

                <div className="absolute inset-0 z-10 overflow-hidden rounded-2xl">
                  <AnimatePresence mode="sync">
                    <motion.div
                      key={activeScene.images.back}
                      initial={{
                        opacity: 0,
                        scale: 1.08,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 1.03,
                      }}
                      transition={{
                        duration: 1.15,
                        ease,
                      }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={activeScene.images.back}
                        alt=""
                        fill
                        priority
                        sizes="(max-width: 768px) 70vw, 45vw"
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* ======================================================
      BOTANICAL OVERLAY ON RIGHT
      ====================================================== */}

              <motion.div
                style={{
                  y: frontY,
                  x: frontX,
                }}
                className="pointer-events-none absolute right-[-4%] top-[3%] z-40 h-[54%] w-[25%]"
              >
                <svg
                  viewBox="0 0 300 600"
                  className="h-full w-full"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M50 600C85 500 115 400 137 290C158 184 180 96 242 0"
                    stroke="#3F4739"
                    strokeWidth="2"
                  />

                  <path
                    d="M136 292C82 263 43 217 21 156"
                    stroke="#3F4739"
                    strokeWidth="1.5"
                  />

                  <path
                    d="M148 239C194 211 234 169 263 113"
                    stroke="#3F4739"
                    strokeWidth="1.5"
                  />

                  <path
                    d="M117 370C72 353 35 323 5 279"
                    stroke="#3F4739"
                    strokeWidth="1.5"
                  />

                  <path
                    d="M177 153C207 135 237 103 255 66"
                    stroke="#3F4739"
                    strokeWidth="1.5"
                  />

                  <ellipse
                    cx="48"
                    cy="181"
                    rx="16"
                    ry="54"
                    transform="rotate(-43 48 181)"
                    fill="#526049"
                    fillOpacity=".45"
                  />

                  <ellipse
                    cx="224"
                    cy="133"
                    rx="17"
                    ry="58"
                    transform="rotate(42 224 133)"
                    fill="#526049"
                    fillOpacity=".42"
                  />

                  <ellipse
                    cx="34"
                    cy="305"
                    rx="16"
                    ry="54"
                    transform="rotate(-48 34 305)"
                    fill="#526049"
                    fillOpacity=".38"
                  />

                  <ellipse
                    cx="217"
                    cy="75"
                    rx="14"
                    ry="50"
                    transform="rotate(37 217 75)"
                    fill="#526049"
                    fillOpacity=".4"
                  />

                  <ellipse
                    cx="75"
                    cy="235"
                    rx="13"
                    ry="45"
                    transform="rotate(-42 75 235)"
                    fill="#526049"
                    fillOpacity=".32"
                  />
                </svg>
              </motion.div>

              {/* ======================================================
      CENTER IMAGE
      ====================================================== */}

              <motion.div
                style={{
                  y: centerY,
                  x: centerX,
                  scale: centerScale,
                }}
                className="absolute left-[19%] top-[24%] z-20 h-[57%] w-[43%] overflow-visible"
              >
                <RoundedCornerFrame />

                <div className="absolute inset-0 z-10 overflow-hidden rounded-2xl">
                  <AnimatePresence mode="sync">
                    <motion.div
                      key={activeScene.images.center}
                      initial={{
                        opacity: 0,
                        scale: 1.08,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 1.04,
                      }}
                      transition={{
                        duration: 1.1,
                        ease,
                      }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={activeScene.images.center}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 45vw, 30vw"
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* ======================================================
      FRONT / BOTTOM IMAGE
      ====================================================== */}

              <motion.div
                style={{
                  y: frontY,
                  x: frontX,
                  scale: frontScale,
                }}
                className="absolute bottom-[1%] left-0 z-30 h-[29%] w-[40%] overflow-visible"
              >
                <RoundedCornerFrame />

                <div className="absolute inset-0 z-10 overflow-hidden rounded-2xl">
                  <AnimatePresence mode="sync">
                    <motion.div
                      key={activeScene.images.front}
                      initial={{
                        opacity: 0,
                        scale: 1.1,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 1.04,
                      }}
                      transition={{
                        duration: 1,
                        ease,
                      }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={activeScene.images.front}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 42vw, 28vw"
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* ======================================================
      SUBTLE IMAGE SHADOWS
      ====================================================== */}

              <div className="pointer-events-none absolute right-0 top-0 z-10 h-[61%] w-[67%] shadow-[0_30px_70px_rgba(30,30,20,0.08)]" />

              <div className="pointer-events-none absolute left-[19%] top-[24%] z-10 h-[57%] w-[43%] shadow-[0_30px_60px_rgba(30,30,20,0.12)]" />

              <div className="pointer-events-none absolute bottom-[1%] left-0 z-40 h-[29%] w-[40%] shadow-[0_25px_50px_rgba(30,30,20,0.14)]" />
            </div>
          </div>
        </div>

        {/* ============================================================
          MINIMAL SCENE NAVIGATION
          ============================================================ */}

        <div className="absolute bottom-7 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4">
          {scenes.map((scene, index) => {
            const isActive = activeSceneIndex === index;

            return (
              <button
                key={scene.id}
                type="button"
                aria-label={scene.id}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onFocus={() => setHoveredIndex(index)}
                onBlur={() => setHoveredIndex(null)}
                onClick={() => setActiveIndex(index)}
                className="relative flex h-4 items-center"
              >
                <motion.span
                  animate={{
                    width: isActive ? 34 : 6,
                    opacity: isActive ? 0.8 : 0.3,
                  }}
                  transition={{
                    duration: 0.6,
                    ease,
                  }}
                  className="h-px bg-[#292a24]"
                />

                {isActive && hoveredIndex === null && (
                  <motion.span
                    key={activeIndex}
                    initial={{
                      scaleX: 0,
                    }}
                    animate={{
                      scaleX: 1,
                    }}
                    transition={{
                      duration: 6.2,
                      ease: "linear",
                    }}
                    className="absolute left-0 h-px w-full origin-left bg-[#7d704c]"
                  />
                )}
              </button>
            );
          })}
        </div>
      </section>

      <WaterVision />
    </>
  );
}

/*
 * ======================================================
 * WATER VISION
 * A secondary section within this component: a looping
 * video on the left with editorial text on the right.
 * Same animation language as the banner above.
 * ======================================================
 */

const waterBodyCopy = [
  "Rather than positioning buildings as isolated objects within the landscape.",
  "Water becomes the primary organizing element,",
  "while architecture emerges organically from the landscape,",
  "minimizing visual impact and reinforcing a strong sense of place.",
  "The development aspires to become a benchmark for regenerative tourism",
  "by combining environmental stewardship, advanced technology,",
  "and contemporary hospitality within a cohesive masterplanning strategy.",
];

export function WaterVision() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const waterY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const waterScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1.04, 1, 1.04]
  );

  const bodyReveal = useTransform(
    scrollYProgress,
    [0.2, 0.45],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-190 w-full overflow-hidden bg-[#f3f0e8] text-[#171713] md:min-h-screen pt-20 lg:pb-40"
    >
      <div className="relative z-10 mx-auto flex min-h-190 max-w-375 items-center px-6 py-20 sm:px-10 md:min-h-screen md:px-12 lg:px-16 xl:px-20">
        <div className="grid w-full grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          {/* LEFT — VIDEO */}
          <motion.div
            style={{ y: waterY, scale: waterScale }}
            className="relative mx-auto h-125 w-full max-w-175 overflow-hidden sm:h-145 md:h-162.5 lg:h-172.5"
          >
            <RoundedCornerFrame className="z-20" />

            <div className="absolute inset-0 z-10 overflow-hidden rounded-2xl">
              <video
                className="h-full w-full object-cover"
                playsInline
                muted
                loop
                autoPlay
                preload="auto"
                poster="/Purura/NewImages/Villa2CR.png"
                aria-label="Water and architecture at Purura"
              >
                <source
                  src="/Opt video/Pool Side View with hotel.webm"
                  type="video/webm"
                />
                <source
                  src="/Opt video/reception building from pool view.webm"
                  type="video/webm"
                />
              </video>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#171713]/25 via-transparent to-[#171713]/10" />
            </div>

            <div className="pointer-events-none absolute -inset-1 z-30 rounded-2xl shadow-[0_30px_70px_rgba(30,30,20,0.12)]" />
          </motion.div>

          {/* RIGHT — EDITORIAL TEXT */}
          <motion.div
            style={{ y: waterY }}
            className="relative z-30 max-w-132.5 lg:pl-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease }}
            >
              {/* <span className="mb-6 block font-mono text-[8px] uppercase tracking-[0.5em] text-[#b99147] sm:text-[9px]">
                Water &amp; Masterplan
              </span> */}

              <h2 className="font-display text-[clamp(2.4rem,4vw,4.4rem)] font-light uppercase leading-[0.92] tracking-[-0.04em] text-chrome1">
                <motion.span style={{ clipPath: bodyReveal }} className="block">
                  Regenerative
                </motion.span>
                <motion.span
                  style={{ clipPath: bodyReveal }}
                  className="mt-1 block max-w-130"
                >
                  Landscape
                </motion.span>
              </h2>

              <motion.div
                style={{ clipPath: bodyReveal }}
                className="mt-8 font-sans text-[12px] leading-[1.55] text-[#30312c]/75 sm:text-[16px] text-left"
              >
                {waterBodyCopy.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
