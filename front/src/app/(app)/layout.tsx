import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';
import { SettingsDrawer } from '@/shared/settings';

import { cookieKeys } from 'src/utils/const';
import { PropsReactNode } from 'src/utils/types';
import { isCurrentUserTypeGuard } from 'src/utils/type-guards/is-current-user.type-guard';
import { isUserWithRelatedWorkspaceTG } from 'src/utils/type-guards/is-user-with-related-workspace.type-guard';

import { SnackbarProvider } from 'src/shared/snackbar';
import { StyledProgressBar } from 'src/shared/progress-bar';
import CurrentUserProvider from 'src/providers/current-user-provider';
import { AppState } from 'src/api/realisation-requests/app-state.type';
import WorkspaceInfoProvider from 'src/providers/workspace-info-provider';
import { getCurrentUser } from 'src/api/actions/auth/get-current-user.action';
import { getFullWorkspaceInfo } from 'src/api/realisation-requests/workspace.global-getter.realisation';

// ----------------------------------------------------------------------

/**
 * Layout приложения: вход/регистрация, dashboard и профиль.
 * Здесь, а не в корневом layout, читаются cookies и загружается текущий пользователь:
 * cookies() делает маршрут динамическим, и в корне это лишало кэширования лендинг
 * и юридические страницы. По той же причине здесь, а не в корне, панель настроек и уведомления —
 * публичным страницам они не нужны и только увеличивали их JS.
 */
export default async function AppLayout({ children }: PropsReactNode) {
  let currentUserInfo = null;
  let workspaceInfo: AppState | null = null;

  const refreshToken = cookies().get(cookieKeys.REFRESH_KEY)?.value;
  let isRefreshTokenValid = false;
  if (refreshToken) {
    try {
      const { exp } = jwtDecode<{ exp: number }>(refreshToken);
      isRefreshTokenValid = exp * 1000 > Date.now();
    } catch {
      // Повреждённый токен считаем просроченным.
    }
  }
  if (isRefreshTokenValid) {
    currentUserInfo = await getCurrentUser();
    if (isCurrentUserTypeGuard(currentUserInfo) && isUserWithRelatedWorkspaceTG(currentUserInfo)) {
      workspaceInfo = await getFullWorkspaceInfo(currentUserInfo);
    }
  }

  return (
    <CurrentUserProvider
      currentUserInfo={isCurrentUserTypeGuard(currentUserInfo) ? currentUserInfo : null}
    >
      <WorkspaceInfoProvider workspaceInfo={workspaceInfo}>
        <SettingsDrawer />
        <SnackbarProvider>
          <Suspense fallback={<StyledProgressBar />}>{children}</Suspense>
        </SnackbarProvider>
      </WorkspaceInfoProvider>
    </CurrentUserProvider>
  );
}
