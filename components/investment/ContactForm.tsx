"use client";

import Container from "../layout/Container";
import { motion } from "framer-motion";
import { customEase } from "../home/Hero";

export default function ContactForm() {
  return (
    <section className="relative bg-void py-20 md:py-28">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, rgba(142,197,255,0.15), transparent 40%), radial-gradient(circle at 70% 80%, rgba(201,169,255,0.1), transparent 40%)",
          }}
        />
      </div>

      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: customEase }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[0.95] tracking-[-0.05em] text-bone mb-8 font-display"
        >
          We just need{" "}
          <span className="text-gradient-chrome">your contact</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: customEase }}
          className="text-lg md:text-xl text-haze mb-14 max-w-2xl"
        >
          Fill out the form below and our team will reach out within 24 hours.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: customEase }}
          className="max-w-2xl"
        >
          <form className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="contact-first-name" className="text-xs font-semibold uppercase tracking-[0.25em] text-bone/80 font-mono">
                  First name
                </label>
                <input
                  id="contact-first-name"
                  type="text"
                  className="w-full bg-transparent border-0 border-b border-bone/25 px-0 py-4 text-bone placeholder:text-bone/40 focus:outline-none focus:border-chrome1 transition-colors"
                  placeholder="First name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="contact-last-name" className="text-xs font-semibold uppercase tracking-[0.25em] text-bone/80 font-mono">
                  Last name
                </label>
                <input
                  id="contact-last-name"
                  type="text"
                  className="w-full bg-transparent border-0 border-b border-bone/25 px-0 py-4 text-bone placeholder:text-bone/40 focus:outline-none focus:border-chrome1 transition-colors"
                  placeholder="Last name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-email" className="text-xs font-semibold uppercase tracking-[0.25em] text-bone/80 font-mono">
                Business Email address
              </label>
              <input
                id="contact-email"
                type="email"
                className="w-full bg-transparent border-0 border-b border-bone/25 px-0 py-4 text-bone placeholder:text-bone/40 focus:outline-none focus:border-chrome1 transition-colors"
                placeholder="Business Email address"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-phone" className="text-xs font-semibold uppercase tracking-[0.25em] text-bone/80 font-mono">
                Phone number
              </label>
              <div className="flex gap-3">
                <select id="contact-phone-prefix" className="w-28 bg-transparent border-0 border-b border-bone/25 px-2 py-4 text-bone focus:outline-none focus:border-chrome1 transition-colors cursor-pointer">
                  <option value="+880">+880</option>
                </select>
                <input
                  id="contact-phone"
                  type="tel"
                  className="flex-1 bg-transparent border-0 border-b border-bone/25 px-0 py-4 text-bone placeholder:text-bone/40 focus:outline-none focus:border-chrome1 transition-colors"
                  placeholder="Phone number"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-company" className="text-xs font-semibold uppercase tracking-[0.25em] text-bone/80 font-mono">
                Company name
              </label>
              <input
                id="contact-company"
                type="text"
                className="w-full bg-transparent border-0 border-b border-bone/25 px-0 py-4 text-bone placeholder:text-bone/40 focus:outline-none focus:border-chrome1 transition-colors"
                placeholder="Company name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-website" className="text-xs font-semibold uppercase tracking-[0.25em] text-bone/80 font-mono">
                Company website
              </label>
              <input
                id="contact-website"
                type="url"
                className="w-full bg-transparent border-0 border-b border-bone/25 px-0 py-4 text-bone placeholder:text-bone/40 focus:outline-none focus:border-chrome1 transition-colors"
                placeholder="Company website"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="contact-interest" className="text-xs font-semibold uppercase tracking-[0.25em] text-bone/80 font-mono">
                Investment Interest
              </label>
              <select id="contact-interest" className="w-full bg-transparent border-0 border-b border-bone/25 px-0 py-4 text-bone focus:outline-none focus:border-chrome1 transition-colors cursor-pointer">
                <option value="">Select interest</option>
                <option value="villas">Private Villas</option>
                <option value="hospitality">Hospitality</option>
                <option value="wellness">Wellness</option>
                <option value="experiences">Experiences</option>
              </select>
            </div>

            <div className="flex items-start gap-3">
              <input
                id="contact-agree"
                type="checkbox"
                className="mt-1 w-4 h-4 rounded-sm border border-bone/40 bg-transparent checked:bg-chrome1 checked:border-chrome1 accent-chrome1"
              />
              <label htmlFor="contact-agree" className="text-xs leading-relaxed text-bone/70 cursor-pointer">
                By completing this form you are agreeing to being contacted
                by our team.
              </label>
            </div>

            <button
              type="submit"
              className="px-12 py-5 rounded-full bg-chrome2 text-void text-xs font-bold uppercase tracking-[0.28em] hover:bg-chrome1 transition-colors"
            >
              Submit Inquiry
            </button>
          </form>
        </motion.div>
      </Container>
    </section>
  );
}
