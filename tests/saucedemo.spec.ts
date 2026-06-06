import { test, expect } from "@playwright/test";       // 1. Import tools

test.describe('SauceDemo Login Functionality', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
        
    });

    //Happy path
    test ("user successfully logs in with valid credentials", async ({ page }) => {
    await page.getByRole('textbox', { name: "Username" }).fill("performance_glitch_user");
    await page.getByRole('textbox', { name: "Password" }).fill("secret_sauce");
    await page.getByRole('button', { name: "Login" }).click();
    await expect(page).toHaveURL("/inventory.html");    
    }  );
    
    //Negative path
    test ("user sees error message with invalid credentials", async ({ page }) => {
    await page.getByRole('textbox', { name: "Username" }).fill("invalid_user");
    await page.getByRole('textbox', { name: "Password" }).fill("wrong_password");
    await page.getByRole('button', { name: "Login" }).click();
    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
    }  );

    //Edge cases
    test("User can't login if username and password are not entered", async ({ page }) => {
    await page.getByRole('button', { name: "Login" }).click();
    await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
    await expect(page).toHaveURL("/");
    
    await page.getByRole('textbox', { name: "Username" }).fill("performance_glitch_user");
    await page.getByRole('button', { name: "Login" }).click();
    await expect(page.getByText('Epic sadface: Password is required')).toBeVisible();
    await expect(page).toHaveURL("/");

    await page.getByRole('textbox', { name: "Username" }).fill("");
    await page.getByRole('textbox', { name: "Password" }).fill("secret_sauce");
    await page.getByRole('button', { name: "Login" }).click();
    await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
    await expect(page).toHaveURL("/");
    } );
});



test.describe('SauceDemo Cart Functionality', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
        await page.getByRole('textbox', { name: "Username" }).fill("performance_glitch_user");
        await page.getByRole('textbox', { name: "Password" }).fill("secret_sauce");
        await page.getByRole('button', { name: "Login" }).click();
        await expect(page).toHaveURL("/inventory.html");
    });

    test("User adds a product to the cart and verifies it", async ({ page }) => {
    
    await page.getByRole('button', { name: "Add to cart", exact: true }).first().click();
    await expect(page.getByRole('button', { name: "Remove", exact: true }).first()).toBeVisible();
    await expect(page.locator(".shopping_cart_badge"),"Cart badge should show 1 after adding a product").toHaveText("1");
    } );    

    test("User removes a product from the cart and cart is empty", async ({ page }) => {
    await page.getByRole('button', { name: "Add to cart", exact: true }).nth(3).click();
    await expect(page.getByRole('button', { name: "Remove", exact: true })).toBeVisible();
    await page.getByRole('button', { name: "Remove", exact: true }).click();
    await expect(page.locator(".shopping_cart_badge"),"Cart badge should not be visible after removing product").not.toBeVisible();
    } );

    test("User can add multiple products to the cart", async ({ page }) => {

    const products = page.locator(".inventory_item"); // Get all product elements with class "inventory_item"

    await products.nth(0).getByRole('button', { name: "Add to cart" }).click();
    await products.nth(2).getByRole('button', { name: "Add to cart" }).click();
    await products.nth(5).getByRole('button', { name: "Add to cart" }).click();
    //User verifies that cart badge shows 3
    await expect(page.locator(".shopping_cart_badge"),"Cart badge should show 3 after adding 3 products").toHaveText("3");
} );

test("User can sort products by price", async ({ page }) => {

    await page.locator('[data-test="product-sort-container"]').selectOption('lohi'); // Sort products by price low to high

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

} );
    

});












