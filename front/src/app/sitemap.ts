import type { MetadataRoute } from 'next';

import { SITE_URL } from 'src/utils/const/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/terms/`,
      lastModified: new Date('2026-04-16'),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/privacy/`,
      lastModified: new Date('2026-04-16'),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/offer/`,
      lastModified: new Date('2026-04-16'),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/cookies/`,
      lastModified: new Date('2026-04-16'),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];
}
