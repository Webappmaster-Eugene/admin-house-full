import { test, expect } from '@playwright/test';

const WORKER_EMAIL = process.env.E2E_WORKER_EMAIL ?? 'worker1@mail.ru';
const PASSWORD = process.env.E2E_PASSWORD;

test.skip(!PASSWORD, 'Env var E2E_PASSWORD must be set to the seed password to run e2e tests');

test('worker who navigates to /dashboard/materials is redirected to /profile', async ({ page }) => {
  await page.goto('/auth/login');
  await page.getByLabel('Почта').fill(WORKER_EMAIL);
  await page.getByLabel('Пароль').fill(PASSWORD as string);
  await page.getByRole('button', { name: 'Войти' }).click();

  await page.waitForURL(/\/profile/);

  await page.goto('/dashboard/materials');
  await expect(page).toHaveURL(/\/profile($|\?)/);
});
