"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Scene = {
  id: keyof typeof descriptions;
  heading: string;
  subheading: string;
};

const scenes: Scene[] = [
  {
    id: "retreat",
    heading: "WHERE NATURE",
    subheading: "BECOMES LUXURY",
  },
  {
    id: "discover",
    heading: "THE NEW",
    subheading: "ERA OF LUXUARY",
  },
  {
    id: "experience",
    heading: "BESPOKEN",
    subheading: "ESCAPE",
  },
  {
    id: "amenities",
    heading: "WHERE DETAIL",
    subheading: "BECOMES EXPERIENCE",
  },
];

const descriptions = {
  retreat:
    "Retreat into an environment shaped by thoughtful architecture, natural harmony, and an elevated sense of comfort and belonging.",

  discover:
    "Discover a refined vision of progress, creating inspiring environments where timeless design and enduring quality come together seamlessly.",

  experience:
    "Experience a destination where every detail is curated, from architectural elegance to natural immersion, offering moments that linger long after you leave.",

  amenities:
    "Enjoy world-class amenities designed for the discerning traveler, where every comfort is anticipated and every space invites relaxation.",
};

const backgroundVideos = {

  retreat: "https://res.cloudinary.com/ddg2qawqw/video/upload/v1789848390/Entrance.webm",

  discover:
    "https://res.cloudinary.com/ddg2qawqw/video/upload/v1789738199/Video_Project_1.mp4",

  experience:
    "https://res.cloudinary.com/ddg2qawqw/video/upload/v1789738213/Video_Project_2.mp4",
  amenities:
    "https://res.cloudinary.com/ddg2qawqw/video/upload/v1789192098/BirdView1.webm",
};

const ease = [0.16, 1, 0.3, 1] as const;

export default function InvestmentBanner() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [activeAutoPointer, setActiveAutoPointer] =
    useState<keyof typeof descriptions>("retreat");

  const [autoPhase, setAutoPhase] = useState<"open" | "hold" | "close">("open");

  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const activePointer =
    (hovered as keyof typeof descriptions | null) ?? activeAutoPointer;

  const activeScene =
    scenes.find((scene) => scene.id === activePointer) ?? scenes[0];

  /*
   * ============================================================
   * AUTOMATIC CINEMATIC SEQUENCE
   * ============================================================
   */

  useEffect(() => {
    const sequence: (keyof typeof descriptions)[] = [
      "retreat",
      "discover",
      "experience",
      "amenities",
    ];

    let currentIndex = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const run = () => {
      setAutoPhase("open");

      timeout = setTimeout(() => {
        setAutoPhase("hold");

        timeout = setTimeout(() => {
          setAutoPhase("close");

          timeout = setTimeout(() => {
            currentIndex = (currentIndex + 1) % sequence.length;

            setActiveAutoPointer(sequence[currentIndex]);

            run();
          }, 900);
        }, 5000);
      }, 900);
    };

    run();

    return () => clearTimeout(timeout);
  }, []);

  /*
   * ============================================================
   * VIDEO CONTROL
   * ============================================================
   */

  useEffect(() => {
    const activeVideo = videoRefs.current[activePointer];

    if (!activeVideo) return;

    activeVideo.currentTime = 0;

    const playVideo = async () => {
      try {
        await activeVideo.play();
      } catch (error) {
        console.warn("Video playback failed:", error);
      }
    };

    playVideo();

    Object.entries(videoRefs.current).forEach(([id, video]) => {
      if (id !== activePointer && video) {
        video.pause();
      }
    });
  }, [activePointer]);

  return (
    <section className="relative min-h-[720px] w-full overflow-hidden bg-black text-ivory md:min-h-screen">
      {/* ============================================================
          CINEMATIC VIDEO BACKGROUND
          ============================================================ */}

      <div className="absolute inset-0 overflow-hidden">
        {Object.entries(backgroundVideos).map(([id, src]) => (
          <motion.video
            key={id}
            ref={(video) => {
              videoRefs.current[id] = video;
            }}
            src={src}
            muted
            playsInline
            autoPlay
            preload="auto"
            animate={{
              opacity: activePointer === id ? 1 : 0,
              scale: activePointer === id ? 1 : 1.035,
            }}
            transition={{
              opacity: {
                duration: 1.8,
                ease,
              },
              scale: {
                duration: 2.8,
                ease,
              },
            }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ))}
      </div>

      {/* ============================================================
          CINEMATIC GRADING
          ============================================================ */}

      {/* <motion.div
        animate={{
          opacity: hovered ? 0.18 : 0.28,
        }}
        transition={{ duration: 1.2, ease }}
        className="absolute inset-0 bg-black"
      /> */}

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-black/15" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.28)_100%)]" />

      {/* ============================================================
          SCENE HEADING
          ============================================================ */}

      <div className="absolute bottom-[15%] left-7 z-20 w-[calc(100%-3.5rem)] md:bottom-[13%] md:left-[7%] md:w-[65vw] lg:w-[58vw]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePointer}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={{
              initial: {
                opacity: 0,
                y: 80,
              },
              animate: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 1.15,
                  ease,
                  staggerChildren: 0.08,
                },
              },
              exit: {
                opacity: 0,
                y: -35,
                transition: {
                  duration: 0.7,
                  ease,
                },
              },
            }}
          >
            {/* Small animated line */}

            <motion.div
              variants={{
                initial: {
                  width: 0,
                  opacity: 0,
                },
                animate: {
                  width: 72,
                  opacity: 0.8,
                  transition: {
                    duration: 0.9,
                    ease,
                  },
                },
                exit: {
                  width: 0,
                  opacity: 0,
                  transition: {
                    duration: 0.35,
                    ease,
                  },
                },
              }}
              className="mb-6 h-px bg-champagne md:mb-8"
            />

            {/* First line */}

            <div className="overflow-hidden">
              <motion.h1
                variants={{
                  initial: {
                    y: "110%",
                  },
                  animate: {
                    y: "0%",
                    transition: {
                      duration: 1.15,
                      ease,
                    },
                  },
                  exit: {
                    y: "-110%",
                    transition: {
                      duration: 0.65,
                      ease,
                    },
                  },
                }}
                className="font-display text-[clamp(3rem,6.5vw,4rem)] leading-[0.86] tracking-[-0.055em] text-ivory font-light"
              >
                {activeScene.heading}
              </motion.h1>
            </div>

            {/* Second line */}

            <div className="overflow-hidden">
              <motion.h1
                variants={{
                  initial: {
                    y: "110%",
                  },
                  animate: {
                    y: "0%",
                    transition: {
                      duration: 1.2,
                      delay: 0.08,
                      ease,
                    },
                  },
                  exit: {
                    y: "-110%",
                    transition: {
                      duration: 0.65,
                      ease,
                    },
                  },
                }}
                className="ml-[7vw] font-display text-[clamp(3rem,6.5vw,4.5rem)] leading-[0.86] tracking-[-0.055em] text-ivory/85 font-bold"
              >
                {activeScene.subheading}
              </motion.h1>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ============================================================
          DESCRIPTION — VERY SUBTLE
          ============================================================ */}

      <AnimatePresence mode="wait">
        <motion.p
          key={activePointer}
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: hovered ? 0.4 : 0.62,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -10,
          }}
          transition={{
            duration: 0.8,
            ease,
          }}
          className="absolute bottom-[8%] right-7 z-20 max-w-[270px] text-right font-sans text-[11px] leading-[1.55] text-ivory md:bottom-[9%] md:right-[7%] md:max-w-[310px] md:text-[12px]"
        >
          {descriptions[activePointer]}
        </motion.p>
      </AnimatePresence>

      {/* ============================================================
          CINEMATIC SCENE NAVIGATION
          ============================================================ */}

      <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 items-center gap-3">
        {scenes.map((scene) => {
          const isActive = activePointer === scene.id;

          return (
            <button
              key={scene.id}
              type="button"
              aria-label={scene.id}
              onMouseEnter={() => setHovered(scene.id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(scene.id)}
              onBlur={() => setHovered(null)}
              className="relative flex h-5 items-center"
            >
              <motion.span
                animate={{
                  width: isActive ? 38 : 6,
                  opacity: isActive ? 0.9 : 0.4,
                }}
                transition={{
                  duration: 0.65,
                  ease,
                }}
                className="h-px bg-ivory"
              />

              {isActive && !hovered && (
                <motion.span
                  key={`${activePointer}-${autoPhase}`}
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX: autoPhase === "hold" ? 1 : 0,
                  }}
                  transition={{
                    duration: autoPhase === "hold" ? 5 : 0.9,
                    ease: autoPhase === "hold" ? "linear" : ease,
                  }}
                  className="absolute left-0 h-px w-full origin-left bg-champagne"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* ============================================================
          SCROLL
          ============================================================ */}

      <motion.div
        animate={{
          opacity: hovered ? 0.25 : 0.55,
        }}
        transition={{ duration: 0.6, ease }}
        className="absolute bottom-8 left-7 z-20 hidden items-center gap-4 md:flex"
      >
        <span className="font-sans text-[8px] tracking-[0.32em] text-ivory">
          SCROLL
        </span>

        <motion.span
          animate={{
            width: [15, 38, 15],
            opacity: [0.25, 0.75, 0.25],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-px bg-ivory"
        />
      </motion.div>

      {/* ============================================================
          MOBILE DESCRIPTION
          ============================================================ */}

      <div className="absolute bottom-8 right-7 z-20 md:hidden">
        <span className="font-mono text-[8px] tracking-[0.18em] text-ivory/45">
          0{scenes.findIndex((scene) => scene.id === activePointer) + 1} / 04
        </span>
      </div>

      {/* ============================================================
          BOTTOM EDGE
          ============================================================ */}

      <div className="absolute bottom-0 left-0 right-0 h-px bg-ivory/10" />
    </section>
  );
}
