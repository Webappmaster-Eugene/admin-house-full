export interface LandingAdvantage {
  icon: string;
  title: string;
  description: string;
}

export interface LandingFeature {
  icon: string;
  title: string;
  description: string;
}

export const landingHero = {
  title: 'Сметы для строительных проектов — быстро, точно, в одном месте',
  subtitle:
    'SaaS-платформа, которая превращает составление смет из рутины в управляемый процесс. Единая база материалов, гибкие справочники, командная работа.',
  ctaLabel: 'Войти в систему',
};

export const landingAdvantages: LandingAdvantage[] = [
  {
    icon: 'solar:database-bold-duotone',
    title: 'Единая база материалов',
    description:
      'Справочники категорий, материалов и характеристик с иерархией — всё необходимое для любого строительного проекта в одном месте.',
  },
  {
    icon: 'solar:settings-bold-duotone',
    title: 'Гибкая структура',
    description:
      'Настраиваемые поля и характеристики для каждой категории. Адаптируйте систему под собственные процессы без программистов.',
  },
  {
    icon: 'solar:users-group-rounded-bold-duotone',
    title: 'Командная работа',
    description:
      'Изолированные рабочие пространства, разграничение ролей и общий доступ к проектам — продуктивная работа всей команды.',
  },
  {
    icon: 'solar:rocket-bold-duotone',
    title: 'Скорость составления смет',
    description:
      'От поиска материала до готовой сметы — за минуты, а не за часы. Удобный поиск, фильтры и быстрое добавление позиций.',
  },
  {
    icon: 'solar:clock-circle-bold-duotone',
    title: 'Актуальность данных',
    description:
      'Централизованное хранение данных, история изменений и безопасное обновление справочников. Никаких устаревших Excel-файлов.',
  },
  {
    icon: 'solar:shield-keyhole-bold-duotone',
    title: 'Безопасность',
    description:
      'JWT-авторизация, изоляция данных по рабочим пространствам, контроль ролей пользователей. Ваши данные защищены.',
  },
];

export const landingFeatures: LandingFeature[] = [
  {
    icon: 'solar:folder-with-files-bold-duotone',
    title: 'Иерархия категорий и материалов',
    description:
      'Структурируйте материалы в произвольную иерархию категорий. Любая глубина вложенности под ваши задачи.',
  },
  {
    icon: 'solar:tag-bold-duotone',
    title: 'Произвольные характеристики и поля',
    description:
      'Создавайте собственные поля для каждой категории — размеры, артикулы, цвета, единицы измерения. Любые свойства, любые типы данных.',
  },
  {
    icon: 'solar:buildings-2-bold-duotone',
    title: 'Управление рабочими пространствами',
    description:
      'Несколько рабочих пространств для разных команд или проектов с собственными правами доступа и изолированными данными.',
  },
  {
    icon: 'solar:cloud-storage-bold-duotone',
    title: 'Хранение файлов и документов',
    description:
      'Прикрепляйте к материалам и сметам документы, изображения и спецификации. Надёжное S3-совместимое хранилище.',
  },
  {
    icon: 'solar:import-bold-duotone',
    title: 'Импорт и экспорт данных',
    description:
      'Перенесите существующие справочники в систему за один шаг и выгружайте сметы в удобных для работы форматах.',
  },
  {
    icon: 'solar:code-bold-duotone',
    title: 'API для интеграций',
    description:
      'Встраивайте систему в собственный технологический стек: REST API для синхронизации с ERP, CRM и другими системами.',
  },
];

export const landingFinalCta = {
  title: 'Начните составлять сметы уже сегодня',
  subtitle:
    'Войдите в систему и оцените удобство работы с современной платформой для строительных смет.',
  ctaLabel: 'Войти в систему',
};

export const landingFooter = {
  copyright: '© 2026 Сметы. Все права защищены.',
  supportLabel: 'Служба поддержки',
};

export const landingAuthor = {
  name: 'Евгений Надточеев',
  role: 'Fullstack-разработчик · Backend · DevOps · AI',
  bio: 'Разрабатываю и сопровождаю SaaS «Сметы». 5+ лет коммерческого опыта: микросервисные архитектуры, финтех и платёжные системы, высоконагруженные сервисы, интеграция AI в рабочие процессы. Веду менторство и преподаю разработку.',
  website: 'https://nadtocheev.ru',
  portfolio: 'https://webappmaster.ru',
  contacts: [
    {
      type: 'telegram',
      label: 'Telegram (предпочтительно)',
      value: '@eugene_nadtocheev',
      href: 'https://t.me/eugene_nadtocheev',
      icon: 'solar:chat-round-dots-bold-duotone',
    },
    {
      type: 'email',
      label: 'Email',
      value: 'johnn.hotmail@mail.ru',
      href: 'mailto:johnn.hotmail@mail.ru',
      icon: 'solar:letter-bold-duotone',
    },
    {
      type: 'phone',
      label: 'Телефон',
      value: '+7 (920) 080-87-00',
      href: 'tel:+79200808700',
      icon: 'solar:phone-bold-duotone',
    },
    {
      type: 'github',
      label: 'GitHub',
      value: 'Webappmaster-Eugene',
      href: 'https://github.com/Webappmaster-Eugene',
      icon: 'mdi:github',
    },
    {
      type: 'habr',
      label: 'Habr Career',
      value: 'webappmaster',
      href: 'https://career.habr.com/webappmaster',
      icon: 'solar:code-square-bold-duotone',
    },
    {
      type: 'youtube',
      label: 'YouTube',
      value: '@webappmaster',
      href: 'https://www.youtube.com/@webappmaster',
      icon: 'mdi:youtube',
    },
    {
      type: 'website',
      label: 'Портфолио',
      value: 'webappmaster.ru',
      href: 'https://webappmaster.ru',
      icon: 'solar:global-bold-duotone',
    },
  ],
};
