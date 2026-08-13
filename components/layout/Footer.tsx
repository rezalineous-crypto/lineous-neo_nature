"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

const architecturalEase = [0.22, 1, 0.36, 1] as const;

export default function Footer() {
  return (
    <footer className="relative isolate min-h-screen overflow-hidden bg-ivory text-bone">
      {/* =====================================================
          ATMOSPHERIC BACKGROUND
          ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Soft central atmosphere */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: architecturalEase }}
          className="absolute left-1/2 top-[42%] h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(196,175,130,0.075)_0%,rgba(112,139,142,0.035)_35%,transparent_68%)] blur-[2px]"
        />

        {/* Upper architectural glow */}
        <div className="absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(255,255,255,0.035),transparent_68%)]" />

        {/* Bottom atmospheric depth */}
        <div className="absolute bottom-[-25%] left-1/2 h-[700px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(72,101,105,0.08),transparent_65%)] blur-3xl" />
      </div>

      {/* =====================================================
          ARCHITECTURAL CONSTRUCTION GRID
          ===================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.075]">
        {/* Vertical construction lines */}
        <div className="absolute left-[8%] top-0 h-full w-px bg-[var(--color-line)]" />
        <div className="absolute left-[22%] top-0 h-full w-px bg-[var(--color-line)]" />
        <div className="absolute left-1/2 top-0 h-full w-px bg-[var(--color-line)]" />
        <div className="absolute right-[22%] top-0 h-full w-px bg-[var(--color-line)]" />
        <div className="absolute right-[8%] top-0 h-full w-px bg-[var(--color-line)]" />

        {/* Horizontal construction lines */}
        <div className="absolute left-0 top-[18%] h-px w-full bg-[var(--color-line)]" />
        <div className="absolute left-0 top-[50%] h-px w-full bg-[var(--color-line)]" />
        <div className="absolute left-0 top-[78%] h-px w-full bg-[var(--color-line)]" />

        {/* Fine horizontal measurements */}
        <div className="absolute left-0 top-[26%] h-px w-full bg-[var(--color-line)] opacity-40" />
        <div className="absolute left-0 top-[68%] h-px w-full bg-[var(--color-line)] opacity-40" />
      </div>

      {/* =====================================================
          LARGE ARCHITECTURAL CIRCLES
          ===================================================== */}

      <motion.div
        initial={{ opacity: 0, scale: 0.92, rotate: -8 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 2.2, ease: architecturalEase }}
        className="pointer-events-none absolute left-1/2 top-[46%] h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2"
      >
        {/* Outer construction ring */}
        <div className="absolute inset-0 rounded-full border border-[var(--color-line)] opacity-30" />

        {/* Inner construction ring */}
        <div className="absolute inset-[90px] rounded-full border border-[var(--color-line)] opacity-20" />

        {/* Smaller ring */}
        <div className="absolute inset-[190px] rounded-full border border-[var(--color-line)] opacity-20" />

        {/* Offset arc */}
        <div className="absolute inset-[-70px] rounded-full border border-chrome1/20 [clip-path:inset(0_0_48%_48%)]" />

        {/* Opposite arc */}
        <div className="absolute inset-[55px] rounded-full border border-chrome1/15 [clip-path:inset(48%_48%_0_0)]" />
      </motion.div>

      {/* =====================================================
          ABSTRACT ARCHITECTURAL MASS
          ===================================================== */}

      <motion.div
        initial={{ opacity: 0, x: 80, rotate: 8 }}
        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, delay: 0.15, ease: architecturalEase }}
        className="pointer-events-none absolute -right-[180px] top-[12%] h-[560px] w-[560px] opacity-[0.12]"
      >
        <div className="absolute inset-0 rotate-45 border border-chrome1/40" />
        <div className="absolute inset-[55px] rotate-45 border border-[var(--color-line)]" />
        <div className="absolute inset-[115px] rotate-45 border border-[var(--color-line)] opacity-70" />

        <div className="absolute left-1/2 top-[-80px] h-[720px] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-chrome1/50 to-transparent" />

        <div className="absolute left-[-80px] top-1/2 h-px w-[720px] -translate-y-1/2 bg-gradient-to-r from-transparent via-chrome1/50 to-transparent" />
      </motion.div>

      {/* =====================================================
          LEFT ARCHITECTURAL FORM
          ===================================================== */}

      <motion.div
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, delay: 0.2, ease: architecturalEase }}
        className="pointer-events-none absolute -left-[230px] bottom-[4%] h-[520px] w-[520px] opacity-[0.09]"
      >
        <div className="absolute inset-0 rounded-full border border-[var(--color-line)]" />
        <div className="absolute inset-[75px] rounded-full border border-chrome1/50" />
        <div className="absolute inset-[150px] rounded-full border border-[var(--color-line)]" />

        <div className="absolute left-1/2 top-0 h-full w-px bg-[var(--color-line)]" />
        <div className="absolute left-0 top-1/2 h-px w-full bg-[var(--color-line)]" />
      </motion.div>

      {/* =====================================================
          ARCHITECTURAL PERSPECTIVE LINES
          ===================================================== */}

      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[420px] w-[1200px] -translate-x-1/2 opacity-[0.055]">
        {/* Perspective vanishing point */}
        <div className="absolute bottom-0 left-1/2 h-px w-full -translate-x-1/2 bg-[var(--color-line)]" />

        <div className="absolute bottom-0 left-1/2 h-[420px] w-px origin-bottom -rotate-[54deg] bg-[var(--color-line)]" />
        <div className="absolute bottom-0 left-1/2 h-[420px] w-px origin-bottom -rotate-[36deg] bg-[var(--color-line)]" />
        <div className="absolute bottom-0 left-1/2 h-[420px] w-px origin-bottom -rotate-[18deg] bg-[var(--color-line)]" />
        <div className="absolute bottom-0 left-1/2 h-[420px] w-px origin-bottom rotate-[18deg] bg-[var(--color-line)]" />
        <div className="absolute bottom-0 left-1/2 h-[420px] w-px origin-bottom rotate-[36deg] bg-[var(--color-line)]" />
        <div className="absolute bottom-0 left-1/2 h-[420px] w-px origin-bottom rotate-[54deg] bg-[var(--color-line)]" />

        <div className="absolute bottom-[80px] left-0 h-px w-full bg-[var(--color-line)]" />
        <div className="absolute bottom-[160px] left-[8%] h-px w-[84%] bg-[var(--color-line)]" />
        <div className="absolute bottom-[250px] left-[20%] h-px w-[60%] bg-[var(--color-line)]" />
        <div className="absolute bottom-[340px] left-[34%] h-px w-[32%] bg-[var(--color-line)]" />
      </div>

      {/* =====================================================
          GHOSTED PURURA MARK
          ===================================================== */}

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, delay: 0.25, ease: architecturalEase }}
        className="pointer-events-none absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 select-none"
      >
        <span className="font-display text-[38vw] font-light leading-none tracking-[-0.12em] text-white/[0.018]">
          P
        </span>
      </motion.div>

      {/* =====================================================
          TOP EDGE
          ===================================================== */}

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-chrome1/45 to-transparent" />

      {/* =====================================================
          MAIN CONTENT
          ===================================================== */}

      <div className="relative z-10 flex min-h-screen flex-col justify-between px-6 py-10 md:px-10 md:py-12 lg:px-16 lg:py-14">
        {/* ===================================================
            TOP INFORMATION BAR
            =================================================== */}

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: customEase }}
          className="flex items-start justify-between"
        >
          {/* Brand */}
          <div className="flex items-center gap-4">
            <span className="h-px w-8 bg-chrome1/60" />

            <span className="font-sans text-[9px] font-medium uppercase tracking-[0.32em] text-haze">
              PURURA
            </span>
          </div>

          {/* Architectural metadata */}
          <div className="hidden items-center gap-8 md:flex">
            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-haze/60">
              PRIVATE DEVELOPMENT
            </span>

            <span className="h-3 w-px bg-line/40" />

            <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-haze/60">
              23°48′N / 90°25′E
            </span>
          </div>

          {/* Index */}
          <span className="font-mono text-[9px] tracking-[0.25em] text-haze/60">
            01 / 01
          </span>
        </motion.div>

        {/* ===================================================
            CENTER
            =================================================== */}

        <div className="flex flex-1 flex-col items-center justify-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.3,
              delay: 0.15,
              ease: customEase,
            }}
            className="mb-12 flex flex-col items-center"
          >
            <div className="w-32 md:w-36">
              <img
                src="/purura-logo.png"
                alt="PURURA"
                className="h-auto w-full object-contain"
              />
            </div>

            <div className="mt-5 flex items-center gap-3">
              <span className="h-px w-8 bg-chrome1/40" />

              <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-haze/60">
                A VISION OF PLACE
              </span>

              <span className="h-px w-8 bg-chrome1/40" />
            </div>
          </motion.div>

          {/* Headline */}
          <div className="max-w-6xl text-center">
            <motion.h2
              initial={{
                opacity: 0,
                y: 70,
                filter: "blur(18px)",
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              viewport={{ once: true }}
              transition={{
                duration: 1.5,
                delay: 0.25,
                ease: customEase,
              }}
              className="font-display text-[16vw] font-light leading-[0.8] tracking-[-0.07em] text-bone sm:text-7xl md:text-8xl lg:text-[9.5rem]"
            >
              BEGIN
            </motion.h2>

            <motion.div
              initial={{
                opacity: 0,
                y: 35,
                filter: "blur(10px)",
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              viewport={{ once: true }}
              transition={{
                duration: 1.3,
                delay: 0.4,
                ease: customEase,
              }}
              className="relative -mt-1 md:-mt-3"
            >
              <span className="font-display text-[10vw] font-light italic leading-none tracking-[-0.055em] text-chrome2 sm:text-5xl md:text-6xl lg:text-[6.5rem]">
                your journey
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                delay: 0.65,
                ease: customEase,
              }}
              className="mx-auto mt-8 max-w-xl font-sans text-xs leading-[1.8] tracking-[0.08em] text-haze/75 md:text-sm"
            >
              Enter a destination shaped by architecture, nature, and a
              long-term vision of enduring value.
            </motion.p>
          </div>

          {/* =================================================
              CTA
              ================================================= */}

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.1,
              delay: 0.8,
              ease: customEase,
            }}
            className="mt-12"
          >
            <Link
              href="/contact-us"
              className="group relative flex h-16 min-w-[250px] items-center justify-between overflow-hidden border border-chrome1/60 px-7 transition-colors duration-700 hover:border-chrome1 md:h-[70px] md:min-w-[290px]"
            >
              {/* Animated fill */}
              <motion.span
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{
                  duration: 0.8,
                  ease: customEase,
                }}
                style={{ originX: 0 }}
                className="absolute inset-0 bg-chrome1"
              />

              <span className="relative z-10 font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-bone transition-colors duration-500 group-hover:text-void">
                Discover Purura
              </span>

              <span className="relative z-10 flex h-7 w-7 items-center justify-center overflow-hidden border border-chrome1/40 transition-colors duration-500 group-hover:border-void/30">
                <motion.span
                  initial={{ x: -18, opacity: 0 }}
                  whileHover={{ x: 0, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    ease: customEase,
                  }}
                  className="text-sm text-void"
                >
                  →
                </motion.span>

                <span className="absolute text-sm text-chrome1 transition-opacity duration-300 group-hover:opacity-0">
                  ↗
                </span>
              </span>
            </Link>
          </motion.div>
        </div>

        {/* ===================================================
            BOTTOM ARCHITECTURAL INFORMATION
            =================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.9,
            delay: 1,
            ease: customEase,
          }}
          className="relative"
        >
          {/* Thin divider */}
          <div className="mb-7 h-px w-full bg-gradient-to-r from-transparent via-line/50 to-transparent" />

          <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            {/* Left */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-haze/50">
                  PROJECT
                </span>

                <span className="h-px w-5 bg-chrome1/40" />

                <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-chrome1/70">
                  PURURA
                </span>
              </div>

              <p className="font-sans text-[9px] uppercase tracking-[0.22em] text-haze/45">
                A destination designed to endure
              </p>
            </div>

            {/* Center architectural marker */}
            <div className="hidden items-center gap-4 md:flex">
              <span className="font-mono text-[8px] tracking-[0.3em] text-haze/40">
                EST.
              </span>

              <span className="font-mono text-[9px] tracking-[0.2em] text-haze/70">
                2026
              </span>

              <span className="h-px w-12 bg-line/40" />

              <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-haze/40">
                FUTURE / PLACE / VALUE
              </span>
            </div>

            {/* Right */}
            <div className="flex flex-col gap-2 md:items-end">
              <p className="font-mono text-[8px] uppercase tracking-[0.28em] text-haze/50">
                © 2026 PURURA
              </p>

              <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-haze/35">
                All rights reserved
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* =====================================================
          CORNER ARCHITECTURAL MARKERS
          ===================================================== */}

      <div className="pointer-events-none absolute left-6 top-1/2 hidden h-14 w-14 -translate-y-1/2 border-l border-t border-line/30 md:block" />

      <div className="pointer-events-none absolute right-6 top-1/2 hidden h-14 w-14 -translate-y-1/2 border-r border-t border-line/30 md:block" />

      <div className="pointer-events-none absolute bottom-10 left-6 hidden h-4 w-4 border-b border-l border-chrome1/30 md:block" />

      <div className="pointer-events-none absolute bottom-10 right-6 hidden h-4 w-4 border-b border-r border-chrome1/30 md:block" />

      {/* =====================================================
          SUBTLE GOLD AXIS
          ===================================================== */}

      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: 1.8,
          delay: 0.3,
          ease: customEase,
        }}
        style={{ originY: 1 }}
        className="pointer-events-none absolute left-1/2 top-0 hidden h-[18%] w-px bg-gradient-to-b from-transparent via-chrome1/30 to-transparent md:block"
      />
    </footer>
  );
}
