"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import Container from "@/components/layout/Container";
import { customEase } from "@/components/home/Hero";
import StickyImageCollage from "@/components/home/StickyImageCollage";

const faqs = [
  {
    question: "What is Purura?",
    answer:
      "Purura is a luxury eco-intelligent resort concept designed for premium hospitality, private villas, wellness, waterfront experiences, and investor-led growth.",
  },
  {
    question: "Where is the project located?",
    answer:
      "The project is positioned in Valuka, Mymensingh, Bangladesh, offering proximity to Dhaka demand with a nature-led resort environment.",
  },
  {
    question: "What investment opportunities are available?",
    answer:
      "Investment opportunities may include villa partnerships, hospitality investment, strategic partnerships, and pitch deck review.",
  },
  {
    question: "How can I request more information?",
    answer:
      "Use the Contact Us page to submit an investor inquiry, booking request, or partnership message.",
  },
];

// Images for the right-side collage (mapped to back / center / front layers)
const collageImages = [
  {
    src: "/Purura/NewImages/Villa 1.png",
    alt: "Purura Resort Villa",
    priority: true,
  },
  {
    src: "/Purura/NewImages/Hotel 1.png",
    alt: "Purura Resort Hotel",
  },
  {
    src: "/Purura/NewImages/Overall 2.png",
    alt: "Purura Resort Overview",
  },
];

export default function FAQPage() {
  // Ref for the main section to track scroll progress for parallax
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <main className="bg-void py-24 md:pt-32 md:pb-24">
      <Container>
        <div ref={sectionRef} className="relative lg:grid lg:grid-cols-2 lg:gap-12">
          {/* ============================================================
            LEFT — SCROLLABLE CONTENT
            ============================================================ */}
          <div className="relative z-10 max-w-3xl lg:max-w-2xl pr-4 lg:pr-0">
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: customEase }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-chrome1 font-mono">
                FAQ
              </p>

              <h1 className="mt-6 text-[clamp(2rem,4.7vw,2rem)] font-bold leading-none tracking-[-0.06em] text-bone font-display">
                Frequently asked questions.
              </h1>

              <p className="mt-4 text-sm leading-relaxed text-haze">
                Key information for investors, partners, and guests interested
                in Purura.
              </p>
            </motion.div>

            <div className="mt-16 space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.06 + 0.2,
                    ease: customEase,
                  }}
                  className="rounded-[2rem] border border-line bg-graphite/50 p-8"
                >
                  <h2 className="text-[clamp(1rem,4.7vw,1.5rem)] font-bold tracking-[-0.03em] text-bone font-display">
                    {faq.question}
                  </h2>
                  <p className="mt-4 text-haze leading-relaxed">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ============================================================
            RIGHT — FIXED / STICKY IMAGE COLLAGE (using reusable component)
            ============================================================ */}
          <div className="sticky top-52 hidden self-start lg:block">
            <StickyImageCollage
              images={collageImages}
              enableParallax={true}
              scrollTarget={sectionRef}
            />
          </div>
        </div>
      </Container>
    </main>
  );
}
