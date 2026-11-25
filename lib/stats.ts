/**
 * Company capability metrics shaped to mirror future Sanity CMS schema.
 */

export interface StatItem {
  _id: string;
  value: number;
  suffix: string;
  label: string;
}

export const TRUSTED_HEADER = {
  eyebrow: "TRUSTED BY INDUSTRY LEADERS",
  heading: "Our Clients",
  subtext: "Building strong partnerships with those who trust us.",
} as const;

export const HOME_STATS: StatItem[] = [
  {
    _id: "stat-products",
    value: 224,
    suffix: "+",
    label: "Products",
  },
  {
    _id: "stat-machines",
    value: 60,
    suffix: "+",
    label: "Machines",
  },
  {
    _id: "stat-engineers",
    value: 50,
    suffix: "+",
    label: "Engineers",
  },
];
