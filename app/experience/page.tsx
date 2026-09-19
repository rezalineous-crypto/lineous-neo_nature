"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import Container from "@/components/layout/Container";
import Image from "next/image";
import StickyImageCollage from "@/components/home/StickyImageCollage";

const customEase = [0.16, 1, 0.3, 1] as const;

const experienceSections = [
  {
    number: "01",
    title: "Accommodation",
    image: "/Purura/NewImages/Villa 1.png",
    secondaryImage: "/Purura/NewImages/Villa 2.png",

    subsections: [
      {
        title: "Smart Accommodation",
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
        title: "Villas",
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
        title: "Hotels",
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
    ],
  },
  {
    number: "02",
    title: "Augmented Nature",
    image: "/Purura/NewImages/Overall 5.png",
    secondaryImage: "/Purura/NewImages/Overall 11.png",
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
        title: "Night-time LED Landscape Shows & Immersive Landscapes",
        description: "",
      },
    ],
  },
  {
    number: "03",
    title: "Recreational & Future Wellness Zone",
    image: "/Purura/NewImages/Overall 5.png",
    secondaryImage: "/Purura/NewImages/Overall 11.png",
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
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: customEase,
    },
  },
};

const imageReveal = {
  hidden: { opacity: 0, scale: 1.08 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.1, ease: customEase },
  },
};

function ExperienceItem({
  title,
  description,
  index,
}: {
  title: string;
  description: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.65,
        delay: index * 0.035,
        ease: customEase,
      }}
      className="group border-b border-line py-5 md:py-6"
    >
      <div className="flex items-start gap-5">
        <span className="pt-1 font-mono text-[11px] tracking-[0.1em] text-chrome1">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="font-display text-lg font-semibold leading-snug tracking-[-0.025em] text-bone md:text-xl">
            {title}
          </h3>

          {description && (
            <p className="mt-3 max-w-xl text-sm leading-[1.8] text-haze">
              {description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
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

function SectionImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden bg-graphite">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover"
      />

      <div className="pointer-events-none absolute inset-0 bg-black/10" />
    </div>
  );
}

function MainSection({
  section,
  index,
}: {
  section: (typeof experienceSections)[number];
  index: number;
}) {
  const reversed = index % 2 !== 0;
  const sectionRef = useRef<HTMLDivElement>(null);

  const collageImages = [
    { src: section.image, alt: section.title, priority: true },
    ...(section.secondaryImage
      ? [{ src: section.secondaryImage, alt: `${section.title} detail` }]
      : []),
  ];

  return (
    <section className="relative py-24 md:py-36">
      <Container>
        <div
          ref={sectionRef}
          className={`grid min-h-[100svh] items-start gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24 ${
            reversed ? "lg:[&>div:first-child]:order-2" : ""
          }`}
        >
          {/* STICKY IMAGE COLLAGE (desktop) */}
          <div className="sticky top-42 hidden self-start lg:block">
            <StickyImageCollage
              images={collageImages}
              enableParallax
              scrollTarget={sectionRef}
            />
          </div>

          {/* IMAGE FOR MOBILE (lg:hidden) */}
          <div className="lg:hidden">
            <div className="relative aspect-[4/5] overflow-hidden bg-graphite">
              <Image
                src={section.image}
                alt={section.title}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-black/10" />
            </div>
            {section.secondaryImage && (
              <div className="relative mt-4 aspect-[4/5] overflow-hidden bg-graphite">
                <Image
                  src={section.secondaryImage}
                  alt={`${section.title} detail`}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-black/10" />
              </div>
            )}
          </div>

          {/* CONTENT */}

          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:pt-8"
          >
            {/* SECTION NUMBER */}

            <div className="flex items-center gap-4 font-mono text-[12px] uppercase tracking-[0.3em]">
              <span className="text-champagne/70">{section.number}</span>

              <span className="h-px w-8 bg-line" />
            </div>

            {/* SECTION TITLE */}

            <h2 className="mt-6 max-w-xl font-display text-[clamp(2.5rem,4vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-bone">
              {section.title}
            </h2>

            {/* REGULAR SECTION ITEMS */}

            {"items" in section && section.items && (
              <div className="mt-12 border-t border-line">
                {section.items.map((item, itemIndex) => (
                  <ExperienceItem
                    key={item.title}
                    title={item.title}
                    description={item.description}
                    index={itemIndex}
                  />
                ))}
              </div>
            )}

            {/* ACCOMMODATION SUBSECTIONS */}

            {"subsections" in section && section.subsections && (
              <div className="mt-12">
                {section.subsections.map((subsection) => (
                  <div key={subsection.title} className="mb-14 last:mb-0">
                    <h3 className="mb-5 font-display text-xl font-medium tracking-[-0.025em] text-champagne md:text-2xl">
                      {subsection.title}
                    </h3>

                    <div className="border-t border-line">
                      {subsection.items.map((item, itemIndex) => (
                        <ExperienceItem
                          key={item.title}
                          title={item.title}
                          description={item.description}
                          index={itemIndex}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </Container>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-line/50" />
    </section>
  );
}

export default function ExperiencePage() {
  return (
    <main className="relative bg-void">
      {/* PAGE TITLE */}

      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-void/20">
        <EditorialImage
          src="/Purura/NewImages/Overall 5.png"
          alt="PURURA resort experience"
          className="absolute inset-0 h-full w-full"
          intensity={0.3}
        />

        <div className="pointer-events-none absolute inset-0 bg-black/20" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-void/10 to-transparent" />

        <Container className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 45 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: customEase }}
            className="relative z-10 max-w-6xl pb-20 pt-40 md:pb-10 w-full"
          >
            <div className="flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.4em] text-void font-mono">
              {/* <span className="h-px w-10 bg-champagne/70" /> */}
              Experience
            </div>

            <h1 className="mt-7 max-w-6xl font-display text-[clamp(2rem,4.7vw,7rem)] font-bold leading-[0.87] tracking-[-0.075em] text-cream">
              Designed for
              <span className="text-champagne"> Discovery</span>
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

      {/* EXPERIENCE CONTENT */}

      {experienceSections.map((section, index) => (
        <MainSection key={section.number} section={section} index={index} />
      ))}
    </main>
  );
}
