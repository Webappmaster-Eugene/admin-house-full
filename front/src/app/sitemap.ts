import type { MetadataRoute } from 'next';

import { SITE_URL } from 'src/utils/const/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      // Дата последнего содержательного изменения лендинга. new Date() менял бы её на каждый запрос,
      // и поисковики перестают доверять lastmod.
      lastModified: new Date('2026-09-26'),
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
