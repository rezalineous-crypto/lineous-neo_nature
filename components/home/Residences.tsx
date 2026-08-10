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
      className="relative py-32 md:py-40 bg-forest text-bone overflow-hidden"
    >
      {/* Section header */}
      <div className="px-6 md:px-12 lg:px-20 mb-16 md:mb-24">
        <div className="max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1, delay: 0.2, ease: customEase }}
            className="annotation text-bone/60 mb-6"
          >
            RESIDENCES
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 40, filter: "blur(10px)" }}
            transition={{ duration: 1.2, delay: 0.4, ease: customEase }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-[-0.04em] text-bone font-display max-w-4xl"
          >
            Private villa
            <br />
            <span className="text-champagne">districts</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, delay: 0.6, ease: customEase }}
            className="mt-8 max-w-xl text-lg md:text-xl leading-relaxed text-bone/60 font-display"
          >
            Three accommodation concepts designed to redefine hospitality through
            nature-integrated luxury and intelligent design.
          </motion.p>
        </div>
      </div>

      {/* Villa types — image sequence */}
      <div className="px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {residences.map((villa, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                transition={{
                  duration: 1.2,
                  delay: 0.8 + index * 0.2,
                  ease: customEase,
                }}
                className="group"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden mb-6">
                  <Image
                    src={villa.image}
                    alt={villa.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                {/* Content */}
                <p className="annotation text-champagne/90 mb-3 text-shadow-sm">
                  {villa.subtitle}
                </p>
                <h3 className="text-2xl md:text-3xl font-bold tracking-[-0.03em] text-bone font-display mb-4 text-shadow-sm">
                  {villa.title}
                </h3>
                <p className="text-base leading-relaxed text-bone/70 font-display text-shadow-sm">
                  {villa.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Thin architectural line */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-bone/10" />
    </section>
  );
}
