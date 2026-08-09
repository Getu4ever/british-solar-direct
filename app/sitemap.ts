import type { MetadataRoute } from 'next';
import { COMPANY } from './lib/company';
import { products } from './lib/products';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || COMPANY.website;

const staticRoutes: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
}> = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/notts-local', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/products', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/project-quote', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/installation', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/brands', changeFrequency: 'monthly', priority: 0.75 },
  { path: '/delivery-logistics', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/certifications-datasheets', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages = staticRoutes.map((route) => ({
    url: `${siteUrl}${route.path === '/' ? '' : route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const productPages = products.map((product) => ({
    url: `${siteUrl}/products/${product.slug}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  return [...pages, ...productPages];
}
