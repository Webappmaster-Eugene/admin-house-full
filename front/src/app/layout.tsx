import 'src/global.css';

// ----------------------------------------------------------------------

import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import type { Metadata, Viewport } from 'next';
import { SettingsDrawer } from '@/shared/settings';

import { cookieKeys } from 'src/utils/const';
import { PropsReactNode } from 'src/utils/types';
import { primaryFont } from 'src/utils/theme/typography';
import { isCurrentUserTypeGuard } from 'src/utils/type-guards/is-current-user.type-guard';
import { isUserWithRelatedWorkspaceTG } from 'src/utils/type-guards/is-user-with-related-workspace.type-guard';
import {
  AUTHOR,
  SITE_URL,
  SITE_NAME,
  SITE_KEYWORDS,
  SITE_DESCRIPTION,
  SITE_TITLE_DEFAULT,
} from 'src/utils/const/seo';

import { SnackbarProvider } from 'src/shared/snackbar';
import { StyledProgressBar } from 'src/shared/progress-bar';
import GeneralProvider from 'src/providers/general-provider';
import CurrentUserProvider from 'src/providers/current-user-provider';
import { AppState } from 'src/api/realisation-requests/app-state.type';
import WorkspaceInfoProvider from 'src/providers/workspace-info-provider';
import { getCurrentUser } from 'src/api/actions/auth/get-current-user.action';
import { getFullWorkspaceInfo } from 'src/api/realisation-requests/workspace.global-getter.realisation';

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
    url: SITE_URL,
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
  themeColor: '#1877F2',
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({ children }: PropsReactNode) {
  let currentUserInfo = null;
  let workspaceInfo: AppState | null = null;

  const refreshToken = cookies().get(cookieKeys.REFRESH_KEY)?.value;
  let isRefreshTokenValid = false;
  if (refreshToken) {
    try {
      const { exp } = jwtDecode<{ exp: number }>(refreshToken);
      isRefreshTokenValid = exp * 1000 > Date.now();
    } catch {
      // malformed token — treat as expired
    }
  }
  if (isRefreshTokenValid) {
    currentUserInfo = await getCurrentUser();
    if (isCurrentUserTypeGuard(currentUserInfo) && isUserWithRelatedWorkspaceTG(currentUserInfo)) {
        workspaceInfo = await getFullWorkspaceInfo(currentUserInfo);
    }
  }

  return (
    <html lang="ru" className={primaryFont.className}>
      <body>
        <CurrentUserProvider
          currentUserInfo={isCurrentUserTypeGuard(currentUserInfo) ? currentUserInfo : null}
        >
          <WorkspaceInfoProvider workspaceInfo={workspaceInfo}>
            <GeneralProvider>
              <SettingsDrawer />
              <SnackbarProvider>
                <Suspense fallback={<StyledProgressBar />}>{children}</Suspense>
              </SnackbarProvider>
            </GeneralProvider>
          </WorkspaceInfoProvider>
        </CurrentUserProvider>
      </body>
    </html>
  );
}
