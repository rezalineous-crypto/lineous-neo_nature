import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import ScrollProgress from "@/components/ScrollProgress";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ToastProvider } from "@/components/ui/Toast";

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
  title: "Purura — Regenerative Hospitality",
  description:
    "A premium eco-intelligent destination where regenerative landscapes, luxury hospitality, and future-ready technology meet.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${mono.variable} ${serif.variable}`}
    >
      <body>
        <ToastProvider>
          <ThemeProvider>
            <SmoothScroll>
              <div className="grain-overlay" />
              <ScrollProgress />
              <Navbar />
              {children}
              <Footer />
              <WhatsAppButton />
            </SmoothScroll>
          </ThemeProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
