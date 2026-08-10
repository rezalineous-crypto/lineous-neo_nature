"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Container from "../layout/Container";
import { masterplanSections } from "@/lib/masterplan-data";
import MasterplanCard from "./MasterplanCard";
import { customEase } from "../home/Hero";
import ParallaxImage from "../home/ParallaxImage";

const mapPoints = [
  { label: "Arrival Hub", top: "28%", left: "22%" },
  { label: "Villa District", top: "48%", left: "58%" },
  { label: "Waterfront Zone", top: "68%", left: "42%" },
  { label: "Experience Core", top: "34%", left: "74%" },
];

export default function Masterplan() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      id="masterplan"
      className="relative bg-void pt-24 md:pt-32 pb-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(142,197,255,0.12),transparent_34%),radial-gradient(circle_at_20%_80%,rgba(201,169,255,0.08),transparent_36%)]" />

      <Container>
        <div className="relative z-10 mb-16 max-w-5xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xs font-semibold uppercase tracking-[0.4em] text-chrome1 font-mono"
          >
            Masterplan
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: customEase }}
            className="mt-6 text-5xl md:text-7xl font-bold leading-none tracking-[-0.06em] text-bone font-display"
          >
            The heart of Purura.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5, ease: customEase }}
            className="mt-8 max-w-3xl text-lg leading-relaxed text-haze font-display"
          >
            A full-bleed resort ecosystem designed around arrival, private
            villas, waterfront experiences, culture, wellness, and future-ready
            hospitality.
          </motion.p>
        </div>

        <div className="relative z-10 grid lg:grid-cols-[0.86fr_1.14fr] gap-10 lg:gap-16 items-start">
          <div>
            {masterplanSections.map((item, index) => (
              <MasterplanCard
                key={item.id}
                title={item.title}
                description={item.description}
                onEnter={() => setActiveIndex(index)}
              />
            ))}
          </div>

          <div className="top-40 rounded-4xl bg-graphite overflow-hidden drop-shadow-2xl relative h-[70dvh]">
            <AnimatePresence mode="sync">
              <motion.div
                key={activeIndex}
                className="absolute inset-0 drop-shadow-2xl"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: customEase }}
              >
                <ParallaxImage
                  src={masterplanSections[activeIndex].image}
                  alt={masterplanSections[activeIndex].title}
                  fill
                  intensity={0.5}
                  className="object-cover rounded-4xl"
                />
                <div className="absolute inset-0 bg-overlay/18" />
                <div className="absolute -bottom-4 -left-4 md:-bottom-8 md:-left-8 text-outlined text-[18vw] md:text-[12vw] leading-none opacity-100 uppercase">
                  {masterplanSections[activeIndex].title.split(" ")[0]}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 bg-linear-to-t from-overlay/70 to-transparent">
                  {/* <p className="text-xs font-semibold uppercase tracking-[0.35em] text-chrome1 font-mono">
                    Key Location
                  </p>
                  <h3 className="mt-3 text-3xl md:text-5xl font-bold leading-none tracking-[-0.04em] text-bone">
                    {masterplanSections[activeIndex].title}
                  </h3> */}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
