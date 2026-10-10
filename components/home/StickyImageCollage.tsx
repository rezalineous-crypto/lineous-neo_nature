"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { createPortal } from "react-dom";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react";

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
    className={`pointer-events-none absolute -inset-1 z-20 h-[calc(100%+20px)] w-[calc(100%+20px)] overflow-visible ${className}`}
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
   CLICKABLE IMAGE LAYER
   Preview opens ONLY when clicked.
   ====================================================== */

interface ImageLayerProps {
  image: CollageImage;
  style: {
    y: MotionValue<string | number>;
    x: MotionValue<string | number>;
    scale: MotionValue<number>;
  };
  className: string;
  onClick: (rect: DOMRect) => void;
}

const ImageLayer = ({ image, style, className, onClick }: ImageLayerProps) => (
  <motion.button
    type="button"
    style={style}
    className={`group cursor-pointer appearance-none border-0 bg-transparent p-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#c8a158] focus-visible:ring-offset-4 ${className}`}
    onClick={(event) => onClick(event.currentTarget.getBoundingClientRect())}
    aria-label={`View image: ${image.alt}`}
    whileTap={{ scale: 0.99 }}
    whileHover={{ scale: 1.035 }}
    transition={{ scale: { duration: 0.5, ease: "easeOut" } }}
  >
    <RoundedCornerFrame />

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

      {/* Subtle click affordance */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/25 group-focus-visible:bg-black/25">
        <span className="flex translate-y-2 items-center gap-2 rounded-full border border-white/35 bg-black/45 px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.2em] text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          <Maximize2 size={13} strokeWidth={1.5} />
          View image
        </span>
      </div>
    </div>
  </motion.button>
);

/* ======================================================
   FULL-SCREEN IMAGE LIGHTBOX
   ====================================================== */

interface ImageLightboxProps {
  images: CollageImage[];
  activeIndex: number;
  originRect: DOMRect;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const lightboxEase = [0.22, 1, 0.36, 1] as const;

const ImageLightbox = ({
  images,
  activeIndex,
  originRect,
  onClose,
  onNavigate,
}: ImageLightboxProps) => {
  const activeImage = images[activeIndex];
  const [isClosing, setIsClosing] = useState(false);

  const requestClose = useCallback(() => {
    setIsClosing(true);
  }, []);

  useEffect(() => {
    if (!isClosing) return;

    const timeout = window.setTimeout(onClose, 300);
    return () => window.clearTimeout(timeout);
  }, [isClosing, onClose]);

  const showPrevious = useCallback(() => {
    onNavigate((activeIndex - 1 + images.length) % images.length);
  }, [activeIndex, images.length, onNavigate]);

  const showNext = useCallback(() => {
    onNavigate((activeIndex + 1) % images.length);
  }, [activeIndex, images.length, onNavigate]);

  // Keep keyboard handlers current without repeatedly unlocking/relocking
  // the page whenever the user navigates between images.
  const handlersRef = useRef({ requestClose, showPrevious, showNext });

  // Update ref after render to avoid "Cannot update ref during render" error
  useEffect(() => {
    handlersRef.current = { requestClose, showPrevious, showNext };
  }, [requestClose, showPrevious, showNext]);

  // Scroll lock - set overflow hidden on mount; parent restores on exit complete via AnimatePresence onExitComplete
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") handlersRef.current.requestClose();
      if (event.key === "ArrowLeft" && images.length > 1) {
        handlersRef.current.showPrevious();
      }
      if (event.key === "ArrowRight" && images.length > 1) {
        handlersRef.current.showNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      // NOTE: Do NOT restore overflow here - parent handles it via onExitComplete
      // to avoid layout shift during exit animation
    };
  }, [images.length]);

  if (!activeImage) return null;

  // Target rect for expanded state (92% viewport with 4% margins, 84% height with 8% top/8% bottom)
  const targetRect = {
    left: window.innerWidth * 0.04,
    top: window.innerHeight * 0.08,
    width: window.innerWidth * 0.92,
    height: window.innerHeight * 0.84,
  };

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: lightboxEase }}
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
      onWheel={(event) => event.preventDefault()}
      onTouchMove={(event) => event.preventDefault()}
    >
      {/* Backdrop - simple fade */}
      <motion.button
        type="button"
        onClick={requestClose}
        aria-label="Close image preview"
        className="absolute inset-0 h-full w-full cursor-pointer border-0 bg-black/80 p-0 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: lightboxEase }}
      />

      {/* Close button */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 flex justify-end px-5 py-5 sm:px-8 sm:py-7">
        <motion.button
          type="button"
          onClick={requestClose}
          aria-label="Close preview"
          className="pointer-events-auto flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/[0.08] text-white backdrop-blur-md transition-[background-color,border-color,color,transform] duration-300 ease-out hover:scale-105 hover:border-red-400/70 hover:bg-red-600 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 active:scale-95"
          whileHover={{ scale: 1.07, rotate: 90 }}
          whileTap={{ scale: 0.92 }}
          transition={{ duration: 0.28, ease: lightboxEase }}
        >
          <X size={20} strokeWidth={1.6} />
        </motion.button>
      </div>

      {/* Image - simple fade in/out at target position, no transform animation */}
      <motion.div
        key={activeImage.src}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: lightboxEase }}
        style={{
          left: targetRect.left,
          top: targetRect.top,
          width: targetRect.width,
          height: targetRect.height,
          borderRadius: 12,
        }}
        className="fixed pointer-events-none z-10 overflow-hidden"
      >
        <Image
          src={activeImage.src}
          alt={activeImage.alt}
          fill
          priority
          sizes="100vw"
          className="select-none object-contain"
        />
      </motion.div>

      {/* Navigation controls */}
      {images.length > 1 && (
        <>
          <motion.button
            type="button"
            onClick={showPrevious}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-md transition-colors duration-300 hover:border-[#c8a158]/70 hover:bg-black/65 sm:left-7 sm:h-14 sm:w-14"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.3, delay: 0.1, ease: lightboxEase }}
            whileHover={{ scale: 1.08, x: -2 }}
            whileTap={{ scale: 0.94 }}
          >
            <ArrowLeft size={21} strokeWidth={1.4} />
          </motion.button>

          <motion.button
            type="button"
            onClick={showNext}
            aria-label="Next image"
            className="absolute right-3 top-1/2 z-30 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-black/35 text-white backdrop-blur-md transition-colors duration-300 hover:border-[#c8a158]/70 hover:bg-black/65 sm:right-7 sm:h-14 sm:w-14"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.3, delay: 0.1, ease: lightboxEase }}
            whileHover={{ scale: 1.08, x: 2 }}
            whileTap={{ scale: 0.94 }}
          >
            <ArrowRight size={21} strokeWidth={1.4} />
          </motion.button>

          <motion.div
            className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 rounded-full border border-white/15 bg-black/35 px-4 py-2 text-[10px] tracking-[0.2em] text-white/80 backdrop-blur-md sm:bottom-8"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.3, delay: 0.1, ease: lightboxEase }}
          >
            <span className="text-white">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="mx-2 text-white/35">/</span>
            <span>{String(images.length).padStart(2, "0")}</span>
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

/* ======================================================
   STICKY IMAGE COLLAGE
   ====================================================== */

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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Defer to avoid synchronous setState in effect (ESLint)
    window.setTimeout(() => {
      setIsMounted(true);
    }, 0);
  }, []);

  const targetRef =
    (scrollTarget as RefObject<HTMLDivElement | null> | null) ?? internalRef;

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
     COLLAGE IMAGES
     ====================================================== */

  const [backImage, centerImage, frontImage] = images;

  // Only the three images actually rendered in the collage
  // are included in the lightbox navigation.
  const visibleImages = [backImage, centerImage, frontImage].filter(
    (image): image is CollageImage => Boolean(image)
  );

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

  const openImage = useCallback(
    (image: CollageImage, rect: DOMRect) => {
      const index = visibleImages.findIndex(
        (visibleImage) => visibleImage.src === image.src
      );

      if (index !== -1) {
        setOriginRect(rect);
        setActiveIndex(index);
      }
    },
    [visibleImages]
  );

  const closeLightbox = useCallback(() => {
    setActiveIndex(null);
  }, []);

  return (
    <div ref={internalRef} className={`relative ${containerClassName}`}>
      <div
        className={`relative mx-auto w-full max-w-175 ${height} ${className}`}
      >
        {/* BACK / LARGE ARCHITECTURAL IMAGE */}
        {backImage && (
          <ImageLayer
            image={backImage}
            style={backStyle}
            className="absolute right-0 top-0 h-[61%] w-[67%] overflow-visible"
            onClick={(rect) => openImage(backImage, rect)}
          />
        )}

        {/* CENTER IMAGE */}
        {centerImage && (
          <ImageLayer
            image={centerImage}
            style={centerStyle}
            className="absolute left-[19%] top-[24%] z-20 h-[57%] w-[43%] overflow-visible"
            onClick={(rect) => openImage(centerImage, rect)}
          />
        )}

        {/* FRONT / BOTTOM IMAGE */}
        {frontImage && (
          <ImageLayer
            image={frontImage}
            style={frontStyle}
            className="absolute bottom-[1%] left-0 z-30 h-[29%] w-[40%] overflow-visible"
            onClick={(rect) => openImage(frontImage, rect)}
          />
        )}

        {/* SUBTLE IMAGE SHADOWS */}
        {backImage && (
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-[61%] w-[67%] shadow-[0_30px_70px_rgba(30,30,20,0.08)]" />
        )}

        {centerImage && (
          <div className="pointer-events-none absolute left-[19%] top-[24%] z-10 h-[57%] w-[43%] shadow-[0_30px_60px_rgba(30,30,20,0.12)]" />
        )}

        {frontImage && (
          <div className="pointer-events-none absolute bottom-[1%] left-0 z-40 h-[29%] w-[40%] shadow-[0_25px_50px_rgba(30,30,20,0.14)]" />
        )}
      </div>

      {/* PORTALED LIGHTBOX: keeps fixed positioning independent of parallax transforms */}
      {isMounted &&
        createPortal(
          <AnimatePresence
            onExitComplete={() => {
              // Restore scroll after lightbox exit animation completes
              if (typeof document !== "undefined") {
                document.documentElement.style.overflow = "";
                document.body.style.overflow = "";
              }
            }}
          >
            {activeIndex !== null &&
              visibleImages[activeIndex] &&
              originRect && (
                <ImageLightbox
                  key="sticky-image-lightbox"
                  images={visibleImages}
                  activeIndex={activeIndex}
                  originRect={originRect}
                  onClose={closeLightbox}
                  onNavigate={setActiveIndex}
                />
              )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
