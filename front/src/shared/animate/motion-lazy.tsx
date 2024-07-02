'use client';

import { m, domMax, LazyMotion } from 'framer-motion';

import { PropsReactNode } from 'src/utils/types';

// ----------------------------------------------------------------------

export function MotionLazy({ children }: PropsReactNode) {
  return (
    <LazyMotion strict features={domMax}>
      <m.div style={{ height: '100%' }}> {children} </m.div>
    </LazyMotion>
  );
}
