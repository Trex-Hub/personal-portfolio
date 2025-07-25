import { MetadataRoute } from 'next';
import { source } from '@/lib/source';
import { BASE_URL } from '@/lib/constant';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = source.getPages();

  // Static routes that should always be included
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];

  // Dynamic routes from Fumadocs content
  const dynamicRoutes: MetadataRoute.Sitemap = pages.map(page => ({
    url: `${BASE_URL}${page.url}`,
    lastModified: new Date(),
    changeFrequency: getChangeFrequency(page.url),
    priority: getPriority(page.url),
  }));

  return [...staticRoutes, ...dynamicRoutes];
}

/**
 * Determines change frequency based on page type/URL
 */
function getChangeFrequency(
  url: string
): MetadataRoute.Sitemap[0]['changeFrequency'] {
  // Home page and main sections change more frequently
  if (url === '/' || url === '/contact') {
    return 'weekly';
  }

  // Project pages might be updated occasionally
  if (url.startsWith('/projects')) {
    return 'monthly';
  }

  // Experience and tech pages are more static
  if (url.startsWith('/experience') || url === '/tech') {
    return 'yearly';
  }

  // Default for other pages
  return 'monthly';
}

/**
 * Determines priority based on page type/URL
 */
function getPriority(url: string): number {
  // Home page has highest priority
  if (url === '/') {
    return 1.0;
  }

  // Main sections have high priority
  if (url === '/contact' || url === '/tech') {
    return 0.9;
  }

  // Category index pages
  if (url === '/projects' || url === '/experience') {
    return 0.8;
  }

  // Individual project and experience pages
  if (url.startsWith('/projects/') || url.startsWith('/experience/')) {
    return 0.7;
  }

  // Default priority for other pages
  return 0.6;
}
