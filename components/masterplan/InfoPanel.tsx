"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  Zap,
  Leaf,
  Users,
  Calendar,
  ChevronRight,
} from "lucide-react";
import { MasterplanLocation } from "@/lib/masterplan-locations";

interface InfoPanelProps {
  location: MasterplanLocation | null;
  isOpen: boolean;
  onClose: () => void;
  panelRef: React.RefObject<HTMLDivElement | null>;
}

const statusStyles: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  planned: { label: "Planned", color: "#C9A9FF", bg: "rgba(201,169,255,0.1)" },
  "under-construction": {
    label: "In Progress",
    color: "#C9A45A",
    bg: "rgba(201,164,90,0.1)",
  },
  completed: {
    label: "Completed",
    color: "#4a8c3f",
    bg: "rgba(74,140,63,0.1)",
  },
};

export default function InfoPanel({
  location,
  isOpen,
  onClose,
  panelRef,
}: InfoPanelProps) {
  if (!location) return null;

  const status = statusStyles[location.status] || statusStyles.planned;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, y: 30, scale: 0.95, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: 20, scale: 0.97, filter: "blur(4px)" }}
          transition={{
            type: "spring",
            damping: 28,
            stiffness: 180,
            mass: 0.8,
          }}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-[340px] md:w-[380px] max-w-[calc(100vw-2rem)] z-40"
          role="dialog"
          aria-label={`${location.title} details`}
        >
          <div
            className="relative rounded-2xl overflow-hidden border backdrop-blur-2xl"
            style={{
              backgroundColor: "rgba(10,10,12,0.85)",
              borderColor: `${location.accentColor}25`,
              boxShadow: `
                0 0 0 1px ${location.accentColor}10,
                0 20px 60px rgba(0,0,0,0.5),
                0 0 80px ${location.accentColor}10,
                inset 0 1px 0 rgba(255,255,255,0.03)
              `,
            }}
          >
            {/* Noise texture overlay */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-graphite/40 hover:bg-graphite/60 transition-colors backdrop-blur-sm border border-line/30"
              aria-label="Close panel"
            >
              <X className="w-4 h-4 text-bone/70" />
            </button>

            {/* Header */}
            <div className="relative p-6 pb-4">
              {/* Accent line */}
              <div
                className="absolute top-0 left-6 right-6 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent, ${location.accentColor}60, transparent)`,
                }}
              />

              <div className="flex items-start gap-3">
                <div
                  className="p-2.5 rounded-xl"
                  style={{ backgroundColor: `${location.accentColor}15` }}
                >
                  <MapPin
                    className="w-5 h-5"
                    style={{ color: location.accentColor }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-bone tracking-tight font-display">
                    {location.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest font-medium"
                      style={{
                        color: status.color,
                        backgroundColor: status.bg,
                        border: `1px solid ${status.color}25`,
                      }}
                    >
                      {status.label}
                    </span>
                    <span className="text-[10px] font-mono text-haze/60 tracking-wider">
                      {location.completion}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="px-6 pb-4">
              <p className="text-sm leading-relaxed text-haze/80">
                {location.description}
              </p>
            </div>

            {/* Divider */}
            <div className="mx-6 h-px bg-gradient-to-r from-transparent via-line to-transparent" />

            {/* Features Grid */}
            <div className="p-6 pb-4">
              <h4 className="text-[10px] font-mono uppercase tracking-[0.25em] text-bone/40 mb-3">
                Key Features
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {location.features.map((feature) => (
                  <div
                    key={feature.label}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-graphite/20 border border-line/20"
                  >
                    <span className="text-[10px] font-mono text-haze/60 uppercase tracking-wider">
                      {feature.label}
                    </span>
                    <span className="text-xs font-medium text-bone/80">
                      {feature.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="mx-6 h-px bg-gradient-to-r from-transparent via-line to-transparent" />

            {/* Technology */}
            <div className="p-6 pb-4">
              <div className="flex items-center gap-2 mb-3">
                <Zap
                  className="w-3 h-3"
                  style={{ color: location.accentColor }}
                />
                <h4 className="text-[10px] font-mono uppercase tracking-[0.25em] text-bone/40">
                  Technology
                </h4>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {location.technology.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 rounded-md text-[10px] font-mono text-bone/60 bg-graphite/20 border border-line/15"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Sustainability */}
            <div className="px-6 pb-4">
              <div className="flex items-center gap-2 mb-3">
                <Leaf
                  className="w-3 h-3"
                  style={{ color: location.accentColor }}
                />
                <h4 className="text-[10px] font-mono uppercase tracking-[0.25em] text-bone/40">
                  Sustainability
                </h4>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {location.sustainability.map((item) => (
                  <span
                    key={item}
                    className="px-2 py-1 rounded-md text-[10px] font-mono text-bone/60 bg-graphite/20 border border-line/15"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="mx-6 h-px bg-gradient-to-r from-transparent via-line to-transparent" />

            {/* Footer stats */}
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <Users className="w-3 h-3 text-haze/40" />
                  <span className="text-[10px] font-mono text-haze/50">
                    {location.capacity}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-haze/40" />
                  <span className="text-[10px] font-mono text-haze/50">
                    {location.completion}
                  </span>
                </div>
              </div>
              <motion.button
                whileHover={{ x: 4 }}
                className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest font-medium transition-colors"
                style={{ color: location.accentColor }}
              >
                Learn More
                <ChevronRight className="w-3 h-3" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
