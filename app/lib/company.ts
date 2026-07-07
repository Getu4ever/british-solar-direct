export const COMPANY = {
  name: 'British Solar Direct',
  director: 'Juma Mohammedi',
  directorTitle: 'Company Director & Lead Installer',
  address: 'Southwell Lane, Kirkby-in-Ashfield, Nottingham NG17 8EY',
  city: 'Nottingham',
  phone: '07544414241',
  phoneDisplay: '07544 14241',
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
  'New customers: pro-forma invoice and BACS payment after quote approval. Online card checkout available for confirmed orders.';

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
  status: 'in-catalogue' | 'on-request';
};

export const PRODUCT_RANGE: ProductRangeItem[] = [
  {
    title: 'Monocrystalline panels (400W–650W)',
    description: 'Six core Tier-1 lines in our online catalogue — guide prices and UK stock shown below.',
    status: 'in-catalogue',
  },
  {
    title: 'Bifacial panels',
    description: 'Double-sided modules for higher yield — DeepBlue 650W in catalogue; other lines on request.',
    status: 'in-catalogue',
  },
  {
    title: 'Polycrystalline panels (330W–450W)',
    description: 'Budget-friendly options for trade and project buyers — available on quote.',
    status: 'on-request',
  },
  {
    title: 'Inverters, mounting kits, cables & connectors',
    description: 'Complete system accessories sourced with your panel order — confirm requirements in your quote.',
    status: 'on-request',
  },
];
