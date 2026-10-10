"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import GoldCTAButton from "@/components/ui/GoldCTAButton";

const customEase = [0.16, 1, 0.3, 1] as const;

/* ─────────────────────────────────────────────
    EXPERIENCE DATA
───────────────────────────────────────────── */

const EXPERIENCE_BANNER_VIDEO =
  "https://res.cloudinary.com/ddg2qawqw/video/upload/v1790966315/Experience_Banner.mp4";
const EXPERIENCE_BANNER_POSTER = "/Purura/NewImages/Overall 5.png";

const experienceSections = [
  { title: "Accommodation" },
  { title: "The Future Of Tropical Living" },
  { title: "Hotels" },
  { title: "Augmented Nature" },
  { title: "Recreational & Future Wellness Zone" },
];

/* ─────────────────────────────────────────────
    AMENITIES DATA
───────────────────────────────────────────── */

const AMENITIES_BANNER_VIDEO =
  "https://res.cloudinary.com/ddg2qawqw/video/upload/v1790966311/Amenities_Banner.mp4";
const AMENITIES_BANNER_POSTER = "/purura_resort_images/purura_render_07.jpg";

const amenitySections = [
  { title: "MICE" },
  { title: "Next-Gen Dining" },
  { title: "Events" },
  { title: "AI concierge system" },
  { title: "Waterfront Activities" },
];

/* ─────────────────────────────────────────────
    BANNER VIDEO COMPONENT
───────────────────────────────────────────── */

function BannerVideo({
  src,
  poster,
  className = "",
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isReady, setIsReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedData, setPrefersReducedData] = useState(false);

  const inView = useInView(containerRef, { amount: 0.1 });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    const mediaQuery = window.matchMedia("(prefers-reduced-data: reduce)");
    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedData(e.matches);
    setTimeout(() => setPrefersReducedData(mediaQuery.matches), 0);
    mediaQuery.addEventListener("change", handler);

    return () => {
      window.removeEventListener("resize", checkMobile);
      mediaQuery.removeEventListener("change", handler);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || prefersReducedData) return;

    if (inView) {
      video.play().catch(() => {
        /* autoplay refused — poster stays visible */
      });
    } else {
      video.pause();
    }
  }, [inView, prefersReducedData]);

  const getPreload = () => {
    if (isMobile || prefersReducedData) return "metadata";
    return "auto";
  };

  const showVideo = isReady && !prefersReducedData;

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden bg-void ${className}`}
    >
      <motion.video
        ref={videoRef}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        autoPlay
        preload={getPreload()}
        aria-hidden="true"
        tabIndex={-1}
        disablePictureInPicture
        disableRemotePlayback
        onCanPlay={() => setIsReady(true)}
        initial={{ opacity: 0, scale: 1.035 }}
        animate={
          showVideo ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.035 }
        }
        transition={{
          opacity: { duration: 1.8, ease: customEase },
          scale: { duration: 2.8, ease: customEase },
        }}
        className="absolute inset-0 h-full w-full object-cover"
        style={prefersReducedData ? { display: "none" } : undefined}
      />

      {/* Static fallback for reduced data / restricted autoplay */}
      {!isReady || prefersReducedData ? (
        <div className="absolute inset-0">
          <Image
            src={poster}
            alt="PURURA preview"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ) : null}
    </div>
  );
}

/* ─────────────────────────────────────────────
    SECTION LIST COMPONENT
───────────────────────────────────────────── */

function SectionList({
  sections,
  className = "",
}: {
  sections: { title: string }[];
  className?: string;
}) {
  return (
    <div
      className={`rounded-[1.75rem] border border-white/15 bg-black/35 px-5 backdrop-blur-xl sm:px-7 ${className}`}
    >
      {sections.map((section, index) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{
            duration: 0.55,
            delay: index * 0.07,
            ease: customEase,
          }}
          className="group relative grid grid-cols-[2.25rem_minmax(0,1fr)] items-center gap-3 py-4 sm:py-[1.125rem] [&:not(:last-child)]:border-b [&:not(:last-child)]:border-white/12"
        >
          <span className="font-mono text-[10px] tracking-[0.12em] text-champagne/90 transition-transform duration-500 group-hover:translate-x-0.5">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-sans text-sm font-medium leading-relaxed tracking-[0.005em] text-white/90 transition-all duration-500 group-hover:translate-x-1.5 group-hover:text-champagne sm:text-base">
            {section.title}
          </h3>
          {/* hover underline */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-px left-0 h-px w-0 bg-champagne/70 transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full"
          />
        </motion.div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
    ARCH PANEL
───────────────────────────────────────────── */

type PanelKey = "amenities" | "experience";

function ArchPanel({
  panelKey,
  hovered,
  onHover,
  video,
  poster,
  index,
  heading,
  sections,
  href,
  delay = 0,
  className = "",
}: {
  panelKey: PanelKey;
  hovered: PanelKey | null;
  onHover: (key: PanelKey | null) => void;
  video: string;
  poster: string;
  index: string;
  heading: string;
  sections: { title: string }[];
  href: string;
  delay?: number;
  className?: string;
}) {
  const isActive = hovered === panelKey;
  const isDimmed = hovered !== null && !isActive;

  return (
    <motion.article
      initial={{ opacity: 0, y: 90, flexGrow: 1 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 1.3, delay, ease: customEase },
      }}
      animate={{ flexGrow: isActive ? 1.3 : 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ flexGrow: { duration: 1.1, ease: customEase } }}
      onMouseEnter={() => onHover(panelKey)}
      className={`relative isolate flex min-h-[760px] flex-col justify-between overflow-hidden rounded-t-[2rem] rounded-b-[2rem] px-5 pb-6 pt-24 ring-1 ring-white/15 sm:px-8 sm:pb-8 sm:pt-28 lg:min-h-[900px] lg:min-w-0 lg:shrink lg:basis-0 lg:rounded-t-[2rem] lg:px-10 lg:pt-36 ${className}`}
    >
      <BannerVideo src={video} poster={poster} />

      {/* Tonal overlays: dark at the head and foot, open in the middle so the footage breathes */}
      <div className="pointer-events-none absolute inset-0 bg-black/25" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/5 to-black/85" />
      <div
        className={`pointer-events-none absolute inset-0 bg-black transition-opacity duration-1000 ease-out motion-reduce:transition-none ${
          isDimmed ? "opacity-35" : "opacity-0"
        }`}
      />

      {/* Inner champagne keyline echoing the arch */}
      <div className="pointer-events-none absolute inset-3 rounded-t-[9.25rem] rounded-b-[2rem] border border-champagne/55 lg:rounded-t-[2rem]" />

      {/* Heading block */}
      <div className="relative z-10 mx-auto flex w-full max-w-lg flex-col items-center text-center">
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px w-8 bg-champagne" />
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-champagne">
            {index} / PURURA
          </span>
          <span className="h-px w-8 bg-champagne" />
        </div>

        <h2 className="font-display text-5xl font-medium leading-none tracking-[-0.035em] text-white sm:text-6xl lg:text-7xl">
          {heading}
        </h2>
      </div>

      {/* List + CTA */}
      <div className="relative z-10 mx-auto mt-16 w-full max-w-lg">
        <SectionList sections={sections} />

        <div className="mt-7 flex justify-center">
          <GoldCTAButton href={href} label="Explore" className="" />
        </div>
      </div>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────
    MAIN COMPONENT
───────────────────────────────────────────── */

export default function ExperienceAmenitiesPreview() {
  const [hovered, setHovered] = useState<PanelKey | null>(null);

  return (
    <section
      className="relative w-full overflow-hidden bg-void"
      aria-label="Experience and Amenities"
    >
      {/* Ambient champagne glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vw] w-[70vw] max-w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-champagne/[0.06] blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne/40 to-transparent"
      />

      <div className="relative z-10 mx-auto flex max-w-[1600px] flex-col gap-6 px-4 py-16 sm:px-8 lg:flex-row lg:items-start lg:gap-8 lg:px-12 lg:pb-28 lg:pt-24">
        {/* AMENITIES */}
        <ArchPanel
          panelKey="amenities"
          hovered={hovered}
          onHover={setHovered}
          video={AMENITIES_BANNER_VIDEO}
          poster={AMENITIES_BANNER_POSTER}
          index="01"
          heading="Amenities"
          sections={amenitySections}
          href="/amenities"
          delay={0}
        />

        {/* EXPERIENCE — staggered lower for an editorial, rhythmic skyline */}
        <ArchPanel
          panelKey="experience"
          hovered={hovered}
          onHover={setHovered}
          video={EXPERIENCE_BANNER_VIDEO}
          poster={EXPERIENCE_BANNER_POSTER}
          index="02"
          heading="Experience"
          sections={experienceSections}
          href="/experience"
          delay={0.15}
          className="lg:mt-24"
        />
      </div>
    </section>
  );
}
