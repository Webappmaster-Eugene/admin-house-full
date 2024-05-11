import { PrismaClient } from '@prisma/client';
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
