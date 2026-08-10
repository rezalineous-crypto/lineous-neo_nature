"use client";

import Container from "../layout/Container";
import { motion } from "framer-motion";
import { customEase } from "../home/Hero";
import { sectorsPartners } from "@/lib/investment-data";

export default function SectorsFeature() {
  return (
    <section className="bg-void py-20 md:py-28">
      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: customEase }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[0.95] tracking-[-0.05em] text-bone mb-16 md:mb-20 font-display"
        >
          HOW <span className="text-gradient-chrome">OUR SECTORS</span> ARE<br />
          REINVENTING THEIR CATEGORIES
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {sectorsPartners.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: index * 0.1, ease: customEase }}
              className="group rounded-[1.5rem] border border-line bg-graphite/50 overflow-hidden transition-all duration-500 hover:border-chrome1/40 hover:bg-graphite"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-overlay/30" />
              </div>

              <div className="p-7 md:p-8 space-y-4">
                <h3 className="text-sm font-bold leading-snug tracking-[-0.02em] text-bone">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-haze">
                  {item.description}
                </p>

                <a
                  href={item.href}
                  className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-bone group-hover:text-chrome1 transition-colors"
                >
                  <span className="w-8 h-[1px] bg-bone group-hover:bg-chrome1 transition-colors" />
                  {item.linkLabel}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
