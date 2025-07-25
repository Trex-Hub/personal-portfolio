import { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/constant';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Optionally disallow certain paths
        disallow: [
          '/api/', // API routes
          '/_next/', // Next.js internal files
          '*.json', // JSON files
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
