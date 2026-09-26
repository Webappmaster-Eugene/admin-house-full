'use client';

import React from 'react';
// Импорт из context, а не из barrel '@/shared/settings': barrel реэкспортирует SettingsDrawer,
// и панель настроек (simplebar, Drawer, Slider) попадала в бандл каждой страницы.
import { SettingsProvider } from '@/shared/settings/context';

import ThemeProvider from 'src/utils/theme';
import { PropsReactNode } from 'src/utils/types';

import { MotionLazy } from 'src/shared/animate/motion-lazy';

export default function GeneralProvider({ children }: PropsReactNode) {
  return (
    <SettingsProvider
      defaultSettings={{
        themeMode: 'light', // 'light' | 'dark'
        themeDirection: 'ltr', //  'rtl' | 'ltr'
        themeContrast: 'default', // 'default' | 'bold'
        themeLayout: 'mini', // 'vertical' | 'horizontal' | 'mini'
        themeColorPresets: 'default', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
        themeStretch: true,
      }}
    >
      <ThemeProvider>
        <MotionLazy>{children}</MotionLazy>
      </ThemeProvider>
    </SettingsProvider>
  );
}
