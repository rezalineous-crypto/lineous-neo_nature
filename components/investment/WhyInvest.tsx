"use client";

import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import { customEase } from "@/components/home/Hero";
import {
  Mountain,
  Shield,
  TrendingUp,
  Leaf,
  Users,
  Sparkles,
} from "lucide-react";

const whyInvestItems = [
  {
    icon: Mountain,
    title: "Prime Location",
    description:
      "Valuka, Bangladesh offers proximity to Dhaka demand with a rare nature-led resort environment and long-term land value potential.",
  },
  {
    icon: Shield,
    title: "Regulatory Excellence",
    description:
      "Built from the ground up, free from legacy infrastructure and regulatory inefficiencies. Global best practice standards.",
  },
  {
    icon: TrendingUp,
    title: "Strong Returns",
    description:
      "Diversified revenue streams across villas, hospitality, wellness, events, dining, and experience-led programming.",
  },
  {
    icon: Leaf,
    title: "Regenerative Design",
    description:
      "A nature-first destination where sustainability and luxury converge. Eco-intelligent infrastructure built for the future.",
  },
  {
    icon: Users,
    title: "Global Community",
    description:
      "Home to thousands of dreamers and doers from over 100 countries. A growing community for innovators and investors.",
  },
  {
    icon: Sparkles,
    title: "Future-Ready",
    description:
      "15 sectors powering the destination, from energy and water to technology and digital. Positioned for long-term growth.",
  },
];

export default function WhyInvest() {
  return (
    <section id="why-invest" className="relative bg-void py-20 md:py-28">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(circle at 70% 30%, rgba(142,197,255,0.08), transparent 45%), radial-gradient(circle at 30% 70%, rgba(201,169,255,0.06), transparent 45%)",
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
            Why Invest
          </p>

          <h2 className="mt-6 text-3xl md:text-5xl lg:text-6xl font-bold leading-[0.95] tracking-[-0.05em] text-bone font-display">
            Built for
            <span className="text-gradient-chrome"> lasting value</span>
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-haze">
            Neo Nature offers a rare combination of strategic location,
            regulatory clarity, and diversified revenue streams designed for
            long-term investor returns.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyInvestItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.75,
                  delay: index * 0.08,
                  ease: customEase,
                }}
                className="group rounded-[1.5rem] border border-line bg-graphite/50 p-6 md:p-8 transition-all duration-500 hover:border-chrome1/40 hover:bg-graphite"
              >
                <div className="mb-6">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-line flex items-center justify-center text-chrome1 group-hover:border-chrome1/40 transition-colors">
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>

                <h3 className="text-sm font-bold leading-snug tracking-[-0.02em] text-bone mb-3">
                  {item.title}
                </h3>

                <p className="text-sm leading-relaxed text-haze">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
