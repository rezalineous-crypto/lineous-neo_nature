"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { customEase } from "./Hero";

const resortImages = [
  {
    src: "/Purura/NewImages/Overall 1.png",
    alt: "Aerial resort view",
    caption: "AERIAL VISTA",
    description: "A bird's-eye view of the entire resort ecosystem",
  },
  {
    src: "/Purura/NewImages/Entry 1.png",
    alt: "Private villa district",
    caption: "THE ENTRY POINT",
    description: "Intelligent, modern and futuristic welcome",
  },
  {
    src: "/Purura/NewImages/Hotel 3.png",
    alt: "Cultural experiences",
    caption: "HOTEL & LOUNGE",
    description: "Spacious, Elegant & Timeless",
  },
  {
    src: "/Purura/NewImages/Mosque 1.png",
    alt: "Intelligent hospitality",
    caption: "MOSQUE",
    description: "Find your peace at your place",
  },
  {
    src: "/Purura/NewImages/Restaurant 1.png",
    alt: "Cultural experiences",
    caption: "RESTAURANT",
    description: "Curated events, dining, and performances",
  },
];

export default function TheResort() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Horizontal scroll — vertical scroll drives horizontal movement
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["70%", `-${(resortImages.length - 2.8) * 100}%`]
  );

  // Typography moves at a different rate (slower)
  const titleX = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(resortImages.length - 1) * 30}%`]
  );

  return (
    <section
      id="the-resort"
      ref={sectionRef}
      className="relative bg-void dark:bg-ivory lg:h-[310dvh]"
    >
      {/* Large architectural shell behind the form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, x: 80 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.8, ease: customEase }}
        className="absolute -right-[9%] top-[8%] hidden h-[900px] w-[900px] rotate-[18deg]  border-[120px] border-chrome1/30 lg:block"
      >
        <div className="absolute inset-[70px]  border-[100px] border-champagne/20" />
        <div className="absolute inset-[150px] rounded-[44%] bg-champagne/[0.035] blur-3xl" />
      </motion.div>

      {/* Mobile: Vertical stack layout */}
      <div className="lg:hidden py-16 px-6">
        <div className="mb-12">
          <p className="annotation text-white mb-4 text-shadow-sm">
            THE RESORT
          </p>
          <h2 className="text-4xl leading-[0.95] tracking-[-0.04em] text-champagne font-display text-shadow-md uppercase font-extrabold">
            A journey <br />
            through <br />
            <span className="text-chrome1 uppercase">extraordinary</span> <br />
            spaces
          </h2>
        </div>
        <div className="flex flex-col gap-12">
          {resortImages.map((image, index) => (
            <div
              key={index}
              className="relative"
              style={{ width: "min(85vw, 600px)" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 1,
                  delay: index * 0.1,
                  ease: customEase,
                }}
                className={`relative ${index % 2 === 0 ? "mt-12" : "mb-12"}`}
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover rounded-xl drop-shadow-xl"
                    sizes="(max-width: 768px) 85vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
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
      </div>

      {/* Desktop: Horizontal scroll container */}
      <div className="hidden lg:block h-[300vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Chapter title — moves at different rate */}
          <div className="z-20 flex items-center justify-start h-full">
            <motion.p
              style={{ x: titleX }}
              className="annotation text-white mb-4 text-shadow-sm"
            >
              THE RESORT
            </motion.p>
            <motion.h2
              style={{ x: titleX }}
              className="text-[clamp(2rem,4.7vw,3rem)] leading-[0.95] tracking-[-0.04em] text-champagne font-display uppercase font-extralight"
            >
              A <span className="font-extrabold text-chrome3 text-shadow-md text-[clamp(2rem,4.7vw,3.5rem)]">journey </span>
              through
              <br />
              <span className="text-chrome3 text-shadow-chrome3 uppercase font-extrabold  text-shadow-md text-[clamp(2rem,4.7vw,3.5rem)]">extraordinary</span>{" "}
              spaces
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
                    transition={{
                      duration: 1,
                      delay: index * 0.1,
                      ease: customEase,
                    }}
                    className={`relative ${
                      index % 2 === 0 ? "mt-12" : "mb-12"
                    }`}
                  >
                    <div className="relative w-[600px] h-[600px]">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover rounded-xl drop-shadow-2xl"
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
                <div key={index} className="w-8 h-px bg-bone/20" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
