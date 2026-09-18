
"use client";

import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import { customEase } from "@/components/home/Hero";
import ParallaxImage from "@/components/home/ParallaxImage";
import Image from "next/image";

/**
 * Every image uses its own complete path.
 * Replace only the paths you have actual assets for.
 */
const experienceSections = [
  {
    number: "01",
    eyebrow: "Augmented Nature",
    title: "Nature, experienced beyond the ordinary.",
    image: "/purura_resort_images/purura_render_16.jpg",
    secondaryImage: "/purura_resort_images/purura_render_15.jpg",
    items: [
      {
        title: "Seasonal Site Experience",
        description: "Summer / Rainy Season / Winter",
      },
      {
        title: "AR/VR Experience Dome",
        description:
          "Dome Structure & Shell, Projection System & Servers, VR/AR Headsets, Immersive Content & Software, HVAC & Interior Fit-outs",
      },
      {
        title: "Digital Art Gallery & Projection Tunnels",
        description:
          "100 sft tunnel & projection gallery — Display Hardware, Media Servers & Mapping Software, Content & Animation, Labor, Acoustic Paneling & Installation",
      },
      {
        title: "Night-time LED Landscape Shows",
        description: "Immersive Landscapes",
      },
    ],
  },
  {
    number: "02",
    eyebrow: "Smart Accommodation",
    title: "Accommodation, intelligently reimagined.",
    image: "/purura_resort_images/purura_render_15.jpg",
    secondaryImage: "/purura_resort_images/purura_render_16.jpg",
    items: [
      {
        title: "Contactless AI System & Facial Recognition Access",
        description:
          "Mid / High-End Enterprise Terminals, Smart Door Locks, Central Property Management Software (PMS), Installation & Cabling",
      },
      {
        title: "Mobile App-Controlled Rooms",
        description: "",
      },
      {
        title: "Smart Lighting & Climate Control",
        description:
          "Guest Room Management Systems (GRMS), iFare RFID Key Card Switches, Decentralized Wi-Fi/IoT System, Smart AC Controllers",
      },
      {
        title: "IoT Sensors and AI-powered HVAC Systems",
        description:
          "Tracks real-time temperature, humidity, and occupancy pattern — motion sensors, AI algorithms, Building Automation Systems (BAS)",
      },
      {
        title: "Property Management System (PMS)",
        description: "Automated Housekeeping & Maintenance",
      },
      {
        title: "Predictive Revenue & Dynamic Pricing",
        description:
          "Historical booking data, local corporate travel trends, and online travel agency (OTA)",
      },
      {
        title: "Hyper-Personalization",
        description: "Guest feedback, travel preferences",
      },
    ],
  },
  {
    number: "03",
    eyebrow: "Villas",
    title: "Villas shaped around the island concept.",
    image: "/purura_resort_images/purura_render_15.jpg",
    secondaryImage: "/purura_resort_images/purura_render_16.jpg",
    items: [
      {
        title: "Villa Island Concept Brief",
        description: "",
      },
      {
        title: "Villa Typology",
        description: "",
      },
      {
        title: "Interior and Exterior",
        description: "",
      },
      {
        title: "Services",
        description: "",
      },
    ],
  },
  {
    number: "04",
    eyebrow: "Hotels",
    title: "A hotel concept defined by its architecture.",
    image: "/purura_resort_images/purura_render_15.jpg",
    secondaryImage: "/purura_resort_images/purura_render_16.jpg",
    items: [
      {
        title: "Concept Brief",
        description: "",
      },
      {
        title: "Exterior Images",
        description: "",
      },
      {
        title: "Room Typology Brief",
        description: "",
      },
      {
        title: "Interior of the Rooms",
        description: "",
      },
      {
        title: "Services",
        description: "",
      },
    ],
  },
  {
    number: "05",
    eyebrow: "Recreational & Future Wellness Zone",
    title: "A new dimension of recreation and wellness.",
    image: "/purura_resort_images/purura_render_15.jpg",
    secondaryImage: "/purura_resort_images/purura_render_16.jpg",
    items: [
      {
        title: "Biohacking Spa",
        description: "",
      },
      {
        title: "Sound Therapy Pods",
        description: "",
      },
      {
        title: "Floating Yoga Decks",
        description: "",
      },
      {
        title: "Gymnasium / Yoga Studio",
        description: "",
      },
      {
        title: "Spa / Sauna Reception",
        description: "",
      },
      {
        title: "Main Swimming Pool",
        description: "",
      },
      {
        title: "Children's Pool",
        description: "",
      },
      {
        title: "Pool Deck",
        description: "",
      },
      {
        title: "Pool Lounge Seating",
        description: "",
      },
    ],
  },
];

const reveal = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: customEase },
  },
};

function SectionLabel({
  number,
  eyebrow,
}: {
  number: string;
  eyebrow: string;
}) {
  return (
    <div className="flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-chrome1 font-mono">
      <span className="text-champagne/70">{number}</span>
      <span className="h-px w-8 bg-line" />
      <span>{eyebrow}</span>
    </div>
  );
}

function EditorialImage({
  src,
  alt,
  intensity = 0.45,
  className = "",
}: {
  src: string;
  alt: string;
  intensity?: number;
  className?: string;
}) {
  return (
    <div className="absolute inset-0">
    <Image
      src="/Purura/NewImages/Overall 5.png"
      alt="PURURA resort experience"
      fill
      priority
      sizes="100vw"
      className="object-cover"
    />
  </div>
  );
}

function ExperienceSection({
  section,
  index,
}: {
  section: (typeof experienceSections)[number];
  index: number;
}) {
  const reversed = index % 2 !== 0;

  return (
    <section className="relative overflow-hidden py-28 md:py-40">
      <Container>
        <div
          className={`grid items-start gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24 ${
            reversed ? "lg:[&>div:first-child]:order-2" : ""
          }`}
        >
          {/* Image composition */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="relative min-w-0 pb-16"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-graphite">
              <EditorialImage
                src={section.image}
                alt={section.eyebrow}
                className="absolute inset-0 h-full w-full"
                intensity={0.55}
              />
              <div className="pointer-events-none absolute inset-0 bg-void/10" />
            </div>

            {/* Overlapping parallax image */}
            <motion.div
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 1,
                delay: 0.15,
                ease: customEase,
              }}
              className={`absolute bottom-0 z-10 aspect-[4/5] w-[43%] overflow-hidden border-[10px] border-void ${
                reversed ? "-left-5 md:-left-10" : "-right-5 md:-right-10"
              }`}
            >
              <EditorialImage
                src={section.secondaryImage}
                alt={`${section.eyebrow} detail`}
                className="h-full w-full"
                intensity={0.8}
              />
            </motion.div>
          </motion.div>

          {/* Text composition */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="min-w-0 lg:pt-10"
          >
            <SectionLabel
              number={section.number}
              eyebrow={section.eyebrow}
            />

            <h2 className="mt-7 max-w-xl font-display text-[clamp(2.6rem,4.5vw,5rem)] font-bold leading-[0.94] tracking-[-0.065em] text-bone">
              {section.title}
            </h2>

            <div className="mt-12 border-t border-line">
              {section.items.map((item, itemIndex) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.65,
                    delay: itemIndex * 0.04,
                    ease: customEase,
                  }}
                  className="group border-b border-line py-5 md:py-6"
                >
                  <div className="flex items-start gap-5">
                    <span className="pt-1 text-[10px] font-mono tracking-[0.1em] text-chrome1/60">
                      {String(itemIndex + 1).padStart(2, "0")}
                    </span>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-lg font-semibold leading-snug tracking-[-0.025em] text-bone md:text-xl">
                        {item.title}
                      </h3>

                      {item.description && (
                        <p className="mt-3 max-w-lg text-sm leading-[1.8] text-haze">
                          {item.description}
                        </p>
                      )}
                    </div>

                    <span className="pt-1 text-chrome1/40 transition-transform duration-500 group-hover:translate-x-1">
                      ↗
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-line/50" />
    </section>
  );
}

export default function ExperiencePage() {
  return (
    <main className="relative overflow-hidden bg-void">
      {/* FULL-BLEED HERO — uses your original image path directly */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-void/20">
        <EditorialImage
          src="/Purura/NewImages/Overall 5.png"
          alt="PURURA resort experience"
          className="absolute inset-0 h-full w-full"
          intensity={0.3}
        />

        <div className="pointer-events-none absolute inset-0 bg-black/20" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-void/10 to-transparent" />

        <Container>
          <motion.div
            initial={{ opacity: 0, y: 45 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: customEase }}
            className="relative z-10 max-w-6xl pb-20 pt-40 md:pb-28"
          >
            <div className="flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.4em] text-bone/75 font-mono">
              {/* <span className="h-px w-10 bg-champagne/70" /> */}
              Experience
            </div>

            <h1 className="mt-7 max-w-6xl font-display text-[clamp(3.4rem,8.5vw,9rem)] font-bold leading-[0.87] tracking-[-0.075em] text-cream">
              Designed for
              <br />
              <span className="text-champagne">Discovery</span>
            </h1>

            <div className="mt-10 flex items-end justify-between gap-8">
              <p className="max-w-sm text-sm leading-[1.8] text-bone/65">
                Nature, accommodation, recreation, and future wellness.
              </p>

              <div className="hidden items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-bone/50 font-mono md:flex">
                <span>Scroll to explore</span>
                <span className="h-10 w-px bg-bone/30" />
                <span>↓</span>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* INTRODUCTION */}
      {/* <section className="relative py-24 md:py-36">
        <Container>
          <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
            <motion.p
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-[10px] font-semibold uppercase tracking-[0.35em] text-chrome1 font-mono"
            >
              The Experience
            </motion.p>

            <motion.h2
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-4xl font-display text-[clamp(2rem,4vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-bone"
            >
              A collection of spaces, systems, and environments.
            </motion.h2>
          </div>
        </Container>
      </section> */}

      {experienceSections.map((section, index) => (
        <ExperienceSection
          key={section.number}
          section={section}
          index={index}
        />
      ))}
    </main>
  );
}