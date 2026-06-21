import { test, expect } from "@playwright/test";
import { InventoryPage } from "../pages/InventoryPage";
import { LoginPage } from "../pages/LoginPage";

test.describe('SauceDemo Cart Functionality', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        await loginPage.open();
        await loginPage.login("standard_user", "secret_sauce");
    });

    test("User adds a product to the cart and verifies it", async ({ page }) => {
        await inventoryPage.addToCart(0);
        await expect(page.locator(".shopping_cart_badge"), "Cart badge should show 1 after adding a product").toHaveText("1");
    });

    test("User removes a product from the cart and cart is empty", async ({ page }) => {
        await inventoryPage.addToCart(0);
        await inventoryPage.removeFromCart(0);
        await expect(page.locator(".shopping_cart_badge"), "Cart badge should not be visible after removing product").not.toBeVisible();
    });

    test("User can add multiple products to the cart", async ({ page }) => {
        await inventoryPage.addToCart(0);
        await inventoryPage.addToCart(1);
        await inventoryPage.addToCart(2);
        await expect(page.locator(".shopping_cart_badge"), "Cart badge should show 3 after adding 3 products").toHaveText("3");
    });

    test("User can sort products by price", async ({ page }) => {
        await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

     // Store a locator pointing to all elements with class .inventory_item_price
    const prices = page.locator(".inventory_item_price");

    // Extract the text of each element and store them in a string array → ["$7.99", "$49.99", ...]
    const priceTexts = await prices.allTextContents();

    // Convert each string to a number: remove "$" and parse to float → [7.99, 49.99, ...]
    const priceNumbers = priceTexts.map(p => parseFloat(p.replace("$", "")));

    // Verify that the first element displays the lowest price in the array
    await expect(prices.first(), "First item should be the lowest priced")
        .toHaveText(`$${Math.min(...priceNumbers).toFixed(2)}`); // → "$7.99"

    // Verify that the last element displays the highest price in the array
    await expect(prices.last(), "Last item should be the highest priced")
        .toHaveText(`$${Math.max(...priceNumbers).toFixed(2)}`); // → "$49.99"

    });

    
})