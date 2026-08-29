export const investmentTypes = [
  {
    id: "luxury",
    name: "Luxury Villa",
    yield: 8,
    appreciation: 4,
    description: "Private pool, panoramic views, full concierge",
  },
  {
    id: "premium",
    name: "Premium Villa",
    yield: 10,
    appreciation: 5,
    description: "Spacious suite with private terrace",
  },
  {
    id: "resort",
    name: "Resort Share",
    yield: 12,
    appreciation: 6,
    description: "Fractional ownership with managed returns",
  },
];

export const durationOptions = [5, 10, 15, 20];

export type InvestmentType = (typeof investmentTypes)[number];