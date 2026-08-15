"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { customEase } from "./Hero";
import { ArrowUpRight } from "lucide-react";
import { architecturalEase } from "../layout/Footer";

const metrics = [
  {
    number: "45M+",
    label: "URBAN CONSUMERS",
    description: "Within reach of premium weekend experiences",
  },
  {
    number: "90",
    suffix: "MIN",
    label: "FROM DHAKA",
    description: "Strategically positioned for short-stay tourism",
  },
  {
    number: "0",
    label: "DIRECT COMPETITORS",
    description:
      "No destination combines luxury, nature and technology at this scale",
  },
  {
    number: "↑",
    label: "TOURISM DEMAND",
    description: "Growing demand continues to outpace supply",
  },
];

export default function Investment() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="investment"
      ref={ref}
      className="relative py-32 md:py-40 bg-stone dark:bg-void text-charcoal dark:text-bone overflow-hidden"
    >
      {/* =====================================================
          ABSTRACT ARCHITECTURAL MASS
          ===================================================== */}

      <motion.div
        initial={{ opacity: 0, x: 80, rotate: 8 }}
        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, delay: 0.15, ease: architecturalEase }}
        className="pointer-events-none absolute -right-[180px] top-[0%] h-[860px] w-[860px] opacity-[0.12] blur-[8px] *:rounded-2xl"
      >
        <div className="absolute inset-0 rotate-45 border-8 border-champagne/40" />
        <div className="absolute inset-[55px] rotate-45 border-4 border-champagne/50" />
        <div className="absolute inset-[115px] rotate-45 border-4 border-champagne/30" />

      </motion.div>
      
      {/* Section header */}
      <div className="px-6 md:px-12 lg:px-20 mb-16 md:mb-24">
        <div className="max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1, delay: 0.2, ease: customEase }}
            className="annotation text-charcoal/60 dark:text-bone/60 mb-6"
          >
            INVESTMENT STRATEGY / 01
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={
              isInView
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 40, filter: "blur(10px)" }
            }
            transition={{ duration: 1.2, delay: 0.4, ease: customEase }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-[-0.04em] text-charcoal font-display max-w-4xl"
          >
            A rare
            <br />
            <span className="text-champagne">opportunity</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, delay: 0.6, ease: customEase }}
            className="mt-8 max-w-xl text-lg md:text-xl leading-relaxed text-bone/60 font-display"
          >
            Positioned between Dhaka&rsquo;s expanding urban population and vast
            natural landscapes, Valuka presents a rare opportunity to create
            Bangladesh&rsquo;s first eco-intelligent destination.
          </motion.p>
        </div>
      </div>

      {/* Metrics — enhanced cards */}
      <div className="px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
                }
                transition={{
                  duration: 0.8,
                  delay: 0.8 + index * 0.1,
                  ease: customEase,
                }}
                className="group relative bg-white dark:bg-white rounded-2xl border border-charcoal/10 dark:border-champagne/20 p-8 md:p-10 shadow-sm hover:shadow-lg hover:border-champagne/30 dark:hover:border-champagne/40 transition-all duration-500 hover:-translate-y-1"
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-champagne/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <p className="annotation text-charcoal/50 dark:text-bone/60 mb-4 text-xs">
                  {metric.label}
                </p>
                <p className="text-4xl md:text-5xl font-bold tracking-[-0.03em] text-charcoal dark:text-champagne font-display mb-4">
                  {metric.number}
                  {metric.suffix && (
                    <span className="text-xl text-charcoal/60 dark:text-bone/60 ml-2">
                      {metric.suffix}
                    </span>
                  )}
                </p>
                <p className="text-sm leading-relaxed text-charcoal/60 dark:text-bone/70 font-display">
                  {metric.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ROI Calculator CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 1.4, ease: customEase }}
        className="px-6 md:px-12 lg:px-20 mt-16 md:mt-24"
      >
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm font-mono uppercase tracking-[0.25em] text-charcoal/50 dark:text-bone/50 mb-6">
            Explore your returns
          </p>
          <motion.a
            href="/investment#roi-calculator"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 rounded-full bg-charcoal dark:bg-champagne px-8 py-4 text-xs font-bold uppercase tracking-[0.28em] text-ivory dark:text-void shadow-[0_12px_30px_rgba(26,26,30,0.16)] transition hover:bg-charcoal-warm dark:hover:bg-champagne/90 hover:shadow-[0_16px_36px_rgba(26,26,30,0.20)]"
          >
            Calculate Your ROI
            <ArrowUpRight className="h-4 w-4 text-champagne dark:text-void" />
          </motion.a>
        </div>
      </motion.div>

      {/* Thin architectural line */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-charcoal/10 dark:bg-champagne/20" />
    </section>
  );
}
