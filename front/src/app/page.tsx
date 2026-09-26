import type { Metadata } from 'next';

import {
  AUTHOR,
  LOGO_URL,
  SITE_URL,
  SITE_NAME,
  SITE_NAME_RU,
  buildPageSeo,
  SITE_KEYWORDS,
  SITE_DESCRIPTION,
  SITE_TITLE_DEFAULT,
} from 'src/utils/const/seo';

import LandingView from 'src/widgets/landing/landing-view';
import { landingFaq, landingSteps, SUPPORT_EMAIL } from 'src/widgets/landing/landing-content';

export const metadata: Metadata = {
  ...buildPageSeo({ path: '/', title: SITE_TITLE_DEFAULT, description: SITE_DESCRIPTION }),
  // absolute: заголовок главной уже содержит бренд, суффикс шаблона « · SMETAS» не нужен.
  title: { absolute: SITE_TITLE_DEFAULT },
  keywords: SITE_KEYWORDS,
};

const PERSON_ID = `${SITE_URL}/#founder`;
const ORGANIZATION_ID = `${SITE_URL}/#organization`;

// Один @graph со ссылками по @id: поисковики связывают сайт, приложение, организацию и автора.
// FAQPage строится из тех же вопросов, что показаны на странице (landingFaq), — разметка обязана
// совпадать с видимым текстом.
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: SITE_NAME,
      alternateName: SITE_NAME_RU,
      url: `${SITE_URL}/`,
      inLanguage: 'ru-RU',
      description: SITE_DESCRIPTION,
      publisher: { '@id': ORGANIZATION_ID },
    },
    {
      '@type': 'SoftwareApplication',
      name: SITE_NAME,
      alternateName: SITE_NAME_RU,
      description: SITE_DESCRIPTION,
      url: `${SITE_URL}/`,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      inLanguage: 'ru-RU',
      featureList: landingSteps.map((step) => step.title),
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'RUB',
        availability: 'https://schema.org/InStock',
      },
      author: { '@id': PERSON_ID },
      publisher: { '@id': ORGANIZATION_ID },
    },
    {
      '@type': 'Organization',
      '@id': ORGANIZATION_ID,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      logo: LOGO_URL,
      founder: { '@id': PERSON_ID },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: SUPPORT_EMAIL,
        availableLanguage: ['Russian'],
      },
    },
    {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: AUTHOR.name,
      jobTitle: AUTHOR.role,
      url: AUTHOR.url,
      sameAs: [AUTHOR.url, AUTHOR.telegram],
    },
    {
      '@type': 'FAQPage',
      mainEntity: landingFaq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
  ],
};

export default function LandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <LandingView />
    </>
  );
}
