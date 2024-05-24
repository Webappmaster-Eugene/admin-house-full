import { PrismaClient } from '.prisma/client';
import { regexUniqueNameForTemplateFieldOfCategoryMaterialGenerator } from '../src/common/helpers/regex/fieldOfCategoryMaterialRegexGenerator';
import { templateNameMaterialGenerator } from '../src/common/helpers/regex/regexNameMaterialGenerator';
const prisma = new PrismaClient();
async function main() {
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

  const RESPONSIBLE_PARTNER_PRODUCER_0 = await prisma?.responsiblePartnerProducer?.create({
    data: {
      name: 'ООО Лучи',
      comment: 'Наша собственная дочерняя компания - ООО Лучи',
      info: 'Не будем искать подрядчика на стороне',
      handbookUuid: MANAGER_HANDBOOK.uuid,
      email: 'luchi@mail.ru',
      phone: '+79996054567',
    },
  });

  const RESPONSIBLE_PARTNER_PRODUCER_1 = await prisma?.responsiblePartnerProducer?.create({
    data: {
      name: 'ООО СВЕЗА',
      comment: 'СВЕЗА',
      info: 'СВЕЗА',
      handbookUuid: MANAGER_HANDBOOK.uuid,
      email: 'sveza@mail.ru',
      phone: '+79996054569',
    },
  });

  const RESPONSIBLE_PARTNER_PRODUCER_2 = await prisma?.responsiblePartnerProducer?.create({
    data: {
      name: 'Grand Line',
      comment: 'Grand Line',
      info: 'Grand Line',
      handbookUuid: MANAGER_HANDBOOK.uuid,
      email: 'grandline@mail.ru',
      phone: '+79996054569',
    },
  });

  const FIELD_UNIT_MEASUREMENT_0 = await prisma?.fieldUnitMeasurement?.create({
    data: {
      name: 'м3',
      comment: 'Метры кубические',
      handbookUuid: MANAGER_HANDBOOK.uuid,
    },
  });

  const FIELD_UNIT_MEASUREMENT_1 = await prisma?.fieldUnitMeasurement?.create({
    data: {
      name: 'м2',
      comment: 'Метры квадратные',
      handbookUuid: MANAGER_HANDBOOK.uuid,
    },
  });

  const FIELD_UNIT_MEASUREMENT_2 = await prisma?.fieldUnitMeasurement?.create({
    data: {
      name: 'мм',
      comment: 'Миллиметры',
      handbookUuid: MANAGER_HANDBOOK.uuid,
    },
  });

  const FIELD_UNIT_MEASUREMENT_3 = await prisma?.fieldUnitMeasurement?.create({
    data: {
      name: 'см',
      comment: 'Сантиметры',
      handbookUuid: MANAGER_HANDBOOK.uuid,
    },
  });

  const FIELD_UNIT_MEASUREMENT_4 = await prisma?.fieldUnitMeasurement?.create({
    data: {
      name: 'пог. м',
      comment: 'Погонные метры',
      handbookUuid: MANAGER_HANDBOOK.uuid,
    },
  });

  const FIELD_UNIT_MEASUREMENT_5 = await prisma?.fieldUnitMeasurement?.create({
    data: {
      name: 'м',
      comment: 'Метры',
      handbookUuid: MANAGER_HANDBOOK.uuid,
    },
  });

  const FIELD_UNIT_MEASUREMENT_6 = await prisma?.fieldUnitMeasurement?.create({
    data: {
      name: 'кг',
      comment: 'Килограммы',
      handbookUuid: MANAGER_HANDBOOK.uuid,
    },
  });

  const FIELD_UNIT_MEASUREMENT_7 = await prisma?.fieldUnitMeasurement?.create({
    data: {
      name: 'литр',
      comment: 'Литры',
      handbookUuid: MANAGER_HANDBOOK.uuid,
    },
  });

  const FIELD_UNIT_MEASUREMENT_8 = await prisma?.fieldUnitMeasurement?.create({
    data: {
      name: 'бухта',
      comment: 'Бухты',
      handbookUuid: MANAGER_HANDBOOK.uuid,
    },
  });

  const FIELD_UNIT_MEASUREMENT_9 = await prisma?.fieldUnitMeasurement?.create({
    data: {
      name: 'упаковка',
      comment: 'Упаковки',
      handbookUuid: MANAGER_HANDBOOK.uuid,
    },
  });

  const FIELD_UNIT_MEASUREMENT_10 = await prisma?.fieldUnitMeasurement?.create({
    data: {
      name: 'шт.',
      comment: 'Штуки',
      handbookUuid: MANAGER_HANDBOOK.uuid,
    },
  });

  const FIELD_UNIT_MEASUREMENT_11 = await prisma?.fieldUnitMeasurement?.create({
    data: {
      name: 'рулон',
      comment: 'Рулоны',
      handbookUuid: MANAGER_HANDBOOK.uuid,
    },
  });

  const FIELD_UNIT_MEASUREMENT_12 = await prisma?.fieldUnitMeasurement?.create({
    data: {
      name: 'лист',
      comment: 'Листы',
      handbookUuid: MANAGER_HANDBOOK.uuid,
    },
  });

  const FIELD_UNIT_MEASUREMENT_13 = await prisma?.fieldUnitMeasurement?.create({
    data: {
      name: 'месяц',
      comment: 'Месяцы',
      handbookUuid: MANAGER_HANDBOOK.uuid,
    },
  });

  const FIELD_UNIT_MEASUREMENT_14 = await prisma?.fieldUnitMeasurement?.create({
    data: {
      name: 'чел.ч',
      comment: 'Человеко-часы',
      handbookUuid: MANAGER_HANDBOOK.uuid,
    },
  });

  const FIELD_UNIT_MEASUREMENT_15 = await prisma?.fieldUnitMeasurement?.create({
    data: {
      name: 'чел.дн',
      comment: 'Человеко-дни',
      handbookUuid: MANAGER_HANDBOOK.uuid,
    },
  });

  const FIELD_UNIT_MEASUREMENT_16 = await prisma?.fieldUnitMeasurement?.create({
    data: {
      name: '-',
      comment: 'Отсутствует единица измерения (не важно)',
      handbookUuid: MANAGER_HANDBOOK.uuid,
    },
  });

  const FIELD_TYPE_0 = await prisma?.fieldType?.create({
    data: {
      name: 'Текст',
      description: 'Текстовое поле',
      jsType: 'string',
    },
  });

  const FIELD_TYPE_1 = await prisma?.fieldType?.create({
    data: {
      name: 'Число',
      description: 'Числовое поле',
      jsType: 'number',
    },
  });

  const FIELD_TYPE_2 = await prisma?.fieldType?.create({
    data: {
      name: 'Выпадающий список',
      description: 'Поле - выбор из набора данных, выпадающий список',
      jsType: 'array',
    },
  });

  const CATEGORY_MATERIAL_0 = await prisma?.categoryMaterial?.create({
    data: {
      name: 'Листовые',
      comment: 'Листовые материалы',
      globalCategoryMaterialUuid: GLOBAL_CATEGORY_MATERIALS.uuid,
      templateName: '',
      handbookUuid: MANAGER_HANDBOOK.uuid,
    },
  });

  const CATEGORY_MATERIAL_1 = await prisma?.categoryMaterial?.create({
    data: {
      name: 'Теплоизоляция',
      comment: 'Теплоизоляция',
      globalCategoryMaterialUuid: GLOBAL_CATEGORY_MATERIALS.uuid,
      templateName: '',
      handbookUuid: MANAGER_HANDBOOK.uuid,
    },
  });

  const CATEGORY_MATERIAL_2 = await prisma?.categoryMaterial?.create({
    data: {
      name: 'Рулонные',
      comment: 'Рулонные материалы',
      globalCategoryMaterialUuid: GLOBAL_CATEGORY_MATERIALS.uuid,
      templateName: '',
      handbookUuid: MANAGER_HANDBOOK.uuid,
    },
  });

  const CATEGORY_MATERIAL_3 = await prisma?.categoryMaterial?.create({
    data: {
      name: 'Метизы',
      comment: 'Метизы',
      globalCategoryMaterialUuid: GLOBAL_CATEGORY_MATERIALS.uuid,
      templateName: '',
      handbookUuid: MANAGER_HANDBOOK.uuid,
    },
  });

  const CATEGORY_MATERIAL_4 = await prisma?.categoryMaterial?.create({
    data: {
      name: 'Фасонные элементы',
      comment: 'Фасонные элементы',
      globalCategoryMaterialUuid: GLOBAL_CATEGORY_MATERIALS.uuid,
      templateName: '',
      handbookUuid: MANAGER_HANDBOOK.uuid,
    },
  });

  const CATEGORY_MATERIAL_5 = await prisma?.categoryMaterial?.create({
    data: {
      name: 'Лес',
      comment: 'Лес',
      globalCategoryMaterialUuid: GLOBAL_CATEGORY_MATERIALS.uuid,
      templateName: '',
      handbookUuid: MANAGER_HANDBOOK.uuid,
    },
  });

  const CATEGORY_MATERIAL_6 = await prisma?.categoryMaterial?.create({
    data: {
      name: 'Другое',
      comment: 'Другое',
      globalCategoryMaterialUuid: GLOBAL_CATEGORY_MATERIALS.uuid,
      templateName: '',
      handbookUuid: MANAGER_HANDBOOK.uuid,
    },
  });

  const CATEGORY_MATERIAL_7 = await prisma?.categoryMaterial?.create({
    data: {
      name: 'Измерительные приборы',
      comment: 'Измерительные приборы',
      globalCategoryMaterialUuid: GLOBAL_CATEGORY_MATERIALS.uuid,
      templateName: '',
      handbookUuid: MANAGER_HANDBOOK.uuid,
    },
  });

  const CATEGORY_MATERIAL_8 = await prisma?.categoryMaterial?.create({
    data: {
      name: 'Шины',
      comment: 'Шины',
      globalCategoryMaterialUuid: GLOBAL_CATEGORY_MATERIALS.uuid,
      templateName: '',
      handbookUuid: MANAGER_HANDBOOK.uuid,
    },
  });

  const FIELD_OF_CATEGORY_MATERIAL_0 = await prisma?.fieldOfCategoryMaterial?.create({
    data: {
      name: 'Диаметр метиза',
      comment: 'Диаметр окружности метиза',
      createdByUuid: MANAGER_USER.uuid,
      defaultValue: '5',
      isRequired: true,
      unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENT_2.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_3.uuid,
      fieldTypeUuid: FIELD_TYPE_1.uuid,
      handbookUuid: MANAGER_HANDBOOK.uuid,
    },
  });

  const FIELD_OF_CATEGORY_MATERIAL_1 = await prisma?.fieldOfCategoryMaterial?.create({
    data: {
      name: 'Длина метиза',
      comment: 'Длина метиза',
      createdByUuid: MANAGER_USER.uuid,
      isRequired: true,
      unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENT_2.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_3.uuid,
      fieldTypeUuid: FIELD_TYPE_1.uuid,
      handbookUuid: MANAGER_HANDBOOK.uuid,
    },
  });

  const FIELD_OF_CATEGORY_MATERIAL_2 = await prisma?.fieldOfCategoryMaterial?.create({
    data: {
      name: 'Подтип метиза',
      comment: 'Подтип метиза (список)',
      createdByUuid: MANAGER_USER.uuid,
      isRequired: true,
      unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENT_16.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_3.uuid,
      fieldTypeUuid: FIELD_TYPE_2.uuid,
      handbookUuid: MANAGER_HANDBOOK.uuid,
    },
  });

  const FIELD_OF_CATEGORY_MATERIAL_3 = await prisma?.fieldOfCategoryMaterial?.create({
    data: {
      name: 'Подтип листового материала',
      comment: 'Подтип листового материала (список)',
      createdByUuid: MANAGER_USER.uuid,
      isRequired: true,
      unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENT_16.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_0.uuid,
      fieldTypeUuid: FIELD_TYPE_2.uuid,
      handbookUuid: MANAGER_HANDBOOK.uuid,
    },
  });

  const FIELD_OF_CATEGORY_MATERIAL_4 = await prisma?.fieldOfCategoryMaterial?.create({
    data: {
      name: 'Подтип листового материала',
      comment: 'Подтип листового материала (список)',
      createdByUuid: MANAGER_USER.uuid,
      isRequired: true,
      unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENT_16.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_0.uuid,
      fieldTypeUuid: FIELD_TYPE_2.uuid,
      handbookUuid: MANAGER_HANDBOOK.uuid,
    },
  });

  const FIELD_OF_CATEGORY_MATERIAL_5 = await prisma?.fieldOfCategoryMaterial?.create({
    data: {
      name: 'Материал изготовления листового материала',
      comment: 'Материал изготовления листового материала (список)',
      createdByUuid: MANAGER_USER.uuid,
      isRequired: true,
      unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENT_16.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_0.uuid,
      fieldTypeUuid: FIELD_TYPE_2.uuid,
      handbookUuid: MANAGER_HANDBOOK.uuid,
    },
  });

  const FIELD_OF_CATEGORY_MATERIAL_6 = await prisma?.fieldOfCategoryMaterial?.create({
    data: {
      name: 'Толщина листового материала',
      comment: 'Толщина листового материала',
      createdByUuid: MANAGER_USER.uuid,
      isRequired: true,
      unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENT_2.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_0.uuid,
      fieldTypeUuid: FIELD_TYPE_1.uuid,
      handbookUuid: MANAGER_HANDBOOK.uuid,
    },
  });

  const FIELD_OF_CATEGORY_MATERIAL_7 = await prisma?.fieldOfCategoryMaterial?.create({
    data: {
      name: 'Ширина листового материала',
      comment: 'Ширина листового материала',
      createdByUuid: MANAGER_USER.uuid,
      isRequired: true,
      unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENT_2.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_0.uuid,
      fieldTypeUuid: FIELD_TYPE_1.uuid,
      handbookUuid: MANAGER_HANDBOOK.uuid,
    },
  });

  const FIELD_OF_CATEGORY_MATERIAL_8 = await prisma?.fieldOfCategoryMaterial?.create({
    data: {
      name: 'Длина листового материала',
      comment: 'Длина листового материала',
      createdByUuid: MANAGER_USER.uuid,
      isRequired: true,
      unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENT_2.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_0.uuid,
      fieldTypeUuid: FIELD_TYPE_1.uuid,
      handbookUuid: MANAGER_HANDBOOK.uuid,
    },
  });

  const FIELD_OF_CATEGORY_MATERIAL_9 = await prisma?.fieldOfCategoryMaterial?.create({
    data: {
      name: 'Сорт листового материала',
      comment: 'Сорт листового материала (список)',
      createdByUuid: MANAGER_USER.uuid,
      isRequired: true,
      unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENT_16.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_0.uuid,
      fieldTypeUuid: FIELD_TYPE_2.uuid,
      handbookUuid: MANAGER_HANDBOOK.uuid,
    },
  });

  const FIELD_OF_CATEGORY_MATERIAL_10 = await prisma?.fieldOfCategoryMaterial?.create({
    data: {
      name: 'Сорт листового материала',
      comment: 'Сорт листового материала (список)',
      createdByUuid: MANAGER_USER.uuid,
      isRequired: true,
      unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENT_16.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_0.uuid,
      fieldTypeUuid: FIELD_TYPE_2.uuid,
      handbookUuid: MANAGER_HANDBOOK.uuid,
    },
  });

  const FIELD_OF_CATEGORY_MATERIAL_11 = await prisma?.fieldOfCategoryMaterial?.create({
    data: {
      name: 'Марка листового материала',
      comment: 'Марка листового материала (список)',
      createdByUuid: MANAGER_USER.uuid,
      isRequired: true,
      unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENT_16.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_0.uuid,
      fieldTypeUuid: FIELD_TYPE_2.uuid,
      handbookUuid: MANAGER_HANDBOOK.uuid,
    },
  });

  const FIELD_OF_CATEGORY_MATERIAL_12 = await prisma?.fieldOfCategoryMaterial?.create({
    data: {
      name: 'ГОСТ листового материала',
      comment: 'ГОСТ листового материала (ТУ или без требований) (список)',
      createdByUuid: MANAGER_USER.uuid,
      isRequired: false,
      unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENT_16.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_0.uuid,
      fieldTypeUuid: FIELD_TYPE_2.uuid,
      handbookUuid: MANAGER_HANDBOOK.uuid,
    },
  });

  const FIELD_OF_CATEGORY_MATERIAL_13 = await prisma?.fieldOfCategoryMaterial?.create({
    data: {
      name: 'Вид шины',
      comment: 'Вид шины (список)',
      createdByUuid: MANAGER_USER.uuid,
      isRequired: false,
      unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENT_16.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_8.uuid,
      fieldTypeUuid: FIELD_TYPE_2.uuid,
      handbookUuid: MANAGER_HANDBOOK.uuid,
    },
  });

  const UPDATED_FIELD_OF_CATEGORY_MATERIAL_0 = await prisma?.fieldOfCategoryMaterial?.update({
    where: {
      uuid: FIELD_OF_CATEGORY_MATERIAL_0.uuid,
    },
    data: {
      uniqueNameForTemplate: `{{#${regexUniqueNameForTemplateFieldOfCategoryMaterialGenerator(FIELD_OF_CATEGORY_MATERIAL_0.name)}_${FIELD_OF_CATEGORY_MATERIAL_0.uuid}_${CATEGORY_MATERIAL_3.uuid}}}`,
    },
  });

  const UPDATED_FIELD_OF_CATEGORY_MATERIAL_1 = await prisma?.fieldOfCategoryMaterial?.update({
    where: {
      uuid: FIELD_OF_CATEGORY_MATERIAL_1.uuid,
    },
    data: {
      uniqueNameForTemplate: `{{#$${regexUniqueNameForTemplateFieldOfCategoryMaterialGenerator(FIELD_OF_CATEGORY_MATERIAL_1.name)}_${FIELD_OF_CATEGORY_MATERIAL_1.uuid}_${CATEGORY_MATERIAL_3.uuid}}}`,
    },
  });

  const UPDATED_FIELD_OF_CATEGORY_MATERIAL_2 = await prisma?.fieldOfCategoryMaterial?.update({
    where: {
      uuid: FIELD_OF_CATEGORY_MATERIAL_2.uuid,
    },
    data: {
      uniqueNameForTemplate: `{{#${regexUniqueNameForTemplateFieldOfCategoryMaterialGenerator(FIELD_OF_CATEGORY_MATERIAL_2.name)}_${FIELD_OF_CATEGORY_MATERIAL_2.uuid}_${CATEGORY_MATERIAL_3.uuid}}}`,
    },
  });

  const UPDATED_FIELD_OF_CATEGORY_MATERIAL_3 = await prisma?.fieldOfCategoryMaterial?.update({
    where: {
      uuid: FIELD_OF_CATEGORY_MATERIAL_3.uuid,
    },
    data: {
      uniqueNameForTemplate: `{{#${regexUniqueNameForTemplateFieldOfCategoryMaterialGenerator(FIELD_OF_CATEGORY_MATERIAL_3.name)}_${CATEGORY_MATERIAL_0.uuid}_}}`,
    },
  });

  const UPDATED_FIELD_OF_CATEGORY_MATERIAL_4 = await prisma?.fieldOfCategoryMaterial?.update({
    where: {
      uuid: FIELD_OF_CATEGORY_MATERIAL_4.uuid,
    },
    data: {
      uniqueNameForTemplate: `{{#${regexUniqueNameForTemplateFieldOfCategoryMaterialGenerator(FIELD_OF_CATEGORY_MATERIAL_4.name)}_${CATEGORY_MATERIAL_0.uuid}}}`,
    },
  });

  const UPDATED_FIELD_OF_CATEGORY_MATERIAL_5 = await prisma?.fieldOfCategoryMaterial?.update({
    where: {
      uuid: FIELD_OF_CATEGORY_MATERIAL_5.uuid,
    },
    data: {
      uniqueNameForTemplate: `{{#${regexUniqueNameForTemplateFieldOfCategoryMaterialGenerator(FIELD_OF_CATEGORY_MATERIAL_5.name)}_${CATEGORY_MATERIAL_0.uuid}}}`,
    },
  });

  const UPDATED_FIELD_OF_CATEGORY_MATERIAL_6 = await prisma?.fieldOfCategoryMaterial?.update({
    where: {
      uuid: FIELD_OF_CATEGORY_MATERIAL_6.uuid,
    },
    data: {
      uniqueNameForTemplate: `{{#${regexUniqueNameForTemplateFieldOfCategoryMaterialGenerator(FIELD_OF_CATEGORY_MATERIAL_6.name)}_${CATEGORY_MATERIAL_0.uuid}}}`,
    },
  });

  const UPDATED_FIELD_OF_CATEGORY_MATERIAL_7 = await prisma?.fieldOfCategoryMaterial?.update({
    where: {
      uuid: FIELD_OF_CATEGORY_MATERIAL_7.uuid,
    },
    data: {
      uniqueNameForTemplate: `{{#${regexUniqueNameForTemplateFieldOfCategoryMaterialGenerator(FIELD_OF_CATEGORY_MATERIAL_7.name)}_${CATEGORY_MATERIAL_0.uuid}}}`,
    },
  });

  const UPDATED_FIELD_OF_CATEGORY_MATERIAL_8 = await prisma?.fieldOfCategoryMaterial?.update({
    where: {
      uuid: FIELD_OF_CATEGORY_MATERIAL_8.uuid,
    },
    data: {
      uniqueNameForTemplate: `{{#${regexUniqueNameForTemplateFieldOfCategoryMaterialGenerator(FIELD_OF_CATEGORY_MATERIAL_8.name)}_${CATEGORY_MATERIAL_0.uuid}}}`,
    },
  });

  const UPDATED_FIELD_OF_CATEGORY_MATERIAL_9 = await prisma?.fieldOfCategoryMaterial?.update({
    where: {
      uuid: FIELD_OF_CATEGORY_MATERIAL_9.uuid,
    },
    data: {
      uniqueNameForTemplate: `{{#${regexUniqueNameForTemplateFieldOfCategoryMaterialGenerator(FIELD_OF_CATEGORY_MATERIAL_9.name)}_${CATEGORY_MATERIAL_0.uuid}}}`,
    },
  });

  const UPDATED_FIELD_OF_CATEGORY_MATERIAL_10 = await prisma?.fieldOfCategoryMaterial?.update({
    where: {
      uuid: FIELD_OF_CATEGORY_MATERIAL_10.uuid,
    },
    data: {
      uniqueNameForTemplate: `{{#${regexUniqueNameForTemplateFieldOfCategoryMaterialGenerator(FIELD_OF_CATEGORY_MATERIAL_10.name)}_${CATEGORY_MATERIAL_0}}}`,
    },
  });

  const UPDATED_FIELD_OF_CATEGORY_MATERIAL_11 = await prisma?.fieldOfCategoryMaterial?.update({
    where: {
      uuid: FIELD_OF_CATEGORY_MATERIAL_11.uuid,
    },
    data: {
      uniqueNameForTemplate: `{{#${regexUniqueNameForTemplateFieldOfCategoryMaterialGenerator(FIELD_OF_CATEGORY_MATERIAL_11.name)}_${CATEGORY_MATERIAL_8}}}`,
    },
  });

  const CATEGORY_MATERIAL_COVER_UPDATED = await prisma?.categoryMaterial?.update({
    where: {
      uuid: CATEGORY_MATERIAL_0.uuid,
    },
    data: {
      templateName: `${FIELD_OF_CATEGORY_MATERIAL_3.uniqueNameForTemplate} ${FIELD_OF_CATEGORY_MATERIAL_4.uniqueNameForTemplate} ${FIELD_OF_CATEGORY_MATERIAL_9.uniqueNameForTemplate} ${FIELD_OF_CATEGORY_MATERIAL_5.uniqueNameForTemplate}×${FIELD_OF_CATEGORY_MATERIAL_6.uniqueNameForTemplate}×${FIELD_OF_CATEGORY_MATERIAL_7.uniqueNameForTemplate} ${FIELD_OF_CATEGORY_MATERIAL_8.uniqueNameForTemplate}`,
    },
  });

  const CATEGORY_MATERIAL_HARDWARE_UPDATED = await prisma?.categoryMaterial?.update({
    where: {
      uuid: CATEGORY_MATERIAL_3.uuid,
    },
    data: {
      templateName: `${FIELD_OF_CATEGORY_MATERIAL_2?.uniqueNameForTemplate} ${FIELD_OF_CATEGORY_MATERIAL_0?.uniqueNameForTemplate}×${FIELD_OF_CATEGORY_MATERIAL_1?.uniqueNameForTemplate}`,
    },
  });

  const FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_0 = await prisma?.fieldVariantsForSelectorFieldType?.create({
    data: {
      value: 'Саморез',
      description: 'Саморез (метизы), подтип',
      handbookUuid: MANAGER_HANDBOOK.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_2.uuid,
    },
  });

  const FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_1 = await prisma?.fieldVariantsForSelectorFieldType?.create({
    data: {
      value: 'Шуруп',
      description: 'Шуруп (метизы), подтип',
      handbookUuid: MANAGER_HANDBOOK.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_2.uuid,
    },
  });

  const FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_2 = await prisma?.fieldVariantsForSelectorFieldType?.create({
    data: {
      value: 'Винт',
      description: 'Винт (метизы), подтип',
      handbookUuid: MANAGER_HANDBOOK.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_2.uuid,
    },
  });

  const FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_3 = await prisma?.fieldVariantsForSelectorFieldType?.create({
    data: {
      value: 'Болт сантехнический',
      description: 'Болт сантехнический (метизы), подтип',
      handbookUuid: MANAGER_HANDBOOK.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_2.uuid,
    },
  });

  const FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_4 = await prisma?.fieldVariantsForSelectorFieldType?.create({
    data: {
      value: 'Фанера',
      description: 'Фанера (листовые, подтип)',
      handbookUuid: MANAGER_HANDBOOK.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_3.uuid,
    },
  });

  const FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_5 = await prisma?.fieldVariantsForSelectorFieldType?.create({
    data: {
      value: 'OSB',
      description: 'OSB (листовые, подтип)',
      handbookUuid: MANAGER_HANDBOOK.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_3.uuid,
    },
  });

  const FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_6 = await prisma?.fieldVariantsForSelectorFieldType?.create({
    data: {
      value: 'Хвойная',
      description: 'Хвойная (листовые, материал)',
      handbookUuid: MANAGER_HANDBOOK.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_3.uuid,
    },
  });

  const FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_7 = await prisma?.fieldVariantsForSelectorFieldType?.create({
    data: {
      value: 'Берёзовая',
      description: 'Берёзовая (листовые, материал)',
      handbookUuid: MANAGER_HANDBOOK.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_3.uuid,
    },
  });

  const FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_8 = await prisma?.fieldVariantsForSelectorFieldType?.create({
    data: {
      value: '4/4',
      description: '4/4 (листовые, сорт)',
      handbookUuid: MANAGER_HANDBOOK.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_8.uuid,
    },
  });

  const FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_9 = await prisma?.fieldVariantsForSelectorFieldType?.create({
    data: {
      value: '3/4',
      description: '3/4 (листовые, сорт)',
      handbookUuid: MANAGER_HANDBOOK.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_8.uuid,
    },
  });

  const FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_10 = await prisma?.fieldVariantsForSelectorFieldType?.create({
    data: {
      value: '3/3',
      description: '3/3 (листовые, сорт)',
      handbookUuid: MANAGER_HANDBOOK.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_8.uuid,
    },
  });

  const FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_11 = await prisma?.fieldVariantsForSelectorFieldType?.create({
    data: {
      value: '2ш/3',
      description: '2ш/3 (листовые, сорт)',
      handbookUuid: MANAGER_HANDBOOK.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_8.uuid,
    },
  });

  const FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_12 = await prisma?.fieldVariantsForSelectorFieldType?.create({
    data: {
      value: 'ФК',
      description: 'ФК (листовые, марка)',
      handbookUuid: MANAGER_HANDBOOK.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_8.uuid,
    },
  });

  const FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_13 = await prisma?.fieldVariantsForSelectorFieldType?.create({
    data: {
      value: 'ФСФ',
      description: 'ФСФ (листовые, марка)',
      handbookUuid: MANAGER_HANDBOOK.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_8.uuid,
    },
  });

  const FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_14 = await prisma?.fieldVariantsForSelectorFieldType?.create({
    data: {
      value: 'ЛАК',
      description: 'ЛАК (листовые, марка)',
      handbookUuid: MANAGER_HANDBOOK.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_8.uuid,
    },
  });

  const FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_15 = await prisma?.fieldVariantsForSelectorFieldType?.create({
    data: {
      value: 'ГОСТ',
      description: 'ГОСТ (листовые, ГОСТ)',
      handbookUuid: MANAGER_HANDBOOK.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_10.uuid,
    },
  });

  const FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_16 = await prisma?.fieldVariantsForSelectorFieldType?.create({
    data: {
      value: 'ТУ',
      description: 'ТУ (листовые, ГОСТ)',
      handbookUuid: MANAGER_HANDBOOK.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_10.uuid,
    },
  });

  const FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_17 = await prisma?.fieldVariantsForSelectorFieldType?.create({
    data: {
      value: 'Зимняя',
      description: 'Зимняя (шины, вид)',
      handbookUuid: MANAGER_HANDBOOK.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_11.uuid,
    },
  });

  const FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_18 = await prisma?.fieldVariantsForSelectorFieldType?.create({
    data: {
      value: 'Летняя',
      description: 'Летняя (шины, вид)',
      handbookUuid: MANAGER_HANDBOOK.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_11.uuid,
    },
  });

  const MATERIAL_0 = await prisma?.material?.create({
    data: {
      name: 'Саморез 6×70 (черновик)',
      comment: 'Это те винты, которыми мы крепим доски обвязки к фундаменту',
      price: 4.13,
      namePublic: 'Глухарь',
      handbookUuid: MANAGER_HANDBOOK.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_3.uuid,
      unitMeasurementUuid: FIELD_UNIT_MEASUREMENT_10.uuid,
      responsiblePartnerUuid: RESPONSIBLE_PARTNER_PRODUCER_1.uuid,
    },
  });

  const MATERIAL_1 = await prisma?.material?.create({
    data: {
      name: 'Фанера Берёзовая ФСФ 18×1220×2440 4/4 (черновик)',
      comment: 'Это ...',
      price: 1770,
      namePublic: 'Фанера стандартная',
      handbookUuid: MANAGER_HANDBOOK.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_0.uuid,
      unitMeasurementUuid: FIELD_UNIT_MEASUREMENT_12.uuid,
      responsiblePartnerUuid: RESPONSIBLE_PARTNER_PRODUCER_2.uuid,
    },
  });

  const MATERIAL_2 = await prisma?.material?.create({
    data: {
      name: 'Болт сантехнический 10×70 (черновик)',
      comment: 'Это ...',
      price: 0.83,
      namePublic: 'Болт обычный',
      handbookUuid: MANAGER_HANDBOOK.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_3.uuid,
      unitMeasurementUuid: FIELD_UNIT_MEASUREMENT_10.uuid,
      responsiblePartnerUuid: RESPONSIBLE_PARTNER_PRODUCER_0.uuid,
    },
  });

  // FIXME при создании материала нужно проверять - а заполнил ли пользователь все обязательные поля
  // для конкретной категории, к которой принадлежит материал. То есть отношение каткгория материала - поля материала
  // и характеристики материала - поле категории материала

  const CHARACTERISTICS_MATERIAL_OF_GLUHAR_0 = await prisma?.characteristicsMaterial?.create({
    data: {
      name: FIELD_OF_CATEGORY_MATERIAL_0.name,
      materialUuid: MATERIAL_0.uuid,
      value: '6',
      comment: 'там нестабильный диаметр, надо проверять',
      handbookUuid: MANAGER_HANDBOOK.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_0.uuid,
      fieldTypeUuid: FIELD_OF_CATEGORY_MATERIAL_0.fieldTypeUuid,
      categoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_0.categoryMaterialUuid,
      addedByUserUuid: MANAGER_USER.uuid,
      fieldUnitMeasurementUuid: FIELD_OF_CATEGORY_MATERIAL_0.unitOfMeasurementUuid,
    },
  });

  const CHARACTERISTICS_MATERIAL_OF_GLUHAR_1 = await prisma?.characteristicsMaterial?.create({
    data: {
      name: FIELD_OF_CATEGORY_MATERIAL_1.name,
      materialUuid: MATERIAL_0.uuid,
      value: '30',
      comment: 'no comments',
      handbookUuid: MANAGER_HANDBOOK.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_1.uuid,
      fieldTypeUuid: FIELD_OF_CATEGORY_MATERIAL_1.fieldTypeUuid,
      categoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_1.categoryMaterialUuid,
      addedByUserUuid: MANAGER_USER.uuid,
      fieldUnitMeasurementUuid: FIELD_OF_CATEGORY_MATERIAL_1.unitOfMeasurementUuid,
    },
  });

  const CHARACTERISTICS_MATERIAL_OF_GLUHAR_2 = await prisma?.characteristicsMaterial?.create({
    data: {
      name: FIELD_OF_CATEGORY_MATERIAL_2.name,
      materialUuid: MATERIAL_0.uuid,
      value: FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_0.value,
      handbookUuid: MANAGER_HANDBOOK.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_2.uuid,
      fieldTypeUuid: FIELD_OF_CATEGORY_MATERIAL_2.fieldTypeUuid,
      categoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_2.categoryMaterialUuid,
      addedByUserUuid: MANAGER_USER.uuid,
      fieldUnitMeasurementUuid: FIELD_OF_CATEGORY_MATERIAL_2.unitOfMeasurementUuid,
    },
  });

  const CHARACTERISTICS_MATERIAL_OF_BOLT_0 = await prisma?.characteristicsMaterial?.create({
    data: {
      name: FIELD_OF_CATEGORY_MATERIAL_0.name,
      materialUuid: MATERIAL_2.uuid,
      value: '10',
      handbookUuid: MANAGER_HANDBOOK.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_0.uuid,
      fieldTypeUuid: FIELD_OF_CATEGORY_MATERIAL_0.fieldTypeUuid,
      categoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_0.categoryMaterialUuid,
      addedByUserUuid: MANAGER_USER.uuid,
      fieldUnitMeasurementUuid: FIELD_OF_CATEGORY_MATERIAL_0.unitOfMeasurementUuid,
    },
  });

  const CHARACTERISTICS_MATERIAL_OF_BOLT_1 = await prisma?.characteristicsMaterial?.create({
    data: {
      name: FIELD_OF_CATEGORY_MATERIAL_1.name,
      materialUuid: MATERIAL_2.uuid,
      value: '70',
      handbookUuid: MANAGER_HANDBOOK.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_1.uuid,
      fieldTypeUuid: FIELD_OF_CATEGORY_MATERIAL_1.fieldTypeUuid,
      categoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_1.categoryMaterialUuid,
      addedByUserUuid: MANAGER_USER.uuid,
      fieldUnitMeasurementUuid: FIELD_OF_CATEGORY_MATERIAL_1.unitOfMeasurementUuid,
    },
  });

  const CHARACTERISTICS_MATERIAL_OF_BOLT_2 = await prisma?.characteristicsMaterial?.create({
    data: {
      name: FIELD_OF_CATEGORY_MATERIAL_2.name,
      materialUuid: MATERIAL_2.uuid,
      value: FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_3.value,
      handbookUuid: MANAGER_HANDBOOK.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_2.uuid,
      fieldTypeUuid: FIELD_OF_CATEGORY_MATERIAL_2.fieldTypeUuid,
      categoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_2.categoryMaterialUuid,
      addedByUserUuid: MANAGER_USER.uuid,
      fieldUnitMeasurementUuid: FIELD_OF_CATEGORY_MATERIAL_2.unitOfMeasurementUuid,
    },
  });

  const CHARACTERISTICS_MATERIAL_OF_FANERA_0 = await prisma?.characteristicsMaterial?.create({
    data: {
      name: FIELD_OF_CATEGORY_MATERIAL_3.name,
      materialUuid: MATERIAL_1.uuid,
      value: FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_4.value,
      handbookUuid: MANAGER_HANDBOOK.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_3.uuid,
      fieldTypeUuid: FIELD_OF_CATEGORY_MATERIAL_3.fieldTypeUuid,
      categoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_3.categoryMaterialUuid,
      addedByUserUuid: MANAGER_USER.uuid,
      fieldUnitMeasurementUuid: FIELD_OF_CATEGORY_MATERIAL_3.unitOfMeasurementUuid,
    },
  });

  const CHARACTERISTICS_MATERIAL_OF_FANERA_1 = await prisma?.characteristicsMaterial?.create({
    data: {
      name: FIELD_OF_CATEGORY_MATERIAL_3.name,
      materialUuid: MATERIAL_1.uuid,
      value: FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_4.value,
      handbookUuid: MANAGER_HANDBOOK.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_3.uuid,
      fieldTypeUuid: FIELD_OF_CATEGORY_MATERIAL_3.fieldTypeUuid,
      categoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_3.categoryMaterialUuid,
      addedByUserUuid: MANAGER_USER.uuid,
      fieldUnitMeasurementUuid: FIELD_OF_CATEGORY_MATERIAL_3.unitOfMeasurementUuid,
    },
  });

  const CHARACTERISTICS_MATERIAL_OF_FANERA_2 = await prisma?.characteristicsMaterial?.create({
    data: {
      name: FIELD_OF_CATEGORY_MATERIAL_4.name,
      materialUuid: MATERIAL_1.uuid,
      value: FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_7.value,
      handbookUuid: MANAGER_HANDBOOK.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_1.uuid,
      fieldTypeUuid: FIELD_OF_CATEGORY_MATERIAL_1.fieldTypeUuid,
      categoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_1.categoryMaterialUuid,
      addedByUserUuid: MANAGER_USER.uuid,
      fieldUnitMeasurementUuid: FIELD_OF_CATEGORY_MATERIAL_1.unitOfMeasurementUuid,
    },
  });

  const CHARACTERISTICS_MATERIAL_OF_FANERA_3 = await prisma?.characteristicsMaterial?.create({
    data: {
      name: FIELD_OF_CATEGORY_MATERIAL_5.name,
      materialUuid: MATERIAL_1.uuid,
      value: '18',
      handbookUuid: MANAGER_HANDBOOK.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_5.uuid,
      fieldTypeUuid: FIELD_OF_CATEGORY_MATERIAL_5.fieldTypeUuid,
      categoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_5.categoryMaterialUuid,
      addedByUserUuid: MANAGER_USER.uuid,
      fieldUnitMeasurementUuid: FIELD_OF_CATEGORY_MATERIAL_5.unitOfMeasurementUuid,
    },
  });

  const CHARACTERISTICS_MATERIAL_OF_FANERA_4 = await prisma?.characteristicsMaterial?.create({
    data: {
      name: FIELD_OF_CATEGORY_MATERIAL_6.name,
      materialUuid: MATERIAL_1.uuid,
      value: '1220',
      handbookUuid: MANAGER_HANDBOOK.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_6.uuid,
      fieldTypeUuid: FIELD_OF_CATEGORY_MATERIAL_6.fieldTypeUuid,
      categoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_6.categoryMaterialUuid,
      addedByUserUuid: MANAGER_USER.uuid,
      fieldUnitMeasurementUuid: FIELD_OF_CATEGORY_MATERIAL_6.unitOfMeasurementUuid,
    },
  });

  const CHARACTERISTICS_MATERIAL_OF_FANERA_5 = await prisma?.characteristicsMaterial?.create({
    data: {
      name: FIELD_OF_CATEGORY_MATERIAL_7.name,
      materialUuid: MATERIAL_1.uuid,
      value: '2440',
      handbookUuid: MANAGER_HANDBOOK.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_7.uuid,
      fieldTypeUuid: FIELD_OF_CATEGORY_MATERIAL_7.fieldTypeUuid,
      categoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_7.categoryMaterialUuid,
      addedByUserUuid: MANAGER_USER.uuid,
      fieldUnitMeasurementUuid: FIELD_OF_CATEGORY_MATERIAL_7.unitOfMeasurementUuid,
    },
  });

  const CHARACTERISTICS_MATERIAL_OF_FANERA_6 = await prisma?.characteristicsMaterial?.create({
    data: {
      name: FIELD_OF_CATEGORY_MATERIAL_8.name,
      materialUuid: MATERIAL_1.uuid,
      value: FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_8.value,
      handbookUuid: MANAGER_HANDBOOK.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_8.uuid,
      fieldTypeUuid: FIELD_OF_CATEGORY_MATERIAL_8.fieldTypeUuid,
      categoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_8.categoryMaterialUuid,
      addedByUserUuid: MANAGER_USER.uuid,
      fieldUnitMeasurementUuid: FIELD_OF_CATEGORY_MATERIAL_8.unitOfMeasurementUuid,
    },
  });

  const CHARACTERISTICS_MATERIAL_OF_FANERA_7 = await prisma?.characteristicsMaterial?.create({
    data: {
      name: FIELD_OF_CATEGORY_MATERIAL_9.name,
      materialUuid: MATERIAL_1.uuid,
      value: FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_13.value,
      handbookUuid: MANAGER_HANDBOOK.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_9.uuid,
      fieldTypeUuid: FIELD_OF_CATEGORY_MATERIAL_9.fieldTypeUuid,
      categoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_9.categoryMaterialUuid,
      addedByUserUuid: MANAGER_USER.uuid,
      fieldUnitMeasurementUuid: FIELD_OF_CATEGORY_MATERIAL_9.unitOfMeasurementUuid,
    },
  });

  const CHARACTERISTICS_MATERIAL_OF_FANERA_8 = await prisma?.characteristicsMaterial?.create({
    data: {
      name: FIELD_OF_CATEGORY_MATERIAL_9.name,
      materialUuid: MATERIAL_1.uuid,
      value: FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_13.value,
      handbookUuid: MANAGER_HANDBOOK.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_9.uuid,
      fieldTypeUuid: FIELD_OF_CATEGORY_MATERIAL_9.fieldTypeUuid,
      categoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_9.categoryMaterialUuid,
      addedByUserUuid: MANAGER_USER.uuid,
      fieldUnitMeasurementUuid: FIELD_OF_CATEGORY_MATERIAL_9.unitOfMeasurementUuid,
    },
  });

  async function templateNameMapper(
    categoryMaterial: {
      uuid: string;
      name: string;
      comment?: string;
      templateName?: string;
      globalCategoryMaterialUuid: string;
      createdAt: Date;
      updatedAt: Date;
    },
    material: {
      uuid: string;
      name: string;
      comment?: string;
      namePublic?: string;
      sourceInfo?: string;
      handbookUuid: string;
      price: number;
      unitMeasurementUuid: string;
      categoryMaterialUuid: string;
      responsiblePartnerUuid: string;
      createdAt: Date;
      updatedAt: Date;
    },
  ) {
    const allFieldsOfConcreteMaterial = await prisma?.fieldOfCategoryMaterial?.findMany({
      where: {
        categoryMaterialUuid: categoryMaterial.uuid,
      },
    });

    const allCharacteristicsOfConcreteMaterial = await prisma?.characteristicsMaterial?.findMany({
      where: {
        materialUuid: material.uuid,
      },
    });

    const mapAllCharacteristicsOfConcreteMaterial = allCharacteristicsOfConcreteMaterial.reduce((acc, curValue) => {
      acc[curValue.fieldOfCategoryMaterialUuid] = curValue.value;
      return acc;
    }, {});

    const allFieldsOfMaterialUuids = allFieldsOfConcreteMaterial.map(elem => {
      return elem.uuid;
    });

    // `{{#подтип-метиза_0a23cdfdsfsdff45f45f45f4_0a23cdfdsfsdff45f45f45f4}}}` `{{длина-метиза_0a23cdfdsfsdff45f45f45f4_0a23cdfdsfsdff45f45f45f4}}`×`{{#диаметр-метиза_0a23cdfdsfsdff45f45f45f4_0a23cdfdsfsdff45f45f45f4}}`
    const templateNameOfCategory = categoryMaterial.templateName;

    function templateNameOfCategoryHandler(mapAllFields: string[]) {
      mapAllFields.forEach(elem => {
        if (elem in mapAllCharacteristicsOfConcreteMaterial) {
          templateNameOfCategory.replace(templateNameMaterialGenerator(elem), mapAllCharacteristicsOfConcreteMaterial[elem]);
        }
      });
      return templateNameOfCategory;
    }

    return templateNameOfCategoryHandler(allFieldsOfMaterialUuids);
  }

  //FIXME - проверить внимательно работу этой функции
  const newNameGluhar = await templateNameMapper(CATEGORY_MATERIAL_HARDWARE_UPDATED, MATERIAL_0);

  const UPDATED_MATERIAL_GLUHAR = await prisma?.material?.update({
    where: {
      uuid: MATERIAL_0.uuid,
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
