/* eslint-disable no-console */
import * as argon2 from 'argon2';
import { PrismaClient } from '@prisma/client';

/**
 * Массовый сброс паролей всем пользователям.
 *
 * Linux / macOS / bash:
 *   NEW_PASSWORD='!Numart32@' DATABASE_URL='...' npx ts-node scripts/reset-all-passwords.ts
 *   NEW_PASSWORD='!Numart32@' DATABASE_URL='...' npx ts-node scripts/reset-all-passwords.ts --apply
 *
 * Windows PowerShell:
 *   $env:NEW_PASSWORD='!Numart32@'; $env:DATABASE_URL='...'; npx ts-node scripts/reset-all-passwords.ts
 *   $env:NEW_PASSWORD='!Numart32@'; $env:DATABASE_URL='...'; npx ts-node scripts/reset-all-passwords.ts --apply
 *
 * Без --apply — dry-run: только покажет количество пользователей, ничего не меняет.
 * Перед запуском на проде: сделать бэкап БД (pg_dump).
 *
 * ВНИМАНИЕ: скрипт не инвалидирует refresh-токены в cookies уже залогиненных пользователей.
 * Они продолжат работать до истечения срока действия токена.
 */

async function main() {
  const newPassword = process.env.NEW_PASSWORD;
  const apply = process.argv.includes('--apply');

  if (!newPassword || newPassword.length < 8) {
    console.error('Ошибка: переменная окружения NEW_PASSWORD не задана или короче 8 символов.');
    process.exit(1);
  }

  if (!process.env.DATABASE_URL) {
    console.error('Ошибка: переменная окружения DATABASE_URL не задана.');
    process.exit(1);
  }

  const prisma = new PrismaClient();

  try {
    const usersCount = await prisma.user.count();
    console.log(`Найдено пользователей в базе: ${usersCount}`);

    if (usersCount === 0) {
      console.log('Нет пользователей для обновления. Выход.');
      return;
    }

    if (!apply) {
      console.log('');
      console.log('=== DRY-RUN ===');
      console.log(`Будет обновлено пользователей: ${usersCount}`);
      console.log('Для реального применения добавьте флаг --apply');
      return;
    }

    console.log('');
    console.log('=== APPLY ===');
    console.log('Хеширую новый пароль через argon2...');
    const hashedPassword = await argon2.hash(newPassword);

    console.log('Обновляю пароли всем пользователям...');
    const result = await prisma.user.updateMany({
      where: {},
      data: { password: hashedPassword },
    });

    console.log(`Готово. Обновлено пользователей: ${result.count}`);
    console.log(
      'Напоминание: refresh-токены в cookies уже залогиненных пользователей остаются валидными.',
    );
  } catch (error) {
    console.error('Ошибка при обновлении паролей:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
