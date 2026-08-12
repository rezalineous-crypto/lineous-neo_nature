"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { customEase } from "./Hero";

const residences = [
  {
    title: "POD VILLAS",
    subtitle: "Responsive Living",
    description:
      "Compact luxury pods that adapt to your needs. Intelligent climate control, private terraces, and seamless indoor-outdoor flow.",
    image: "/purura_resort_images/purura_render_04.jpg",
  },
  {
    title: "TREE-LEVEL SKY VILLAS",
    subtitle: "Vertical Living",
    description:
      "Elevated among the canopy, these villas offer panoramic views, private pools, and a profound connection to nature.",
    image: "/purura_resort_images/purura_render_05.jpg",
  },
  {
    title: "FLOATING VILLAS",
    subtitle: "Aquatic Horizon",
    description:
      "Suspended over water, these villas blur the boundary between land and lagoon. Wake to the sound of water.",
    image: "/purura_resort_images/purura_render_06.jpg",
  },
];

export default function Residences() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-forest py-32 text-white md:py-40"
    >
      {/* =========================================================
          ATMOSPHERIC BACKGROUND
      ========================================================= */}

      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Large radial light fields */}
        <div className="absolute -left-[20%] top-[8%] h-[650px] w-[650px] rounded-full bg-[radial-gradient(circle,rgba(210,180,120,0.08)_0%,rgba(210,180,120,0.025)_35%,transparent_70%)]" />

        <div className="absolute -right-[18%] top-[35%] h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.045)_0%,rgba(255,255,255,0.015)_35%,transparent_70%)]" />

        <div className="absolute left-[35%] bottom-[-25%] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(210,180,120,0.055)_0%,transparent_68%)]" />

        {/* Fine architectural grid */}
        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Large diagonal construction line */}
        <div className="absolute left-[8%] top-[-10%] h-[125%] w-px rotate-[22deg] bg-bone/[0.08]" />

        <div className="absolute right-[17%] top-[-10%] h-[125%] w-px rotate-[-22deg] bg-bone/[0.055]" />

        {/* =====================================================
            LARGE ARCHITECTURAL CIRCLE
        ===================================================== */}

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 2, ease: customEase }}
          className="absolute -right-[230px] top-[12%] h-[620px] w-[620px] rounded-full border border-bone/[0.09]"
        />

        <div className="absolute -right-[150px] top-[20%] h-[460px] w-[460px] rounded-full border border-champagne/[0.07]" />

        <div className="absolute -right-[65px] top-[29%] h-[290px] w-[290px] rounded-full border border-bone/[0.06]" />

        {/* Circle crosshair */}
        <div className="absolute right-[5%] top-[43%] h-px w-[230px] bg-bone/[0.08]" />

        <div className="absolute right-[18%] top-[31%] h-[230px] w-px bg-bone/[0.06]" />

        {/* =====================================================
            LEFT ARCHITECTURAL FRAME
        ===================================================== */}

        <div className="absolute left-[-80px] top-[48%] h-[340px] w-[340px] rotate-45 border border-champagne/[0.055]" />

        <div className="absolute left-[-25px] top-[54%] h-[230px] w-[230px] rotate-45 border border-bone/[0.05]" />

        {/* Small construction point */}
        <div className="absolute left-[9%] top-[63%] h-2 w-2 rounded-full border border-champagne/30" />

        <div className="absolute left-[9.35%] top-[63.35%] h-1 w-1 rounded-full bg-champagne/40" />

        {/* Connector */}
        <div className="absolute left-[9%] top-[63%] h-px w-[180px] bg-champagne/[0.12]" />

        {/* =====================================================
            TECHNICAL MARKERS
        ===================================================== */}

        <div className="absolute right-[7%] top-[18%] flex items-center gap-3 opacity-40">
          <span className="h-px w-10 bg-champagne/40" />
          <span className="font-mono text-[9px] tracking-[0.25em] text-white/50">
            23°42′N
          </span>
        </div>

        <div className="absolute bottom-[15%] left-[7%] flex items-center gap-3 opacity-30">
          <span className="font-mono text-[9px] tracking-[0.25em] text-white/50">
            PURURA / 04
          </span>
          <span className="h-px w-16 bg-bone/30" />
        </div>

        {/* Tiny architectural ticks */}
        <div className="absolute right-[11%] top-[58%] flex flex-col gap-2 opacity-30">
          <span className="h-px w-6 bg-bone/50" />
          <span className="h-px w-10 bg-bone/30" />
          <span className="h-px w-4 bg-bone/50" />
        </div>

        {/* Bottom horizontal datum */}
        <div className="absolute bottom-[9%] left-0 right-0 h-px bg-bone/[0.055]" />

        {/* Vertical datum */}
        <div className="absolute bottom-0 right-[31%] top-0 w-px bg-bone/[0.04]" />
      </div>

      {/* =========================================================
          SECTION HEADER
      ========================================================= */}

      <div className="relative z-10 mb-16 px-6 md:mb-24 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 20 }
            }
            transition={{ duration: 1, delay: 0.2, ease: customEase }}
            className="annotation mb-6 text-white/60"
          >
            RESIDENCES
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={
              isInView
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 40, filter: "blur(10px)" }
            }
            transition={{ duration: 1.2, delay: 0.4, ease: customEase }}
            className="max-w-4xl font-display text-5xl font-bold leading-[0.95] tracking-[-0.04em] text-white md:text-7xl lg:text-8xl"
          >
            Private villa
            <br />
            <span className="text-champagne">districts</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={
              isInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 30 }
            }
            transition={{ duration: 1, delay: 0.6, ease: customEase }}
            className="mt-8 max-w-xl font-display text-lg leading-relaxed text-white/60 md:text-xl"
          >
            Three accommodation concepts designed to redefine hospitality
            through nature-integrated luxury and intelligent design.
          </motion.p>
        </div>
      </div>

      {/* =========================================================
          VILLA TYPES
      ========================================================= */}

      <div className="relative z-10 px-6 md:px-12 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-3 md:gap-12">
            {residences.map((villa, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 60 }
                }
                transition={{
                  duration: 1.2,
                  delay: 0.8 + index * 0.2,
                  ease: customEase,
                }}
                className="group relative"
              >
                {/* Villa number */}
                <div className="mb-4 flex items-center justify-between">
                  <span className="annotation text-white/25">
                    0{index + 1}
                  </span>

                  <span className="annotation text-white/20">
                    PURURA / RESIDENCE
                  </span>
                </div>

                {/* Image frame */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-bone/[0.08] bg-black/10 drop-shadow-2xl">
                  {/* Architectural corner brackets */}
                  <span className="pointer-events-none absolute left-3 top-3 z-20 h-5 w-5 border-l border-t border-champagne/40 transition-all duration-700 group-hover:left-5 group-hover:top-5 group-hover:border-champagne/80" />

                  <span className="pointer-events-none absolute right-3 top-3 z-20 h-5 w-5 border-r border-t border-champagne/40 transition-all duration-700 group-hover:right-5 group-hover:top-5 group-hover:border-champagne/80" />

                  <span className="pointer-events-none absolute bottom-3 left-3 z-20 h-5 w-5 border-b border-l border-champagne/40 transition-all duration-700 group-hover:bottom-5 group-hover:left-5 group-hover:border-champagne/80" />

                  <span className="pointer-events-none absolute bottom-3 right-3 z-20 h-5 w-5 border-b border-r border-champagne/40 transition-all duration-700 group-hover:bottom-5 group-hover:right-5 group-hover:border-champagne/80" />

                  <Image
                    src={villa.image}
                    alt={villa.title}
                    fill
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />

                  {/* Image atmospheric overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-white/[0.04]" />

                  {/* Image coordinate */}
                  <div className="absolute bottom-4 left-4 z-10 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                    <span className="font-mono text-[9px] tracking-[0.2em] text-white/60">
                      23°42′N / 90°24′E
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="relative mt-6">
                  <p className="annotation mb-3 text-champagne/90">
                    {villa.subtitle}
                  </p>

                  <h3 className="mb-4 font-display text-2xl font-bold tracking-[-0.03em] text-white md:text-3xl">
                    {villa.title}
                  </h3>

                  <p className="font-display text-base leading-relaxed text-white/70">
                    {villa.description}
                  </p>
                </div>

                {/* Connecting architectural line */}
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-px w-12 bg-champagne/30 transition-all duration-700 group-hover:w-20 group-hover:bg-champagne/70" />
                  <span className="annotation text-white/20">
                    0{index + 1}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom architectural datum */}
      <div className="absolute inset-x-0 bottom-0 z-10 h-px bg-bone/10" />
    </section>
  );
}