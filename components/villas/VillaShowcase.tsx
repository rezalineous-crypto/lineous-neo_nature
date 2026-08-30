"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Container from "../layout/Container";
import { customEase } from "../home/Hero";

const villaChapters = [
  {
    number: "01",
    title: "THE APPROACH",
    subtitle: "Arrival & Setting",
    description:
      "A private drive through mature landscape leads to the villa's threshold, where architecture dissolves into nature.",
    video: "/Opt video/villa.webm",
  },
  {
    number: "02",
    title: "THE LIVING",
    subtitle: "Indoor-Outdoor Flow",
    description:
      "Expansive glass walls erase boundaries. The living space breathes with the landscape, capturing light from dawn to dusk.",
    video: "/Opt video/villa 2.webm",
  },
  {
    number: "03",
    title: "THE PRIVATE REALM",
    subtitle: "Bedrooms & Sanctuaries",
    description:
      "Each chamber is a retreat. Private terraces, curated materials, and views that frame the horizon like living art.",
    video: "/Opt video/villa 3.webm",
  },
  {
    number: "04",
    title: "THE INFINITY",
    subtitle: "Pool & Terrace",
    description:
      "An infinity pool mirrors the sky. The terrace becomes an outdoor room, extending the living space into the elements.",
    video: "/Opt video/villa-4.webm",
  },
  {
    number: "05",
    title: "THE LEGACY",
    subtitle: "Details & Craft",
    description:
      "Every joint, every material, every shadow has been considered. This is architecture as a form of poetry.",
    video: "/Opt video/villa -5.webm",
  },
];

export default function VillaShowcase() {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const isInView = useInView(sectionRef, {
    once: true,
    margin: "-100px",
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  }).scrollYProgress;

  // Auto-advance chapters when in view and playing
  useEffect(() => {
    if (!isPlaying || !isInView) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentChapter((prev) => (prev + 1) % villaChapters.length);
        setIsTransitioning(false);
      }, 600);
    }, 6000);

    return () => clearInterval(timer);
  }, [isPlaying, isInView]);

  // Handle video source change
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = villaChapters[currentChapter].video;
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [currentChapter]);

  const chapter = villaChapters[currentChapter];

  const textY = useTransform(smoothProgress, [0, 1], ["0%", "-8%"]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-void"
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* =====================================================
            CINEMATIC VIDEO BACKGROUND
            ===================================================== */}
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ y: textY }}
        >
          <div className="absolute inset-0">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              className="object-cover w-full h-full"
              style={{ opacity: isTransitioning ? 0 : 1, transition: "opacity 0.6s ease" }}
            />
            {/* Cinematic overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.4)_100%)]" />
          </div>
        </motion.div>

        {/* =====================================================
            ARCHITECTURAL GRID OVERLAY
            ===================================================== */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        {/* =====================================================
            TOP LEFT ANNOTATION
            ===================================================== */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 1.2, delay: 0.2, ease: customEase }}
          className="absolute top-8 left-6 md:top-12 md:left-12 lg:top-16 lg:left-20 z-20"
        >
          <p className="text-[20px] font-mono uppercase tracking-[0.3em] text-white/40">
            Villa Showcase
          </p>
        </motion.div>

        {/* =====================================================
            CHAPTER NAVIGATION
            ===================================================== */}
        <div className="absolute top-8 right-6 md:top-12 md:right-12 lg:top-16 lg:right-20 z-20">
          <div className="flex flex-col items-end gap-3">
            {villaChapters.map((ch, index) => (
              <button
                key={ch.number}
                onClick={() => {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setCurrentChapter(index);
                    setIsTransitioning(false);
                  }, 600);
                }}
                className="group flex items-center gap-3"
              >
                <span
                  className={`text-[10px] font-mono uppercase tracking-[0.2em] transition-all duration-500 ${
                    currentChapter === index
                      ? "text-champagne opacity-100"
                      : "text-white/30 opacity-60 group-hover:opacity-100"
                  }`}
                >
                  {ch.number}
                </span>
                <div className="relative w-8 h-px bg-white/20 overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-champagne"
                    animate={{
                      width: currentChapter === index ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.8, ease: customEase }}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* =====================================================
            MAIN CONTENT
            ===================================================== */}
        <motion.div
          style={{ y: textY }}
          className="relative z-10 h-full flex items-end"
        >
          <Container className="w-full pb-16 md:pb-24">
            <div className="max-w-5xl">
              {/* Chapter number */}
              <motion.p
                key={`number-${currentChapter}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: customEase }}
                className="text-[10px] font-mono uppercase tracking-[0.4em] text-champagne/80 mb-4"
              >
                {chapter.number} / 05
              </motion.p>

              {/* Chapter title */}
              <motion.h2
                key={`title-${currentChapter}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: customEase }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] tracking-[-0.04em] text-white font-display mb-6"
              >
                {chapter.title}
              </motion.h2>

              {/* Subtitle */}
              <motion.p
                key={`subtitle-${currentChapter}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: customEase }}
                className="text-sm md:text-base font-mono uppercase tracking-[0.3em] text-white/60 mb-6"
              >
                {chapter.subtitle}
              </motion.p>

              {/* Description */}
              <motion.p
                key={`desc-${currentChapter}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: customEase }}
                className="text-lg md:text-xl leading-relaxed text-white/70 font-display max-w-2xl"
              >
                {chapter.description}
              </motion.p>

              {/* Progress indicator */}
              <motion.div
                className="mt-12 flex items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <div className="flex items-center gap-2">
                  {villaChapters.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setIsTransitioning(true);
                        setTimeout(() => {
                          setCurrentChapter(index);
                          setIsTransitioning(false);
                        }, 600);
                      }}
                      className={`h-px transition-all duration-500 ${
                        index === currentChapter
                          ? "w-12 bg-champagne"
                          : index < currentChapter
                            ? "w-8 bg-white/40"
                            : "w-8 bg-white/15"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">
                  {String(currentChapter + 1).padStart(2, "0")} / 05
                </span>
              </motion.div>
            </div>
          </Container>
        </motion.div>

        {/* =====================================================
            BOTTOM ARCHITECTURAL LINE
            ===================================================== */}
        <div className="absolute bottom-0 inset-x-0 h-px bg-white/10 z-20" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none" />

        {/* =====================================================
            PLAY/PAUSE INDICATOR
            ===================================================== */}
        <motion.button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute bottom-8 right-6 md:right-12 lg:right-20 z-20 flex items-center gap-3 group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          whileHover={{ opacity: 1 }}
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/60">
            {isPlaying ? "Pause" : "Play"}
          </span>
          <div className="w-8 h-px bg-white/30 group-hover:bg-white/60 transition-colors" />
        </motion.button>
      </div>
    </section>
  );
}
