"use client";

import Container from "../layout/Container";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { customEase } from "./Hero";
import ParallaxImage from "./ParallaxImage";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: customEase,
    },
  },
};

export default function Vision() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const keyWords = [
    "Smart technology",
    "Immersive landscape",
    "Experiential luxury",
  ];

  return (
    <section id="vision" className="py-40 bg-void text-bone">
      <Container className="max-w-5xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="uppercase tracking-[0.35em] text-xs text-chrome1 font-mono"
        >
          The Vision
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold mt-6 mb-4 leading-tight tracking-[-0.05em] font-display"
        >
          A Bold Alternative to Traditional Resorts
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg leading-relaxed text-haze"
        >
          To create Bangladesh&apos;s first futuristic eco-intelligent resort where
          technology, sustainability, and immersive nature merge into a seamless
          luxury experience.
        </motion.p>

        <motion.div
          ref={ref}
          initial={{ scale: 1.08, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1, ease: customEase }}
          className="mt-14 relative h-[420px] overflow-hidden rounded-[2rem]"
        >
          <ParallaxImage
            src="/purura_resort_images/purura_render_20.jpg"
            alt="Vision Section"
            fill
            intensity={0.5}
            className="object-cover"
          />
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="flex flex-wrap items-center justify-center gap-3 mt-10"
        >
          {keyWords.map((w) => (
            <motion.div
              key={w}
              variants={fadeUp}
              whileHover={{
                scale: 1.06,
                y: -2,
              }}
              className="
                relative
                px-5 py-2
                rounded-full
                border border-line
                text-haze
                tracking-wide
                overflow-hidden
              "
            >
              <span className="relative z-10">{w}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 text-chrome1 text-sm tracking-[0.25em] uppercase font-mono"
        >
          WE WANT AN ARCHITECTURE THAT WILL BE CONTEMPORARY AFTER 20–25+ YEARS
        </motion.div>
      </Container>
    </section>
  );
}
