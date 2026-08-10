"use client";

import { motion } from "framer-motion";
import { customEase } from "../home/Hero";

type MetricCardProps = {
  value: string;
  suffix?: string;
  label: string;
  description: string;
  index?: number;
};

export default function MetricCard({
  value,
  suffix,
  label,
  description,
  index = 0,
}: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: customEase }}
      className="
        rounded-[2rem]
        border border-line
        bg-graphite/50
        p-8
        transition-all duration-500
        hover:border-chrome1/40
      "
    >
      <div className="flex items-end gap-2">
        <span className="text-5xl md:text-6xl font-bold leading-none tracking-[-0.05em] text-bone">
          {value}
        </span>

        {suffix && (
          <span className="text-xl text-chrome1 mb-3 font-mono">
            {suffix}
          </span>
        )}
      </div>

      <h3 className="mt-6 text-xl font-bold tracking-[-0.02em] text-bone">
        {label}
      </h3>

      <p className="mt-4 text-haze leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
