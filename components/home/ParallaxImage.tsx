"use client";

import Image, { type ImageProps } from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type ParallaxImageProps = Omit<ImageProps, "ref"> & {
  wrapperClassName?: string;
  intensity?: number;
};

export default function ParallaxImage({
  wrapperClassName = "",
  intensity = 1,
  className = "",
  ...imageProps
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1.25, 1]
  );

  return (
    <div
      ref={ref}
      className={`absolute inset-0 w-full h-full overflow-hidden ${wrapperClassName}`}
    >
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ scale }}
      >
        <Image
          {...imageProps}
          className={`w-full h-full object-cover ${className}`}
          alt={imageProps.alt || "Image"}
        />
      </motion.div>
    </div>
  );
}
