"use client";

import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import { customEase } from "@/components/home/Hero";
import ParallaxImage from "@/components/home/ParallaxImage";

export default function VisionPage() {
  return (
    <main className="relative bg-void py-40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(142,197,255,0.06),transparent_50%)] pointer-events-none" />
      <Container className="max-w-5xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="uppercase tracking-[0.35em] text-xs text-chrome1 font-mono"
        >
          The Vision
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold mt-6 mb-4 leading-tight tracking-[-0.05em] text-bone font-display"
        >
          A Bold Alternative to Traditional Resorts
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg leading-relaxed text-haze"
        >
          To create Bangladesh&apos;s first futuristic eco-intelligent resort where
          technology, sustainability, and immersive nature merge into a seamless
          luxury experience.
        </motion.p>

        <motion.div
          initial={{ scale: 1.08, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
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
      </Container>
    </main>
  );
}
