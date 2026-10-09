"use client";

import Philosophy from "./Philosophy";
import TheResort from "./TheResort";
import Investment from "./Investment";
import SectionNav from "@/components/layout/SectionNav";
import ScrollColorTransition from "./ScrollColorTransition";
import Banner from "./Banner";
import DesignPhilosophy from "./DesignPhilosophy";
import dynamic from "next/dynamic";

const MasterplanExplorer = dynamic(
  () => import("@/components/masterplan/MasterplanExplorer"),
  { ssr: false, loading: () => <div className="h-screen bg-void" /> }
);
const PururaMapBasic = dynamic(
  () => import("@/components/map/PururaMapBasic"),
  { ssr: false, loading: () => <div className="h-[80vh] bg-void" /> }
);

const SECTION_NAV_ITEMS = [
  { label: "Philosophy", href: "#philosophy" },
  { label: "Design Philosophy", href: "#design-philosophy" },
  { label: "The Resort", href: "#the-resort" },
  { label: "Masterplan", href: "#masterplan-explorer" },
  { label: "Investment", href: "#investment" },
];

export default function FullHome() {
  return (
    <>
      <ScrollColorTransition />
      <SectionNav items={SECTION_NAV_ITEMS} />
      <Banner />
      <Philosophy />
      <DesignPhilosophy />
      <TheResort />
      <Investment />
      <MasterplanExplorer />
      <PururaMapBasic />
    </>
  );
}