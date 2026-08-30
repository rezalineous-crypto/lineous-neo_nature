"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";
import Container from "./Container";
import BrandIntro from "./BrandIntro";
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
  const [isLoading, setIsLoading] = useState(true);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

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
      <AnimatePresence>
        {isLoading && (
          <BrandIntro
            minimumDuration={3000}
            onComplete={() => setIsLoading(false)}
          />
        )}
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
            className="fixed inset-0 z-[200] overflow-hidden bg-charcoal"
            initial={{ x: "100%", opacity: 0.8 }}
            animate={{ x: "0%", opacity: 1 }}
            exit={{ x: "100%", opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: menuEase,
            }}
          >
            {/* ============================================================
          ATMOSPHERE
      ============================================================ */}

            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-[10%] -top-[15%] h-[55vw] w-[55vw] rounded-full bg-[radial-gradient(circle,rgba(201,164,90,0.08)_0%,rgba(201,164,90,0)_68%)]" />

              <div className="absolute -right-[10%] top-[20%] h-[45vw] w-[45vw] rounded-full bg-[radial-gradient(circle,rgba(201,164,90,0.05)_0%,rgba(201,164,90,0)_68%)]" />

              <div className="absolute bottom-[-20%] left-[35%] h-[50vw] w-[50vw] rounded-full bg-[radial-gradient(circle,rgba(158,113,80,0.06)_0%,rgba(158,113,80,0)_70%)]" />
            </div>

            {/* ============================================================
          TOP ARCHITECTURAL LINE
      ============================================================ */}

            <motion.div
              className="absolute left-0 right-0 top-[96px] z-[210] h-px bg-bone/10"
              initial={{ scaleX: 0, transformOrigin: "left" }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: menuEase }}
            />

            {/* ============================================================
          TOP LABEL
      ============================================================ */}

            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6, delay: 0.25, ease: menuEase }}
              className="absolute left-8 top-7 z-[220] md:left-12 md:top-8"
            >
              <p className="text-[9px] uppercase tracking-[0.45em] text-bone/45">
                PURURA / NAVIGATION
              </p>
            </motion.div>

            {/* ============================================================
          CLOSE
      ============================================================ */}

            <motion.button
              type="button"
              onClick={closeMenu}
              aria-label="Close navigation"
              initial={{ opacity: 0, rotate: -15 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 15 }}
              transition={{ duration: 0.6, delay: 0.3, ease: menuEase }}
              className="absolute right-6 top-5 z-[230] flex h-12 w-12 items-center justify-center md:right-10 md:top-6"
            >
              <span className="absolute h-px w-8 rotate-45 bg-bone/70 transition-all duration-500 hover:w-10" />
              <span className="absolute h-px w-8 -rotate-45 bg-bone/70 transition-all duration-500 hover:w-10" />
            </motion.button>

            {/* ============================================================
          MAIN SPLIT
      ============================================================ */}

            <div className="relative z-10 grid h-full w-full grid-cols-1 lg:grid-cols-3">
              {/* ==========================================================
            LEFT — FULL HEIGHT IMAGE / 50%
        ========================================================== */}

              <motion.div
                initial={{ opacity: 0, scale: 1.035 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.035 }}
                transition={{ duration: 1.15, ease: menuEase }}
                className="relative hidden h-full overflow-hidden lg:block"
              >
                <Image
                  src="/purura_resort_images/purura_render_03.jpg"
                  alt="PURURA resort interior"
                  fill
                  priority
                  className="object-cover"
                  sizes="50vw"
                />

                {/* Cinematic image treatment */}
                <div className="absolute inset-0 bg-charcoal/10" />

                <div className="absolute inset-0 bg-gradient-to-r from-charcoal/5 via-transparent to-charcoal/20" />

                {/* ========================================================
              GOLD ARCHITECTURAL LINE
          ======================================================== */}

                {/* <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 1.3,
                    delay: 0.35,
                    ease: menuEase,
                  }}
                  className="absolute left-0 right-[-100%] top-[32%] h-px origin-left bg-[var(--color-champagne)]/65"
                /> */}

                {/* Small point on architectural line */}
                {/* <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 1.1,
                    ease: menuEase,
                  }}
                  className="absolute left-[17%] top-[calc(32%-3px)] h-[7px] w-[7px] rounded-full bg-[var(--color-champagne)]"
                /> */}

                {/* Image metadata */}
                {/* <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.7,
                    ease: menuEase,
                  }}
                  className="absolute bottom-10 left-10"
                >
                  <p className="text-[9px] uppercase tracking-[0.45em] text-bone/55">
                    PURURA / VALUKA
                  </p>

                  <p className="mt-3 max-w-xs font-display text-2xl font-light leading-tight text-bone/90">
                    A different kind
                    <br />
                    of escape.
                  </p>
                </motion.div> */}

                {/* Vertical architectural marker */}
                <div className="absolute bottom-10 right-8 flex items-center gap-3">
                  <span className="h-px w-8 bg-bone/25" />
                  <span className="text-[8px] uppercase tracking-[0.35em] text-bone/35">
                    01 / 01
                  </span>
                </div>
              </motion.div>

              {/* ==========================================================
            RIGHT — NAVIGATION / 50%
        ========================================================== */}

              <div className="relative flex h-full min-h-0 flex-col bg-charcoal col-span-2">
                {/* Additional subtle atmosphere */}
                {/* <div className="pointer-events-none absolute inset-0">
                  <div className="absolute right-[-15%] top-[5%] h-[45%] w-[70%] rounded-full bg-[radial-gradient(circle,rgba(125,151,110,0.075)_0%,rgba(125,151,110,0)_70%)]" />

                  <div className="absolute bottom-[-20%] left-[5%] h-[50%] w-[80%] rounded-full bg-[radial-gradient(circle,rgba(194,167,93,0.035)_0%,rgba(194,167,93,0)_70%)]" />
                </div> */}

                {/* ========================================================
              NAVIGATION
          ======================================================== */}

                <div className="relative z-10 flex h-full flex-col px-8 pb-10 pt-32 md:px-12 lg:px-16 border w-full">
                  <nav className="flex-1">
                    <div className="grid grid-cols-1 gap-x-10 gap-y-2 md:grid-cols-2">
                      {NAV_ITEMS.map((item, index) => {
                        const isExpanded = expandedMenu === item.label;

                        return (
                          <motion.div
                            key={item.label}
                            initial={{ opacity: 0, x: 25 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              duration: 0.7,
                              delay: 0.35 + index * 0.06,
                              ease: menuEase,
                            }}
                            className="relative"
                          >
                            {/* ==================================================
                          PARENT
                      ================================================== */}

                            {item.hasDropdown ? (
                              <button
                                type="button"
                                onClick={() => toggleMenuItem(item.label)}
                                aria-expanded={isExpanded}
                                className="group flex w-full items-center justify-between border-b border-white/10 py-4 text-left transition-colors duration-500 hover:border-champagne/45 md:py-5"
                              >
                                <span
                                  className={`font-display text-[clamp(1.8rem,3.2vw,3.2rem)] font-light leading-none tracking-[-0.035em] transition-all duration-500 ${
                                    isExpanded
                                      ? "text-[var(--color-champagne)]"
                                      : "text-white/90 group-hover:text-[var(--color-champagne)]"
                                  }`}
                                >
                                  {item.label}
                                </span>

                                <motion.span
                                  animate={{
                                    rotate: isExpanded ? 180 : 0,
                                    opacity: isExpanded ? 1 : 0.35,
                                  }}
                                  transition={{
                                    duration: 0.4,
                                    ease: menuEase,
                                  }}
                                  className="text-[var(--color-champagne)]"
                                >
                                  <ChevronDown
                                    className="h-4 w-4"
                                    strokeWidth={1}
                                  />
                                </motion.span>
                              </button>
                            ) : (
                              <Link
                                href={item.href}
                                onClick={closeMenu}
                                className="group flex w-full items-center justify-between border-b border-white/10 py-4 transition-all duration-500 hover:border-[var(--color-champagne)]/45 md:py-5"
                              >
                                <span
                                  className={`font-display text-[clamp(1.8rem,3.2vw,3.2rem)] font-light leading-none tracking-[-0.035em] transition-all duration-500 ${
                                    isActive(item.href)
                                      ? "text-[var(--color-champagne)]"
                                      : "text-white/90 group-hover:text-[var(--color-champagne)]"
                                  }`}
                                >
                                  {item.label}
                                </span>

                                <span className="translate-x-[-4px] text-[var(--color-champagne)] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                                  ↗
                                </span>
                              </Link>
                            )}

                            {/* ==================================================
                          CHILDREN

                          IMPORTANT:
                          Absolute positioning means opening this menu
                          NEVER changes the position of other items.
                      ================================================== */}

                            <AnimatePresence initial={false}>
                              {item.hasDropdown && item.items && isExpanded && (
                                <motion.div
                                  initial={{
                                    opacity: 0,
                                    height: 0,
                                  }}
                                  animate={{
                                    opacity: 1,
                                    height: "auto",
                                  }}
                                  exit={{
                                    opacity: 0,
                                    height: 0,
                                  }}
                                  transition={{
                                    duration: 0.4,
                                    ease: menuEase,
                                  }}
                                  className="absolute left-0 top-full z-[40] w-[calc(100%+2rem)] overflow-hidden"
                                >
                                  <div className="border-b border-[var(--color-champagne)]/25 bg-charcoal/95 px-1 py-4 backdrop-blur-md">
                                    {item.items.map((subItem, subIndex) => (
                                      <motion.div
                                        key={subItem.label}
                                        initial={{
                                          opacity: 0,
                                          x: -12,
                                        }}
                                        animate={{
                                          opacity: 1,
                                          x: 0,
                                        }}
                                        exit={{
                                          opacity: 0,
                                          x: -12,
                                        }}
                                        transition={{
                                          duration: 0.3,
                                          delay: subIndex * 0.045,
                                          ease: menuEase,
                                        }}
                                      >
                                        <Link
                                          href={subItem.href}
                                          onClick={closeMenu}
                                          className="group/sub flex items-center gap-3 px-4 py-2.5 text-[9px] uppercase tracking-[0.22em] text-bone/45 transition-colors duration-300 hover:text-[var(--color-champagne)]"
                                        >
                                          <span className="h-px w-0 bg-[var(--color-champagne)] transition-all duration-300 group-hover/sub:w-5" />
                                          {subItem.label}
                                        </Link>
                                      </motion.div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        );
                      })}
                    </div>
                  </nav>

                  {/* ========================================================
                BOTTOM CONTACT / META
            ======================================================== */}

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.85,
                      ease: menuEase,
                    }}
                    className="mt-10 border-t border-bone/10 pt-6"
                  >
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                      <div>
                        <p className="text-[8px] uppercase tracking-[0.3em] text-[var(--color-champagne)]/55">
                          Location
                        </p>
                        <p className="mt-2 text-xs leading-relaxed text-bone/50">
                          Valuka
                          <br />
                          Bangladesh
                        </p>
                      </div>

                      <div>
                        <p className="text-[8px] uppercase tracking-[0.3em] text-[var(--color-champagne)]/55">
                          Contact
                        </p>
                        <p className="mt-2 text-xs leading-relaxed text-bone/50">
                          +880 1332 831207
                        </p>
                      </div>

                      <div className="hidden md:block">
                        <p className="text-[8px] uppercase tracking-[0.3em] text-[var(--color-champagne)]/55">
                          Email
                        </p>
                        <p className="mt-2 text-xs leading-relaxed text-bone/50">
                          info@purura.com
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
