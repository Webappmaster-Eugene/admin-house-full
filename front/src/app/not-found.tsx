import type { Metadata } from 'next';
import { NotFoundView } from '@/widgets/error';

import { NO_INDEX_ROBOTS } from 'src/utils/const/seo';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Страница не найдена',
  robots: NO_INDEX_ROBOTS,
};

export default function NotFoundPage() {
  return <NotFoundView />;
}
