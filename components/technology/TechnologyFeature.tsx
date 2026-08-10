"use client";

import { motion } from "framer-motion";
import { customEase } from "../home/Hero";

type Props = {
  title: string;
  description: string;
  index?: number;
};

export default function TechnologyFeature({
  title,
  description,
  index = 0,
}: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.8,
        delay: index * 0.08,
        ease: customEase,
      }}
      className="
        border-b
        border-line
        py-12
      "
    >
      <div className="mb-4 h-px w-12 bg-chrome1" />
      <h3
        className="
          text-2xl
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
          max-w-2xl
          text-lg
          leading-relaxed
        "
      >
        {description}
      </p>
    </motion.div>
  );
}
