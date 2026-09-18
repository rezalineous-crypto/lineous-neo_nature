"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const customEase = [0.16, 1, 0.3, 1] as const;

const navItems = [
  { label: "The Resort", href: "/the-resort" },
  { label: "Residences", href: "/residences" },
  { label: "Experience", href: "/experience" },
  { label: "Philosophy", href: "/philosophy" },
];

export default function Footer() {
  return (
    <footer
  className="
    relative overflow-hidden
    bg-[#050505] text-white
    before:pointer-events-none before:absolute before:inset-0
    before:bg-[radial-gradient(circle_at_0%_100%,rgba(180,140,70,0.035),transparent_28%),radial-gradient(circle_at_100%_0%,rgba(180,140,70,0.03),transparent_26%)]
  "
>
      {/* =====================================================
          MAIN GRAPHIC AREA
      ====================================================== */}

      <div className="relative px-6 pt-10 md:px-10 lg:px-14">
        {/* Small center title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            delay: 0.55,
            ease: customEase,
          }}
          className="absolute top-10 left-1/2 -translate-x-1/2 text-center bg-gray-950 backdrop-blur-sm"
        >
          <div className="mx-auto mb-4 h-px w-8 bg-[#C9A45A]/50" />
          <p className="font-display text-xl font-light tracking-[-0.025em] text-white/80 md:text-2xl">
            A destination in becoming.
          </p>

        </motion.div>

        {/* =================================================
            IMAGE + SMALL EDITORIAL TYPE
        ================================================== */}

        <div className="relative flex min-h-[560px] items-center justify-center py-16 md:max-h-[650px] md:py-20 lg:max-h-[700px]">
          {/* Image */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.96,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 1.4,
              ease: customEase,
            }}
            className="relative w-[82%] max-w-[1250px] md:w-[70%] lg:w-[100%]"
          >
            <img
              src="/Purura/footer-graphics-Photoroom.png"
              alt="Purura architectural masterplan"
              className="block h-auto w-full object-contain opacity-[0.52] rotate-45 md:mt-72"
            />
          </motion.div>
        </div>
      </div>

      {/* =====================================================
          ACTUAL FOOTER NAVIGATION
      ====================================================== */}

      <div className="absolute bottom-0 right-0 left-0">
        <div className="px-6 py-10 md:px-10 md:py- lg:px-14">
          <div className="flex items-center justify-between w-full">
            {/* Brand */}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: customEase }}
              className="col-span-2 md:col-span-4 lg:col-span-1"
            >
              <div className="w-[150px]">
                <img
                  src="/purura-logo.png"
                  alt="PURURA"
                  className="h-auto w-full object-contain"
                />
              </div>

              <p className="mt-5 max-w-[190px] font-sans text-[14px] leading-[1.75] text-white/30">
                A destination shaped by nature, architecture and a long-term
                vision of place.
              </p>
            </motion.div>

            {/* Explore */}

            {/* <div>
              <p className="mb-5 font-mono text-[7px] uppercase tracking-[0.3em] text-[#C9A45A]/60">
                Explore
              </p>

              <nav className="flex flex-col gap-3">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="group flex items-center gap-2 font-sans text-white/45 transition-colors duration-300 hover:text-white"
                  >
                    <span className="h-px w-0 bg-[#C9A45A] transition-all duration-500 group-hover:w-3" />

                    {item.label}
                  </Link>
                ))}
              </nav>
            </div> */}

            {/* Connect */}
{/* 
            <div>
              <p className="mb-5 font-mono text- uppercase tracking-[0.3em] text-[#C9A45A]/60">
                Connect
              </p>

              <div className="flex flex-col gap-3">
                <Link
                  href="/contact-us"
                  className="font-sans text-white/45 transition-colors hover:text-white"
                >
                  Contact
                </Link>

                <a
                  href="#"
                  className="font-sans text-white/45 transition-colors hover:text-white"
                >
                  Instagram
                </a>

                <a
                  href="#"
                  className="font-sans text-white/45 transition-colors hover:text-white"
                >
                  LinkedIn
                </a>
              </div>
            </div> */}

            {/* Contact */}

            <div>
              <p className="mb-5 font-mono uppercase tracking-[0.3em] text-[#C9A45A]/60">
                Location
              </p>

              <p className="font-sans leading-[1.7] text-white/40">
                Valuka
                <br />
                Mymensingh, Bangladesh
              </p>

              <p className="mt-4 font-mono text-[7px] tracking-[0.2em] text-white/20">
                23°48′N / 90°25′E
              </p>
            </div>
          </div>

          {/* =================================================
              LEGAL / COPYRIGHT
          ================================================== */}

          <div className="mt-12 border-t border-white/[0.07] pt-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-center">
              <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-white/20">
                © 2026 PURURA /
              </p>

              <div className="flex items-center gap-6">
                <Link
                  href="/privacy-policy"
                  className="font-mono text-[12px] uppercase tracking-[0.2em] text-white/20 transition-colors hover:text-white/50"
                >
                  Privacy |
                </Link>

                <Link
                  href="/terms"
                  className="font-mono text-[12px] uppercase tracking-[0.2em] text-white/20 transition-colors hover:text-white/50"
                >
                  Terms
                </Link>

                {/* <span className="font-mono text-[12px] uppercase tracking-[0.2em] text-white/15">
                  Future / Place / Value
                </span> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
