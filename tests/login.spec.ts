import { test, expect } from "@playwright/test";       // 1. Import tools
import { LoginPage } from "../pages/LoginPage";          // 2. Import page object POM

test.describe('Login Functionality', () => {
    let loginPage: LoginPage;                              // Declare variable for page object

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);                    // 3. Initialize page object
        await loginPage.open();                              // 4. Open the login page
    });

    //standard_user can log in and sees inventory page
    test ("user successfully logs in with valid credentials", async ({ page }) => {
    await loginPage.login("standard_user","secret_sauce");
    await expect(page).toHaveURL("/inventory.html");    
    }  );
    
    //User with invalid credentials sees error message
    test ("user sees error message with invalid credentials", async ({ page }) => {
    await loginPage.login("invalid_user","wrong_password");
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service');
    }  );

    //User must enter both username and password to log in
    test("User can't login if username and password are not entered", async ({ page }) => {
    await loginPage.login ("","")
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Username is required');
    })
    
    test("User can't login if password is not entered", async ({ page }) => {
    await loginPage.login ("performance_glitch_user","")
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Password is required');

    } );

    test("User can't login if username is not entered", async ({ page }) => {
    await loginPage.login ("","secret_sauce")
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Username is required');
    } );

    //Locked user can't login with their credentials
    test("Locked out user sees error message when trying to login", async ({ page }) => {
    await loginPage.login ("locked_out_user","secret_sauce")       
    await expect(loginPage.errorMessage).toContainText('Epic sadface: Sorry, this user has been locked out.');
    } );
})