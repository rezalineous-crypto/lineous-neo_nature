"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Container from "@/components/layout/Container";
import { customEase } from "@/components/home/Hero";

const amenitySections = [
  {
    number: "02",
    eyebrow: "Next-Gen Dining",
    title: "Where intelligent hospitality meets culinary artistry.",
    intro:
      "Dining at PURURA brings together refined cuisine, waterfront atmosphere, and a new generation of intelligent hospitality.",
    image: "/Purura/NewImages/Restaurant 1.png",
    secondaryImage: "/Purura/NewImages/Restaurant 2.png",
    items: [
      {
        title: "Main Kitchen & Dining",
        description:
          "250 seats with automated service options, Cloud POS & ERP Software, Self-Ordering Kiosks, Robotic Food Delivery, Wireless Calling & Paging Systems, KDS and holographic menu displays.",
      },
      {
        title: "Fine Dining Waterfront Restaurant",
        description:
          "A destination restaurant positioned directly within the waterfront experience.",
      },
      {
        title: "Cocktail Bar / Pool Bar / Poolside Café",
        description:
          "Relaxed food and beverage spaces connected to the resort's pool and leisure environment.",
      },
      {
        title: "Rooftop Café / Bar",
        description:
          "An elevated dining and social destination within the hotel building.",
      },
      {
        title: "Main Kitchen Design Concept",
        description:
          "Concept brief, capacity planning, and exterior and interior design imagery.",
      },
    ],
  },

  {
    number: "01",
    eyebrow: "MICE",
    title:
      "A new destination for meetings, conferences and meaningful gatherings.",
    intro:
      "PURURA's MICE environment connects arrival, hospitality, technology and large-scale gathering within one seamless destination.",
    image: "/Purura/NewImages/Hotel 1.png",
    secondaryImage: "/Purura/NewImages/Hotel 2.png",
    items: [
      {
        title: "Arrival & Welcoming Hub",
        description:
          "Digital immersive gateway and entrance plaza with LED display / projection and a dedicated security screening area.",
      },
      {
        title: "AI-Assisted Check-in Pavilion",
        description:
          "Integrated hardware and software systems designed around an intelligent arrival experience.",
      },
      {
        title: "AI Concierge System",
        description:
          "Technology-enabled guest assistance throughout the MICE and hospitality environment.",
      },
      {
        title: "Smart Parking with EV Charging",
        description: "Smart parking infrastructure with 5 EV charging ports.",
      },
      {
        title: "Convention & Exhibition",
        description:
          "Convention hall, seminar and conference rooms, and exhibition halls for large-scale gatherings.",
      },
      {
        title: "Business Lounge / Lobby Café",
        description:
          "A relaxed business environment for meetings, waiting and informal interaction.",
      },
      {
        title: "Guest Services",
        description:
          "Souvenir shop, convenience store, travel desk, ATM corner, beauty salon and barbershop.",
      },
    ],
  },

  {
    number: "03",
    eyebrow: "Events",
    title: "Spaces designed for celebration, movement and connection.",
    intro:
      "From the waterfront to the pool and open field, PURURA creates flexible environments for intimate gatherings and large-scale events.",
    image: "/Purura/NewImages/Overall 3.png",
    secondaryImage: "/Purura/NewImages/Overall 4.png",
    items: [
      {
        title: "Waterfront Activities",
        description:
          "Waterfront programming ranging from intimate internal activities to larger-scale events.",
      },
      {
        title: "Swimming Pool & Poolside Café",
        description:
          "A social leisure environment combining water, food and relaxed outdoor living.",
      },
      {
        title: "Gaming Facilities",
        description:
          "Dedicated spaces for gaming and recreational entertainment.",
      },
      {
        title: "Multipurpose Events on the Field",
        description:
          "An adaptable open-field environment for concerts, celebrations and large-format events.",
      },
    ],
  },
];

const reveal = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: customEase,
    },
  },
};

const imageReveal = {
  hidden: { opacity: 0, scale: 1.08 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: customEase },
  },
};

function EditorialImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 1024px) 100vw, 70vw"
      className={`object-cover ${className}`}
    />
  );
}

function ChapterLabel({
  number,
  eyebrow,
}: {
  number: string;
  eyebrow: string;
}) {
  return (
    <div className="flex items-center gap-4 font-mono text-[15px] uppercase tracking-[0.32em] text-chrome2">
      <span className="text-chrome2">{number}</span>
      <span className="h-px w-8 bg-chrome2" />
      <span>{eyebrow}</span>
    </div>
  );
}

function CornerLines() {
  return (
    <>
      <span className="pointer-events-none absolute left-0 top-0 h-12 w-12 border-l border-t border-champagne/50" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-12 w-12 border-b border-r border-champagne/50" />
    </>
  );
}

function AmenityList({
  items,
}: {
  items: {
    title: string;
    description: string;
  }[];
}) {
  return (
    <div className="mt-12 border-t border-void/15">
      {items.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.65,
            delay: index * 0.045,
            ease: customEase,
          }}
          className="group border-b border-void/15 py-6"
        >
          <div className="grid grid-cols-[34px_1fr_auto] gap-4">
            <span className="font-mono text-[12px] tracking-[0.15em] text-charcoal/35">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div>
              <h3 className="font-display text-xl font-medium tracking-[-0.02em] text-charcoal md:text-xl">
                {item.title}
              </h3>

              {item.description && (
                <p className="mt-2 max-w-xl text- leading-[1.75] text-charcoal/55">
                  {item.description}
                </p>
              )}
            </div>

            <span className="font-mono text-xs text-charcoal/25 transition-transform duration-500 group-hover:translate-x-1">
              ↗
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function DiningChapter() {
  const section = amenitySections[0];

  return (
    <section className="relative bg- py-28 md:py-40 lg:py-52">
      <Container>
        <ChapterLabel number={section.number} eyebrow={section.eyebrow} />

        <div className="mt-14 grid items-end gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-24">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="relative"
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={imageReveal}
              className="relative aspect-[1.35/1] overflow-hidden"
            >
              <EditorialImage src={section.image} alt={section.eyebrow} />

              <CornerLines />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 1,
                delay: 0.15,
                ease: customEase,
              }}
              className="absolute -bottom-16 right-6 w-[38%] md:right-10 md:w-[32%]"
            >
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={imageReveal}
                className="relative aspect-[0.8/1] overflow-hidden border-[8px] border-bone"
              >
                <EditorialImage
                  src={section.secondaryImage}
                  alt={`${section.eyebrow} detail`}
                />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="pb-3 lg:pb-10"
          >
            <h2 className="max-w-lg font-display text-[clamp(2.5rem,4.4vw,5rem)] font-medium leading-[0.94] tracking-[-0.055em] text-champagne">
              {section.title}
            </h2>

            {/* <p className="mt-7 max-w-md leading-[1.8] text-champagne">
              {section.intro}
            </p> */}
          </motion.div>
        </div>

        <div className="mt-28 lg:ml-[25%] lg:w-[65%]">
          <AmenityList items={section.items} />
        </div>
      </Container>
    </section>
  );
}

function MiceChapter() {
  const section = amenitySections[1];

  return (
    <section className="relative bg-void py-28 md:py-40 lg:py-52">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:pt-16"
          >
            <ChapterLabel number={section.number} eyebrow={section.eyebrow} />

            <h2 className="mt-8 max-w-md font-display text-[clamp(2.4rem,4vw,4.6rem)] font-medium leading-[0.95] tracking-[-0.055em] text-champagne">
              {section.title}
            </h2>
{/* 
            <p className="mt-7 max-w-sm text-sm leading-[1.8] text-void/55">
              {section.intro}
            </p> */}

            <div className="mt-12 h-px w-20 bg-champagne" />
          </motion.div>

          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={imageReveal}
              className="relative aspect-[1.2/0.82] overflow-hidden"
            >
              <EditorialImage src={section.image} alt={section.eyebrow} />

              <CornerLines />
            </motion.div>

            <div className="relative ml-auto mt-[-12%] w-[52%] md:w-[40%] lg:mt-[-16%]">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={imageReveal}
                className="relative aspect-[1/1.1] overflow-hidden border-[8px] border-[#e8e4da]"
              >
                <EditorialImage
                  src={section.secondaryImage}
                  alt={`${section.eyebrow} detail`}
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="mt-20 lg:ml-[25%] lg:w-[68%]">
          <AmenityList items={section.items} />
        </div>
      </Container>
    </section>
  );
}

function EventsChapter() {
  const section = amenitySections[2];

  return (
    <section className="relative bg-bone/5 py-28 md:py-40 lg:py-52">
      <Container>
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mx-auto max-w-2xl text-center"
        >
          <ChapterLabel number={section.number} eyebrow={section.eyebrow} />

          <h2 className="mt-8 font-display text-[clamp(2.6rem,5vw,5.5rem)] font-medium leading-[0.94] tracking-[-0.06em] text-champagne">
            {section.title}
          </h2>

          {/* <p className="mx-auto mt-7 max-w-md leading-[1.8] text-champagne/55">
            {section.intro}
          </p> */}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 1, ease: customEase }}
          className="relative mx-auto mt-20 max-w-6xl"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            variants={imageReveal}
            className="relative aspect-[1.7/1] overflow-hidden"
          >
            <EditorialImage src={section.image} alt={section.eyebrow} />

            <CornerLines />
          </motion.div>

          <div className="relative ml-auto mt-[-10%] w-[55%] md:w-[38%]">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={imageReveal}
              className="relative aspect-[1/0.8] overflow-hidden border-[8px] border-bone"
            >
              <EditorialImage
                src={section.secondaryImage}
                alt={`${section.eyebrow} detail`}
              />
            </motion.div>
          </div>
        </motion.div>

        <div className="mx-auto mt-24 max-w-4xl">
          <AmenityList items={section.items} />
        </div>
      </Container>
    </section>
  );
}

export default function AmenitiesPage() {
  return (
    <main className="relative overflow-hidden bg-champagne/20 text-void">
      {/* ─────────────────────────────────────────────
          HERO
      ───────────────────────────────────────────── */}

      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-void/20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={imageReveal}
          className="absolute inset-0"
        >
          <EditorialImage
            src="/purura_resort_images/purura_render_07.jpg"
            alt="PURURA amenities"
            className="absolute inset-0 h-full w-full"
          />
        </motion.div>

        <div className="pointer-events-none absolute inset-0 bg-black/20" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-void/10 to-transparent" />

        <Container>
          <motion.div
            initial={{ opacity: 0, y: 45 }}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: customEase }}
            className="relative z-10 max-w-6xl pb-20 pt-40 md:pb-10"
          >
            <div className="flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.4em] text-bone/75 font-mono">
              {/* <span className="h-px w-10 bg-champagne/70" /> */}
              Amenities
            </div>

            <h1 className="mt-7 max-w-6xl font-display text-[clamp(3.4rem,8.5vw,8rem)] font-bold leading-[0.87] tracking-[-0.075em] text-cream">
              Hospitality with
              <br />
              <span className="text-champagne">Intelligence</span>
            </h1>

            <div className="mt-10 flex items-end justify-between gap-8">
              <p className="max-w-sm text-sm leading-[1.8] text-bone/65">
                Dining, MICE and events brought together through technology,
                architecture and a distinctly PURURA approach to hospitality.
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

      {/* ─────────────────────────────────────────────
          INTRO
      ───────────────────────────────────────────── */}

      {/* <section className="bg-bone py-28 md:py-36">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: customEase }}
            className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-20"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-void/40">
              The PURURA Amenities
            </div>

            <p className="max-w-3xl font-display text-[clamp(1.7rem,3vw,3.3rem)] font-medium leading-[1.05] tracking-[-0.045em] text-void">
              Every amenity is conceived as part of the destination itself — not
              simply a service, but an environment for gathering, discovery and
              experience.
            </p>
          </motion.div>
        </Container>
      </section> */}

      {/* ─────────────────────────────────────────────
          CHAPTERS
      ───────────────────────────────────────────── */}

      <MiceChapter />
      <DiningChapter />
      <EventsChapter />

      {/* ─────────────────────────────────────────────
          CLOSING
      ───────────────────────────────────────────── */}

      {/* <section className="bg-void py-32 md:py-44">
        <Container>
          <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-champagne">
                PURURA
              </div>

              <p className="mt-5 max-w-xl font-display text-2xl leading-[1.1] tracking-[-0.03em] text-bone md:text-3xl">
                A destination where hospitality, technology and experience exist
                as one.
              </p>
            </div>

            <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-bone/35">
              Amenities / 03
            </div>
          </div>
        </Container>
      </section> */}
    </main>
  );
}
