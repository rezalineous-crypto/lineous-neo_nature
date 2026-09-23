"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { useRef, useState, type RefObject } from "react";

interface CollageImage {
  src: string;
  alt: string;
  priority?: boolean;
}

interface ParallaxLayerConfig {
  y: [string, string];
  x: [string, string];
  scale: [number, number, number];
}

interface StickyImageCollageProps {
  images: CollageImage[];
  className?: string;
  containerClassName?: string;
  height?: string;
  enableParallax?: boolean;
  parallaxConfig?: {
    back?: Partial<ParallaxLayerConfig>;
    center?: Partial<ParallaxLayerConfig>;
    front?: Partial<ParallaxLayerConfig>;
  };
  scrollTarget?: RefObject<HTMLElement | null>;
}

const ease = [0.16, 1, 0.3, 1] as const;

/* ======================================================
   ROUNDED OUTER CORNER FRAME
   ====================================================== */
const RoundedCornerFrame = ({ className = "" }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 106 106"
    preserveAspectRatio="none"
    className={`pointer-events-none absolute -inset-1 z-20 h-[calc(100%+30px)] w-[calc(100%+30px)] overflow-visible ${className}`}
    fill="none"
  >
    <path
      d="M 4 34 V 9 Q 4 4 9 4 H 34"
      stroke="#c8a158"
      strokeWidth="1.15"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <path
      d="M 72 102 H 97 Q 102 102 102 97 V 72"
      stroke="#c8a158"
      strokeWidth="1.15"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ======================================================
   IMAGE LAYER COMPONENT
   ====================================================== */
interface ImageLayerProps {
  image: CollageImage;
  style: object;
  className: string;
  frameClassName?: string;
  zIndex: number;
  onHover: () => void;
  onLeave: () => void;
}

const ImageLayer = ({
  image,
  style,
  className,
  frameClassName,
  zIndex,
  onHover,
  onLeave,
}: ImageLayerProps) => (
  <motion.div
    style={style}
    className={className}
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
  >
    <RoundedCornerFrame className={frameClassName} />

    <div className="absolute inset-0 z-10 overflow-hidden rounded-2xl">
      <motion.div
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.15, ease }}
        className="absolute inset-0"
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={image.priority ?? false}
          sizes="(max-width: 768px) 70vw, 45vw"
          className="object-cover"
        />
      </motion.div>
    </div>
  </motion.div>
);

export default function StickyImageCollage({
  images,
  className = "",
  containerClassName = "",
  height = "h-125 sm:h-145 md:h-162.5 lg:h-172.5",
  enableParallax = true,
  parallaxConfig,
  scrollTarget,
}: StickyImageCollageProps) {
  const internalRef = useRef<HTMLDivElement>(null);

  const [hoveredImage, setHoveredImage] = useState<CollageImage | null>(null);

  const targetRef =
    (scrollTarget as RefObject<HTMLDivElement> | null) ?? internalRef;

  const defaultParallaxConfig: Record<
    "back" | "center" | "front",
    ParallaxLayerConfig
  > = {
    back: {
      y: ["-12%", "16%"],
      x: ["2%", "-2%"],
      scale: [1.08, 1, 1.08],
    },
    center: {
      y: ["10%", "-13%"],
      x: ["-2%", "3%"],
      scale: [1.12, 1, 1.1],
    },
    front: {
      y: ["-17%", "18%"],
      x: ["3%", "-4%"],
      scale: [1.1, 1, 1.08],
    },
  };

  const config: Record<"back" | "center" | "front", ParallaxLayerConfig> = {
    back: {
      ...defaultParallaxConfig.back,
      ...parallaxConfig?.back,
    },
    center: {
      ...defaultParallaxConfig.center,
      ...parallaxConfig?.center,
    },
    front: {
      ...defaultParallaxConfig.front,
      ...parallaxConfig?.front,
    },
  };

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  /* ======================================================
     PARALLAX
     ====================================================== */

  const backY = useTransform(
    scrollYProgress,
    [0, 1],
    enableParallax ? config.back.y : ["0%", "0%"]
  );

  const backX = useTransform(
    scrollYProgress,
    [0, 1],
    enableParallax ? config.back.x : ["0%", "0%"]
  );

  const backScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    enableParallax ? config.back.scale : [1, 1, 1]
  );

  const centerY = useTransform(
    scrollYProgress,
    [0, 1],
    enableParallax ? config.center.y : ["0%", "0%"]
  );

  const centerX = useTransform(
    scrollYProgress,
    [0, 1],
    enableParallax ? config.center.x : ["0%", "0%"]
  );

  const centerScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    enableParallax ? config.center.scale : [1, 1, 1]
  );

  const frontY = useTransform(
    scrollYProgress,
    [0, 1],
    enableParallax ? config.front.y : ["0%", "0%"]
  );

  const frontX = useTransform(
    scrollYProgress,
    [0, 1],
    enableParallax ? config.front.x : ["0%", "0%"]
  );

  const frontScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    enableParallax ? config.front.scale : [1, 1, 1]
  );

  /* ======================================================
     IMAGES
     ====================================================== */

  const [backImage, centerImage, frontImage] = images;

  const backStyle = {
    y: backY as MotionValue<string | number>,
    x: backX as MotionValue<string | number>,
    scale: backScale as MotionValue<number>,
  };

  const centerStyle = {
    y: centerY as MotionValue<string | number>,
    x: centerX as MotionValue<string | number>,
    scale: centerScale as MotionValue<number>,
  };

  const frontStyle = {
    y: frontY as MotionValue<string | number>,
    x: frontX as MotionValue<string | number>,
    scale: frontScale as MotionValue<number>,
  };

  return (
    <div ref={internalRef} className={`relative ${containerClassName}`}>
      <div
        className={`relative mx-auto w-full max-w-175 ${height} ${className}`}
      >
        {/* ======================================================
           BACK / LARGE ARCHITECTURAL IMAGE
           ====================================================== */}
        {backImage && (
          <ImageLayer
            image={backImage}
            style={backStyle}
            className="absolute right-0 top-0 h-[61%] w-[67%] overflow-visible"
            zIndex={10}
            onHover={() => setHoveredImage(backImage)}
            onLeave={() => setHoveredImage(null)}
          />
        )}

        {/* ======================================================
           CENTER IMAGE
           ====================================================== */}
        {centerImage && (
          <ImageLayer
            image={centerImage}
            style={centerStyle}
            className="absolute left-[19%] top-[24%] z-20 h-[57%] w-[43%] overflow-visible"
            zIndex={20}
            onHover={() => setHoveredImage(centerImage)}
            onLeave={() => setHoveredImage(null)}
          />
        )}

        {/* ======================================================
           FRONT / BOTTOM IMAGE
           ====================================================== */}
        {frontImage && (
          <ImageLayer
            image={frontImage}
            style={frontStyle}
            className="absolute bottom-[1%] left-0 z-30 h-[29%] w-[40%] overflow-visible"
            zIndex={30}
            onHover={() => setHoveredImage(frontImage)}
            onLeave={() => setHoveredImage(null)}
          />
        )}

        {/* ======================================================
           SUBTLE IMAGE SHADOWS
           ====================================================== */}
        {backImage && (
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-[61%] w-[67%] shadow-[0_30px_70px_rgba(30,30,20,0.08)]" />
        )}

        {centerImage && (
          <div className="pointer-events-none absolute left-[19%] top-[24%] z-10 h-[57%] w-[43%] shadow-[0_30px_60px_rgba(30,30,20,0.12)]" />
        )}

        {frontImage && (
          <div className="pointer-events-none absolute bottom-[1%] left-0 z-40 h-[29%] w-[40%] shadow-[0_25px_50px_rgba(30,30,20,0.14)]" />
        )}

        {/* ======================================================
           HOVER IMAGE PREVIEW
           
           One standardized frame for every image.
           Object-contain ensures the ENTIRE source image
           is visible regardless of its original aspect ratio.
           ====================================================== */}
        {hoveredImage && (
          <>
            {/* ======================================================
       FULL PAGE DIM / FOCUS OVERLAY
       ====================================================== */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease }}
              className="pointer-events-none fixed inset-0 z-[80] bg-black/20"
            />

            {/* ======================================================
       HOVER IMAGE PREVIEW
       ====================================================== */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.94,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.94,
              }}
              transition={{
                duration: 0.35,
                ease,
              }}
              className="pointer-events-none absolute left-1/2 top-1/2 z-[100] h-[70%] w-[94%] -translate-x-1/2 -translate-y-1/2"
            >
              {/* Soft backdrop */}
              <div className="absolute -inset-5 rounded-[1.75rem] bg-black/50 shadow-[0_30px_100px_rgba(20,20,10,0.22)] backdrop-blur-[3px]" />

              {/* Gold corner frame */}
              {/* <RoundedCornerFrame /> */}

              {/* Image container */}
              <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-[0_20px_60px_rgba(20,20,10,0.16)]">
                <div className="relative h-full w-full overflow-hidden rounded-xl">
                  <Image
                    src={hoveredImage.src}
                    alt={hoveredImage.alt}
                    fill
                    sizes="(max-width: 768px) 90vw, 65vw"
                    className="object-contain"
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
