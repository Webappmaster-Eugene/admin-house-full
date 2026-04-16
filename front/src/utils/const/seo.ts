const rawSiteUrl =
  process.env.NEXT_PUBLIC_FRONT_ADDRESS || 'https://alibaba.hhos.ru/';

export const SITE_URL = rawSiteUrl.replace(/\/$/, '');

export const SITE_BRAND = 'SMETAS';

export const SITE_NAME = 'Сметы';

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
