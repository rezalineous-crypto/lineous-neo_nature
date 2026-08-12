"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { customEase } from "./Hero";

export default function TheLand() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen bg-void overflow-hidden"
    >
      {/* Full-bleed tall landscape image — extends beyond viewport */}
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-0 will-change-transform"
      >
        <div className="absolute inset-0 md:inset-[-5%] lg:inset-[-10%]">
          <Image
            src="/purura_resort_images/purura_render_06.jpg"
            alt="Purura landscape — The Land"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </motion.div>

      {/* Content — positioned with intention */}
      <div className="relative z-10 min-h-screen flex items-end">
        <div className="w-full px-6 md:px-12 lg:px-20 pb-24 md:pb-32">
          <div className="max-w-7xl mx-auto">
            {/* Architectural annotation */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: customEase }}
              className="annotation text-white mb-6 text-shadow-sm"
            >
              THE LAND / 200+ ACRES
            </motion.p>

            {/* Headline — overlapping the image */}
            <motion.h2
              initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.4, ease: customEase }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-[-0.04em] text-white font-display max-w-4xl text-shadow-md"
            >
              Where nature
              <br />
              becomes
              <br />
              <span className="text-chrome1">architecture</span>
            </motion.h2>

            {/* Description — minimal, with breathing room */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6, ease: customEase }}
              className="mt-8 max-w-xl text-lg md:text-xl leading-relaxed text-white/80 font-display text-shadow-sm"
            >
              200 acres of pristine landscape, reimagined through regenerative
              design. Every element of the resort responds to the land&rsquo;s
              natural contours.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Thin architectural line */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-bone/10" />
      <div className="absolute bottom-0 inset-0 bg-gradient-to-r from-black to-transparent" />
    </section>
  );
}
