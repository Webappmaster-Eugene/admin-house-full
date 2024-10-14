/* eslint-disable @typescript-eslint/no-unused-vars */

import { PrismaClient } from '.prisma/client';
import { templateNameMapper } from '../src/common/helpers/handlers/template-name-mapper.handler';
import { EApproveStatuses } from '@prisma/client';
import { fieldOfCategoryMaterialTemplateGenerator } from '../src/common/helpers/regex/fieldOfCategoryMaterialTemplateGenerator';

const prisma = new PrismaClient();

async function main() {
  //DOC ROLES - создаем все роли
  //region ROLES
  const ADMIN_ROLE = await prisma?.role?.create({
    data: {
      name: 'ADMIN',
      description: 'Админ всего ПО (приложения)',
    },
  });

  const MANAGER_ROLE = await prisma?.role?.create({
    data: {
      name: 'MANAGER',
      description: 'Менеджер проекта, руководитель организации',
    },
  });

  const WORKER_ROLE = await prisma?.role?.create({
    data: {
      name: 'WORKER',
      description: 'Сотрудник организации',
    },
  });

  const CUSTOMER_ROLE = await prisma?.role?.create({
    data: {
      name: 'CUSTOMER',
      description: 'Заказчик, покупатель',
    },
  });
  //endregion

  //DOC USERS - создаем всех пользователей кроме менеджера
  //region USERS
  const ADMIN_USER = await prisma?.user?.create({
    data: {
      email: 'admin1@mail.ru',
      password: '$argon2id$v=19$m=65536,t=3,p=4$3bpIaorqAZ434ppom9guDA$AZn9O+A25nMhB0r+D1FoTZX/RS/vhFiGVlpZCer9+ps',
      roles: {
        connect: [{ uuid: ADMIN_ROLE.uuid }],
      },
      firstName: 'Admin1',
      secondName: 'Starter1',
      phone: '+79999999911',
      info: 'Standard information',
    },
  });

  const WORKER_USER_1 = await prisma?.user?.create({
    data: {
      email: 'worker1@mail.ru',
      password: '$argon2id$v=19$m=65536,t=3,p=4$3bpIaorqAZ434ppom9guDA$AZn9O+A25nMhB0r+D1FoTZX/RS/vhFiGVlpZCer9+ps',
      roles: {
        connect: [{ uuid: WORKER_ROLE.uuid }],
      },
      firstName: 'Worker1',
      secondName: 'Starter1',
      phone: '+79999999931',
      info: 'Standard information',
    },
  });

  const WORKER_USER_2 = await prisma?.user?.create({
    data: {
      email: 'worker2@mail.ru',
      password: '$argon2id$v=19$m=65536,t=3,p=4$3bpIaorqAZ434ppom9guDA$AZn9O+A25nMhB0r+D1FoTZX/RS/vhFiGVlpZCer9+ps',
      roles: {
        connect: [{ uuid: WORKER_ROLE.uuid }],
      },
      firstName: 'Worker2',
      secondName: 'Starter2',
      phone: '+79999999932',
      info: 'Standard information',
    },
  });

  const WORKER_USER_3 = await prisma?.user?.create({
    data: {
      email: 'worker3@mail.ru',
      password: '$argon2id$v=19$m=65536,t=3,p=4$3bpIaorqAZ434ppom9guDA$AZn9O+A25nMhB0r+D1FoTZX/RS/vhFiGVlpZCer9+ps',
      roles: {
        connect: [{ uuid: WORKER_ROLE.uuid }],
      },
      firstName: 'Worker3',
      secondName: 'Starter3',
      phone: '+79999999933',
      info: 'Standard information',
    },
  });

  const WORKER_USER_4 = await prisma?.user?.create({
    data: {
      email: 'worker4@mail.ru',
      password: '$argon2id$v=19$m=65536,t=3,p=4$3bpIaorqAZ434ppom9guDA$AZn9O+A25nMhB0r+D1FoTZX/RS/vhFiGVlpZCer9+ps',
      roles: {
        connect: [{ uuid: WORKER_ROLE.uuid }],
      },
      firstName: 'Worker4',
      secondName: 'Starter4',
      phone: '+79999999934',
      info: 'Standard information',
    },
  });

  const CUSTOMER_USER_1 = await prisma?.user?.create({
    data: {
      email: 'customer1@mail.ru',
      password: '$argon2id$v=19$m=65536,t=3,p=4$3bpIaorqAZ434ppom9guDA$AZn9O+A25nMhB0r+D1FoTZX/RS/vhFiGVlpZCer9+ps',
      roles: {
        connect: [{ uuid: CUSTOMER_ROLE.uuid }],
      },
      firstName: 'Customer1',
      secondName: 'Starter1',
      phone: '+79999999941',
      info: 'Standard information',
    },
  });

  const CUSTOMER_USER_2 = await prisma?.user?.create({
    data: {
      email: 'customer2@mail.ru',
      password: '$argon2id$v=19$m=65536,t=3,p=4$3bpIaorqAZ434ppom9guDA$AZn9O+A25nMhB0r+D1FoTZX/RS/vhFiGVlpZCer9+ps',
      roles: {
        connect: [{ uuid: CUSTOMER_ROLE.uuid }],
      },
      firstName: 'Customer2',
      secondName: 'Starter2',
      phone: '+79999999942',
      info: 'Standard information',
    },
  });

  const CUSTOMER_USER_3 = await prisma?.user?.create({
    data: {
      email: 'customer3@mail.ru',
      password: '$argon2id$v=19$m=65536,t=3,p=4$3bpIaorqAZ434ppom9guDA$AZn9O+A25nMhB0r+D1FoTZX/RS/vhFiGVlpZCer9+ps',
      roles: {
        connect: [{ uuid: CUSTOMER_ROLE.uuid }],
      },
      firstName: 'Customer4',
      secondName: 'Starter4',
      phone: '+79999999943',
      info: 'Standard information',
    },
  });

  const CUSTOMER_USER_4 = await prisma?.user?.create({
    data: {
      email: 'customer4@mail.ru',
      password: '$argon2id$v=19$m=65536,t=3,p=4$3bpIaorqAZ434ppom9guDA$AZn9O+A25nMhB0r+D1FoTZX/RS/vhFiGVlpZCer9+ps',
      roles: {
        connect: [{ uuid: CUSTOMER_ROLE.uuid }],
      },
      firstName: 'Customer4',
      secondName: 'Starter4',
      phone: '+79999999944',
      info: 'Standard information',
    },
  });

  const CUSTOMER_USER_5 = await prisma?.user?.create({
    data: {
      email: 'customer5@mail.ru',
      password: '$argon2id$v=19$m=65536,t=3,p=4$3bpIaorqAZ434ppom9guDA$AZn9O+A25nMhB0r+D1FoTZX/RS/vhFiGVlpZCer9+ps',
      roles: {
        connect: [{ uuid: CUSTOMER_ROLE.uuid }],
      },
      firstName: 'Customer5',
      secondName: 'Starter5',
      phone: '+79999999945',
      info: 'Standard information',
    },
  });
  //endregion

  //DOC MANAGER_USER_1 AND HIS INFRASTRUCTURE - создаем менеджера и для него - воркспейс, организацию и проект
  //region MANAGER_1 AND HIS INFRASTRUCTURE
  const MANAGER_USER_1 = await prisma?.user?.create({
    data: {
      email: 'manager1@mail.ru',
      password: '$argon2id$v=19$m=65536,t=3,p=4$3bpIaorqAZ434ppom9guDA$AZn9O+A25nMhB0r+D1FoTZX/RS/vhFiGVlpZCer9+ps',
      roles: {
        connect: [{ uuid: MANAGER_ROLE.uuid }],
      },
      firstName: 'Manager1',
      secondName: 'Starter1',
      phone: '+79999999921',
      info: 'Standard information',
    },
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
      password: '$argon2id$v=19$m=65536,t=3,p=4$3bpIaorqAZ434ppom9guDA$AZn9O+A25nMhB0r+D1FoTZX/RS/vhFiGVlpZCer9+ps',
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
      fieldTypeUuid: FIELD_TYPE_1.uuid,
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
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_8.uuid,
    },
  });

  const FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_9 = await prisma?.fieldVariantsForSelectorFieldType?.create({
    data: {
      value: '3/4',
      numInOrder: 10,
      description: '3/4 (листовые, сорт)',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_8.uuid,
    },
  });

  const FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_10 = await prisma?.fieldVariantsForSelectorFieldType?.create({
    data: {
      value: '3/3',
      numInOrder: 11,
      description: '3/3 (листовые, сорт)',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_8.uuid,
    },
  });

  const FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_11 = await prisma?.fieldVariantsForSelectorFieldType?.create({
    data: {
      value: '2ш/3',
      numInOrder: 12,
      description: '2ш/3 (листовые, сорт)',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_8.uuid,
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

  const MATERIAL_UNIT_3 = await prisma?.material?.create({
    data: {
      name: 'Простой материал 1',
      comment: 'Только что добавленный 1',
      price: 99999999999999,
      namePublic: 'Тест1',
      numInOrder: 4,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_6.uuid,
      unitMeasurementUuid: FIELD_UNIT_MEASUREMENT_16.uuid,
      responsiblePartnerUuid: RESPONSIBLE_PARTNER_PRODUCER_2.uuid,
    },
  });

  const MATERIAL_UNIT_4 = await prisma?.material?.create({
    data: {
      name: 'Простой материал 2',
      comment: 'Только что добавленный 2',
      price: 1,
      namePublic: 'Тест2',
      numInOrder: 5,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      categoryMaterialUuid: CATEGORY_MATERIAL_6.uuid,
      unitMeasurementUuid: FIELD_UNIT_MEASUREMENT_16.uuid,
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

  const CHARACTERISTICS_MATERIAL_OF_FANERA_0 = await prisma?.characteristicsMaterial?.create({
    data: {
      materialUuid: MATERIAL_UNIT_1.uuid,
      numInOrder: 7,
      value: FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_4.value,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_3.uuid,
    },
  });

  const CHARACTERISTICS_MATERIAL_OF_FANERA_1 = await prisma?.characteristicsMaterial?.create({
    data: {
      materialUuid: MATERIAL_UNIT_1.uuid,
      numInOrder: 8,
      value: FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_7.value,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_4.uuid,
    },
  });

  const CHARACTERISTICS_MATERIAL_OF_FANERA_2 = await prisma?.characteristicsMaterial?.create({
    data: {
      materialUuid: MATERIAL_UNIT_1.uuid,
      numInOrder: 9,
      value: '18',
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_5.uuid,
    },
  });

  const CHARACTERISTICS_MATERIAL_OF_FANERA_3 = await prisma?.characteristicsMaterial?.create({
    data: {
      materialUuid: MATERIAL_UNIT_1.uuid,
      value: '1220',
      numInOrder: 10,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_6.uuid,
    },
  });

  const CHARACTERISTICS_MATERIAL_OF_FANERA_4 = await prisma?.characteristicsMaterial?.create({
    data: {
      materialUuid: MATERIAL_UNIT_1.uuid,
      value: '2440',
      numInOrder: 11,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_1.uuid,
    },
  });

  const CHARACTERISTICS_MATERIAL_OF_FANERA_5 = await prisma?.characteristicsMaterial?.create({
    data: {
      materialUuid: MATERIAL_UNIT_1.uuid,
      numInOrder: 12,
      value: FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_8.value,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_8.uuid,
    },
  });

  const CHARACTERISTICS_MATERIAL_OF_FANERA_6 = await prisma?.characteristicsMaterial?.create({
    data: {
      materialUuid: MATERIAL_UNIT_1.uuid,
      numInOrder: 13,
      value: FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_13.value,
      handbookUuid: MANAGER_HANDBOOK_1.uuid,
      fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_9.uuid,
    },
  });
  //endregion

  const newNameGluhar = await templateNameMapper(prisma, MATERIAL_UNIT_0);
  const newNameFanera = await templateNameMapper(prisma, MATERIAL_UNIT_1);

  // DOC UPDATE MATERIAL обновляем имя материала согласно характеристикам и шаблону категории
  // region UPDATED_MATERIAL
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
  //endregion
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
