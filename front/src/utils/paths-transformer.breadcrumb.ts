import { paths } from 'src/utils/routes/paths';

type BreadcrumbItem = {
  name: string;
  link: string;
};

type BreadcrumbsMapType = Record<string, BreadcrumbItem>;

// Относительные пути из paths: раньше ссылки строились от NEXT_PUBLIC_FRONT_ADDRESS, а в прод-сборке
// переменной нет — крошки вели на «undefinedprofile» и отдавали 404.
export const PathsTransformerBreadcrumbMap: BreadcrumbsMapType = {
  dashboard: {
    name: 'Дашборд',
    link: paths.dashboard.root,
  },
  materials: {
    name: 'Материалы',
    link: paths.dashboard.materials,
  },
  'category-materials': {
    name: 'Категории',
    link: paths.dashboard.categoryMaterials,
  },
  fields: {
    name: 'Поля категорий',
    link: paths.dashboard.fields,
  },
  characteristics: {
    name: 'Характеристики',
    link: paths.dashboard.characteristics,
  },
  profile: {
    name: 'Профиль',
    link: paths.profile.profile,
  },
  settings: {
    name: 'Настройки',
    link: paths.profile.settings,
  },
};
