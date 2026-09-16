"use client";

import Image from "next/image";
import {
  motion,
  MotionValue,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import Container from "@/components/layout/Container";
import { customEase } from "@/components/home/Hero";

type PhilosophyItem = {
  number: string;
  title: string;
  text: string;
  image: string;
  imageAlt: string;
};

const philosophyItems: PhilosophyItem[] = [
  {
    number: "01",
    title: "Landscape as Infrastructure",
    text: "The landscape performs ecological, environmental, and social functions beyond aesthetics. Wetlands, bioswales, green roofs, and restored forest systems become essential components of the resort's infrastructure, supporting biodiversity, stormwater management, microclimate regulation, and guest experience.",
    image: "/Purura/NewImages/Overall 1.png",
    imageAlt: "PURURA landscape and ecological environment",
  },
  {
    number: "02",
    title: "Architecture as Topography",
    text: "Buildings are conceived as extensions of the terrain rather than independent structures. Their sculpted forms follow the natural contours of the site, allowing roofs to function as accessible landscapes while minimizing the visual footprint of the development.",
    image: "/Purura/NewImages/Overall 2.png",
    imageAlt: "PURURA architecture integrated with the landscape",
  },
  {
    number: "03",
    title: "Water as Spatial Framework",
    text: "An interconnected network of lagoons, canals, reflective pools, and wetlands defines the spatial organization of the resort. Water serves simultaneously as circulation, ecological infrastructure, climatic moderator, and visual identity.",
    image: "/Purura/NewImages/Overall 4.png",
    imageAlt: "PURURA water landscape and spatial framework",
  },
  {
    number: "04",
    title: "Biophilic Hospitality",
    text: "Every guest experience is designed around continuous interaction with nature through daylight, vegetation, water, natural ventilation, framed views, and outdoor living spaces.",
    image: "/Purura/NewImages/Entry 3.png",
    imageAlt: "PURURA biophilic hospitality environment",
  },
  {
    number: "05",
    title: "Intelligent Sustainability",
    text: "Digital technologies, predictive building management systems, renewable energy infrastructure, and data-driven operations support high-performance environmental outcomes while enhancing operational efficiency and guest comfort.",
    image: "/Purura/NewImages/Hotel 1.png",
    imageAlt: "PURURA intelligent sustainable hospitality",
  },
];

/* -------------------------------------------------------------------------- */
/* Image                                                                       */
/* -------------------------------------------------------------------------- */

function PhilosophyImage({ item }: { item: PhilosophyItem }) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [24, -24]);

  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1.045, 1, 1.045]
  );

  return (
    <div ref={ref} className="relative w-full">
      {" "}
      <div className="relative mx-auto w-full max-w-[560px]">
        {" "}
        <div className="absolute inset-0 translate-x-3 translate-y-3 bg-black/[0.08] blur-[24px]" />
        {/* <CornerFrame /> */}
        <div className="relative aspect-[2/2] overflow-hidden rounded-[1.15rem] bg-graphite">
          <motion.div
            style={{
              y: imageY,
              scale: imageScale,
            }}
            className="absolute -inset-[5%]"
          >
            <Image
              src={item.image}
              alt={item.imageAlt}
              fill
              sizes="(max-width: 1024px) 88vw, 42vw"
              className="object-cover"
            />
          </motion.div>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

          <motion.div
            initial={{
              x: "-130%",
            }}
            whileInView={{
              x: "130%",
            }}
            viewport={{
              once: true,
              amount: 0.35,
            }}
            transition={{
              duration: 1.8,
              delay: 0.2,
              ease: customEase,
            }}
            className="pointer-events-none absolute inset-y-0 left-0 w-[35%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/[0.055] to-transparent"
          />
        </div>
        <div className="absolute -bottom-6 right-0 font-mono text-[8px] uppercase tracking-[0.3em] text-chrome1/40">
          PURURA / {item.number}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Text                                                                       */
/* -------------------------------------------------------------------------- */

function PhilosophyText({
  item,
  active,
}: {
  item: PhilosophyItem;
  active: boolean;
}) {
  return (
    <div className="flex min-h-0 flex-col justify-center">
      {" "}
      <div className="mb-6 flex items-center gap-4">
        <motion.span
          animate={{
            opacity: active ? 1 : 0.4,
          }}
          transition={{
            duration: 0.45,
            ease: customEase,
          }}
          className="font-mono text-[10px] tracking-[0.25em] text-champagne"
        >
          {item.number}
        </motion.span>

        <motion.div
          animate={{
            width: active ? 46 : 26,
            opacity: active ? 0.7 : 0.3,
          }}
          transition={{
            duration: 0.5,
            ease: customEase,
          }}
          className="h-px bg-champagne"
        />

        <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-chrome1/45">
          Design Principle
        </span>
      </div>
      <h3 className="max-w-[560px] font-sans text-[clamp(2.35rem,3.8vw,4.6rem)] font-medium leading-[0.94] tracking-[-0.065em] text-champagne">
        {item.title}
      </h3>
      <p className="mt-7 max-w-[510px] font-sans text-[14px] leading-[1.8] text-champagne/70 md:text-[16px]">
        {item.text}
      </p>
      <div className="mt-8 flex max-w-[510px] items-center gap-4">
        <div className="h-px flex-1 bg-line" />

        <motion.span
          animate={{
            opacity: active ? 0.75 : 0.3,
            x: active ? 3 : 0,
          }}
          transition={{
            duration: 0.45,
            ease: customEase,
          }}
          className="font-mono text-[11px] text-champagne"
        >
          →
        </motion.span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Background atmosphere                                                      */
/* -------------------------------------------------------------------------- */

function PhilosophyAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage: `             linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.55, 0.9, 0.55],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-[42%] h-[850px] w-[850px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-forest/[0.12] blur-[160px]"
      />

      <motion.div
        initial={{
          scaleX: 0,
          opacity: 0,
        }}
        whileInView={{
          scaleX: 1,
          opacity: 0.35,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 1.5,
          ease: customEase,
        }}
        className="absolute left-[8%] right-[8%] top-[32%] h-px origin-center bg-champagne/20"
      />

      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 90,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-1/2 top-[42%] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-bone/[0.035]"
      />

      <motion.div
        animate={{
          rotate: [360, 0],
        }}
        transition={{
          duration: 130,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-1/2 top-[42%] h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-bone/[0.02]"
      />

      <div className="absolute left-[8%] top-[27%] font-mono text-[8px] uppercase tracking-[0.35em] text-chrome1/25">
        23° 59′ N
      </div>

      <div className="absolute right-[8%] top-[27%] font-mono text-[8px] uppercase tracking-[0.35em] text-chrome1/25">
        090° 25′ E
      </div>

      <div className="absolute bottom-[18%] left-[8%] flex items-center gap-3">
        <span className="h-px w-8 bg-champagne/20" />

        <span className="font-mono text-[7px] uppercase tracking-[0.35em] text-chrome1/25">
          Landscape / Architecture / Water
        </span>
      </div>

      <div className="absolute bottom-[18%] right-[8%] font-mono text-[7px] uppercase tracking-[0.35em] text-chrome1/25">
        PURURA / 2026
      </div>

      <div className="absolute bottom-0 left-[12%] top-0 w-px bg-bone/[0.025]" />

      <div className="absolute bottom-0 right-[12%] top-0 w-px bg-bone/[0.025]" />

      <motion.div
        animate={{
          scale: [1, 1.45, 1],
          opacity: [0.25, 0.65, 0.25],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="relative h-3 w-3">
          <div className="absolute inset-0 rounded-full border border-champagne/30" />
          <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-champagne/50" />
        </div>
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Animated heading                                                           */
/* -------------------------------------------------------------------------- */

function PhilosophyHeroTitle() {
  const titleRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={titleRef}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.3,
      }}
      className="relative isolate min-h-[95svh] overflow-hidden bg-[#171611]"
    >
      {/* ================================================================ */}
      {/* FULL-BLEED PHOTOGRAPH                                            */}
      {/* ================================================================ */}

      <motion.div
        aria-hidden="true"
        variants={{
          hidden: {
            opacity: 0,
            scale: 1.035,
          },
          visible: {
            opacity: 1,
            scale: 1,
          },
        }}
        transition={{
          duration: 1.8,
          ease: customEase,
        }}
        className="pointer-events-none absolute inset-0 z-0"
      >
        <Image
          src="/Purura/NewImages/Overall 1.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-black/20"
      />

      {/* ================================================================ */}
      {/* CINEMATIC IMAGE TREATMENT                                        */}
      {/* ================================================================ */}

      {/* Overall photographic contrast — NOT a color wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-black/50"
      />

      {/* ================================================================ */}
      {/* CONTENT                                                          */}
      {/* ================================================================ */}

      <div className="relative z-10 flex min-h-[72svh] items-center">
        <div className="mx-auto w-full max-w-[1500px] px-6 md:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-[1120px]">
            {/* ========================================================== */}
            {/* SECTION LABEL                                               */}
            {/* ========================================================== */}

            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: -18,
                },
                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              transition={{
                duration: 0.8,
                delay: 0.25,
                ease: customEase,
              }}
              className="mb-7 flex items-center gap-4"
            >
              <span className="h-px w-9 bg-champagne/90" />

              <span className="font-mono text-[8px] uppercase tracking-[0.38em] text-white/75">
                05 Principles
              </span>
            </motion.div>

            {/* ========================================================== */}
            {/* DESIGN                                                       */}
            {/* ========================================================== */}

            <div className="overflow-hidden">
              <motion.div
                variants={{
                  hidden: {
                    y: "110%",
                  },
                  visible: {
                    y: "0%",
                  },
                }}
                transition={{
                  duration: 1.05,
                  delay: 0.32,
                  ease: customEase,
                }}
              >
                <h2
                  className=" font-sans text-[clamp(5rem,11vw,7rem)] font-medium leading-[0.76] tracking-[-0.105em] text-[#f4efe5] [text-shadow:0_3px_24px_rgba(0,0,0,0.18)]
                  "
                >
                  Design
                </h2>
              </motion.div>
            </div>

            {/* ========================================================== */}
            {/* PHILOSOPHY                                                  */}
            {/* ========================================================== */}

            <div className="relative -mt-[0.015em]">
              <motion.div
                variants={{
                  hidden: {
                    y: "110%",
                  },
                  visible: {
                    y: "0%",
                  },
                }}
                transition={{
                  duration: 1.15,
                  delay: 0.46,
                  ease: customEase,
                }}
              >
                <span
                  className="
                    block
                    whitespace-nowrap
                    font-sans
                    text-[clamp(5rem,11vw,6rem)]
                    font-medium
                    leading-[0.76]
                    tracking-[-0.105em]
                    text-[#f4efe5]/[0.52]
                    [text-shadow:0_3px_24px_rgba(0,0,0,0.18)]
                  "
                >
                  philosophy
                </span>
              </motion.div>
            </div>

            {/* ========================================================== */}
            {/* DATUM                                                       */}
            {/* ========================================================== */}

            <motion.div
              variants={{
                hidden: {
                  scaleX: 0,
                  opacity: 0,
                },
                visible: {
                  scaleX: 1,
                  opacity: 1,
                },
              }}
              transition={{
                duration: 1,
                delay: 0.72,
                ease: customEase,
              }}
              className="mt-10 h-px w-full max-w-[820px] origin-left bg-white/35"
            >
              <motion.div
                initial={{
                  scaleX: 0,
                }}
                whileInView={{
                  scaleX: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.95,
                  ease: customEase,
                }}
                className="h-full w-[18%] origin-left bg-champagne"
              />
            </motion.div>

            {/* ========================================================== */}
            {/* DESCRIPTION                                                 */}
            {/* ========================================================== */}

            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: 18,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              transition={{
                duration: 0.9,
                delay: 0.82,
                ease: customEase,
              }}
              className="mt-7 flex max-w-[680px] items-start gap-5"
            >
              <span className="mt-[0.65em] h-px w-10 shrink-0 bg-champagne/80" />

              <p className="max-w-[570px] font-sans text-[13px] leading-[1.85] text-white/80 md:text-[15px]">
                Five interrelated principles shape the relationship between
                landscape, architecture, water, hospitality, and technology.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* LOWER COORDINATES                                                */}
      {/* ================================================================ */}

      <motion.div
        variants={{
          hidden: {
            opacity: 0,
          },
          visible: {
            opacity: 1,
          },
        }}
        transition={{
          duration: 1,
          delay: 1,
        }}
        className="pointer-events-none absolute bottom-[7%] left-[8%] z-[5] flex items-center gap-3"
      >
        <span className="h-px w-8 bg-champagne/60" />

        <span className="font-mono text-[7px] uppercase tracking-[0.35em] text-white/60">
          Landscape / Architecture / Water
        </span>
      </motion.div>

      {/* ================================================================ */}
      {/* SCROLL CUE                                                       */}
      {/* ================================================================ */}

      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            y: 8,
          },
          visible: {
            opacity: 1,
            y: 0,
          },
        }}
        transition={{
          duration: 0.8,
          delay: 1.15,
          ease: customEase,
        }}
        className="absolute bottom-7 left-1/2 z-[5] hidden -translate-x-1/2 items-center gap-4 md:flex"
      >
        <span className="font-mono text-[7px] uppercase tracking-[0.35em] text-white/65">
          Explore principles
        </span>

        <span className="h-7 w-px bg-white/35" />

        <span className="font-mono text-[10px] text-champagne">↓</span>
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Desktop stacked experience                                                 */
/* -------------------------------------------------------------------------- */

function StackedPrinciples() {
  const stageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 25,
    mass: 0.25,
  });

  return (
    <section ref={stageRef} className="relative hidden h-[560vh] lg:block">
      {/* IMPORTANT:
This is intentionally NOT inside an overflow-hidden parent.
The sticky viewport must be allowed to remain sticky for the
entire 560vh stage. */}{" "}
      <div className="sticky top-0 h-svh w-full overflow-hidden bg-void">
        {" "}
        <PhilosophyStackAtmosphere progress={progress} />
        {/* Main stack */}
        <div className="absolute inset-0">
          {philosophyItems.map((item, index) => (
            <StackedPrincipleCard
              key={item.number}
              item={item}
              index={index}
              total={philosophyItems.length}
              progress={progress}
            />
          ))}
        </div>
        {/* Left navigation */}
        <StackNavigation progress={progress} />
        {/* Bottom metadata */}
        <div className="pointer-events-none absolute bottom-8 left-[5vw] right-[5vw] z-[100] flex items-center justify-between">
          {/* <span className="font-mono text-[8px] uppercase tracking-[0.35em] text-chrome1/30">
            Landscape / Architecture / Water
          </span> */}

          <span className="font-mono text-[8px] uppercase tracking-[0.35em] text-chrome1/30">
            Continue ↓
          </span>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Stack atmosphere                                                           */
/* -------------------------------------------------------------------------- */

function PhilosophyStackAtmosphere({
    progress,
  }: {
    progress: MotionValue<number>;
  }) {
    const contourY = useTransform(progress, [0, 1], [0, -120]);
    const contourRotate = useTransform(progress, [0, 1], [-2, 4]);
  
    const organicY = useTransform(progress, [0, 1], [80, -100]);
    const organicX = useTransform(progress, [0, 1], [-30, 60]);
    const organicScale = useTransform(progress, [0, 0.5, 1], [1, 1.08, 0.94]);
  
    const waterY = useTransform(progress, [0, 1], [100, -160]);
    const waterRotate = useTransform(progress, [0, 1], [0, 8]);
  
    return (
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Ambient atmospheric glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(196,178,140,0.045),transparent_38%)]" />
  
        {/* Topographic landscape */}
        <motion.div
          style={{
            y: contourY,
            rotate: contourRotate,
          }}
          className="absolute -right-[12vw] top-[8vh] h-[70vh] w-[70vw] opacity-[0.12]"
        >
          <svg
            viewBox="0 0 800 700"
            className="h-full w-full"
            fill="none"
          >
            {[...Array(9)].map((_, i) => (
              <ellipse
                key={i}
                cx="400"
                cy="350"
                rx={180 + i * 34}
                ry={100 + i * 25}
                stroke="currentColor"
                strokeWidth="0.7"
                className="text-chrome1"
              />
            ))}
          </svg>
        </motion.div>
  
        {/* Organic botanical silhouette */}
        <motion.div
          style={{
            x: organicX,
            y: organicY,
            scale: organicScale,
          }}
          className="absolute -left-[10vw] bottom-[-18vh] h-[75vh] w-[55vw] opacity-[0.055]"
        >
          <svg
            viewBox="0 0 600 800"
            className="h-full w-full"
            fill="none"
          >
            <path
              d="
                M80 760
                C130 620 120 470 210 350
                C275 265 370 210 450 110
                M210 350
                C165 300 125 250 105 175
                M215 350
                C285 325 350 285 405 230
                M155 470
                C105 430 65 390 45 330
                M160 470
                C230 450 290 415 340 370
              "
              stroke="currentColor"
              strokeWidth="1"
              className="text-chrome1"
            />
  
            <ellipse
              cx="100"
              cy="170"
              rx="58"
              ry="24"
              transform="rotate(-48 100 170)"
              className="fill-chrome1"
            />
  
            <ellipse
              cx="405"
              cy="230"
              rx="70"
              ry="26"
              transform="rotate(-40 405 230)"
              className="fill-chrome1"
            />
  
            <ellipse
              cx="45"
              cy="330"
              rx="62"
              ry="23"
              transform="rotate(-55 45 330)"
              className="fill-chrome1"
            />
          </svg>
        </motion.div>
  
        {/* Water / ripple structure */}
        <motion.div
          style={{
            y: waterY,
            rotate: waterRotate,
          }}
          className="absolute -right-[8vw] bottom-[-20vh] h-[55vh] w-[65vw] opacity-[0.07]"
        >
          <svg
            viewBox="0 0 900 500"
            className="h-full w-full"
            fill="none"
          >
            {[...Array(7)].map((_, i) => (
              <path
                key={i}
                d={`
                  M 0 ${220 + i * 30}
                  C 180 ${130 + i * 25},
                    330 ${310 + i * 15},
                    520 ${200 + i * 25}
                  C 680 ${110 + i * 30},
                    780 ${260 + i * 20},
                    900 ${170 + i * 25}
                `}
                stroke="currentColor"
                strokeWidth="0.7"
                className="text-chrome1"
              />
            ))}
          </svg>
        </motion.div>
  
        {/* Fine atmospheric particles */}
        <motion.div
          style={{
            y: useTransform(progress, [0, 1], [0, -70]),
          }}
          className="absolute inset-0 opacity-[0.18]"
        >
          {[...Array(24)].map((_, i) => (
            <span
              key={i}
              className="absolute h-[1px] w-[1px] rounded-full bg-chrome1"
              style={{
                left: `${(i * 37) % 100}%`,
                top: `${(i * 61) % 100}%`,
              }}
            />
          ))}
        </motion.div>
      </div>
    );
  }
/* -------------------------------------------------------------------------- */
/* Stack navigation                                                            */
/* -------------------------------------------------------------------------- */

function StackNavigation({
  progress,
}: {
  progress: ReturnType<typeof useSpring>;
}) {
  return (
    <div className="pointer-events-none absolute left-[5vw] top-1/2 z-[100] hidden -translate-y-1/2 xl:block">
      {" "}
      <div className="flex items-center gap-4">
        {" "}
        <div className="relative h-[145px] w-px bg-line">
          <motion.div
            style={{
              height: useTransform(progress, [0, 1], ["0%", "100%"]),
            }}
            className="absolute left-0 top-0 w-px bg-champagne/60"
          />{" "}
        </div>
        <div className="flex flex-col gap-3">
          <span className="mb-1 font-mono text-[7px] uppercase tracking-[0.35em] text-chrome1/30">
            Principles
          </span>

          {philosophyItems.map((item, index) => {
            const start = index / philosophyItems.length;
            const end =
              index === philosophyItems.length - 1
                ? 1
                : (index + 1) / philosophyItems.length;

            const opacity = useTransform(
              progress,
              [
                Math.max(0, start - 0.035),
                start + 0.035,
                end - 0.035,
                Math.min(1, end + 0.035),
              ],
              [0.25, 1, 1, 0.25]
            );

            return (
              <motion.span
                key={item.number}
                style={{
                  opacity,
                }}
                className="font-mono text-[9px] tracking-[0.25em] text-champagne"
              >
                {item.number}
              </motion.span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Stacked card                                                               */
/* -------------------------------------------------------------------------- */

function StackedPrincipleCard({
  item,
  index,
  total,
  progress,
}: {
  item: PhilosophyItem;
  index: number;
  total: number;
  progress: ReturnType<typeof useSpring>;
}) {
  const segment = 1 / total;

  /*

* Each card gets its own section of the total scroll runway.
*
* 0 ───── 20% ───── 40% ───── 60% ───── 80% ───── 100%
* card 1      card 2      card 3      card 4      card 5
*
* The card starts below the viewport.
* It rises into the exact center.
* It then stays there while the next card begins its entrance.
  */

  const sectionStart = index * segment;
  const sectionEnd = index === total - 1 ? 1 : (index + 1) * segment;

  const entranceStart = index === 0 ? 0 : sectionStart - segment * 0.12;

  const settlePoint = sectionStart + segment * 0.48;

  const nextCardPoint = index === total - 1 ? 1 : sectionEnd;

  const y = useTransform(
    progress,
    [entranceStart, sectionStart + segment * 0.08, settlePoint, nextCardPoint],
    ["105vh", "35vh", "0vh", `${-index * 12}px`]
  );

  const scale = useTransform(
    progress,
    [entranceStart, settlePoint, nextCardPoint],
    [0.94, 1, 0.985]
  );

  const opacity = useTransform(
    progress,
    [entranceStart, sectionStart + segment * 0.1, settlePoint],
    [0, 0.72, 1]
  );

  const rotate = useTransform(
    progress,
    [entranceStart, settlePoint],
    [index % 2 === 0 ? 1.2 : -1.2, 0]
  );

  const cardBlur = useTransform(
    progress,
    [entranceStart, settlePoint],
    ["blur(8px)", "blur(0px)"]
  );

  const contentY = useTransform(
    progress,
    [entranceStart, settlePoint],
    [45, 0]
  );

  const contentOpacity = useTransform(
    progress,
    [entranceStart + segment * 0.1, sectionStart + segment * 0.25, settlePoint],
    [0, 0.55, 1]
  );

  const isReverse = index % 2 === 1;

  /*

* Higher cards must sit above earlier cards.
* This is what creates the actual physical stack.
  */
  const zIndex = 20 + index;

  return (
    <motion.article
      style={{
        y,
        scale,
        opacity,
        rotate,
        filter: cardBlur,
        zIndex,
      }}
      className="absolute left-1/2 top-1/2 h-[min(70svh,700px)] w-[min(90vw,1220px)] -translate-x-1/2 -translate-y-1/2"
    >
      {/* Card surface */}{" "}
      <div className="relative h-full w-full overflow-visible">
        {/* Soft physical shadow */}{" "}
        <div className="absolute inset-[3%] translate-y-8 rounded-[1.5rem] bg-black/30 blur-[45px]" />
        {/* Main architectural panel */}
        <div className="relative h-full w-full rounded-[1.5rem] border border-bone/[0.07] bg-[#101713]/[0.97] shadow-[0_35px_100px_rgba(0,0,0,0.15)]">
          {/* Inner hairline */}
          <div className="pointer-events-none absolute inset-4 rounded-[1.15rem] border border-bone/[0.025]" />

          {/* Card coordinate */}
          <div className="absolute right-7 top-6 z-30 font-mono text-[8px] uppercase tracking-[0.35em] text-chrome1/25">
            PRINCIPLE / {item.number}
          </div>

          {/* Card content */}
          <div
            className={`relative grid h-full grid-cols-2 items-center gap-[6vw] px-[2vw] ${
              isReverse ? "direction-rtl" : ""
            }`}
          >
            {/* Image */}
            <motion.div
              style={{
                y: contentY,
                opacity: contentOpacity,
              }}
              className={isReverse ? "order-2" : "order-1"}
            >
              <PhilosophyImage item={item} />
            </motion.div>

            {/* Text */}
            <motion.div
              style={{
                y: contentY,
                opacity: contentOpacity,
              }}
              className={isReverse ? "order-1" : "order-2"}
            >
              <PhilosophyText item={item} active />
            </motion.div>
          </div>

          {/* Bottom card index */}
          <div className="absolute bottom-6 left-7 z-30 font-mono text-[7px] uppercase tracking-[0.35em] text-chrome1/20">
            PURURA / 2026
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* -------------------------------------------------------------------------- */
/* Mobile principles                                                          */
/* -------------------------------------------------------------------------- */

function MobilePrinciples() {
  return (
    <div className="relative lg:hidden">
      {" "}
      <Container>
        {philosophyItems.map((item, index) => (
          <MobilePrinciple key={item.number} item={item} index={index} />
        ))}{" "}
      </Container>{" "}
    </div>
  );
}

function MobilePrinciple({
  item,
  index,
}: {
  item: PhilosophyItem;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const active = useInView(ref, {
    amount: 0.35,
  });

  return (
    <motion.article
      ref={ref}
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.8,
        ease: customEase,
      }}
      className="relative border-b border-line/50 py-16"
    >
      {" "}
      <div className="mb-12 flex items-center justify-between">
        {" "}
        <div className="flex items-center gap-4">
          <motion.span
            animate={{
              opacity: active ? 1 : 0.45,
            }}
            className="font-mono text-[10px] tracking-[0.25em] text-champagne"
          >
            {item.number}
          </motion.span>

          <motion.div
            animate={{
              width: active ? 42 : 24,
              opacity: active ? 0.7 : 0.3,
            }}
            transition={{
              duration: 0.5,
              ease: customEase,
            }}
            className="h-px bg-champagne"
          />
        </div>
        <span className="font-mono text-[7px] uppercase tracking-[0.35em] text-chrome1/30">
          {String(index + 1).padStart(2, "0")} / 05
        </span>
      </div>
      <div className="space-y-14">
        <PhilosophyImage item={item} />

        <PhilosophyText item={item} active={active} />
      </div>
    </motion.article>
  );
}

/* -------------------------------------------------------------------------- */
/* Main component                                                             */
/* -------------------------------------------------------------------------- */

export default function DesignPhilosophy() {
  return (
    <section id="design-philosophy" className="relative bg-void">
      {/* ================================================================== */}
      {/* HERO                                                               */}
      {/* ================================================================== */}

      <div className="relative flex min-h-dvh items-center overflow-hidden border-b border-line/50">

        <div className="relative z-10 w-full">
          <div className="">
            {/* Actual animated heading */}
            <PhilosophyHeroTitle />
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* DESKTOP — TRUE PINNED STACK                                        */}
      {/* ================================================================== */}

      <StackedPrinciples />

      {/* ================================================================== */}
      {/* MOBILE                                                             */}
      {/* ================================================================== */}

      <MobilePrinciples />

      {/* ================================================================== */}
      {/* END                                                                */}
      {/* ================================================================== */}

      <Container>
        <div className="flex items-center justify-between py-8">
          <span className="font-mono text-[8px] uppercase tracking-[0.35em] text-chrome1/30">
            PURURA / Design Philosophy
          </span>

          <span className="font-mono text-[8px] uppercase tracking-[0.35em] text-chrome1/30">
            01 — 05
          </span>
        </div>
      </Container>
    </section>
  );
}
