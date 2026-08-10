"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { X, Compass } from "lucide-react";
import Container from "../layout/Container";
import { customEase } from "../home/Hero";

const mapPoints = [
  {
    label: "Arrival Hub",
    top: "28%",
    left: "22%",
    description:
      "The main gateway to Purura, featuring seamless arrival experiences and first impressions.",
    features: ["VIP Lounge", "Express Check-in", "Concierge Services"],
  },
  {
    label: "Villa District",
    top: "48%",
    left: "58%",
    description:
      "Private villa clusters with dedicated amenities and nature-integrated designs.",
    features: ["Private Pools", "Garden Terraces", "Smart Home Tech"],
  },
  {
    label: "Waterfront Zone",
    top: "68%",
    left: "42%",
    description:
      "Waterfront experiences with dining, recreation, and immersive aquatic environments.",
    features: ["Fine Dining", "Water Sports", "Sunset Decks"],
  },
  {
    label: "Experience Core",
    top: "34%",
    left: "74%",
    description:
      "The cultural and wellness heart of the resort with curated programming.",
    features: ["Wellness Center", "Cultural Venues", "Event Spaces"],
  },
];

export default function InvestmentMap() {
  const [selectedSpot, setSelectedSpot] = useState<(typeof mapPoints)[0] | null>(null);

  return (
    <section className="relative w-full bg-void py-20 md:py-28">
      <div className="text-center mb-14 md:mb-20">
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: customEase }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[0.95] tracking-[-0.05em] text-bone font-display"
        >
          PROJECT{" "}
          <span className="text-gradient-chrome">LOCATION</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: customEase }}
          className="mt-4 text-base md:text-lg text-haze"
        >
          Strategically located in Valuka, Bangladesh, with proximity to Dhaka and
          natural landscapes.
        </motion.p>
      </div>

      <Container>
        <div className="relative w-full h-[60vh] min-h-[450px] rounded-[2rem] overflow-hidden border border-line bg-graphite">
          <Image
            src="/masterplan_map.png"
            alt="Project Location Map"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-overlay/30 pointer-events-none" />

          {mapPoints.map((spot) => (
            <div
              key={spot.label}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ top: spot.top, left: spot.left }}
              onClick={() => setSelectedSpot(spot)}
            >
              <div className="h-4 w-4 rounded-full bg-chrome1 ring-8 ring-chrome1/20 group-hover:ring-chrome1/40 transition-all" />
              <p className="mt-2 whitespace-nowrap rounded-full bg-void/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-bone font-mono">
                {spot.label}
              </p>
            </div>
          ))}
        </div>
      </Container>

      {/* Slide-out panel */}
      {selectedSpot && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed right-0 top-0 h-full w-[400px] max-w-[90vw] z-50 bg-graphite shadow-2xl"
        >
          <button
            onClick={() => setSelectedSpot(null)}
            className="absolute top-5 right-5 z-10 p-2 rounded-full bg-void hover:bg-line transition-colors"
          >
            <X className="w-5 h-5 text-bone" />
          </button>

          <div className="p-8 pt-20 h-full overflow-y-auto">
            <span className="text-chrome1 text-[10px] tracking-[0.2em] uppercase font-semibold font-mono">
              Location
            </span>
            <h3 className="text-3xl font-bold mt-2 text-bone font-display">
              {selectedSpot.label}
            </h3>

            <div className="p-7 space-y-6">
              <p className="text-haze text-sm leading-relaxed">
                {selectedSpot.description}
              </p>

              <div className="space-y-3">
                {selectedSpot.features.map((feature, i) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="p-3 rounded-xl bg-void border border-line"
                  >
                    <span className="text-bone text-xs font-medium">{feature}</span>
                  </motion.div>
                ))}
              </div>

              <button className="w-full py-4 rounded-full bg-chrome2 text-void text-xs font-bold uppercase tracking-[0.25em] hover:bg-chrome1 transition-colors">
                Explore This Location
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
