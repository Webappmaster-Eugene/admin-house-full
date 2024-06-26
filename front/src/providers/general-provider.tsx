import React from 'react';
import { SettingsProvider } from '@/shared/settings';

import ThemeProvider from 'src/utils/theme';
import { PropsReactNode } from 'src/utils/types';

export default function GeneralProvider({ children }: PropsReactNode) {
  return (
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
      <ThemeProvider>{children}</ThemeProvider>
    </SettingsProvider>
  );
}
