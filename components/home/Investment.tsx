"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { customEase } from "./Hero";

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
    description: "No destination combines luxury, nature and technology at this scale",
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
      ref={ref}
      className="relative py-32 md:py-40 bg-stone dark:bg-void text-charcoal dark:text-bone overflow-hidden"
    >
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
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 40, filter: "blur(10px)" }}
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
            className="mt-8 max-w-xl text-lg md:text-xl leading-relaxed text-charcoal/60 font-display"
          >
            Positioned between Dhaka&rsquo;s expanding urban population and vast natural
            landscapes, Valuka presents a rare opportunity to create Bangladesh&rsquo;s
            first eco-intelligent destination.
          </motion.p>
        </div>
      </div>

      {/* Metrics — highly structured, minimal decoration */}
      <div className="px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-charcoal/10">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{
                  duration: 0.8,
                  delay: 0.8 + index * 0.1,
                  ease: customEase,
                }}
                className="bg-stone p-8 md:p-10"
              >
                <p className="annotation text-charcoal/40 mb-4">
                  {metric.label}
                </p>
                <p className="text-4xl md:text-5xl font-bold tracking-[-0.03em] text-charcoal font-display mb-4">
                  {metric.number}
                  {metric.suffix && (
                    <span className="text-xl text-champagne ml-2">
                      {metric.suffix}
                    </span>
                  )}
                </p>
                <p className="text-sm leading-relaxed text-charcoal/50 font-display">
                  {metric.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Thin architectural line */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-charcoal/10" />
    </section>
  );
}
