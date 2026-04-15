import { test, expect } from '@playwright/test';

const MANAGER_EMAIL = process.env.E2E_MANAGER_EMAIL ?? 'manager1@mail.ru';
const PASSWORD = process.env.E2E_PASSWORD;

test.skip(!PASSWORD, 'Env var E2E_PASSWORD must be set to the seed password to run e2e tests');

test('manager logs in and lands on dashboard', async ({ page }) => {
  await page.goto('/auth/login');

  await page.getByLabel('Почта').fill(MANAGER_EMAIL);
  await page.getByLabel('Пароль').fill(PASSWORD as string);
  await page.getByRole('button', { name: 'Войти' }).click();

  await expect(page).toHaveURL(/\/dashboard/);
  await expect(page.getByText('Справочник', { exact: false })).toBeVisible();
});
