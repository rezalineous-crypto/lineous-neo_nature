/* ──────────────────────────────────────────────────────────
   GOOGLE MAP THEME
   Single source of truth for the map's look. Palettes mirror
   app/globals.css tokens so the map never reads as an alien
   object between two designed sections.
   ────────────────────────────────────────────────────────── */

export type GoogleMapTheme = "light" | "dark";

export type MapPalette = {
  theme: GoogleMapTheme;
  /** Colour shown while tiles stream in */
  surface: string;
  /** Translucent panel (info window) */
  panel: string;
  /** Opaque panel (overlay card) */
  panelSolid: string;
  border: string;
  text: string;
  muted: string;
  accent: string;
  onAccent: string;
  marker: string;
  markerRing: string;
  label: string;
  sans: string;
  mono: string;
};

export const CHAMPAGNE = "#C9A45A";

/* Site is served by Space Grotesk / JetBrains Mono via next/font.
   Map DOM is injected outside React, so fonts are referenced by name. */
const SANS_STACK = '"Space Grotesk", system-ui, sans-serif';
const MONO_STACK = '"JetBrains Mono", ui-monospace, monospace';

export const MAP_SITE = {
  position: { lat: 24.4337046, lng: 90.4091049 },
  name: "Purura",
  eyebrow: "Project Site",
  address: "Purura, Bhaluka, Dhaka, Bangladesh",
  district: "Bhaluka",
  access:
    "Approx. 60 km north-east of Dhaka, reachable via the Dhaka–Mymensingh highway.",
  zoom: 15,
};

export const MAP_BOUNDS = {
  sw: { lat: 24.4007046, lng: 90.3791049 },
  ne: { lat: 24.4667046, lng: 90.4391049 },
};

export const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${MAP_SITE.position.lat},${MAP_SITE.position.lng}`;

export const MAP_PALETTES: Record<GoogleMapTheme, MapPalette> = {
  light: {
    theme: "light",
    surface: "#EFE7D8",
    panel: "rgba(248, 243, 234, 0.94)",
    panelSolid: "#F8F3EA",
    border: "#D8C8B7",
    text: "#1F1A15",
    muted: "#5A4A3A",
    accent: "#A8823C",
    onAccent: "#1F1A15",
    marker: CHAMPAGNE,
    markerRing: "#1F1A15",
    label: "#2B2119",
    sans: SANS_STACK,
    mono: MONO_STACK,
  },
  dark: {
    theme: "dark",
    surface: "#14110E",
    panel: "rgba(27, 23, 19, 0.94)",
    panelSolid: "#1F1A15",
    border: "#3A3530",
    text: "#F5F5F0",
    muted: "#9A9AA0",
    accent: CHAMPAGNE,
    onAccent: "#14110E",
    marker: CHAMPAGNE,
    markerRing: "#1F1A15",
    label: "#F5F5F0",
    sans: SANS_STACK,
    mono: MONO_STACK,
  },
};

/* ──────────────────────────────────────────────────────────
   GOOGLE MAPS STYLE ARRAYS
   Contrast is deliberately pushed down so the champagne
   marker stays the brightest object in the frame.
   ────────────────────────────────────────────────────────── */

export const MAP_STYLES: Record<GoogleMapTheme, google.maps.MapStyle[]> = {
  light: [
    { elementType: "geometry", stylers: [{ color: "#EFE7D8" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#5A4A3A" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#EFE7D8" }] },
    { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#C9B79B" }] },
    { featureType: "administrative.land_parcel", stylers: [{ visibility: "off" }] },
    { featureType: "landscape.natural", elementType: "geometry", stylers: [{ color: "#E6E3D0" }] },
    { featureType: "poi", elementType: "geometry", stylers: [{ color: "#EBE1CD" }] },
    { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
    { featureType: "poi.business", stylers: [{ visibility: "off" }] },
    { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#DCE0C4" }] },
    { featureType: "road", elementType: "geometry", stylers: [{ color: "#FBF6EC" }] },
    { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#E0D2B9" }] },
    { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#F5EADA" }] },
    { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#EEDFC2" }] },
    { featureType: "road.local", elementType: "labels", stylers: [{ visibility: "off" }] },
    { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#7A6853" }] },
    { featureType: "road", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { featureType: "transit", stylers: [{ visibility: "off" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#D5D9D2" }] },
    { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#8A8272" }] },
  ],
  dark: [
    { elementType: "geometry", stylers: [{ color: "#15120F" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#8C8578" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#15120F" }] },
    { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#332E28" }] },
    { featureType: "administrative.land_parcel", stylers: [{ visibility: "off" }] },
    { featureType: "landscape.natural", elementType: "geometry", stylers: [{ color: "#1A1C15" }] },
    { featureType: "poi", elementType: "geometry", stylers: [{ color: "#1E1A15" }] },
    { featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] },
    { featureType: "poi.business", stylers: [{ visibility: "off" }] },
    { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#1D2117" }] },
    { featureType: "road", elementType: "geometry", stylers: [{ color: "#2A251F" }] },
    { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#3A3530" }] },
    { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#332C23" }] },
    { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#3E342A" }] },
    { featureType: "road.local", elementType: "labels", stylers: [{ visibility: "off" }] },
    { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#9A9184" }] },
    { featureType: "road", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { featureType: "transit", stylers: [{ visibility: "off" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#1B2226" }] },
    { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#6C7377" }] },
  ],
};
