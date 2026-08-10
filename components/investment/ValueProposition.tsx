"use client";

import Container from "../layout/Container";
import { motion } from "framer-motion";
import { customEase } from "../home/Hero";
import { investValues } from "@/lib/investment-data";
import { Globe, Lightbulb, Users, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  globe: Globe,
  lightbulb: Lightbulb,
  users: Users,
  rocket: Rocket,
};

export default function ValueProposition() {
  return (
    <section className="bg-void py-20 md:py-28">
      <Container>
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: customEase }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[0.95] tracking-[-0.05em] text-bone mb-14 md:mb-20 font-display"
        >
          OUR <span className="text-gradient-chrome">VALUE</span>{" "}
          PROPOSITION
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {investValues.map((item, index) => {
            const IconComponent = iconMap[item.icon] || Globe;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: index * 0.1, ease: customEase }}
                className="group rounded-[1.5rem] border border-line bg-graphite/50 p-6 md:p-8 transition-all duration-500 hover:border-chrome1/40 hover:bg-graphite"
              >
                <div className="mb-6">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-line flex items-center justify-center text-chrome1">
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>

                <h3 className="text-sm font-bold leading-snug tracking-[-0.02em] text-bone mb-4">
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
