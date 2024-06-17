import 'src/global.css';

// ----------------------------------------------------------------------

import { cookies } from 'next/headers';

import { cookieKeys } from 'src/utils/const';
import { PropsReactNode } from 'src/utils/types';
import GeneralProvider from 'src/utils/providers/general-provider';
import CurrentUserProvider from 'src/utils/providers/current-user-provider';
import { isCurrentUserTypeGuard } from 'src/utils/type-guards/current-user.type-guard';

import { primaryFont } from 'src/theme/typography';
import { getCurrentUser } from 'src/api/actions/auth-actions/get-current-user.action';

import ProgressBar from 'src/components/progress-bar';
import { SettingsDrawer } from 'src/components/settings';
import { MotionLazy } from 'src/components/animate/motion-lazy';

// ----------------------------------------------------------------------

export const viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata = {
  title: 'Лучи',
  description: 'The starting point for project',
  keywords: 'application,dashboard,admin',
  manifest: '/manifest.json',
  icons: [
    { rel: 'icon', url: '/favicon/favicon.ico' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicon/favicon-16x16.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon/favicon-32x32.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', url: '/favicon/apple-touch-icon.png' },
  ],
};

export default async function RootLayout({ children }: PropsReactNode) {
  let currentUserInfo;
  // const appInfo = await getAppInfo();
  const refreshToken = cookies().get(cookieKeys.REFRESH_KEY)?.value;
  // FIXME проверить
  if (refreshToken) {
    currentUserInfo = await getCurrentUser();
  }

  return (
    <html lang="ru" className={primaryFont.className}>
      <body>
        {/* <AppProvider appInfo={appInfo}> */}
        <CurrentUserProvider
          currentUserInfo={isCurrentUserTypeGuard(currentUserInfo) ? currentUserInfo : null}
        >
          <GeneralProvider>
            <MotionLazy>
              <SettingsDrawer />
              <ProgressBar />
              {children}
            </MotionLazy>
          </GeneralProvider>
        </CurrentUserProvider>
        {/* </AppProvider> */}
      </body>
    </html>
  );
}
