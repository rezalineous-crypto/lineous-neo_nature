"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

const customEase: [number, number, number, number] = [0.16, 1, 0.3, 1];
const shutterEase: [number, number, number, number] = [0.62, 0, 0.78, 0.28];
const exitDuration = 1150;

type BrandIntroProps = {
  onComplete: () => void;
  minimumDuration?: number;
};

export default function BrandIntro({
  onComplete,
  minimumDuration = 3000,
}: BrandIntroProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const revealTimer = window.setTimeout(() => {
      setIsExiting(true);
    }, minimumDuration);

    const completeTimer = window.setTimeout(() => {
      onComplete();
    }, minimumDuration + exitDuration);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(completeTimer);
    };
  }, [minimumDuration, onComplete]);

  const neoLetters = "PURURA"
  // const natureLetters = "NATURE".split("");

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 1,
            y: [0, "-18%", "-115%"],
            scale: [1, 1.01, 1.03],
            filter: "blur(0px)",
          }}
          transition={{
            duration: exitDuration / 1000,
            times: [0, 0.38, 1],
            ease: shutterEase,
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{
            background:
              "radial-gradient(circle at 50% 44%, rgba(142,197,255,0.15), transparent 30%), radial-gradient(circle at 50% 70%, rgba(201,169,255,0.1), transparent 34%), var(--color-void)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: customEase }}
            className="relative flex flex-col items-center px-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.05, ease: customEase }}
              className=""
            >
              <Image
                src="/logo_light_beige.png"
                alt="Purura Logo"
                width={200}
                height={200}
                className="h-[20%] w-auto object-contain"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: customEase }}
              className="flex gap-2"
            >

                <motion.span
                  initial={{ opacity: 0, y: 90, filter: "blur(14px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 1.05,
                    delay: 0.35,
                    ease: customEase,
                  }}
                  className="text-[clamp(4.5rem,18vw,13rem)] font-bold leading-none tracking-[-0.08em] text-bone font-display"
                >
                  {neoLetters}
                </motion.span>
       
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 1.1, delay: 1.35, ease: customEase }}
              className="h-px w-32 bg-chrome1"
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.55, ease: customEase }}
              className="mt-6 text-[10px] font-semibold uppercase tracking-[0.42em] text-haze font-mono"
            >
              Regenerative Hospitality
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-line to-transparent"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
