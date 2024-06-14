import 'src/global.css';

// ----------------------------------------------------------------------

import { PropsReactNode } from 'src/utils/types';
import AppProvider from 'src/utils/providers/app-provider';
import CurrentUserProvider from 'src/utils/providers/current-user-provider';

import ThemeProvider from 'src/theme';
import { primaryFont } from 'src/theme/typography';
import { AuthProvider } from 'src/auth/context/jwt';
import { getAppInfo } from 'src/api/actions/app-actions/get-app-info.action';

import ProgressBar from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { SettingsDrawer, SettingsProvider } from 'src/components/settings';

// ----------------------------------------------------------------------

export const viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata = {
  title: 'Minimal UI Kit',
  description:
    'The starting point for your next project with Minimal UI Kit, built on the newest version of Material-UI ©, ready to be customized to your style',
  keywords: 'react,material,kit,application,dashboard,admin,template',
  manifest: '/manifest.json',
  icons: [
    { rel: 'icon', url: '/favicon/favicon.ico' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/favicon/favicon-16x16.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/favicon/favicon-32x32.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', url: '/favicon/apple-touch-icon.png' },
  ],
};

export default async function RootLayout({ children }: PropsReactNode) {
  const appInfo = await getAppInfo();

  return (
    <html lang="ru" className={primaryFont.className}>
      <body>
        <AppProvider appInfo={appInfo}>
          <CurrentUserProvider>
            <AuthProvider>
              <SettingsProvider
                defaultSettings={{
                  themeMode: 'light', // 'light' | 'dark'
                  themeDirection: 'ltr', //  'rtl' | 'ltr'
                  themeContrast: 'default', // 'default' | 'bold'
                  themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
                  themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
                  themeStretch: false,
                }}
              >
                <ThemeProvider>
                  <MotionLazy>
                    <SettingsDrawer />
                    <ProgressBar />
                    {children}
                  </MotionLazy>
                </ThemeProvider>
              </SettingsProvider>
            </AuthProvider>
          </CurrentUserProvider>
        </AppProvider>
      </body>
    </html>
  );
}
