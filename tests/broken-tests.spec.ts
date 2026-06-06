import { test, expect } from "@playwright/test";

//Root cause: incorrect selector for the Username field
//Fix: upadted the selector to match the actual placeholder text
//How I verified: npx playwright test tests/broken-tests.spec.ts --ui and observed the test passing with the correct selector

test("login should redirect to inventory", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");   // ← is this the real placeholder?
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page).toHaveURL(/inventory/);
});

//Root cause: wrong locator and error message text
//Fix: updated the locator to match the actual error message element and text
//How I verified: saw the error in the console and updated the test to match the actual error message element and text, then ran the test and it passed successfully

test("error message on wrong password", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("wrong_password");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.locator("[data-test=\"error\"]")).toHaveText(
    "Epic sadface: Username and password do not match any user in this service"
  );
});

//Root cause: away missing in line 40, the test passes bc The "expect" at the end has its own internal retry/wait mechanism, so by the time it checks for the badge, the click has likely already happened
//Fix: added await
//How I verified: went back to the test, added await before the click action, and ran the test again to confirm it still passes and that the badge appears as expected.

test("cart badge appears after adding product", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await page.locator("[data-test=\"add-to-cart-sauce-labs-backpack\"]").click();   // ← something missing here

  await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
});


