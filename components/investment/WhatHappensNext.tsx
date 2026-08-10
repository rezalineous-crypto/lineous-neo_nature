"use client";

import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import { customEase } from "@/components/home/Hero";
import {
  FileText,
  Handshake,
  Building2,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

const timelineSteps = [
  {
    icon: FileText,
    step: "01",
    title: "Submit Inquiry",
    description:
      "Share your investment goals, budget, and timeline. Our team reviews your profile within 24 hours.",
  },
  {
    icon: Handshake,
    step: "02",
    title: "Discovery Call",
    description:
      "A dedicated consultant walks you through the opportunity, answers questions, and refines your requirements.",
  },
  {
    icon: Building2,
    step: "03",
    title: "Tailored Proposal",
    description:
      "Receive a customized investment proposal with projected returns, structure options, and due diligence materials.",
  },
  {
    icon: TrendingUp,
    step: "04",
    title: "Investment",
    description:
      "Finalize terms, complete documentation, and begin your journey as a Purura investor.",
  },
];

export default function WhatHappensNext() {
  return (
    <section id="process" className="relative bg-void py-20 md:py-28">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(142,197,255,0.1), transparent 50%)",
          }}
        />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: customEase }}
          className="max-w-3xl mb-14 md:mb-20"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-chrome1 font-mono">
            Process
          </p>

          <h2 className="mt-6 text-3xl md:text-5xl lg:text-6xl font-bold leading-[0.95] tracking-[-0.05em] text-bone font-display">
            What happens
            <span className="text-gradient-chrome"> next</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-line" />

          <div className="space-y-8 md:space-y-12">
            {timelineSteps.map((item, index) => {
              const IconComponent = item.icon;
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.75,
                    delay: index * 0.12,
                    ease: customEase,
                  }}
                  className={`relative flex flex-col md:flex-row ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  } items-start md:items-center gap-6 md:gap-12`}
                >
                  {/* Node dot */}
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-3 h-3 rounded-full bg-chrome1 border-2 border-void z-10" />

                  {/* Content card */}
                  <div
                    className={`ml-12 md:ml-0 md:w-1/2 ${
                      isLeft ? "md:pr-12" : "md:pl-12"
                    }`}
                  >
                    <div className="rounded-[1.5rem] border border-line bg-graphite/50 backdrop-blur-sm p-6 md:p-8 transition-all duration-500 hover:border-chrome1/30">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full border border-line flex items-center justify-center text-chrome1">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-chrome1 font-mono">
                          Step {item.step}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold tracking-[-0.02em] text-bone mb-3">
                        {item.title}
                      </h3>

                      <p className="text-sm leading-relaxed text-haze">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5, ease: customEase }}
          className="mt-14 md:mt-20 text-center"
        >
          <a
            href="#inquiry"
            className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-bone group"
          >
            <span className="w-8 h-[1px] bg-bone/50 group-hover:bg-chrome1 group-hover:w-12 transition-all" />
            <span className="group-hover:text-chrome1 transition-colors">
              Begin your inquiry
            </span>
            <ChevronRight className="w-4 h-4 text-chrome1 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
