"use client";

import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import { customEase } from "@/components/home/Hero";
import ParallaxImage from "@/components/home/ParallaxImage";

const amenities = [
  {
    name: "Restaurants",
    image: "/purura_resort_images/purura_render_08.jpg",
  },
  {
    name: "Culture",
    image: "/purura_resort_images/purura_render_17.jpg",
  },
  {
    name: "Events",
    image: "/purura_resort_images/purura_render_03.jpg",
  },
  {
    name: "Waterfront",
    image: "/purura_resort_images/purura_render_18.jpg",
  },
];

export default function AmenitiesPage() {
  return (
    <main className="relative bg-void">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(201,169,255,0.06),transparent_50%)] pointer-events-none" />
      <section id="amenities" className="relative min-h-[75vh] overflow-hidden bg-void">
        <ParallaxImage
          src="/purura_resort_images/purura_render_07.jpg"
          alt="Purura amenities"
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
                Amenities
              </p>
              <h1 className="mt-6 text-5xl md:text-7xl font-bold leading-none tracking-[-0.06em] text-bone font-display">
                Premium amenities shaped by nature and intelligent hospitality.
              </h1>
            </motion.div>
          </Container>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: customEase }}
            className="max-w-4xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-chrome1 font-mono">
              Resort Amenities
            </p>

            <h2 className="mt-6 text-4xl md:text-6xl font-bold leading-none tracking-[-0.05em] text-bone font-display">
              A refined amenity ecosystem for guests and investors.
            </h2>

            <p className="mt-8 text-lg leading-relaxed text-haze">
              The amenities should be presented through strong key imagery, calm
              spacing, and the centralized dark palette with chrome accents.
            </p>
          </motion.div>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {amenities.map((amenity, index) => (
              <motion.div
                key={amenity.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: customEase, delay: index * 0.1 }}
                className="group relative rounded-[2rem] border border-line bg-graphite/50 overflow-hidden"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ParallaxImage
                    src={amenity.image}
                    alt={amenity.name}
                    fill
                    intensity={0.5}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-void/20 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="mb-4 h-px w-12 bg-chrome1" />
                  <h3 className="text-xl font-bold tracking-[-0.02em] text-bone">
                    {amenity.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
