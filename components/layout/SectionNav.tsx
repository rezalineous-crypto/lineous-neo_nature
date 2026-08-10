"use client";

import { useLenis } from "lenis/react";
import { useTheme } from "@/components/ThemeProvider";
import { useEffect, useRef, useState, useCallback } from "react";

interface NavItem {
  label: string;
  href: string;
}

interface SectionNavProps {
  items: NavItem[];
}

export default function SectionNav({ items }: SectionNavProps) {
  const lenis = useLenis();
  const { theme } = useTheme();

  const [activeIndex, setActiveIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isIdle, setIsIdle] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const hoverGraceTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const observerRef = useRef<IntersectionObserver | null>(null);

  const isDark = theme === "dark";

  // --- Entrance Animation ---
  useEffect(() => {
    // Delay entrance to let hero sequence complete (~2.5s)
    const entranceTimer = setTimeout(() => {
      setIsVisible(true);
    }, 2500);

    return () => clearTimeout(entranceTimer);
  }, []);

  // --- Idle Behavior ---
  const resetIdleTimer = useCallback(() => {
    setIsIdle(false);
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }
    idleTimerRef.current = setTimeout(() => {
      setIsIdle(true);
    }, 4000);
  }, []);

  useEffect(() => {
    // Start idle timer after mount
    const mountTimer = setTimeout(() => {
      resetIdleTimer();
    }, 100);

    return () => {
      clearTimeout(mountTimer);
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
    };
  }, [resetIdleTimer]);

  // --- Intersection Observer for Active Section ---
  useEffect(() => {
    const sectionElements = items
      .map((item) => {
        const id = item.href.replace("#", "");
        return document.getElementById(id);
      })
      .filter(Boolean) as HTMLElement[];

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let maxRatio = 0;
        let mostVisibleIndex = 0;

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            const index = sectionElements.indexOf(entry.target as HTMLElement);
            if (index !== -1) {
              mostVisibleIndex = index;
            }
          }
        });

        if (maxRatio > 0.1) {
          setActiveIndex(mostVisibleIndex);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5],
      }
    );

    sectionElements.forEach((el) => observer.observe(el));
    observerRef.current = observer;

    return () => observer.disconnect();
  }, [items]);

  // --- Mouse tracking for idle reset ---
  useEffect(() => {
    const handleMouseMove = () => {
      resetIdleTimer();
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [resetIdleTimer]);

  // --- Hover handlers with grace period ---
  const handleMouseEnter = useCallback(() => {
    if (hoverGraceTimerRef.current) {
      clearTimeout(hoverGraceTimerRef.current);
    }
    // Small delay before expanding to prevent accidental opens
    hoverGraceTimerRef.current = setTimeout(() => {
      resetIdleTimer();
    }, 150);
  }, [resetIdleTimer]);

  const handleMouseLeave = useCallback(() => {
    if (hoverGraceTimerRef.current) {
      clearTimeout(hoverGraceTimerRef.current);
    }
    // Slightly longer delay before collapsing
    hoverGraceTimerRef.current = setTimeout(() => {
      // Collapse handled by CSS :hover state removal
    }, 300);
  }, []);

  // --- Click Handler ---
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const id = href.replace("#", "");

    // Collapse labels after click
    // Handled by CSS :hover state removal

    if (lenis) {
      lenis.scrollTo(`#${id}`, {
        offset: 0,
        duration: 1.5,
        easing: (t: number) => {
          // Cinematic easing: smooth deceleration
          return 1 - Math.pow(1 - t, 4);
        },
      });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // --- Computed Styles ---
  const baseOpacity = isVisible ? (isIdle ? 0.3 : 0.45) : 0;

  return (
    <>
      {/* Custom styles for premium dash navigator */}
      <style>{`
        .dash-nav-container {
          position: fixed;
          right: 36px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 50;
          display: none;
          flex-direction: column;
          align-items: flex-end;
          gap: 10px;
          opacity: ${baseOpacity};
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @media (min-width: 768px) {
          .dash-nav-container {
            display: flex;
          }
        }

        .dash-nav-container.visible {
          opacity: ${isIdle ? 0.3 : 0.45};
        }

        .dash-nav-container.visible:hover {
          opacity: 1;
        }

        .dash-item {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 5px;
          cursor: pointer;
          text-decoration: none;
          opacity: 0;
          transform: translateX(8px);
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .dash-nav-container.visible .dash-item {
          opacity: 1;
          transform: translateX(0);
        }

        .dash-line {
          width: 25px;
          height: 6px;
          background: ${
            isDark ? "rgba(245, 240, 232, 0.30)" : "rgba(44, 40, 35, 0.30)"
          };
          border-radius: 5px;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          flex-shrink: 0;
        }

        .dash-item.active .dash-line {
          width: 32px;
          background: #B8A88A;
        }

        .dash-item:hover .dash-line {
          background: ${
            isDark ? "rgba(245, 240, 232, 0.55)" : "rgba(44, 40, 35, 0.55)"
          };
             width: 35px;
        }

        .dash-item.active:hover .dash-line {
          background: #B8A88A;
        }

        .dash-label {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          white-space: nowrap;
          color: ${
            isDark ? "rgba(245, 240, 232, 0.75)" : "rgba(44, 40, 35, 0.75)"
          };
          clip-path: inset(0 100% 0 0);
          max-width: 0;
          opacity: 0;
          transform: translateX(6px);
          transition: clip-path 0.55s cubic-bezier(0.16, 1, 0.3, 1),
                      max-width 0.55s cubic-bezier(0.16, 1, 0.3, 1),
                      opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }

        .dash-item.active .dash-label {
          clip-path: inset(0 0% 0 0);
          max-width: 180px;
          opacity: 1;
          transform: translateX(0);
        }

        .dash-item:hover .dash-label {
          clip-path: inset(0 0% 0 0);
          max-width: 180px;
          opacity: 0.9;
          transform: translateX(0);
        }
      `}</style>

      <nav
        ref={navRef}
        className={`dash-nav-container ${isVisible ? "visible" : ""}`}
        aria-label="Section navigation"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {items.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className="dash-item"
              style={{
                transitionDelay: isVisible ? `${index * 60}ms` : "0ms",
              }}
              aria-current={isActive ? "true" : undefined}
            >
              <span className="dash-label">{item.label}</span>
              <span className="dash-line" aria-hidden="true" />
            </a>
          );
        })}
      </nav>
    </>
  );
}
