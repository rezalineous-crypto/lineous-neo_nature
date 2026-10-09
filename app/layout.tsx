import type { Metadata } from "next";
import { cookies } from "next/headers";
import {
  Space_Grotesk,
  JetBrains_Mono,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import ScrollProgress from "@/components/ScrollProgress";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ToastProvider } from "@/components/ui/Toast";
import IntroGate from "@/components/intro/IntroGate";
import ThemeCleanupScript from "@/components/ThemeCleanupScript";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const serif = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Purura — The Living Archipelago",
  description:
    "A Regenerative Waterfront Futuristic Resort Integrating Landscape, Architecture, and Intelligent Infrastructure",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const introSeen = (await cookies()).get("purura_intro")?.value === "1";

  return (
    <html
      lang="en"
      className={`${display.variable} ${mono.variable} ${serif.variable}`}
    >
      <head>
        {/* Highest-priority network requests on the site */}
        <link
          rel="preload"
          href="/intro/intro.720.mp4"
          as="video"
          type="video/mp4"
          fetchPriority="high"
        />
        <link
          rel="preload"
          href="/intro/poster.avif"
          as="image"
          type="image/avif"
          fetchPriority="high"
        />
        {/* Fallback for browsers that ignore as="video" */}
        <link rel="prefetch" href="/intro/intro.1080.mp4" as="video" />
      </head>

      <body>
        {/* Theme cleanup script (Client Component, must be in body) */}
        <ThemeCleanupScript />

        {/* Always mounted so it can cross-fade after the refresh. */}
        <IntroGate active={!introSeen} />

        {/* ONLY when the intro is done do we ship the entire site. */}
        {introSeen ? (
          <ToastProvider>
            <ThemeProvider>
              <SmoothScroll>
                <div className="grain-overlay" />
                <ScrollProgress />
                <Navbar />
                <div id="main-content" className="relative">
                  {children}
                </div>
                <Footer />
                <WhatsAppButton />
              </SmoothScroll>
            </ThemeProvider>
          </ToastProvider>
        ) : null}
      </body>
    </html>
  );
}
