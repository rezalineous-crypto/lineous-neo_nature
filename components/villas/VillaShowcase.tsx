"use client";

import Container from "../layout/Container";
import ParallaxImage from "../home/ParallaxImage";
import RevealSection from "../home/RevealSection";

const villas = [
  {
    name: "The Overwater Pavilion",
    subtitle: "Accommodation",
    description:
      "Floating above reflective lagoons, these pavilions merge indoor luxury with the rhythm of water.",
    image: "/purura_resort_images/purura_render_11.jpg",
  },
  {
    name: "The Canopy Suite",
    subtitle: "Accommodation",
    description:
      "Elevated among the canopy, these suites offer immersive nature views with private terraces.",
    image: "/purura_resort_images/purura_render_12.jpg",
  },
  {
    name: "The Horizon Villa",
    subtitle: "Accommodation",
    description:
      "Panoramic glass walls frame uninterrupted views of the horizon, blending indoor comfort with outdoor grandeur.",
    image: "/purura_resort_images/purura_render_13.jpg",
  },
  {
    name: "The Garden Retreat",
    subtitle: "Accommodation",
    description:
      "Private garden sanctuaries with outdoor showers, native landscaping, and seamless indoor-outdoor flow.",
    image: "/purura_resort_images/purura_render_14.jpg",
  },
];

export default function VillaShowcase() {
  return (
    <section className="py-24 md:py-32 bg-void text-bone">
      <Container className="relative z-10">
        {villas.map((villa, index) => (
          <div
            key={villa.name}
            className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 last:mb-0`}
          >
            <RevealSection delay={index * 0.1}>
              <span className="uppercase tracking-[0.3em] text-xs text-chrome1 font-mono">
                {villa.subtitle}
              </span>

              <h3 className="text-5xl md:text-4xl font-bold mt-6 leading-none tracking-[-0.05em] text-bone">
                {villa.name}
              </h3>

              <p className="mt-4 text-lg text-haze leading-relaxed max-w-2xl">
                {villa.description}
              </p>
            </RevealSection>

            <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-graphite">
              <ParallaxImage
                src={villa.image}
                alt={villa.name}
                fill
                intensity={0.5}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-overlay/10" />
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
