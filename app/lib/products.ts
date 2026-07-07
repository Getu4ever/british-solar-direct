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
  palletQty: string;
  containerQty: string;
  moq: string;
  description: string;
  category?: string;
  power?: string;
  availability?: string;
  leadTime?: string;
};

export const VAT_RATE = 0.2;

export const products: Product[] = [
  {
    slug: 'vertex-s-450w',
    name: 'Vertex S+ 450W',
    brand: 'Trina Solar',
    priceInPence: 4200,
    image: '/images/vertex.webp',
    type: 'N-type Monocrystalline Dual-Glass',
    efficiency: '22.5%',
    weight: '21.0 kg',
    dimensions: '1762 × 1134 × 30 mm',
    palletQty: '36 Panels',
    containerQty: '936 Panels (26 Pallets)',
    moq: '1 Pallet (36 units)',
    description:
      'The standard choice for premium UK installations. Features ultra-reliable dual-glass protection and excellent low-light performance.',
    category: 'Residential / Light Commercial',
    power: '450W',
    availability: 'In UK stock',
    leadTime: '2-3 working days',
  },
  {
    slug: 'himo-6-580w',
    name: 'Hi-MO 6 Commercial 580W',
    brand: 'LONGi',
    priceInPence: 5650,
    image: '/images/himo.webp',
    type: 'HPBC Monocrystalline Single-Glass',
    efficiency: '22.8%',
    weight: '27.5 kg',
    dimensions: '2278 × 1134 × 35 mm',
    palletQty: '31 Panels',
    containerQty: '620 Panels (20 Pallets)',
    moq: '5 Pallets (155 units)',
    description:
      'Heavy-duty industrial module engineered specifically for high-capacity warehouse roofs and utility scale commercial projects.',
    category: 'Commercial / Industrial',
    power: '580W',
    availability: 'Forward order',
    leadTime: 'Project and container supply',
  },
  {
    slug: 'ultra-black-430w',
    name: 'Ultra Black 430W',
    brand: 'JA Solar',
    priceInPence: 4800,
    image: '/images/ultrablack.webp',
    type: 'All-Black N-type Monocrystalline',
    efficiency: '22.0%',
    weight: '20.8 kg',
    dimensions: '1722 × 1134 × 30 mm',
    palletQty: '36 Panels',
    containerQty: '936 Panels (26 Pallets)',
    moq: '1 Pallet (36 units)',
    description:
      'Sleek matte-black architectural appearance. Completely invisible busbars designed for high-end residential aesthetics.',
    category: 'Premium Residential',
    power: '430W',
    availability: 'In UK stock',
    leadTime: '2-3 working days',
  },
  {
    slug: 'tiger-neo-475w',
    name: 'Tiger Neo 475W',
    brand: 'Jinko Solar',
    priceInPence: 4450,
    image: '/images/tiger-neo.webp',
    type: 'N-type TOPCon Monocrystalline',
    efficiency: '22.6%',
    weight: '22.5 kg',
    dimensions: '1762 × 1134 × 30 mm',
    palletQty: '36 Panels',
    containerQty: '936 Panels (26 Pallets)',
    moq: '1 Pallet (36 units)',
    description:
      'Advanced TOPCon technology offering excellent temperature coefficient and high energy yield across various conditions.',
    category: 'Residential / Commercial',
    power: '475W',
    availability: 'In UK stock',
    leadTime: 'Immediate dispatch',
  },
  {
    slug: 'deepblue-650w',
    name: 'DeepBlue 4.0 650W',
    brand: 'JA Solar',
    priceInPence: 6800,
    image: '/images/deepblue.webp',
    type: 'N-type TOPCon Bifacial',
    efficiency: '23.5%',
    weight: '34.5 kg',
    dimensions: '2384 × 1303 × 33 mm',
    palletQty: '31 Panels',
    containerQty: '620 Panels (20 Pallets)',
    moq: '5 Pallets (155 units)',
    description:
      'High-power commercial module with outstanding efficiency for large-scale commercial and ground-mount projects.',
    category: 'Commercial / Utility',
    power: '650W',
    availability: 'Forward order',
    leadTime: 'Container & project supply',
  },
  {
    slug: 'q-tron-440w',
    name: 'Q.TRON BLK 440W',
    brand: 'Qcells',
    priceInPence: 4950,
    image: '/images/qtron.webp',
    type: 'N-type All-Black Monocrystalline',
    efficiency: '22.3%',
    weight: '21.5 kg',
    dimensions: '1722 × 1134 × 30 mm',
    palletQty: '36 Panels',
    containerQty: '936 Panels (26 Pallets)',
    moq: '1 Pallet (36 units)',
    description:
      'Premium all-black design with excellent performance and aesthetics for high-end residential rooftops.',
    category: 'Premium Residential',
    power: '440W',
    availability: 'In UK stock',
    leadTime: '2-4 working days',
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
