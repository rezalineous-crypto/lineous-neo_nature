"use client";

import { useEffect, useRef, useState } from "react";

const VIDEO_SRC = "/intro/intro.mp4";
const STORAGE_KEY = "purura-intro-played";

type VideoIntroProps = {
  onComplete: () => void;
};

export default function VideoIntro({ onComplete }: VideoIntroProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setHasPlayed(true);
      try {
        localStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // ignore storage errors
      }
      onComplete();
    };

    const handleError = () => {
      onComplete();
    };

    video.addEventListener("ended", handleEnded);
    video.addEventListener("error", handleError);

    video.play().catch(() => {
      onComplete();
    });

    return () => {
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("error", handleError);
    };
  }, [onComplete]);

  if (hasPlayed) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-void">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        playsInline
        muted
        preload="auto"
        src={VIDEO_SRC}
      />
    </div>
  );
}
