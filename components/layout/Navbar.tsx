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
import ThemeToggle from "@/components/ThemeToggle";
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
        } left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ${
          pathname === "/"
            ? scrolled
              ? "rounded-3xl bg-[var(--color-void)]/85 backdrop-blur-3xl shadow-[0_18px_60px_rgba(10,10,12,0.4)]"
              : "bg-transparent"
            : `bg-[var(--color-void)]/85 backdrop-blur-3xl ${
                scrolled
                  ? "rounded-3xl shadow-[0_18px_60px_rgba(10,10,12,0.4)]"
                  : ""
              }`
        }`}
      >
        <Container>
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
              <span className="flex items-center transition-all duration-300 group-hover:text-[var(--color-chrome2)]">
                <span className="w-28">
                  {/* <img src="/logo_light_beige.png" alt="" className="-ml-10" /> */}
                </span>

                <span className="-ml-12 font-normal">Purura</span>
              </span>

              <motion.div
                className="absolute -bottom-2 left-0 h-0.5 bg-[var(--color-chrome2)]"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.35, ease: menuEase }}
              />
            </Link>

            {/* =====================================================
                RIGHT SIDE CONTROLS
            ===================================================== */}
            <div className="flex items-center gap-3 md:gap-5">
              <ThemeToggle />

              <div className="hidden sm:block">
                <GoldCTAButton />
              </div>

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
                className="group relative flex h-12 w-[82px] items-center justify-center"
              >
                <div className="relative h-[42px] w-[78px]">
                  <motion.span
                    className="absolute left-0 top-[4px] h-px w-[80px] bg-[var(--color-bone)]"
                    initial={false}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.45, ease: menuEase }}
                  />

                  <motion.span
                    className="absolute left-[-14px] top-1/2 h-px w-[80px] -translate-y-1/2 bg-[var(--color-bone)]"
                    initial={false}
                    whileHover={{ x: -4 }}
                    transition={{ duration: 0.45, ease: menuEase }}
                  />

                  <motion.span
                    className="absolute left-0 bottom-[4px] h-px w-[80px] bg-[var(--color-bone)]"
                    initial={false}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.45, ease: menuEase }}
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
            className="fixed inset-0 z-[200] overflow-hidden bg-[var(--color-void)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: menuEase }}
          >
            {/* ===================================================
                BACKDROP / ATMOSPHERIC LAYER
            =================================================== */}
            <motion.div
              className="absolute inset-0 bg-[radial-gradient(circle_at_65%_35%,rgba(201,164,90,0.08),transparent_32%),radial-gradient(circle_at_20%_80%,rgba(255,255,255,0.025),transparent_35%)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            />

            {/* ===================================================
                SUBTLE ARCHITECTURAL LINE
            =================================================== */}
            <motion.div
              className="absolute left-0 right-0 top-[112px] h-px bg-[var(--color-bone)]/10"
              initial={{ scaleX: 0, transformOrigin: "left" }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 1, delay: 0.25, ease: menuEase }}
            />

            {/* ===================================================
                TOP LABEL
            =================================================== */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6, delay: 0.3, ease: menuEase }}
              className="absolute left-8 top-8 md:left-12 md:top-10"
            >
              <p className="text-[10px] uppercase tracking-[0.4em] text-[var(--color-bone)]/45">
                PURURA / NAVIGATION
              </p>
            </motion.div>

            {/* ===================================================
                CLOSE BUTTON
                Lives INSIDE the menu, not the navbar.
            =================================================== */}
            <motion.button
              type="button"
              onClick={closeMenu}
              aria-label="Close navigation"
              initial={{ opacity: 0, rotate: -20 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 20 }}
              transition={{ duration: 0.6, delay: 0.35, ease: menuEase }}
              className="absolute right-8 top-8 z-[220] flex h-12 w-12 items-center justify-center md:right-12 md:top-8"
            >
              <span className="absolute h-px w-8 rotate-45 bg-[var(--color-bone)]/75 transition-all duration-500 hover:w-10" />
              <span className="absolute h-px w-8 -rotate-45 bg-[var(--color-bone)]/75 transition-all duration-500 hover:w-10" />
            </motion.button>

            {/* ===================================================
                MENU CONTENT
            =================================================== */}
            <div className="relative z-10 flex h-full w-full flex-col">
              <div className="flex flex-1 items-center px-8 pb-16 pt-32 md:px-16 lg:px-24">
                <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
                  {/* =================================================
                      LEFT EDITORIAL PANEL
                  ================================================= */}
                  {/* LEFT IMAGE PANEL */}
                  <motion.div
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 1.1, ease: menuEase }}
                    className="relative hidden h-full min-h-[620px] overflow-hidden lg:block"
                  >
                    <Image
                      src="/purura_resort_images/purura_render_03.jpg"
                      alt="PURURA resort interior"
                      fill
                      priority
                      className="object-cover"
                      sizes="45vw"
                    />

                    {/* Image darkening */}
                    <div className="absolute inset-0 bg-black/10" />

                    {/* Gold architectural line */}
                    <motion.div
                      initial={{ scaleX: 0, transformOrigin: "left" }}
                      animate={{ scaleX: 1 }}
                      transition={{
                        duration: 1.2,
                        delay: 0.35,
                        ease: menuEase,
                      }}
                      className="absolute left-0 right-[-100%] top-[34%] h-px bg-[var(--color-chrome2)]/70"
                    />

                    {/* Image label */}
                    <div className="absolute bottom-10 left-10">
                      <p className="text-[9px] uppercase tracking-[0.4em] text-white/60">
                        PURURA / VALUKA
                      </p>

                      <p className="mt-2 font-display text-2xl font-light text-white">
                        A different kind of escape.
                      </p>
                    </div>
                  </motion.div>

                  {/* =================================================
                      NAVIGATION
                  ================================================= */}
                  <nav className="flex flex-col justify-center">
                    {/* <div className="mb-8 flex items-center gap-4">
                      <span className="h-px w-8 bg-[var(--color-chrome2)]/60" />

                      <p className="text-[10px] uppercase tracking-[0.4em] text-[var(--color-bone)]/40">
                        Explore
                      </p>
                    </div> */}

                    <div className="grid grid-cols-1 gap-x-16 gap-y-3 md:grid-cols-2">
                      {NAV_ITEMS.map((item, index) => {
                        const isExpanded = expandedMenu === item.label;

                        return (
                          <motion.div
                            key={item.label}
                            initial={{ opacity: 0, x: 35 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 35 }}
                            transition={{
                              duration: 0.75,
                              delay: 0.48 + index * 0.07,
                              ease: menuEase,
                            }}
                            className={`group relative ${
                              isExpanded ? "md:col-span-2" : ""
                            }`}
                            onMouseEnter={() => {
                              if (item.hasDropdown) {
                                setExpandedMenu(item.label);
                              }
                            }}
                            onMouseLeave={() => {
                              if (item.hasDropdown) {
                                setExpandedMenu((current) =>
                                  current === item.label ? null : current
                                );
                              }
                            }}
                          >
                            {/* =================================================
                                PARENT
                            ================================================= */}
                            <div className="flex items-center">
                              {item.hasDropdown ? (
                                <button
                                  type="button"
                                  onClick={() => toggleMenuItem(item.label)}
                                  className={`group/link flex w-full items-center justify-between border-b py-5 text-left transition-all duration-500 ${
                                    isExpanded
                                      ? "border-[var(--color-chrome2)]/50"
                                      : "border-[var(--color-bone)]/10"
                                  }`}
                                >
                                  <span
                                    className={`font-display text-[clamp(2rem,4vw,4rem)] font-light leading-none tracking-[-0.035em] transition-colors duration-500 ${
                                      isActive(item.href)
                                        ? "text-[var(--color-chrome2)]"
                                        : "text-[var(--color-bone)] hover:text-[var(--color-chrome2)]"
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
                                      duration: 0.45,
                                      ease: menuEase,
                                    }}
                                  >
                                    <ChevronDown
                                      className="h-5 w-5"
                                      strokeWidth={1}
                                    />
                                  </motion.span>
                                </button>
                              ) : (
                                <Link
                                  href={item.href}
                                  onClick={closeMenu}
                                  className={`group/link flex w-full items-center justify-between border-b py-5 transition-all duration-500 ${
                                    isActive(item.href)
                                      ? "border-[var(--color-chrome2)]/50"
                                      : "border-[var(--color-bone)]/10 hover:border-[var(--color-chrome2)]/50"
                                  }`}
                                >
                                  <span
                                    className={`font-display text-[clamp(2rem,4vw,4rem)] font-light leading-none tracking-[-0.035em] transition-colors duration-500 ${
                                      isActive(item.href)
                                        ? "text-[var(--color-chrome2)]"
                                        : "text-[var(--color-bone)] group-hover/link:text-[var(--color-chrome2)]"
                                    }`}
                                  >
                                    {item.label}
                                  </span>

                                  <motion.span
                                    initial={{ opacity: 0, x: -8 }}
                                    whileHover={{ opacity: 1, x: 0 }}
                                    className="text-[var(--color-chrome2)]"
                                  >
                                    ↗
                                  </motion.span>
                                </Link>
                              )}
                            </div>

                            {/* =================================================
                                CHILDREN
                            ================================================= */}
                            <AnimatePresence initial={false}>
                              {item.hasDropdown && item.items && isExpanded && (
                                <motion.div
                                  initial={{
                                    height: 0,
                                    opacity: 0,
                                    y: -8,
                                  }}
                                  animate={{
                                    height: "auto",
                                    opacity: 1,
                                    y: 0,
                                  }}
                                  exit={{
                                    height: 0,
                                    opacity: 0,
                                    y: -8,
                                  }}
                                  transition={{
                                    duration: 0.45,
                                    ease: menuEase,
                                  }}
                                  className="overflow-hidden"
                                >
                                  <div className="flex flex-wrap gap-x-8 gap-y-3 py-5 pl-1 md:gap-x-12">
                                    {item.items.map((subItem, subIndex) => (
                                      <motion.div
                                        key={subItem.label}
                                        initial={{
                                          opacity: 0,
                                          x: -15,
                                        }}
                                        animate={{
                                          opacity: 1,
                                          x: 0,
                                        }}
                                        exit={{
                                          opacity: 0,
                                          x: -15,
                                        }}
                                        transition={{
                                          duration: 0.35,
                                          delay: subIndex * 0.05,
                                          ease: menuEase,
                                        }}
                                      >
                                        <Link
                                          href={subItem.href}
                                          onClick={closeMenu}
                                          className="group/sub flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-[var(--color-bone)]/40 transition-colors duration-300 hover:text-[var(--color-chrome2)]"
                                        >
                                          <span className="h-px w-0 bg-[var(--color-chrome2)] transition-all duration-300 group-hover/sub:w-5" />

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
                </div>
              </div>

              {/* =====================================================
                  BOTTOM META
              ===================================================== */}
              {/* <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{
                  duration: 0.7,
                  delay: 0.75,
                  ease: menuEase,
                }}
                className="flex items-end justify-between border-t border-[var(--color-bone)]/10 px-8 py-6 md:px-16 lg:px-24"
              >
                <div className="flex items-center gap-4">
                  <span className="h-px w-8 bg-[var(--color-chrome2)]/50" />

                  <span className="text-[9px] uppercase tracking-[0.3em] text-[var(--color-bone)]/30">
                    PURURA
                  </span>
                </div>

                <div className="hidden items-center gap-8 md:flex">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-[var(--color-bone)]/25">
                    VALUKA
                  </span>

                  <span className="text-[9px] uppercase tracking-[0.3em] text-[var(--color-bone)]/25">
                    BANGLADESH
                  </span>

                  <span className="text-[9px] uppercase tracking-[0.3em] text-[var(--color-bone)]/25">
                    2026
                  </span>
                </div>
              </motion.div> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
