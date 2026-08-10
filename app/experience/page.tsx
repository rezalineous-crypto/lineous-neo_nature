"use client";

import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import { customEase } from "@/components/home/Hero";
import ParallaxImage from "@/components/home/ParallaxImage";

const zones = [
  "Lobby / Lounge",
  "Villas",
  "Hotels",
  "Nature",
];

export default function ExperiencePage() {
  return (
    <main className="relative bg-void">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(142,197,255,0.06),transparent_50%)] pointer-events-none" />
      <section id="experience" className="relative min-h-[75vh] overflow-hidden bg-void">
        <ParallaxImage
          src="/purura_resort_images/purura_render_15.jpg"
          alt="Neo Nature experience"
          fill
          intensity={0.5}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-void/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />

        <div className="relative z-10 min-h-[75vh] flex items-end">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: customEase }}
              className="max-w-5xl pb-24"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-bone font-mono">
                Experience
              </p>
              <h1 className="mt-6 text-5xl md:text-7xl font-bold leading-none tracking-[-0.06em] text-bone font-display">
                A resort experience designed around nature, luxury, and discovery.
              </h1>
            </motion.div>
          </Container>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-12 lg:gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: customEase }}
              className="relative min-h-[520px] overflow-hidden rounded-[2rem] bg-graphite"
            >
              <ParallaxImage
                src="/purura_resort_images/purura_render_16.jpg"
                alt="Neo Nature experience key image"
                fill
                intensity={0.5}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-void/15" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: customEase }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-chrome1 font-mono">
                Curated Zones
              </p>

              <h2 className="mt-6 text-4xl md:text-6xl font-bold leading-none tracking-[-0.05em] text-bone font-display">
                Every zone should feel premium, visual, and connected to the project palette.
              </h2>

              <p className="mt-8 text-lg leading-relaxed text-haze">
                The experience layout should prioritize the color and atmosphere of
                Neo Nature, using strong imagery and restrained editorial spacing.
              </p>

              <div className="mt-10 grid sm:grid-cols-2 gap-4">
                {zones.map((zone) => (
                  <div
                    key={zone}
                    className="rounded-2xl border border-line bg-graphite/50 p-6"
                  >
                    <p className="text-lg font-bold tracking-[-0.02em] text-bone">
                      {zone}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </Container>
      </section>
    </main>
  );
}
