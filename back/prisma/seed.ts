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
      password:
        '$argon2id$v=19$m=65536,t=3,p=4$3bpIaorqAZ434ppom9guDA$AZn9O+A25nMhB0r+D1FoTZX/RS/vhFiGVlpZCer9+ps',
      roleUuid: ADMIN.uuid,
      firstName: 'Admin',
      secondName: 'Starter',
      phone: '+79999999999',
      info: 'Standard information',
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
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
