import React from 'react';

import { PropsReactNode } from 'src/utils/types';

import ThemeProvider from 'src/theme';

import { SettingsProvider } from 'src/components/settings';

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
