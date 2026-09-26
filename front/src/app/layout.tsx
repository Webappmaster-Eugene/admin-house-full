import 'src/global.css';

// ----------------------------------------------------------------------

import type { Metadata, Viewport } from 'next';

import { PropsReactNode } from 'src/utils/types';
import { primaryFont } from 'src/utils/theme/typography';
import {
  AUTHOR,
  SITE_URL,
  SITE_NAME,
  SITE_KEYWORDS,
  SITE_DESCRIPTION,
  SITE_TITLE_DEFAULT,
} from 'src/utils/const/seo';

import GeneralProvider from 'src/providers/general-provider';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE_DEFAULT,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: AUTHOR.name, url: AUTHOR.url }],
  creator: AUTHOR.name,
  publisher: AUTHOR.name,
  manifest: '/manifest.json',
  formatDetection: {
    email: false,
    address: false,
  },
  icons: {
    icon: [
      { url: '/favicon/favicon.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo/logo_single.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/favicon/apple-touch-icon.png', sizes: '180x180' }],
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: SITE_NAME,
    title: SITE_TITLE_DEFAULT,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE_DEFAULT,
    description: SITE_DESCRIPTION,
  },
  // Раскомментировать после регистрации в Яндекс.Вебмастере / Google Search Console:
  // verification: {
  //   yandex: 'ВСТАВЬТЕ_КОД_ЯНДЕКС_ВЕБМАСТЕРА',
  //   google: 'ВСТАВЬТЕ_КОД_GOOGLE_SEARCH_CONSOLE',
  // },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'business',
};

export const viewport: Viewport = {
  themeColor: '#00A76F',
  width: 'device-width',
  initialScale: 1,
};

// Корневой layout не читает cookies и не ходит в API — иначе все страницы, включая лендинг,
// становятся динамическими (Cache-Control: no-store). Пользователь и workspace загружаются
// в app/(app)/layout.tsx только для входа, dashboard и профиля.
export default function RootLayout({ children }: PropsReactNode) {
  return (
    <html lang="ru" className={primaryFont.className}>
      <body>
        <GeneralProvider>{children}</GeneralProvider>
      </body>
    </html>
  );
}
