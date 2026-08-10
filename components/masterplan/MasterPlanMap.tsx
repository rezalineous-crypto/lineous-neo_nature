/* eslint-disable react-hooks/purity */
"use client";

import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { X, MapPin, Waves, Compass, Anchor, Palmtree, Droplets, Building2 } from "lucide-react";

// ─── TYPES ─────────────────────────────────────────────
type Spot = {
  id: string;
  label: string;
  top: string;
  left: string;
  description: string;
  features: string[];
  image: string;
  icon: React.ReactNode;
  color: string;
};

// ─── DATA ──────────────────────────────────────────────
const spots: Spot[] = [
  {
    id: "beach",
    label: "Private Beach",
    top: "72%",
    left: "22%",
    description: "Pristine white sand beach with exclusive cabanas and sunset views over the natural landscape.",
    features: ["Private Cabanas", "Sunset Lounge", "Water Sports", "Beach Dining"],
    image: "/purura_resort_images/purura_render_18.jpg",
    icon: <Waves className="w-5 h-5" />,
    color: "#f5e6d3",
  },
  {
    id: "villa",
    label: "Luxury Villas",
    top: "48%",
    left: "42%",
    description: "Overwater and beachfront villas with private pools and butler service.",
    features: ["Private Pool", "Butler Service", "Ocean View", "Smart Home"],
    image: "/purura_resort_images/purura_render_11.jpg",
    icon: <Building2 className="w-5 h-5" />,
    color: "#8EC5FF",
  },
  {
    id: "bar",
    label: "Ocean Bar",
    top: "58%",
    left: "68%",
    description: "Rooftop cocktail bar with panoramic views and curated experiences.",
    features: ["Craft Cocktails", "Live Music", "Infinity Pool", "Sunset Views"],
    image: "/purura_resort_images/purura_render_16.jpg",
    icon: <Droplets className="w-5 h-5" />,
    color: "#3ab0c0",
  },
  {
    id: "spa",
    label: "Spa Retreat",
    top: "32%",
    left: "58%",
    description: "World-class wellness center with hydrotherapy and traditional treatments.",
    features: ["Hydrotherapy", "Massage", "Yoga Pavilion", "Meditation"],
    image: "/purura_resort_images/purura_render_10.jpg",
    icon: <Palmtree className="w-5 h-5" />,
    color: "#4a8c3f",
  },
  {
    id: "dock",
    label: "Yacht Dock",
    top: "25%",
    left: "85%",
    description: "Private marina with yacht charter services and deep-water docking.",
    features: ["Yacht Charter", "Deep Water Dock", "Helipad", "Concierge"],
    image: "/purura_resort_images/purura_render_02.jpg",
    icon: <Anchor className="w-5 h-5" />,
    color: "#8b7355",
  },
];

// ─── JOURNEY PATHS (connecting spots) ──────────────────
const journeyPaths = [
  { from: "villa", to: "beach", color: "#8EC5FF" },
  { from: "beach", to: "bar", color: "#C9A9FF" },
  { from: "bar", to: "spa", color: "#4a8c3f" },
  { from: "spa", to: "dock", color: "#f5e6d3" },
];

// ─── MAIN COMPONENT ────────────────────────────────────
export default function MasterplanMap() {
  const [active, setActive] = useState<string | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // ─── PARALLAX MOTION VALUES ──────────────────────────
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const moveX = useSpring(useTransform(mouseX, [-0.5, 0.5], [15, -15]), springConfig);
  const moveY = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
  const scale = useSpring(1, springConfig);

  // ─── PARALLAX HANDLER ──────────────────────────────
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current || isZoomed) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY, isZoomed]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  // ─── GSAP CINEMATIC ZOOM ───────────────────────────
  const handleSpotClick = (spot: Spot) => {
    if (!mapRef.current || !containerRef.current) return;
    
    setIsZoomed(true);
    setSelectedSpot(spot);
    
    // Calculate zoom target based on spot position
    const top = parseFloat(spot.top);
    const left = parseFloat(spot.left);
    
    const targetX = (50 - left) * 3; // Zoom into spot
    const targetY = (50 - top) * 3;
    
    gsap.to(mapRef.current, {
      scale: 2.5,
      x: `${targetX}%`,
      y: `${targetY}%`,
      duration: 1.2,
      ease: "power3.inOut",
    });
    
    gsap.to(containerRef.current, {
      backgroundColor: "rgba(0,0,0,0.9)",
      duration: 0.8,
    });
  };

  const handleCloseZoom = () => {
    if (!mapRef.current || !containerRef.current) return;
    
    setIsZoomed(false);
    setSelectedSpot(null);
    
    gsap.to(mapRef.current, {
      scale: 1,
      x: "0%",
      y: "0%",
      duration: 1,
      ease: "power3.inOut",
    });
    
    gsap.to(containerRef.current, {
      backgroundColor: "rgba(0,0,0,0)",
      duration: 0.8,
    });
  };

  // ─── ANIMATED PATHS ────────────────────────────────
  useEffect(() => {
    if (!svgRef.current) return;
    
    const paths = svgRef.current.querySelectorAll(".journey-path");
    paths.forEach((path, i) => {
      const length = (path as SVGPathElement).getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2,
        delay: i * 0.4,
        ease: "power2.out",
        repeat: -1,
        repeatDelay: 3,
      });
    });
  }, []);

  // ─── 3D FLOATING MARKERS ───────────────────────────
  const FloatingMarker = ({ spot }: { spot: Spot }) => (
    <motion.div
      className="absolute preserve-3d"
      style={{ 
        top: spot.top, 
        left: spot.left,
        transformStyle: "preserve-3d",
      }}
      animate={{
        // y: [0, -8, 0],
        rotateX: [0, 5, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div className="relative flex flex-col items-center">
        {/* 3D Shadow */}
        <div className="absolute -bottom-8 w-8 h-2 bg-black/30 rounded-full blur-sm" />
        
        {/* Pin */}
        <motion.div
          className="relative flex items-center justify-center cursor-pointer"
          whileHover={{ scale: 1.3, rotateY: 15 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onClick={() => handleSpotClick(spot)}
          onMouseEnter={() => setActive(spot.id)}
          onMouseLeave={() => setActive(null)}
        >
          {/* Glow ring */}
          <div 
            className="absolute h-12 w-12 rounded-full border-2 animate-ping opacity-40"
            style={{ borderColor: spot.color }}
          />
          
          {/* Outer ring */}
          <div 
            className="absolute h-10 w-10 rounded-full border border-white/30"
            style={{ boxShadow: `0 0 20px ${spot.color}40` }}
          />
          
          {/* Core dot */}
          <div 
            className="h-4 w-4 rounded-full shadow-lg relative z-10"
            style={{ 
              backgroundColor: spot.color,
              boxShadow: `0 0 25px ${spot.color}, 0 0 50px ${spot.color}60`,
            }}
          />
          
          {/* Inner pulse */}
          <motion.div
            className="absolute h-3 w-3 rounded-full bg-bone"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>

        {/* TOOLTIP */}
        <AnimatePresence>
          {active === spot.id && !isZoomed && (
            <motion.div
              initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 10, filter: "blur(8px)" }}
              transition={{ duration: 0.3 }}
              className="absolute top-[-60px] left-1/2 -translate-x-1/2 whitespace-nowrap z-50"
            >
              <div
                className="px-4 py-2 rounded-full
                  bg-graphite/50 backdrop-blur-xl
                  border border-line
                  text-bone text-xs tracking-widest font-medium
                  shadow-[0_8px_32px_rgba(0,0,0,0.4)]
                  flex items-center gap-2"
              >
                {spot.icon}
                {spot.label}
              </div>
              {/* Tooltip arrow */}
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-graphite/50 rotate-45 border-r border-b border-line" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-void"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ─── MAP CONTAINER WITH PARALLAX ───────────────── */}
      <motion.div
        ref={mapRef}
        className="absolute inset-0 w-full h-full"
        style={{
          x: moveX,
          y: moveY,
          scale: scale,
        }}
      >
        {/* MAP IMAGE */}
        <Image
          src="/masterplan_map.png" // Use the generated map
          alt="Thuwal Private Island Masterplan"
          fill
          className="object-cover"
          priority
          quality={100}
        />

        {/* DARK LUXURY OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />

        {/* ─── ANIMATED JOURNEY PATHS ─────────────────── */}
   

        {/* ─── 3D FLOATING MARKERS ─────────────────────── */}
        {spots.map((spot) => (
          <FloatingMarker key={spot.id} spot={spot} />
        ))}

        {/* ─── COMPASS DECORATION ──────────────────────── */}
        <div className="absolute bottom-8 right-8 opacity-60">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border border-chrome1/40" />
            <div className="absolute inset-2 rounded-full border border-chrome1/20" />
            <Compass className="absolute inset-0 m-auto w-8 h-8 text-chrome1" />
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-chrome1 text-xs font-bold tracking-widest">N</span>
          </div>
        </div>
      </motion.div>

      {/* ─── SIDE PANEL (INFO CARD) ────────────────────── */}
      <AnimatePresence>
        {selectedSpot && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute right-0 top-0 h-full w-[420px] max-w-[90vw] z-30"
          >
            <div className="h-full bg-void/95 backdrop-blur-2xl border-l border-line shadow-2xl overflow-y-auto">
              {/* Close button */}
              <button
                onClick={handleCloseZoom}
                className="absolute top-6 right-6 z-10 p-2 rounded-full bg-graphite/50 hover:bg-graphite/70 transition-colors"
              >
                <X className="w-5 h-5 text-bone" />
              </button>

              {/* Spot Image */}
              <div className="relative h-64 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-overlay z-10" />
                <Image
                  src={selectedSpot.image}
                  alt={selectedSpot.label}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-6 left-6 z-20">
                  <div className="flex items-center gap-2 mb-2">
                    <div 
                      className="p-2 rounded-full"
                      style={{ backgroundColor: `${selectedSpot.color}30` }}
                    >
                      {selectedSpot.icon}
                    </div>
                    <span className="text-chrome2 text-xs tracking-widest uppercase">Location</span>
                  </div>
                  <h2 className="text-3xl font-bold text-bone">{selectedSpot.label}</h2>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-6">
                <p className="text-haze text-sm leading-relaxed">
                  {selectedSpot.description}
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {selectedSpot.features.map((feature, i) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-3 rounded-lg bg-graphite/30 border border-line/50 hover:bg-graphite/50 transition-colors"
                    >
                      <span className="text-bone/80 text-xs font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <button className="w-full py-4 rounded-full bg-gradient-to-r from-chrome1 to-chrome2 text-void font-bold text-sm tracking-widest uppercase hover:shadow-[0_0_30px_rgba(142,197,255,0.3)] transition-shadow">
                  Explore This Location
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── OVERLAY TITLE (when not zoomed) ───────────── */}
      <AnimatePresence>
        {!isZoomed && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-8 left-8 z-20"
          >
            <h1 className="text-bone/90 text-sm tracking-[0.3em] uppercase font-light mb-1">
              Thuwal Private Island
            </h1>
            <p className="text-chrome2 text-xs tracking-widest uppercase">
              Interactive Masterplan
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── ZOOM INSTRUCTION ──────────────────────────── */}
      <AnimatePresence>
        {!isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          >
            <p className="text-haze/40 text-xs tracking-widest uppercase flex items-center gap-2">
              <MapPin className="w-3 h-3" />
              Click any location to explore
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}