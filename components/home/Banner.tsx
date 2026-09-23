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
  retreat: "https://res.cloudinary.com/ddg2qawqw/video/upload/v1789848914/Entrance.mp4",
  discover: "https://res.cloudinary.com/ddg2qawqw/video/upload/v1789738199/Video_Project_1.mp4",
  experience: "https://res.cloudinary.com/ddg2qawqw/video/upload/v1789738213/Video_Project_2.mp4",
  amenities: "https://res.cloudinary.com/ddg2qawqw/video/upload/v1789192098/BirdView1.webm",
};

// Poster images for video fallback (using existing images)
const videoPosters = {
  retreat: "/Purura/NewImages/Entry 1.png",
  discover: "/Purura/NewImages/Overall 1.png",
  experience: "/Purura/NewImages/Overall 2.png",
  amenities: "/Purura/NewImages/Overall 11.png",
};

const ease = [0.16, 1, 0.3, 1] as const;

export default function InvestmentBanner() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [activeAutoPointer, setActiveAutoPointer] =
    useState<keyof typeof descriptions>("retreat");
  const [autoPhase, setAutoPhase] = useState<"open" | "hold" | "close">("open");
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedData, setPrefersReducedData] = useState(false);

  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const activePointer =
    (hovered as keyof typeof descriptions | null) ?? activeAutoPointer;

  const activeScene =
    scenes.find((scene) => scene.id === activePointer) ?? scenes[0];

  // Detect mobile and reduced data preference on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Check prefers-reduced-data
    const mediaQuery = window.matchMedia("(prefers-reduced-data: reduce)");
    const handler = (e: MediaQueryListEvent) => setPrefersReducedData(e.matches);
    // Set initial value after mount to avoid synchronous setState in effect
    setTimeout(() => setPrefersReducedData(mediaQuery.matches), 0);
    mediaQuery.addEventListener("change", handler);

    return () => {
      window.removeEventListener("resize", checkMobile);
      mediaQuery.removeEventListener("change", handler);
    };
  }, []);

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

  // Determine preload strategy: metadata on mobile/reduced-data, auto on desktop
  const getPreload = () => {
    if (isMobile || prefersReducedData) return "metadata";
    return "auto";
  };

  // Handle scene navigation click/tap
  const handleSceneSelect = (sceneId: keyof typeof descriptions) => {
    setHovered(sceneId);
    // Clear hover after a delay on mobile to allow tap to "stick"
    if (isMobile) {
      setTimeout(() => setHovered(null), 3000);
    }
  };

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
            poster={videoPosters[id as keyof typeof videoPosters]}
            muted
            playsInline
            autoPlay
            preload={getPreload()}
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
            // Disable video on mobile if prefers-reduced-data
            style={prefersReducedData ? { display: "none" } : undefined}
          />
        ))}

        {/* Static fallback image for reduced data / mobile */}
        {prefersReducedData && (
          <div className="absolute inset-0 z-10">
            <motion.div
              key={activePointer}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              initial={{ opacity: 0, scale: 1.035 }}
              transition={{ duration: 1.8, ease }}
              className="absolute inset-0"
            >
              <img
                src={videoPosters[activePointer]}
                alt=""
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        )}
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
              aria-current={isActive ? "true" : "false"}
              onMouseEnter={() => !isMobile && setHovered(scene.id)}
              onMouseLeave={() => !isMobile && setHovered(null)}
              onFocus={() => setHovered(scene.id)}
              onBlur={() => setHovered(null)}
              onClick={() => handleSceneSelect(scene.id)}
              onTouchStart={() => handleSceneSelect(scene.id)}
              className="relative flex h-5 items-center touch-manipulation"
              // Larger touch target on mobile
              style={{
                padding: isMobile ? "12px 8px" : "0",
                minWidth: isMobile ? "44px" : "auto",
                minHeight: isMobile ? "44px" : "auto",
              }}
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
                // Thicker line on mobile for better visibility
                style={{ height: isMobile ? "3px" : "1px" }}
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
                  style={{ height: isMobile ? "3px" : "1px" }}
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
