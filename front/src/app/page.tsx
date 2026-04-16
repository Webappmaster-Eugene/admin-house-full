import type { Metadata } from 'next';

import {
  AUTHOR,
  LOGO_URL,
  SITE_URL,
  SITE_NAME,
  SITE_KEYWORDS,
  SITE_DESCRIPTION,
  SITE_TITLE_DEFAULT,
} from 'src/utils/const/seo';

import LandingView from 'src/widgets/landing/landing-view';

export const metadata: Metadata = {
  title: SITE_TITLE_DEFAULT,
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  alternates: { canonical: '/' },
};

const softwareApplicationLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: SITE_NAME,
  alternateName: 'SMETAS',
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  inLanguage: 'ru-RU',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'RUB',
    availability: 'https://schema.org/InStock',
  },
  author: {
    '@type': 'Person',
    name: AUTHOR.name,
    email: AUTHOR.email,
    url: AUTHOR.url,
    sameAs: [AUTHOR.url, AUTHOR.telegram],
  },
  publisher: {
    '@type': 'Person',
    name: AUTHOR.name,
    url: AUTHOR.url,
  },
};

const webSiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: 'ru-RU',
  description: SITE_DESCRIPTION,
  publisher: {
    '@type': 'Person',
    name: AUTHOR.name,
    url: AUTHOR.url,
  },
};

const personLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: AUTHOR.name,
  jobTitle: 'Основатель SMETAS',
  email: `mailto:${AUTHOR.email}`,
  url: AUTHOR.url,
  sameAs: [
    AUTHOR.url,
    AUTHOR.telegram,
  ],
};

const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: LOGO_URL,
  founder: {
    '@type': 'Person',
    name: AUTHOR.name,
    url: AUTHOR.url,
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'support@hhos.ru',
      availableLanguage: ['Russian'],
    },
    {
      '@type': 'ContactPoint',
      contactType: 'founder',
      email: AUTHOR.email,
      availableLanguage: ['Russian'],
    },
  ],
};

export default function LandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([webSiteLd, softwareApplicationLd, organizationLd, personLd]),
        }}
      />
      <LandingView />
    </>
  );
}
