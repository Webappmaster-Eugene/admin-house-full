'use client';

import { m, LazyMotion } from 'framer-motion';

import { PropsReactNode } from 'src/utils/types';

// ----------------------------------------------------------------------

// domMax (анимации layout, drag) подгружается после первой отрисовки: m-компоненты до этого
// рендерятся со статическими стилями, а страницы без анимаций (лендинг) не ждут этот код.
const loadMotionFeatures = () => import('./motion-features').then((module) => module.default);

export function MotionLazy({ children }: PropsReactNode) {
  return (
    <LazyMotion strict features={loadMotionFeatures}>
      <m.div style={{ height: '100%' }}> {children} </m.div>
    </LazyMotion>
  );
}
