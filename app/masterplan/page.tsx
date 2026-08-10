"use client";

import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import { customEase } from "@/components/home/Hero";
import MasterplanExplorer from "@/components/masterplan/MasterplanExplorer";

export default function MasterplanPage() {
  return (
    <main className="bg-void">
      {/* Hero intro section */}
      <section className="relative min-h-[40vh] overflow-hidden bg-void flex items-end">
        <div className="absolute inset-0 bg-gradient-to-b from-void via-void/80 to-void" />
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: customEase }}
            className="max-w-5xl pb-16 pt-24"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-bone/60 font-mono">
              Masterplan
            </p>
            <h1 className="mt-6 text-5xl md:text-7xl font-bold leading-none tracking-[-0.06em] text-bone font-display">
              The heart of Purura.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-haze/80">
              Explore the resort masterplan. Hover over the holographic markers to discover
              each location, its features, and the future vision of Purura.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Interactive Masterplan Explorer */}
      <MasterplanExplorer />
    </main>
  );
}
