"use client";

import { useCallback, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";

import { masterplanLocations } from "@/lib/masterplan-locations";
import Hotspot from "./Hotspot";

export default function MasterplanExplorer() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [hoveredLocationId, setHoveredLocationId] = useState<string | null>(
    null
  );

  // ---------------------------------------------------------
  // Mouse parallax
  // ---------------------------------------------------------

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const imageX = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [4, -4]),
    {
      damping: 35,
      stiffness: 100,
    }
  );

  const imageY = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [4, -4]),
    {
      damping: 35,
      stiffness: 100,
    }
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();

      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setHoveredLocationId(null);
  }, [mouseX, mouseY]);

  const isExploring = hoveredLocationId !== null;

  return (
    <section
      ref={containerRef}
      id="masterplan-explorer"
      className="relative h-screen w-full overflow-hidden bg-void"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* =====================================================
          MASTERPLAN IMAGE
      ====================================================== */}

      <motion.div
        className="absolute -inset-2"
        style={{
          x: imageX,
          y: imageY,
        }}
      >
        <Image
          src="/Purura/NewImages/Overall 11.png"
          alt="Purura Resort Masterplan"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* =====================================================
          CINEMATIC OVERLAY
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 bg-black/8" />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 45%, rgba(0,0,0,.18) 100%)",
        }}
      />

      {/* =====================================================
          DIM EVERYTHING WHEN HOVERING
      ====================================================== */}

      <motion.div
        className="pointer-events-none absolute inset-0 z-10 bg-[#06100d]"
        animate={{
          opacity: isExploring ? 0.34 : 0,
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
      />

      {/* =====================================================
          TITLE
      ====================================================== */}

      <motion.div
        className="absolute left-6 top-6 z-[60] md:left-8 md:top-8"
        animate={{
          opacity: isExploring ? 0.4 : 1,
        }}
        transition={{ duration: 0.3 }}
      >
        <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.28em] text-white/60">
          Purura Resort
        </p>

        <h2 className="font-display text-xl font-medium tracking-tight text-white md:text-4xl">
          Masterplan
        </h2>
      </motion.div>

      {/* =====================================================
          HOTSPOTS
      ====================================================== */}

      <div className="absolute inset-0 z-20">
        {masterplanLocations.map((location, index) => (
          <Hotspot
            key={location.id}
            x={location.x}
            y={location.y}
            popupX={location.popupX}
            popupY={location.popupY}
            label={location.title}
            description={location.description}
            index={index + 1}
            align={location.align}
            isHovered={hoveredLocationId === location.id}
            isDimmed={
              isExploring &&
              hoveredLocationId !== location.id
            }
            onHover={() => setHoveredLocationId(location.id)}
            onLeave={() => setHoveredLocationId(null)}
          />
        ))}
      </div>

      {/* =====================================================
          BOTTOM INSTRUCTION
      ====================================================== */}

      <motion.div
        className="absolute bottom-6 left-1/2 z-[60] -translate-x-1/2"
        animate={{
          opacity: isExploring ? 0 : 0.6,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3 whitespace-nowrap">
          <span className="h-px w-8 bg-white/30" />

          <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-white/60">
            Explore the masterplan
          </span>

          <span className="h-px w-8 bg-white/30" />
        </div>
      </motion.div>

      {/* =====================================================
          TECHNICAL LABEL
      ====================================================== */}

      <motion.div
        className="absolute bottom-6 right-6 z-[60] hidden md:block"
        animate={{
          opacity: isExploring ? 0.15 : 0.4,
        }}
      >
        <span className="font-mono text-[7px] uppercase tracking-[0.22em] text-white/40">
          PURURA / MASTERPLAN 01
        </span>
      </motion.div>
    </section>
  );
}