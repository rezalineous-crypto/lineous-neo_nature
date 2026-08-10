"use client";

import Container from "../layout/Container";
import { sustainabilityItems } from "@/lib/sustainability-data";
import SustainabilityItem from "./SustainabilityItem";
import ParallaxImage from "../home/ParallaxImage";

export default function Sustainability() {
  return (
    <section
      id="sustainability"
      className="
        relative bg-void
        overflow-hidden
      "
    >
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <ParallaxImage
          src="/purura_resort_images/purura_render_10.jpg"
          alt="Sustainability"
          fill
          intensity={0.3}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-overlay/70" />
        <div className="absolute inset-0 bg-linear-to-b from-void/50 via-transparent to-void/80" />
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-stretch">
           <div className="sticky top-32 self-start h-full">
            <span
              className="
                uppercase
                tracking-[0.3em]
                text-xs
                text-chrome1
                font-mono
              "
            >
              Future Infrastructure
            </span>

            <h2
              className="
                text-3xl
                md:text-5xl
                font-bold
                mt-8
                leading-none
                tracking-[-0.05em]
                text-bone
                font-display
              "
            >
              Designed
              To Endure
            </h2>

            <p
              className="
                mt-10
                text-lg
                text-haze
                max-w-md
                leading-relaxed
              "
            >
              Sustainability is embedded into the architecture, landscape,
              infrastructure, and operations of the resort.
            </p>
          </div>

          <div className="lg:mt-56 space-y-8">
            {sustainabilityItems.map((item, index) => (
              <SustainabilityItem
                key={item.title}
                title={item.title}
                description={item.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
