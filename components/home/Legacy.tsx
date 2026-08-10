"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { customEase } from "./Hero";

export default function Legacy() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-void overflow-hidden"
    >
      {/* Architectural annotation — top left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 1.2, delay: 0.3, ease: customEase }}
        className="absolute top-12 left-8 md:top-16 md:left-16 lg:top-20 lg:left-24 z-10"
      >
        <p className="annotation text-bone/60">
          37° 41&rsquo; 22&Prime;N / VALUKA / BANGLADESH
        </p>
      </motion.div>

      {/* Main content — almost empty, enormous typography */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="w-full px-6 md:px-12 lg:px-20 py-32">
          <div className="max-w-7xl mx-auto text-center">
            {/* Enormous typography */}
            <motion.h2
              initial={{ opacity: 0, y: 80, filter: "blur(10px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 80, filter: "blur(10px)" }}
              transition={{ duration: 1.6, delay: 0.5, ease: customEase }}
              className="text-giant font-display text-bone max-w-6xl mx-auto text-shadow-lg"
            >
              THE <span className="dark:text-champagne text-chrome1">FUTURE</span>
              <br />
              OF <span className="dark:text-champagne text-chrome1">ESCAPE</span>
            </motion.h2>

            {/* Cinematic image reveal — positioned with intention */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              transition={{ duration: 1.4, delay: 1.2, ease: customEase }}
              className="mt-20 md:mt-32 max-w-2xl mx-auto"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src="/purura_resort_images/purura_render_01.jpg"
                  alt="PURURA — The Future of Escape"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1, delay: 1.8, ease: customEase }}
                className="mt-4 annotation text-bone/40"
              >
                Architectural Vision / FINAL
              </motion.p>
            </motion.div>

            {/* Minimal closing text */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 1.2, delay: 1.6, ease: customEase }}
              className="mt-16 md:mt-24 max-w-xl text-lg md:text-xl leading-relaxed text-bone/50 font-display mx-auto"
            >
              Where nature, technology, and human aspiration converge into
              something timeless.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Thin architectural line */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-bone/10" />
    </section>
  );
}
