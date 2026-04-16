// --------------- Interfaces ---------------

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

export interface LandingEconomyItem {
  icon: string;
  metric: string;
  description: string;
}

export interface LandingTargetAudience {
  icon: string;
  title: string;
  description: string;
  useCases: string[];
}

export interface LandingCompetitorRow {
  feature: string;
  smetas: boolean | string;
  excel: boolean | string;
  grandSmeta: boolean | string;
  s1cSmeta: boolean | string;
}

export interface LandingPricing {
  title: string;
  subtitle: string;
  price: string;
  features: string[];
  ctaLabel: string;
}

// --------------- Hero ---------------

export const landingHero = {
  title: 'SMETAS — сметы для строительных проектов быстро, точно, в одном месте',
  subtitle:
    'SaaS-платформа, которая превращает составление смет из рутины в управляемый процесс. Единая база материалов, гибкие справочники, командная работа.',
  ctaLabel: 'Начать бесплатно',
};

// --------------- Economy ---------------

export const landingEconomy: LandingEconomyItem[] = [
  {
    icon: 'solar:clock-circle-bold-duotone',
    metric: 'В 5 раз быстрее',
    description:
      'Составление смет по сравнению с Excel и ручным подсчётом. Готовые справочники, поиск, фильтры — без копирования строк между файлами.',
  },
  {
    icon: 'solar:wallet-bold-duotone',
    metric: 'До 30% экономия',
    description:
      'Единая база материалов исключает дублирующие закупки и ошибки в ценах. Актуальные данные — меньше перерасхода бюджета.',
  },
  {
    icon: 'solar:document-bold-duotone',
    metric: '0 ошибок в расчётах',
    description:
      'Автоматический подсчёт вместо ручных формул. Забудьте о поломанных ссылках в Excel и неправильных итогах.',
  },
  {
    icon: 'solar:chart-bold-duotone',
    metric: 'ROI с первого проекта',
    description:
      'Система окупается уже на первой смете за счёт экономии времени и снижения ошибок.',
  },
];

// --------------- Advantages ---------------

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

// --------------- Features ---------------

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

// --------------- Target Audience ---------------

export const landingTargetAudiences: LandingTargetAudience[] = [
  {
    icon: 'solar:calculator-bold-duotone',
    title: 'Сметчики',
    description:
      'Профессионалы, для которых точность расчётов и скорость работы — ежедневная необходимость.',
    useCases: [
      'Быстрое составление смет из готовой базы материалов',
      'Произвольные характеристики и единицы измерения',
      'Экспорт готовых смет в нужном формате',
    ],
  },
  {
    icon: 'solar:buildings-bold-duotone',
    title: 'Прорабы',
    description:
      'Руководители на объекте, которым нужен быстрый доступ к ценам и расчётам прямо на площадке.',
    useCases: [
      'Мгновенный поиск материала и его стоимости',
      'Работа с телефона или планшета',
      'Актуальные цены без звонков в офис',
    ],
  },
  {
    icon: 'solar:city-bold-duotone',
    title: 'Строительные компании',
    description:
      'Организации, которым нужна единая система для всей команды с контролем доступа и ролями.',
    useCases: [
      'Рабочие пространства для каждого проекта',
      'Разграничение ролей: менеджер, сметчик, наблюдатель',
      'Единая база материалов для всей компании',
    ],
  },
  {
    icon: 'solar:hand-shake-bold-duotone',
    title: 'Субподрядчики',
    description:
      'Подрядчики, которым нужно быстро подготовить коммерческое предложение с точными расценками.',
    useCases: [
      'Готовые шаблоны и справочники',
      'Быстрая калькуляция стоимости работ',
      'Профессиональные сметы за минуты, а не дни',
    ],
  },
];

// --------------- Competitor Comparison ---------------

export const landingCompetitorTable = {
  columns: ['SMETAS', 'Excel', 'Гранд-Смета', '1С:Смета'],
  rows: [
    {
      feature: 'Онлайн-доступ из браузера',
      smetas: true,
      excel: 'Частично',
      grandSmeta: false,
      s1cSmeta: false,
    },
    {
      feature: 'Командная работа в реальном времени',
      smetas: true,
      excel: false,
      grandSmeta: false,
      s1cSmeta: false,
    },
    {
      feature: 'Единая база материалов',
      smetas: true,
      excel: false,
      grandSmeta: true,
      s1cSmeta: true,
    },
    {
      feature: 'Произвольные поля и характеристики',
      smetas: true,
      excel: 'Вручную',
      grandSmeta: false,
      s1cSmeta: false,
    },
    {
      feature: 'REST API для интеграций',
      smetas: true,
      excel: false,
      grandSmeta: false,
      s1cSmeta: 'Частично',
    },
    {
      feature: 'Бесплатный тариф',
      smetas: true,
      excel: false,
      grandSmeta: false,
      s1cSmeta: false,
    },
    {
      feature: 'Работа с мобильных устройств',
      smetas: true,
      excel: 'Неудобно',
      grandSmeta: false,
      s1cSmeta: false,
    },
    {
      feature: 'Облачное хранилище файлов',
      smetas: true,
      excel: false,
      grandSmeta: false,
      s1cSmeta: false,
    },
  ] as LandingCompetitorRow[],
};

// --------------- Pricing ---------------

export const landingPricing: LandingPricing = {
  title: 'Начните бесплатно',
  subtitle:
    'Полный доступ ко всем возможностям платформы без ограничений по времени. Никаких скрытых платежей.',
  price: 'Бесплатно',
  features: [
    'Неограниченное количество материалов',
    'Произвольные категории и поля',
    'Рабочие пространства и роли',
    'Облачное хранилище файлов',
    'REST API для интеграций',
    'Техническая поддержка',
  ],
  ctaLabel: 'Начать бесплатно',
};

// --------------- Final CTA ---------------

export const landingFinalCta = {
  title: 'Начните составлять сметы уже сегодня',
  subtitle:
    'Зарегистрируйтесь бесплатно и оцените удобство работы с современной платформой для строительных смет.',
  ctaLabel: 'Начать бесплатно',
};

// --------------- Footer ---------------

export const landingFooter = {
  copyright: '© 2026 SMETAS. Все права защищены.',
  supportLabel: 'Служба поддержки',
};

// --------------- Author (footer contacts) ---------------

export const landingAuthor = {
  name: 'Евгений Надточеев',
  role: 'Основатель SMETAS',
  contacts: [
    {
      type: 'telegram',
      label: 'Telegram',
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
      type: 'website',
      label: 'Сайт',
      value: 'nadtocheev.ru',
      href: 'https://nadtocheev.ru',
      icon: 'solar:global-bold-duotone',
    },
  ],
};
