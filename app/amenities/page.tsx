"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import Container from "@/components/layout/Container";
import Image from "next/image";
import StickyImageCollage from "@/components/home/StickyImageCollage";
import {
  BotanicalBottom,
  BotanicalLeft,
  BotanicalRight,
  BotanicalWrapper,
} from "@/components/home/BotanicalElements";
import { customEase } from "@/components/home/Hero";

const amenitySections = [
  {
    number: "01",
    eyebrow: "MICE",
    image: "/Purura/NewImages/Hotel 1.png",
    secondaryImage: "/Purura/NewImages/Hotel 2.png",
    items: [
      {
        title: "Arrival & Welcoming Hub",
        description:
          "Digital immersive gateway/ entrance plaza- LED display/projection, Security screening area",
      },
      {
        title: "AI-assisted check-in pavilion",
        description: "Hardware & Software Integration",
      },
      {
        title: "AI concierge system",
        description: "",
      },
      {
        title: "Smart parking with EV charging",
        description: "5 charging port",
      },
      {
        title: "Convention hall, Seminar and Conference room, Exhibition halls",
        description: "",
      },
      {
        title: "Business lounge/ Lobby café",
        description: "",
      },
      {
        title: "Souvenir shop/ Convenience store/ Travel desk/ ATM corner/ Beauty salon/barbershop",
        description: "",
      },
    ],
  },

  {
    number: "02",
    eyebrow: "Next-Gen Dining",
    image: "/Purura/NewImages/Restaurant 1.png",
    secondaryImage: "/Purura/NewImages/Restaurant 2.png",
    items: [
      {
        title: "Main kitchen and Dining",
        description:
          "(automated service options)/ (250 seats)- Cloud POS & ERP Software, Self-Ordering Kiosks, Robotic Food Delivery, Wireless Calling & Paging Systems, Kitchen Display Systems (KDS). Holographic menu displays",
      },
      {
        title: "Fine dining Waterfront Restaurant",
        description: "",
      },
      {
        title: "Cocktail bar/ Pool bar / Poolside Cafe",
        description: "",
      },
      {
        title: "Rooftop Café/ Bar",
        description: "Hotel building",
      },
      {
        title: "main kitchen design concept",
        description: "brief. Capacity. Exterior and interior images.",
      },
    ],
  },

  {
    number: "03",
    eyebrow: "Events",
    image: "/Purura/NewImages/Overall 3.png",
    secondaryImage: "/Purura/NewImages/Overall 4.png",
    items: [
      {
        title: "waterfront activities",
        description: "internal and large one,",
      },
      {
        title: "swimming pool, poolside café",
        description: "",
      },
      {
        title: "Gaming facilities",
        description: "",
      },
      {
        title: "multipurpose events on the field",
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

function AmenityItem({
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

function MainSection({
  section,
  index,
}: {
  section: (typeof amenitySections)[number];
  index: number;
}) {
  const reversed = index % 2 !== 0;
  const sectionRef = useRef<HTMLDivElement>(null);

  const collageImages = [
    { src: section.image, alt: section.eyebrow, priority: true },
    ...(section.secondaryImage
      ? [{ src: section.secondaryImage, alt: `${section.eyebrow} detail` }]
      : []),
  ];

  /* Botanical placement per section — quiet architectural traces */
  const botanicalConfig = [
    {
      Component: BotanicalLeft,
      wrapperClass:
        "left-[-12%] bottom-[-12%] h-[75%] w-[42%] text-[#667052]/35",
      yFrom: "18%",
      yTo: "-12%",
      rotateFrom: -1.5,
      rotateTo: 1,
    },
    {
      Component: BotanicalRight,
      wrapperClass:
        "-right-[5%] bottom-[-15%] h-[65%] w-[40%] text-[#667052]/30",
      yFrom: "12%",
      yTo: "-18%",
      rotateFrom: 1.5,
      rotateTo: -1,
    },
    {
      Component: BotanicalBottom,
      wrapperClass:
        "left-[12%] bottom-[-1%] h-[42%] w-[76%] text-[#667052]/28",
      yFrom: "20%",
      yTo: "-8%",
      rotateFrom: -0.5,
      rotateTo: 0.5,
    },
  ];

  const botConfig = botanicalConfig[index % botanicalConfig.length];
  const BotComponent = botConfig.Component;

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-36"
    >
      {/* BOTANICAL ELEMENT — quiet architectural trace */}
      <BotanicalWrapper
        scrollTarget={sectionRef}
        yFrom={botConfig.yFrom}
        yTo={botConfig.yTo}
        opacityFrom={0}
        opacityTo={1}
        rotateFrom={botConfig.rotateFrom}
        rotateTo={botConfig.rotateTo}
        scaleFrom={0.97}
        scaleTo={1}
        className={`absolute z-0 ${botConfig.wrapperClass}`}
      >
        <BotComponent />
      </BotanicalWrapper>

      <Container className="relative z-10">
        <div
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
                alt={section.eyebrow}
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
                  alt={`${section.eyebrow} detail`}
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

            {/* SECTION EYEBROW */}

            <h2 className="mt-6 max-w-xl font-display text-[clamp(2.5rem,4vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-bone">
              {section.eyebrow}
            </h2>

            {/* SECTION ITEMS */}

            {"items" in section && section.items && (
              <div className="mt-12 border-t border-line">
                {section.items.map((item, itemIndex) => (
                  <AmenityItem
                    key={item.title}
                    title={item.title}
                    description={item.description}
                    index={itemIndex}
                  />
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

export default function AmenitiesPage() {
  return (
    <main className="relative bg-void">
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

        <Container className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 45 }}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: customEase }}
            className="relative z-10 max-w-6xl pb-20 pt-40 md:pb-10 w-full"
          >
            <div className="flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.4em] text-void font-mono">
              {/* <span className="h-px w-10 bg-champagne/70" /> */}
              Amenities
            </div>

            <h1 className="mt-7 max-w-6xl font-display text-[clamp(2rem,4.7vw,7rem)] font-bold leading-[0.87] tracking-[-0.075em] text-cream">
              Hospitality with
              <span className="text-champagne"> Intelligence</span>
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

      {/* AMENITY SECTIONS */}

      {amenitySections.map((section, index) => (
        <MainSection key={section.number} section={section} index={index} />
      ))}
    </main>
  );
}
