'use client';

import isEqual from 'lodash/isEqual';
import { useMemo, useState, useEffect, useCallback } from 'react';

import { useResponsive } from 'src/utils/hooks/use-responsive';
import { useLocalStorage } from 'src/utils/hooks/use-local-storage';
import { localStorageGetItem } from 'src/utils/helpers/storage-available';

import { SettingsValueProps } from '../types';
import { SettingsContext } from './settings-context';

// ----------------------------------------------------------------------

type SettingsProviderProps = {
  children: React.ReactNode;
  defaultSettings: SettingsValueProps;
};

export function SettingsProvider({ children, defaultSettings }: SettingsProviderProps) {
  const { state, update, reset } = useLocalStorage('settings', defaultSettings);

  const [openDrawer, setOpenDrawer] = useState(false);

  const isArabic = localStorageGetItem('i18nextLng') === 'ar';
  const isMediaMoreThanLg = useResponsive('up', 'lg');

  // Direction by lang
  const onChangeDirectionByLang = useCallback(
    (lang: string) => {
      update('themeDirection', lang === 'ar' ? 'rtl' : 'ltr');
    },
    [update]
  );

  useEffect(() => {
    if (!isMediaMoreThanLg) {
      update('themeLayout', 'mini');
    } else {
      update('themeLayout', 'vertical');
    }
  }, [isMediaMoreThanLg, update]);

  useEffect(() => {
    if (isArabic) {
      onChangeDirectionByLang('ar');
    }
  }, [isArabic, onChangeDirectionByLang]);

  // Drawer
  const onToggleDrawer = useCallback(() => {
    setOpenDrawer((prev) => !prev);
  }, []);

  const onCloseDrawer = useCallback(() => {
    setOpenDrawer(false);
  }, []);

  const canReset = !isEqual(state, defaultSettings);

  const memoizedValue = useMemo(
    () => ({
      ...state,
      onUpdate: update,
      // Direction
      onChangeDirectionByLang,
      // Reset
      canReset,
      onReset: reset,
      // Drawer
      open: openDrawer,
      onToggle: onToggleDrawer,
      onClose: onCloseDrawer,
    }),
    [
      reset,
      update,
      state,
      canReset,
      openDrawer,
      onCloseDrawer,
      onToggleDrawer,
      onChangeDirectionByLang,
    ]
  );

  return <SettingsContext.Provider value={memoizedValue}>{children}</SettingsContext.Provider>;
}
