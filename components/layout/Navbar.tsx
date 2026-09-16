"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useLayoutEffect, useEffect, useRef, useState } from "react";
import Container from "./Container";
import BrandIntro from "./BrandIntro";
import VideoIntro from "@/components/intro/VideoIntro";
// import ThemeToggle from "@/components/ThemeToggle";
import GoldCTAButton from "@/components/ui/GoldCTAButton";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

const EXPERIENCE_ITEMS = [
  { label: "Lobby / Lounge", href: "/experience#lobby" },
  { label: "Villas", href: "/experience#villas" },
  { label: "Hotels", href: "/experience#hotels" },
  { label: "Nature", href: "/experience#nature" },
];

const AMENITIES_ITEMS = [
  { label: "Restaurants", href: "/amenities#restaurants" },
  { label: "Culture", href: "/amenities#culture" },
  { label: "Events", href: "/amenities#events" },
  { label: "Waterfront", href: "/amenities#waterfront" },
];

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  {
    label: "Experience",
    href: "/experience",
    hasDropdown: true,
    items: EXPERIENCE_ITEMS,
  },
  {
    label: "Amenities",
    href: "/amenities",
    hasDropdown: true,
    items: AMENITIES_ITEMS,
  },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact-us" },
];

const menuEase = [0.22, 1, 0.36, 1] as const;

export default function Navbar(): React.JSX.Element {
  const { scrollY } = useScroll();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showBrandIntro, setShowBrandIntro] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const hasMounted = useRef(false);
  const [showVideoIntro, setShowVideoIntro] = useState<boolean>(() => {
    try {
      return !sessionStorage.getItem("purura-intro-played");
    } catch {
      return false;
    }
  });

  const isHome = pathname === "/";

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setScrolled(latest > 40);
    });
  }, [scrollY]);

  /*
   * Lock the entire document while the menu is open.
   * Both html and body are locked because some browsers/layouts
   * continue scrolling through body alone.
   */
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (isOpen) {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      body.style.touchAction = "none";
    } else {
      html.style.overflow = "";
      body.style.overflow = "";
      body.style.touchAction = "";
    }

    return () => {
      html.style.overflow = "";
      body.style.overflow = "";
      body.style.touchAction = "";
    };
  }, [isOpen]);

  /*
   * Reset expanded navigation whenever the menu closes.
   * Every new opening therefore starts clean.
   */
  // useEffect(() => {
  //   if (!isOpen) {
  //     setExpandedMenu(null);
  //   }
  // }, [isOpen]);

  /*
   * Close menu with Escape.
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  /*
   * Mark component as mounted after the initial render cycle.
   */
  useEffect(() => {
    hasMounted.current = true;
  }, []);

  /*
   * Trigger BrandIntro on route changes only (not on initial mount).
   */
  useLayoutEffect(() => {
    if (!hasMounted.current) return;
    setShowBrandIntro(true);
  }, [pathname]);

  const width = useTransform(scrollY, [0, 120], ["100%", "92%"]);

  const openMenu = () => {
    setExpandedMenu(null);
    setIsOpen(true);
  };

  const closeMenu = () => {
    setExpandedMenu(null);
    setIsOpen(false);
  };

  const toggleMenuItem = (label: string) => {
    setExpandedMenu((current) => (current === label ? null : label));
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {showVideoIntro ? (
          <VideoIntro
            key="video-intro"
            onComplete={() => {
              setShowVideoIntro(false);
            }}
          />
        ) : showBrandIntro ? (
          <BrandIntro
            key={`brand-intro-${pathname}`}
            minimumDuration={3000}
            onComplete={() => setShowBrandIntro(false)}
          />
        ) : null}
      </AnimatePresence>

      {/* =========================================================
          NAVBAR
      ========================================================= */}
      <motion.header
        style={{ width }}
        initial={{ y: -120 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className={`fixed ${
          isHome ? "top-0 md:top-4" : scrolled ? "top-4" : "top-0"
        } left-1/2 -translate-x-1/2 z-[99] transition-all duration-500`}
      >
        <Container
          className={`overflow-hidden ${
            pathname === "/"
              ? scrolled
                ? "rounded-3xl bg-[var(--color-void)]/85 backdrop-blur-3xl shadow-[0_18px_60px_rgba(31,26,21,0.1)] border border-champagne/70"
                : "bg-transparent"
              : `bg-transparent  ${
                  scrolled
                    ? "rounded-3xl bg-[var(--color-void)]/85 backdrop-blur-3xl shadow-[0_18px_60px_rgba(31,26,21,0.1)] border border-champagne/70"
                    : ""
                }`
          }`}
        >
          <div
            className={`flex items-center justify-between transition-all duration-500 ${
              scrolled ? "h-20" : "h-28"
            }`}
          >
            {/* =====================================================
                LOGO
            ===================================================== */}
            <Link
              href="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group relative flex text-[var(--color-bone)] font-bold md:text-lg uppercase tracking-[0.35em]"
            >
              <span className="flex items-center transition-all duration-300">
                <span className="w-28 lg:w-36">
                  <img src="/purura-logo.png" alt="" className="" />
                </span>

                {/* <span className={`font-normal ${scrolled ? " text-black": "text-white"}`}>Purura</span> */}
              </span>

              <motion.div
                className="absolute -bottom-2 left-0 h-0.5 bg-[var(--color-champagne)]"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.35, ease: menuEase }}
              />
            </Link>

            {/* =====================================================
                RIGHT SIDE CONTROLS
            ===================================================== */}
            <div className="flex items-center gap-3 md:gap-10">
              {/* <ThemeToggle /> */}

              {/* <div className="hidden sm:block">
                <GoldCTAButton />
              </div> */}

              {/* =================================================
                  CUSTOM MENU BUTTON
                  Exact architectural three-line geometry
              ================================================= */}
              <motion.button
                type="button"
                onClick={openMenu}
                aria-label="Open navigation"
                aria-expanded={isOpen}
                whileTap={{ scale: 0.96 }}
                className="group relative flex h-7 w-[40px] cursor-pointer items-center justify-center bg-transparent"
              >
                <div
                  className="pointer-events-none relative h-8 md:h-[35px] w-[78px]"
                  style={
                    {
                      "--menu-line-color":
                        pathname === "/"
                          ? scrolled
                            ? "var(--color-bone)"
                            : "var(--color-bone)"
                          : "var(--color-bone)",
                    } as React.CSSProperties
                  }
                >
                  <motion.span
                    animate={{ x: 0, width: 40 }}
                    whileHover={{ x: 4, width: 58 }}
                    transition={{ duration: 0.55, ease: menuEase }}
                    className={`absolute left-0 top-[3px] h-0.5 origin-left ${
                      scrolled ? "bg-[var(--menu-line-color)]" : "bg-white"
                    } transition-colors duration-500 group-hover:bg-[var(--color-champagne)] scale-50 md:scale-100`}
                  />

                  <motion.span
                    animate={{ x: 0, width: 40 }}
                    whileHover={{ x: -4, width: 58 }}
                    transition={{ duration: 0.6, ease: menuEase }}
                    className={`absolute left-[-14px] top-1/2 h-px origin-center -translate-y-1/2 ${
                      scrolled ? "bg-[var(--menu-line-color)]" : "bg-white"
                    } transition-colors duration-500 group-hover:bg-[var(--color-champagne)] scale-50 md:scale-100`}
                  />

                  <motion.span
                    animate={{ x: 0, width: 40 }}
                    whileHover={{ x: 4, width: 58 }}
                    transition={{ duration: 0.55, ease: menuEase }}
                    className={`absolute bottom-[4px] left-0 h-0.5 origin-left ${
                      scrolled ? "bg-[var(--menu-line-color)]" : "bg-white"
                    } transition-colors duration-500 group-hover:bg-[var(--color-champagne)] scale-50 md:scale-100`}
                  />
                </div>
              </motion.button>
            </div>
          </div>
        </Container>
      </motion.header>

      {/* =========================================================
          FULL SCREEN MENU
      ========================================================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[200] overflow-hidden bg-[#101b10]"
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{
              duration: 0.9,
              ease: menuEase,
            }}
          >
            {/* ============================================================
          ATMOSPHERE
      ============================================================ */}

            <div className="pointer-events-none absolute inset-0 z-0">
              <div className="absolute -left-[15%] -top-[20%] h-[65vw] w-[65vw] rounded-full bg-[radial-gradient(circle,rgba(201,164,90,0.07)_0%,rgba(201,164,90,0)_65%)]" />

              <div className="absolute -right-[15%] bottom-[-25%] h-[60vw] w-[60vw] rounded-full bg-[radial-gradient(circle,rgba(158,113,80,0.07)_0%,rgba(158,113,80,0)_68%)]" />

              <div
                className="absolute inset-0 opacity-[0.018]"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='.8'/%3E%3C/svg%3E\")",
                }}
              />
            </div>

            {/* ============================================================
          TOP LINE
      ============================================================ */}

            <motion.div
              className="absolute left-0 right-0 top-[96px] z-[220] h-px bg-white/[0.09]"
              initial={{
                scaleX: 0,
                transformOrigin: "left",
              }}
              animate={{
                scaleX: 1,
              }}
              exit={{
                scaleX: 0,
              }}
              transition={{
                duration: 1.1,
                delay: 0.15,
                ease: menuEase,
              }}
            />

            {/* ============================================================
          CLOSE BUTTON
      ============================================================ */}

            <motion.button
              type="button"
              onClick={closeMenu}
              aria-label="Close navigation"
              initial={{
                opacity: 0,
                rotate: -20,
              }}
              animate={{
                opacity: 1,
                rotate: 0,
              }}
              exit={{
                opacity: 0,
                rotate: 20,
              }}
              transition={{
                duration: 0.65,
                delay: 0.25,
                ease: menuEase,
              }}
              className="group absolute right-6 top-5 z-[230] flex h-12 w-12 items-center justify-center md:right-10 md:top-6"
            >
              <span className="absolute h-px w-8 rotate-45 bg-white/80 transition-all duration-500 group-hover:w-10 group-hover:bg-[var(--color-champagne)]" />
              <span className="absolute h-px w-8 -rotate-45 bg-white/80 transition-all duration-500 group-hover:w-10 group-hover:bg-[var(--color-champagne)]" />
            </motion.button>

            {/* ============================================================
          MAIN SPLIT
      ============================================================ */}

            <div className="relative z-10 grid h-full w-full grid-cols-1 lg:grid-cols-2">
              {/* ==========================================================
            LEFT — CINEMATIC IMAGE
        ========================================================== */}

              <motion.div
                initial={{
                  opacity: 0,
                  scale: 1.08,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 1.04,
                }}
                transition={{
                  duration: 1.3,
                  ease: menuEase,
                }}
                className="relative hidden h-full overflow-hidden lg:block"
              >
                <motion.div
                  initial={{
                    scale: 1.08,
                    y: "2%",
                  }}
                  animate={{
                    scale: 1,
                    y: "0%",
                  }}
                  transition={{
                    duration: 1.8,
                    ease: menuEase,
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src="/Purura/NewImages/Overall 5.png"
                    alt="PURURA resort"
                    fill
                    priority
                    sizes="50vw"
                    className="object-cover"
                  />
                </motion.div>

                {/* Cinematic grade */}

                <div className="absolute inset-0 bg-[#071008]/20" />

                <div className="absolute inset-0 bg-gradient-to-r from-[#071008]/5 via-transparent to-[#071008]/35" />

                <div className="absolute inset-0 bg-gradient-to-t from-[#071008]/45 via-transparent to-[#071008]/10" />

                {/* Image edge */}

                <motion.div
                  initial={{
                    scaleY: 0,
                    transformOrigin: "bottom",
                  }}
                  animate={{
                    scaleY: 1,
                  }}
                  transition={{
                    duration: 1.2,
                    delay: 0.45,
                    ease: menuEase,
                  }}
                  className="absolute bottom-0 right-0 top-0 w-px bg-white/10"
                />

                {/* Minimal image marker */}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: 0.8,
                    ease: menuEase,
                  }}
                  className="absolute bottom-9 left-9 flex items-center gap-3"
                >
                  <span className="h-px w-8 bg-white/30" />

                  <span className="text-[8px] uppercase tracking-[0.35em] text-white/45">
                    01 / 01
                  </span>
                </motion.div>
              </motion.div>

              {/* ==========================================================
            RIGHT — NAVIGATION
        ========================================================== */}

              <div className="relative flex h-full min-h-0 flex-col bg-[#071307]">
                {/* Subtle right-side atmosphere */}

                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute right-[-25%] top-[5%] h-[60%] w-[75%] rounded-full bg-[radial-gradient(circle,rgba(119,144,102,0.06)_0%,rgba(119,144,102,0)_68%)]" />

                  <div className="absolute bottom-[-20%] left-[-10%] h-[55%] w-[70%] rounded-full bg-[radial-gradient(circle,rgba(201,164,90,0.035)_0%,rgba(201,164,90,0)_70%)]" />
                </div>

                {/* ========================================================
              NAVIGATION
          ======================================================== */}

                <div className="relative z-10 flex h-full flex-col px-8 pb-10 pt-32 md:px-12 lg:px-16">
                  <nav className="flex-1">
                    <div className="flex flex-col">
                      {NAV_ITEMS.map((item, index) => (
                        <motion.div
                          key={item.label}
                          initial={{
                            opacity: 0,
                            x: 35,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          transition={{
                            duration: 0.8,
                            delay: 0.3 + index * 0.075,
                            ease: menuEase,
                          }}
                        >
                          <Link
                            href={item.href}
                            onClick={closeMenu}
                            className="group relative flex w-full items-center justify-between border-b border-white/[0.09] py-5 md:py-6 [transform:translateZ(0)]"
                          >
                            {/* Number */}

                            <motion.span
                              className="absolute left-0 top-1/2 -translate-y-1/2 opacity-0"
                              variants={{
                                rest: { x: -4, opacity: 0 },
                                hover: { x: 0, opacity: 1 },
                              }}
                              initial="rest"
                              animate="rest"
                              whileHover="hover"
                              transition={{ duration: 0.4, ease: menuEase, delay: 0.02 }}
                              style={{ willChange: "transform, opacity" }}
                            >
                              <span className="block h-px w-5 bg-[var(--color-champagne)]" />
                            </motion.span>

                            {/* Main label */}

                            <motion.span
                              className={`font-display text-[clamp(2rem,3.5vw,3.5rem)] font-light leading-none tracking-[-0.045em] transition-colors duration-500 ${
                                isActive(item.href)
                                  ? "text-[var(--color-champagne)]"
                                  : "text-white/90 group-hover:text-[var(--color-champagne)]"
                              }`}
                              variants={{
                                rest: { x: 0 },
                                active: { x: 24 },
                                hover: { x: 24 },
                              }}
                              initial="rest"
                              animate={isActive(item.href) ? "active" : "rest"}
                              whileHover="hover"
                              transition={{ duration: 0.55, ease: menuEase }}
                              style={{ willChange: "transform" }}
                            >
                              {item.label}
                            </motion.span>

                            {/* Arrow */}

                            <motion.span
                              className="text-[var(--color-champagne)] opacity-0"
                              variants={{
                                rest: { x: -8, opacity: 0 },
                                hover: { x: 0, opacity: 1 },
                              }}
                              initial="rest"
                              animate="rest"
                              whileHover="hover"
                              transition={{ duration: 0.45, ease: menuEase, delay: 0.04 }}
                              style={{ willChange: "transform, opacity" }}
                            >
                              ↗
                            </motion.span>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </nav>

                  {/* ========================================================
                BOTTOM INFORMATION
            ======================================================== */}

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.8,
                      delay: 0.85,
                      ease: menuEase,
                    }}
                    className="border-t border-white/[0.09] pt-6"
                  >
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <p className="text-[8px] uppercase tracking-[0.35em] text-[var(--color-champagne)]/70">
                          Location
                        </p>

                        <p className="mt-2 text-xs leading-relaxed text-white/45">
                          Valuka
                          <br />
                          Bangladesh
                        </p>
                      </div>

                      <div>
                        <p className="text-[8px] uppercase tracking-[0.35em] text-[var(--color-champagne)]/70">
                          Contact
                        </p>

                        <p className="mt-2 text-xs text-white/45">
                          +880 1332 831207
                        </p>
                      </div>

                      <div className="hidden sm:block">
                        <p className="text-[8px] uppercase tracking-[0.35em] text-[var(--color-champagne)]/70">
                          Email
                        </p>

                        <p className="mt-2 text-xs text-white/45">
                          info@purura.com
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* ============================================================
          MOBILE NAVIGATION
      ============================================================ */}

            <div className="absolute inset-0 z-20 flex flex-col bg-[#071307] lg:hidden">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute right-[-30%] top-[20%] h-[70vw] w-[70vw] rounded-full bg-[radial-gradient(circle,rgba(119,144,102,0.08)_0%,rgba(119,144,102,0)_70%)]" />
              </div>

              <div className="relative z-10 flex h-full flex-col px-7 pb-8 pt-28 sm:px-10">
                <nav className="flex-1">
                  {NAV_ITEMS.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{
                        opacity: 0,
                        x: 25,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        duration: 0.7,
                        delay: 0.25 + index * 0.07,
                        ease: menuEase,
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className="group flex items-center justify-between border-b border-white/[0.09] py-5 [transform:translateZ(0)]"
                      >
                        <motion.span
                          className={`font-display text-[clamp(2rem,9vw,3rem)] font-light leading-none tracking-[-0.045em] transition-colors duration-500 ${
                            isActive(item.href)
                              ? "text-[var(--color-champagne)]"
                              : "text-white/90 group-hover:text-[var(--color-champagne)]"
                          }`}
                          variants={{
                            rest: { x: 0 },
                            active: { x: 16 },
                            hover: { x: 16 },
                          }}
                          initial="rest"
                          animate={isActive(item.href) ? "active" : "rest"}
                          whileHover="hover"
                          transition={{ duration: 0.5, ease: menuEase }}
                          style={{ willChange: "transform" }}
                        >
                          {item.label}
                        </motion.span>

                        <motion.span
                          className="text-[var(--color-champagne)] opacity-0"
                          variants={{
                            rest: { x: -8, opacity: 0 },
                            hover: { x: 0, opacity: 1 },
                          }}
                          initial="rest"
                          animate="rest"
                          whileHover="hover"
                          transition={{ duration: 0.4, ease: menuEase, delay: 0.03 }}
                          style={{ willChange: "transform, opacity" }}
                        >
                          ↗
                        </motion.span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: 0.75,
                    ease: menuEase,
                  }}
                  className="border-t border-white/[0.09] pt-5"
                >
                  <div className="flex justify-between gap-6">
                    <div>
                      <p className="text-[8px] uppercase tracking-[0.3em] text-[var(--color-champagne)]/70">
                        Valuka
                      </p>

                      <p className="mt-2 text-[10px] text-white/40">
                        Bangladesh
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-[8px] uppercase tracking-[0.3em] text-[var(--color-champagne)]/70">
                        Contact
                      </p>

                      <p className="mt-2 text-[10px] text-white/40">
                        +880 1332 831207
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
