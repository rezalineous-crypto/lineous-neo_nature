"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Container from "../layout/Container";
import MetricCard from "./MetricCard";
import { investmentMetrics } from "@/lib/investment-data";
import { customEase } from "../home/Hero";
import ParallaxImage from "../home/ParallaxImage";

export default function InvestmentStrategy() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitted">("idle");

  return (
    <section
      id="investment"
      className="relative bg-void py-24 md:py-32 min-h-screen"
    >
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <ParallaxImage
          src="/purura_resort_images/purura_render_20.jpg"
          alt="Purura investment"
          fill
          intensity={0.3}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-overlay/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-overlay/60 via-transparent to-overlay/90" />
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-[1.25fr_0.75fr] gap-12 lg:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: customEase }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-chrome1 font-mono">
              Investment
            </p>

            <h2 className="mt-6 text-5xl md:text-7xl font-bold leading-none tracking-[-0.06em] text-bone font-display">
              A landmark hospitality investment.
            </h2>

            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-haze">
              Purura is positioned as a premium, future-ready resort
              opportunity for investors seeking exposure to luxury hospitality,
              experiential tourism, private villa demand, wellness, and
              intelligent infrastructure.
            </p>

            <div className="mt-12 grid sm:grid-cols-2 gap-4">
              <div className="rounded-[2rem] border border-line bg-graphite/50 p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-chrome1 font-mono">
                  Added Value
                </p>
                <p className="mt-4 text-lg font-bold leading-snug tracking-[-0.03em] text-bone">
                  Diversified revenue streams across villas, hospitality,
                  wellness, events, dining, and experience-led programming.
                </p>
              </div>

              <div className="rounded-[2rem] border border-line bg-graphite/50 p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-chrome1 font-mono">
                  Location Advantage
                </p>
                <p className="mt-4 text-lg font-bold leading-snug tracking-[-0.03em] text-bone">
                  Valuka offers proximity to Dhaka demand while delivering a
                  rare nature-led resort environment with long-term land value
                  potential.
                </p>
              </div>
            </div>

            <div className="mt-10 rounded-[2rem] border border-line bg-graphite/50 p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-chrome1 font-mono">
                Initial Resort Reference
              </p>
              <p className="mt-4 text-lg leading-relaxed text-haze">
                Chuti Resort investment information can be introduced initially
                as a comparable benchmark for valuation and performance metrics.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.1, ease: customEase }}
            className="rounded-[2rem] border border-line bg-graphite/50 p-6 md:p-8 shadow-[0_24px_80px_rgba(0,0,0,0.3)]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-chrome1 font-mono">
              Investor Form
            </p>

            {formStatus === "submitted" ? (
              <div className="mt-8 rounded-2xl bg-graphite p-6 text-bone">
                Thank you. Your investor inquiry has been received.
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setFormStatus("submitted");
                }}
                className="mt-8 space-y-6"
              >
                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.25em] text-haze font-mono">
                    Name
                  </label>
                  <input
                    required
                    className="mt-2 w-full rounded-2xl border border-line bg-void px-5 py-4 text-bone outline-none focus:border-chrome1 transition-colors"
                    placeholder="Investor name"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.25em] text-haze font-mono">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    className="mt-2 w-full rounded-2xl border border-line bg-void px-5 py-4 text-bone outline-none focus:border-chrome1 transition-colors"
                    placeholder="investor@email.com"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-[0.25em] text-haze font-mono">
                    Investment Interest
                  </label>
                  <select
                    required
                    className="mt-2 w-full rounded-2xl border border-line bg-void px-5 py-4 text-bone outline-none focus:border-chrome1 transition-colors"
                  >
                    <option value="">Select interest</option>
                    <option value="villas">Private Villas</option>
                    <option value="hospitality">Hospitality</option>
                    <option value="wellness">Wellness</option>
                    <option value="experiences">Experiences</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-chrome2 px-8 py-4 text-xs font-semibold uppercase tracking-[0.28em] text-void transition hover:bg-chrome1"
                >
                  Submit Inquiry
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
