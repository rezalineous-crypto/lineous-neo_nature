"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Container from "@/components/layout/Container";
import { customEase } from "@/components/home/Hero";

const RoundedCornerFrame = ({ className = "" }: { className?: string }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 106 106"
    preserveAspectRatio="none"
    className={`pointer-events-none absolute -inset-1 z-20 h-[calc(100%+30px)] w-[calc(100%+30px)] overflow-visible ${className}`}
    fill="none"
  >
    {/* Exposed top-left corner */}
    <path
      d="M 4 34 V 9 Q 4 4 9 4 H 34"
      stroke="#c8a158"
      strokeWidth="1.15"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Exposed bottom-right corner */}
    <path
      d="M 72 102 H 97 Q 102 102 102 97 V 72"
      stroke="#c8a158"
      strokeWidth="1.15"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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
const collageImages = {
  back: "/Purura/NewImages/Villa 1.png",
  center: "/Purura/NewImages/Hotel 1.png",
  front: "/Purura/NewImages/Overall 2.png",
};

export default function FAQPage() {
  return (
    <main className="bg-void py-24 md:pt-32 md:pb-24">
      <Container>
        <div className="relative lg:grid lg:grid-cols-2 lg:gap-12">
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
            RIGHT — FIXED / STICKY IMAGE COLLAGE
            ============================================================ */}
          <div className="sticky top-10 hidden h-screen lg:block">
            <div className="relative mx-auto h-125 w-full max-w-175 sm:h-145 md:h-162.5 lg:h-172.5">
              {/* ======================================================
                BACK / LARGE ARCHITECTURAL IMAGE
                ====================================================== */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: customEase }}
                className="absolute right-0 top-0 h-[61%] w-[67%] overflow-visible"
              >
                <RoundedCornerFrame />

                <div className="absolute inset-0 z-10 overflow-hidden rounded-2xl">
                  <Image
                    src={collageImages.back}
                    alt="Purura Resort Villa"
                    fill
                    priority
                    sizes="(max-width: 768px) 70vw, 45vw"
                    className="object-cover"
                  />
                </div>
              </motion.div>

              {/* ======================================================
                BOTANICAL OVERLAY ON RIGHT
                ====================================================== */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: customEase }}
                className="pointer-events-none absolute right-[-4%] top-[3%] z-40 h-[54%] w-[25%]"
              >
                <svg
                  viewBox="0 0 300 600"
                  className="h-full w-full"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M50 600C85 500 115 400 137 290C158 184 180 96 242 0"
                    stroke="#3F4739"
                    strokeWidth="2"
                  />

                  <path
                    d="M136 292C82 263 43 217 21 156"
                    stroke="#3F4739"
                    strokeWidth="1.5"
                  />

                  <path
                    d="M148 239C194 211 234 169 263 113"
                    stroke="#3F4739"
                    strokeWidth="1.5"
                  />

                  <path
                    d="M117 370C72 353 35 323 5 279"
                    stroke="#3F4739"
                    strokeWidth="1.5"
                  />

                  <path
                    d="M177 153C207 135 237 103 255 66"
                    stroke="#3F4739"
                    strokeWidth="1.5"
                  />

                  <ellipse
                    cx="48"
                    cy="181"
                    rx="16"
                    ry="54"
                    transform="rotate(-43 48 181)"
                    fill="#526049"
                    fillOpacity=".45"
                  />

                  <ellipse
                    cx="224"
                    cy="133"
                    rx="17"
                    ry="58"
                    transform="rotate(42 224 133)"
                    fill="#526049"
                    fillOpacity=".42"
                  />

                  <ellipse
                    cx="34"
                    cy="305"
                    rx="16"
                    ry="54"
                    transform="rotate(-48 34 305)"
                    fill="#526049"
                    fillOpacity=".38"
                  />

                  <ellipse
                    cx="217"
                    cy="75"
                    rx="14"
                    ry="50"
                    transform="rotate(37 217 75)"
                    fill="#526049"
                    fillOpacity=".4"
                  />

                  <ellipse
                    cx="75"
                    cy="235"
                    rx="13"
                    ry="45"
                    transform="rotate(-42 75 235)"
                    fill="#526049"
                    fillOpacity=".32"
                  />
                </svg>
              </motion.div>

              {/* ======================================================
                CENTER IMAGE
                ====================================================== */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.45, ease: customEase }}
                className="absolute left-[19%] top-[24%] z-20 h-[57%] w-[43%] overflow-visible"
              >
                <RoundedCornerFrame />

                <div className="absolute inset-0 z-10 overflow-hidden rounded-2xl">
                  <Image
                    src={collageImages.center}
                    alt="Purura Resort Hotel"
                    fill
                    sizes="(max-width: 768px) 45vw, 30vw"
                    className="object-cover"
                  />
                </div>
              </motion.div>

              {/* ======================================================
                FRONT / BOTTOM IMAGE
                ====================================================== */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6, ease: customEase }}
                className="absolute bottom-[1%] left-0 z-30 h-[29%] w-[40%] overflow-visible"
              >
                <RoundedCornerFrame />

                <div className="absolute inset-0 z-10 overflow-hidden rounded-2xl">
                  <Image
                    src={collageImages.front}
                    alt="Purura Resort Overview"
                    fill
                    sizes="(max-width: 768px) 42vw, 28vw"
                    className="object-cover"
                  />
                </div>
              </motion.div>

              {/* ======================================================
                SUBTLE IMAGE SHADOWS
                ====================================================== */}
              <div className="pointer-events-none absolute right-0 top-0 z-10 h-[61%] w-[67%] shadow-[0_30px_70px_rgba(30,30,20,0.08)]" />

              <div className="pointer-events-none absolute left-[19%] top-[24%] z-10 h-[57%] w-[43%] shadow-[0_30px_60px_rgba(30,30,20,0.12)]" />

              <div className="pointer-events-none absolute bottom-[1%] left-0 z-40 h-[29%] w-[40%] shadow-[0_25px_50px_rgba(30,30,20,0.14)]" />
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
