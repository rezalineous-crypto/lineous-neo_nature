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
import { MenuIcon, X, ChevronDown } from "lucide-react";

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
  { label: "Invest", href: "/investment" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact-us" },
];

export default function Navbar(): React.JSX.Element {
  const { scrollY } = useScroll();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpenDropdowns, setMobileOpenDropdowns] = useState<string[]>([]);

  const isDropdownOpen = (label: string) => activeDropdown === label;

  const handleMouseEnter = (label: string, hasDropdown?: boolean) => {
    if (hasDropdown) setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const toggleMobileDropdown = (label: string) => {
    setMobileOpenDropdowns((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const isMobileDropdownOpen = (label: string) =>
    mobileOpenDropdowns.includes(label);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setScrolled(latest > 40);
    });
  }, [scrollY]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const width = useTransform(scrollY, [0, 120], ["100%", "92%"]);
  const isHome = pathname === "/";

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

      <motion.header
        style={{ width }}
        initial={{ y: -120 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className={`
          fixed
         ${isHome ? "top-0 md:top-4" : scrolled ? "top-4" : "top-0"}
          left-1/2
          -translate-x-1/2
          z-50
          transition-all
          duration-500
          ${
            pathname === "/"
              ? scrolled
                ? `
                  rounded-3xl
                  bg-[var(--color-void)]/85
                  backdrop-blur-3xl
                  shadow-[0_18px_60px_rgba(10,10,12,0.4)]
                `
                : `
                  bg-transparent
                `
              : `
                bg-[var(--color-void)]/85
                backdrop-blur-3xl
                ${
                  scrolled
                    ? "rounded-3xl shadow-[0_18px_60px_rgba(10,10,12,0.4)]"
                    : ""
                }
              `
          }
        `}
      >
        <Container>
          <div
            className={`
              flex
              items-center
              justify-between
              transition-all
              duration-500
              ${scrolled ? "h-20" : "h-28"}
            `}
          >
            <Link
              href="/"
              className="group relative text-[var(--color-bone)] font-bold md:text-lg uppercase tracking-[0.35em] flex "
            >
              <span
                className="
                  transition-all
                  duration-300
                  group-hover:text-[var(--color-chrome2)] flex items-center
                "
              >
                <span className="w-28">
                  {" "}
                  {/* <img src="/logo_light_beige.png" alt="" className="-ml-10" /> */}
                </span>
                <span className="-ml-12 font-normal">Purura</span>
              </span>

              <motion.div
                className="
                  absolute
                  -bottom-2
                  left-0
                  h-0.5
                  bg-[var(--color-chrome2)]
                "
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-1 ml-auto">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() =>
                    handleMouseEnter(item.label, item.hasDropdown)
                  }
                  onMouseLeave={handleMouseLeave}
                >
                  <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                    <div className="flex items-center gap-1 px-5">
                      <Link
                        href={item.href}
                        className={`
                          group
                          relative
                          flex
                          items-center
                          gap-1
                          overflow-hidden
                          py-2
                          text-sm
                          uppercase
                          tracking-[0.2em]
                          transition-all
                          duration-300
                          ${
                            isActive(item.href)
                              ? "border-b border-(--color-chrome2) text-[var(--color-secondary-lime)] font-semibold"
                              : "text-(--color-bone) hover:border-b hover:border-(--color-graphite) hover:text-(--color-bone)"
                          }
                        `}
                      >
                        <span className="relative z-10">{item.label}</span>
                      </Link>
                      {item.hasDropdown && (
                        <ChevronDown
                          className={`
                            w-3.5 h-3.5 transition-transform duration-300 text-(--color-bone)
                            ${isDropdownOpen(item.label) ? "rotate-180" : ""}
                          `}
                        />
                      )}
                    </div>
                  </motion.div>

                  {item.hasDropdown && item.items && (
                    <AnimatePresence>
                      {isDropdownOpen(item.label) && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute top-full left-0 mt-2 min-w-[220px] rounded-2xl bg-[var(--color-void)]/95 backdrop-blur-2xl border border-[var(--color-line)]/40 shadow-[0_12px_40px_rgba(10,10,12,0.4)] overflow-hidden z-60"
                          onMouseEnter={() =>
                            handleMouseEnter(item.label, item.hasDropdown)
                          }
                          onMouseLeave={handleMouseLeave}
                        >
                          {item.items.map((subItem, index) => (
                            <motion.div
                              key={subItem.label}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                delay: index * 0.05,
                                duration: 0.2,
                              }}
                            >
                              <Link
                                href={subItem.href}
                                className="block px-5 py-3.5 text-sm uppercase tracking-[0.2em] text-[var(--color-bone)] hover:bg-[var(--color-graphite)]/30 hover:text-[var(--color-chrome2)] transition-all duration-200"
                              >
                                {subItem.label}
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden relative w-12 h-12 flex items-center justify-center rounded-full text-[var(--color-bone)] hover:bg-[var(--color-graphite)] hover:text-[var(--color-void)] transition-colors"
              >
                <MenuIcon />
              </button>
            </div>
          </div>
        </Container>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-(--color-void)/70 backdrop-blur-md z-60 lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
              />

              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
                className="
                  fixed
                  top-0
                  right-0
                  bottom-0
                  w-[85vw]
                  max-w-100
                  bg-(--color-void)
                  border-l
                  border-(--color-line)
                  z-70
                  lg:hidden
                "
              >
                <div className="h-full flex flex-col">
                  <div className="p-8 border-b border-[var(--color-line)]/30 flex items-center justify-between">
                    <h3 className="text-[var(--color-bone)] uppercase tracking-[0.3em] text-xs">
                      Navigation
                    </h3>
                    <span
                      onClick={() => setIsOpen(false)}
                      className="text-[var(--color-bone)] cursor-pointer"
                    >
                      <X />
                    </span>
                  </div>

                  <div className="flex-1 flex flex-col justify-center px-8 bg-[var(--color-void)]">
                    {NAV_ITEMS.map((item, index) => (
                      <div key={item.label}>
                        {item.hasDropdown ? (
                          <motion.div
                            initial={{
                              opacity: 0,
                              x: 40,
                            }}
                            animate={{
                              opacity: 1,
                              x: 0,
                            }}
                            exit={{
                              opacity: 0,
                              x: 40,
                            }}
                            transition={{
                              delay: index * 0.08,
                            }}
                          >
                            <button
                              onClick={() => toggleMobileDropdown(item.label)}
                              className={`
                                flex
                                items-center
                                justify-between
                                w-full
                                text-2xl
                                py-5
                                border-b
                                border-[var(--color-line)]/20
                                ${
                                  isActive(item.href)
                                    ? "text-[var(--color-chrome2)]"
                                    : "text-[var(--color-bone)]"
                                }
                              `}
                            >
                              <span>{item.label}</span>
                              <ChevronDown
                                className={`
                                  w-5 h-5 transition-transform duration-300 text-(--color-bone)
                                  ${
                                    isMobileDropdownOpen(item.label)
                                      ? "rotate-180"
                                      : ""
                                  }
                                `}
                              />
                            </button>
                          </motion.div>
                        ) : (
                          <motion.div
                            initial={{
                              opacity: 0,
                              x: 40,
                            }}
                            animate={{
                              opacity: 1,
                              x: 0,
                            }}
                            exit={{
                              opacity: 0,
                              x: 40,
                            }}
                            transition={{
                              delay: index * 0.08,
                            }}
                          >
                            <Link
                              href={item.href}
                              onClick={() => setIsOpen(false)}
                              className={`
                                block
                                text-2xl
                                py-5
                                border-b
                                border-[var(--color-line)]/20
                                ${
                                  isActive(item.href)
                                    ? "text-[var(--color-chrome2)]"
                                    : "text-[var(--color-bone)]"
                                }
                              `}
                            >
                              {item.label}
                            </Link>
                          </motion.div>
                        )}

                        {item.hasDropdown && item.items && (
                          <AnimatePresence>
                            {isMobileDropdownOpen(item.label) && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="ml-6 mt-2 space-y-2 overflow-hidden"
                              >
                                {item.items.map((subItem) => (
                                  <Link
                                    key={subItem.label}
                                    href={subItem.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block text-lg py-2 text-[var(--color-bone)]/70 hover:text-[var(--color-chrome2)]"
                                  >
                                    {subItem.label}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
