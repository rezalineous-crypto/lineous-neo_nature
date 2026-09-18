export interface MasterplanLocation {
  id: string;
  title: string;
  description: string;

  // EXACT point on the masterplan
  x: number;
  y: number;

  // Popup position — completely independent from x/y
  popupX: number;
  popupY: number;

  align?: "left" | "center" | "right";
}

export const masterplanLocations: MasterplanLocation[] = [
  /*
   * ============================================================
   * VILLA ISLANDS
   * ============================================================
   */

  {
    id: "island-01",
    title: "Island-01",
    description:
      "Private villa residences integrated into the island landscape.",
    x: 50,
    y: 17.0,
    popupX: 47,
    popupY: 24,
    align: "center",
  },

  {
    id: "island-02",
    title: "Island-02",
    description:
      "A collection of private residences surrounded by water and landscape.",
    x: 37,
    y: 31.6,
    popupX: 34,
    popupY: 40,
    align: "center",
  },

  {
    id: "island-03",
    title: "Island-03",
    description:
      "A secluded villa island positioned along the western waterfront.",
    x: 22,
    y: 52.2,
    popupX: 21,
    popupY: 58,
    align: "center",
  },

  /*
   * ============================================================
   * RECREATION
   * ============================================================
   */

  {
    id: "badminton-court",
    title: "Badminton Court",
    description:
      "Dedicated badminton facilities within the resort recreation zone.",
    x: 58.3,
    y: 37.0,
    popupX: 58,
    popupY: 27,
    align: "center",
  },

  {
    id: "tennis-court",
    title: "Tennis Court",
    description:
      "Dedicated tennis facilities integrated into the recreation zone.",
    x: 65.5,
    y: 31.0,
    popupX: 69,
    popupY: 20,
    align: "center",
  },

  {
    id: "gaming",
    title: "Gaming",
    description: "An indoor entertainment and gaming destination.",
    x: 31,
    y: 62,
    popupX: 20,
    popupY: 72,
    align: "center",
  },

  {
    id: "multi-purpose-field",
    title: "Multi Purpose field",
    description:
      "Flexible outdoor grounds for sports and recreational activities.",
    x: 47.1,
    y: 61.2,
    popupX: 44,
    popupY: 69,
    align: "center",
  },

  /*
   * ============================================================
   * HOSPITALITY
   * ============================================================
   */

  {
    id: "secondary-lobby",
    title: "Secondary Lobby, Lounge, Cafe",
    description:
      "A secondary hospitality hub connecting the resort's central zones.",
    x: 34.6,
    y: 50.1,
    popupX: 40,
    popupY: 43,
    align: "center",
  },
  {
    id: "secondary-lobby",
    title: "Secondary Lobby, Lounge, Cafe",
    description:
      "A secondary hospitality hub connecting the resort's central zones.",
    x: 48,
    y: 28,
    popupX: 40,
    popupY: 43,
    align: "center",
  },

  {
    id: "cafe",
    title: "Cafe",
    description: "A waterfront cafe positioned within the central resort area.",
    x: 64.2,
    y: 40.1,
    popupX: 68,
    popupY: 47,
    align: "center",
  },

  {
    id: "indoor-themed-restaurant",
    title: "Indoor Themed Restaurant",
    description:
      "An immersive indoor dining destination with a distinctive themed environment.",
    x: 25.6,
    y: 69,
    popupX: 29,
    popupY: 57,
    align: "center",
  },

  {
    id: "entrance-reception",
    title: "Entrance, Reception Lobby, Lounge, Restaurant",
    description:
      "The principal arrival and hospitality destination of the resort.",
    x: 69,
    y: 27.0,
    popupX: 76,
    popupY: 39,
    align: "center",
  },

  {
    id: "hotel-building",
    title: "Hotel Building",
    description:
      "The main hotel destination overlooking the resort's central landscape.",
    x: 72,
    y: 42,
    popupX: 84,
    popupY: 52,
    align: "center",
  },

  /*
   * ============================================================
   * OTHER FACILITIES
   * ============================================================
   */

  {
    id: "staff-accommodation",
    title: "Staff accommodation",
    description: "Dedicated accommodation supporting resort operations.",
    x: 55.5,
    y: 5.5,
    popupX: 45,
    popupY: 12,
    align: "center",
  },

  {
    id: "security-north",
    title: "Security",
    description:
      "Controlled access and security facility serving the northern zone.",
    x: 55.5,
    y: 5.5,
    popupX: 48,
    popupY: 13,
    align: "center",
  },

  {
    id: "mosque",
    title: "Mosque",
    description: "A dedicated spiritual and community space within the resort.",
    x: 65,
    y: 13.8,
    popupX: 76,
    popupY: 16,
    align: "center",
  },

  {
    id: "security-east",
    title: "Security",
    description:
      "Controlled access point serving the eastern side of the resort.",
    x: 74,
    y: 19.8,
    popupX: 86,
    popupY: 24,
    align: "center",
  },

  {
    id: "service-east",
    title: "Service",
    description: "Dedicated operational and service facilities.",
    x: 84,
    y: 32.6,
    popupX: 84,
    popupY: 43,
    align: "center",
  },

  {
    id: "service-west",
    title: "Service",
    description: "Dedicated operational and service facilities.",
    x: 12,
    y: 61,
    popupX: 10,
    popupY: 70,
    align: "left",
  },
];
