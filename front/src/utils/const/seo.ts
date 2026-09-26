import type { Metadata } from 'next';

const rawSiteUrl =
  process.env.NEXT_PUBLIC_FRONT_ADDRESS || 'https://alibaba.hhos.ru/';

export const SITE_URL = rawSiteUrl.replace(/\/$/, '');

export const SITE_BRAND = 'SMETAS';

// Единое имя сайта для title, og:site_name и JSON-LD — совпадает с брендом в интерфейсе.
export const SITE_NAME = SITE_BRAND;

// Русское название — alternateName в JSON-LD для поиска по слову «сметы».
export const SITE_NAME_RU = 'Сметы';

export const SITE_TITLE_DEFAULT =
  'SMETAS — SaaS-платформа для строительных смет и управления материалами';

export const SITE_DESCRIPTION =
  'Современная SaaS-платформа для составления строительных смет: единая база материалов, гибкие справочники, командная работа, безопасное хранение данных.';

export const SITE_KEYWORDS = [
  'smetas',
  'SMETAS',
  'сметы',
  'строительные сметы',
  'составление смет',
  'расчёт стоимости',
  'материалы',
  'справочник материалов',
  'сметная программа',
  'сметы онлайн',
  'SaaS для строителей',
  'управление строительными проектами',
];

export const AUTHOR = {
  name: 'Евгений Надточеев',
  role: 'Основатель SMETAS',
  email: 'johnn.hotmail@mail.ru',
  url: 'https://nadtocheev.ru',
  telegram: 'https://t.me/eugene_nadtocheev',
};

export const LOGO_URL = `${SITE_URL}/favicon/android-chrome-512x512.png`;

interface PageSeoParams {
  /** Путь страницы с завершающим слешем (next.config: trailingSlash) — например, '/terms/'. */
  path: `/${string}`;
  title: string;
  description: string;
}

/**
 * canonical + openGraph для публичной страницы.
 * Next.js не сливает openGraph страницы с корневым, а заменяет целиком,
 * поэтому общие поля (type, locale, siteName) повторяются здесь.
 */
export function buildPageSeo({ path, title, description }: PageSeoParams): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'ru_RU',
      siteName: SITE_NAME,
      url: path,
      title,
      description,
    },
  };
}

/** Служебные страницы (вход, регистрация, 404): не индексируются, но ссылки с них учитываются. */
export const NO_INDEX_ROBOTS: Metadata['robots'] = { index: false, follow: true };
