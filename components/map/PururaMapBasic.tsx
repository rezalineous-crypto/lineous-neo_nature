"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import Container from "@/components/layout/Container";
import { customEase } from "@/components/home/Hero";

interface PururaMapProps {
  className?: string;
}

/**
 * PURURA LOCATION
 * Base Technologies Industrial Zone
 *
 * Coordinates:
 * 24.427548° N
 * 90.393589° E
 */

const MAP_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d350.12929527315697!2d90.393589!3d24.427548!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37566f70a02fb0bd%3A0xd3b157402c6e6969!2sBase%20Technologies%20Industrial%20Zone!5e0!3m2!1sen!2sbd!4v1790930848388!5m2!1sen!2sbd";

const GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/Base+Technologies+Industrial+Zone/@24.4275202,90.3926829,308m/";

const COORDINATE_LINES = ["24° 25' 39.2\" N", "90° 23' 36.9\" E"];

export default function PururaMapBasic({ className = "" }: PururaMapProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      id="location"
      className={`relative overflow-hidden bg-[#051601] text-charcoal dark:text-bone ${className}`}
    >
      {/* LOCATION MARK + BOTANICAL DETAILS */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {/* Large location mark — intentionally behind the heading */}
        <motion.div
          initial={{
            opacity: 0,
            scale: reduceMotion ? 1 : 0.92,
            y: 18,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            duration: 1.2,
            ease: customEase,
          }}
          className="absolute left-[-4.5rem] top-[9.5rem] text-champagne/[0.085] sm:left-[-3rem] sm:top-[10rem] lg:left-[1.5%] lg:top-[11rem]"
        >
          <MapPin
            aria-hidden="true"
            strokeWidth={1.7}
            className="h-[15rem] w-[15rem] sm:h-[19rem] sm:w-[19rem] lg:h-[23rem] lg:w-[23rem]"
          />
        </motion.div>

        {/* Custom leaf 01 */}
        <motion.svg
          initial={{ opacity: 0, y: 12, rotate: -5 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 1.1,
            delay: 0.15,
            ease: customEase,
          }}
          viewBox="0 0 180 150"
          className="absolute left-[4%] top-[5%] h-28 w-32 rotate-[-12deg] text-champagne/[0.16] sm:h-36 sm:w-40 lg:left-[7%] lg:top-[8%]"
        >
          <path
            d="M18 128C53 105 76 73 91 19"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          />

          <path
            d="M46 105C27 101 16 91 10 77C27 75 42 82 52 96Z"
            fill="currentColor"
            fillOpacity=".38"
          />

          <path
            d="M65 80C46 75 36 64 33 49C50 51 63 59 70 72Z"
            fill="currentColor"
            fillOpacity=".28"
          />

          <path
            d="M80 57C68 46 66 34 70 21C82 29 88 40 86 52Z"
            fill="currentColor"
            fillOpacity=".32"
          />

          <path
            d="M76 69C94 64 106 55 111 41C95 42 84 49 76 61Z"
            fill="currentColor"
            fillOpacity=".24"
          />
        </motion.svg>

        {/* Custom leaf 02 */}
        <motion.svg
          initial={{ opacity: 0, y: 16, rotate: 5 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 1.1,
            delay: 0.25,
            ease: customEase,
          }}
          viewBox="0 0 180 150"
          className="absolute right-[5%] top-[8%] h-24 w-28 rotate-[18deg] text-champagne/[0.13] sm:h-32 sm:w-36 lg:right-[8%] lg:top-[10%]"
        >
          <path
            d="M20 130C61 110 84 77 103 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
          />

          <path
            d="M51 108C31 104 20 93 16 79C33 78 46 86 57 99Z"
            fill="currentColor"
            fillOpacity=".34"
          />

          <path
            d="M72 84C53 79 43 68 42 54C58 56 70 64 77 77Z"
            fill="currentColor"
            fillOpacity=".26"
          />

          <path
            d="M87 61C77 50 78 37 84 25C95 35 99 47 95 58Z"
            fill="currentColor"
            fillOpacity=".28"
          />

          <path
            d="M82 72C100 68 113 58 120 45C104 46 92 54 82 64Z"
            fill="currentColor"
            fillOpacity=".22"
          />
        </motion.svg>

        {/* Custom leaf 03 */}
        <motion.svg
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 1.1,
            delay: 0.35,
            ease: customEase,
          }}
          viewBox="0 0 170 150"
          className="absolute bottom-[17%] left-[1%] h-28 w-32 rotate-[18deg] text-champagne/[0.12] sm:h-36 sm:w-40 lg:left-[5%]"
        >
          <path
            d="M13 135C49 111 73 79 90 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
          />

          <path
            d="M41 112C24 108 14 98 10 85C25 85 39 91 48 103Z"
            fill="currentColor"
            fillOpacity=".30"
          />

          <path
            d="M62 88C44 83 35 72 34 58C50 61 61 68 68 80Z"
            fill="currentColor"
            fillOpacity=".23"
          />

          <path
            d="M79 61C68 50 69 38 75 26C86 35 90 47 87 57Z"
            fill="currentColor"
            fillOpacity=".27"
          />
        </motion.svg>

        {/* Custom leaf 04 */}
        <motion.svg
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 1.1,
            delay: 0.4,
            ease: customEase,
          }}
          viewBox="0 0 180 150"
          className="absolute bottom-[8%] right-[2%] h-32 w-36 rotate-[-14deg] text-champagne/[0.13] sm:h-40 sm:w-44 lg:right-[6%]"
        >
          <path
            d="M22 134C57 111 83 78 101 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
          />

          <path
            d="M51 111C32 107 22 97 18 83C34 83 47 90 57 102Z"
            fill="currentColor"
            fillOpacity=".31"
          />

          <path
            d="M73 85C55 80 45 69 44 55C60 58 72 65 79 78Z"
            fill="currentColor"
            fillOpacity=".24"
          />

          <path
            d="M89 60C79 49 80 37 87 25C98 34 102 46 98 57Z"
            fill="currentColor"
            fillOpacity=".28"
          />

          <path
            d="M86 72C104 68 117 58 124 45C108 46 96 54 86 64Z"
            fill="currentColor"
            fillOpacity=".20"
          />
        </motion.svg>

        {/* Small botanical fragment 01 */}
        <svg
          viewBox="0 0 90 80"
          className="absolute left-[42%] top-[5%] h-16 w-16 rotate-[-24deg] text-champagne/[0.12] sm:left-[45%]"
        >
          <path
            d="M8 71C29 56 43 37 53 8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />

          <path
            d="M27 55C17 53 11 47 9 39C19 40 27 44 31 50Z"
            fill="currentColor"
            fillOpacity=".35"
          />

          <path
            d="M42 35C34 31 32 25 34 18C41 22 45 27 45 32Z"
            fill="currentColor"
            fillOpacity=".28"
          />
        </svg>

        {/* Small botanical fragment 02 */}
        <svg
          viewBox="0 0 90 80"
          className="absolute bottom-[31%] right-[38%] h-14 w-16 rotate-[22deg] text-champagne/[0.10]"
        >
          <path
            d="M8 71C29 56 43 37 53 8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />

          <path
            d="M27 55C17 53 11 47 9 39C19 40 27 44 31 50Z"
            fill="currentColor"
            fillOpacity=".32"
          />

          <path
            d="M42 35C34 31 32 25 34 18C41 22 45 27 45 32Z"
            fill="currentColor"
            fillOpacity=".25"
          />
        </svg>

        {/* Small botanical fragment 03 */}
        <svg
          viewBox="0 0 90 80"
          className="absolute bottom-[6%] left-[34%] h-14 w-16 rotate-[-8deg] text-champagne/[0.10]"
        >
          <path
            d="M8 71C29 56 43 37 53 8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />

          <path
            d="M27 55C17 53 11 47 9 39C19 40 27 44 31 50Z"
            fill="currentColor"
            fillOpacity=".30"
          />

          <path
            d="M42 35C34 31 32 25 34 18C41 22 45 27 45 32Z"
            fill="currentColor"
            fillOpacity=".24"
          />
        </svg>
      </div>

      {/* Ambient champagne bloom */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{
          duration: 1.6,
          ease: customEase,
        }}
        className="pointer-events-none absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full bg-champagne/[0.08] blur-[130px]"
      />

      <Container className="relative z-10 w-full py-20 md:py-28 lg:py-32">
        {/* COMPOSITION */}
        <div className="mt-14 grid gap-10 lg:grid-cols-[0.34fr_0.66fr] lg:gap-12 xl:gap-16">
          {/* LOCATION INFORMATION */}
          <div className="relative flex flex-col justify-between pt-7 lg:min-h-[600px]">
            <motion.div
              initial={{
                scaleX: reduceMotion ? 1 : 0,
              }}
              whileInView={{
                scaleX: 1,
              }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 1.1,
                ease: customEase,
              }}
              className="absolute inset-x-0 top-0 h-px origin-left bg-void/10"
            />

            <div>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.7,
                  delay: 0.2,
                  ease: customEase,
                }}
                className="annotation text-void"
              >
                Location
              </motion.span>

              <motion.div
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.9,
                  delay: 0.1,
                  ease: customEase,
                }}
                className="mt-7"
              >
                <h3 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-void">
                  FIND YOUR WAY
                  <br />
                  <span className="text-champagne">TO PURURA</span>
                </h3>

                <p className="mt-5 max-w-[280px] font-display text-sm leading-[1.8] text-void/60">
                  Base Technologies Industrial Zone
                  <br />
                  Bhaluka, Mymensingh
                  <br />
                  Bangladesh
                </p>
              </motion.div>
            </div>

            {/* COORDINATES */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: customEase,
              }}
              className="mt-12 border-t border-void/10 pt-6 lg:mt-0"
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-void/50">
                Coordinates
              </span>

              <div className="mt-3 space-y-1 font-mono text-[11px] tracking-[0.12em] text-void/80">
                {COORDINATE_LINES.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </motion.div>

            {/* DIRECTIONS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: customEase,
              }}
              className="mt-8 lg:mt-10"
            >
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="chrome-underline group inline-flex items-center gap-4 pb-2 font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-void transition-colors duration-300 hover:text-champagne"
              >
                <span>Open in Google Maps</span>

                <ArrowUpRight
                  size={14}
                  strokeWidth={1.4}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </motion.div>
          </div>

          {/* MAP */}
          <div className="relative">

            {/* Map frame */}
            <div className="relative overflow-hidden rounded-[1.5rem] bg-[#DDD9CF] shadow-[0_25px_80px_rgba(23,37,29,0.08)] sm:rounded-[2rem]">
              <iframe
                src={MAP_URL}
                title="PURURA Resort Location — Base Technologies Industrial Zone"
                className="block h-[430px] w-full border-0 sm:h-[520px] lg:h-[600px]"
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </div>

        {/* FOOTNOTE */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: 0.9,
            ease: customEase,
          }}
          className="mt-16 flex flex-col gap-5 border-t border-void/10 pt-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="max-w-[500px] font-display text-xs leading-6 text-void/60 sm:text-sm sm:leading-7">
            A destination shaped by landscape, elevated by technology, and
            designed for a different way of experiencing nature.
          </p>

          <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-void/40">
            24.427548 / 90.393589
          </span>
        </motion.div>
      </Container>

      {/* Thin architectural line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-champagne/20" />
    </section>
  );
}
