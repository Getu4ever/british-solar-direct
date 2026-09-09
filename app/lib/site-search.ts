import { products } from './products';

export type SearchResult = {
  title: string;
  href: string;
  description: string;
};

const staticPages: SearchResult[] = [
  {
    title: 'Home',
    href: '/',
    description: 'Turnkey LONGi EcoLife solar packages for Nottingham homes.',
  },
  {
    title: 'Our Packages',
    href: '/products',
    description: 'Cottage Setup, Family Homestead, and Estate Powerhouse packages.',
  },
  {
    title: 'Installation',
    href: '/installation',
    description: 'Local survey, scaffolding, roof mounting, and MCS handover.',
  },
  {
    title: 'LONGi Tech',
    href: '/brands',
    description: 'LONGi EcoLife all-black residential module technology.',
  },
  {
    title: 'Delivery & Logistics',
    href: '/delivery-logistics',
    description: 'East Midlands delivery areas, exclusions, and delivery FAQ.',
  },
  {
    title: 'Project Quote',
    href: '/project-quote',
    description: 'Request a fixed quote with postcode and package details.',
  },
  {
    title: 'About',
    href: '/about',
    description: 'British Solar Direct team, director, and local installer story.',
  },
  {
    title: 'Contact',
    href: '/contact',
    description: 'Call 0115 990 4024 or email info@britishsolardirect.co.uk.',
  },
  {
    title: 'Certifications & Datasheets',
    href: '/certifications-datasheets',
    description: 'MCS, NICEIC, RECC, and LONGi EcoLife datasheets.',
  },
  {
    title: 'Nottingham Local',
    href: '/notts-local',
    description: 'Solar installation for Nottingham and Nottinghamshire homeowners.',
  },
];

function matches(haystack: string, query: string) {
  return haystack.toLowerCase().includes(query);
}

export function searchSite(rawQuery: string): SearchResult[] {
  const query = rawQuery.trim().toLowerCase();
  if (!query) return [];

  const pageHits = staticPages.filter(
    (page) => matches(page.title, query) || matches(page.description, query),
  );

  const productHits: SearchResult[] = products
    .filter(
      (product) =>
        matches(product.name, query) ||
        matches(product.description, query) ||
        matches(product.brand, query) ||
        matches(product.slug, query) ||
        (product.power ? matches(product.power, query) : false),
    )
    .map((product) => ({
      title: product.name,
      href: `/products/${product.slug}`,
      description: product.description,
    }));

  const seen = new Set<string>();
  const results: SearchResult[] = [];

  for (const item of [...pageHits, ...productHits]) {
    if (seen.has(item.href)) continue;
    seen.add(item.href);
    results.push(item);
  }

  return results;
}
