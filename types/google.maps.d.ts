/* eslint-disable @typescript-eslint/no-namespace */
/**
 * Minimal ambient declarations for the Google Maps JavaScript API.
 *
 * Only the surface actually used by components/map/PururaMap.tsx is declared,
 * which keeps the project dependency-free. If `@types/google.maps` is ever
 * installed, delete this file to avoid duplicate declarations.
 */

declare namespace google {
  namespace maps {
    class LatLng {
      constructor(lat: number, lng: number);
      lat(): number;
      lng(): number;
    }

    class Point {
      constructor(x: number, y: number);
    }

    class Size {
      constructor(width?: number, height?: number);
    }

    class LatLngBounds {
      constructor(sw?: LatLng | null, ne?: LatLng | null);
      extend(point: LatLng): void;
      isEmpty(): boolean;
    }

    class MapMouseEvent {
      latLng: LatLng | null;
    }

    type MapsEventListener = {
      remove(): void;
    };

    type GestureHandling = "auto" | "cooperative" | "greedy" | "none";

    type ColorScheme = "DARK" | "LIGHT";

    type Styler = {
      color?: string;
      opacity?: number;
      weight?: number;
      fillColor?: string;
      visibility?: string;
    };

    type MapStyle = {
      featureType?: string;
      elementType?: string;
      featureId?: string;
      stylers: Styler[];
    };

    type MapTypeStyle = {
      id: string;
      label: string;
    };

    type MapOptions = {
      center?: LatLng | LatLngLiteral | null;
      zoom?: number | null;
      minZoom?: number;
      maxZoom?: number;
      styles?: MapStyle[] | null;
      mapTypeId?: string | MapTypeStyle | null;
      disableDefaultUI?: boolean;
      zoomControl?: boolean;
      mapTypeControl?: boolean;
      streetViewControl?: boolean;
      fullscreenControl?: boolean;
      clickableIcons?: boolean;
      gestureHandling?: GestureHandling;
      backgroundColor?: string;
      colorScheme?: ColorScheme;
      draggable?: boolean;
      scrollwheel?: boolean;
      keyboardShortcuts?: boolean;
    };

    type Icon = {
      url: string;
      anchor?: Point | null;
      scaledSize?: Size | null;
      origin?: Point | null;
    };

    type MarkerOptions = {
      position?: LatLng | LatLngLiteral | null;
      map?: Map | null;
      title?: string;
      icon?: Icon | Symbol | null;
      zIndex?: number;
      opacity?: number;
      clickable?: boolean;
      draggable?: boolean;
      visible?: boolean;
      animation?: number;
      crossOnDrag?: boolean;
      label?: string | null;
    };

    type LatLngLiteral = {
      lat: number;
      lng: number;
    };

    type Symbol = {
      path: string;
      scale?: number;
      fillColor?: string;
      fillOpacity?: number;
      strokeColor?: string;
      strokeWeight?: number;
      anchor?: Point | null;
    };

    type InfoWindowOptions = {
      content?: string | Element | null;
      maxWidth?: number;
      maxHeight?: number;
      ariaLabel?: string;
      disableAutoPan?: boolean;
      pixelOffset?: Size | null;
      zIndex?: number;
    };

    class Map {
      constructor(container: HTMLElement | string, opts?: MapOptions);
      getDiv(): HTMLElement | null;
      getZoom(): number | undefined;
      setZoom(zoom: number | null): void;
      setCenter(center: LatLng | LatLngLiteral | null): void;
      getCenter(): LatLng | undefined;
      setOptions(options: MapOptions): void;
      panTo(center: LatLng | LatLngLiteral): void;
      fitBounds(bounds: LatLngBounds): void;
      addListener(eventName: string, handler: (event?: unknown) => void): MapsEventListener;
    }

    class Marker {
      constructor(opts?: MarkerOptions);
      getPosition(): LatLng | undefined;
      setMap(map: Map | null): void;
      setIcon(icon: Icon | Symbol | null): void;
      setZIndex(zIndex: number): void;
      setOpacity(opacity: number): void;
      setTitle(title: string): void;
      addListener(eventName: string, handler: (event?: unknown) => void): MapsEventListener;
    }

    class InfoWindow {
      constructor(opts?: InfoWindowOptions);
      open(options?: {
        anchor?: LatLng | Marker | Point | null;
        map?: Map | null;
        shouldFocus?: boolean;
      }): void;
      open(map?: Map | null, anchor?: LatLng | Marker | Point | null): void;
      close(): void;
      setContent(content: string | Element | null): void;
      setOptions(options: InfoWindowOptions): void;
      addListener(eventName: string, handler: (event?: unknown) => void): MapsEventListener;
    }

    namespace event {
      function addListener(
        instance: unknown,
        eventName: string,
        handler: (event?: unknown) => void
      ): MapsEventListener;
      function clearInstanceListeners(instance: unknown): void;
      function removeListener(listener: MapsEventListener | null): void;
    }

    const __isGoogleMapsAvailable: boolean;
  }
}
