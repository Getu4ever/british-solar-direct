import { products } from './products';

export type DatasheetEntry = {
  slug: string;
  name: string;
  brand: string;
  power: string;
  documents: {
    label: string;
    description: string;
  }[];
};

export const productDatasheets: DatasheetEntry[] = products.map((product) => ({
  slug: product.slug,
  name: product.name,
  brand: product.brand,
  power: product.power ?? '',
  documents: [
    {
      label: 'Product datasheet',
      description: 'Dimensions, electrical data, efficiency, and module specifications.',
    },
    {
      label: 'Manufacturer warranty summary',
      description: 'Product warranty terms and performance coverage overview.',
    },
    {
      label: 'Compliance pack',
      description: 'IEC certification and UK market compliance documentation.',
    },
  ],
}));

export const complianceNotes = [
  {
    title: 'Tier-1 manufacturer standards',
    body: 'Core catalogue lines are sourced from established global manufacturers with recognised product certification.',
  },
  {
    title: 'Documentation on request',
    body: 'Full PDF packs are issued with your quote for the specific module line and order volume.',
  },
  {
    title: 'Installation support',
    body: 'Juma Mohammedi and the British Solar Direct team can advise on product selection for residential and commercial roofs.',
  },
];
