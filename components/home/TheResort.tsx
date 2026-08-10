"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { customEase } from "./Hero";

const resortImages = [
  {
    src: "/purura_resort_images/purura_render_02.jpg",
    alt: "Aerial resort view",
    caption: "AERIAL VISTA",
    description: "A bird's-eye view of the entire resort ecosystem",
  },
  {
    src: "/purura_resort_images/purura_render_10.jpg",
    alt: "Wellness and waterfront",
    caption: "WELLNESS",
    description: "Bio-filtered lagoons and restorative programming",
  },
  {
    src: "/purura_resort_images/purura_render_11.jpg",
    alt: "Private villa district",
    caption: "PRIVATE VILLAS",
    description: "Pod, sky, and floating villa clusters",
  },
  {
    src: "/purura_resort_images/purura_render_16.jpg",
    alt: "Cultural experiences",
    caption: "CULTURE",
    description: "Curated events, dining, and performances",
  },
  {
    src: "/purura_resort_images/purura_render_19.jpg",
    alt: "Intelligent hospitality",
    caption: "INTELLIGENCE",
    description: "AI-powered guest experiences throughout",
  },
];

export default function TheResort() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Horizontal scroll — vertical scroll drives horizontal movement
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${(resortImages.length - 3.5) * 100}%`]);

  // Typography moves at a different rate (slower)
  const titleX = useTransform(scrollYProgress, [0, 1], ["0%", `-${(resortImages.length - 1) * 30}%`]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[300vh] bg-void"
    >
      {/* Pinned container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Chapter title — moves at different rate */}
        <div className="absolute top-12 left-8 md:top-16 md:left-16 lg:top-20 lg:left-24 z-20">
          <motion.p
            style={{ x: titleX }}
            className="annotation text-bone/70 mb-4 text-shadow-sm"
          >
            THE RESORT
          </motion.p>
          <motion.h2
            style={{ x: titleX }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-[-0.04em] text-bone font-display text-shadow-md"
          >
            A journey through
            <br />
            <span className="text-chrome1">extraordinary</span> spaces
          </motion.h2>
        </div>

        {/* Horizontal scroll container */}
        <motion.div
          style={{ x }}
          className="absolute inset-0 flex items-center will-change-transform"
        >
          <div className="flex gap-8 md:gap-12 px-8 md:px-16 lg:px-24 pt-32">
            {resortImages.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 relative"
                style={{ width: "min(85vw, 600px)" }}
              >
                {/* Image with varying vertical positions */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.1, ease: customEase }}
                  className={`relative ${index % 2 === 0 ? 'mt-12' : 'mb-12'}`}
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="85vw"
                    />
                  </div>

                  {/* Caption and description — architectural style */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="annotation text-bone/70 text-shadow-sm">
                        {image.caption}
                      </p>
                      <p className="annotation text-bone/60 text-shadow-sm">
                        0{index + 1} / 0{resortImages.length}
                      </p>
                    </div>
                    <p className="text-sm text-bone/80 font-display max-w-xs text-shadow-sm">
                      {image.description}
                    </p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Progress indicator — subtle */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
          <div className="flex items-center gap-2">
            {resortImages.map((_, index) => (
              <div
                key={index}
                className="w-8 h-px bg-bone/20"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
