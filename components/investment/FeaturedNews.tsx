"use client";

import Container from "../layout/Container";
import { motion } from "framer-motion";
import { customEase } from "../home/Hero";

export default function FeaturedNews() {
  return (
    <section className="bg-void py-20 md:py-28">
      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: customEase }}
          className="text-3xl md:text-5xl font-bold leading-[0.95] tracking-[-0.05em] text-bone mb-6 font-display"
        >
          Featured <span className="text-gradient-chrome">News</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: customEase }}
          className="text-base md:text-lg text-haze mb-12 max-w-xl"
        >
          Stay updated with the latest developments and investment insights from Neo Nature.
        </motion.p>

        <a
          href="#"
          className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-[0.28em] text-bone group hover:text-chrome1 transition-colors"
        >
          <span className="w-10 h-[1px] bg-bone group-hover:bg-chrome1 group-hover:w-14 transition-all" />
          <span>Explore more</span>
        </a>
      </Container>
    </section>
  );
}
