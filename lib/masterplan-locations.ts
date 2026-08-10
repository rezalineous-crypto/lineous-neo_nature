export interface LocationFeature {
  label: string;
  value: string;
}

export interface MasterplanLocation {
  id: string;
  title: string;
  description: string;
  x: number; // percentage from left
  y: number; // percentage from top
  status: "planned" | "under-construction" | "completed";
  completion: string;
  capacity: string;
  technology: string[];
  sustainability: string[];
  features: LocationFeature[];
  accentColor: string;
  icon: string;
}

export const masterplanLocations: MasterplanLocation[] = [
  {
    id: "arrival-pavilion",
    title: "Arrival Pavilion",
    description:
      "A futuristic gateway experience featuring autonomous mobility, AI concierge services, biometric check-in, and a landmark arrival plaza with living walls.",
    x: 18,
    y: 22,
    status: "planned",
    completion: "Phase 1 — 2027",
    capacity: "500 guests/hr",
    technology: ["AI Concierge", "Biometric Entry", "Autonomous Transport", "Smart Climate"],
    sustainability: ["Living Walls", "Rainwater Harvest", "Solar Canopy", "Zero-Waste Operations"],
    features: [
      { label: "Check-in", value: "Biometric" },
      { label: "Transport", value: "Autonomous EV" },
      { label: "Plaza", value: "2,400 m²" },
      { label: "Green Wall", value: "180 m²" },
    ],
    accentColor: "#C9A45A",
    icon: "compass",
  },
  {
    id: "luxury-hotel",
    title: "Luxury Hotel",
    description:
      "A 5-star boutique hotel with 120 suites, sky gardens, infinity pools, and panoramic views of the resort landscape.",
    x: 35,
    y: 38,
    status: "under-construction",
    completion: "Phase 1 — 2027",
    capacity: "120 suites",
    technology: ["Smart Room OS", "AI Butler", "Holographic Concierge", "Energy AI"],
    sustainability: ["Net-Zero Energy", "Greywater Recycling", "Green Roof", "Local Materials"],
    features: [
      { label: "Suites", value: "120" },
      { label: "Pools", value: "3 Infinity" },
      { label: "Dining", value: "6 venues" },
      { label: "Spa", value: "2,000 m²" },
    ],
    accentColor: "#8EC5FF",
    icon: "building",
  },
  {
    id: "resort-villas",
    title: "Resort Villas",
    description:
      "Clusters of pod villas, floating villas, and elevated sky villas seamlessly integrated into the natural landscape.",
    x: 55,
    y: 52,
    status: "planned",
    completion: "Phase 2 — 2028",
    capacity: "48 villas",
    technology: ["Smart Home OS", "Private Infinity Pool", "AI Climate Control", "Secure Access"],
    sustainability: ["Off-Grid Ready", "Solar Roof", "Rainwater System", "Native Landscaping"],
    features: [
      { label: "Villas", value: "48" },
      { label: "Types", value: "Pod / Sky / Float" },
      { label: "Pool", value: "Private each" },
      { label: "Butler", value: "24/7" },
    ],
    accentColor: "#C9A9FF",
    icon: "home",
  },
  {
    id: "lagoon",
    title: "Lagoon",
    description:
      "Bio-filtered water systems, floating experiences, reflective landscapes, and aquatic wellness spaces.",
    x: 28,
    y: 68,
    status: "planned",
    completion: "Phase 2 — 2028",
    capacity: "200 swimmers",
    technology: ["Bio-Filtration", "Smart Lighting", "Water Quality AI", "Aquatic Sensors"],
    sustainability: ["Natural Filtration", "Zero Chemicals", "Native Flora", "Wildlife Habitat"],
    features: [
      { label: "Area", value: "12,000 m²" },
      { label: "Depth", value: "0–3 m" },
      { label: "Water", value: "Bio-filtered" },
      { label: "Deck", value: "Floating" },
    ],
    accentColor: "#4a8c3f",
    icon: "waves",
  },
  {
    id: "marina",
    title: "Marina",
    description:
      "Private marina with yacht charter services, deep-water docking, and a waterfront promenade.",
    x: 72,
    y: 28,
    status: "planned",
    completion: "Phase 3 — 2029",
    capacity: "40 berths",
    technology: ["Smart Docking", "Yacht Charter AI", "Marine Sensors", "Helipad"],
    sustainability: ["Electric Charging", "Wave Energy", "Seagrass Restoration", "Eco-Moorings"],
    features: [
      { label: "Berths", value: "40" },
      { label: "Depth", value: "5 m" },
      { label: "Helipad", value: "1" },
      { label: "Charter", value: "On-site" },
    ],
    accentColor: "#8b7355",
    icon: "anchor",
  },
  {
    id: "sports-complex",
    title: "Sports Complex",
    description:
      "A world-class sports facility with tennis courts, a fitness center, and adventure sports.",
    x: 62,
    y: 42,
    status: "planned",
    completion: "Phase 2 — 2028",
    capacity: "500 users",
    technology: ["Smart Courts", "Performance AI", "Wearable Integration", "Booking App"],
    sustainability: ["Solar Shading", "Recycled Surfaces", "Native Trees", "Water Recycling"],
    features: [
      { label: "Courts", value: "8 Tennis" },
      { label: "Fitness", value: "1,500 m²" },
      { label: "Adventure", value: "Zip / Climb" },
      { label: "Padel", value: "4 courts" },
    ],
    accentColor: "#3ab0c0",
    icon: "dumbbell",
  },
  {
    id: "wellness-center",
    title: "Wellness Center",
    description:
      "A holistic wellness sanctuary with hydrotherapy, meditation pods, yoga pavilions, and thermal suites.",
    x: 42,
    y: 58,
    status: "under-construction",
    completion: "Phase 1 — 2027",
    capacity: "80 guests",
    technology: ["Hydrotherapy AI", "Meditation App", "Thermal Sensors", "Sound Therapy"],
    sustainability: ["Natural Materials", "Living Roof", "Spring Water", "Zero Chemicals"],
    features: [
      { label: "Hydrotherapy", value: "Yes" },
      { label: "Saunas", value: "6" },
      { label: "Yoga", value: "2 Pavilions" },
      { label: "Meditation", value: "12 Pods" },
    ],
    accentColor: "#4a8c3f",
    icon: "leaf",
  },
  {
    id: "amphitheater",
    title: "Amphitheater",
    description:
      "An open-air amphitheater carved into the landscape for cultural events, performances, and stargazing nights.",
    x: 48,
    y: 75,
    status: "planned",
    completion: "Phase 3 — 2029",
    capacity: "1,200 seats",
    technology: ["360° Sound", "Holographic Stage", "Starlight Projection", "Climate Control"],
    sustainability: ["Earth-Sheltered", "Natural Acoustics", "Solar Lighting", "Native Planting"],
    features: [
      { label: "Seats", value: "1,200" },
      { label: "Stage", value: "Holographic" },
      { label: "Sound", value: "360° Spatial" },
      { label: "Events", value: "200+/yr" },
    ],
    accentColor: "#C9A45A",
    icon: "music",
  },
  {
    id: "restaurants",
    title: "Restaurants",
    description:
      "A curated collection of fine-dining restaurants, beachside grills, and rooftop bars with farm-to-table experiences.",
    x: 68,
    y: 55,
    status: "planned",
    completion: "Phase 2 — 2028",
    capacity: "600 covers",
    technology: ["AI Sommelier", "Holographic Menus", "Kitchen Robotics", "Reservation AI"],
    sustainability: ["Zero-Km Sourcing", "Composting", "Solar Kitchens", "Edible Gardens"],
    features: [
      { label: "Venues", value: "8" },
      { label: "Cuisines", value: "12+" },
      { label: "Bars", value: "4" },
      { label: "Farm", value: "On-site" },
    ],
    accentColor: "#f5e6d3",
    icon: "utensils",
  },
  {
    id: "event-hall",
    title: "Event Hall",
    description:
      "A grand event hall for conferences, galas, and exhibitions with modular spaces and cutting-edge AV.",
    x: 78,
    y: 45,
    status: "planned",
    completion: "Phase 3 — 2029",
    capacity: "2,000 guests",
    technology: ["Modular AV", "Holographic Displays", "Live Translation AI", "Smart Booking"],
    sustainability: ["Modular Build", "Recyclable Materials", "Energy Storage", "EV Charging"],
    features: [
      { label: "Capacity", value: "2,000" },
      { label: "Modular", value: "Yes" },
      { label: "AV", value: "Holographic" },
      { label: "Parking", value: "200 EV" },
    ],
    accentColor: "#C9A9FF",
    icon: "calendar",
  },
];

export const locationIconMap: Record<string, React.ReactNode> = {
  compass: null,
  building: null,
  home: null,
  waves: null,
  anchor: null,
  dumbbell: null,
  leaf: null,
  music: null,
  utensils: null,
  calendar: null,
};
