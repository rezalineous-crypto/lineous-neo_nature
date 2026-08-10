"use client";

import Container from "../layout/Container";
import ParallaxImage from "../home/ParallaxImage";

export default function VillaCollection() {
  return (
    <section
      id="villas"
      className="relative py-40 bg-void text-bone"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_40%,rgba(142,197,255,0.06),transparent_40%)] pointer-events-none" />
      <Container className="relative z-10">
        <div className="max-w-4xl mb-20">
          <span className="uppercase tracking-[0.3em] text-xs text-chrome1 font-mono">
            Accommodation Collection
          </span>

          <h2 className="text-4xl md:text-6xl font-bold mt-6 mb-10 leading-none tracking-[-0.05em] text-bone font-display">
            Private Villa Districts
          </h2>

          <p className="text-xl text-haze max-w-2xl leading-relaxed">
            Three accommodation concepts designed to redefine hospitality through
            nature-integrated luxury and intelligent design.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-graphite">
            <ParallaxImage
              src="/purura_resort_images/purura_render_04.jpg"
              alt="Pod Villas"
              fill
              intensity={0.5}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-overlay/20" />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-void/80 to-transparent">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-chrome1 font-mono">Pod Villas</p>
              <p className="text-lg font-bold text-bone mt-2">Responsive Living</p>
            </div>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-graphite">
            <ParallaxImage
              src="/purura_resort_images/purura_render_05.jpg"
              alt="Tree-Level Sky Villas"
              fill
              intensity={0.5}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-overlay/20" />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-void/80 to-transparent">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-chrome1 font-mono">Tree-Level Sky Villas</p>
              <p className="text-lg font-bold text-bone mt-2">Vertical Living</p>
            </div>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-graphite">
            <ParallaxImage
              src="/purura_resort_images/purura_render_06.jpg"
              alt="Floating Villas"
              fill
              intensity={0.5}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-overlay/20" />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-void/80 to-transparent">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-chrome1 font-mono">Floating Villas</p>
              <p className="text-lg font-bold text-bone mt-2">Aquatic Horizon</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
