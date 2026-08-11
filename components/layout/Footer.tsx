"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Footer() {
  return (
    <footer className="relative bg-void text-bone overflow-hidden">
      {/* Atmospheric gradient overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(142,197,255,0.1),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(201,169,255,0.08),transparent_35%)] pointer-events-none" />

      {/* Top-left honeycomb pattern - bleeding off-screen */}
      <div className="absolute -left-20 -top-20 h-[calc(100%+40px)] w-[600px] opacity-[0.08] pointer-events-none">
        <svg
          viewBox="0 0 600 800"
          className="h-full w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Row 1 */}
          <path d="M0 0 L104 0 L130 60 L104 120 L0 120 L-26 60 Z" stroke="var(--color-line)" strokeWidth="1.5" />
          <path d="M260 0 L364 0 L390 60 L364 120 L260 120 L234 60 Z" stroke="var(--color-line)" strokeWidth="1.5" />
          <path d="M520 0 L624 0 L650 60 L624 120 L520 120 L494 60 Z" stroke="var(--color-line)" strokeWidth="1.5" />

          {/* Row 2 - offset */}
          <path d="M130 120 L234 120 L260 180 L234 240 L130 240 L104 180 Z" stroke="var(--color-line)" strokeWidth="1.5" />
          <path d="M390 120 L494 120 L520 180 L494 240 L390 240 L364 180 Z" stroke="var(--color-line)" strokeWidth="1.5" />

          {/* Row 3 */}
          <path d="M0 240 L104 240 L130 300 L104 360 L0 360 L-26 300 Z" stroke="var(--color-line)" strokeWidth="1.5" />
          <path d="M260 240 L364 240 L390 300 L364 360 L260 360 L234 300 Z" stroke="var(--color-line)" strokeWidth="1.5" />
          <path d="M520 240 L624 240 L650 300 L624 360 L520 360 L494 300 Z" stroke="var(--color-line)" strokeWidth="1.5" />

          {/* Row 4 - offset */}
          <path d="M130 360 L234 360 L260 420 L234 480 L130 480 L104 420 Z" stroke="var(--color-line)" strokeWidth="1.5" />
          <path d="M390 360 L494 360 L520 420 L494 480 L390 480 L364 420 Z" stroke="var(--color-line)" strokeWidth="1.5" />

          {/* Row 5 */}
          <path d="M0 480 L104 480 L130 540 L104 600 L0 600 L-26 540 Z" stroke="var(--color-line)" strokeWidth="1.5" />
          <path d="M260 480 L364 480 L390 540 L364 600 L260 600 L234 300 Z" stroke="var(--color-line)" strokeWidth="1.5" />
          <path d="M520 480 L624 480 L650 540 L624 600 L520 600 L494 300 Z" stroke="var(--color-line)" strokeWidth="1.5" />

          {/* Row 6 - offset */}
          <path d="M130 600 L234 600 L260 660 L234 720 L130 720 L104 660 Z" stroke="var(--color-line)" strokeWidth="1.5" />
          <path d="M390 600 L494 600 L520 660 L494 720 L390 720 L364 660 Z" stroke="var(--color-line)" strokeWidth="1.5" />

          {/* Row 7 */}
          <path d="M0 720 L104 720 L130 780 L104 840 L0 840 L-26 780 Z" stroke="var(--color-line)" strokeWidth="1.5" />
          <path d="M260 720 L364 720 L390 780 L364 840 L260 840 L234 780 Z" stroke="var(--color-line)" strokeWidth="1.5" />
          <path d="M520 720 L624 720 L650 780 L624 840 L520 840 L494 780 Z" stroke="var(--color-line)" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Bottom-right honeycomb pattern - bleeding off-screen */}
      <div className="absolute -right-20 -bottom-90 h-[calc(100%+40px)] w-[600px] opacity-[0.08] pointer-events-none">
        <svg
          viewBox="0 0 600 800"
          className="h-full w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Row 1 */}
          <path d="M0 0 L104 0 L130 60 L104 120 L0 120 L-26 60 Z" stroke="var(--color-line)" strokeWidth="1.5" />
          <path d="M260 0 L364 0 L390 60 L364 120 L260 120 L234 60 Z" stroke="var(--color-line)" strokeWidth="1.5" />
          <path d="M520 0 L624 0 L650 60 L624 120 L520 120 L494 60 Z" stroke="var(--color-line)" strokeWidth="1.5" />

          {/* Row 2 - offset */}
          <path d="M130 120 L234 120 L260 180 L234 240 L130 240 L104 180 Z" stroke="var(--color-line)" strokeWidth="1.5" />
          <path d="M390 120 L494 120 L520 180 L494 240 L390 240 L364 180 Z" stroke="var(--color-line)" strokeWidth="1.5" />

          {/* Row 3 */}
          <path d="M0 240 L104 240 L130 300 L104 360 L0 360 L-26 300 Z" stroke="var(--color-line)" strokeWidth="1.5" />
          <path d="M260 240 L364 240 L390 300 L364 360 L260 360 L234 300 Z" stroke="var(--color-line)" strokeWidth="1.5" />
          <path d="M520 240 L624 240 L650 300 L624 360 L520 360 L494 300 Z" stroke="var(--color-line)" strokeWidth="1.5" />

          {/* Row 4 - offset */}
          <path d="M130 360 L234 360 L260 420 L234 480 L130 480 L104 420 Z" stroke="var(--color-line)" strokeWidth="1.5" />
          <path d="M390 360 L494 360 L520 420 L494 480 L390 480 L364 420 Z" stroke="var(--color-line)" strokeWidth="1.5" />

          {/* Row 5 */}
          <path d="M0 480 L104 480 L130 540 L104 600 L0 600 L-26 540 Z" stroke="var(--color-line)" strokeWidth="1.5" />
          <path d="M260 480 L364 480 L390 540 L364 600 L260 600 L234 300 Z" stroke="var(--color-line)" strokeWidth="1.5" />
          <path d="M520 480 L624 480 L650 540 L624 600 L520 600 L494 300 Z" stroke="var(--color-line)" strokeWidth="1.5" />

          {/* Row 6 - offset */}
          <path d="M130 600 L234 600 L260 660 L234 720 L130 720 L104 660 Z" stroke="var(--color-line)" strokeWidth="1.5" />
          <path d="M390 600 L494 600 L520 660 L494 720 L390 720 L364 660 Z" stroke="var(--color-line)" strokeWidth="1.5" />

          {/* Row 7 */}
          <path d="M0 720 L104 720 L130 780 L104 840 L0 840 L-26 780 Z" stroke="var(--color-line)" strokeWidth="1.5" />
          <path d="M260 720 L364 720 L390 780 L364 840 L260 840 L234 780 Z" stroke="var(--color-line)" strokeWidth="1.5" />
          <path d="M520 720 L624 720 L650 780 L624 840 L520 840 L494 780 Z" stroke="var(--color-line)" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Chrome accent line at top */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-chrome1/50 to-transparent" />

      <div className="relative min-h-[80vh] flex items-center justify-center py-32 md:py-40 lg:py-48">
        <div className="max-w-7xl mx-auto px-6 md:px-8 w-full flex flex-col items-center justify-center">
          {/* Logo lockup at top center */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: customEase }}
            className="flex flex-col items-center mb-10"
          >
            <h3 className="text-2xl md:text-3xl font-bold tracking-[-0.03em] text-bone font-display">
              Purura
            </h3>
            <motion.p
              initial={{ opacity: 0, y: 15, letterSpacing: "0.5em" }}
              whileInView={{ opacity: 1, y: 0, letterSpacing: "0.35em" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: customEase }}
              className="mt-2 text-xs font-semibold uppercase text-chrome1 font-mono"
            >
              Regenerative Hospitality
            </motion.p>
          </motion.div>

          {/* Main headline section - centered */}
          <div className="text-center max-w-5xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 80, filter: "blur(16px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease: customEase }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none tracking-[-0.05em] mb-8 font-display"
            >
              BEGIN YOUR JOURNEY
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 40, scale: 0.9, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.15, ease: customEase }}
              className="text-3xl md:text-4xl lg:text-5xl italic font-light text-chrome2 relative -mt-6 mb-12 font-display"
            >
              to exclusive investment opportunity
            </motion.p>
          </div>

          {/* Centered CTA button */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.85 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.25, ease: customEase }}
            className="flex justify-center"
          >
            <Link
              href="/contact-us"
              className="group relative inline-flex items-center justify-center px-16 py-8 rounded-full border-2 border-chrome1 text-bone text-xs font-semibold uppercase tracking-[0.35em] transition-all duration-500 hover:text-void overflow-hidden"
            >
              <span className="relative z-10 transition-colors duration-500">
                Contact Us
              </span>
              <motion.div
                className="absolute inset-0 bg-chrome1"
                initial={{ scaleX: 0, opacity: 0.8 }}
                whileHover={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.7, ease: customEase }}
                style={{ originX: 0 }}
              />
            </Link>
          </motion.div>

          {/* Copyright - bottom left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5, ease: customEase }}
            className="absolute bottom-12 left-6 md:left-8 lg:left-12"
          >
            <p className="text-[10px] uppercase tracking-[0.25em] text-haze font-mono">
              © 2025 Purura. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
