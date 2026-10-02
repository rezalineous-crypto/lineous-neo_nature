import Philosophy from "@/components/home/Philosophy";
import TheResort from "@/components/home/TheResort";
import MasterplanExplorer from "@/components/masterplan/MasterplanExplorer";
import Investment from "@/components/home/Investment";
import SectionNav from "@/components/layout/SectionNav";
import ScrollColorTransition from "@/components/home/ScrollColorTransition";
import Banner from "@/components/home/Banner";
import DesignPhilosophy from "@/components/home/DesignPhilosophy";
import PururaMap from "@/components/map/PururaMap";

export default function HomePage() {
  return (
    <>
      <main>
        <ScrollColorTransition />
        <SectionNav
          items={[
            { label: "Philosophy", href: "#philosophy" },
            { label: "Design Philosophy", href: "#design-philosophy" },
            { label: "The Resort", href: "#the-resort" },
            { label: "Masterplan", href: "#masterplan-explorer" },
            { label: "Investment", href: "#investment" },
          ]}
        />
        <Banner />
        <Philosophy />
        <DesignPhilosophy />
        <div>
          <TheResort />
        </div>
        <MasterplanExplorer />
        <Investment />
        <PururaMap />
      </main>
    </>
  );
}
