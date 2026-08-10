"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";
import ParallaxImage from "./ParallaxImage";
import Image from "next/image";

const slides = [
  {
    src: "/villa.jpg",
    alt: "Purura Resort Villa",
  },
  {
    src: "/premiumvilla-privatepool.jpg",
    alt: "Purura private pool villa",
  },
  {
    src: "/prv05.jpg",
    alt: "Purura waterfront villa",
  },
];

export const customEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const { scrollY } = useScroll();
  // const heroImageY = useTransform(scrollY, [0, 900], ["0%", "10%"]);
  // const heroImageScale = useTransform(scrollY, [0, 900], [1.06, 1.16]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden ">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/demo.mp4" type="video/mp4" />
      </video>

      <AnimatePresence mode="sync">
        {/* <motion.div
          key={slides[activeSlide].src}
          className="absolute inset-0 h-full w-full"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 1, ease: customEase }}
          // style={{ y: heroImageY, scale: heroImageScale }}
        >
          <ParallaxImage
            src={slides[activeSlide].src}
            alt={slides[activeSlide].alt}
            fill
            intensity={0.5}
            className="object-cover"
          />
        </motion.div> */}
      </AnimatePresence>

      <div className="absolute inset-0 bg-overlay/30 backdrop-blur-xs" />
      {/* <div className="absolute inset-0 bg-linear-to-r from-(--color-void)/55 via-(--color-void)/15 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-transparent" /> */}

      <div className="relative z-10 min-h-screen">
        <div className="container mx-auto grid grid-cols-2 gap-5 h-full min-h-screen items-center px-6 md:px-12 lg:px-20">
          <div className="max-w-7xl pt-24">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: customEase, delay: 0.2 }}
              className="max-w-5xl"
            >
              <p className="mb-6 text-xs font-semibold uppercase tracking-[0.45em] text-bone">
                Luxury Futuristic Resort
              </p>

              <h1 className="max-w-5xl text-[clamp(3.25rem,9vw,7.5rem)] font-bold leading-[0.88] tracking-[-0.07em] text-[var(--color-secondary)] drop-shadow-2xl">
                Purura{" "}
                <span className="text-bone">Resort</span>
              </h1>

              <p className="mt-8 max-w-2xl text-lg md:text-2xl leading-relaxed text-bone/88">
                A premium eco-intelligent destination where regenerative
                landscapes, luxury hospitality, and future-ready technology
                meet.
              </p>

              {/* <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a
                  href="/investment"
                  className="inline-flex items-center justify-center rounded-full bg-[var(--color-bone)] px-8 py-4 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-bone)] transition hover:bg-[var(--color-chrome1)] hover:text-[var(--color-void)]"
                >
                  Investor Preview
                </a>

                <a
                  href="#masterplan"
                  className="inline-flex items-center justify-center rounded-full border border-[var(--color-bone)]/35 px-8 py-4 text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-bone)] backdrop-blur-sm transition hover:border-[var(--color-bone)] hover:bg-[var(--color-void)]/20"
                >
                  Explore Masterplan
                </a>
              </div> */}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: customEase, delay: 0.45 }}
              className="mt-16 flex flex-wrap gap-6 text-xs uppercase tracking-[0.32em] text-bone/70"
            >
              <span>Valuka, Bangladesh</span>
              <span>Regenerative Hospitality</span>
              <span>Smart Resort Infrastructure</span>
            </motion.div>
          </div>
          <div className="relative flex items-center justify-center h-[75vh] pl-10 pt-20">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="h-[80%] object-cover rounded-3xl"
            >
              <source src="/demo.mp4" type="video/mp4" />
            </video>

            {/* <Image
              src={slides[activeSlide].src}
              alt={slides[activeSlide].alt}
              width={700}
              height={600}
              className="h-[80%] object-cover rounded-3xl"
            /> */}
          </div>
        </div>
      </div>
    </section>
  );
}
