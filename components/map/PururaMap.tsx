"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import {
  DIRECTIONS_URL,
  MAP_BOUNDS,
  MAP_PALETTES,
  MAP_SITE,
  MAP_STYLES,
  type GoogleMapTheme,
  type MapPalette,
} from "@/lib/map-styles";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

/* Used until the API key exists, and as a hard safety net if the
   script is blocked. Identical to the previous iframe behaviour. */
const EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d350.12929527315697!2d90.40910492852367!3d24.433704589962307!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37566ec391b33787%3A0xbc9545354ca40da1!2sPurura%2C%20Bhaluka!5e0!3m2!1sen!2sbd!4v1790930848388!5m2!1sen!2sbd";

const EASE = [0.16, 1, 0.3, 1] as const;

interface PururaMapProps {
  className?: string;
}

/* ─── LOADER ───────────────────────────────────────────── */

let scriptPromise: Promise<void> | null = null;

function loadGoogleMaps(apiKey: string): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Google Maps requires a browser"));
  }

  if (typeof google !== "undefined" && google.maps) {
    return Promise.resolve();
  }

  if (!scriptPromise) {
    scriptPromise = new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
        apiKey
      )}&v=weekly&loading=async`;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = () => {
        scriptPromise = null;
        reject(new Error("Google Maps failed to load"));
      };
      document.head.appendChild(script);
    });
  }

  return scriptPromise;
}

/* ─── CUSTOM MARKER ────────────────────────────────────── */

/* A champagne pin with a soft halo. Encoded as SVG so it inherits
   the exact palette instead of shipping a PNG per theme. */
function createMarkerSvg(palette: MapPalette, scale = 1): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="60" viewBox="0 0 48 60">
<ellipse cx="24" cy="55" rx="9" ry="3" fill="rgba(0,0,0,0.25)"/>
<path d="M24 2C14.6 2 7 9.6 7 19c0 12.2 17 32.6 17 32.6S41 31.2 41 19C41 9.6 33.4 2 24 2z" fill="${palette.marker}" stroke="${palette.markerRing}" stroke-width="1.5"/>
<circle cx="24" cy="19" r="5.5" fill="${palette.markerRing}" fill-opacity="0.9"/>
<circle cx="24" cy="19" r="2.2" fill="${palette.marker}"/>
</svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/* ─── CUSTOM INFO WINDOW ───────────────────────────────── */

/* Google injects this outside React, so Tailwind classes are not
   available here — everything is an inline style. */
function buildInfoWindowHtml(palette: MapPalette): string {
  const rows: Array<[string, string]> = [
    ["District", MAP_SITE.district],
    ["Coordinates", `${MAP_SITE.position.lat.toFixed(4)}, ${MAP_SITE.position.lng.toFixed(4)}`],
  ];

  return `
    <div style="
      position: relative;
      min-width: 240px;
      padding: 18px 18px 16px;
      border-radius: 16px;
      background: ${palette.panel};
      border: 1px solid ${palette.border};
      box-shadow: 0 18px 44px rgba(0,0,0,0.18);
      color: ${palette.text};
      font-family: ${palette.sans};
    ">
      <button
        data-purura-map-close
        aria-label="Close"
        style="
          position: absolute; top: 10px; right: 10px;
          width: 24px; height: 24px; padding: 0;
          display: flex; align-items: center; justify-content: center;
          border-radius: 999px;
          border: 1px solid ${palette.border};
          background: transparent; color: ${palette.muted};
          font-size: 15px; line-height: 1; cursor: pointer;
        "
      >&#215;</button>

      <p style="
        margin: 0;
        font-family: ${palette.mono};
        font-size: 9px; letter-spacing: 0.3em; text-transform: uppercase;
        color: ${palette.accent};
      ">${MAP_SITE.eyebrow}</p>

      <h3 style="
        margin: 10px 0 0;
        font-size: 20px; font-weight: 600; letter-spacing: -0.025em; line-height: 1.1;
      ">${MAP_SITE.name}</h3>

      <p style="margin: 6px 0 0; font-size: 12px; line-height: 1.6; color: ${palette.muted};">
        ${MAP_SITE.address}
      </p>

      <div style="height: 1px; background: ${palette.border}; margin: 14px 0 12px;"></div>

      ${rows
        .map(
          ([label, value]) => `
        <div style="display: flex; justify-content: space-between; gap: 16px; margin-bottom: 5px;">
          <span style="font-family: ${palette.mono}; font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase; color: ${palette.muted};">${label}</span>
          <span style="font-size: 11px;">${value}</span>
        </div>`
        )
        .join("")}

      <a
        href="${DIRECTIONS_URL}"
        target="_blank"
        rel="noopener noreferrer"
        style="
          display: inline-block; margin-top: 14px;
          font-family: ${palette.mono};
          font-size: 9px; font-weight: 600;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: ${palette.accent}; text-decoration: none;
          border-bottom: 1px solid ${palette.accent}; padding-bottom: 2px;
        "
      >Get directions</a>
    </div>`;
}

/* ─── COMPONENT ────────────────────────────────────────── */

export default function PururaMap({ className = "" }: PururaMapProps) {
  const { theme } = useTheme();

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const listenersRef = useRef<google.maps.MapsEventListener[]>([]);

  const [shouldLoad, setShouldLoad] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const palette = MAP_PALETTES[theme as GoogleMapTheme] ?? MAP_PALETTES.light;

  const clearListeners = useCallback(() => {
    listenersRef.current.forEach((listener) => listener.remove());
    listenersRef.current = [];
  }, []);

  /* Only boot the SDK once the section is close to the viewport. */
  useEffect(() => {
    if (!API_KEY) return;

    const node = mapContainerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  /* Create the map once the SDK is available. */
  useEffect(() => {
    if (!shouldLoad || !API_KEY) return;

    let cancelled = false;

    loadGoogleMaps(API_KEY)
      .then(() => {
        if (cancelled || !mapContainerRef.current || mapRef.current) return;

        const map = new google.maps.Map(mapContainerRef.current, {
          center: MAP_SITE.position,
          zoom: MAP_SITE.zoom,
          styles: MAP_STYLES[theme as GoogleMapTheme] ?? MAP_STYLES.light,
          disableDefaultUI: true,
          zoomControl: false,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          clickableIcons: false,
          /* Stops the map from hijacking page scroll. */
          gestureHandling: "cooperative",
          backgroundColor: palette.surface,
          colorScheme: theme === "dark" ? "DARK" : "LIGHT",
        });

        mapRef.current = map;

        const bounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(MAP_BOUNDS.sw.lat, MAP_BOUNDS.sw.lng),
          new google.maps.LatLng(MAP_BOUNDS.ne.lat, MAP_BOUNDS.ne.lng)
        );
        map.fitBounds(bounds);

        const infoWindow = new google.maps.InfoWindow({
          maxWidth: 300,
          pixelOffset: new google.maps.Size(0, -46),
          content: buildInfoWindowHtml(palette),
        });
        infoWindowRef.current = infoWindow;

        const marker = new google.maps.Marker({
          map,
          position: MAP_SITE.position,
          title: `${MAP_SITE.name} — ${MAP_SITE.address}`,
          zIndex: 10,
          icon: {
            url: createMarkerSvg(palette),
            anchor: new google.maps.Point(24, 56),
            scaledSize: new google.maps.Size(48, 60),
          },
        });
        markerRef.current = marker;

        listenersRef.current = [
          marker.addListener("click", () => {
            infoWindow.setContent(buildInfoWindowHtml(palette));
            infoWindow.open({ map, anchor: marker, shouldFocus: false });
            setIsInfoOpen(true);
          }),
          infoWindow.addListener("close", () => setIsInfoOpen(false)),
          map.addListener("click", () => infoWindow.close()),
        ];

        setIsReady(true);
      })
      .catch(() => {
        if (!cancelled) setHasFailed(true);
      });

    return () => {
      cancelled = true;
      clearListeners();
    };
    /* Intentionally mounted once — theme changes are handled below. */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldLoad, clearListeners]);

  /* Re-theme without recreating the map. */
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    map.setOptions({
      styles: MAP_STYLES[theme as GoogleMapTheme] ?? MAP_STYLES.light,
      backgroundColor: palette.surface,
      colorScheme: theme === "dark" ? "DARK" : "LIGHT",
    });

    markerRef.current?.setIcon({
      url: createMarkerSvg(palette),
      anchor: new google.maps.Point(24, 56),
      scaledSize: new google.maps.Size(48, 60),
    });

    const infoWindow = infoWindowRef.current;
    if (infoWindow && isInfoOpen) {
      infoWindow.setContent(buildInfoWindowHtml(palette));
    }
  }, [theme, palette, isInfoOpen]);

  /* Destroy the map on unmount. */
  useEffect(
    () => () => {
      clearListeners();
      infoWindowRef.current?.close();
      infoWindowRef.current = null;
      markerRef.current?.setMap(null);
      markerRef.current = null;
      mapRef.current = null;
    },
    [clearListeners]
  );

  /* Info window content is a raw HTML string, so delegate its
     close button from the container. */
  useEffect(() => {
    const node = mapContainerRef.current;
    if (!node) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-purura-map-close]")) {
        infoWindowRef.current?.close();
      }
    };

    node.addEventListener("click", handleClick);
    return () => node.removeEventListener("click", handleClick);
  }, []);

  const zoomBy = (delta: number) => {
    const map = mapRef.current;
    if (!map) return;
    map.setZoom((map.getZoom() ?? MAP_SITE.zoom) + delta);
  };

  const openDirections = () => {
    infoWindowRef.current?.open({ map: mapRef.current, shouldFocus: false });
    infoWindowRef.current?.setContent(buildInfoWindowHtml(palette));
  };

  /* Without an API key — or if the script is blocked — keep the
     original embed rather than showing a broken canvas. */
  if (!API_KEY || hasFailed) {
    return (
      <div className={`relative w-full overflow-hidden ${className}`}>
        <iframe
          src={EMBED_URL}
          title="PURURA Resort Location"
          className="block h-[420px] w-full border-0 sm:h-[500px] lg:h-[600px]"
          loading="lazy"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    );
  }

  return (
    <section
      id="location"
      className={`relative w-full overflow-hidden bg-graphite ${className}`}
    >
      <div className="relative h-[420px] w-full sm:h-[500px] lg:h-[600px]">
        {/* Map surface — tinted before tiles arrive, no white flash */}
        <div
          ref={mapContainerRef}
          data-lenis-prevent
          className="purura-map absolute inset-0"
          style={{ backgroundColor: palette.surface }}
        />

        {/* Loading veil */}
        <AnimatePresence>
          {!isReady && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="absolute inset-0 z-10 flex items-center justify-center"
              style={{ backgroundColor: palette.surface }}
            >
              <div className="flex flex-col items-center gap-5">
                <span
                  className="h-8 w-8 animate-pulse rounded-full"
                  style={{ backgroundColor: palette.accent, opacity: 0.35 }}
                />
                <span
                  className="font-mono text-[9px] uppercase tracking-[0.35em]"
                  style={{ color: palette.muted }}
                >
                  Loading terrain
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CINEMATIC GRADING — same treatment as the hero sections */}
        <div
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, transparent 38%, rgba(0,0,0,0.22) 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-1/3"
          style={{
            background: `linear-gradient(to top, ${palette.surface}, transparent)`,
          }}
        />

        {/* CUSTOM CONTROLS — Google's own chrome is disabled so it
            can never clash with the palette. */}
        <div className="absolute right-5 top-5 z-30 flex flex-col gap-2">
          <div
            className="flex flex-col overflow-hidden rounded-full backdrop-blur-md"
            style={{
              backgroundColor: palette.panel,
              border: `1px solid ${palette.border}`,
            }}
          >
            <button
              type="button"
              onClick={() => zoomBy(1)}
              aria-label="Zoom in"
              className="flex h-10 w-10 items-center justify-center transition-colors"
              style={{ color: palette.text }}
            >
              <Plus className="h-4 w-4" />
            </button>
            <div style={{ height: 1, backgroundColor: palette.border }} />
            <button
              type="button"
              onClick={() => zoomBy(-1)}
              aria-label="Zoom out"
              className="flex h-10 w-10 items-center justify-center transition-colors"
              style={{ color: palette.text }}
            >
              <Minus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* LOCATION CARD */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 px-5 pb-6 sm:px-8 md:px-12 lg:px-10">
          <AnimatePresence>
            {!isInfoOpen && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.8, ease: EASE }}
                className="pointer-events-auto max-w-sm rounded-2xl p-6 backdrop-blur-md md:p-7"
                style={{
                  backgroundColor: palette.panel,
                  border: `1px solid ${palette.border}`,
                }}
              >
                <p
                  className="font-mono text-[9px] uppercase tracking-[0.35em]"
                  style={{ color: palette.accent }}
                >
                  {MAP_SITE.eyebrow}
                </p>

                <h2
                  className="mt-3 font-display text-2xl font-semibold leading-tight tracking-[-0.03em] md:text-3xl"
                  style={{ color: palette.text }}
                >
                  {MAP_SITE.name}, {MAP_SITE.district}
                </h2>

                <p
                  className="mt-3 text-xs leading-[1.75] md:text-[13px]"
                  style={{ color: palette.muted }}
                >
                  {MAP_SITE.access}
                </p>

                <div
                  className="mt-5 flex flex-wrap items-center gap-3"
                >
                  <a
                    href={DIRECTIONS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 font-mono text-[9px] font-semibold uppercase tracking-[0.22em] transition-opacity hover:opacity-80"
                    style={{
                      backgroundColor: palette.accent,
                      color: palette.onAccent,
                    }}
                  >
                    Get directions
                  </a>

                  <button
                    type="button"
                    onClick={openDirections}
                    className="inline-flex items-center gap-2 px-5 py-3 font-mono text-[9px] font-semibold uppercase tracking-[0.22em] transition-colors"
                    style={{
                      color: palette.text,
                      border: `1px solid ${palette.border}`,
                    }}
                  >
                    Site detail
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
