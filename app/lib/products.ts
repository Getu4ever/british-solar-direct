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
  palletQty?: string;
  containerQty?: string;
  moq?: string;
  description: string;
  category?: string;
  power?: string;
  availability?: string;
  leadTime?: string;
  productWarranty?: string;
  linearPerformanceWarranty?: string;
};

export const VAT_RATE = 0.2;

const flagshipResidentialProduct = {
  slug: 'ecolife-lr7-54hvb-480w',
  name: 'LONGi EcoLife LR7-54HVB-480W',
  brand: 'LONGi',
  priceInPence: 0,
  image: '/images/himo.webp',
  type: 'N-Type HPBC 2.0 (All-Black)',
  efficiency: '23.5%',
  weight: '21.5 kg',
  dimensions: '1762 × 1134 × 30 mm',
  description:
    'High-efficiency all-black residential module designed for typical UK rooftop conditions, delivering strong output even under cloudy skies and limited roof space.',
  category: 'Residential / Homeowners',
  power: '480W',
  availability: 'In UK stock',
  leadTime: '2-3 working days',
  productWarranty: '25 Years',
  linearPerformanceWarranty: '30 Years',
} as Product;

export const products: Product[] = [
  {
    slug: 'cottage-setup-4kw',
    name: 'The Cottage Setup (4.3kW Array)',
    brand: 'LONGi EcoLife',
    priceInPence: 0,
    image: '/images/himo.webp',
    type: '9 x LONGi 480W N-Type Panels',
    efficiency: '23.5% Module Efficiency',
    weight: '194 kg Total Array Weight',
    dimensions: 'Requires approx. 19m² roof area',
    description:
      'Perfect for smaller homes, bungalows, or properties with limited roof space. Bundled with a 5kWh hybrid battery system, full scaffolding, and DNO grid notification.',
    category: 'Ideal for 1-2 Bedroom Homes',
    power: '4.32 kW Peak Output',
    availability: 'All-Inclusive Installation',
    leadTime: 'Install in 7-14 Days',
    productWarranty: '25 Years',
    linearPerformanceWarranty: '30 Years',
  },
  {
    slug: 'family-homestead-8kw',
    name: 'The Family Homestead (8.6kW Array)',
    brand: 'LONGi EcoLife',
    priceInPence: 0,
    image: '/images/himo.webp',
    type: '18 x LONGi 480W N-Type Panels',
    efficiency: '23.5% Module Efficiency',
    weight: '388 kg Total Array Weight',
    dimensions: 'Requires approx. 37m² roof area',
    description:
      'Our flagship and most popular package for standard family homes. Designed to wipe out daytime electricity bills. Bundled with a premium 10kWh battery backup system, scaffolding, and full MCS certification.',
    category: 'Ideal for 3-4 Bedroom Homes',
    power: '8.64 kW Peak Output',
    availability: 'Most Popular Choice',
    leadTime: 'Install in 7-14 Days',
    productWarranty: '25 Years',
    linearPerformanceWarranty: '30 Years',
  },
  {
    slug: 'estate-powerhouse-12kw',
    name: 'The Estate Powerhouse (12.4kW Array)',
    brand: 'LONGi EcoLife',
    priceInPence: 0,
    image: '/images/himo.webp',
    type: '26 x LONGi 480W N-Type Panels',
    efficiency: '23.5% Module Efficiency',
    weight: '561 kg Total Array Weight',
    dimensions: 'Requires approx. 53m² roof area',
    description:
      'Engineered for high-consumption properties, electric vehicle fast-charging, or large detached estates. Features a massive 15kWh multi-stack battery array and optimized dual-inverter tracking system.',
    category: 'Ideal for Large Estates & EVs',
    power: '12.48 kW Peak Output',
    availability: 'Maximum Energy Independence',
    leadTime: 'Install in 14-21 Days',
    productWarranty: '25 Years',
    linearPerformanceWarranty: '30 Years',
  },
];

export const productBySlug = Object.fromEntries(
  products.map((product) => [product.slug, product])
) as Record<string, Product>;

export function formatPrice(pence: number): string {
  return `£${(pence / 100).toFixed(2)}`;
}

export function calcVat(subtotalPence: number): number {
  return Math.round(subtotalPence * VAT_RATE);
}

export function calcTotalIncVat(subtotalPence: number): number {
  return subtotalPence + calcVat(subtotalPence);
}
