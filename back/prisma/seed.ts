/* eslint-disable @typescript-eslint/no-unused-vars */

import * as crypto from 'crypto';
import * as argon2 from 'argon2';
import { PrismaClient } from '.prisma/client';
import { templateNameMapper } from '../src/common/helpers/handlers/template-name-mapper.handler';
import { EApproveStatuses } from '@prisma/client';
import { fieldOfCategoryMaterialTemplateGenerator } from '../src/common/helpers/regex/fieldOfCategoryMaterialTemplateGenerator';

const prisma = new PrismaClient();

async function main() {
  // Проверяем, были ли данные уже засеяны
  const existingWorkspace = await prisma.workspace.findFirst();
  if (existingWorkspace) {
    console.log('[seed] Данные уже засеяны, пропускаем повторный запуск.');
    return;
  }

  // Пароль для сидовых пользователей: берём из env или генерируем случайный (никому не известный).
  // Не падаем без env-переменной, чтобы не блокировать старт контейнера при идемпотентном повторном запуске seed.
  const envSeedPassword = process.env.SEED_DEFAULT_PASSWORD;
  const seedPassword =
    envSeedPassword && envSeedPassword.length >= 8
      ? envSeedPassword
      : crypto.randomBytes(24).toString('base64url');

  if (!envSeedPassword) {
    // eslint-disable-next-line no-console
    console.warn(
      '[seed] SEED_DEFAULT_PASSWORD не задан — сгенерирован случайный одноразовый пароль. Сидовые пользователи, если будут созданы, не получат известного пароля.',
    );
  }
  const SEED_PASSWORD_HASH = await argon2.hash(seedPassword);
  //DOC ROLES - создаем все роли
  //region ROLES
  const ADMIN_ROLE = await prisma?.role?.upsert({
    where: { name: 'ADMIN' },
    create: {
      name: 'ADMIN',
      description: 'Админ всего ПО (приложения)',
    },
    update: {},
  });

  const MANAGER_ROLE = await prisma?.role?.upsert({
    where: { name: 'MANAGER' },
    create: {
      name: 'MANAGER',
      description: 'Менеджер проекта, руководитель организации',
    },
    update: {},
  });

  const WORKER_ROLE = await prisma?.role?.upsert({
    where: { name: 'WORKER' },
    create: {
      name: 'WORKER',
      description: 'Сотрудник организации',
    },
    update: {},
  });

  const CUSTOMER_ROLE = await prisma?.role?.upsert({
    where: { name: 'CUSTOMER' },
    create: {
      name: 'CUSTOMER',
      description: 'Заказчик, покупатель',
    },
    update: {},
  });
  //endregion

  //DOC USERS - создаем всех пользователей кроме менеджера
  //region USERS
  const ADMIN_USER = await prisma?.user?.upsert({
    where: { email: 'admin1@mail.ru' },
    create: {
      email: 'admin1@mail.ru',
      password: SEED_PASSWORD_HASH,
      roles: {
        connect: [{ uuid: ADMIN_ROLE.uuid }],
      },
      firstName: 'Admin1',
      secondName: 'Starter1',
      phone: '+79999999911',
      info: 'Standard information',
    },
    update: {},
  });

  const WORKER_USER_1 = await prisma?.user?.upsert({
    where: { email: 'worker1@mail.ru' },
    create: {
      email: 'worker1@mail.ru',
      password: SEED_PASSWORD_HASH,
      roles: {
        connect: [{ uuid: WORKER_ROLE.uuid }],
      },
      firstName: 'Worker1',
      secondName: 'Starter1',
      phone: '+79999999931',
      info: 'Standard information',
    },
    update: {},
  });

  const WORKER_USER_2 = await prisma?.user?.upsert({
    where: { email: 'worker2@mail.ru' },
    create: {
      email: 'worker2@mail.ru',
      password: SEED_PASSWORD_HASH,
      roles: {
        connect: [{ uuid: WORKER_ROLE.uuid }],
      },
      firstName: 'Worker2',
      secondName: 'Starter2',
      phone: '+79999999932',
      info: 'Standard information',
    },
    update: {},
  });

  const WORKER_USER_3 = await prisma?.user?.upsert({
    where: { email: 'worker3@mail.ru' },
    create: {
      email: 'worker3@mail.ru',
      password: SEED_PASSWORD_HASH,
      roles: {
        connect: [{ uuid: WORKER_ROLE.uuid }],
      },
      firstName: 'Worker3',
      secondName: 'Starter3',
      phone: '+79999999933',
      info: 'Standard information',
    },
    update: {},
  });

  const WORKER_USER_4 = await prisma?.user?.upsert({
    where: { email: 'worker4@mail.ru' },
    create: {
      email: 'worker4@mail.ru',
      password: SEED_PASSWORD_HASH,
      roles: {
        connect: [{ uuid: WORKER_ROLE.uuid }],
      },
      firstName: 'Worker4',
      secondName: 'Starter4',
      phone: '+79999999934',
      info: 'Standard information',
    },
    update: {},
  });

  const CUSTOMER_USER_1 = await prisma?.user?.upsert({
    where: { email: 'customer1@mail.ru' },
    create: {
      email: 'customer1@mail.ru',
      password: SEED_PASSWORD_HASH,
      roles: {
        connect: [{ uuid: CUSTOMER_ROLE.uuid }],
      },
      firstName: 'Customer1',
      secondName: 'Starter1',
      phone: '+79999999941',
      info: 'Standard information',
    },
    update: {},
  });

  const CUSTOMER_USER_2 = await prisma?.user?.upsert({
    where: { email: 'customer2@mail.ru' },
    create: {
      email: 'customer2@mail.ru',
      password: SEED_PASSWORD_HASH,
      roles: {
        connect: [{ uuid: CUSTOMER_ROLE.uuid }],
      },
      firstName: 'Customer2',
      secondName: 'Starter2',
      phone: '+79999999942',
      info: 'Standard information',
    },
    update: {},
  });

  const CUSTOMER_USER_3 = await prisma?.user?.upsert({
    where: { email: 'customer3@mail.ru' },
    create: {
      email: 'customer3@mail.ru',
      password: SEED_PASSWORD_HASH,
      roles: {
        connect: [{ uuid: CUSTOMER_ROLE.uuid }],
      },
      firstName: 'Customer4',
      secondName: 'Starter4',
      phone: '+79999999943',
      info: 'Standard information',
    },
    update: {},
  });

  const CUSTOMER_USER_4 = await prisma?.user?.upsert({
    where: { email: 'customer4@mail.ru' },
    create: {
      email: 'customer4@mail.ru',
      password: SEED_PASSWORD_HASH,
      roles: {
        connect: [{ uuid: CUSTOMER_ROLE.uuid }],
      },
      firstName: 'Customer4',
      secondName: 'Starter4',
      phone: '+79999999944',
      info: 'Standard information',
    },
    update: {},
  });

  const CUSTOMER_USER_5 = await prisma?.user?.upsert({
    where: { email: 'customer5@mail.ru' },
    create: {
      email: 'customer5@mail.ru',
      password: SEED_PASSWORD_HASH,
      roles: {
        connect: [{ uuid: CUSTOMER_ROLE.uuid }],
      },
      firstName: 'Customer5',
      secondName: 'Starter5',
      phone: '+79999999945',
      info: 'Standard information',
    },
    update: {},
  });
  //endregion

  //DOC MANAGER_USER_1 AND HIS INFRASTRUCTURE - создаем менеджера и для него - воркспейс, организацию и проект
  //region MANAGER_1 AND HIS INFRASTRUCTURE
  const MANAGER_USER_1 = await prisma?.user?.upsert({
    where: { email: 'manager1@mail.ru' },
    create: {
      email: 'manager1@mail.ru',
      password: SEED_PASSWORD_HASH,
      roles: {
        connect: [{ uuid: MANAGER_ROLE.uuid }],
      },
      firstName: 'Manager1',
      secondName: 'Starter1',
      phone: '+79999999921',
      info: 'Standard information',
    },
    update: {},
  });

  const MANAGER_WORKSPACE_1 = await prisma?.workspace?.create({
    data: {
      name: 'Admin House Workspace 1',
      description: 'Admin House Workspace 1 - SaaS для эффективного контроля и составления сметной документации',
      workspaceCreatorUuid: MANAGER_USER_1.uuid,
    },
  });

  const MANAGER_HANDBOOK_1 = await prisma?.handbook?.create({
    data: {
      name: 'Admin House Handbook 1',
      description: 'Admin House Handbook 1- справочник ресурсов для эффективного контроля и составления сметной документации',
      responsibleManagerUuid: MANAGER_USER_1.uuid,
      workspaceUuid: MANAGER_WORKSPACE_1.uuid,
    },
  });

  const MANAGER_ORGANIZATION_1_1 = await prisma?.organization?.create({
    data: {
      name: 'Admin House Organization_1_1',
      description: 'Admin House Organization_1_1 - организация, занимающаяся постройкой домов',
      workspaceUuid: MANAGER_WORKSPACE_1.uuid,
      organizationLeaderUuid: MANAGER_USER_1.uuid,
    },
  });

  const MANAGER_ORGANIZATION_1_2 = await prisma?.organization?.create({
    data: {
      name: 'Лучи Organization_1_2',
      description: 'Лучи_1_2 - IT-организация',
      workspaceUuid: MANAGER_WORKSPACE_1.uuid,
      organizationLeaderUuid: MANAGER_USER_1.uuid,
    },
  });

  const MANAGER_ORGANIZATION_1_3 = await prisma?.organization?.create({
    data: {
      name: 'MANAGER_ORGANIZATION_1_3 Organization',
      description: 'MANAGER_ORGANIZATION_1_3 - IT-организация',
      workspaceUuid: MANAGER_WORKSPACE_1.uuid,
      organizationLeaderUuid: MANAGER_USER_1.uuid,
    },
  });

  const MANAGER_PROJECT_1_1_1 = await prisma?.project?.create({
    data: {
      name: 'Admin House Project - дом №1.1.1',
      description: 'Admin House Project - постройка частного дома 50м2 в Санкт-Петербурге',
      responsibleManagerUuid: MANAGER_USER_1.uuid,
      customerUuid: CUSTOMER_USER_1.uuid,
      customerMail: CUSTOMER_USER_1.email,
      organizationUuid: MANAGER_ORGANIZATION_1_1.uuid,
    },
  });

  const MANAGER_PROJECT_1_1_2 = await prisma?.project?.create({
    data: {
      name: 'Admin House Project - дом №1.1.2',
      description: 'Admin House Project - постройка частного дома 100м2 в Москве',
      responsibleManagerUuid: MANAGER_USER_1.uuid,
      customerUuid: CUSTOMER_USER_2.uuid,
      customerMail: CUSTOMER_USER_2.email,
      organizationUuid: MANAGER_ORGANIZATION_1_1.uuid,
    },
  });

  const MANAGER_PROJECT_1_2_1 = await prisma?.project?.create({
    data: {
      name: 'Лучи - дом №1.2.1',
      description: 'Лучи - постройка частного дома 190м2 в Митсбурге',
      responsibleManagerUuid: MANAGER_USER_1.uuid,
      customerUuid: CUSTOMER_USER_4.uuid,
      customerMail: CUSTOMER_USER_4.email,
      organizationUuid: MANAGER_ORGANIZATION_1_2.uuid,
    },
  });
  //endregion

  //DOC MANAGER_USER_2 AND HIS INFRASTRUCTURE - создаем менеджера и для него - воркспейс, организацию и проект
  //region MANAGER_2 AND HIS INFRASTRUCTURE
  const MANAGER_USER_2 = await prisma?.user?.create({
    data: {
      email: 'manager2@mail.ru',
      password: SEED_PASSWORD_HASH,
      roles: {
        connect: [{ uuid: MANAGER_ROLE.uuid }],
      },
      firstName: 'Manager2',
      secondName: 'Starter2',
      phone: '+79999999922',
      info: 'Standard information2',
    },
  });

  const MANAGER_WORKSPACE_2 = await prisma?.workspace?.create({
    data: {
      name: 'Admin House Workspace 2',
      description: 'Admin House Workspace 2 - SaaS для эффективного контроля и составления сметной документации',
      workspaceCreatorUuid: MANAGER_USER_2.uuid,
    },
  });

  const MANAGER_HANDBOOK_2 = await prisma?.handbook?.create({
    data: {
      name: 'Admin House Handbook 2',
      description: 'Admin House Handbook 2 - справочник ресурсов для эффективного контроля и составления сметной документации',
      responsibleManagerUuid: MANAGER_USER_2.uuid,
      workspaceUuid: MANAGER_WORKSPACE_2.uuid,
    },
  });

  const MANAGER_ORGANIZATION_2_1 = await prisma?.organization?.create({
    data: {
      name: 'ORGANIZATION_2_1',
      description: 'ORGANIZATION_2_1 - организация, занимающаяся постройкой домов',
      workspaceUuid: MANAGER_WORKSPACE_2.uuid,
      organizationLeaderUuid: MANAGER_USER_2.uuid,
    },
  });

  const MANAGER_ORGANIZATION_2_2 = await prisma?.organization?.create({
    data: {
      name: 'ORGANIZATION_2_2',
      description: 'ORGANIZATION_2_2 - IT-организация',
      workspaceUuid: MANAGER_WORKSPACE_2.uuid,
      organizationLeaderUuid: MANAGER_USER_2.uuid,
    },
  });

  const MANAGER_ORGANIZATION_2_3 = await prisma?.organization?.create({
    data: {
      name: 'ORGANIZATION_2_3',
      description: 'ORGANIZATION_2_3 - IT-организация',
      workspaceUuid: MANAGER_WORKSPACE_2.uuid,
      organizationLeaderUuid: MANAGER_USER_2.uuid,
    },
  });

  const MANAGER_PROJECT_2_1_1 = await prisma?.project?.create({
    data: {
      name: 'MANAGER_PROJECT_2_1_1 - дом №2.1',
      description: 'MANAGER_PROJECT_2_1_1 - постройка частного дома 50м2 в Санкт-Петербурге',
      responsibleManagerUuid: MANAGER_USER_2.uuid,
      customerUuid: CUSTOMER_USER_3.uuid,
      customerMail: CUSTOMER_USER_3.email,
      organizationUuid: MANAGER_ORGANIZATION_2_1.uuid,
    },
  });

  const MANAGER_PROJECT_2_2_1 = await prisma?.project?.create({
    data: {
      name: 'MANAGER_PROJECT_2_2_1 - дом №2.2',
      description: 'MANAGER_PROJECT_2_2_1 - постройка частного дома 100м2 в Москве',
      responsibleManagerUuid: MANAGER_USER_2.uuid,
      customerUuid: CUSTOMER_USER_3.uuid,
      customerMail: CUSTOMER_USER_3.email,
      organizationUuid: MANAGER_ORGANIZATION_2_1.uuid,
    },
  });

  const MANAGER_PROJECT_2_2_2 = await prisma?.project?.create({
    data: {
      name: 'MANAGER_PROJECT_2_2_2 - дом №2.3',
      description: 'MANAGER_PROJECT_2_2_2 - постройка частного дома 190м2 в Митсбурге',
      responsibleManagerUuid: MANAGER_USER_2.uuid,
      customerUuid: null,
      customerMail: null,
      organizationUuid: MANAGER_ORGANIZATION_2_2.uuid,
    },
  });

  const MANAGER_PROJECT_2_3_1 = await prisma?.project?.create({
    data: {
      name: 'MANAGER_PROJECT_2_3_1 - дом №2.3',
      description: 'MANAGER_PROJECT_2_3_1 - постройка частного дома 190м2 в Митсбурге',
      responsibleManagerUuid: MANAGER_USER_2.uuid,
      customerUuid: CUSTOMER_USER_5.uuid,
      customerMail: CUSTOMER_USER_5.email,
      organizationUuid: MANAGER_ORGANIZATION_2_3.uuid,
    },
  });
  //endregion

  //DOC UPDATED_MANAGER_WORKSPACE - обновляем WORKSPACE менеджера после создания HANDBOOK
  //region UPDATED_MANAGERS_WORKSPACE
  const UPDATED_MANAGER_WORKSPACE_1 = await prisma?.workspace?.update({
    where: {
      uuid: MANAGER_WORKSPACE_1.uuid,
    },
    data: {
      handbookOfWorkspaceUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const UPDATED_MANAGER_WORKSPACE_2 = await prisma?.workspace?.update({
    where: {
      uuid: MANAGER_WORKSPACE_2.uuid,
    },
    data: {
      handbookOfWorkspaceUuid: MANAGER_HANDBOOK_2.uuid,
    },
  });
  //endregion

  //DOC UPDATED_USERS - обновляем пользователей - добаяляем их в только что созданный WORKSPACE
  //region UPDATED_USERS
  const UPDATED_MANAGER_USER_1 = await prisma?.user?.update({
    where: {
      uuid: MANAGER_USER_1.uuid,
    },
    data: {
      creatorOfWorkspaceUuid: MANAGER_WORKSPACE_1.uuid,
      handbookManagerUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const UPDATED_WORKER_USER_1 = await prisma?.user?.update({
    where: {
      uuid: WORKER_USER_1.uuid,
    },
    data: {
      memberOfWorkspaces: {
        connect: [{ uuid: MANAGER_WORKSPACE_1.uuid }],
      },
      membersOfOrganizations: {
        connect: [
          { uuid: MANAGER_ORGANIZATION_1_1.uuid },
          { uuid: MANAGER_ORGANIZATION_1_2.uuid },
          { uuid: MANAGER_ORGANIZATION_1_3.uuid },
        ],
      },
      membersOfProjects: {
        connect: [{ uuid: MANAGER_PROJECT_1_1_1.uuid }],
      },
    },
  });

  const UPDATED_WORKER_USER_2 = await prisma?.user?.update({
    where: {
      uuid: WORKER_USER_2.uuid,
    },
    data: {
      memberOfWorkspaces: {
        connect: [{ uuid: MANAGER_WORKSPACE_2.uuid }],
      },
      membersOfOrganizations: {
        connect: [{ uuid: MANAGER_ORGANIZATION_2_1.uuid }],
      },
      membersOfProjects: {
        connect: [{ uuid: MANAGER_PROJECT_2_1_1.uuid }],
      },
    },
  });

  const UPDATED_WORKER_USER_3 = await prisma?.user?.update({
    where: {
      uuid: WORKER_USER_3.uuid,
    },
    data: {
      memberOfWorkspaces: {
        connect: [{ uuid: MANAGER_WORKSPACE_1.uuid }, { uuid: MANAGER_WORKSPACE_2.uuid }],
      },
      membersOfOrganizations: {
        connect: [
          { uuid: MANAGER_ORGANIZATION_1_1.uuid },
          { uuid: MANAGER_ORGANIZATION_2_1.uuid },
          { uuid: MANAGER_ORGANIZATION_2_2.uuid },
        ],
      },
      membersOfProjects: {
        connect: [
          { uuid: MANAGER_PROJECT_1_1_1.uuid },
          { uuid: MANAGER_PROJECT_1_1_2.uuid },
          { uuid: MANAGER_PROJECT_2_2_1.uuid },
          { uuid: MANAGER_PROJECT_2_2_2.uuid },
        ],
      },
    },
  });

  const UPDATED_WORKER_USER_4 = await prisma?.user?.update({
    where: {
      uuid: WORKER_USER_4.uuid,
    },
    data: {
      memberOfWorkspaces: {
        connect: [{ uuid: MANAGER_WORKSPACE_1.uuid }, { uuid: MANAGER_WORKSPACE_2.uuid }],
      },
      membersOfOrganizations: {
        connect: [
          { uuid: MANAGER_ORGANIZATION_1_1.uuid },
          { uuid: MANAGER_ORGANIZATION_1_2.uuid },
          { uuid: MANAGER_ORGANIZATION_2_2.uuid },
          { uuid: MANAGER_ORGANIZATION_2_3.uuid },
        ],
      },
      membersOfProjects: {
        connect: [{ uuid: MANAGER_PROJECT_1_1_2.uuid }, { uuid: MANAGER_PROJECT_1_2_1.uuid }, { uuid: MANAGER_PROJECT_2_2_2.uuid }],
      },
    },
  });

  const UPDATED_CUSTOMER_USER_1 = await prisma?.user?.update({
    where: {
      uuid: CUSTOMER_USER_1.uuid,
    },
    data: {
      memberOfWorkspaces: {
        connect: [{ uuid: MANAGER_WORKSPACE_1.uuid }],
      },
      membersOfOrganizations: {
        connect: [{ uuid: MANAGER_ORGANIZATION_1_1.uuid }, { uuid: MANAGER_ORGANIZATION_1_2.uuid }],
      },
      membersOfProjects: {
        connect: [{ uuid: MANAGER_PROJECT_1_1_1.uuid }],
      },
    },
  });

  const UPDATED_CUSTOMER_USER_2 = await prisma?.user?.update({
    where: {
      uuid: CUSTOMER_USER_2.uuid,
    },
    data: {
      memberOfWorkspaces: {
        connect: [{ uuid: MANAGER_WORKSPACE_1.uuid }],
      },
      membersOfOrganizations: {
        connect: [{ uuid: MANAGER_ORGANIZATION_1_1.uuid }],
      },
      membersOfProjects: {
        connect: [{ uuid: MANAGER_PROJECT_1_1_2.uuid }],
      },
    },
  });

  const UPDATED_CUSTOMER_USER_3 = await prisma?.user?.update({
    where: {
      uuid: CUSTOMER_USER_3.uuid,
    },
    data: {
      memberOfWorkspaces: {
        connect: [{ uuid: MANAGER_WORKSPACE_2.uuid }],
      },
      membersOfOrganizations: {
        connect: [{ uuid: MANAGER_ORGANIZATION_2_1.uuid }],
      },
      membersOfProjects: {
        connect: [{ uuid: MANAGER_PROJECT_2_1_1.uuid }, { uuid: MANAGER_PROJECT_2_2_1.uuid }],
      },
    },
  });

  const UPDATED_CUSTOMER_USER_4 = await prisma?.user?.update({
    where: {
      uuid: CUSTOMER_USER_4.uuid,
    },
    data: {
      memberOfWorkspaces: {
        connect: [{ uuid: MANAGER_WORKSPACE_1.uuid }, { uuid: MANAGER_WORKSPACE_2.uuid }],
      },
      membersOfOrganizations: {
        connect: [
          { uuid: MANAGER_ORGANIZATION_1_2.uuid },
          { uuid: MANAGER_ORGANIZATION_2_1.uuid },
          { uuid: MANAGER_ORGANIZATION_2_2.uuid },
        ],
      },
      membersOfProjects: {
        connect: [{ uuid: MANAGER_PROJECT_1_2_1.uuid }],
      },
    },
  });

  const UPDATED_CUSTOMER_USER_5 = await prisma?.user?.update({
    where: {
      uuid: CUSTOMER_USER_5.uuid,
    },
    data: {
      memberOfWorkspaces: {
        connect: [{ uuid: MANAGER_WORKSPACE_1.uuid }, { uuid: MANAGER_WORKSPACE_2.uuid }],
      },
      membersOfOrganizations: {
        connect: [{ uuid: MANAGER_ORGANIZATION_1_2.uuid }, { uuid: MANAGER_ORGANIZATION_2_3.uuid }],
      },
      membersOfProjects: {
        connect: [{ uuid: MANAGER_PROJECT_1_2_1.uuid }, { uuid: MANAGER_PROJECT_2_3_1.uuid }],
      },
    },
  });
  //endregion

  //DOC APP_SETTINGS - создаем глобальные настройки приложения
  //region APP_SETTINGS
  const APP_SETTINGS = await prisma?.appInfo?.create({
    data: {
      name: 'Admin House - SaaS для эффективного контроля и составления сметной документации',
      description: 'Настройки приложения Admin House',
      comment: 'Описание приложения Admin House',
      currency: 'RUB',
      status: 'UP',
      language: 'RUSSIAN',
    },
  });
  //endregion

  //DOC GLOBAL_CATEGORIES - создаем глобальные категории материалов
  //region GLOBAL_CATEGORIES
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
  //endregion

  //DOC REGISTER_WITH_ROLE_KEY - создаем ключ для регистрации пользователя с ролью
  //region REGISTER_WITH_ROLE_KEY
  const REGISTER_WITH_ROLE_KEY = await prisma?.registerWithRoleKey?.create({
    data: {
      key: process.env.STRICT_ADMIN_KEY,
    },
  });
  //endregion

  //DOC RESOURCE_STATUSES - создаем статусы ресурсов
  //region RESOURCE_STATUSES
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
  //endregion

  //DOC APPROVE_STATUSES - создаем единицы измерения
  //region APPROVE_STATUSES
  const APPROVE_STATUS_ONAPPROVAL = await prisma?.statusApprove?.create({
    data: {
      name: EApproveStatuses.ONAPPROVAL,
      nameRu: 'На согласовании',
      comment: 'На согласовании с заказчиком',
    },
  });

  const APPROVE_STATUS_REFUSUAL = await prisma?.statusApprove?.create({
    data: {
      name: EApproveStatuses.REFUSUAL,
      nameRu: 'Отказано',
      comment: 'Заказчик отказал в согласованиии сметы',
    },
  });

  const APPROVE_STATUS_AGREED = await prisma?.statusApprove?.create({
    data: {
      name: EApproveStatuses.AGREED,
      nameRu: 'Согласовано',
      comment: 'Заказчик одобрил смету',
    },
  });
  //endregion

  //DOC RESPONSIBLE_PARTNER_PRODUCERS - создаем поставщиков
  //region RESPONSIBLE_PARTNER_PRODUCERS
  const RESPONSIBLE_PARTNER_PRODUCER_1 = await prisma?.responsiblePartnerProducer?.create({
    data: {
      name: 'ООО Лучи',
      comment: 'Наша собственная дочерняя компания - ООО Лучи',
      numInOrder: 1,
      info: 'Не будем искать подрядчика на стороне',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      email: 'luchi@mail.ru',
      phone: '+79996054567',
    },
  });

  const RESPONSIBLE_PARTNER_PRODUCER_2 = await prisma?.responsiblePartnerProducer?.create({
    data: {
      name: 'ООО СВЕЗА',
      numInOrder: 2,
      comment: 'СВЕЗА',
      info: 'СВЕЗА',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      email: 'sveza@mail.ru',
      phone: '+79996054569',
    },
  });

  const RESPONSIBLE_PARTNER_PRODUCER_3 = await prisma?.responsiblePartnerProducer?.create({
    data: {
      name: 'Grand Line',
      numInOrder: 3,
      comment: 'Grand Line',
      info: 'Grand Line',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      email: 'grandline@mail.ru',
      phone: '+79996054569',
    },
  });
  //endregion

  //DOC FIELD_UNIT_MEASUREMENTS - создаем единицы измерения
  //region FIELD_UNIT_MEASUREMENTS
  const FIELD_UNIT_MEASUREMENT_0 = await prisma?.fieldUnitMeasurement?.create({
    data: {
      name: 'м3',
      numInOrder: 1,
      comment: 'Метры кубические',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const FIELD_UNIT_MEASUREMENT_1 = await prisma?.fieldUnitMeasurement?.create({
    data: {
      name: 'м2',
      numInOrder: 2,
      comment: 'Метры квадратные',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const FIELD_UNIT_MEASUREMENT_2 = await prisma?.fieldUnitMeasurement?.create({
    data: {
      name: 'мм',
      numInOrder: 3,
      comment: 'Миллиметры',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const FIELD_UNIT_MEASUREMENT_3 = await prisma?.fieldUnitMeasurement?.create({
    data: {
      name: 'см',
      numInOrder: 4,
      comment: 'Сантиметры',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const FIELD_UNIT_MEASUREMENT_4 = await prisma?.fieldUnitMeasurement?.create({
    data: {
      name: 'пог. м',
      numInOrder: 5,
      comment: 'Погонные метры',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const FIELD_UNIT_MEASUREMENT_5 = await prisma?.fieldUnitMeasurement?.create({
    data: {
      name: 'м',
      numInOrder: 6,
      comment: 'Метры',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const FIELD_UNIT_MEASUREMENT_6 = await prisma?.fieldUnitMeasurement?.create({
    data: {
      name: 'кг',
      numInOrder: 7,
      comment: 'Килограммы',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const FIELD_UNIT_MEASUREMENT_7 = await prisma?.fieldUnitMeasurement?.create({
    data: {
      name: 'литр',
      numInOrder: 8,
      comment: 'Литры',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const FIELD_UNIT_MEASUREMENT_8 = await prisma?.fieldUnitMeasurement?.create({
    data: {
      name: 'бухта',
      numInOrder: 9,
      comment: 'Бухты',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const FIELD_UNIT_MEASUREMENT_9 = await prisma?.fieldUnitMeasurement?.create({
    data: {
      name: 'упаковка',
      numInOrder: 10,
      comment: 'Упаковки',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const FIELD_UNIT_MEASUREMENT_10 = await prisma?.fieldUnitMeasurement?.create({
    data: {
      name: 'шт.',
      numInOrder: 11,
      comment: 'Штуки',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const FIELD_UNIT_MEASUREMENT_11 = await prisma?.fieldUnitMeasurement?.create({
    data: {
      name: 'рулон',
      numInOrder: 12,
      comment: 'Рулоны',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const FIELD_UNIT_MEASUREMENT_12 = await prisma?.fieldUnitMeasurement?.create({
    data: {
      name: 'лист',
      numInOrder: 13,
      comment: 'Листы',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const FIELD_UNIT_MEASUREMENT_13 = await prisma?.fieldUnitMeasurement?.create({
    data: {
      name: 'месяц',
      numInOrder: 14,
      comment: 'Месяцы',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const FIELD_UNIT_MEASUREMENT_14 = await prisma?.fieldUnitMeasurement?.create({
    data: {
      name: 'чел.ч',
      numInOrder: 15,
      comment: 'Человеко-часы',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const FIELD_UNIT_MEASUREMENT_15 = await prisma?.fieldUnitMeasurement?.create({
    data: {
      name: 'чел.дн',
      numInOrder: 16,
      comment: 'Человеко-дни',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const FIELD_UNIT_MEASUREMENT_16 = await prisma?.fieldUnitMeasurement?.create({
    data: {
      name: 'отсутствует',
      numInOrder: 17,
      isDefault: true,
      comment: 'Отсутствует единица измерения (не важно)',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });
  //endregion

  //DOC FIELD_TYPES - создаем типы полей
  //region FIELD_TYPES
  const FIELD_TYPE_1 = await prisma?.fieldType?.create({
    data: {
      name: 'Текст',
      description: 'Текстовое поле',
      jsType: 'string',
    },
  });

  const FIELD_TYPE_2 = await prisma?.fieldType?.create({
    data: {
      name: 'Число',
      description: 'Числовое поле',
      jsType: 'number',
    },
  });

  const FIELD_TYPE_3 = await prisma?.fieldType?.create({
    data: {
      name: 'Выпадающий список',
      description: 'Поле - выбор из набора данных, выпадающий список',
      jsType: 'array',
    },
  });
  //endregion

  //DOC CATEGORY_MATERIALS - создаем категории материалов
  //region CATEGORY_MATERIALS
  const CATEGORY_MATERIAL_0 = await prisma?.categoryMaterial?.create({
    data: {
      name: 'Листовые',
      numInOrder: 1,
      comment: 'Листовые материалы',
      globalCategoryMaterialUuid: GLOBAL_CATEGORY_MATERIALS.uuid,
      templateName: null,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const CATEGORY_MATERIAL_1 = await prisma?.categoryMaterial?.create({
    data: {
      name: 'Теплоизоляция',
      numInOrder: 2,
      comment: 'Теплоизоляция',
      globalCategoryMaterialUuid: GLOBAL_CATEGORY_MATERIALS.uuid,
      templateName: null,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const CATEGORY_MATERIAL_2 = await prisma?.categoryMaterial?.create({
    data: {
      name: 'Рулонные',
      numInOrder: 3,
      comment: 'Рулонные материалы',
      globalCategoryMaterialUuid: GLOBAL_CATEGORY_MATERIALS.uuid,
      templateName: null,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const CATEGORY_MATERIAL_3 = await prisma?.categoryMaterial?.create({
    data: {
      name: 'Метизы',
      numInOrder: 4,
      comment: 'Метизы',
      globalCategoryMaterialUuid: GLOBAL_CATEGORY_MATERIALS.uuid,
      templateName: null,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const CATEGORY_MATERIAL_4 = await prisma?.categoryMaterial?.create({
    data: {
      name: 'Фасонные элементы',
      numInOrder: 5,
      comment: 'Фасонные элементы',
      globalCategoryMaterialUuid: GLOBAL_CATEGORY_MATERIALS.uuid,
      templateName: null,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const CATEGORY_MATERIAL_5 = await prisma?.categoryMaterial?.create({
    data: {
      name: 'Лес',
      numInOrder: 6,
      comment: 'Лес',
      globalCategoryMaterialUuid: GLOBAL_CATEGORY_MATERIALS.uuid,
      templateName: null,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const CATEGORY_MATERIAL_6 = await prisma?.categoryMaterial?.create({
    data: {
      name: 'Общая',
      isDefault: true,
      numInOrder: 7,
      comment: 'Общая',
      globalCategoryMaterialUuid: GLOBAL_CATEGORY_MATERIALS.uuid,
      templateName: null,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const CATEGORY_MATERIAL_7 = await prisma?.categoryMaterial?.create({
    data: {
      name: 'Измерительные приборы',
      numInOrder: 8,
      comment: 'Измерительные приборы',
      globalCategoryMaterialUuid: GLOBAL_CATEGORY_MATERIALS.uuid,
      templateName: null,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const CATEGORY_MATERIAL_8 = await prisma?.categoryMaterial?.create({
    data: {
      name: 'Шины',
      numInOrder: 9,
      comment: 'Шины',
      globalCategoryMaterialUuid: GLOBAL_CATEGORY_MATERIALS.uuid,
      templateName: null,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });
  //endregion

  //DOC CATEGORY_MATERIALS DEMO - создаем дополнительные категории материалов для удобного тестирования
  //region CATEGORY_MATERIALS
  const CATEGORY_MATERIAL_001 = await prisma?.categoryMaterial?.create({
    data: {
      name: 'Тест1',
      numInOrder: 10,
      comment: 'Описание Тест1',
      globalCategoryMaterialUuid: GLOBAL_CATEGORY_MATERIALS.uuid,
      templateName: null,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const CATEGORY_MATERIAL_002 = await prisma?.categoryMaterial?.create({
    data: {
      name: 'Тест2',
      numInOrder: 11,
      comment: 'Описание Тест2',
      globalCategoryMaterialUuid: GLOBAL_CATEGORY_MATERIALS.uuid,
      templateName: null,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const CATEGORY_MATERIAL_003 = await prisma?.categoryMaterial?.create({
    data: {
      name: 'Тест3',
      numInOrder: 12,
      comment: 'Описание Тест3',
      globalCategoryMaterialUuid: GLOBAL_CATEGORY_MATERIALS.uuid,
      templateName: null,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const CATEGORY_MATERIAL_004 = await prisma?.categoryMaterial?.create({
    data: {
      name: 'Тест4',
      numInOrder: 13,
      comment: 'Описание Тест4',
      globalCategoryMaterialUuid: GLOBAL_CATEGORY_MATERIALS.uuid,
      templateName: null,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const CATEGORY_MATERIAL_005 = await prisma?.categoryMaterial?.create({
    data: {
      name: 'Тест5',
      numInOrder: 14,
      comment: 'Описание Тест5',
      globalCategoryMaterialUuid: GLOBAL_CATEGORY_MATERIALS.uuid,
      templateName: null,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const CATEGORY_MATERIAL_006 = await prisma?.categoryMaterial?.create({
    data: {
      name: 'Тест6',
      numInOrder: 15,
      comment: 'Описание Тест6',
      globalCategoryMaterialUuid: GLOBAL_CATEGORY_MATERIALS.uuid,
      templateName: null,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const CATEGORY_MATERIAL_007 = await prisma?.categoryMaterial?.create({
    data: {
      name: 'Тест7',
      numInOrder: 16,
      comment: 'Описание Тест7',
      globalCategoryMaterialUuid: GLOBAL_CATEGORY_MATERIALS.uuid,
      templateName: null,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const CATEGORY_MATERIAL_008 = await prisma?.categoryMaterial?.create({
    data: {
      name: 'Тест8',
      numInOrder: 17,
      comment: 'Описание Тест8',
      globalCategoryMaterialUuid: GLOBAL_CATEGORY_MATERIALS.uuid,
      templateName: null,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const CATEGORY_MATERIAL_009 = await prisma?.categoryMaterial?.create({
    data: {
      name: 'Тест9',
      numInOrder: 18,
      comment: 'Описание Тест9',
      globalCategoryMaterialUuid: GLOBAL_CATEGORY_MATERIALS.uuid,
      templateName: null,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const CATEGORY_MATERIAL_010 = await prisma?.categoryMaterial?.create({
    data: {
      name: 'Тест10',
      numInOrder: 19,
      comment: 'Описание Тест10',
      globalCategoryMaterialUuid: GLOBAL_CATEGORY_MATERIALS.uuid,
      templateName: null,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const CATEGORY_MATERIAL_011 = await prisma?.categoryMaterial?.create({
    data: {
      name: 'Окна',
      numInOrder: 20,
      comment: 'Окна',
      globalCategoryMaterialUuid: GLOBAL_CATEGORY_MATERIALS.uuid,
      templateName: null,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });
  //endregion

  //DOC FIELD_OF_CATEGORY_MATERIALS - создаем поля категорий материалов
  //region FIELD_OF_CATEGORY_MATERIALS
  const FIELD_OF_CATEGORY_MATERIAL_0 = await prisma?.fieldOfCategoryMaterial?.create({
    data: {
      name: 'Диаметр',
      numInOrder: 1,
      comment: 'Диаметр окружности',
      defaultValue: '5',
      isRequired: true,
      unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENT_2.uuid,
      categoriesMaterial: {
        connect: [{ uuid: CATEGORY_MATERIAL_3.uuid }],
      },
      fieldTypeUuid: FIELD_TYPE_2.uuid,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const FIELD_OF_CATEGORY_MATERIAL_1 = await prisma?.fieldOfCategoryMaterial?.create({
    data: {
      name: 'Длина',
      numInOrder: 2,
      comment: 'Длина (число)',
      isRequired: true,
      unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENT_2.uuid,
      categoriesMaterial: {
        connect: [{ uuid: CATEGORY_MATERIAL_3.uuid }, { uuid: CATEGORY_MATERIAL_0.uuid }],
      },
      fieldTypeUuid: FIELD_TYPE_2.uuid,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const FIELD_OF_CATEGORY_MATERIAL_2 = await prisma?.fieldOfCategoryMaterial?.create({
    data: {
      name: 'Подтип метиза',
      numInOrder: 3,
      comment: 'Подтип метиза (список)',
      isRequired: true,
      unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENT_16.uuid,
      categoriesMaterial: {
        connect: [{ uuid: CATEGORY_MATERIAL_3.uuid }],
      },
      fieldTypeUuid: FIELD_TYPE_3.uuid,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const FIELD_OF_CATEGORY_MATERIAL_3 = await prisma?.fieldOfCategoryMaterial?.create({
    data: {
      name: 'Подтип листового материала',
      numInOrder: 4,
      comment: 'Подтип листового материала (список)',
      isRequired: true,
      unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENT_16.uuid,
      categoriesMaterial: {
        connect: [{ uuid: CATEGORY_MATERIAL_0.uuid }],
      },
      fieldTypeUuid: FIELD_TYPE_3.uuid,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const FIELD_OF_CATEGORY_MATERIAL_4 = await prisma?.fieldOfCategoryMaterial?.create({
    data: {
      name: 'Материал изготовления листового материала',
      numInOrder: 5,
      comment: 'Материал изготовления листового материала (список)',
      isRequired: true,
      unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENT_16.uuid,
      categoriesMaterial: {
        connect: [{ uuid: CATEGORY_MATERIAL_0.uuid }],
      },
      fieldTypeUuid: FIELD_TYPE_3.uuid,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const FIELD_OF_CATEGORY_MATERIAL_5 = await prisma?.fieldOfCategoryMaterial?.create({
    data: {
      name: 'Толщина',
      numInOrder: 6,
      comment: 'Толщина (число)',
      isRequired: true,
      unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENT_2.uuid,
      categoriesMaterial: {
        connect: [{ uuid: CATEGORY_MATERIAL_0.uuid }],
      },
      fieldTypeUuid: FIELD_TYPE_2.uuid,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const FIELD_OF_CATEGORY_MATERIAL_6 = await prisma?.fieldOfCategoryMaterial?.create({
    data: {
      name: 'Ширина',
      numInOrder: 7,
      comment: 'Ширина (число)',
      isRequired: true,
      unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENT_2.uuid,
      categoriesMaterial: {
        connect: [{ uuid: CATEGORY_MATERIAL_0.uuid }],
      },
      fieldTypeUuid: FIELD_TYPE_2.uuid,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const FIELD_OF_CATEGORY_MATERIAL_7 = await prisma?.fieldOfCategoryMaterial?.create({
    data: {
      name: 'Сорт листового материала',
      numInOrder: 8,
      comment: 'Сорт листового материала (список)',
      isRequired: true,
      unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENT_16.uuid,
      categoriesMaterial: {
        connect: [{ uuid: CATEGORY_MATERIAL_0.uuid }],
      },
      fieldTypeUuid: FIELD_TYPE_3.uuid,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const FIELD_OF_CATEGORY_MATERIAL_8 = await prisma?.fieldOfCategoryMaterial?.create({
    data: {
      name: 'Марка листового материала',
      numInOrder: 9,
      comment: 'Марка листового материала (список)',
      isRequired: true,
      unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENT_16.uuid,
      categoriesMaterial: {
        connect: [{ uuid: CATEGORY_MATERIAL_0.uuid }],
      },
      fieldTypeUuid: FIELD_TYPE_3.uuid,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      lastChangeByUserUuid: MANAGER_USER_1.uuid,
    },
  });

  const FIELD_OF_CATEGORY_MATERIAL_9 = await prisma?.fieldOfCategoryMaterial?.create({
    data: {
      name: 'ГОСТ листового материала',
      numInOrder: 10,
      comment: 'ГОСТ листового материала (ТУ или без требований) (список)',
      isRequired: false,
      unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENT_16.uuid,
      categoriesMaterial: {
        connect: [{ uuid: CATEGORY_MATERIAL_0.uuid }],
      },
      fieldTypeUuid: FIELD_TYPE_3.uuid,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      lastChangeByUserUuid: MANAGER_USER_1.uuid,
    },
  });

  const FIELD_OF_CATEGORY_MATERIAL_10 = await prisma?.fieldOfCategoryMaterial?.create({
    data: {
      name: 'Вид шины',
      numInOrder: 11,
      comment: 'Вид шины (список)',
      isRequired: false,
      unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENT_16.uuid,
      categoriesMaterial: {
        connect: [{ uuid: CATEGORY_MATERIAL_8.uuid }],
      },
      fieldTypeUuid: FIELD_TYPE_3.uuid,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      lastChangeByUserUuid: MANAGER_USER_1.uuid,
    },
  });

  const FIELD_OF_CATEGORY_MATERIAL_101 = await prisma?.fieldOfCategoryMaterial?.create({
    data: {
      name: 'Параметр1',
      numInOrder: 12,
      comment: 'Параметр1',
      defaultValue: 'Строка1',
      isRequired: true,
      unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENT_2.uuid,
      fieldTypeUuid: FIELD_TYPE_1.uuid,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const FIELD_OF_CATEGORY_MATERIAL_102 = await prisma?.fieldOfCategoryMaterial?.create({
    data: {
      name: 'Параметр2',
      numInOrder: 13,
      comment: 'Параметр2',
      defaultValue: 'Строка2',
      isRequired: true,
      unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENT_2.uuid,
      fieldTypeUuid: FIELD_TYPE_1.uuid,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const FIELD_OF_CATEGORY_MATERIAL_103 = await prisma?.fieldOfCategoryMaterial?.create({
    data: {
      name: 'Параметр3',
      numInOrder: 14,
      comment: 'Параметр3',
      defaultValue: '111',
      isRequired: false,
      unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENT_2.uuid,
      fieldTypeUuid: FIELD_TYPE_2.uuid,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const FIELD_OF_CATEGORY_MATERIAL_104 = await prisma?.fieldOfCategoryMaterial?.create({
    data: {
      name: 'Параметр4',
      numInOrder: 15,
      comment: 'Параметр4',
      defaultValue: '222',
      isRequired: true,
      unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENT_2.uuid,
      fieldTypeUuid: FIELD_TYPE_2.uuid,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const FIELD_OF_CATEGORY_MATERIAL_105 = await prisma?.fieldOfCategoryMaterial?.create({
    data: {
      name: 'Параметр5',
      numInOrder: 16,
      comment: 'Параметр5',
      isRequired: false,
      unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENT_3.uuid,
      fieldTypeUuid: FIELD_TYPE_3.uuid,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const FIELD_OF_CATEGORY_MATERIAL_106 = await prisma?.fieldOfCategoryMaterial?.create({
    data: {
      name: 'Параметр6',
      numInOrder: 17,
      comment: 'Параметр5',
      isRequired: true,
      unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENT_3.uuid,
      fieldTypeUuid: FIELD_TYPE_3.uuid,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
    },
  });

  const FIELD_OF_CATEGORY_MATERIAL_11 = await prisma?.fieldOfCategoryMaterial?.create({
    data: {
      name: 'Материал окна',
      numInOrder: 18,
      comment: 'Материал окна (список)',
      isRequired: true,
      unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENT_10.uuid,
      categoriesMaterial: {
        connect: [{ uuid: CATEGORY_MATERIAL_011.uuid }],
      },
      fieldTypeUuid: FIELD_TYPE_3.uuid,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      lastChangeByUserUuid: MANAGER_USER_1.uuid,
    },
  });
  //endregion

  //DOC UPDATED_FIELDS_OF_CATEGORY_MATERIAL - обновляем поля категорий материалов информацией о шаблоне
  //region UPDATED_FIELDS_OF_CATEGORY_MATERIAL
  const UPDATED_FIELD_OF_CATEGORY_MATERIAL_0 = await prisma?.fieldOfCategoryMaterial?.update({
    where: {
      uuid: FIELD_OF_CATEGORY_MATERIAL_0.uuid,
    },
    data: {
      //DOC - заменяем в названии все "_" и " " на "-" (а также делаем lowercase) с помощью регулярки. Формат (FIELD_OF_CATEGORY_MATERIAL: {{#название-поля_uuid-поля_uuid-типа
      //DOC - превращаем в такой шаблон {{#подтип-метиза_ef792f21-a262-4e5a-90ea-1b23007e7812_ee02ad1b-b113-4048-a4cc-e30ac0244e5e}} {{#диаметр-метиза_abb883fb-7837-47e6-b092-c2a8228432b7_ee02ad1b-b113-4048-a4cc-e30ac0244e5e}}×{{#длина-метиза_53f359d8-3889-421a-9149-a2c341e06b46_ee02ad1b-b113-4048-a4cc-e30ac0244e5e}}
      uniqueNameForTemplate: fieldOfCategoryMaterialTemplateGenerator(FIELD_OF_CATEGORY_MATERIAL_0),
    },
  });

  const UPDATED_FIELD_OF_CATEGORY_MATERIAL_1 = await prisma?.fieldOfCategoryMaterial?.update({
    where: {
      uuid: FIELD_OF_CATEGORY_MATERIAL_1.uuid,
    },
    data: {
      uniqueNameForTemplate: fieldOfCategoryMaterialTemplateGenerator(FIELD_OF_CATEGORY_MATERIAL_1),
    },
  });

  const UPDATED_FIELD_OF_CATEGORY_MATERIAL_2 = await prisma?.fieldOfCategoryMaterial?.update({
    where: {
      uuid: FIELD_OF_CATEGORY_MATERIAL_2.uuid,
    },
    data: {
      uniqueNameForTemplate: fieldOfCategoryMaterialTemplateGenerator(FIELD_OF_CATEGORY_MATERIAL_2),
    },
  });

  const UPDATED_FIELD_OF_CATEGORY_MATERIAL_3 = await prisma?.fieldOfCategoryMaterial?.update({
    where: {
      uuid: FIELD_OF_CATEGORY_MATERIAL_3.uuid,
    },
    data: {
      uniqueNameForTemplate: fieldOfCategoryMaterialTemplateGenerator(FIELD_OF_CATEGORY_MATERIAL_3),
    },
  });

  const UPDATED_FIELD_OF_CATEGORY_MATERIAL_4 = await prisma?.fieldOfCategoryMaterial?.update({
    where: {
      uuid: FIELD_OF_CATEGORY_MATERIAL_4.uuid,
    },
    data: {
      uniqueNameForTemplate: fieldOfCategoryMaterialTemplateGenerator(FIELD_OF_CATEGORY_MATERIAL_4),
    },
  });

  const UPDATED_FIELD_OF_CATEGORY_MATERIAL_5 = await prisma?.fieldOfCategoryMaterial?.update({
    where: {
      uuid: FIELD_OF_CATEGORY_MATERIAL_5.uuid,
    },
    data: {
      uniqueNameForTemplate: fieldOfCategoryMaterialTemplateGenerator(FIELD_OF_CATEGORY_MATERIAL_5),
    },
  });

  const UPDATED_FIELD_OF_CATEGORY_MATERIAL_6 = await prisma?.fieldOfCategoryMaterial?.update({
    where: {
      uuid: FIELD_OF_CATEGORY_MATERIAL_6.uuid,
    },
    data: {
      uniqueNameForTemplate: fieldOfCategoryMaterialTemplateGenerator(FIELD_OF_CATEGORY_MATERIAL_6),
    },
  });

  const UPDATED_FIELD_OF_CATEGORY_MATERIAL_7 = await prisma?.fieldOfCategoryMaterial?.update({
    where: {
      uuid: FIELD_OF_CATEGORY_MATERIAL_7.uuid,
    },
    data: {
      uniqueNameForTemplate: fieldOfCategoryMaterialTemplateGenerator(FIELD_OF_CATEGORY_MATERIAL_7),
    },
  });

  const UPDATED_FIELD_OF_CATEGORY_MATERIAL_8 = await prisma?.fieldOfCategoryMaterial?.update({
    where: {
      uuid: FIELD_OF_CATEGORY_MATERIAL_8.uuid,
    },
    data: {
      uniqueNameForTemplate: fieldOfCategoryMaterialTemplateGenerator(FIELD_OF_CATEGORY_MATERIAL_8),
    },
  });

  const UPDATED_FIELD_OF_CATEGORY_MATERIAL_9 = await prisma?.fieldOfCategoryMaterial?.update({
    where: {
      uuid: FIELD_OF_CATEGORY_MATERIAL_9.uuid,
    },
    data: {
      uniqueNameForTemplate: fieldOfCategoryMaterialTemplateGenerator(FIELD_OF_CATEGORY_MATERIAL_9),
    },
  });

  const UPDATED_FIELD_OF_CATEGORY_MATERIAL_10 = await prisma?.fieldOfCategoryMaterial?.update({
    where: {
      uuid: FIELD_OF_CATEGORY_MATERIAL_10.uuid,
    },
    data: {
      uniqueNameForTemplate: fieldOfCategoryMaterialTemplateGenerator(FIELD_OF_CATEGORY_MATERIAL_10),
    },
  });

  const UPDATED_FIELD_OF_CATEGORY_MATERIAL_11 = await prisma?.fieldOfCategoryMaterial?.update({
    where: {
      uuid: FIELD_OF_CATEGORY_MATERIAL_11.uuid,
    },
    data: {
      uniqueNameForTemplate: fieldOfCategoryMaterialTemplateGenerator(FIELD_OF_CATEGORY_MATERIAL_11),
    },
  });
  //endregion

  //DOC UPDATED_CATEGORY_MATERIAL - обновляем название шаблонов категорий после создания полей категории
  //region UPDATED_CATEGORY_MATERIAL
  const CATEGORY_MATERIAL_COVER_UPDATED = await prisma?.categoryMaterial?.update({
    where: {
      uuid: CATEGORY_MATERIAL_0.uuid,
    },
    data: {
      fieldsOfCategoryMaterialsInTemplate: {
        connect: [
          { uuid: UPDATED_FIELD_OF_CATEGORY_MATERIAL_3.uuid },
          { uuid: UPDATED_FIELD_OF_CATEGORY_MATERIAL_4.uuid },
          { uuid: UPDATED_FIELD_OF_CATEGORY_MATERIAL_9.uuid },
          { uuid: UPDATED_FIELD_OF_CATEGORY_MATERIAL_5.uuid },
          { uuid: UPDATED_FIELD_OF_CATEGORY_MATERIAL_6.uuid },
          { uuid: UPDATED_FIELD_OF_CATEGORY_MATERIAL_1.uuid },
          { uuid: UPDATED_FIELD_OF_CATEGORY_MATERIAL_8.uuid },
        ],
      },
      // имитируем передачу шаблона названия категории с фронтенда
      templateName: `${UPDATED_FIELD_OF_CATEGORY_MATERIAL_3?.uniqueNameForTemplate} ${UPDATED_FIELD_OF_CATEGORY_MATERIAL_4?.uniqueNameForTemplate} ${UPDATED_FIELD_OF_CATEGORY_MATERIAL_9?.uniqueNameForTemplate} ${UPDATED_FIELD_OF_CATEGORY_MATERIAL_5?.uniqueNameForTemplate}×${UPDATED_FIELD_OF_CATEGORY_MATERIAL_6?.uniqueNameForTemplate}×${UPDATED_FIELD_OF_CATEGORY_MATERIAL_1?.uniqueNameForTemplate} ${UPDATED_FIELD_OF_CATEGORY_MATERIAL_8?.uniqueNameForTemplate}`,
    },
  });

  const CATEGORY_MATERIAL_HARDWARE_UPDATED = await prisma?.categoryMaterial?.update({
    where: {
      uuid: CATEGORY_MATERIAL_3.uuid,
    },
    data: {
      fieldsOfCategoryMaterialsInTemplate: {
        connect: [
          { uuid: UPDATED_FIELD_OF_CATEGORY_MATERIAL_2.uuid },
          { uuid: UPDATED_FIELD_OF_CATEGORY_MATERIAL_0.uuid },
          { uuid: UPDATED_FIELD_OF_CATEGORY_MATERIAL_1.uuid },
        ],
      },
      templateName: `${UPDATED_FIELD_OF_CATEGORY_MATERIAL_2?.uniqueNameForTemplate} ${UPDATED_FIELD_OF_CATEGORY_MATERIAL_0?.uniqueNameForTemplate}×${UPDATED_FIELD_OF_CATEGORY_MATERIAL_1?.uniqueNameForTemplate}`,
    },
  });

  const CATEGORY_MATERIAL_WINDOWS_UPDATED = await prisma?.categoryMaterial?.update({
    where: {
      uuid: CATEGORY_MATERIAL_011.uuid,
    },
    data: {
      fieldsOfCategoryMaterialsInTemplate: {
        connect: [{ uuid: UPDATED_FIELD_OF_CATEGORY_MATERIAL_11.uuid }],
      },
      templateName: `Окно пластиковое вида: ${UPDATED_FIELD_OF_CATEGORY_MATERIAL_11?.uniqueNameForTemplate}`,
    },
  });
  //endregion

  // DOC CREATE FIELD_VARIANTS создаем все варианты полей селектора
  //region FIELD_VARIANTS
  const FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_0 = await prisma?.fieldVariantsForSelectorFieldType?.create({
    data: {
      value: 'Саморез',
      numInOrder: 1,
      description: 'Саморез (метизы, подтип)',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_2.uuid,
    },
  });

  const FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_1 = await prisma?.fieldVariantsForSelectorFieldType?.create({
    data: {
      value: 'Шуруп',
      numInOrder: 2,
      description: 'Шуруп (метизы, подтип)',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_2.uuid,
    },
  });

  const FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_2 = await prisma?.fieldVariantsForSelectorFieldType?.create({
    data: {
      value: 'Винт',
      numInOrder: 3,
      description: 'Винт (метизы, подтип)',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_2.uuid,
    },
  });

  const FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_3 = await prisma?.fieldVariantsForSelectorFieldType?.create({
    data: {
      value: 'Болт сантехнический',
      numInOrder: 4,
      description: 'Болт сантехнический (метизы, подтип)',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_2.uuid,
    },
  });

  const FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_4 = await prisma?.fieldVariantsForSelectorFieldType?.create({
    data: {
      value: 'Фанера',
      numInOrder: 5,
      description: 'Фанера (листовые, подтип)',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_3.uuid,
    },
  });

  const FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_5 = await prisma?.fieldVariantsForSelectorFieldType?.create({
    data: {
      value: 'OSB',
      numInOrder: 6,
      description: 'OSB (листовые, подтип)',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_3.uuid,
    },
  });

  const FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_6 = await prisma?.fieldVariantsForSelectorFieldType?.create({
    data: {
      value: 'Хвойная',
      numInOrder: 7,
      description: 'Хвойная (листовые, материал)',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_4.uuid,
    },
  });

  const FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_7 = await prisma?.fieldVariantsForSelectorFieldType?.create({
    data: {
      value: 'Берёзовая',
      numInOrder: 8,
      description: 'Берёзовая (листовые, материал)',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_4.uuid,
    },
  });

  const FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_8 = await prisma?.fieldVariantsForSelectorFieldType?.create({
    data: {
      value: '4/4',
      numInOrder: 9,
      description: '4/4 (листовые, сорт)',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_7.uuid,
    },
  });

  const FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_9 = await prisma?.fieldVariantsForSelectorFieldType?.create({
    data: {
      value: '3/4',
      numInOrder: 10,
      description: '3/4 (листовые, сорт)',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_7.uuid,
    },
  });

  const FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_10 = await prisma?.fieldVariantsForSelectorFieldType?.create({
    data: {
      value: '3/3',
      numInOrder: 11,
      description: '3/3 (листовые, сорт)',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_7.uuid,
    },
  });

  const FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_11 = await prisma?.fieldVariantsForSelectorFieldType?.create({
    data: {
      value: '2ш/3',
      numInOrder: 12,
      description: '2ш/3 (листовые, сорт)',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_7.uuid,
    },
  });

  const FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_12 = await prisma?.fieldVariantsForSelectorFieldType?.create({
    data: {
      value: 'ФК',
      numInOrder: 13,
      description: 'ФК (листовые, марка)',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_8.uuid,
    },
  });

  const FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_13 = await prisma?.fieldVariantsForSelectorFieldType?.create({
    data: {
      value: 'ФСФ',
      numInOrder: 14,
      description: 'ФСФ (листовые, марка)',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_8.uuid,
    },
  });

  const FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_14 = await prisma?.fieldVariantsForSelectorFieldType?.create({
    data: {
      value: 'ЛАК',
      numInOrder: 15,
      description: 'ЛАК (листовые, марка)',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_8.uuid,
    },
  });

  const FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_15 = await prisma?.fieldVariantsForSelectorFieldType?.create({
    data: {
      value: 'ГОСТ',
      numInOrder: 16,
      description: 'ГОСТ (листовые, ГОСТ)',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_9.uuid,
    },
  });

  const FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_16 = await prisma?.fieldVariantsForSelectorFieldType?.create({
    data: {
      value: 'ТУ',
      numInOrder: 17,
      description: 'ТУ (листовые, ГОСТ)',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_9.uuid,
    },
  });

  const FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_17 = await prisma?.fieldVariantsForSelectorFieldType?.create({
    data: {
      value: 'Зимняя',
      numInOrder: 18,
      description: 'Зимняя (шины, вид)',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_10.uuid,
    },
  });

  const FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_18 = await prisma?.fieldVariantsForSelectorFieldType?.create({
    data: {
      value: 'Летняя',
      numInOrder: 19,
      description: 'Летняя (шины, вид)',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_10.uuid,
    },
  });

  const FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_19 = await prisma?.fieldVariantsForSelectorFieldType?.create({
    data: {
      value: 'мини',
      numInOrder: 20,
      description: 'мини',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_11.uuid,
    },
  });

  const FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_20 = await prisma?.fieldVariantsForSelectorFieldType?.create({
    data: {
      value: 'легкое',
      numInOrder: 21,
      description: 'легкое',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_11.uuid,
    },
  });

  const FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_21 = await prisma?.fieldVariantsForSelectorFieldType?.create({
    data: {
      value: 'среднее',
      numInOrder: 22,
      description: 'среднее',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_11.uuid,
    },
  });

  const FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_22 = await prisma?.fieldVariantsForSelectorFieldType?.create({
    data: {
      value: 'тяжелое',
      numInOrder: 23,
      description: 'тяжелое',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_11.uuid,
    },
  });
  //endregion

  // DOC CREATE materials создаем все materials (как в excel) доступные изначально
  //region MATERIALS
  const MATERIAL_UNIT_0 = await prisma?.material?.create({
    data: {
      name: 'Саморез 6×70 (черновик)',
      comment: 'Это те винты, которыми мы крепим доски обвязки к фундаменту',
      price: 4.13,
      namePublic: 'Глухарь',
      numInOrder: 1,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_3.uuid,
      unitMeasurementUuid: FIELD_UNIT_MEASUREMENT_10.uuid,
      responsiblePartnerUuid: RESPONSIBLE_PARTNER_PRODUCER_3.uuid,
    },
  });

  const MATERIAL_UNIT_1 = await prisma?.material?.create({
    data: {
      name: 'Фанера Берёзовая ФСФ 18×1220×2440 4/4 (черновик)',
      comment: 'Это ...',
      price: 1770,
      namePublic: 'Фанера стандартная',
      numInOrder: 2,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_0.uuid,
      unitMeasurementUuid: FIELD_UNIT_MEASUREMENT_12.uuid,
      responsiblePartnerUuid: RESPONSIBLE_PARTNER_PRODUCER_2.uuid,
    },
  });

  const MATERIAL_UNIT_2 = await prisma?.material?.create({
    data: {
      name: 'Болт сантехнический 10×70 (черновик)',
      comment: 'Это ...',
      price: 0.83,
      namePublic: 'Болт обычный',
      numInOrder: 3,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_3.uuid,
      unitMeasurementUuid: FIELD_UNIT_MEASUREMENT_10.uuid,
      responsiblePartnerUuid: RESPONSIBLE_PARTNER_PRODUCER_1.uuid,
    },
  });

  // DOC материалы метизы для просмотра - как быть, если не заполнены характеристики для материалов
  const MATERIAL_UNIT_METIZ2 = await prisma?.material?.create({
    data: {
      name: 'Метиз2 частично',
      comment: 'Метиз2 заполненный',
      price: 24342,
      namePublic: 'Метиз2',
      numInOrder: 4,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_3.uuid,
      unitMeasurementUuid: FIELD_UNIT_MEASUREMENT_10.uuid,
      responsiblePartnerUuid: RESPONSIBLE_PARTNER_PRODUCER_1.uuid,
    },
  });

  const MATERIAL_UNIT_METIZ3 = await prisma?.material?.create({
    data: {
      name: 'Метиз3 не заполнен',
      comment: 'Метиз3 не заполненный вообще',
      price: 123,
      namePublic: 'Метиз3',
      numInOrder: 5,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_3.uuid,
      unitMeasurementUuid: FIELD_UNIT_MEASUREMENT_10.uuid,
      responsiblePartnerUuid: RESPONSIBLE_PARTNER_PRODUCER_1.uuid,
    },
  });

  // DOC материалы пустышки из общей категории - для проверки функции удаления
  const MATERIAL_UNIT_101 = await prisma?.material?.create({
    data: {
      name: 'Простой материал 101',
      comment: 'Только что добавленный 101',
      price: 1535353,
      namePublic: 'Тест101',
      numInOrder: 6,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_6.uuid,
      unitMeasurementUuid: FIELD_UNIT_MEASUREMENT_16.uuid,
    },
  });

  const MATERIAL_UNIT_102 = await prisma?.material?.create({
    data: {
      name: 'Простой материал 102',
      comment: 'Только что добавленный 102',
      price: 185756735,
      namePublic: 'Тест102',
      numInOrder: 7,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_6.uuid,
      unitMeasurementUuid: FIELD_UNIT_MEASUREMENT_16.uuid,
    },
  });

  const MATERIAL_UNIT_103 = await prisma?.material?.create({
    data: {
      name: 'Простой материал 103',
      comment: 'Только что добавленный 103',
      price: 14,
      namePublic: 'Тест103',
      numInOrder: 8,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_6.uuid,
      unitMeasurementUuid: FIELD_UNIT_MEASUREMENT_16.uuid,
    },
  });

  const MATERIAL_UNIT_104 = await prisma?.material?.create({
    data: {
      name: 'Простой материал 104',
      comment: 'Только что добавленный 104',
      price: 16789,
      namePublic: 'Тест104',
      numInOrder: 9,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_6.uuid,
      unitMeasurementUuid: FIELD_UNIT_MEASUREMENT_16.uuid,
    },
  });

  const MATERIAL_UNIT_105 = await prisma?.material?.create({
    data: {
      name: 'Простой материал 105',
      comment: 'Только что добавленный 105',
      price: 12345,
      namePublic: 'Тест105',
      numInOrder: 10,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_6.uuid,
      unitMeasurementUuid: FIELD_UNIT_MEASUREMENT_16.uuid,
    },
  });

  // DOC материалы окна из категории ОКНА - с различными характеристиками и заполненными свойствами. Нужны для проверки ихменений, смены категории, изменения полей категории
  const MATERIAL_UNIT_106 = await prisma?.material?.create({
    data: {
      name: 'Окно1',
      comment: 'Окно1',
      price: 123,
      namePublic: 'Окно1',
      numInOrder: 11,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_011.uuid,
      unitMeasurementUuid: FIELD_UNIT_MEASUREMENT_16.uuid,
    },
  });

  const MATERIAL_UNIT_107 = await prisma?.material?.create({
    data: {
      name: 'Окно2',
      comment: 'Окно2',
      price: 1232423,
      namePublic: 'Окно2',
      numInOrder: 12,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_011.uuid,
      unitMeasurementUuid: FIELD_UNIT_MEASUREMENT_16.uuid,
    },
  });

  const MATERIAL_UNIT_108 = await prisma?.material?.create({
    data: {
      name: 'Окно3',
      comment: 'Окно3',
      price: 12345,
      namePublic: 'Окно3',
      numInOrder: 13,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_011.uuid,
      unitMeasurementUuid: FIELD_UNIT_MEASUREMENT_16.uuid,
    },
  });

  const MATERIAL_UNIT_109 = await prisma?.material?.create({
    data: {
      name: 'Окно4',
      comment: 'Окно4',
      price: 123456,
      namePublic: 'Окно4',
      numInOrder: 14,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_011.uuid,
      unitMeasurementUuid: FIELD_UNIT_MEASUREMENT_16.uuid,
    },
  });

  //DOC еще материалы из общей категории для массовости
  const MATERIAL_UNIT_110 = await prisma?.material?.create({
    data: {
      name: 'Простой материал 1',
      comment: 'Только что добавленный 1',
      price: 99999999999999,
      namePublic: 'Тест1',
      numInOrder: 15,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_6.uuid,
      unitMeasurementUuid: FIELD_UNIT_MEASUREMENT_16.uuid,
      responsiblePartnerUuid: RESPONSIBLE_PARTNER_PRODUCER_2.uuid,
    },
  });

  const MATERIAL_UNIT_111 = await prisma?.material?.create({
    data: {
      name: 'Простой материал 2',
      comment: 'Только что добавленный 2',
      price: 1,
      namePublic: 'Тест2',
      numInOrder: 16,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_6.uuid,
      unitMeasurementUuid: FIELD_UNIT_MEASUREMENT_16.uuid,
    },
  });

  // DOC материалы листовые для теста шаблонного наименования
  const MATERIAL_UNIT_LISTOVOI1 = await prisma?.material?.create({
    data: {
      name: 'Листовой1 частично',
      comment: 'Листовой1 частично заполненный',
      price: 24342345,
      namePublic: 'Листовой1',
      numInOrder: 17,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_0.uuid,
      unitMeasurementUuid: FIELD_UNIT_MEASUREMENT_10.uuid,
      responsiblePartnerUuid: RESPONSIBLE_PARTNER_PRODUCER_3.uuid,
    },
  });

  const MATERIAL_UNIT_LISTOVOI2 = await prisma?.material?.create({
    data: {
      name: 'Листовой2 частично',
      comment: 'Листовой2 частично заполненный',
      price: 11111,
      namePublic: 'Листовой2',
      numInOrder: 17,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_0.uuid,
      unitMeasurementUuid: FIELD_UNIT_MEASUREMENT_10.uuid,
      responsiblePartnerUuid: RESPONSIBLE_PARTNER_PRODUCER_3.uuid,
    },
  });
  //endregion

  // DOC CREATE CHARACTERISTICS_MATERIAL создаем все характеристики для materials по полям категории
  //region CHARACTERISTICS_MATERIAL
  const CHARACTERISTICS_MATERIAL_OF_GLUHAR_0 = await prisma?.characteristicsMaterial?.create({
    data: {
      materialUuid: MATERIAL_UNIT_0.uuid,
      numInOrder: 1,
      //DOC в любом случае приводится к строке (так хранится в БД), а вот работа происходит уже в зависимости от типа поля
      value: '6',
      comment: 'там нестабильный диаметр, надо проверять',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_0.uuid,
    },
  });

  const CHARACTERISTICS_MATERIAL_OF_GLUHAR_1 = await prisma?.characteristicsMaterial?.create({
    data: {
      materialUuid: MATERIAL_UNIT_0.uuid,
      numInOrder: 2,
      value: '30',
      comment: 'no comments',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_1.uuid,
    },
  });

  const CHARACTERISTICS_MATERIAL_OF_GLUHAR_2 = await prisma?.characteristicsMaterial?.create({
    data: {
      materialUuid: MATERIAL_UNIT_0.uuid,
      numInOrder: 3,
      value: FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_0.value,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_2.uuid,
    },
  });

  const CHARACTERISTICS_MATERIAL_OF_BOLT_0 = await prisma?.characteristicsMaterial?.create({
    data: {
      materialUuid: MATERIAL_UNIT_2.uuid,
      numInOrder: 4,
      value: '10',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_0.uuid,
    },
  });

  const CHARACTERISTICS_MATERIAL_OF_BOLT_1 = await prisma?.characteristicsMaterial?.create({
    data: {
      materialUuid: MATERIAL_UNIT_2.uuid,
      numInOrder: 5,
      value: '70',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_1.uuid,
    },
  });

  const CHARACTERISTICS_MATERIAL_OF_BOLT_2 = await prisma?.characteristicsMaterial?.create({
    data: {
      materialUuid: MATERIAL_UNIT_2.uuid,
      numInOrder: 6,
      value: FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_3.value,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_2.uuid,
    },
  });

  const CHARACTERISTICS_MATERIAL_OF_METIZ2 = await prisma?.characteristicsMaterial?.create({
    data: {
      materialUuid: MATERIAL_UNIT_METIZ2.uuid,
      numInOrder: 7,
      value: FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_2.value,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_2.uuid,
    },
  });

  const CHARACTERISTICS_MATERIAL_OF_FANERA_0 = await prisma?.characteristicsMaterial?.create({
    data: {
      materialUuid: MATERIAL_UNIT_1.uuid,
      numInOrder: 8,
      value: FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_4.value,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_3.uuid,
    },
  });

  const CHARACTERISTICS_MATERIAL_OF_FANERA_1 = await prisma?.characteristicsMaterial?.create({
    data: {
      materialUuid: MATERIAL_UNIT_1.uuid,
      numInOrder: 9,
      value: FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_7.value,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_4.uuid,
    },
  });

  const CHARACTERISTICS_MATERIAL_OF_FANERA_2 = await prisma?.characteristicsMaterial?.create({
    data: {
      materialUuid: MATERIAL_UNIT_1.uuid,
      numInOrder: 10,
      value: '18',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_5.uuid,
    },
  });

  const CHARACTERISTICS_MATERIAL_OF_FANERA_3 = await prisma?.characteristicsMaterial?.create({
    data: {
      materialUuid: MATERIAL_UNIT_1.uuid,
      value: '1220',
      numInOrder: 11,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_6.uuid,
    },
  });

  const CHARACTERISTICS_MATERIAL_OF_FANERA_4 = await prisma?.characteristicsMaterial?.create({
    data: {
      materialUuid: MATERIAL_UNIT_1.uuid,
      value: '2440',
      numInOrder: 12,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_1.uuid,
    },
  });

  const CHARACTERISTICS_MATERIAL_OF_FANERA_5 = await prisma?.characteristicsMaterial?.create({
    data: {
      materialUuid: MATERIAL_UNIT_1.uuid,
      numInOrder: 13,
      value: FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_8.value,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_8.uuid,
    },
  });

  const CHARACTERISTICS_MATERIAL_OF_FANERA_6 = await prisma?.characteristicsMaterial?.create({
    data: {
      materialUuid: MATERIAL_UNIT_1.uuid,
      numInOrder: 14,
      value: FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_13.value,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_9.uuid,
    },
  });

  const CHARACTERISTICS_MATERIAL_OF_WINDOW1_1 = await prisma?.characteristicsMaterial?.create({
    data: {
      materialUuid: MATERIAL_UNIT_106.uuid,
      numInOrder: 15,
      value: FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_19.value,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_11.uuid,
    },
  });

  const CHARACTERISTICS_MATERIAL_OF_WINDOW1_2 = await prisma?.characteristicsMaterial?.create({
    data: {
      materialUuid: MATERIAL_UNIT_107.uuid,
      numInOrder: 16,
      value: FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_20.value,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_11.uuid,
    },
  });

  const CHARACTERISTICS_MATERIAL_OF_WINDOW1_3 = await prisma?.characteristicsMaterial?.create({
    data: {
      materialUuid: MATERIAL_UNIT_108.uuid,
      numInOrder: 17,
      value: FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_21.value,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_11.uuid,
    },
  });

  const CHARACTERISTICS_MATERIAL_OF_WINDOW1_4 = await prisma?.characteristicsMaterial?.create({
    data: {
      materialUuid: MATERIAL_UNIT_109.uuid,
      numInOrder: 18,
      value: FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_22.value,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_11.uuid,
    },
  });

  const CHARACTERISTICS_MATERIAL_OF_LISTOVOI1_1 = await prisma?.characteristicsMaterial?.create({
    data: {
      materialUuid: MATERIAL_UNIT_LISTOVOI1.uuid,
      numInOrder: 19,
      value: FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_7.value,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_4.uuid,
    },
  });

  const CHARACTERISTICS_MATERIAL_OF_LISTOVOI2_1 = await prisma?.characteristicsMaterial?.create({
    data: {
      materialUuid: MATERIAL_UNIT_LISTOVOI2.uuid,
      numInOrder: 20,
      value: FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_7.value,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_4.uuid,
    },
  });

  const CHARACTERISTICS_MATERIAL_OF_LISTOVOI2_2 = await prisma?.characteristicsMaterial?.create({
    data: {
      materialUuid: MATERIAL_UNIT_LISTOVOI2.uuid,
      numInOrder: 21,
      value: '231',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_5.uuid,
    },
  });

  const CHARACTERISTICS_MATERIAL_OF_LISTOVOI2_3 = await prisma?.characteristicsMaterial?.create({
    data: {
      materialUuid: MATERIAL_UNIT_LISTOVOI2.uuid,
      value: '2323',
      numInOrder: 22,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_6.uuid,
    },
  });
  //endregion

  // DOC CREATE MATERIALS_DEMO создаем дополнительные материалы
  // region CREATE_DEMO_MATERIAL
  const MATERIAL_UNIT_011 = await prisma?.material?.create({
    data: {
      name: 'Материал1 из Тест1',
      comment: 'Материал1 из Тест1',
      price: 11,
      namePublic: 'Материал11',
      numInOrder: 6,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_001.uuid,
      unitMeasurementUuid: FIELD_UNIT_MEASUREMENT_10.uuid,
      responsiblePartnerUuid: RESPONSIBLE_PARTNER_PRODUCER_3.uuid,
    },
  });

  const MATERIAL_UNIT_012 = await prisma?.material?.create({
    data: {
      name: 'Материал2 из Тест1',
      comment: 'Материал2 из Тест1',
      price: 12,
      namePublic: 'Материал12',
      numInOrder: 7,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_001.uuid,
      unitMeasurementUuid: FIELD_UNIT_MEASUREMENT_10.uuid,
      responsiblePartnerUuid: RESPONSIBLE_PARTNER_PRODUCER_3.uuid,
    },
  });

  const MATERIAL_UNIT_013 = await prisma?.material?.create({
    data: {
      name: 'Материал3 из Тест1',
      comment: 'Материал3 из Тест1',
      price: 13,
      namePublic: 'Материал13',
      numInOrder: 8,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_001.uuid,
      unitMeasurementUuid: FIELD_UNIT_MEASUREMENT_10.uuid,
      responsiblePartnerUuid: RESPONSIBLE_PARTNER_PRODUCER_3.uuid,
    },
  });

  const MATERIAL_UNIT_021 = await prisma?.material?.create({
    data: {
      name: 'Материал1 из Тест2',
      comment: 'Материал1 из Тест2',
      price: 21,
      namePublic: 'Материал21',
      numInOrder: 9,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_002.uuid,
      unitMeasurementUuid: FIELD_UNIT_MEASUREMENT_10.uuid,
      responsiblePartnerUuid: RESPONSIBLE_PARTNER_PRODUCER_3.uuid,
    },
  });

  const MATERIAL_UNIT_022 = await prisma?.material?.create({
    data: {
      name: 'Материал2 из Тест2',
      comment: 'Материал2 из Тест2',
      price: 22,
      namePublic: 'Материал22',
      numInOrder: 10,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_002.uuid,
      unitMeasurementUuid: FIELD_UNIT_MEASUREMENT_10.uuid,
      responsiblePartnerUuid: RESPONSIBLE_PARTNER_PRODUCER_3.uuid,
    },
  });

  const MATERIAL_UNIT_031 = await prisma?.material?.create({
    data: {
      name: 'Материал1 из Тест3',
      comment: 'Материал1 из Тест3',
      price: 22,
      namePublic: 'Материал31',
      numInOrder: 11,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_003.uuid,
      unitMeasurementUuid: FIELD_UNIT_MEASUREMENT_10.uuid,
      responsiblePartnerUuid: RESPONSIBLE_PARTNER_PRODUCER_3.uuid,
    },
  });

  const MATERIAL_UNIT_041 = await prisma?.material?.create({
    data: {
      name: 'Материал1 из Тест4',
      comment: 'Материал1 из Тест4',
      price: 22,
      namePublic: 'Материал41',
      numInOrder: 12,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_004.uuid,
      unitMeasurementUuid: FIELD_UNIT_MEASUREMENT_10.uuid,
      responsiblePartnerUuid: RESPONSIBLE_PARTNER_PRODUCER_3.uuid,
    },
  });

  const MATERIAL_UNIT_051 = await prisma?.material?.create({
    data: {
      name: 'Материал1 из Тест5',
      comment: 'Материал1 из Тест5',
      price: 22,
      namePublic: 'Материал51',
      numInOrder: 13,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_005.uuid,
      unitMeasurementUuid: FIELD_UNIT_MEASUREMENT_10.uuid,
      responsiblePartnerUuid: RESPONSIBLE_PARTNER_PRODUCER_3.uuid,
    },
  });

  const MATERIAL_UNIT_061 = await prisma?.material?.create({
    data: {
      name: 'Материал1 из Тест6',
      comment: 'Материал1 из Тест6',
      price: 22,
      namePublic: 'Материал61',
      numInOrder: 14,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_006.uuid,
      unitMeasurementUuid: FIELD_UNIT_MEASUREMENT_10.uuid,
      responsiblePartnerUuid: RESPONSIBLE_PARTNER_PRODUCER_3.uuid,
    },
  });

  const MATERIAL_UNIT_071 = await prisma?.material?.create({
    data: {
      name: 'Материал1 из Тест7',
      comment: 'Материал1 из Тест7',
      price: 22,
      namePublic: 'Материал71',
      numInOrder: 15,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_007.uuid,
      unitMeasurementUuid: FIELD_UNIT_MEASUREMENT_10.uuid,
      responsiblePartnerUuid: RESPONSIBLE_PARTNER_PRODUCER_3.uuid,
    },
  });

  const MATERIAL_UNIT_081 = await prisma?.material?.create({
    data: {
      name: 'Материал1 из Тест8',
      comment: 'Материал1 из Тест8',
      price: 22,
      namePublic: 'Материал81',
      numInOrder: 16,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_008.uuid,
      unitMeasurementUuid: FIELD_UNIT_MEASUREMENT_10.uuid,
      responsiblePartnerUuid: RESPONSIBLE_PARTNER_PRODUCER_3.uuid,
    },
  });

  const MATERIAL_UNIT_091 = await prisma?.material?.create({
    data: {
      name: 'Материал1 из Тест9',
      comment: 'Материал1 из Тест9',
      price: 22,
      namePublic: 'Материал91',
      numInOrder: 17,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_009.uuid,
      unitMeasurementUuid: FIELD_UNIT_MEASUREMENT_10.uuid,
      responsiblePartnerUuid: RESPONSIBLE_PARTNER_PRODUCER_3.uuid,
    },
  });

  const MATERIAL_UNIT_0101 = await prisma?.material?.create({
    data: {
      name: 'Материал1 из Тест10',
      comment: 'Материал1 из Тест10',
      price: 22,
      namePublic: 'Материал101',
      numInOrder: 18,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_010.uuid,
      unitMeasurementUuid: FIELD_UNIT_MEASUREMENT_10.uuid,
      responsiblePartnerUuid: RESPONSIBLE_PARTNER_PRODUCER_3.uuid,
    },
  });

  const MATERIAL_UNIT_0102 = await prisma?.material?.create({
    data: {
      name: 'Материал2 из Тест10',
      comment: 'Материал2 из Тест10',
      price: 22,
      namePublic: 'Материал102',
      numInOrder: 19,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_010.uuid,
      unitMeasurementUuid: FIELD_UNIT_MEASUREMENT_10.uuid,
      responsiblePartnerUuid: RESPONSIBLE_PARTNER_PRODUCER_3.uuid,
    },
  });

  const MATERIAL_UNIT_0103 = await prisma?.material?.create({
    data: {
      name: 'Материал3 из Тест10',
      comment: 'Материал3 из Тест10',
      price: 22,
      namePublic: 'Материал103',
      numInOrder: 20,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_010.uuid,
      unitMeasurementUuid: FIELD_UNIT_MEASUREMENT_10.uuid,
      responsiblePartnerUuid: RESPONSIBLE_PARTNER_PRODUCER_3.uuid,
    },
  });
  //endregion

  // DOC UPDATE MATERIAL обновляем имя материала согласно характеристикам и шаблону категории
  // region UPDATED_MATERIAL
  const newNameGluhar = await templateNameMapper(prisma, MATERIAL_UNIT_0);
  const newNameFanera = await templateNameMapper(prisma, MATERIAL_UNIT_1);
  const newNameMetiz2 = await templateNameMapper(prisma, MATERIAL_UNIT_METIZ2);
  const newNameListovoi1 = await templateNameMapper(prisma, MATERIAL_UNIT_LISTOVOI1);
  const newNameListovoi2 = await templateNameMapper(prisma, MATERIAL_UNIT_LISTOVOI2);

  const newNameWindow1 = await templateNameMapper(prisma, MATERIAL_UNIT_106);
  const newNameWindow2 = await templateNameMapper(prisma, MATERIAL_UNIT_107);
  const newNameWindow3 = await templateNameMapper(prisma, MATERIAL_UNIT_108);
  const newNameWindow4 = await templateNameMapper(prisma, MATERIAL_UNIT_109);

  const UPDATED_MATERIAL_GLUHAR = await prisma?.material?.update({
    where: {
      uuid: MATERIAL_UNIT_0.uuid,
    },
    data: {
      name: newNameGluhar,
    },
  });

  const UPDATED_MATERIAL_FANERA = await prisma?.material?.update({
    where: {
      uuid: MATERIAL_UNIT_1.uuid,
    },
    data: {
      name: newNameFanera,
    },
  });

  const UPDATED_MATERIAL_METIZ2 = await prisma?.material?.update({
    where: {
      uuid: MATERIAL_UNIT_METIZ2.uuid,
    },
    data: {
      name: newNameMetiz2,
    },
  });

  const UPDATED_MATERIAL_WINDOW1 = await prisma?.material?.update({
    where: {
      uuid: MATERIAL_UNIT_106.uuid,
    },
    data: {
      name: newNameWindow1,
    },
  });

  const UPDATED_MATERIAL_WINDOW2 = await prisma?.material?.update({
    where: {
      uuid: MATERIAL_UNIT_107.uuid,
    },
    data: {
      name: newNameWindow2,
    },
  });

  const UPDATED_MATERIAL_WINDOW3 = await prisma?.material?.update({
    where: {
      uuid: MATERIAL_UNIT_108.uuid,
    },
    data: {
      name: newNameWindow3,
    },
  });

  const UPDATED_MATERIAL_WINDOW4 = await prisma?.material?.update({
    where: {
      uuid: MATERIAL_UNIT_109.uuid,
    },
    data: {
      name: newNameWindow4,
    },
  });

  const UPDATED_MATERIAL_LISTOVOI1 = await prisma?.material?.update({
    where: {
      uuid: MATERIAL_UNIT_LISTOVOI1.uuid,
    },
    data: {
      name: newNameListovoi1,
    },
  });

  const UPDATED_MATERIAL_LISTOVOI2 = await prisma?.material?.update({
    where: {
      uuid: MATERIAL_UNIT_LISTOVOI2.uuid,
    },
    data: {
      name: newNameListovoi2,
    },
  });
  //endregion

  //DOC Базовый сидинг закончен. Демо-сметы создаются отдельной идемпотентной функцией
  //DOC seedEstimatesDemo() — она запускается ПОСЛЕ main() и работает даже на уже засеянной БД.
}

const round = (value: number) => Math.round(value * 100) / 100;

/**
 * Идемпотентно создаёт демо-сметы (UnitTemplate + ConstructionPie + Estimate со всеми 3 типами строк).
 * Запускается всегда, в т.ч. на уже засеянной БД (где основной main() выходит на early-exit).
 * Если объект уже существует (по name + parent), — пропускает создание.
 */
async function seedEstimatesDemo(): Promise<void> {
  // 1. Найти manager1 и его handbook/проект.
  const manager1 = await prisma.user.findUnique({ where: { email: 'manager1@mail.ru' } });
  if (!manager1?.handbookManagerUuid) {
    // eslint-disable-next-line no-console
    console.warn('[seed] manager1 не найден или не имеет handbook — демо-сметы пропущены.');
    return;
  }
  const handbook = await prisma.handbook.findUnique({
    where: { uuid: manager1.handbookManagerUuid },
  });
  if (!handbook) {
    // eslint-disable-next-line no-console
    console.warn('[seed] handbook manager1 не найден — демо-сметы пропущены.');
    return;
  }
  const demoProject = await prisma.project.findFirst({
    where: { responsibleManagerUuid: manager1.uuid, name: 'Лучи - дом №1.2.1' },
  });
  if (!demoProject) {
    // eslint-disable-next-line no-console
    console.warn('[seed] Проект "Лучи - дом №1.2.1" не найден — демо-сметы пропущены.');
    return;
  }
  // Любой материал handbook'а для строки 1 (опционально — если нет, поле materialUuid останется null).
  const anyMaterial = await prisma.material.findFirst({
    where: { categoryMaterial: { handbookUuid: handbook.uuid } },
  });

  // 2. UnitTemplate «Монтаж окна ПВХ 1 м²» — создать, если ещё нет.
  const UNIT_TEMPLATE_NAME = 'Монтаж окна ПВХ 1 м²';
  let unitTemplate = await prisma.unitTemplate.findFirst({
    where: { name: UNIT_TEMPLATE_NAME, handbookUuid: handbook.uuid },
  });
  if (!unitTemplate) {
    unitTemplate = await prisma.unitTemplate.create({
      data: {
        name: UNIT_TEMPLATE_NAME,
        description: 'Демо-единичка: окно + работа монтажа на 1 м² проёма',
        unitMeasurement: 'м²',
        defaultMarkupPercent: 30,
        handbookUuid: handbook.uuid,
        lastChangeByUserUuid: manager1.uuid,
        components: {
          create: [
            {
              orderIndex: 0,
              itemType: 'MATERIAL',
              name: 'Окно ПВХ 60-серия',
              unitMeasurement: 'шт',
              quantityPerUnit: 1,
              unitCost: 8500,
              comment: null,
            },
            {
              orderIndex: 1,
              itemType: 'WORK',
              name: 'Монтаж и регулировка окна',
              unitMeasurement: 'ч',
              quantityPerUnit: 0.5,
              unitCost: 1500,
              comment: null,
            },
          ],
        },
      },
    });
    const unitCost = round(1 * 8500 + 0.5 * 1500);
    unitTemplate = await prisma.unitTemplate.update({
      where: { uuid: unitTemplate.uuid },
      data: { unitCost, unitClientPrice: round(unitCost * 1.3) },
    });
  }
  const DEMO_UT1_UNIT_COST = unitTemplate.unitCost || round(1 * 8500 + 0.5 * 1500);

  // 3. ConstructionPie «Тёплый пол со стяжкой 100 мм» — создать, если ещё нет.
  const PIE_NAME = 'Тёплый пол со стяжкой 100 мм';
  let pie = await prisma.constructionPie.findFirst({
    where: { name: PIE_NAME, handbookUuid: handbook.uuid },
  });
  if (!pie) {
    pie = await prisma.constructionPie.create({
      data: {
        name: PIE_NAME,
        description: 'Демо-пирог: XPS 50мм + цементная стяжка 50мм с тёплым полом',
        unitMeasurement: 'м²',
        defaultMarkupPercent: 25,
        handbookUuid: handbook.uuid,
        lastChangeByUserUuid: manager1.uuid,
        layers: {
          create: [
            {
              orderIndex: 0,
              name: 'Пенополистирол XPS',
              thickness: 50,
              density: 35,
              consumptionPerM2: 0.05,
              unitMeasurement: 'м³',
              unitCost: 3500,
              comment: null,
            },
            {
              orderIndex: 1,
              name: 'Цементно-песчаная стяжка',
              thickness: 50,
              density: 2000,
              consumptionPerM2: 100,
              unitMeasurement: 'кг',
              unitCost: 8,
              comment: null,
            },
          ],
        },
      },
    });
    const pieUnitCost = round(0.05 * 3500 + 100 * 8);
    pie = await prisma.constructionPie.update({
      where: { uuid: pie.uuid },
      data: {
        unitCost: pieUnitCost,
        unitClientPrice: round(pieUnitCost * 1.25),
        totalThickness: 100,
      },
    });
  }
  const DEMO_PIE1_UNIT_COST = pie.unitCost || round(0.05 * 3500 + 100 * 8);

  // 4. Demo Estimate — если уже есть, пропустить полностью (вместе с секцией и строками).
  const ESTIMATE_NAME = 'Демо-смета — все типы строк';
  const existingEstimate = await prisma.estimate.findFirst({
    where: { name: ESTIMATE_NAME, projectUuid: demoProject.uuid },
  });
  if (existingEstimate) {
    // eslint-disable-next-line no-console
    console.log(`[seed] Демо-смета "${ESTIMATE_NAME}" уже существует — пропускаем.`);
    return;
  }

  const DEMO_ESTIMATE = await prisma.estimate.create({
    data: {
      name: ESTIMATE_NAME,
      description: 'Тестовая смета с примерами всех типов: материал, работа, единичка, пирог',
      defaultMarkupPercent: 17,
      projectUuid: demoProject.uuid,
      lastChangeByUserUuid: manager1.uuid,
    },
  });

  const DEMO_SECTION_1 = await prisma.estimateSection.create({
    data: {
      name: '1. Демонстрация всех типов строк',
      orderIndex: 0,
      estimateUuid: DEMO_ESTIMATE.uuid,
    },
  });

  // Строка 1: материал из справочника (фанера)
  const item1Quantity = 364.7;
  const item1UnitCost = 348;
  const item1Markup = 17;
  const item1UnitClient = round(item1UnitCost * (1 + item1Markup / 100));
  const item1TotalCost = round(item1Quantity * item1UnitCost);
  const item1TotalClient = round(item1Quantity * item1UnitClient);
  await prisma.estimateItem.create({
    data: {
      orderIndex: 0,
      itemType: 'MATERIAL',
      sectionUuid: DEMO_SECTION_1.uuid,
      materialUuid: anyMaterial?.uuid ?? null,
      name: 'Фанера ФСФ 18мм (демо-материал)',
      unitMeasurement: 'м²',
      quantity: item1Quantity,
      unitCost: item1UnitCost,
      markupPercent: item1Markup,
      unitClientPrice: item1UnitClient,
      totalCost: item1TotalCost,
      totalClientPrice: item1TotalClient,
    },
  });

  // Строка 2: единичка (snapshot из шаблона)
  const item2Quantity = 5;
  const item2Markup = 30;
  const item2UnitClient = round(DEMO_UT1_UNIT_COST * (1 + item2Markup / 100));
  const item2TotalCost = round(item2Quantity * DEMO_UT1_UNIT_COST);
  const item2TotalClient = round(item2Quantity * item2UnitClient);
  await prisma.estimateItem.create({
    data: {
      orderIndex: 1,
      itemType: 'UNIT',
      sectionUuid: DEMO_SECTION_1.uuid,
      unitTemplateUuid: unitTemplate.uuid,
      name: unitTemplate.name,
      unitMeasurement: unitTemplate.unitMeasurement,
      quantity: item2Quantity,
      unitCost: DEMO_UT1_UNIT_COST,
      markupPercent: item2Markup,
      unitClientPrice: item2UnitClient,
      totalCost: item2TotalCost,
      totalClientPrice: item2TotalClient,
      components: {
        create: [
          {
            orderIndex: 0,
            itemType: 'MATERIAL',
            name: 'Окно ПВХ 60-серия',
            unitMeasurement: 'шт',
            quantityPerUnit: 1,
            unitCost: 8500,
            totalCost: round(1 * item2Quantity * 8500),
          },
          {
            orderIndex: 1,
            itemType: 'WORK',
            name: 'Монтаж и регулировка окна',
            unitMeasurement: 'ч',
            quantityPerUnit: 0.5,
            unitCost: 1500,
            totalCost: round(0.5 * item2Quantity * 1500),
          },
        ],
      },
    },
  });

  // Строка 3: пирог (snapshot слоёв)
  const item3Quantity = 30;
  const item3Markup = 25;
  const item3UnitClient = round(DEMO_PIE1_UNIT_COST * (1 + item3Markup / 100));
  const item3TotalCost = round(item3Quantity * DEMO_PIE1_UNIT_COST);
  const item3TotalClient = round(item3Quantity * item3UnitClient);
  await prisma.estimateItem.create({
    data: {
      orderIndex: 2,
      itemType: 'PIE',
      sectionUuid: DEMO_SECTION_1.uuid,
      constructionPieUuid: pie.uuid,
      name: pie.name,
      unitMeasurement: pie.unitMeasurement,
      quantity: item3Quantity,
      unitCost: DEMO_PIE1_UNIT_COST,
      markupPercent: item3Markup,
      unitClientPrice: item3UnitClient,
      totalCost: item3TotalCost,
      totalClientPrice: item3TotalClient,
      pieLayers: {
        create: [
          {
            orderIndex: 0,
            name: 'Пенополистирол XPS',
            thickness: 50,
            density: 35,
            consumptionPerM2: 0.05,
            unitMeasurement: 'м³',
            unitCost: 3500,
            totalCost: round(0.05 * item3Quantity * 3500),
          },
          {
            orderIndex: 1,
            name: 'Цементно-песчаная стяжка',
            thickness: 50,
            density: 2000,
            consumptionPerM2: 100,
            unitMeasurement: 'кг',
            unitCost: 8,
            totalCost: round(100 * item3Quantity * 8),
          },
        ],
      },
    },
  });

  // Строка 4: кастомная работа (без справочника)
  const item4Quantity = 10;
  const item4UnitCost = 2500;
  const item4Markup = 20;
  const item4UnitClient = round(item4UnitCost * (1 + item4Markup / 100));
  const item4TotalCost = round(item4Quantity * item4UnitCost);
  const item4TotalClient = round(item4Quantity * item4UnitClient);
  await prisma.estimateItem.create({
    data: {
      orderIndex: 3,
      itemType: 'WORK',
      sectionUuid: DEMO_SECTION_1.uuid,
      name: 'Прочие отделочные работы',
      unitMeasurement: 'ч',
      quantity: item4Quantity,
      unitCost: item4UnitCost,
      markupPercent: item4Markup,
      unitClientPrice: item4UnitClient,
      totalCost: item4TotalCost,
      totalClientPrice: item4TotalClient,
    },
  });

  // Финальный пересчёт totals секции и сметы (чтобы цифры на UI совпали сразу)
  const sectionTotalCost = round(item1TotalCost + item2TotalCost + item3TotalCost + item4TotalCost);
  const sectionTotalClient = round(
    item1TotalClient + item2TotalClient + item3TotalClient + item4TotalClient,
  );
  await prisma.estimateSection.update({
    where: { uuid: DEMO_SECTION_1.uuid },
    data: {
      sectionTotalCost,
      sectionTotalClientPrice: sectionTotalClient,
    },
  });
  await prisma.estimate.update({
    where: { uuid: DEMO_ESTIMATE.uuid },
    data: {
      totalCost: sectionTotalCost,
      totalClientPrice: sectionTotalClient,
    },
  });

  // eslint-disable-next-line no-console
  console.log(
    `[seed] Демо-смета "${DEMO_ESTIMATE.name}" создана в проекте "${demoProject.name}": ` +
      `${sectionTotalCost} ₽ → ${sectionTotalClient} ₽`,
  );
}

/**
 * Идемпотентно дополняет справочник реалистичными единичками и пирогами
 * (штукатурка, плитка, ламинат, стяжка, перегородка из газоблока).
 * Возвращает карту uuid'ов, доступных для использования в `seedRealisticRenovationEstimate`.
 */
async function seedRealisticHandbookTemplates(handbookUuid: string, managerUuid: string) {
  // ————— Единичка «Штукатурка стен гипсовая 10мм» —————
  const UT_PLASTER_NAME = 'Штукатурка стен гипсовая 10 мм, 1 м²';
  let plaster = await prisma.unitTemplate.findFirst({
    where: { name: UT_PLASTER_NAME, handbookUuid },
  });
  if (!plaster) {
    plaster = await prisma.unitTemplate.create({
      data: {
        name: UT_PLASTER_NAME,
        description: 'Штукатурная смесь Ротбанд + работа маяков и набрызга',
        unitMeasurement: 'м²',
        defaultMarkupPercent: 25,
        handbookUuid,
        lastChangeByUserUuid: managerUuid,
        components: {
          create: [
            { orderIndex: 0, itemType: 'MATERIAL', name: 'Штукатурка Ротбанд 30 кг', unitMeasurement: 'кг', quantityPerUnit: 8, unitCost: 22 },
            { orderIndex: 1, itemType: 'MATERIAL', name: 'Маяки штукатурные 3 м', unitMeasurement: 'шт', quantityPerUnit: 0.35, unitCost: 45 },
            { orderIndex: 2, itemType: 'WORK', name: 'Оштукатуривание по маякам', unitMeasurement: 'ч', quantityPerUnit: 0.6, unitCost: 1200 },
          ],
        },
      },
    });
    const cost = round(8 * 22 + 0.35 * 45 + 0.6 * 1200);
    plaster = await prisma.unitTemplate.update({
      where: { uuid: plaster.uuid },
      data: { unitCost: cost, unitClientPrice: round(cost * 1.25) },
    });
  }

  // ————— Единичка «Укладка керамической плитки» —————
  const UT_TILE_NAME = 'Укладка керамогранита на пол, 1 м²';
  let tile = await prisma.unitTemplate.findFirst({
    where: { name: UT_TILE_NAME, handbookUuid },
  });
  if (!tile) {
    tile = await prisma.unitTemplate.create({
      data: {
        name: UT_TILE_NAME,
        description: 'Керамогранит 60×60 + клей Ceresit CM11 + затирка + работа',
        unitMeasurement: 'м²',
        defaultMarkupPercent: 30,
        handbookUuid,
        lastChangeByUserUuid: managerUuid,
        components: {
          create: [
            { orderIndex: 0, itemType: 'MATERIAL', name: 'Керамогранит 60×60', unitMeasurement: 'м²', quantityPerUnit: 1.08, unitCost: 1450 },
            { orderIndex: 1, itemType: 'MATERIAL', name: 'Клей плиточный Ceresit CM11', unitMeasurement: 'кг', quantityPerUnit: 5, unitCost: 38 },
            { orderIndex: 2, itemType: 'MATERIAL', name: 'Затирка швов Ceresit CE40', unitMeasurement: 'кг', quantityPerUnit: 0.4, unitCost: 110 },
            { orderIndex: 3, itemType: 'MATERIAL', name: 'Крестики плиточные 2 мм', unitMeasurement: 'упак', quantityPerUnit: 0.05, unitCost: 85 },
            { orderIndex: 4, itemType: 'WORK', name: 'Укладка керамогранита с раскроем', unitMeasurement: 'ч', quantityPerUnit: 1.2, unitCost: 1500 },
          ],
        },
      },
    });
    const cost = round(1.08 * 1450 + 5 * 38 + 0.4 * 110 + 0.05 * 85 + 1.2 * 1500);
    tile = await prisma.unitTemplate.update({
      where: { uuid: tile.uuid },
      data: { unitCost: cost, unitClientPrice: round(cost * 1.3) },
    });
  }

  // ————— Единичка «Укладка ламината 33 класс» —————
  const UT_LAMINATE_NAME = 'Укладка ламината 33 класс с подложкой, 1 м²';
  let laminate = await prisma.unitTemplate.findFirst({
    where: { name: UT_LAMINATE_NAME, handbookUuid },
  });
  if (!laminate) {
    laminate = await prisma.unitTemplate.create({
      data: {
        name: UT_LAMINATE_NAME,
        description: 'Ламинат + подложка 2 мм + плёнка + работа укладки',
        unitMeasurement: 'м²',
        defaultMarkupPercent: 28,
        handbookUuid,
        lastChangeByUserUuid: managerUuid,
        components: {
          create: [
            { orderIndex: 0, itemType: 'MATERIAL', name: 'Ламинат 33 класс 12 мм', unitMeasurement: 'м²', quantityPerUnit: 1.05, unitCost: 1250 },
            { orderIndex: 1, itemType: 'MATERIAL', name: 'Подложка XPS 2 мм', unitMeasurement: 'м²', quantityPerUnit: 1.02, unitCost: 110 },
            { orderIndex: 2, itemType: 'MATERIAL', name: 'Плёнка пароизоляционная', unitMeasurement: 'м²', quantityPerUnit: 1.05, unitCost: 35 },
            { orderIndex: 3, itemType: 'WORK', name: 'Укладка ламината', unitMeasurement: 'ч', quantityPerUnit: 0.4, unitCost: 900 },
          ],
        },
      },
    });
    const cost = round(1.05 * 1250 + 1.02 * 110 + 1.05 * 35 + 0.4 * 900);
    laminate = await prisma.unitTemplate.update({
      where: { uuid: laminate.uuid },
      data: { unitCost: cost, unitClientPrice: round(cost * 1.28) },
    });
  }

  // ————— Пирог «Перегородка из газоблока 100 мм + штукатурка двусторонняя» —————
  const PIE_WALL_NAME = 'Перегородка из газоблока 100 мм + двусторонняя штукатурка';
  let wallPie = await prisma.constructionPie.findFirst({
    where: { name: PIE_WALL_NAME, handbookUuid },
  });
  if (!wallPie) {
    wallPie = await prisma.constructionPie.create({
      data: {
        name: PIE_WALL_NAME,
        description: 'Перегородка на 1 м²: газоблок D500 100 мм + штукатурка по 10 мм с двух сторон',
        unitMeasurement: 'м²',
        defaultMarkupPercent: 22,
        handbookUuid,
        lastChangeByUserUuid: managerUuid,
        layers: {
          create: [
            { orderIndex: 0, name: 'Газоблок D500 100×250×625', thickness: 100, density: 500, consumptionPerM2: 6.5, unitMeasurement: 'шт', unitCost: 180 },
            { orderIndex: 1, name: 'Клей для газоблока', thickness: 0, density: 0, consumptionPerM2: 3, unitMeasurement: 'кг', unitCost: 25 },
            { orderIndex: 2, name: 'Штукатурка Ротбанд (с двух сторон)', thickness: 20, density: 0, consumptionPerM2: 16, unitMeasurement: 'кг', unitCost: 22 },
          ],
        },
      },
    });
    const unitCost = round(6.5 * 180 + 3 * 25 + 16 * 22);
    wallPie = await prisma.constructionPie.update({
      where: { uuid: wallPie.uuid },
      data: { unitCost, unitClientPrice: round(unitCost * 1.22), totalThickness: 120 },
    });
  }

  return { plaster, tile, laminate, wallPie };
}

/**
 * Идемпотентно создаёт реалистичную демо-смету на ремонт квартиры 40 м² —
 * 6 разделов, 25+ строк разных типов. Если смета с таким именем уже есть — пропускает.
 */
async function seedRealisticRenovationEstimate(
  projectUuid: string,
  handbookUuid: string,
  managerUuid: string,
  templates: Awaited<ReturnType<typeof seedRealisticHandbookTemplates>>,
  firstBaseUnitTemplateUuid: string,
): Promise<void> {
  const ESTIMATE_NAME = 'Демо — ремонт однокомнатной квартиры 40 м²';
  const existing = await prisma.estimate.findFirst({
    where: { name: ESTIMATE_NAME, projectUuid },
  });
  if (existing) {
    // eslint-disable-next-line no-console
    console.log(`[seed] Реалистичная демо-смета "${ESTIMATE_NAME}" уже существует — пропускаем.`);
    return;
  }

  const { plaster, tile, laminate, wallPie } = templates;
  const defaultMarkup = 20;

  const estimate = await prisma.estimate.create({
    data: {
      name: ESTIMATE_NAME,
      description: 'Полный цикл ремонта: демонтаж → черновая → инженерия → чистовая отделка. 6 разделов, 25+ строк.',
      defaultMarkupPercent: defaultMarkup,
      projectUuid,
      lastChangeByUserUuid: managerUuid,
    },
  });

  // Каждая строка считается единообразно:
  const makeItem = (args: {
    orderIndex: number;
    itemType: 'MATERIAL' | 'MECHANISM' | 'WORK' | 'OVERHEAD' | 'UNIT' | 'PIE';
    name: string;
    unitMeasurement: string;
    quantity: number;
    unitCost: number;
    markupPercent?: number;
    unitTemplateUuid?: string | null;
    constructionPieUuid?: string | null;
    comment?: string | null;
  }) => {
    const markup = args.markupPercent ?? defaultMarkup;
    const unitClientPrice = round(args.unitCost * (1 + markup / 100));
    return {
      orderIndex: args.orderIndex,
      itemType: args.itemType,
      name: args.name,
      unitMeasurement: args.unitMeasurement,
      quantity: args.quantity,
      unitCost: args.unitCost,
      markupPercent: markup,
      unitClientPrice,
      totalCost: round(args.quantity * args.unitCost),
      totalClientPrice: round(args.quantity * unitClientPrice),
      unitTemplateUuid: args.unitTemplateUuid ?? null,
      constructionPieUuid: args.constructionPieUuid ?? null,
      comment: args.comment ?? null,
    };
  };

  type SectionPlan = {
    name: string;
    items: ReturnType<typeof makeItem>[];
    /** Для UNIT/PIE прикладываем "снэпшот" компонентов/слоёв через вложенные writes. */
    componentsByOrderIndex?: Record<number, { orderIndex: number; itemType: 'MATERIAL' | 'MECHANISM' | 'WORK' | 'OVERHEAD'; name: string; unitMeasurement: string; quantityPerUnit: number; unitCost: number; totalCost: number }[]>;
    pieLayersByOrderIndex?: Record<number, { orderIndex: number; name: string; thickness: number; density: number; consumptionPerM2: number; unitMeasurement: string; unitCost: number; totalCost: number }[]>;
  };

  // —————————— РАЗДЕЛ 1. Демонтажные работы ——————————
  const section1: SectionPlan = {
    name: 'Демонтажные работы',
    items: [
      makeItem({ orderIndex: 0, itemType: 'WORK', name: 'Демонтаж обоев со стен', unitMeasurement: 'м²', quantity: 80, unitCost: 120 }),
      makeItem({ orderIndex: 1, itemType: 'WORK', name: 'Демонтаж ламината и подложки', unitMeasurement: 'м²', quantity: 35, unitCost: 95 }),
      makeItem({ orderIndex: 2, itemType: 'WORK', name: 'Демонтаж плитки в санузле', unitMeasurement: 'м²', quantity: 18, unitCost: 450 }),
      makeItem({ orderIndex: 3, itemType: 'WORK', name: 'Демонтаж старой сантехники (унитаз/ванна/смесители)', unitMeasurement: 'комплект', quantity: 1, unitCost: 3500 }),
      makeItem({ orderIndex: 4, itemType: 'MECHANISM', name: 'Вынос строительного мусора (контейнер 8 м³)', unitMeasurement: 'услуга', quantity: 1, unitCost: 12000 }),
    ],
  };

  // —————————— РАЗДЕЛ 2. Черновые и подготовительные ——————————
  // Item index 2 использует единичку штукатурки, index 3 — пирог стены
  const plasterQuantity = 65; // стены кухня+комната под штукатурку
  const wallQuantity = 4.5; // перегородка — м²
  const plasterMarkup = plaster.defaultMarkupPercent;
  const wallMarkup = wallPie.defaultMarkupPercent;
  const section2: SectionPlan = {
    name: 'Черновые и подготовительные работы',
    items: [
      makeItem({ orderIndex: 0, itemType: 'MATERIAL', name: 'Грунтовка Ceresit CT17 (10 л)', unitMeasurement: 'кан', quantity: 4, unitCost: 1350 }),
      makeItem({ orderIndex: 1, itemType: 'WORK', name: 'Грунтование стен и потолка', unitMeasurement: 'м²', quantity: 120, unitCost: 85 }),
      makeItem({
        orderIndex: 2,
        itemType: 'UNIT',
        name: plaster.name,
        unitMeasurement: plaster.unitMeasurement,
        quantity: plasterQuantity,
        unitCost: plaster.unitCost,
        markupPercent: plasterMarkup,
        unitTemplateUuid: plaster.uuid,
      }),
      makeItem({
        orderIndex: 3,
        itemType: 'PIE',
        name: wallPie.name,
        unitMeasurement: wallPie.unitMeasurement,
        quantity: wallQuantity,
        unitCost: wallPie.unitCost,
        markupPercent: wallMarkup,
        constructionPieUuid: wallPie.uuid,
      }),
      makeItem({ orderIndex: 4, itemType: 'MATERIAL', name: 'Профиль для гипсокартона UD+CD', unitMeasurement: 'м.п.', quantity: 35, unitCost: 95 }),
      makeItem({ orderIndex: 5, itemType: 'MATERIAL', name: 'Лист ГКЛ 12.5 мм', unitMeasurement: 'лист', quantity: 8, unitCost: 520 }),
    ],
    componentsByOrderIndex: {
      2: [
        { orderIndex: 0, itemType: 'MATERIAL', name: 'Штукатурка Ротбанд 30 кг', unitMeasurement: 'кг', quantityPerUnit: 8, unitCost: 22, totalCost: round(8 * plasterQuantity * 22) },
        { orderIndex: 1, itemType: 'MATERIAL', name: 'Маяки штукатурные 3 м', unitMeasurement: 'шт', quantityPerUnit: 0.35, unitCost: 45, totalCost: round(0.35 * plasterQuantity * 45) },
        { orderIndex: 2, itemType: 'WORK', name: 'Оштукатуривание по маякам', unitMeasurement: 'ч', quantityPerUnit: 0.6, unitCost: 1200, totalCost: round(0.6 * plasterQuantity * 1200) },
      ],
    },
    pieLayersByOrderIndex: {
      3: [
        { orderIndex: 0, name: 'Газоблок D500 100×250×625', thickness: 100, density: 500, consumptionPerM2: 6.5, unitMeasurement: 'шт', unitCost: 180, totalCost: round(6.5 * wallQuantity * 180) },
        { orderIndex: 1, name: 'Клей для газоблока', thickness: 0, density: 0, consumptionPerM2: 3, unitMeasurement: 'кг', unitCost: 25, totalCost: round(3 * wallQuantity * 25) },
        { orderIndex: 2, name: 'Штукатурка Ротбанд (с двух сторон)', thickness: 20, density: 0, consumptionPerM2: 16, unitMeasurement: 'кг', unitCost: 22, totalCost: round(16 * wallQuantity * 22) },
      ],
    },
  };

  // —————————— РАЗДЕЛ 3. Электромонтаж ——————————
  const section3: SectionPlan = {
    name: 'Электромонтажные работы',
    items: [
      makeItem({ orderIndex: 0, itemType: 'MATERIAL', name: 'Кабель ВВГнг 3×2.5', unitMeasurement: 'м.п.', quantity: 120, unitCost: 95, markupPercent: 15 }),
      makeItem({ orderIndex: 1, itemType: 'MATERIAL', name: 'Кабель ВВГнг 3×1.5 (освещение)', unitMeasurement: 'м.п.', quantity: 60, unitCost: 68, markupPercent: 15 }),
      makeItem({ orderIndex: 2, itemType: 'MATERIAL', name: 'Гофротруба ПВХ Ø16', unitMeasurement: 'м.п.', quantity: 180, unitCost: 18 }),
      makeItem({ orderIndex: 3, itemType: 'MATERIAL', name: 'Розетка Schneider AtlasDesign', unitMeasurement: 'шт', quantity: 14, unitCost: 320 }),
      makeItem({ orderIndex: 4, itemType: 'MATERIAL', name: 'Выключатель Schneider AtlasDesign', unitMeasurement: 'шт', quantity: 6, unitCost: 310 }),
      makeItem({ orderIndex: 5, itemType: 'MATERIAL', name: 'Подрозетник монтажный', unitMeasurement: 'шт', quantity: 20, unitCost: 35 }),
      makeItem({ orderIndex: 6, itemType: 'MATERIAL', name: 'Автомат C16 ABB', unitMeasurement: 'шт', quantity: 6, unitCost: 450 }),
      makeItem({ orderIndex: 7, itemType: 'MATERIAL', name: 'УЗО 40А/30мА ABB', unitMeasurement: 'шт', quantity: 2, unitCost: 2800 }),
      makeItem({ orderIndex: 8, itemType: 'WORK', name: 'Штробление стен под кабель', unitMeasurement: 'м.п.', quantity: 180, unitCost: 180 }),
      makeItem({ orderIndex: 9, itemType: 'WORK', name: 'Прокладка кабеля в штробе/гофре', unitMeasurement: 'м.п.', quantity: 180, unitCost: 95 }),
      makeItem({ orderIndex: 10, itemType: 'WORK', name: 'Установка и подключение розеток/выключателей', unitMeasurement: 'шт', quantity: 20, unitCost: 250 }),
      makeItem({ orderIndex: 11, itemType: 'WORK', name: 'Сборка щитка с автоматикой', unitMeasurement: 'услуга', quantity: 1, unitCost: 9500 }),
    ],
  };

  // —————————— РАЗДЕЛ 4. Сантехнические работы ——————————
  const section4: SectionPlan = {
    name: 'Сантехнические работы',
    items: [
      makeItem({ orderIndex: 0, itemType: 'MATERIAL', name: 'Полипропилен PN20 Ø25 (ГВС/ХВС)', unitMeasurement: 'м.п.', quantity: 35, unitCost: 85 }),
      makeItem({ orderIndex: 1, itemType: 'MATERIAL', name: 'Фитинги PPR (тройник, отвод, муфта)', unitMeasurement: 'комплект', quantity: 1, unitCost: 3800, comment: 'Расход по проекту' }),
      makeItem({ orderIndex: 2, itemType: 'MATERIAL', name: 'Коллектор водоснабжения 4-х выводной', unitMeasurement: 'шт', quantity: 2, unitCost: 2200 }),
      makeItem({ orderIndex: 3, itemType: 'MATERIAL', name: 'Кран шаровой 1/2"', unitMeasurement: 'шт', quantity: 8, unitCost: 420 }),
      makeItem({ orderIndex: 4, itemType: 'MATERIAL', name: 'Унитаз подвесной (комплект с инсталляцией)', unitMeasurement: 'комплект', quantity: 1, unitCost: 28500 }),
      makeItem({ orderIndex: 5, itemType: 'MATERIAL', name: 'Смеситель для раковины Grohe', unitMeasurement: 'шт', quantity: 1, unitCost: 12500 }),
      makeItem({ orderIndex: 6, itemType: 'MATERIAL', name: 'Смеситель для душа термостат', unitMeasurement: 'шт', quantity: 1, unitCost: 18900 }),
      makeItem({ orderIndex: 7, itemType: 'WORK', name: 'Штробление под трубы ХВС/ГВС/канализация', unitMeasurement: 'м.п.', quantity: 35, unitCost: 220 }),
      makeItem({ orderIndex: 8, itemType: 'WORK', name: 'Монтаж полипропиленовых труб со сваркой', unitMeasurement: 'м.п.', quantity: 35, unitCost: 280 }),
      makeItem({ orderIndex: 9, itemType: 'WORK', name: 'Установка и подключение сантехники', unitMeasurement: 'точка', quantity: 6, unitCost: 2500 }),
    ],
  };

  // —————————— РАЗДЕЛ 5. Чистовая отделка ——————————
  const laminateQuantity = 28;
  const tileQuantity = 18;
  const laminateMarkup = laminate.defaultMarkupPercent;
  const tileMarkup = tile.defaultMarkupPercent;
  const section5: SectionPlan = {
    name: 'Чистовая отделка',
    items: [
      makeItem({
        orderIndex: 0,
        itemType: 'UNIT',
        name: laminate.name,
        unitMeasurement: laminate.unitMeasurement,
        quantity: laminateQuantity,
        unitCost: laminate.unitCost,
        markupPercent: laminateMarkup,
        unitTemplateUuid: laminate.uuid,
      }),
      makeItem({
        orderIndex: 1,
        itemType: 'UNIT',
        name: tile.name,
        unitMeasurement: tile.unitMeasurement,
        quantity: tileQuantity,
        unitCost: tile.unitCost,
        markupPercent: tileMarkup,
        unitTemplateUuid: tile.uuid,
      }),
      makeItem({ orderIndex: 2, itemType: 'MATERIAL', name: 'Обои флизелиновые (рулон 10×1.06)', unitMeasurement: 'рулон', quantity: 14, unitCost: 2800 }),
      makeItem({ orderIndex: 3, itemType: 'MATERIAL', name: 'Клей обойный Metylan', unitMeasurement: 'пач', quantity: 5, unitCost: 680 }),
      makeItem({ orderIndex: 4, itemType: 'WORK', name: 'Поклейка обоев', unitMeasurement: 'м²', quantity: 80, unitCost: 280 }),
      makeItem({ orderIndex: 5, itemType: 'MATERIAL', name: 'Плинтус ПВХ 70 мм (2.5 м)', unitMeasurement: 'шт', quantity: 18, unitCost: 185 }),
      makeItem({ orderIndex: 6, itemType: 'WORK', name: 'Монтаж напольного плинтуса', unitMeasurement: 'м.п.', quantity: 45, unitCost: 120 }),
      makeItem({ orderIndex: 7, itemType: 'UNIT', name: 'Монтаж окна ПВХ 60-серии (витрина)', unitMeasurement: 'м²', quantity: 8.5, unitCost: 9250, markupPercent: 30, unitTemplateUuid: firstBaseUnitTemplateUuid }),
      makeItem({ orderIndex: 8, itemType: 'MATERIAL', name: 'Межкомнатная дверь ЛДСП (комплект с коробкой)', unitMeasurement: 'шт', quantity: 4, unitCost: 15500 }),
      makeItem({ orderIndex: 9, itemType: 'WORK', name: 'Установка межкомнатных дверей', unitMeasurement: 'шт', quantity: 4, unitCost: 4200 }),
    ],
    componentsByOrderIndex: {
      0: [
        { orderIndex: 0, itemType: 'MATERIAL', name: 'Ламинат 33 класс 12 мм', unitMeasurement: 'м²', quantityPerUnit: 1.05, unitCost: 1250, totalCost: round(1.05 * laminateQuantity * 1250) },
        { orderIndex: 1, itemType: 'MATERIAL', name: 'Подложка XPS 2 мм', unitMeasurement: 'м²', quantityPerUnit: 1.02, unitCost: 110, totalCost: round(1.02 * laminateQuantity * 110) },
        { orderIndex: 2, itemType: 'MATERIAL', name: 'Плёнка пароизоляционная', unitMeasurement: 'м²', quantityPerUnit: 1.05, unitCost: 35, totalCost: round(1.05 * laminateQuantity * 35) },
        { orderIndex: 3, itemType: 'WORK', name: 'Укладка ламината', unitMeasurement: 'ч', quantityPerUnit: 0.4, unitCost: 900, totalCost: round(0.4 * laminateQuantity * 900) },
      ],
      1: [
        { orderIndex: 0, itemType: 'MATERIAL', name: 'Керамогранит 60×60', unitMeasurement: 'м²', quantityPerUnit: 1.08, unitCost: 1450, totalCost: round(1.08 * tileQuantity * 1450) },
        { orderIndex: 1, itemType: 'MATERIAL', name: 'Клей плиточный Ceresit CM11', unitMeasurement: 'кг', quantityPerUnit: 5, unitCost: 38, totalCost: round(5 * tileQuantity * 38) },
        { orderIndex: 2, itemType: 'MATERIAL', name: 'Затирка швов Ceresit CE40', unitMeasurement: 'кг', quantityPerUnit: 0.4, unitCost: 110, totalCost: round(0.4 * tileQuantity * 110) },
        { orderIndex: 3, itemType: 'MATERIAL', name: 'Крестики плиточные 2 мм', unitMeasurement: 'упак', quantityPerUnit: 0.05, unitCost: 85, totalCost: round(0.05 * tileQuantity * 85) },
        { orderIndex: 4, itemType: 'WORK', name: 'Укладка керамогранита с раскроем', unitMeasurement: 'ч', quantityPerUnit: 1.2, unitCost: 1500, totalCost: round(1.2 * tileQuantity * 1500) },
      ],
      7: [
        { orderIndex: 0, itemType: 'MATERIAL', name: 'Окно ПВХ 60-серия', unitMeasurement: 'шт', quantityPerUnit: 1, unitCost: 8500, totalCost: round(1 * 8.5 * 8500) },
        { orderIndex: 1, itemType: 'WORK', name: 'Монтаж и регулировка окна', unitMeasurement: 'ч', quantityPerUnit: 0.5, unitCost: 1500, totalCost: round(0.5 * 8.5 * 1500) },
      ],
    },
  };

  // —————————— РАЗДЕЛ 6. Накладные и логистика ——————————
  const section6: SectionPlan = {
    name: 'Накладные расходы и логистика',
    items: [
      makeItem({ orderIndex: 0, itemType: 'OVERHEAD', name: 'Доставка материалов (грузовик 3.5 т, 6 ходок)', unitMeasurement: 'услуга', quantity: 6, unitCost: 4500, markupPercent: 0 }),
      makeItem({ orderIndex: 1, itemType: 'OVERHEAD', name: 'Подъём материалов на этаж (без лифта)', unitMeasurement: 'услуга', quantity: 1, unitCost: 18000, markupPercent: 0 }),
      makeItem({ orderIndex: 2, itemType: 'OVERHEAD', name: 'Расходные материалы (плёнка, скотч, перчатки)', unitMeasurement: 'пакет', quantity: 1, unitCost: 8500 }),
      makeItem({ orderIndex: 3, itemType: 'OVERHEAD', name: 'Клининг финишный (с мойкой окон)', unitMeasurement: 'услуга', quantity: 1, unitCost: 12500, markupPercent: 15 }),
      makeItem({ orderIndex: 4, itemType: 'OVERHEAD', name: 'Организация работ прораба', unitMeasurement: 'услуга', quantity: 1, unitCost: 35000, markupPercent: 10 }),
    ],
  };

  const sectionsPlan = [section1, section2, section3, section4, section5, section6];

  let globalTotalCost = 0;
  let globalTotalClient = 0;

  for (let sectionIdx = 0; sectionIdx < sectionsPlan.length; sectionIdx++) {
    const plan = sectionsPlan[sectionIdx];
    const section = await prisma.estimateSection.create({
      data: {
        name: plan.name,
        orderIndex: sectionIdx,
        estimateUuid: estimate.uuid,
      },
    });

    let sectionCost = 0;
    let sectionClient = 0;

    // Последовательно — чтобы данные для сопоставления orderIndex ↔ компоненты не путались.
    // eslint-disable-next-line no-restricted-syntax
    for (const item of plan.items) {
      const components = plan.componentsByOrderIndex?.[item.orderIndex] ?? [];
      const pieLayers = plan.pieLayersByOrderIndex?.[item.orderIndex] ?? [];
      // eslint-disable-next-line no-await-in-loop
      await prisma.estimateItem.create({
        data: {
          sectionUuid: section.uuid,
          orderIndex: item.orderIndex,
          itemType: item.itemType,
          unitTemplateUuid: item.unitTemplateUuid,
          constructionPieUuid: item.constructionPieUuid,
          name: item.name,
          unitMeasurement: item.unitMeasurement,
          quantity: item.quantity,
          unitCost: item.unitCost,
          markupPercent: item.markupPercent,
          unitClientPrice: item.unitClientPrice,
          totalCost: item.totalCost,
          totalClientPrice: item.totalClientPrice,
          comment: item.comment,
          components: components.length ? { create: components } : undefined,
          pieLayers: pieLayers.length ? { create: pieLayers } : undefined,
        },
      });
      sectionCost += item.totalCost;
      sectionClient += item.totalClientPrice;
    }

    await prisma.estimateSection.update({
      where: { uuid: section.uuid },
      data: {
        sectionTotalCost: round(sectionCost),
        sectionTotalClientPrice: round(sectionClient),
      },
    });

    globalTotalCost += sectionCost;
    globalTotalClient += sectionClient;
  }

  await prisma.estimate.update({
    where: { uuid: estimate.uuid },
    data: {
      totalCost: round(globalTotalCost),
      totalClientPrice: round(globalTotalClient),
    },
  });

  // eslint-disable-next-line no-console
  console.log(
    `[seed] Реалистичная демо-смета "${ESTIMATE_NAME}" создана: ` +
      `${round(globalTotalCost)} ₽ → ${round(globalTotalClient)} ₽ (${sectionsPlan.length} разделов).`,
  );
}

// execute the seed upload
main()
  .then(async () => {
    await seedEstimatesDemo();

    // После базовой демо-сметы дополняем справочник реалистичными шаблонами и создаём большую смету.
    const manager1 = await prisma.user.findUnique({ where: { email: 'manager1@mail.ru' } });
    if (manager1?.handbookManagerUuid) {
      const demoProject = await prisma.project.findFirst({
        where: { responsibleManagerUuid: manager1.uuid, name: 'Лучи - дом №1.2.1' },
      });
      const baseUnitTemplate = await prisma.unitTemplate.findFirst({
        where: { name: 'Монтаж окна ПВХ 1 м²', handbookUuid: manager1.handbookManagerUuid },
      });
      if (demoProject && baseUnitTemplate) {
        const handbookTemplates = await seedRealisticHandbookTemplates(
          manager1.handbookManagerUuid,
          manager1.uuid,
        );
        await seedRealisticRenovationEstimate(
          demoProject.uuid,
          manager1.handbookManagerUuid,
          manager1.uuid,
          handbookTemplates,
          baseUnitTemplate.uuid,
        );
      }
    }

    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
