"use client";

import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import { customEase } from "@/components/home/Hero";

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

export default function FAQPage() {
  return (
    <main className="bg-void py-24 md:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: customEase }}
          className="max-w-4xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-chrome1 font-mono">
            FAQ
          </p>

          <h1 className="mt-6 text-5xl md:text-7xl font-bold leading-none tracking-[-0.06em] text-bone font-display">
            Frequently asked questions.
          </h1>

          <p className="mt-8 text-lg leading-relaxed text-haze">
            Key information for investors, partners, and guests interested in Purura.
          </p>
        </motion.div>

        <div className="mt-16 space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.06, ease: customEase }}
              className="rounded-[2rem] border border-line bg-graphite/50 p-8"
            >
              <h2 className="text-xl md:text-2xl font-bold tracking-[-0.03em] text-bone font-display">
                {faq.question}
              </h2>
              <p className="mt-4 text-haze leading-relaxed">
                {faq.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </main>
  );
}
