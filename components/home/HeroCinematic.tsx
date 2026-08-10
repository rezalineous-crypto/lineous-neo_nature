"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const words = ["Regenerative", "Intelligent", "Hospitality"];

export default function HeroCinematic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Stabilized cinema camera — imperceptible floating movement
  const driftX = useMotionValue(0);
  const driftY = useMotionValue(0);
  const driftScale = useMotionValue(1);

  useAnimationFrame((t) => {
    const seconds = t / 1000;
    driftX.set(Math.sin(seconds * 0.18) * 0.01);
    driftY.set(Math.cos(seconds * 0.22) * 0.012);
    driftScale.set(1 + Math.sin(seconds * 0.2) * 0.01);
  });

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-[100svh] w-full overflow-hidden"
    >
      {/* Background — stabilized cinema camera drift */}
      <motion.div
        style={{ x: driftX, y: driftY, scale: driftScale }}
        className="absolute inset-0 will-change-transform"
      >
        <Image
          src="/purura_resort_images/purura_render_01.jpg"
          alt="Purura resort — architectural luxury"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {/* Atmospheric overlay system — layered depth */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,transparent_0%,rgba(44,40,35,0.25)_50%,rgba(44,40,35,0.55)_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-charcoal-warm/80 via-charcoal-warm/40 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-charcoal-warm/25 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(194,178,128,0.06),transparent_50%)]"
        aria-hidden="true"
      />

      {/* Content — editorial composition, magazine-cover layout */}
      {/* No centered flex container. Elements positioned with intention. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 h-full w-full"
      >
        {/* Eyebrow — top left, small, refined */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={
            mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
          }
          transition={{
            duration: 1.6,
            delay: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute top-12 left-8 md:top-16 md:left-16 lg:top-20 lg:left-24 font-mono text-[11px] uppercase tracking-[0.45em] text-sand/75"
        >
          Valuka, Bangladesh
        </motion.p>

        {/* Headline — lower left, magazine scale, editorial serif */}
        {/* Asymmetrical: positioned with generous bottom padding, not centered */}
        <div className="absolute bottom-24 left-8 md:bottom-28 md:left-16 lg:bottom-36 lg:left-24 max-w-4xl">
          <h1 className="font-serif text-[clamp(3.5rem,9vw,8.5rem)] font-medium leading-[1.05] tracking-[-0.02em] text-ivory">
            {words.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 60 }}
                animate={
                  mounted
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 60 }
                }
                transition={{
                  duration: 1.8,
                  delay: 1.0 + i * 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="block"
                style={{
                  // Varying line lengths create visual rhythm
                  // Not all words get the same treatment
                  ...(i === 0 && {
                    fontSize: "clamp(3.5rem, 9vw, 8.5rem)",
                  }),
                  ...(i === 1 && {
                    fontSize: "clamp(2.8rem, 7vw, 6.5rem)",
                    marginLeft: "clamp(2rem, 8vw, 10rem)",
                  }),
                  ...(i === 2 && {
                    fontSize: "clamp(3rem, 8vw, 7.5rem)",
                    marginLeft: "clamp(1rem, 4vw, 6rem)",
                  }),
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Paragraph — minimal, positioned with breathing room */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={
              mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{
              duration: 1.6,
              delay: 1.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="font-display text-base md:text-lg leading-relaxed text-ivory/60 max-w-xl mt-8"
          >
            A premium eco-intelligent destination where regenerative landscapes,
            luxury hospitality, and future-ready technology converge.
          </motion.p>

          {/* Buttons — soft rounded, refined, secondary to imagery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={
              mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{
              duration: 1.6,
              delay: 2.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex flex-wrap gap-5 mt-10"
          >
            <Link
              href="/investment"
              className="group inline-flex items-center rounded-2xl bg-ivory px-10 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-charcoal-warm transition-all duration-300 hover:bg-cream"
            >
              Investment Opportunities
            </Link>
            <Link
              href="/masterplan"
              className="group inline-flex items-center rounded-2xl border border-ivory/20 px-10 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-ivory transition-all duration-300 hover:border-ivory/40 hover:bg-ivory/5"
            >
              Explore Masterplan
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator — understated, bottom center */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.4, delay: 2.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center gap-3"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-ivory/35">
            Scroll
          </span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className="text-ivory/35"
          >
            <path
              d="M6 2v8M2 7l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
