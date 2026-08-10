"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { customEase } from "../home/Hero";

type Props = {
  title: string;
  description: string;
  onEnter: () => void;
};

export default function MasterplanCard({ title, description, onEnter }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: 0.3,
    margin: "-20% 0px -20% 0px",
  });
  const wasInView = useRef(false);

  useEffect(() => {
    if (isInView && !wasInView.current) {
      onEnter();
    }
    wasInView.current = isInView;
  }, [isInView, onEnter]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.75, ease: customEase }}
      className="lg:min-h-155 flex items-center border-b border-line py-10"
    >
      <div className="max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-chrome1 font-mono">
          Masterplan Zone
        </p>
        <h3 className="mt-4 text-4xl md:text-5xl font-bold leading-none tracking-tighter text-bone font-display">
          {title}
        </h3>

        <p className="mt-6 text-lg leading-relaxed text-haze">{description}</p>
      </div>
    </motion.div>
  );
}
