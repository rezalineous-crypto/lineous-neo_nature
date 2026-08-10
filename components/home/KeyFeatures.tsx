"use client";

import Container from "../layout/Container";
import ParallaxImage from "./ParallaxImage";
import RevealSection from "./RevealSection";

const features = [
  {
    title: "Private Villa Districts",
    description:
      "Luxury villas, private pools, elevated stays, and nature-integrated accommodation clusters.",
    image: "/purura_resort_images/purura_render_11.jpg",
  },
  {
    title: "Wellness and Waterfront",
    description:
      "Bio-filtered landscapes, reflective water experiences, and restorative wellness programming.",
    image: "/purura_resort_images/purura_render_10.jpg",
  },
  {
    title: "Intelligent Hospitality",
    description:
      "Smart guest journeys, AI-enabled services, and seamless resort operations.",
    image: "/purura_resort_images/purura_render_19.jpg",
  },
  {
    title: "Culture and Experiences",
    description:
      "Curated cultural programming, events, dining, and immersive destination experiences.",
    image: "/purura_resort_images/purura_render_16.jpg",
  },
  {
    title: "Investor-Ready Ecosystem",
    description:
      "Diversified revenue streams across hospitality, villas, events, wellness, and experiences.",
    image: "/purura_resort_images/purura_render_20.jpg",
  },
];

export default function KeyFeatures() {
  return (
    <section id="key-features" className="relative bg-void py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(201,169,255,0.06),transparent_40%),radial-gradient(circle_at_30%_70%,rgba(142,197,255,0.04),transparent_40%)] pointer-events-none" />
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-stretch">
          <div className="relative h-full overflow-hidden rounded-[2rem] bg-graphite">
            <ParallaxImage
              src="/purura_resort_images/purura_render_03.jpg"
              alt="Neo Nature key features"
              fill
              intensity={1.15}
              className="object-cover"
            />
            <div className="absolute inset-0" />
          </div>

          <RevealSection delay={0.12}>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-chrome1 font-mono">
              Key Features
            </p>

            <h2 className="mt-6 text-4xl md:text-6xl font-bold leading-none tracking-[-0.05em] text-bone font-display">
              One destination. Multiple premium value drivers.
            </h2>

            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <RevealSection
                  key={feature.title}
                  delay={0.06 + index * 0.04}
                  className="group relative rounded-2xl border border-line bg-graphite/50 overflow-hidden"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <ParallaxImage
                      src={feature.image}
                      alt={feature.title}
                      fill
                      intensity={0.5}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-overlay/10 to-transparent" />
                  </div>
                  <div className="p-6">
                    <div className="mb-4 h-px w-12 bg-chrome1" />
                    <h3 className="text-lg font-bold tracking-[-0.02em] text-bone font-display">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-haze font-display">
                      {feature.description}
                    </p>
                  </div>
                </RevealSection>
              ))}
            </div>
          </RevealSection>
        </div>
      </Container>
    </section>
  );
}
