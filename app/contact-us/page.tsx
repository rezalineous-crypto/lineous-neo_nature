"use client";

import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import { customEase } from "@/components/home/Hero";

export default function ContactUsPage() {
  return (
    <main className="relative min-h-screen">
      {/* Full-screen background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/Purura/NewImages/Overall 1.png"
          alt="Purura Resort Overview"
          className="w-full h-full object-cover"
        />
        {/* Black overlay for readability */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <Container className="relative z-10 flex min-h-screen items-center justify-center py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: customEase }}
          className="max-w-4xl w-full"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white font-mono">
            Contact Us
          </p>

          <h1 className="mt-6 text-[clamp(2rem,4.7vw,3rem)] font-bold leading-none tracking-[-0.06em] text-champagne font-display">
            Get in touch.
          </h1>

          <p className="mt-8 text-md leading-relaxed text-white/80 max-w-xl">
            Have questions about investment, partnerships, or hospitality? Reach out
            and our team will respond within 24 hours.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: customEase }}
          className="mt-16 max-w-2xl w-full"
        >
          <form className="space-y-8 bg-white/5 backdrop-blur-sm border border-champagne rounded-[2rem] p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="contact-first-name" className="text-xs font-semibold uppercase tracking-[0.25em] text-champagne font-mono">
                  First name
                </label>
                <input
                  id="contact-first-name"
                  type="text"
                  className="w-full bg-transparent border-0 border-b border-white/20 px-0 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-white transition-colors"
                  placeholder="First name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-last-name" className="text-xs font-semibold uppercase tracking-[0.25em] text-champagne font-mono">
                  Last name
                </label>
                <input
                  id="contact-last-name"
                  type="text"
                  className="w-full bg-transparent border-0 border-b border-white/20 px-0 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-white transition-colors"
                  placeholder="Last name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-email" className="text-xs font-semibold uppercase tracking-[0.25em] text-champagne font-mono">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                className="w-full bg-transparent border-0 border-b border-white/20 px-0 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-white transition-colors"
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-message" className="text-xs font-semibold uppercase tracking-[0.25em] text-champagne font-mono">
                Message
              </label>
              <textarea
                id="contact-message"
                rows={5}
                className="w-full bg-transparent border-0 border-b border-white/20 px-0 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-white transition-colors resize-none"
                placeholder="Tell us about your interest..."
              />
            </div>

            <button
              type="submit"
              className="w-full px-12 py-5 rounded-full bg-white text-black text-xs font-bold uppercase tracking-[0.28em] transition-colors ease-fluid duration-500 cursor-pointer hover:bg-champagne"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </Container>
    </main>
  );
}
