"use client";

import Container from "../layout/Container";
import RevealSection from "./RevealSection";
import ParallaxImage from "./ParallaxImage";

const metrics = [
  {
    number: "45M+",
    title: "Urban Consumers",
    description:
      "Millions of residents within reach of premium weekend experiences.",
  },
  {
    number: "90",
    suffix: "min",
    title: "From Dhaka",
    description:
      "Strategically positioned for short-stay and weekend tourism.",
  },
  {
    number: "0",
    title: "Direct Competitors",
    description:
      "No destination currently combines luxury, nature and technology at this scale.",
  },
  {
    number: "↑",
    title: "Tourism Demand",
    description:
      "Growing demand for premium domestic travel continues to outpace supply.",
  },
];

export default function ResortPositioning() {
  return (
    <section
      id="positioning"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <ParallaxImage
          src="/purura_resort_images/purura_render_06.jpg"
          alt="Purura landscape"
          fill
          intensity={0.3}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-overlay/70" />
        {/* <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-void/70" /> */}
      </div>

      <Container className="relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <RevealSection>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-chrome1 font-mono">
              Resort Positioning
            </p>

            <h2 className="mt-6 text-4xl md:text-6xl font-bold leading-none tracking-[-0.05em] text-bone font-display">
              Why PURURA?
            </h2>

            <p className="mt-8 text-lg leading-relaxed text-bone/80 font-display">
              Positioned between Dhakas expanding urban population and vast
              natural landscapes, Valuka presents a rare opportunity to create
              Bangladeshs first eco-inteligent desitination
            </p>
          </RevealSection>

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <RevealSection
                key={metric.title}
                delay={index * 0.1}
                className="group relative rounded-3xl border border-bone/20 bg-void/40 backdrop-blur-sm p-8 text-center transition-all duration-500 hover:border-chrome1/60 hover:bg-void/60"
              >
                <div className="text-5xl md:text-6xl font-bold tracking-tight text-chrome1 font-display">
                  {metric.number}
                  {metric.suffix && (
                    <span className="text-2xl md:text-3xl text-bone/70 ml-1 font-display">
                      {metric.suffix}
                    </span>
                  )}
                </div>

                <h3 className="mt-4 text-lg font-semibold text-bone font-display">
                  {metric.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-bone/70 font-display">
                  {metric.description}
                </p>

                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-8 h-8 overflow-hidden rounded-tr-3xl">
                  <div className="absolute top-0 right-0 w-12 h-12 bg-chrome1/20 rotate-45 translate-x-6 -translate-y-6 transition-transform duration-500 group-hover:translate-x-4 group-hover:-translate-y-4" />
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
