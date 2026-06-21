import { test, expect } from "@playwright/test";       // 1. Import tools
import { LoginPage } from "../pages/LoginPage";          // 2. Import page object POM

test.describe('Login Functionality', () => {
    let loginPage: LoginPage;                              // Declare variable for page object

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);                    // 3. Initialize page object
        await loginPage.open();                              // 4. Open the login page
    });

    //Happy path
    test ("user successfully logs in with valid credentials", async ({ page }) => {
    await loginPage.login("performance_glitch_user","secret_sauce");
    await expect(page).toHaveURL("/inventory.html");    
    }  );
    
    //Negative path
    test ("user sees error message with invalid credentials", async ({ page }) => {
    await loginPage.login("invalid_user","wrong_password");
    await expect(page.getByText('Epic sadface: Username and password do not match any user in this service')).toBeVisible();
    }  );

    //Edge cases
    test("User can't login if username and password are not entered", async ({ page }) => {

    //Username and password are empty
    await loginPage.login ("","")
    await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
    await expect(page).toHaveURL("/");

    //Username is entered but password is empty
    await loginPage.login ("performance_glitch_user","")
    await expect(page.getByText('Epic sadface: Password is required')).toBeVisible();
    await expect(page).toHaveURL("/");

    //Username is empty but password is entered

    await loginPage.login ("","secret_sauce")
    await expect(page.getByText('Epic sadface: Username is required')).toBeVisible();
    await expect(page).toHaveURL("/");
    } );

    //Locked user can't login with their credentials
    test("Locked out user sees error message when trying to login", async ({ page }) => {
    await loginPage.login ("locked_out_user","secret_sauce")
    await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible();
})