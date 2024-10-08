'use-client';

import { useState, useEffect } from 'react';

import { SCREEN_SM, SCREEN_MD, SCREEN_LG, SCREEN_XL, SCREEN_XXL, SCREEN_XXXL } from './consts';

export const useResize = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = (event: Event) => {
      const target = event.target as Window;
      setWidth(target.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    width,
    isScreenSm: width >= SCREEN_SM,
    isScreenMd: width >= SCREEN_MD,
    isScreenLg: width >= SCREEN_LG,
    isScreenXl: width >= SCREEN_XL,
    isScreenXxl: width >= SCREEN_XXL,
    isScreenXxxl: width >= SCREEN_XXXL,
  };
};
