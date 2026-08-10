"use client";

import { motion } from "framer-motion";
import { customEase } from "../home/Hero";

type SustainabilityItemProps = {
  title: string;
  description: string;
  index?: number;
};

export default function SustainabilityItem({
  title,
  description,
  index = 0,
}: SustainabilityItemProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: customEase,
      }}
      className="
        border-b
        border-line
        py-10
      "
    >
      <div className="mb-4 h-px w-12 bg-chrome1" />
      <h3
        className="
          text-xl
          md:text-3xl
          font-bold
          mb-4
          tracking-[-0.03em]
          text-bone
          font-display
        "
      >
        {title}
      </h3>

      <p
        className="
          text-haze
          lg:text-lg
          leading-relaxed
          max-w-2xl
        "
      >
        {description}
      </p>
    </motion.div>
  );
}
