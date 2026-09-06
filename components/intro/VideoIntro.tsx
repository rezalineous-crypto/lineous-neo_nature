"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const VIDEO_SRC = "/intro/intro.mp4";
const STORAGE_KEY = "purura-intro-played";

type VideoIntroProps = {
  onComplete: () => void;
};

export default function VideoIntro({ onComplete }: VideoIntroProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const controls = useAnimation();

  const customEase = [0.16, 1, 0.3, 1] as const;

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.8, ease: customEase },
  };

  const fadeOut = {
    exit: { opacity: 0 },
    transition: { duration: 0.6, ease: customEase },
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setIsVideoReady(true);
      video.play().catch(() => {
        onComplete();
      });
    };

    const handleEnded = () => {
      controls.start(fadeOut.exit).then(() => {
        try {
          localStorage.setItem(STORAGE_KEY, "1");
        } catch {
          // ignore storage errors
        }
        onComplete();
      });
    };

    const handleError = () => {
      onComplete();
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("error", handleError);

    if (video.readyState >= 3) {
      setIsVideoReady(true);
      video.play().catch(() => {
        onComplete();
      });
    }

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("error", handleError);
    };
  }, [controls, onComplete]);

  return (
    <motion.div
      {...fadeIn}
      exit={fadeOut.exit}
      transition={fadeOut.transition}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-void overflow-hidden"
    >
      {!isVideoReady && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-void"
        >
          <div className="h-10 w-10 sm:h-8 sm:w-8 animate-pulse rounded-full bg-champagne/20" />
        </motion.div>
      )}
      <video
        ref={videoRef}
        className={`h-full w-full object-cover object-center transition-opacity duration-500 ${
          isVideoReady ? "opacity-100" : "opacity-0"
        }`}
        playsInline
        muted
        preload="auto"
        disableRemotePlayback
        src={VIDEO_SRC}
      />
    </motion.div>
  );
}
