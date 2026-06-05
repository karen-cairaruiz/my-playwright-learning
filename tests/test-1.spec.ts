import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('await page.goto('https://www.saucedemo.com/');');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret__sauce');
  await page.locator('[data-test="login-
  await page.locator('[data-test="username"]').dblclick();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="username"]').press('Tab');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.getByText('Name (A to Z)Name (A to Z)').click();
  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');button"]').click();
  await page.goto('https://www.saucedemo.com/inventory.html');
});