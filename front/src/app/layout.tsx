import 'src/global.css';

// ----------------------------------------------------------------------

import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { SettingsDrawer } from '@/shared/settings';

import { cookieKeys } from 'src/utils/const';
import { PropsReactNode } from 'src/utils/types';
import { primaryFont } from 'src/utils/theme/typography';
import { isCurrentUserTypeGuard } from 'src/utils/type-guards/is-current-user.type-guard';
import { isUserWithRelatedWorkspaceTG } from 'src/utils/type-guards/is-user-with-related-workspace.type-guard';

import AppProvider from 'src/providers/app-provider';
import { SnackbarProvider } from 'src/shared/snackbar';
import { StyledProgressBar } from 'src/shared/progress-bar';
import GeneralProvider from 'src/providers/general-provider';
import CurrentUserProvider from 'src/providers/current-user-provider';
import { AppState } from 'src/api/realisation-requests/app-state.type';
import WorkspaceInfoProvider from 'src/providers/workspace-info-provider';
import { getAppInfo } from 'src/api/actions/app-info/get-app-info.action';
import { getCurrentUser } from 'src/api/actions/auth/get-current-user.action';
import { getFullWorkspaceInfo } from 'src/api/realisation-requests/workspace.global-getter.realisation';

// export const viewport = {
//   themeColor: '#000000',
//   width: 'device-width',
//   initialScale: 1,
//   maximumScale: 1,
// };

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
  let currentUserInfo = null;
  let workspaceInfo: AppState | null = null;
  let appInfo = null;

  appInfo = await getAppInfo();

  const refreshToken = cookies().get(cookieKeys.REFRESH_KEY)?.value;
  if (refreshToken) {
    currentUserInfo = await getCurrentUser();
    if (isCurrentUserTypeGuard(currentUserInfo) && isUserWithRelatedWorkspaceTG(currentUserInfo)) {
      workspaceInfo = await getFullWorkspaceInfo(currentUserInfo);
    }
  }

  return (
    <html lang="ru" className={primaryFont.className}>
      <body>
        <AppProvider appInfo={appInfo}>
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
        </AppProvider>
      </body>
    </html>
  );
}
