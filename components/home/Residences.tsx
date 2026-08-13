"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { customEase } from "./Hero";

const residences = [
  {
    title: "POD VILLAS",
    subtitle: "Responsive Living",
    description:
      "Compact luxury pods that adapt to your needs. Intelligent climate control, private terraces, and seamless indoor-outdoor flow.",
    image: "/purura_resort_images/purura_render_04.jpg",
    number: "01",
    system: "ADAPTIVE",
    metric: "PRIVATE TERRACE",
  },
  {
    title: "TREE-LEVEL SKY VILLAS",
    subtitle: "Vertical Living",
    description:
      "Elevated among the canopy, these villas offer panoramic views, private pools, and a profound connection to nature.",
    image: "/purura_resort_images/purura_render_05.jpg",
    number: "02",
    system: "ELEVATED",
    metric: "CANOPY VIEW",
  },
  {
    title: "FLOATING VILLAS",
    subtitle: "Aquatic Horizon",
    description:
      "Suspended over water, these villas blur the boundary between land and lagoon. Wake to the sound of water.",
    image: "/purura_resort_images/purura_render_06.jpg",
    number: "03",
    system: "AQUATIC",
    metric: "LAGOON ACCESS",
  },
];

const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

function ResidencePanel({
  residence,
  index,
  progress,
}: {
  residence: (typeof residences)[number];
  index: number;
  progress: ReturnType<typeof useSpring>;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, {
    stiffness: 80,
    damping: 22,
    mass: 0.35,
  });

  const smoothMouseY = useSpring(mouseY, {
    stiffness: 80,
    damping: 22,
    mass: 0.35,
  });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();

    mouseX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);

    mouseY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  /*
   * Each panel gets its own section of the scroll progress.
   *
   * 01 = roughly 0.20 → 0.46
   * 02 = roughly 0.46 → 0.72
   * 03 = roughly 0.72 → 1.00
   */

  const start = 0.18 + index * 0.27;
  const enter = start + 0.07;
  const exit = start + 0.27;

  const opacity = useTransform(
    progress,
    [start, enter, exit - 0.06, exit],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    progress,
    [start, enter, exit - 0.06, exit],
    ["12vh", "0vh", "-3vh", "-10vh"]
  );

  const scale = useTransform(
    progress,
    [start, enter, exit - 0.08, exit],
    [0.9, 1, 1.025, 0.94]
  );

  const blur = useTransform(
    progress,
    [start, enter, exit - 0.06, exit],
    ["12px", "0px", "0px", "8px"]
  );

  const imageScale = useTransform(
    progress,
    [start, enter, exit - 0.08, exit],
    [1.12, 1, 1.045, 1.09]
  );

  const imageY = useTransform(
    progress,
    [start, enter, exit],
    ["5%", "0%", "-3%"]
  );

  const imageX = useTransform(
    progress,
    [start, enter, exit],
    ["3vw", "0vw", "-1.5vw"]
  );

  const imageMouseX = useTransform(smoothMouseX, [-1, 1], ["-10px", "10px"]);

  const imageMouseY = useTransform(smoothMouseY, [-1, 1], ["-8px", "8px"]);

  const textX = useTransform(
    progress,
    [start, enter, exit],
    ["4vw", "0vw", "-2vw"]
  );

  const imageClip = useTransform(
    progress,
    [start, enter, exit - 0.08, exit],
    [
      "inset(8% 5% 8% 5%)",
      "inset(0% 0% 0% 0%)",
      "inset(0% 0% 0% 0%)",
      "inset(5% 3% 5% 3%)",
    ]
  );

  const numberY = useTransform(
    progress,
    [start, enter, exit],
    ["30vh", "0vh", "-20vh"]
  );

  return (
    <motion.div
      style={{
        opacity,
        y,
        scale,
        filter: blur,
      }}
      className="absolute inset-0"
    >
      {/* =========================================================
          LARGE BACKGROUND NUMBER
      ========================================================= */}

      <motion.div
        style={{
          y: numberY,
        }}
        className="pointer-events-none absolute left-[4vw] top-[2vh] z-0 select-none"
      >
        <span className="font-display text-[35vw] font-bold leading-none tracking-[-0.12em] text-white/[0.018]">
          {residence.number}
        </span>
      </motion.div>

      {/* =========================================================
          RESIDENCE IMAGE
      ========================================================= */}

      <motion.div
        style={{
          x: imageX,
          y: imageY,
          scale: imageScale,
          clipPath: imageClip,
        }}
        className="absolute left-[7vw] top-[16vh] z-20 w-[42vw] max-w-[680px]"
      >
        <motion.div
          style={{
            x: imageMouseX,
            y: imageMouseY,
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="group relative cursor-crosshair"
        >
          {/* Registration corners */}

          <span className="pointer-events-none absolute -left-3 -top-3 z-30 h-8 w-8 border-l border-t border-champagne/70 transition-all duration-700 group-hover:-left-5 group-hover:-top-5 group-hover:h-11 group-hover:w-11" />

          <span className="pointer-events-none absolute -right-3 -top-3 z-30 h-8 w-8 border-r border-t border-champagne/70 transition-all duration-700 group-hover:-right-5 group-hover:-top-5 group-hover:h-11 group-hover:w-11" />

          <span className="pointer-events-none absolute -bottom-3 -left-3 z-30 h-8 w-8 border-b border-l border-champagne/70 transition-all duration-700 group-hover:-bottom-5 group-hover:-left-5 group-hover:h-11 group-hover:w-11" />

          <span className="pointer-events-none absolute -bottom-3 -right-3 z-30 h-8 w-8 border-b border-r border-champagne/70 transition-all duration-700 group-hover:-bottom-5 group-hover:-right-5 group-hover:h-11 group-hover:w-11" />

          <div className="relative aspect-[4/4] rounded-lg overflow-hidden border border-white/[0.09] bg-black/20">
            <Image
              src={residence.image}
              alt={residence.title}
              fill
              priority={index === 0}
              className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.045]"
              sizes="(max-width: 1280px) 45vw, 680px"
            />

            {/* Cinematic gradient */}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-white/[0.04]" />

            {/* Image vignette */}

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.3)_100%)]" />

            {/* Scan line */}

            <motion.div
              initial={{ y: "-120%" }}
              animate={{ y: "120%" }}
              transition={{
                duration: 3.5,
                delay: 0.5 + index * 0.2,
                ease: [0.65, 0, 0.35, 1],
              }}
              className="pointer-events-none absolute inset-x-0 top-0 h-[20%] bg-gradient-to-b from-transparent via-white/[0.045] to-transparent"
            />

            {/* Center registration cross */}

            <div className="pointer-events-none absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 opacity-30">
              <span className="absolute left-1/2 top-0 h-full w-px bg-white" />
              <span className="absolute left-0 top-1/2 h-px w-full bg-white" />
            </div>

            {/* Image information */}

            <div className="absolute bottom-5 left-5 z-20">
              <p className="annotation text-champagne/80">{residence.system}</p>

              <p className="mt-1 annotation text-white/45">
                {residence.metric}
              </p>
            </div>

            <div className="absolute right-5 top-5 z-20 text-right">
              <p className="annotation text-white/40">
                RES / {residence.number}
              </p>

              <p className="mt-1 annotation text-white/20">
                ARCHITECTURAL STUDY
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* =========================================================
          INFORMATION
      ========================================================= */}

      <motion.div
        style={{
          x: textX,
        }}
        className="absolute left-[56vw] top-1/2 z-20 w-[34vw] max-w-[560px] -translate-y-1/2"
      >
        <div className="mb-7 flex items-center gap-4">
          <span className="annotation text-champagne/70">
            0{residence.number} / 03
          </span>

          <span className="h-px w-16 bg-champagne/30" />

          <span className="annotation text-white/20">PURURA RESIDENCE</span>
        </div>

        <p className="annotation mb-5 text-white/45">{residence.subtitle}</p>

        <h3 className="font-display text-[clamp(3.2rem,5.4vw,6rem)] font-bold leading-[0.87] tracking-[-0.065em] text-white">
          {residence.title}
        </h3>

        <div className="mt-9 flex max-w-[500px] items-start gap-5">
          <span className="mt-3 h-px w-12 shrink-0 bg-champagne/55" />

          <p className="font-display text-lg leading-[1.75] text-white/55">
            {residence.description}
          </p>
        </div>

        {/* Technical information */}

        <div className="mt-12 grid max-w-[500px] grid-cols-2 border-y border-white/[0.08]">
          <div className="border-r border-white/[0.08] py-5">
            <p className="annotation text-white/20">LIVING SYSTEM</p>

            <p className="mt-2 annotation text-champagne/70">
              {residence.system}
            </p>
          </div>

          <div className="py-5 pl-6">
            <p className="annotation text-white/20">PRIMARY EXPERIENCE</p>

            <p className="mt-2 annotation text-white/50">{residence.metric}</p>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-4">
          <span className="h-px w-14 bg-champagne/50" />

          <span className="annotation text-white/20">
            ARCHITECTURAL COLLECTION
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Residences() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 28,
    mass: 0.3,
  });

  /*
   * ============================================================
   * BACKGROUND MOVEMENT
   * ============================================================
   */

  const backgroundY = useTransform(progress, [0, 1], ["0vh", "-16vh"]);

  const backgroundX = useTransform(progress, [0, 1], ["0vw", "-4vw"]);

  const orbitRotation = useTransform(progress, [0, 1], [0, 32]);

  const orbitScale = useTransform(
    progress,
    [0, 0.35, 0.7, 1],
    [1, 1.08, 0.95, 1.1]
  );

  const orbitX = useTransform(progress, [0, 1], ["0vw", "-10vw"]);

  const gridX = useTransform(progress, [0, 1], ["0vw", "-25vw"]);

  /*
   * ============================================================
   * INTRO
   * ============================================================
   */

  const introY = useTransform(
    progress,
    [0, 0.18, 0.3],
    ["0vh", "-4vh", "-12vh"]
  );

  const introOpacity = useTransform(progress, [0, 0.16, 0.29], [1, 1, 0]);

  const introScale = useTransform(progress, [0, 0.2, 0.3], [1, 0.97, 0.9]);

  const introBlur = useTransform(
    progress,
    [0, 0.2, 0.3],
    ["0px", "0px", "8px"]
  );

  /*
   * ============================================================
   * GHOST WORD
   * ============================================================
   */

  const ghostX = useTransform(progress, [0, 1], ["0vw", "-12vw"]);

  const ghostOpacity = useTransform(
    progress,
    [0, 0.3, 0.65, 1],
    [0.025, 0.045, 0.035, 0.065]
  );

  /*
   * ============================================================
   * PROGRESS / DATUM
   * ============================================================
   */

  const progressWidth = useTransform(progress, [0, 1], ["0%", "100%"]);

  const axisScale = useTransform(
    progress,
    [0, 0.25, 0.5, 0.75, 1],
    [0.12, 0.34, 0.56, 0.78, 1]
  );

  return (
    <section
      id="residences"
      ref={sectionRef}
      className="relative bg-forest text-white"
    >
      {/* =========================================================
          MOBILE
      ========================================================= */}

      <div className="relative overflow-hidden py-28 md:hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-[40%] top-[5%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(210,180,120,0.08)_0%,transparent_68%)]" />

          <div className="absolute -right-[40%] top-[45%] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.04)_0%,transparent_68%)]" />

          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Header */}

        <div className="relative z-10 px-6">
          <p className="annotation mb-5 text-white/50">RESIDENCES</p>

          <h2 className="font-display text-5xl font-bold leading-[0.9] tracking-[-0.05em]">
            Private villa
            <br />
            <span className="text-champagne">districts</span>
          </h2>

          <p className="mt-7 max-w-sm font-display text-base leading-relaxed text-white/55">
            Three accommodation concepts designed to redefine hospitality
            through nature-integrated luxury and intelligent design.
          </p>
        </div>

        {/* Mobile residences */}

        <div className="relative z-10 mt-20 space-y-28 px-6">
          {residences.map((residence, index) => (
            <motion.article
              key={residence.title}
              initial={{
                opacity: 0,
                y: 60,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                margin: "-100px",
              }}
              transition={{
                duration: 1.2,
                delay: index * 0.1,
                ease: customEase,
              }}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="annotation text-white/25">
                  0{residence.number}
                </span>

                <span className="annotation text-white/20">
                  PURURA / RESIDENCE
                </span>
              </div>

              <div className="group relative aspect-[3/4] overflow-hidden border border-white/[0.08]">
                <Image
                  src={residence.image}
                  alt={residence.title}
                  fill
                  priority={index === 0}
                  className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.045]"
                  sizes="100vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-white/[0.04]" />

                <span className="absolute left-4 top-4 h-7 w-7 border-l border-t border-champagne/60" />
                <span className="absolute right-4 top-4 h-7 w-7 border-r border-t border-champagne/60" />
                <span className="absolute bottom-4 left-4 h-7 w-7 border-b border-l border-champagne/60" />
                <span className="absolute bottom-4 right-4 h-7 w-7 border-b border-r border-champagne/60" />

                <div className="absolute bottom-5 left-5">
                  <p className="annotation text-champagne/80">
                    {residence.system}
                  </p>

                  <p className="mt-1 annotation text-white/45">
                    {residence.metric}
                  </p>
                </div>
              </div>

              <div className="mt-7">
                <p className="annotation mb-3 text-champagne/80">
                  {residence.subtitle}
                </p>

                <h3 className="font-display text-3xl font-bold tracking-[-0.04em]">
                  {residence.title}
                </h3>

                <p className="mt-4 font-display text-base leading-relaxed text-white/60">
                  {residence.description}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <span className="h-px w-14 bg-champagne/40" />

                <span className="annotation text-white/20">
                  0{residence.number} / PURURA
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* =========================================================
          DESKTOP CINEMATIC STACK
      ========================================================= */}

      <div className="relative hidden h-[400vh] md:block">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* =====================================================
              ATMOSPHERE
          ===================================================== */}

          <motion.div
            style={{
              y: backgroundY,
              x: backgroundX,
            }}
            className="pointer-events-none absolute -inset-[5%] z-0"
          >
            <div className="absolute -left-[18%] top-[5%] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(210,180,120,0.075)_0%,rgba(210,180,120,0.02)_35%,transparent_70%)]" />

            <div className="absolute -right-[15%] top-[30%] h-[850px] w-[850px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.045)_0%,rgba(255,255,255,0.012)_35%,transparent_70%)]" />

            <div className="absolute bottom-[-30%] left-[30%] h-[750px] w-[750px] rounded-full bg-[radial-gradient(circle,rgba(210,180,120,0.05)_0%,transparent_68%)]" />
          </motion.div>

          {/* =====================================================
              GRID
          ===================================================== */}

          <motion.div
            style={{
              x: gridX,
            }}
            className="pointer-events-none absolute -inset-[15%] z-[1] opacity-[0.11]"
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(
                    to right,
                    rgba(255,255,255,0.05) 1px,
                    transparent 1px
                  ),
                  linear-gradient(
                    to bottom,
                    rgba(255,255,255,0.05) 1px,
                    transparent 1px
                  )
                `,
                backgroundSize: "82px 82px",
                maskImage:
                  "radial-gradient(circle at 50% 50%, black 0%, transparent 72%)",
                WebkitMaskImage:
                  "radial-gradient(circle at 50% 50%, black 0%, transparent 72%)",
              }}
            />
          </motion.div>

          {/* =====================================================
              DIAGONAL CONSTRUCTION LINES
          ===================================================== */}

          <motion.div
            style={{
              x: gridX,
            }}
            className="pointer-events-none absolute left-[-10%] top-[-30%] z-[2] h-[160%] w-px rotate-[22deg] bg-white/[0.055]"
          />

          <motion.div
            style={{
              x: gridX,
            }}
            className="pointer-events-none absolute right-[16%] top-[-30%] z-[2] h-[160%] w-px rotate-[-22deg] bg-champagne/[0.055]"
          />

          {/* =====================================================
              ORBIT
          ===================================================== */}

          <motion.div
            style={{
              x: orbitX,
              scale: orbitScale,
              rotate: orbitRotation,
            }}
            className="pointer-events-none absolute left-[58%] top-[50%] z-[2] h-[52vw] w-[52vw] -translate-x-1/2 -translate-y-1/2"
          >
            <div className="absolute inset-0 rounded-full border border-white/[0.045]" />

            <div className="absolute inset-[10%] rounded-full border border-champagne/[0.065]" />

            <div className="absolute inset-[25%] rounded-full border border-white/[0.035]" />

            <div className="absolute inset-[40%] rounded-full border border-champagne/[0.035]" />

            <span className="absolute left-1/2 top-0 h-5 w-px -translate-x-1/2 bg-champagne/35" />

            <span className="absolute bottom-0 left-1/2 h-5 w-px -translate-x-1/2 bg-white/15" />

            <span className="absolute left-0 top-1/2 h-px w-5 -translate-y-1/2 bg-white/15" />

            <span className="absolute right-0 top-1/2 h-px w-5 -translate-y-1/2 bg-champagne/30" />
          </motion.div>

          {/* =====================================================
              HEADER
          ===================================================== */}

          <div className="pointer-events-none absolute left-8 right-8 top-8 z-50 flex items-start justify-between lg:left-14 lg:right-14 lg:top-12">
            <div>
              <div className="flex items-center gap-4">
                <span className="annotation text-white/50">PURURA</span>

                <span className="h-px w-12 bg-champagne/35" />

                <span className="annotation text-white/25">RESIDENCES</span>
              </div>

              <p className="mt-3 annotation text-white/20">
                PRIVATE DEVELOPMENT / 2026
              </p>
            </div>

            <div className="text-right">
              <p className="annotation text-white/25">23°42′N</p>

              <p className="mt-2 annotation text-champagne/35">
                FUTURE / PLACE / VALUE
              </p>
            </div>
          </div>

          {/* =====================================================
              GHOST PURURA
          ===================================================== */}

          <motion.div
            style={{
              x: ghostX,
              opacity: ghostOpacity,
            }}
            className="pointer-events-none absolute left-[2vw] top-[3%] z-[3] whitespace-nowrap"
          >
            <span className="font-display text-[18vw] font-bold leading-none tracking-[-0.09em] text-white">
              PURURA
            </span>
          </motion.div>

          {/* =====================================================
              INTRODUCTION
          ===================================================== */}

          <motion.div
            style={{
              y: introY,
              opacity: introOpacity,
              scale: introScale,
              filter: introBlur,
            }}
            className="absolute left-[8vw] top-1/2 z-20 w-[75vw] -translate-y-1/2"
          >
            <p className="annotation mb-7 text-champagne/65">
              RESIDENCE COLLECTION / 01—03
            </p>

            <h2 className="font-display text-[clamp(5rem,9.5vw,10rem)] font-bold leading-[0.8] tracking-[-0.075em] text-white">
              PRIVATE
              <br />
              <span className="ml-[6vw] text-champagne">VILLA</span>
              <br />
              DISTRICTS
            </h2>

            <div className="mt-12 flex items-center gap-5">
              <span className="h-px w-16 bg-champagne/60" />

              <p className="annotation text-white/30">THREE WAYS TO BELONG</p>
            </div>

            <p className="mt-8 max-w-xl font-display text-lg leading-relaxed text-white/45">
              Three accommodation concepts designed to redefine hospitality
              through nature-integrated luxury and intelligent design.
            </p>
          </motion.div>

          {/* =====================================================
              RESIDENCE STACK
          ===================================================== */}

          <div className="absolute inset-0 z-10">
            {residences.map((residence, index) => (
              <ResidencePanel
                key={residence.title}
                residence={residence}
                index={index}
                progress={progress}
              />
            ))}
          </div>

          {/* =====================================================
              GOLD DATUM
          ===================================================== */}

          <div className="pointer-events-none absolute bottom-[16%] left-0 right-0 z-40">
            <div className="mx-auto h-px w-[44vw] bg-white/[0.055]" />

            <motion.div
              style={{
                scaleX: axisScale,
              }}
              className="absolute left-1/2 top-0 h-px w-[44vw] origin-left -translate-x-1/2 bg-gradient-to-r from-transparent via-champagne/70 to-transparent"
            />
          </div>

          {/* =====================================================
              SIDE DATUM
          ===================================================== */}

          <div className="pointer-events-none absolute bottom-0 left-[5vw] top-0 z-40 hidden w-px bg-white/[0.025] lg:block" />

          <div className="pointer-events-none absolute bottom-0 right-[5vw] top-0 z-40 hidden w-px bg-white/[0.025] lg:block" />

          {/* =====================================================
              BOTTOM NAV
          ===================================================== */}

          <div className="pointer-events-none absolute bottom-7 left-8 right-8 z-50 flex items-center justify-between lg:left-14 lg:right-14">
            <div className="flex items-center gap-4">
              <span className="annotation text-white/30">RESIDENCES</span>

              <span className="h-px w-10 bg-white/10" />

              <span className="annotation text-white/20">PURURA</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="annotation text-white/20">EXPLORE</span>

              <div className="relative h-px w-32 overflow-hidden bg-white/10">
                <motion.div
                  style={{
                    width: progressWidth,
                  }}
                  className="absolute inset-y-0 left-0 bg-champagne/60"
                />
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-50 h-px bg-white/10" />
        </div>
      </div>
    </section>
  );
}
