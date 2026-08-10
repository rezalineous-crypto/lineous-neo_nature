"use client";

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";

interface HotspotProps {
  x: number;
  y: number;
  accentColor: string;
  label: string;
  isActive: boolean;
  isDimmed: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}

export default function Hotspot({
  x,
  y,
  accentColor,
  label,
  isActive,
  isDimmed,
  onActivate,
  onDeactivate,
}: HotspotProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Subtle floating motion
  const floatY = useMotionValue(0);
  const springY = useSpring(floatY, { damping: 20, stiffness: 100 });
  const floatX = useMotionValue(0);
  const springX = useSpring(floatX, { damping: 20, stiffness: 100 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      floatX.set(dx * 6);
      floatY.set(dy * 6);
    },
    [floatX, floatY]
  );

  const handleMouseLeave = useCallback(() => {
    floatX.set(0);
    floatY.set(0);
    setIsHovered(false);
    onDeactivate();
  }, [floatX, floatY, onDeactivate]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    onActivate();
  }, [onActivate]);

  // Scale based on hover/active state
  const scale = isHovered || isActive ? 1.25 : 1;

  // Opacity based on dimmed state
  const opacity = isDimmed ? 0.35 : 1;

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        x: springX,
        y: springY,
        scale,
        opacity,
        zIndex: isActive ? 30 : 10,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      role="button"
      tabIndex={0}
      aria-label={`${label} location marker`}
      aria-expanded={isActive}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (isActive) onDeactivate();
          else onActivate();
        }
        if (e.key === "Escape" && isActive) onDeactivate();
      }}
    >
      {/* Soft shadow beneath */}
      <div
        className="absolute left-1/2 -translate-x-1/2 -bottom-3 w-10 h-2 rounded-full blur-md"
        style={{ backgroundColor: `${accentColor}30` }}
      />

      {/* Outer rotating ring */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full"
        style={{
          border: `1.5px solid ${accentColor}40`,
          boxShadow: `0 0 18px ${accentColor}25, inset 0 0 18px ${accentColor}15`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* Secondary counter-rotating ring */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full"
        style={{
          border: `1px dashed ${accentColor}30`,
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />

      {/* Pulse ring */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full"
        style={{ border: `1px solid ${accentColor}50` }}
        animate={{
          scale: [1, 1.8, 1],
          opacity: [0.6, 0, 0.6],
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Core dot */}
      <motion.div
        className="relative flex items-center justify-center w-5 h-5 rounded-full"
        style={{
          backgroundColor: accentColor,
          boxShadow: `0 0 20px ${accentColor}, 0 0 40px ${accentColor}50, 0 0 60px ${accentColor}25`,
        }}
        animate={{
          boxShadow: isActive
            ? `0 0 30px ${accentColor}, 0 0 60px ${accentColor}70, 0 0 90px ${accentColor}35`
            : `0 0 20px ${accentColor}, 0 0 40px ${accentColor}50, 0 0 60px ${accentColor}25`,
        }}
        transition={{ duration: 0.4 }}
      >
        {/* Inner bright core */}
        <div className="w-2 h-2 rounded-full bg-bone" />
      </motion.div>

      {/* Sparkle particles around core */}
      {isActive && (
        <>
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.span
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{ backgroundColor: accentColor }}
              animate={{
                x: [0, Math.cos((i * 72 * Math.PI) / 180) * 14],
                y: [0, Math.sin((i * 72 * Math.PI) / 180) * 14],
                opacity: [0.8, 0],
                scale: [1, 0],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeOut",
              }}
            />
          ))}
        </>
      )}

      {/* Label on hover/active */}
      <AnimatePresence>
        {(isHovered || isActive) && (
          <motion.div
            initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 6, filter: "blur(4px)" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute left-1/2 -translate-x-1/2 -top-10 whitespace-nowrap"
          >
            <span
              className="px-3 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-[0.2em] font-medium backdrop-blur-xl border"
              style={{
                color: accentColor,
                backgroundColor: `${accentColor}15`,
                borderColor: `${accentColor}30`,
                boxShadow: `0 4px 20px ${accentColor}20`,
              }}
            >
              {label}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
