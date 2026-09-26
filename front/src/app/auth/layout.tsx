import type { Metadata } from 'next';

import { PropsReactNode } from 'src/utils/types';
import { NO_INDEX_ROBOTS } from 'src/utils/const/seo';

// ----------------------------------------------------------------------

// Страницы входа и регистрации закрыты в robots.txt — мета-тег дублирует запрет для поисковиков,
// которые попадут на страницу по внешней ссылке.
export const metadata: Metadata = {
  robots: NO_INDEX_ROBOTS,
};

export default function AuthLayout({ children }: PropsReactNode) {
  return <>{children}</>;
}
