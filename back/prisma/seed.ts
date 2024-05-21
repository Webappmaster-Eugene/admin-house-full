import { PrismaClient } from '.prisma/client';
const prisma = new PrismaClient();
async function main() {
  // const DELETE_APP_SETTINGS = await prisma?.appSettings?.deleteMany({});
  //
  // const DELETE_REGISTER_WITH_ROLE_KEY =
  //   await prisma?.registerWithRoleKey?.deleteMany({});
  //
  // const DELETE_ALL_WORKSPACES = await prisma?.workspace?.deleteMany({});
  //
  // const DELETE_ALL_USERS = await prisma?.user?.deleteMany({});
  //
  // const DELETE_ALL_ROLES = await prisma?.role?.deleteMany({});

  const ADMIN = await prisma?.role?.create({
    data: {
      name: 'ADMIN',
      description: 'Админ всего ПО (приложения)',
    },
  });

  const MANAGER = await prisma?.role?.create({
    data: {
      name: 'MANAGER',
      description: 'Менеджер проекта, руководитель организации',
    },
  });

  const WORKER = await prisma?.role?.create({
    data: {
      name: 'WORKER',
      description: 'Сотрудник организации',
    },
  });

  const CUSTOMER = await prisma?.role?.create({
    data: {
      name: 'CUSTOMER',
      description: 'Заказчик, покупатель',
    },
  });

  const ADMIN_USER = await prisma?.user?.create({
    data: {
      email: 'admin@mail.ru',
      password: '$argon2id$v=19$m=65536,t=3,p=4$3bpIaorqAZ434ppom9guDA$AZn9O+A25nMhB0r+D1FoTZX/RS/vhFiGVlpZCer9+ps',
      roleUuid: ADMIN.uuid,
      firstName: 'Admin',
      secondName: 'Starter',
      phone: '+79999999999',
      info: 'Standard information',
    },
  });

  const WORKER_USER = await prisma?.user?.create({
    data: {
      email: 'worker@mail.ru',
      password: '$argon2id$v=19$m=65536,t=3,p=4$3bpIaorqAZ434ppom9guDA$AZn9O+A25nMhB0r+D1FoTZX/RS/vhFiGVlpZCer9+ps',
      roleUuid: WORKER.uuid,
      firstName: 'Worker',
      secondName: 'Starter',
      phone: '+79999999999',
      info: 'Standard information',
    },
  });

  const CUSTOMER_USER = await prisma?.user?.create({
    data: {
      email: 'customer@mail.ru',
      password: '$argon2id$v=19$m=65536,t=3,p=4$3bpIaorqAZ434ppom9guDA$AZn9O+A25nMhB0r+D1FoTZX/RS/vhFiGVlpZCer9+ps',
      roleUuid: CUSTOMER.uuid,
      firstName: 'Customer',
      secondName: 'Starter',
      phone: '+79999999999',
      info: 'Standard information',
    },
  });

  const MANAGER_USER = await prisma?.user?.create({
    data: {
      email: 'manager@mail.ru',
      password: '$argon2id$v=19$m=65536,t=3,p=4$3bpIaorqAZ434ppom9guDA$AZn9O+A25nMhB0r+D1FoTZX/RS/vhFiGVlpZCer9+ps',
      roleUuid: MANAGER.uuid,
      firstName: 'Manager',
      secondName: 'Starter',
      phone: '+79999999999',
      info: 'Standard information',
    },
  });

  const MANAGER_WORKSPACE = await prisma?.workspace?.create({
    data: {
      name: 'Admin House Workspace',
      description: 'Admin House Workspace - SaaS для эффективного контроля и составления сметной документации',
      workspaceCreatorUuid: MANAGER_USER.uuid,
    },
  });

  const MANAGER_HANDBOOK = await prisma?.handbook?.create({
    data: {
      name: 'Admin House Handbook',
      description: 'Admin House Handbook - справочник ресурсов для эффективного контроля и составления сметной документации',
      responsibleManagerUuid: MANAGER_USER.uuid,
      workspaceUuid: MANAGER_WORKSPACE.uuid,
    },
  });

  const MANAGER_ORGANIZATION = await prisma?.organization?.create({
    data: {
      name: 'Admin House Organization',
      description: 'Admin House Organization - организация, занимающаяся постройкой домов',
      workspaceUuid: MANAGER_WORKSPACE.uuid,
      organizationLeaderUuid: MANAGER_USER.uuid,
    },
  });

  const MANAGER_PROJECT = await prisma?.project?.create({
    data: {
      name: 'Admin House Project - дом №1',
      description: 'Admin House Project - постройка частного дома 100м2 в Санкт-Петербурге',
      responsibleManagerUuid: MANAGER_USER.uuid,
      customerUuid: CUSTOMER_USER.uuid,
      customerMail: CUSTOMER_USER.email,
      organizationUuid: MANAGER_ORGANIZATION.uuid,
    },
  });

  const UPDATED_MANAGER_WORKSPACE = await prisma?.workspace?.update({
    where: {
      uuid: MANAGER_WORKSPACE.uuid,
    },
    data: {
      handbookOfWorkspaceUuid: MANAGER_HANDBOOK.uuid,
    },
  });

  const UPDATED_MANAGER_USER = await prisma?.user?.update({
    where: {
      uuid: MANAGER_USER.uuid,
    },
    data: {
      creatorOfWorkspaceUuid: MANAGER_WORKSPACE.uuid,
      handbookManagerUuid: MANAGER_HANDBOOK.uuid,
    },
  });

  const UPDATED_WORKER_USER = await prisma?.user?.update({
    where: {
      uuid: WORKER_USER.uuid,
    },
    data: {
      memberOfWorkspaceUuid: MANAGER_WORKSPACE.uuid,
      memberOfOrganizationUuid: MANAGER_ORGANIZATION.uuid,
      memberOfProjectUuid: MANAGER_PROJECT.uuid,
    },
  });

  const UPDATED_CUSTOMER_USER = await prisma?.user?.update({
    where: {
      uuid: CUSTOMER_USER.uuid,
    },
    data: {
      memberOfWorkspaceUuid: MANAGER_WORKSPACE.uuid,
      memberOfOrganizationUuid: MANAGER_ORGANIZATION.uuid,
      memberOfProjectUuid: MANAGER_PROJECT.uuid,
    },
  });

  const APP_SETTINGS = await prisma?.appSettings?.create({
    data: {
      name: 'Admin House - SaaS для эффективного контроля и составления сметной документации',
      description: 'Настройки приложения Admin House',
      comment: 'Описание приложения Admin House',
      currency: 'RUB',
      status: 'UP',
      language: 'RUSSIAN',
    },
  });

  const GLOBAL_CATEGORY_PEOPLE = await prisma?.globalCategoryMaterial?.create({
    data: {
      name: 'PEOPLE',
      nameRu: 'Люди',
      comment: 'Рабочие на проекте',
      color: '#CD5C5C',
    },
  });

  const GLOBAL_CATEGORY_MATERIALS = await prisma?.globalCategoryMaterial?.create({
    data: {
      name: 'MATERIALS',
      nameRu: 'Материалы',
      comment: 'Материалы для стройки',
      color: '#ADFF2F',
    },
  });

  const GLOBAL_CATEGORY_OVERHEAD = await prisma?.globalCategoryMaterial?.create({
    data: {
      name: 'OVERHEAD',
      nameRu: 'Накладные',
      comment: 'Накладные (документация)',
      color: '#EE82EE',
    },
  });

  const GLOBAL_CATEGORY_MECHANISMS = await prisma?.globalCategoryMaterial?.create({
    data: {
      name: 'MECHANISMS',
      nameRu: 'Механизмы',
      comment: 'Механизмы для постройки',
      color: '#00BFFF',
    },
  });

  const REGISTER_WITH_ROLE_KEY = await prisma?.registerWithRoleKey?.create({
    data: {
      key: process.env.STRICT_ADMIN_KEY,
    },
  });

  const RESOURCE_STATUS_DRAFT = await prisma?.statusResource?.create({
    data: {
      name: 'Черновик',
      comment: 'Статус ресурса - черновик',
    },
  });

  const RESOURCE_STATUS_CALCULATION = await prisma?.statusResource?.create({
    data: {
      name: 'Расчёт',
      comment: 'Статус ресурса - расчёт',
    },
  });

  const RESOURCE_STATUS_DEPARTURE_REQUIRED = await prisma?.statusResource?.create({
    data: {
      name: 'Требуется выезд',
      comment: 'Статус ресурса - требуется выезд',
    },
  });

  const RESOURCE_STATUS_FROM_CUSTOMER = await prisma?.statusResource?.create({
    data: {
      name: 'С заказчика',
      comment: 'Статус ресурса - с заказчика',
    },
  });

  const RESOURCE_STATUS_DONE = await prisma?.statusResource?.create({
    data: {
      name: 'Готово',
      comment: 'Статус ресурса - готово',
    },
  });

  const RESPONSIBLE_PARTNER_PRODUCER_1 = await prisma?.responsiblePartnerProducer?.create({
    data: {
      name: 'ООО Лучи',
      comment: 'Наша собственная дочерняя компания - ООО Лучи',
      info: 'Не будем искать подрядчика на стороне',
      handbookUuid: MANAGER_HANDBOOK.uuid,
      email: 'luchi@mail.ru',
      phone: '+79996054567',
    },
  });

  const RESPONSIBLE_PARTNER_PRODUCER_2 = await prisma?.responsiblePartnerProducer?.create({
    data: {
      name: 'ООО СВЕЗА',
      comment: 'СВЕЗА',
      info: 'СВЕЗА',
      handbookUuid: MANAGER_HANDBOOK.uuid,
      email: 'sveza@mail.ru',
      phone: '+79996054569',
    },
  });

  const RESPONSIBLE_PARTNER_PRODUCER_3 = await prisma?.responsiblePartnerProducer?.create({
    data: {
      name: 'Grand Line',
      comment: 'Grand Line',
      info: 'Grand Line',
      handbookUuid: MANAGER_HANDBOOK.uuid,
      email: 'grandline@mail.ru',
      phone: '+79996054569',
    },
  });

  const FIELD_UNIT_MEASUREMENTS = await prisma?.fieldUnitMeasurement?.createMany({
    data: [
      {
        name: 'м3',
        comment: 'Метры кубические',
        handbookUuid: MANAGER_HANDBOOK.uuid,
      },
      {
        name: 'м2',
        comment: 'Метры квадратные',
        handbookUuid: MANAGER_HANDBOOK.uuid,
      },
      {
        name: 'мм',
        comment: 'Миллиметры',
        handbookUuid: MANAGER_HANDBOOK.uuid,
      },
      {
        name: 'см',
        comment: 'Сантиметры',
        handbookUuid: MANAGER_HANDBOOK.uuid,
      },
      {
        name: 'пог. м',
        comment: 'Погонные метры',
        handbookUuid: MANAGER_HANDBOOK.uuid,
      },
      {
        name: 'м',
        comment: 'Метры',
        handbookUuid: MANAGER_HANDBOOK.uuid,
      },
      {
        name: 'кг',
        comment: 'Килограммы',
        handbookUuid: MANAGER_HANDBOOK.uuid,
      },
      {
        name: 'литр',
        comment: 'Литры',
        handbookUuid: MANAGER_HANDBOOK.uuid,
      },
      {
        name: 'бухта',
        comment: 'Бухты',
        handbookUuid: MANAGER_HANDBOOK.uuid,
      },
      {
        name: 'упаковка',
        comment: 'Упаковки',
        handbookUuid: MANAGER_HANDBOOK.uuid,
      },
      {
        name: 'шт.',
        comment: 'Штуки',
        handbookUuid: MANAGER_HANDBOOK.uuid,
      },
      {
        name: 'рулон',
        comment: 'Рулоны',
        handbookUuid: MANAGER_HANDBOOK.uuid,
      },
      {
        name: 'лист',
        comment: 'Листы',
        handbookUuid: MANAGER_HANDBOOK.uuid,
      },
      {
        name: 'месяц',
        comment: 'Месяцы',
        handbookUuid: MANAGER_HANDBOOK.uuid,
      },
      {
        name: 'чел.ч',
        comment: 'Человеко-часы',
        handbookUuid: MANAGER_HANDBOOK.uuid,
      },
      {
        name: 'чел.дн',
        comment: 'Человеко-дни',
        handbookUuid: MANAGER_HANDBOOK.uuid,
      },
      {
        name: '-',
        comment: 'Отсутствует единица измерения (не важно)',
        handbookUuid: MANAGER_HANDBOOK.uuid,
      },
    ],
  });

  const FIELD_TYPES = await prisma?.fieldType?.createMany({
    data: [
      {
        name: 'Текст',
        description: 'Текстовое поле',
        jsType: 'string',
      },
      {
        name: 'Число',
        description: 'Числовое поле',
        jsType: 'number',
      },
      {
        name: 'Выпадающий список',
        description: 'Поле - выбор из набора данных, выпадающий список',
        jsType: 'array',
      },
    ],
  });

  const CATEGORY_MATERIALS = await prisma?.categoryMaterial?.createMany({
    data: [
      {
        name: 'Листовые',
        comment: 'Листовые материалы',
        globalCategoryMaterialUuid: GLOBAL_CATEGORY_MATERIALS.uuid,
        templateName: '',
        handbookUuid: MANAGER_HANDBOOK.uuid,
      },
      {
        name: 'Теплоизоляция',
        comment: 'Теплоизоляция',
        globalCategoryMaterialUuid: GLOBAL_CATEGORY_MATERIALS.uuid,
        templateName: '',
        handbookUuid: MANAGER_HANDBOOK.uuid,
      },
      {
        name: 'Рулонные',
        comment: 'Рулонные материалы',
        globalCategoryMaterialUuid: GLOBAL_CATEGORY_MATERIALS.uuid,
        templateName: '',
        handbookUuid: MANAGER_HANDBOOK.uuid,
      },
      {
        name: 'Метизы',
        comment: 'Метизы',
        globalCategoryMaterialUuid: GLOBAL_CATEGORY_MATERIALS.uuid,
        templateName: '',
        handbookUuid: MANAGER_HANDBOOK.uuid,
      },
      {
        name: 'Фасонные элементы',
        comment: 'Фасонные элементы',
        globalCategoryMaterialUuid: GLOBAL_CATEGORY_MATERIALS.uuid,
        templateName: '',
        handbookUuid: MANAGER_HANDBOOK.uuid,
      },
      {
        name: 'Лес',
        comment: 'Лес',
        globalCategoryMaterialUuid: GLOBAL_CATEGORY_MATERIALS.uuid,
        templateName: '',
        handbookUuid: MANAGER_HANDBOOK.uuid,
      },
      {
        name: 'Другое',
        comment: 'Другое',
        globalCategoryMaterialUuid: GLOBAL_CATEGORY_MATERIALS.uuid,
        templateName: '',
        handbookUuid: MANAGER_HANDBOOK.uuid,
      },
      {
        name: 'Измерительные приборы',
        comment: 'Измерительные приборы',
        globalCategoryMaterialUuid: GLOBAL_CATEGORY_MATERIALS.uuid,
        templateName: '',
        handbookUuid: MANAGER_HANDBOOK.uuid,
      },
      {
        name: 'Шины',
        comment: 'Шины',
        globalCategoryMaterialUuid: GLOBAL_CATEGORY_MATERIALS.uuid,
        templateName: '',
        handbookUuid: MANAGER_HANDBOOK.uuid,
      },
    ],
  });

  const FIELD_OF_CATEGORY_MATERIALS = await prisma?.fieldOfCategoryMaterial?.createMany({
    data: [
      {
        name: 'Диаметр метиза',
        comment: 'Диаметр окружности метиза',
        createdByUuid: MANAGER_USER.uuid,
        defaultValue: '5',
        isRequired: true,
        unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENTS[2].uuid,
        unique_name_for_template: `{{#диаметр_метиза_${CATEGORY_MATERIALS[3].uuid.slice(0, 5)}_${MANAGER_HANDBOOK.uuid.slice(0, 5)}}}`,
        categoryMaterialUuid: CATEGORY_MATERIALS[3].uuid,
        fieldTypeUuid: FIELD_TYPES[1].uuid,
        handbookUuid: MANAGER_HANDBOOK.uuid,
      },
      {
        name: 'Длина метиза',
        comment: 'Длина метиза',
        createdByUuid: MANAGER_USER.uuid,
        isRequired: true,
        unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENTS[2].uuid,
        unique_name_for_template: `{{#длина_метиза_${CATEGORY_MATERIALS[3].uuid.slice(0, 5)}_${MANAGER_HANDBOOK.uuid.slice(0, 5)}}}`,
        categoryMaterialUuid: CATEGORY_MATERIALS[3].uuid,
        fieldTypeUuid: FIELD_TYPES[1].uuid,
        handbookUuid: MANAGER_HANDBOOK.uuid,
      },
      {
        name: 'Подтип метиза',
        comment: 'Подтип метиза (список)',
        createdByUuid: MANAGER_USER.uuid,
        isRequired: true,
        unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENTS[16].uuid,
        unique_name_for_template: `{{#подтип_метиза_${CATEGORY_MATERIALS[3].uuid.slice(0, 5)}_${MANAGER_HANDBOOK.uuid.slice(0, 5)}}}`,
        categoryMaterialUuid: CATEGORY_MATERIALS[3].uuid,
        fieldTypeUuid: FIELD_TYPES[2].uuid,
        handbookUuid: MANAGER_HANDBOOK.uuid,
      },
      {
        name: 'Подтип листового материала',
        comment: 'Подтип листового материала (список)',
        createdByUuid: MANAGER_USER.uuid,
        isRequired: true,
        unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENTS[16].uuid,
        unique_name_for_template: `{{#подтип_листового_${CATEGORY_MATERIALS[0].uuid.slice(0, 5)}_${MANAGER_HANDBOOK.uuid.slice(0, 5)}}}`,
        categoryMaterialUuid: CATEGORY_MATERIALS[0].uuid,
        fieldTypeUuid: FIELD_TYPES[2].uuid,
        handbookUuid: MANAGER_HANDBOOK.uuid,
      },
      {
        name: 'Материал изготовления листового материала',
        comment: 'Материал изготовления листового материала (список)',
        createdByUuid: MANAGER_USER.uuid,
        isRequired: true,
        unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENTS[16].uuid,
        unique_name_for_template: `{{#материал_листового${CATEGORY_MATERIALS[0].uuid.slice(0, 5)}_${MANAGER_HANDBOOK.uuid.slice(0, 5)}}}`,
        categoryMaterialUuid: CATEGORY_MATERIALS[0].uuid,
        fieldTypeUuid: FIELD_TYPES[2].uuid,
        handbookUuid: MANAGER_HANDBOOK.uuid,
      },
      {
        name: 'Толщина листового материала',
        comment: 'Толщина листового материала',
        createdByUuid: MANAGER_USER.uuid,
        isRequired: true,
        unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENTS[2].uuid,
        unique_name_for_template: `{{#толщина_листового${CATEGORY_MATERIALS[0].uuid.slice(0, 5)}_${MANAGER_HANDBOOK.uuid.slice(0, 5)}}}`,
        categoryMaterialUuid: CATEGORY_MATERIALS[0].uuid,
        fieldTypeUuid: FIELD_TYPES[1].uuid,
        handbookUuid: MANAGER_HANDBOOK.uuid,
      },
      {
        name: 'Ширина листового материала',
        comment: 'Ширина листового материала',
        createdByUuid: MANAGER_USER.uuid,
        isRequired: true,
        unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENTS[2].uuid,
        unique_name_for_template: `{{#ширина_листового${CATEGORY_MATERIALS[0].uuid.slice(0, 5)}_${MANAGER_HANDBOOK.uuid.slice(0, 5)}}}`,
        categoryMaterialUuid: CATEGORY_MATERIALS[0].uuid,
        fieldTypeUuid: FIELD_TYPES[1].uuid,
        handbookUuid: MANAGER_HANDBOOK.uuid,
      },
      {
        name: 'Длина листового материала',
        comment: 'Длина листового материала',
        createdByUuid: MANAGER_USER.uuid,
        isRequired: true,
        unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENTS[2].uuid,
        unique_name_for_template: `{{#длина_листового${CATEGORY_MATERIALS[0].uuid.slice(0, 5)}_${MANAGER_HANDBOOK.uuid.slice(0, 5)}}}`,
        categoryMaterialUuid: CATEGORY_MATERIALS[0].uuid,
        fieldTypeUuid: FIELD_TYPES[1].uuid,
        handbookUuid: MANAGER_HANDBOOK.uuid,
      },
      {
        name: 'Сорт листового материала',
        comment: 'Сорт листового материала (список)',
        createdByUuid: MANAGER_USER.uuid,
        isRequired: true,
        unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENTS[16].uuid,
        unique_name_for_template: `{{#сорт_листового${CATEGORY_MATERIALS[0].uuid.slice(0, 5)}_${MANAGER_HANDBOOK.uuid.slice(0, 5)}}}`,
        categoryMaterialUuid: CATEGORY_MATERIALS[0].uuid,
        fieldTypeUuid: FIELD_TYPES[2].uuid,
        handbookUuid: MANAGER_HANDBOOK.uuid,
      },
      {
        name: 'Марка листового материала',
        comment: 'Марка листового материала (список)',
        createdByUuid: MANAGER_USER.uuid,
        isRequired: true,
        unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENTS[16].uuid,
        unique_name_for_template: `{{#марка_листового${CATEGORY_MATERIALS[0].uuid.slice(0, 5)}_${MANAGER_HANDBOOK.uuid.slice(0, 5)}}}`,
        categoryMaterialUuid: CATEGORY_MATERIALS[0].uuid,
        fieldTypeUuid: FIELD_TYPES[2].uuid,
        handbookUuid: MANAGER_HANDBOOK.uuid,
      },
      {
        name: 'ГОСТ листового материала',
        comment: 'ГОСТ листового материала (ТУ или без требований) (список)',
        createdByUuid: MANAGER_USER.uuid,
        isRequired: false,
        unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENTS[16].uuid,
        unique_name_for_template: `{{#гост_листового${CATEGORY_MATERIALS[0].uuid.slice(0, 5)}_${MANAGER_HANDBOOK.uuid.slice(0, 5)}}}`,
        categoryMaterialUuid: CATEGORY_MATERIALS[0].uuid,
        fieldTypeUuid: FIELD_TYPES[2].uuid,
        handbookUuid: MANAGER_HANDBOOK.uuid,
      },
      {
        name: 'Вид шины',
        comment: 'Вид шины (список)',
        createdByUuid: MANAGER_USER.uuid,
        isRequired: false,
        unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENTS[16].uuid,
        unique_name_for_template: `{{#вид_шины${CATEGORY_MATERIALS[8].uuid.slice(0, 5)}_${MANAGER_HANDBOOK.uuid.slice(0, 5)}}}`,
        categoryMaterialUuid: CATEGORY_MATERIALS[8].uuid,
        fieldTypeUuid: FIELD_TYPES[2].uuid,
        handbookUuid: MANAGER_HANDBOOK.uuid,
      },
    ],
  });

  const CATEGORY_MATERIAL_COVER_UPDATED = await prisma?.categoryMaterial?.update({
    where: {
      uuid: CATEGORY_MATERIALS[0].uuid,
    },
    data: {
      templateName: `${FIELD_OF_CATEGORY_MATERIALS[3].templateName} ${FIELD_OF_CATEGORY_MATERIALS[4].templateName} ${FIELD_OF_CATEGORY_MATERIALS[9].templateName} ${FIELD_OF_CATEGORY_MATERIALS[5].templateName}×${FIELD_OF_CATEGORY_MATERIALS[6].templateName}×${FIELD_OF_CATEGORY_MATERIALS[7].templateName} ${FIELD_OF_CATEGORY_MATERIALS[8].templateName}`,
    },
  });

  const CATEGORY_MATERIAL_HARDWARE_UPDATED = await prisma?.categoryMaterial?.update({
    where: {
      uuid: CATEGORY_MATERIALS[3].uuid,
    },
    data: {
      templateName: `${FIELD_OF_CATEGORY_MATERIALS[2].templateName} ${FIELD_OF_CATEGORY_MATERIALS[0].templateName}×${FIELD_OF_CATEGORY_MATERIALS[1].templateName}`,
    },
  });

  const FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE = await prisma?.fieldVariantsForSelectorFieldType?.createMany({
    data: [
      {
        value: 'Саморез',
        description: 'Саморез (метизы), подтип',
        handbookUuid: MANAGER_HANDBOOK.uuid,
        fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIALS[2].uuid,
      },
      {
        value: 'Шуруп',
        description: 'Шуруп (метизы), подтип',
        handbookUuid: MANAGER_HANDBOOK.uuid,
        fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIALS[2].uuid,
      },
      {
        value: 'Винт',
        description: 'Винт (метизы), подтип',
        handbookUuid: MANAGER_HANDBOOK.uuid,
        fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIALS[2].uuid,
      },
      {
        value: 'Болт сантехнический',
        description: 'Болт сантехнический (метизы), подтип',
        handbookUuid: MANAGER_HANDBOOK.uuid,
        fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIALS[2].uuid,
      },
      {
        value: 'Фанера',
        description: 'Фанера (листовые, подтип)',
        handbookUuid: MANAGER_HANDBOOK.uuid,
        fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIALS[3].uuid,
      },
      {
        value: 'OSB',
        description: 'OSB (листовые, подтип)',
        handbookUuid: MANAGER_HANDBOOK.uuid,
        fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIALS[3].uuid,
      },
      {
        value: 'Хвойная',
        description: 'Хвойная (листовые, материал)',
        handbookUuid: MANAGER_HANDBOOK.uuid,
        fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIALS[3].uuid,
      },
      {
        value: 'Берёзовая',
        description: 'Берёзовая (листовые, материал)',
        handbookUuid: MANAGER_HANDBOOK.uuid,
        fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIALS[3].uuid,
      },
      {
        value: '4/4',
        description: '4/4 (листовые, сорт)',
        handbookUuid: MANAGER_HANDBOOK.uuid,
        fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIALS[8].uuid,
      },
      {
        value: '3/4',
        description: '3/4 (листовые, сорт)',
        handbookUuid: MANAGER_HANDBOOK.uuid,
        fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIALS[8].uuid,
      },
      {
        value: '3/3',
        description: '3/3 (листовые, сорт)',
        handbookUuid: MANAGER_HANDBOOK.uuid,
        fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIALS[8].uuid,
      },
      {
        value: '2ш/3',
        description: '2ш/3 (листовые, сорт)',
        handbookUuid: MANAGER_HANDBOOK.uuid,
        fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIALS[8].uuid,
      },
      {
        value: 'ФК',
        description: 'ФК (листовые, марка)',
        handbookUuid: MANAGER_HANDBOOK.uuid,
        fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIALS[8].uuid,
      },
      {
        value: 'ФСФ',
        description: 'ФСФ (листовые, марка)',
        handbookUuid: MANAGER_HANDBOOK.uuid,
        fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIALS[8].uuid,
      },
      {
        value: 'ЛАК',
        description: 'ЛАК (листовые, марка)',
        handbookUuid: MANAGER_HANDBOOK.uuid,
        fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIALS[8].uuid,
      },
      {
        value: 'ГОСТ',
        description: 'ГОСТ (листовые, ГОСТ)',
        handbookUuid: MANAGER_HANDBOOK.uuid,
        fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIALS[10].uuid,
      },
      {
        value: 'ТУ',
        description: 'ТУ (листовые, ГОСТ)',
        handbookUuid: MANAGER_HANDBOOK.uuid,
        fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIALS[10].uuid,
      },
      {
        value: 'Зимняя',
        description: 'Зимняя (шины, вид)',
        handbookUuid: MANAGER_HANDBOOK.uuid,
        fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIALS[11].uuid,
      },
      {
        value: 'Летняя',
        description: 'Летняя (шины, вид)',
        handbookUuid: MANAGER_HANDBOOK.uuid,
        fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIALS[11].uuid,
      },
    ],
  });

  const MATERIALS = await prisma?.material?.createMany({
    data: [
      {
        name: 'Саморез 6×70 (черновик)',
        comment: 'Это те винты, которыми мы крепим доски обвязки к фундаменту',
        price: 4.13,
        namePublic: 'Глухарь',
        handbookUuid: MANAGER_HANDBOOK.uuid,
        categoryMaterialUuid: CATEGORY_MATERIALS[3].uuid,
        unitMeasurementUuid: FIELD_UNIT_MEASUREMENTS[10].uuid,
        responsiblePartnerUuid: RESPONSIBLE_PARTNER_PRODUCER_1.uuid,
      },
      {
        name: 'Фанера Берёзовая ФСФ 18×1220×2440 4/4 (черновик)',
        comment: 'Это ...',
        price: 1770,
        namePublic: 'Фанера стандартная',
        handbookUuid: MANAGER_HANDBOOK.uuid,
        categoryMaterialUuid: CATEGORY_MATERIALS[0].uuid,
        unitMeasurementUuid: FIELD_UNIT_MEASUREMENTS[12].uuid,
        responsiblePartnerUuid: RESPONSIBLE_PARTNER_PRODUCER_3.uuid,
      },
      {
        name: 'Болт сантехнический 10×70 (черновик)',
        comment: 'Это ...',
        price: 0.83,
        namePublic: 'Болт обычный',
        handbookUuid: MANAGER_HANDBOOK.uuid,
        categoryMaterialUuid: CATEGORY_MATERIALS[3].uuid,
        unitMeasurementUuid: FIELD_UNIT_MEASUREMENTS[10].uuid,
        responsiblePartnerUuid: RESPONSIBLE_PARTNER_PRODUCER_2.uuid,
      },
    ],
  });

  // FIXME при создании материала нужно проверять - а заполнил ли пользователь все обязательные поля
  // для конкретной категории, к которой принадлежит материал. То есть отношение каткгория материала - поля материала
  // и характеристики материала - поле категории материала

  const CHARACTERISTICS_MATERIAL_OF_GLUHAR = await prisma?.characteristicsMaterial?.createMany({
    data: [
      {
        name: FIELD_OF_CATEGORY_MATERIALS[0].name,
        materialUuid: MATERIALS[0].uuid,
        value: '6',
        comment: 'там нестабильный диаметр, надо проверять',
        handbookUuid: MANAGER_HANDBOOK.uuid,
        fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIALS[0].uuid,
        fieldTypeUuid: FIELD_OF_CATEGORY_MATERIALS[0].fieldTypeUuid,
        categoryMaterialUuid: FIELD_OF_CATEGORY_MATERIALS[0].categoryMaterialUuid,
        addedByUserUuid: MANAGER_USER.uuid,
        fieldUnitMeasurementUuid: FIELD_OF_CATEGORY_MATERIALS[0].unitOfMeasurementUuid,
      },
      {
        name: FIELD_OF_CATEGORY_MATERIALS[1].name,
        materialUuid: MATERIALS[0].uuid,
        value: '30',
        comment: 'no comments',
        handbookUuid: MANAGER_HANDBOOK.uuid,
        fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIALS[1].uuid,
        fieldTypeUuid: FIELD_OF_CATEGORY_MATERIALS[1].fieldTypeUuid,
        categoryMaterialUuid: FIELD_OF_CATEGORY_MATERIALS[1].categoryMaterialUuid,
        addedByUserUuid: MANAGER_USER.uuid,
        fieldUnitMeasurementUuid: FIELD_OF_CATEGORY_MATERIALS[1].unitOfMeasurementUuid,
      },
      {
        name: FIELD_OF_CATEGORY_MATERIALS[2].name,
        materialUuid: MATERIALS[0].uuid,
        value: FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE[0].value,
        handbookUuid: MANAGER_HANDBOOK.uuid,
        fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIALS[2].uuid,
        fieldTypeUuid: FIELD_OF_CATEGORY_MATERIALS[2].fieldTypeUuid,
        categoryMaterialUuid: FIELD_OF_CATEGORY_MATERIALS[2].categoryMaterialUuid,
        addedByUserUuid: MANAGER_USER.uuid,
        fieldUnitMeasurementUuid: FIELD_OF_CATEGORY_MATERIALS[2].unitOfMeasurementUuid,
      },
    ],
  });

  const CHARACTERISTICS_MATERIAL_OF_BOLT = await prisma?.characteristicsMaterial?.createMany({
    data: [
      {
        name: FIELD_OF_CATEGORY_MATERIALS[0].name,
        materialUuid: MATERIALS[2].uuid,
        value: '10',
        handbookUuid: MANAGER_HANDBOOK.uuid,
        fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIALS[0].uuid,
        fieldTypeUuid: FIELD_OF_CATEGORY_MATERIALS[0].fieldTypeUuid,
        categoryMaterialUuid: FIELD_OF_CATEGORY_MATERIALS[0].categoryMaterialUuid,
        addedByUserUuid: MANAGER_USER.uuid,
        fieldUnitMeasurementUuid: FIELD_OF_CATEGORY_MATERIALS[0].unitOfMeasurementUuid,
      },
      {
        name: FIELD_OF_CATEGORY_MATERIALS[1].name,
        materialUuid: MATERIALS[2].uuid,
        value: '70',
        handbookUuid: MANAGER_HANDBOOK.uuid,
        fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIALS[1].uuid,
        fieldTypeUuid: FIELD_OF_CATEGORY_MATERIALS[1].fieldTypeUuid,
        categoryMaterialUuid: FIELD_OF_CATEGORY_MATERIALS[1].categoryMaterialUuid,
        addedByUserUuid: MANAGER_USER.uuid,
        fieldUnitMeasurementUuid: FIELD_OF_CATEGORY_MATERIALS[1].unitOfMeasurementUuid,
      },
      {
        name: FIELD_OF_CATEGORY_MATERIALS[2].name,
        materialUuid: MATERIALS[2].uuid,
        value: FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE[3].value,
        handbookUuid: MANAGER_HANDBOOK.uuid,
        fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIALS[2].uuid,
        fieldTypeUuid: FIELD_OF_CATEGORY_MATERIALS[2].fieldTypeUuid,
        categoryMaterialUuid: FIELD_OF_CATEGORY_MATERIALS[2].categoryMaterialUuid,
        addedByUserUuid: MANAGER_USER.uuid,
        fieldUnitMeasurementUuid: FIELD_OF_CATEGORY_MATERIALS[2].unitOfMeasurementUuid,
      },
    ],
  });

  const CHARACTERISTICS_MATERIAL_OF_FANERA = await prisma?.characteristicsMaterial?.createMany({
    data: [
      {
        name: FIELD_OF_CATEGORY_MATERIALS[3].name,
        materialUuid: MATERIALS[1].uuid,
        value: FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE[4].value,
        handbookUuid: MANAGER_HANDBOOK.uuid,
        fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIALS[3].uuid,
        fieldTypeUuid: FIELD_OF_CATEGORY_MATERIALS[3].fieldTypeUuid,
        categoryMaterialUuid: FIELD_OF_CATEGORY_MATERIALS[3].categoryMaterialUuid,
        addedByUserUuid: MANAGER_USER.uuid,
        fieldUnitMeasurementUuid: FIELD_OF_CATEGORY_MATERIALS[3].unitOfMeasurementUuid,
      },
      {
        name: FIELD_OF_CATEGORY_MATERIALS[4].name,
        materialUuid: MATERIALS[1].uuid,
        value: FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE[7].value,
        handbookUuid: MANAGER_HANDBOOK.uuid,
        fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIALS[1].uuid,
        fieldTypeUuid: FIELD_OF_CATEGORY_MATERIALS[1].fieldTypeUuid,
        categoryMaterialUuid: FIELD_OF_CATEGORY_MATERIALS[1].categoryMaterialUuid,
        addedByUserUuid: MANAGER_USER.uuid,
        fieldUnitMeasurementUuid: FIELD_OF_CATEGORY_MATERIALS[1].unitOfMeasurementUuid,
      },
      {
        name: FIELD_OF_CATEGORY_MATERIALS[5].name,
        materialUuid: MATERIALS[1].uuid,
        value: '18',
        handbookUuid: MANAGER_HANDBOOK.uuid,
        fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIALS[5].uuid,
        fieldTypeUuid: FIELD_OF_CATEGORY_MATERIALS[5].fieldTypeUuid,
        categoryMaterialUuid: FIELD_OF_CATEGORY_MATERIALS[5].categoryMaterialUuid,
        addedByUserUuid: MANAGER_USER.uuid,
        fieldUnitMeasurementUuid: FIELD_OF_CATEGORY_MATERIALS[5].unitOfMeasurementUuid,
      },
      {
        name: FIELD_OF_CATEGORY_MATERIALS[6].name,
        materialUuid: MATERIALS[1].uuid,
        value: '1220',
        handbookUuid: MANAGER_HANDBOOK.uuid,
        fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIALS[6].uuid,
        fieldTypeUuid: FIELD_OF_CATEGORY_MATERIALS[6].fieldTypeUuid,
        categoryMaterialUuid: FIELD_OF_CATEGORY_MATERIALS[6].categoryMaterialUuid,
        addedByUserUuid: MANAGER_USER.uuid,
        fieldUnitMeasurementUuid: FIELD_OF_CATEGORY_MATERIALS[6].unitOfMeasurementUuid,
      },
      {
        name: FIELD_OF_CATEGORY_MATERIALS[7].name,
        materialUuid: MATERIALS[1].uuid,
        value: '2440',
        handbookUuid: MANAGER_HANDBOOK.uuid,
        fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIALS[7].uuid,
        fieldTypeUuid: FIELD_OF_CATEGORY_MATERIALS[7].fieldTypeUuid,
        categoryMaterialUuid: FIELD_OF_CATEGORY_MATERIALS[7].categoryMaterialUuid,
        addedByUserUuid: MANAGER_USER.uuid,
        fieldUnitMeasurementUuid: FIELD_OF_CATEGORY_MATERIALS[7].unitOfMeasurementUuid,
      },
      {
        name: FIELD_OF_CATEGORY_MATERIALS[8].name,
        materialUuid: MATERIALS[1].uuid,
        value: FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE[8].value,
        handbookUuid: MANAGER_HANDBOOK.uuid,
        fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIALS[8].uuid,
        fieldTypeUuid: FIELD_OF_CATEGORY_MATERIALS[8].fieldTypeUuid,
        categoryMaterialUuid: FIELD_OF_CATEGORY_MATERIALS[8].categoryMaterialUuid,
        addedByUserUuid: MANAGER_USER.uuid,
        fieldUnitMeasurementUuid: FIELD_OF_CATEGORY_MATERIALS[8].unitOfMeasurementUuid,
      },
      {
        name: FIELD_OF_CATEGORY_MATERIALS[9].name,
        materialUuid: MATERIALS[1].uuid,
        value: FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE[13].value,
        handbookUuid: MANAGER_HANDBOOK.uuid,
        fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIALS[9].uuid,
        fieldTypeUuid: FIELD_OF_CATEGORY_MATERIALS[9].fieldTypeUuid,
        categoryMaterialUuid: FIELD_OF_CATEGORY_MATERIALS[9].categoryMaterialUuid,
        addedByUserUuid: MANAGER_USER.uuid,
        fieldUnitMeasurementUuid: FIELD_OF_CATEGORY_MATERIALS[9].unitOfMeasurementUuid,
      },
    ],
  });

  function templateNameMapper(
    categoryTemplate: string,
    material: {
      name: string;
      comment: string;
      price: number;
      namePublic: string;
      handbookUuid: string;
      categoryMaterialUuid: any;
      unitMeasurementUuid: any;
      responsiblePartnerUuid: string;
    },
  ) {
    FIELD_OF_CATEGORY_MATERIALS;
    const name = ' ';
    return name;
  }

  const newNameGluhar = templateNameMapper(CATEGORY_MATERIAL_HARDWARE_UPDATED[1].templateName, MATERIALS[0]);

  const UPDATED_MATERIAL_GLUHAR = await prisma?.material?.update({
    where: {
      uuid: MATERIALS[0].uuid,
    },
    data: {
      name: newNameGluhar,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
