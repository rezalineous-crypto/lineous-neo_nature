"use client";

import { useMemo } from "react";

interface Particle {
  id: number;
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface ParticlesProps {
  count?: number;
  className?: string;
}

// Deterministic pseudo-random using a simple hash so values are stable across renders
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

export default function Particles({ count = 35, className = "" }: ParticlesProps) {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: count }, (_, i) => {
      const r1 = seededRandom(i * 1.1);
      const r2 = seededRandom(i * 2.3 + 7);
      const r3 = seededRandom(i * 3.7 + 13);
      const r4 = seededRandom(i * 5.1 + 23);
      const r5 = seededRandom(i * 7.9 + 31);
      const r6 = seededRandom(i * 11.3 + 41);

      return {
        id: i,
        left: `${(r1 * 100).toFixed(2)}%`,
        top: `${(r2 * 100).toFixed(2)}%`,
        size: Math.round(r3 * 2 + 1),
        duration: Math.round(r4 * 8 + 6),
        delay: Math.round(r5 * 5),
        opacity: Math.round(r6 * 0.4 + 0.1),
      };
    });
  }, [count]);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-bone"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animation: `particle-float ${p.duration}s ease-in-out ${p.delay}s infinite`,
            willChange: "transform, opacity",
          }}
        />
      ))}
      <style jsx>{`
        @keyframes particle-float {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
            opacity: var(--particle-opacity, 0.2);
          }
          25% {
            transform: translate3d(12px, -18px, 0) scale(1.4);
            opacity: calc(var(--particle-opacity, 0.2) * 1.6);
          }
          50% {
            transform: translate3d(-8px, -32px, 0) scale(0.8);
            opacity: calc(var(--particle-opacity, 0.2) * 0.6);
          }
          75% {
            transform: translate3d(16px, -12px, 0) scale(1.2);
            opacity: calc(var(--particle-opacity, 0.2) * 1.3);
          }
        }
      `}</style>
    </div>
  );
}
