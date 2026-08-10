"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import { customEase } from "@/components/home/Hero";
import ParallaxImage from "@/components/home/ParallaxImage";
import ROICalculator from "@/components/investment/ROICalculator";
import InvestmentInquiry from "@/components/investment/InvestmentInquiry";
import InquirySuccess from "@/components/investment/InquirySuccess";
import WhyInvest from "@/components/investment/WhyInvest";
import WhatHappensNext from "@/components/investment/WhatHappensNext";
import SectionNav from "@/components/layout/SectionNav";

export default function InvestmentPage() {
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  return (
    <main className="relative bg-void">
      <SectionNav
        items={[
          { label: "Why Invest", href: "#why-invest" },
          { label: "Process", href: "#process" },
          { label: "Investment Inquiry", href: "#inquiry" },
          { label: "ROI Calculator", href: "#roi-calculator" },
        ]}
      />
      {/* ── Parallax Hero ── */}
      <section className="relative min-h-[75vh] overflow-hidden bg-void">
        <ParallaxImage
          src="/purura_resort_images/purura_render_20.jpg"
          alt="Neo Nature investment consultation"
          fill
          intensity={0.5}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-void/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />

        <div className="relative z-10 min-h-[75vh] flex items-end">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: customEase }}
              className="max-w-5xl pb-24"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-bone font-mono">
                Investment
              </p>
              <h1 className="mt-6 text-5xl md:text-7xl font-bold leading-none tracking-[-0.06em] text-bone font-display">
                Investment Consultation
              </h1>
            </motion.div>
          </Container>
        </div>
      </section>

      {/* ── Why Invest ── */}
      <WhyInvest />

      {/* ── What Happens Next ── */}
      <WhatHappensNext />

      {/* ── Lead-Gen Inquiry Form ── */}
      {inquirySubmitted ? (
        <InquirySuccess />
      ) : (
        <InvestmentInquiry onSuccess={() => setInquirySubmitted(true)} />
      )}

      {/* ── ROI Calculator (Secondary) ── */}
      <section id="roi-calculator">
        <ROICalculator />
      </section>
    </main>
  );
}
