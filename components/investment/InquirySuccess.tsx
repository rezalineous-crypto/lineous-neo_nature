"use client";

import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import { customEase } from "@/components/home/Hero";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function InquirySuccess() {
  return (
    <section className="relative bg-void py-20 md:py-28">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(201,169,255,0.2), transparent 60%)",
          }}
        />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: customEase }}
          className="max-w-lg mx-auto text-center"
        >
          {/* Premium badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: customEase }}
            className="inline-flex items-center gap-2 rounded-full border border-chrome1/30 bg-chrome1/10 px-4 py-2 mb-8"
          >
            <CheckCircle2 className="w-4 h-4 text-chrome1" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-chrome1 font-mono">
              Inquiry Received
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: customEase }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[0.95] tracking-[-0.05em] text-bone font-display"
          >
            Thank you for your
            <span className="text-gradient-chrome"> interest</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: customEase }}
            className="mt-6 text-lg leading-relaxed text-haze max-w-md mx-auto"
          >
            Our investment team will review your inquiry and prepare a tailored
            proposal. You can expect to hear from us within 24 hours.
          </motion.p>

          {/* Next steps preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: customEase }}
            className="mt-10 rounded-[1.5rem] border border-line bg-graphite/50 backdrop-blur-sm p-6 md:p-8 text-left"
          >
            <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-chrome1 font-mono mb-6">
              What happens next
            </h3>
            <ol className="space-y-5">
              {[
                {
                  step: "01",
                  title: "Review",
                  description:
                    "Our investment team reviews your profile and preferences.",
                },
                {
                  step: "02",
                  title: "Proposal",
                  description:
                    "A tailored investment proposal is prepared for you.",
                },
                {
                  step: "03",
                  title: "Consultation",
                  description:
                    "Schedule a one-on-one call to discuss opportunities.",
                },
              ].map((item, index) => (
                <motion.li
                  key={item.step}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1, ease: customEase }}
                  className="flex items-start gap-4"
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-full border border-chrome1/30 bg-chrome1/10 flex items-center justify-center text-xs font-bold text-chrome1 font-mono">
                    {item.step}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-bone">{item.title}</p>
                    <p className="mt-1 text-sm text-haze">{item.description}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </motion.div>

          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7, ease: customEase }}
            href="#inquiry"
            className="mt-10 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-bone group"
          >
            <span className="w-8 h-[1px] bg-bone/50 group-hover:bg-chrome1 group-hover:w-12 transition-all" />
            <span className="group-hover:text-chrome1 transition-colors">
              Submit another inquiry
            </span>
            <ArrowRight className="w-4 h-4 text-chrome1 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </Container>
    </section>
  );
}
