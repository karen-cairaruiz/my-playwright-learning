import { test, expect } from '@playwright/test';  //imports functions

test('has title', async ({ page }) => { //a test named "has title", runs asyncronously, and takes a page object as an argument
  await page.goto('https://playwright.dev/'); //go to the playwright website

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => { // a test named "get started link", runs asyncronously, and takes a page object as an argument
  await page.goto('https://playwright.dev/'); //go to the playwright website

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click(); //find a link with the name "Get started" and click it

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible(); //



});
