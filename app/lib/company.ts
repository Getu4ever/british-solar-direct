export const COMPANY = {
  name: 'British Solar Direct',
  director: 'Juma Mohammedi',
  directorTitle: 'Company Director & Lead Installer',
  address: 'Southwell Lane, Kirkby-in-Ashfield, Nottingham NG17 8EY',
  city: 'Nottingham',
  phone: '+441156712424',
  phoneDisplay: '0115 671 2424',
  email: 'juma@britishsolardirect.co.uk',
  responseTime: 'within 4 business hours',
} as const;

export const DIRECTOR_BIO =
  'Juma Mohammedi is a highly sought-after builder in Nottingham with over 20 years in the construction industry. He personally coordinates delivery and professional installation for the majority of our residential customers — around 90% of whom are local homeowners.';

export const DELIVERY_AREAS = [
  'Nottingham & Nottinghamshire',
  'Derbyshire',
  'Leicestershire',
  'South Yorkshire',
  'East Midlands (by arrangement)',
] as const;

export const DELIVERY_EXCLUSIONS = [
  'Scottish Highlands & Islands',
  'Northern Ireland',
  'Isle of Man & Channel Islands',
  'Remote locations requiring specialist freight (quoted separately)',
] as const;

export const GUIDE_PRICE_NOTE =
  'Guide price (ex. VAT). Your final quote confirms exact pricing, stock, and delivery.';

export const PAYMENT_NOTE =
  'New customers: pro-forma invoice and BACS payment after quote approval.';

export const SUPPLY_CHAIN = [
  'Import solar panels directly from China to the UK',
  'Sell wholesale to installers, builders, and trade buyers',
  'Full container loads — 20ft and 40ft HQ',
  'Shipping documentation and customs paperwork handled',
] as const;

export const TARGET_CUSTOMERS = [
  'Homeowners across Nottingham and the East Midlands',
  'Solar installation companies',
  'Construction firms and builders',
  'Self-builders',
  'Trade buyers and resellers',
] as const;

export type ProductRangeItem = {
  title: string;
  description: string;
  badge: 'in-catalogue' | 'most-popular' | 'on-request';
};

export const PRODUCT_RANGE: ProductRangeItem[] = [
  {
    title: 'The Cottage Setup (4.3kW System)',
    description:
      '9 x LONGi 480W All-Black panels paired with a compact 5kWh hybrid battery system. Perfect for smaller 1-2 bedroom homes and tight roof layouts.',
    badge: 'in-catalogue',
  },
  {
    title: 'The Family Homestead (8.6kW System)',
    description:
      '18 x LONGi 480W All-Black panels paired with a premium 10kWh home battery backup. Engineered to completely wipe out daytime electricity bills for standard 3-4 bedroom detached/semi properties.',
    badge: 'most-popular',
  },
  {
    title: 'The Estate Powerhouse (12.4kW System)',
    description:
      '26 x LONGi 480W All-Black panels paired with a high-capacity 15kWh multi-stack battery bank. Designed for large detached properties, home businesses, and electric vehicle (EV) fast charging integration.',
    badge: 'on-request',
  },
];
