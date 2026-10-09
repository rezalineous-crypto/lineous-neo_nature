"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";

const COOKIE_NAME = "purura_intro";
const COOKIE_MAX_AGE = 60 * 60 * 24;

type IntroGateProps = {
  /** true  -> run the intro and hold the overlay opaque
   *  false -> the server has already revealed the page; fade out */
  active: boolean;
};

export default function IntroGate({ active }: IntroGateProps) {
  const router = useRouter();

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const settledRef = useRef(false);
  const [gone, setGone] = useState(false);
  const [ready, setReady] = useState(false);
  const [videoSrc, setVideoSrc] = useState("/intro/intro.720.mp4");
  const [, startTransition] = useTransition();

  /* Pick rendition on client only (avoids hydration mismatch) */
  useEffect(() => {
    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;

    const slow =
      conn?.saveData === true ||
      conn?.effectiveType === "2g" ||
      conn?.effectiveType === "3g" ||
      conn?.effectiveType === "slow-2g";

    const small = window.innerWidth < 768;
    // Defer to avoid synchronous setState in effect (ESLint)
    window.setTimeout(() => {
      setVideoSrc(slow || small ? "/intro/intro.720.mp4" : "/intro/intro.1080.mp4");
    }, 0);
  }, []);

  useEffect(() => {
    if (active) {
      settledRef.current = false;
      // Defer state updates to avoid synchronous setState in effect
      window.setTimeout(() => {
        setGone(false);
        setReady(false);
      }, 0);
    }
  }, [active]);

  /* COMPLETE - runs on EVERY exit path (AC10, fixes D12/D11) */
  const complete = useCallback(() => {
    if (settledRef.current) return;
    settledRef.current = true;

    document.cookie =
      `${COOKIE_NAME}=1; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;

    // Signal Navbar to suppress BrandIntro on the post-refresh render
    sessionStorage.setItem("purura_suppress_brand_intro", "1");

    window.dispatchEvent(new Event("purura:intro-done"));

    // Reveal. Overlay stays opaque until the new tree commits.
    startTransition(() => {
      router.refresh();
    });
  }, [router]);

  /* WATCHDOGS (AC8, AC9) */
  useEffect(() => {
    if (!active) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      complete();
      return;
    }

    const video = videoRef.current;
    if (!video) {
      const t = window.setTimeout(() => complete(), 45_000);
      return () => window.clearTimeout(t);
    }

    let hardStopTimer = window.setTimeout(() => complete(), 45_000);

    const onMeta = () => {
      const d = Number.isFinite(video.duration) ? video.duration : 30;
      window.clearTimeout(hardStopTimer);
      hardStopTimer = window.setTimeout(() => complete(), (d + 5) * 1000);
    };

    video.addEventListener("loadedmetadata", onMeta, { once: true });

    return () => {
      window.clearTimeout(hardStopTimer);
      video.removeEventListener("loadedmetadata", onMeta);
    };
  }, [active, complete]);

  /* VIDEO LIFECYCLE */
  useEffect(() => {
    if (!active) return;
    const video = videoRef.current;
    if (!video) return;

    const onReady = () => setReady(true);
    const onEnded = () => complete();
    const onError = () => complete();

    video.addEventListener("canplay", onReady);
    video.addEventListener("ended", onEnded);
    video.addEventListener("error", onError);

    video.play().catch(() => setReady(true));

    return () => {
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("error", onError);
    };
  }, [active, complete]);

  /* SKIP - button, Esc, Space (AC7) */
  useEffect(() => {
    if (!active) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        complete();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, complete]);

  /* SCROLL LOCK (D13) */
  useEffect(() => {
    if (!active) return;

    if (!("scrollRestoration" in history)) return;
    history.scrollRestoration = "manual";

    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    if (window.scrollY !== 0) window.scrollTo(0, 0);

    return () => {
      html.style.overflow = prev;
      window.scrollTo(0, 0);
      window.requestAnimationFrame(() => window.scrollTo(0, 0));
    };
  }, [active]);

  /* CROSS-FADE - the "slick" moment.
     `active` flips to false only AFTER router.refresh() commits,
     so the home page is already painting underneath us. */
  useEffect(() => {
    if (active || gone) return;
    const t = window.setTimeout(() => setGone(true), 900);
    return () => window.clearTimeout(t);
  }, [active, gone]);

  if (gone) return null;

  return (
    <motion.div
      role="dialog"
      aria-label="Purura introduction"
      aria-modal="true"
      data-lenis-prevent
      data-intro-gate
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: "var(--color-void)", opacity: active ? 1 : 0 }}
      initial={false}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      onClick={complete}
    >
      <motion.img
        src="/intro/poster.avif"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        initial={false}
        animate={{ opacity: ready ? 0 : 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          opacity: ready ? 1 : 0,
          transition: "opacity 320ms ease-out",
        }}
        poster="/intro/poster.avif"
        preload="auto"
        autoPlay
        muted
        playsInline
        disableRemotePlayback
        src={videoSrc}
      />

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          complete();
        }}
        className="absolute bottom-6 right-6 z-10 font-mono text-[10px] uppercase tracking-[0.28em] text-bone/45 transition-colors hover:text-bone"
      >
        Skip
      </button>
    </motion.div>
  );
}