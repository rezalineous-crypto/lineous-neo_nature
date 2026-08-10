"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { customEase } from "./Hero";

type RevealSectionProps = HTMLMotionProps<"div"> & {
  delay?: number;
};

export default function RevealSection({
  children,
  delay = 0,
  className = "",
  ...props
}: RevealSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 56, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: 0.9, delay, ease: customEase }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
