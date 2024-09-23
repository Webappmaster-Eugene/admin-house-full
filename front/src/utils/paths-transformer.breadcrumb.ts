type BreadcrumbItem = {
  name: string;
  link: string;
};

type BreadcrumbsMapType = Record<string, BreadcrumbItem>;

const startLink = process.env.NEXT_PUBLIC_FRONT_ADDRESS;

export const PathsTransformerBreadcrumbMap: BreadcrumbsMapType = {
  dashboard: {
    name: 'Дашборд',
    link: `${startLink}dashboard`,
  },
  materials: {
    name: 'Материалы',
    link: `${startLink}dashboard/materials`,
  },
  'category-materials': {
    name: 'Категории',
    link: `${startLink}dashboard/category-materials`,
  },
  fields: {
    name: 'Поля категорий',
    link: `${startLink}dashboard/fields`,
  },
  characteristics: {
    name: 'Характеристики',
    link: `${startLink}dashboard/characteristics`,
  },
  profile: {
    name: 'Профиль',
    link: `${startLink}profile`,
  },
  settings: {
    name: 'Настройки',
    link: `${startLink}profile/settings`,
  },
};
