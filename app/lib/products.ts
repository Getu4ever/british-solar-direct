export type Product = {
  slug: string;
  name: string;
  brand: string;
  priceInPence: number;
  image: string;
  type: string;
  efficiency: string;
  weight: string;
  dimensions: string;
  description: string;
  category?: string;
  power?: string;
  availability?: string;
  leadTime?: string;
  productWarranty?: string;
  linearPerformanceWarranty?: string;
  moduleModel?: string;
};

export type ModuleSpecRow = {
  label: string;
  value: string;
};

export const VAT_RATE = 0.2;

/** Nameplate data for the LONGi EcoLife LR7-54HVB-480M module used across all packages. */
export const LONGI_ECOLIFE_MODULE = {
  brand: 'LONGi EcoLife',
  model: 'LR7-54HVB-480M',
  technology: 'N-Type HPBC 2.0 (All-Black)',
  efficiency: '23.5%',
  weight: '21.5 kg',
  dimensions: '1762 × 1134 × 30 mm',
  productWarranty: '25 Years',
  linearPerformanceWarranty: '30 Years',
  electricalSpecs: [
    { label: 'Rated Maximum Power (Pmax)', value: '480W' },
    { label: 'Power Tolerance', value: '0 ~ +3%' },
    { label: 'Voltage at Pmax (Vmp)', value: '33.28 V' },
    { label: 'Current at Pmax (Imp)', value: '14.43 A' },
    { label: 'Open-Circuit Voltage (Voc)', value: '40.29 V' },
    { label: 'Short-Circuit Current (Isc)', value: '15.13 A' },
    { label: 'Voc & Isc Tolerance', value: '±5%' },
    { label: 'Maximum System Voltage', value: '1500 V' },
    { label: 'Maximum Series Fuse Rating', value: '25 A' },
    { label: 'Operating Temperature', value: '-40°C ~ 85°C' },
    { label: 'Protection Class', value: 'Class II' },
  ] as ModuleSpecRow[],
  complianceSpecs: [
    { label: 'Standard Test Conditions (STC)', value: 'AM1.5, 1000W/m², 25°C' },
    { label: 'IEC Standards', value: 'IEC 61215:2016 / IEC 61730:2016' },
    { label: 'UK / EU marks', value: 'UKCA, CE, TÜV SÜD' },
  ] as ModuleSpecRow[],
} as const;

const flagshipResidentialProduct = {
  slug: 'ecolife-lr7-54hvb-480m',
  name: `LONGi EcoLife ${LONGI_ECOLIFE_MODULE.model}`,
  brand: 'LONGi',
  priceInPence: 0,
  image: '/images/himo.webp',
  type: LONGI_ECOLIFE_MODULE.technology,
  efficiency: LONGI_ECOLIFE_MODULE.efficiency,
  weight: LONGI_ECOLIFE_MODULE.weight,
  dimensions: LONGI_ECOLIFE_MODULE.dimensions,
  description:
    'High-efficiency all-black residential module designed for typical UK rooftop conditions, delivering strong output even under cloudy skies and limited roof space.',
  category: 'Residential / Homeowners',
  power: '480W',
  availability: 'In UK stock',
  leadTime: '2-3 working days',
  productWarranty: LONGI_ECOLIFE_MODULE.productWarranty,
  linearPerformanceWarranty: LONGI_ECOLIFE_MODULE.linearPerformanceWarranty,
  moduleModel: LONGI_ECOLIFE_MODULE.model,
} as Product;

export const products: Product[] = [
  {
    slug: 'cottage-setup-4kw',
    name: 'The Cottage Setup (4.3kW Array)',
    brand: 'LONGi EcoLife',
    priceInPence: 0,
    image: '/images/cottage-setup-package.jpg',
    type: `9 x LONGi ${LONGI_ECOLIFE_MODULE.model} N-Type Panels`,
    efficiency: '23.5% Module Efficiency',
    weight: '194 kg Total Array Weight',
    dimensions: 'Requires approx. 19m² roof area',
    description:
      'Perfect for smaller homes or properties with limited roof layouts. Features a complete turnkey setup including 9 x premium LONGi EcoLife panels, a compact 5kWh hybrid battery system, safety scaffolding, and full DNO grid notifications. Complete Package Guide Price: From £5,500 (0% VAT).',
    category: 'Ideal for 1-2 Bedroom Homes',
    power: '4.32 kW Peak Output',
    availability: 'All-Inclusive Installation',
    leadTime: 'Install in 7-14 Days',
    productWarranty: '25 Years',
    linearPerformanceWarranty: '30 Years',
    moduleModel: LONGI_ECOLIFE_MODULE.model,
  },
  {
    slug: 'family-homestead-8kw',
    name: 'The Family Homestead (8.6kW Array)',
    brand: 'LONGi EcoLife',
    priceInPence: 0,
    image: '/images/family-homestead-package.jpg',
    type: `18 x LONGi ${LONGI_ECOLIFE_MODULE.model} N-Type Panels`,
    efficiency: '23.5% Module Efficiency',
    weight: '388 kg Total Array Weight',
    dimensions: 'Requires approx. 37m² roof area',
    description:
      'Our flagship and most popular setup designed to wipe out daytime electricity bills for standard 3-4 bedroom detached and semi properties. Features a standard premium installation layout including 18 x premium LONGi EcoLife panels, a high-capacity 10kWh hybrid battery storage bank, a smart tracking inverter, full safety scaffolding, and automated DNO grid approvals. Complete Package Guide Price: From £9,750 (0% VAT).',
    category: 'Ideal for 3-4 Bedroom Homes',
    power: '8.64 kW Peak Output',
    availability: 'Most Popular Choice',
    leadTime: 'Install in 7-14 Days',
    productWarranty: '25 Years',
    linearPerformanceWarranty: '30 Years',
    moduleModel: LONGI_ECOLIFE_MODULE.model,
  },
  {
    slug: 'estate-powerhouse-12kw',
    name: 'The Estate Powerhouse (12.4kW Array)',
    brand: 'LONGi EcoLife',
    priceInPence: 0,
    image: '/images/estate-powerhouse-package.jpg',
    type: `26 x LONGi ${LONGI_ECOLIFE_MODULE.model} N-Type Panels`,
    efficiency: '23.5% Module Efficiency',
    weight: '561 kg Total Array Weight',
    dimensions: 'Requires approx. 53m² roof area',
    description:
      'Engineered for high-consumption properties, home businesses, and electric vehicle (EV) fast-charging integration. Features a massive array of 26 x premium LONGi EcoLife panels paired with a 15kWh multi-stack battery bank and optimized dual-inverter tracking. Complete Package Guide Price: Custom Quote Required (0% VAT).',
    category: 'Ideal for Large Estates & EVs',
    power: '12.48 kW Peak Output',
    availability: 'Maximum Energy Independence',
    leadTime: 'Install in 14-21 Days',
    productWarranty: '25 Years',
    linearPerformanceWarranty: '30 Years',
    moduleModel: LONGI_ECOLIFE_MODULE.model,
  },
];

export const productBySlug = Object.fromEntries(
  products.map((product) => [product.slug, product])
) as Record<string, Product>;

// Keep the flagship module addressable for datasheet/tech pages.
productBySlug[flagshipResidentialProduct.slug] = flagshipResidentialProduct;

export function formatPrice(pence: number): string {
  return `£${(pence / 100).toFixed(2)}`;
}

export function calcVat(subtotalPence: number): number {
  return Math.round(subtotalPence * VAT_RATE);
}

export function calcTotalIncVat(subtotalPence: number): number {
  return subtotalPence + calcVat(subtotalPence);
}
