import { test, expect } from "@playwright/test";

test.describe("Sauce Demo Tests", () => {
  test("Verify User Login", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.fill('[data-test="username"]', "standard_user");
    await page.fill('[data-test="password"]', "secret_sauce");
    await page.click('[data-test="login-button"]');
    const appLogo = await page.locator(".app_logo");
    await expect(appLogo).toHaveText("Swag Labs");
  });

  test("Verify Adding Item to Cart", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.fill('[data-test="username"]', "standard_user");
    await page.fill('[data-test="password"]', "secret_sauce");
    await page.click('[data-test="login-button"]');
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    const cartBadge = await page.locator(".shopping_cart_badge");
    await expect(cartBadge).toHaveText("1");
    await page.click(".shopping_cart_link");
    const cartItems = await page.locator(".cart_item");
    await expect(cartItems).toHaveCount(1);
    await expect(cartItems.locator(".inventory_item_name")).toHaveText(
      "Sauce Labs Backpack"
    );
  });

  test("Verify Adding Multiple Items to Cart", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.fill('[data-test="username"]', "standard_user");
    await page.fill('[data-test="password"]', "secret_sauce");
    await page.click('[data-test="login-button"]');
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await expect(page.locator(".shopping_cart_badge")).toHaveText("2");
    await page.click(".shopping_cart_link");
    const cartItems = await page.locator(".cart_item");
    await expect(cartItems).toHaveCount(2);
    await expect(cartItems.locator(".inventory_item_name")).toContainText([
      "Sauce Labs Backpack",
      "Sauce Labs Bike Light",
    ]);
  });

  test("Verify Removing Item from Cart", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.fill('[data-test="username"]', "standard_user");
    await page.fill('[data-test="password"]', "secret_sauce");
    await page.click('[data-test="login-button"]');
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click(".shopping_cart_link");
    await expect(page.locator(".cart_item")).toHaveCount(1);
    await page.click('[data-test="remove-sauce-labs-backpack"]');
    await expect(page.locator(".cart_item")).toHaveCount(0);
    await expect(page.locator(".shopping_cart_badge")).toBeHidden();
  });

  test("Verify Checkout Process", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.fill('[data-test="username"]', "standard_user");
    await page.fill('[data-test="password"]', "secret_sauce");
    await page.click('[data-test="login-button"]');
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click(".shopping_cart_link");
    await page.click('[data-test="checkout"]');
    await page.fill('[data-test="firstName"]', "John");
    await page.fill('[data-test="lastName"]', "Dou");
    await page.fill('[data-test="postalCode"]', "12345");
    await page.click('[data-test="continue"]');
    await expect(page.locator(".summary_total_label")).toHaveText(
      "Total: $32.39"
    );
    await page.click('[data-test="finish"]');
    await expect(page.locator(".complete-header")).toHaveText(
      "Thank you for your order!"
    );
  });

  test("Verify Checkout Process for Multiple Items", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.fill('[data-test="username"]', "standard_user");
    await page.fill('[data-test="password"]', "secret_sauce");
    await page.click('[data-test="login-button"]');
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
    await page.click(".shopping_cart_link");
    await page.click('[data-test="checkout"]');
    await page.fill('[data-test="firstName"]', "John");
    await page.fill('[data-test="lastName"]', "Dou");
    await page.fill('[data-test="postalCode"]', "12345");
    await page.click('[data-test="continue"]');
    await expect(page.locator(".summary_total_label")).toHaveText(
      "Total: $43.18"
    );
    await page.click('[data-test="finish"]');
    await expect(page.locator(".complete-header")).toHaveText(
      "Thank you for your order!"
    );
  });

  test("Verify Non-Existing User Is Not Able to Login", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.fill('[data-test="username"]', "standard_user_123");
    await page.fill('[data-test="password"]', "secret_sauce_123");
    await page.click('[data-test="login-button"]');
    const errorMessage = await page.locator('[data-test="error"]');
    await expect(errorMessage).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  test("Verify User Is Able to Logout", async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    await page.fill('[data-test="username"]', "standard_user");
    await page.fill('[data-test="password"]', "secret_sauce");
    await page.click('[data-test="login-button"]');
    await page.click("#react-burger-menu-btn");
    await expect(page.locator(".bm-menu")).toBeVisible();
    await page.click("#logout_sidebar_link");
    await expect(page.locator('[data-test="username"]')).toBeVisible();
    await expect(page.locator('[data-test="password"]')).toBeVisible();
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });
});