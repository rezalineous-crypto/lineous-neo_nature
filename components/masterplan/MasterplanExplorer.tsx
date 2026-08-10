"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { customEase } from "@/components/home/Hero";
import { masterplanLocations } from "@/lib/masterplan-locations";
import Hotspot from "./Hotspot";
import InfoPanel from "./InfoPanel";
import AnimatedConnection from "./AnimatedConnection";
import HUD from "./HUD";
import Particles from "./Particles";

export default function MasterplanExplorer() {
  const [activeLocationId, setActiveLocationId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Mouse parallax values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(useTransform(mouseX, [-0.5, 0.5], [8, -8]), {
    damping: 30,
    stiffness: 120,
  });
  const springY = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    damping: 30,
    stiffness: 120,
  });

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeLocationId) {
        setActiveLocationId(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLocationId]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  const activeLocation =
    masterplanLocations.find((l) => l.id === activeLocationId) || null;

  // Calculate panel anchor point for connection line (center of panel)
  const panelAnchorX = isMobile ? 50 : 82; // percentage from left
  const panelAnchorY = 50; // center vertically

  return (
    <section
      id="masterplan-explorer"
      className="relative w-full h-screen overflow-hidden bg-void"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,164,90,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 30% 70%, rgba(142,197,255,0.04) 0%, transparent 50%)",
        }}
      />

      {/* Parallax image container */}
      <motion.div
        className="absolute inset-0"
        style={{ x: springX, y: springY }}
      >
        <Image
          src="/purura_resort_images/purura_render_01.jpg"
          alt="Neo Nature Resort Masterplan"
          fill
          priority
          quality={90}
          className="object-cover"
        />
        {/* Cinematic overlay */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-overlay/60 via-overlay/20 to-overlay/40" /> */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-overlay/30 via-transparent to-overlay/30" /> */}
      </motion.div>

      {/* Ambient particles */}
      <Particles count={30} />

      {/* HUD overlay */}
      <HUD accentColor="#C9A45A" />

      {/* Building highlight overlay (SVG) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 5 }}
        aria-hidden="true"
      >
        {masterplanLocations.map((loc) => {
          const isActive = activeLocationId === loc.id;
          if (!isActive) return null;

          return (
            <motion.ellipse
              key={`highlight-${loc.id}`}
              cx={`${loc.x}%`}
              cy={`${loc.y}%`}
              rx="8%"
              ry="6%"
              fill="none"
              stroke={loc.accentColor}
              strokeWidth="1.5"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{
                filter: `drop-shadow(0 0 12px ${loc.accentColor}50)`,
                transformOrigin: `${loc.x}% ${loc.y}%`,
              }}
            />
          );
        })}
      </svg>

      {/* Dim overlay when active */}
      <motion.div
        className="absolute inset-0 pointer-events-none bg-overlay/40"
        animate={{ opacity: activeLocationId ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ zIndex: 6 }}
      />

      {/* Connection line */}
      {activeLocation && (
        <AnimatedConnection
          fromX={activeLocation.x}
          fromY={activeLocation.y}
          toX={panelAnchorX}
          toY={panelAnchorY}
          accentColor={activeLocation.accentColor}
          isActive={!!activeLocationId}
        />
      )}

      {/* Hotspots */}
      {masterplanLocations.map((loc) => (
        <Hotspot
          key={loc.id}
          x={loc.x}
          y={loc.y}
          accentColor={loc.accentColor}
          label={loc.title}
          isActive={activeLocationId === loc.id}
          isDimmed={!!activeLocationId && activeLocationId !== loc.id}
          onActivate={() => setActiveLocationId(loc.id)}
          onDeactivate={() => setActiveLocationId(null)}
        />
      ))}

      {/* Info Panel */}
      <InfoPanel
        location={activeLocation}
        isOpen={!!activeLocationId}
        onClose={() => setActiveLocationId(null)}
        panelRef={panelRef}
      />

      {/* Section title overlay */}
      <motion.div
        className="absolute top-6 left-6 md:top-8 md:left-8 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: customEase }}
      >
        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-white mb-1">
          Neo Nature Resort
        </p>
        <h2 className="text-lg md:text-xl font-bold text-white font-display tracking-tight">
          Masterplan Explorer
        </h2>
      </motion.div>

      {/* Instruction hint */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: activeLocationId ? 0 : 0.5 }}
        transition={{ duration: 0.4 }}
      >
        <p className="text-[15px] font-mono uppercase tracking-[0.2em] text-white flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-white" />
          Hover over markers to explore
          <span className="w-1 h-1 rounded-full bg-white" />
        </p>
      </motion.div>
    </section>
  );
}
