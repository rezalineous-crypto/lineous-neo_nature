"use client";

import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import { customEase } from "@/components/home/Hero";

export default function ContactUsPage() {
  return (
    <main className="relative bg-void py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(142,197,255,0.06),transparent_50%)] pointer-events-none" />
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: customEase }}
          className="max-w-4xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-chrome1 font-mono">
            Contact Us
          </p>

          <h1 className="mt-6 text-5xl md:text-7xl font-bold leading-none tracking-[-0.06em] text-bone font-display">
            Get in touch.
          </h1>

          <p className="mt-8 text-lg leading-relaxed text-haze">
            Have questions about investment, partnerships, or hospitality? Reach out
            and our team will respond within 24 hours.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: customEase }}
          className="mt-16 max-w-2xl"
        >
          <form className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.25em] text-bone/80 font-mono">
                  First name
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-0 border-b border-bone/25 px-0 py-4 text-bone placeholder:text-bone/40 focus:outline-none focus:border-chrome1 transition-colors"
                  placeholder="First name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.25em] text-bone/80 font-mono">
                  Last name
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-0 border-b border-bone/25 px-0 py-4 text-bone placeholder:text-bone/40 focus:outline-none focus:border-chrome1 transition-colors"
                  placeholder="Last name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.25em] text-bone/80 font-mono">
                Email
              </label>
              <input
                type="email"
                className="w-full bg-transparent border-0 border-b border-bone/25 px-0 py-4 text-bone placeholder:text-bone/40 focus:outline-none focus:border-chrome1 transition-colors"
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.25em] text-bone/80 font-mono">
                Message
              </label>
              <textarea
                rows={5}
                className="w-full bg-transparent border-0 border-b border-bone/25 px-0 py-4 text-bone placeholder:text-bone/40 focus:outline-none focus:border-chrome1 transition-colors resize-none"
                placeholder="Tell us about your interest..."
              />
            </div>

            <button
              type="submit"
              className="px-12 py-5 rounded-full bg-chrome2 text-void text-xs font-bold uppercase tracking-[0.28em] hover:bg-chrome1 transition-colors"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </Container>
    </main>
  );
}
