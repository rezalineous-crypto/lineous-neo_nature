"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { customEase } from "./Hero";

const chapters = [
  {
    number: "01",
    title: "THE LAND",
    subtitle: "200 acres of pristine landscape",
    description:
      "Every element of the resort responds to the land’s natural contours. Regenerative design principles guide every decision.",
    image: "/purura_resort_images/purura_render_06.jpg",
  },
  {
    number: "02",
    title: "THE WATER",
    subtitle: "Bio-filtered lagoon systems",
    description:
      "12,000 m² of crystal-clear water, naturally filtered through advanced bio-technology. A sanctuary of calm.",
    image: "/purura_resort_images/purura_render_10.jpg",
  },
  {
    number: "03",
    title: "THE ARCHITECTURE",
    subtitle: "Futuristic forms, organic roots",
    description:
      "Structures that emerge from the landscape, not imposed upon it. Every building tells a story of place.",
    image: "/purura_resort_images/purura_render_03.jpg",
  },
  {
    number: "04",
    title: "THE EXPERIENCE",
    subtitle: "Curated moments of wonder",
    description:
      "From sunrise yoga to starlit dining, every experience is designed to create lasting memories.",
    image: "/purura_resort_images/purura_render_16.jpg",
  },
];

/* ============================================================
   CHAPTER CONTENT
   Each instance is a React component, so useTransform is valid.
   ============================================================ */

function ChapterContent({
  chapter,
  index,
  smoothProgress,
}: {
  chapter: (typeof chapters)[number];
  index: number;
  smoothProgress: ReturnType<typeof useSpring>;
}) {
  const total = chapters.length;

  const start = index / total;
  const end = (index + 1) / total;

  const enterStart = Math.max(0, start - 0.055);
  const enterEnd = start + 0.045;
  const exitStart = end - 0.045;

  const opacity = useTransform(
    smoothProgress,
    [enterStart, enterEnd, exitStart, end],
    [
      0,
      1,
      1,
      index === total - 1 ? 1 : 0,
    ]
  );

  const y = useTransform(
    smoothProgress,
    [enterStart, enterEnd, exitStart, end],
    [
      40,
      0,
      0,
      index === total - 1 ? 0 : -25,
    ]
  );

  const blur = useTransform(
    smoothProgress,
    [enterStart, enterEnd],
    ["8px", "0px"]
  );

  return (
    <motion.div
      style={{
        opacity,
        y,
        filter: blur,
      }}
      className="absolute left-0 bottom-0 max-w-3xl will-change-transform"
    >
      {/* Subtitle */}
      <p className="annotation text-champagne/80 mb-4">
        {chapter.subtitle}
      </p>

      {/* Main title */}
      <h3
        className="
          text-5xl
          md:text-7xl
          lg:text-[7rem]
          font-bold
          leading-[0.88]
          tracking-[-0.055em]
          text-bone
          font-display
          mb-6
        "
      >
        {chapter.title}
      </h3>

      {/* Description */}
      <p
        className="
          text-base
          md:text-lg
          lg:text-xl
          leading-relaxed
          text-bone/70
          font-display
          max-w-xl
        "
      >
        {chapter.description}
      </p>
    </motion.div>
  );
}

/* ============================================================
   MAIN SECTION
   ============================================================ */

export default function Architecture() {
  const sectionRef = useRef<HTMLElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  /*
   * Cinematic smoothing.
   */
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 32,
    stiffness: 90,
    mass: 0.8,
  });

  /*
   * Determine active chapter.
   *
   * IMPORTANT:
   * useMotionValueEvent is the correct way to subscribe
   * to a MotionValue inside React.
   */
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const index = Math.min(
      chapters.length - 1,
      Math.floor(latest * chapters.length)
    );

    setActiveIndex((previous) =>
      previous === index ? previous : index
    );
  });

  /*
   * Global image movement.
   */
  const imageScale = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [1.08, 1.02, 1.08]
  );

  const imageY = useTransform(
    smoothProgress,
    [0, 1],
    ["2%", "-2%"]
  );

  /*
   * Text block has a very subtle overall movement.
   */
  const textY = useTransform(
    smoothProgress,
    [0, 1],
    ["0%", "-3%"]
  );

  /*
   * Dark overlay changes subtly during the journey.
   */
  const overlayOpacity = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [0.32, 0.18, 0.34]
  );

  return (
    <section
      ref={sectionRef}
      className="relative h-[400vh]"
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* =====================================================
            BACKGROUND
            ===================================================== */}

        <motion.div
          style={{
            scale: imageScale,
            y: imageY,
          }}
          className="absolute inset-0 will-change-transform"
        >
          {chapters.map((chapter, index) => {
            const start = index / chapters.length;
            const end = (index + 1) / chapters.length;

            const fadeStart = Math.max(
              0,
              start - 0.06
            );

            const fadeInEnd = start + 0.06;

            const fadeOutStart = end - 0.08;

            // eslint-disable-next-line react-hooks/rules-of-hooks
            const opacity = useTransform(
              smoothProgress,
              [
                fadeStart,
                fadeInEnd,
                fadeOutStart,
                end,
              ],
              [
                0,
                1,
                1,
                index === chapters.length - 1
                  ? 1
                  : 0,
              ]
            );

            return (
              <motion.div
                key={chapter.number}
                style={{ opacity }}
                className="absolute inset-0"
              >
                <Image
                  src={chapter.image}
                  alt={chapter.title}
                  fill
                  priority={index === 0}
                  className="object-cover"
                  sizes="100vw"
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* =====================================================
            CINEMATIC OVERLAYS
            ===================================================== */}

        <motion.div
          style={{
            opacity: overlayOpacity,
          }}
          className="absolute inset-0 bg-black"
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/80
            via-black/20
            to-black/25
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-black/40
            via-transparent
            to-transparent
          "
        />

        {/* =====================================================
            CONTENT
            ===================================================== */}

        <motion.div
          style={{ y: textY }}
          className="
            relative
            z-10
            h-full
            flex
            items-end
          "
        >
          <div
            className="
              w-full
              px-6
              md:px-12
              lg:px-20
              pb-20
              md:pb-28
              lg:pb-32
            "
          >
            <div className="max-w-7xl mx-auto">

              {/* =================================================
                  CHAPTER NAVIGATION
                  ================================================= */}

              <div className="flex items-center gap-3 md:gap-5 mb-8">
                {chapters.map((chapter, index) => (
                  <div
                    key={chapter.number}
                    className="flex items-center gap-3"
                  >
                    <span
                      className={`
                        annotation
                        transition-all
                        duration-700
                        ${
                          activeIndex === index
                            ? "text-champagne opacity-100"
                            : activeIndex > index
                              ? "text-bone/50"
                              : "text-bone/25"
                        }
                      `}
                    >
                      {chapter.number}
                    </span>

                    {index < chapters.length - 1 && (
                      <div className="relative w-8 md:w-12 h-px bg-bone/20 overflow-hidden">
                        <motion.div
                          className="absolute inset-y-0 left-0 bg-champagne"
                          animate={{
                            width:
                              activeIndex > index
                                ? "100%"
                                : activeIndex === index
                                  ? "45%"
                                  : "0%",
                          }}
                          transition={{
                            duration: 0.8,
                            ease: customEase,
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* =================================================
                  CHAPTER TEXT
                  ================================================= */}

              <div
                className="
                  relative
                  min-h-[280px]
                  md:min-h-[320px]
                  max-w-3xl
                "
              >
                {chapters.map((chapter, index) => (
                  <ChapterContent
                    key={chapter.number}
                    chapter={chapter}
                    index={index}
                    smoothProgress={smoothProgress}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* =====================================================
            PROGRESS INDICATOR
            ===================================================== */}

        <div
          className="
            absolute
            bottom-8
            right-6
            md:right-12
            lg:right-20
            z-20
          "
        >
          <div className="flex flex-col items-end gap-2">

            <span className="annotation text-bone/40">
              {chapters[activeIndex].number}
            </span>

            <div className="w-24 md:w-32 h-px bg-bone/20 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-champagne"
                style={{
                  scaleX: scrollYProgress,
                  transformOrigin: "left",
                }}
              />
            </div>

            <span className="annotation text-bone/30">
              {chapters.length
                .toString()
                .padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* =====================================================
            ARCHITECTURAL BASELINE
            ===================================================== */}

        <div className="absolute bottom-0 inset-x-0 h-px bg-bone/10 z-20" />
      </div>
    </section>
  );
}