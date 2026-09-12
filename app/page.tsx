import HeroCinematic from "@/components/home/HeroCinematic";
import Philosophy from "@/components/home/Philosophy";
import TheLand from "@/components/home/TheLand";
import TheResort from "@/components/home/TheResort";
import Architecture from "@/components/home/Architecture";
import MasterplanExplorer from "@/components/masterplan/MasterplanExplorer";
import Experiences from "@/components/home/Experiences";
import Residences from "@/components/home/Residences";
import VillaShowcase from "@/components/villas/VillaShowcase";
import Investment from "@/components/home/Investment";
import Legacy from "@/components/home/Legacy";
import VillaCollection from "@/components/villas/VillaCollection";
import Technology from "@/components/technology/Technology";
import InvestmentInquiry from "@/components/investment/InvestmentInquiry";
import SectionNav from "@/components/layout/SectionNav";
import SectionTransition from "@/components/home/SectionTransition";
import ScrollColorTransition from "@/components/home/ScrollColorTransition";
import Hero from "@/components/home/Hero";
import Banner from "@/components/home/Banner";

export default function HomePage() {
  return (
    <>
      <main>
        <ScrollColorTransition />
        <SectionNav
          items={[
            { label: "Philosophy", href: "#philosophy" },
            { label: "The Land", href: "#the-land" },
            { label: "The Resort", href: "#the-resort" },
            { label: "Architecture", href: "#architecture" },
            { label: "Masterplan", href: "#masterplan-explorer" },
            { label: "Investment", href: "#inquiry" },
            { label: "Experiences", href: "#experiences" },
            { label: "Residences", href: "#residences" },
            { label: "Legacy", href: "#legacy" },
          ]}
        />
        <Banner />
        <Philosophy />
        <TheLand />
        <TheResort />
        <VillaShowcase />
        <MasterplanExplorer />
        {/* <InvestmentInquiry /> */}
        <Experiences />
        <Residences />
        <Investment />
        <Architecture />
        <Legacy />
        {/* <VillaCollection /> */}
        <Technology />
      </main>
    </>
  );
}
