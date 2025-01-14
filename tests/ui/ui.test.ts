import { test, expect } from "@playwright/test";
import { PageFactory } from "./factories/PageFactory";

test.describe("Login Tests", () => {
  test("Verify User Login", async ({ page }) => {
    const loginPage = PageFactory.getPage(page, "login");
    await page.goto("https://www.saucedemo.com/");
    await loginPage.login("standard_user", "secret_sauce");

    const inventoryPage = PageFactory.getPage(page, "inventory");
    await expect(inventoryPage.getPage().locator(".app_logo")).toHaveText(
      "Swag Labs"
    );
  });

  test("Verify Non-Existing User Login", async ({ page }) => {
    const loginPage = PageFactory.getPage(page, "login");
    await page.goto("https://www.saucedemo.com/");
    await loginPage.login("invalid_user", "wrong_password");

    const errorMessage = page.locator('[data-test="error"]');
    await expect(errorMessage).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });
});

test.describe("Cart Tests", () => {
  test("Verify Adding Item to Cart", async ({ page }) => {
    const loginPage = PageFactory.getPage(page, "login");
    await page.goto("https://www.saucedemo.com/");
    await loginPage.login("standard_user", "secret_sauce");

    const inventoryPage = PageFactory.getPage(page, "inventory");
    await inventoryPage.addItemToCart("backpack");

    const cartPage = PageFactory.getPage(page, "cart");
    await inventoryPage.openCart();
    await expect(cartPage.getCartItemCount()).resolves.toBe(1);
  });

  test("Verify Adding Multiple Items to Cart", async ({ page }) => {
    const loginPage = PageFactory.getPage(page, "login");
    await page.goto("https://www.saucedemo.com/");
    await loginPage.login("standard_user", "secret_sauce");

    const inventoryPage = PageFactory.getPage(page, "inventory");
    await inventoryPage.addItemToCart("backpack");
    await inventoryPage.addItemToCart("bikeLight");

    const cartPage = PageFactory.getPage(page, "cart");
    await inventoryPage.openCart();
    await expect(cartPage.getCartItemCount()).resolves.toBe(2);
  });

  test("Verify Removing Item from Cart", async ({ page }) => {
    const loginPage = PageFactory.getPage(page, "login");
    await page.goto("https://www.saucedemo.com/");
    await loginPage.login("standard_user", "secret_sauce");

    const inventoryPage = PageFactory.getPage(page, "inventory");
    await inventoryPage.addItemToCart("backpack");

    const cartPage = PageFactory.getPage(page, "cart");
    await inventoryPage.openCart();
    await expect(cartPage.getCartItemCount()).resolves.toBe(1);

    const removeButton = page.locator(
      '[data-test="remove-sauce-labs-backpack"]'
    );
    await removeButton.click();
    await expect(cartPage.getCartItemCount()).resolves.toBe(0);
  });
});

test.describe("Checkout Tests", () => {
  test("Verify Checkout Process", async ({ page }) => {
    const loginPage = PageFactory.getPage(page, "login");
    await page.goto("https://www.saucedemo.com/");
    await loginPage.login("standard_user", "secret_sauce");

    const inventoryPage = PageFactory.getPage(page, "inventory");
    await inventoryPage.addItemToCart("backpack");

    const cartPage = PageFactory.getPage(page, "cart");
    await inventoryPage.openCart();
    await cartPage.proceedToCheckout();

    const checkoutPage = PageFactory.getPage(page, "checkout");
    await checkoutPage.fillDetails("John", "Doe", "12345");
    await expect(checkoutPage.getSummaryTotal()).resolves.toBe("Total: $32.39");

    await checkoutPage.finishOrder();
    await expect(checkoutPage.getOrderCompleteHeader()).resolves.toBe(
      "Thank you for your order!"
    );
  });

  test("Verify Checkout Process for Multiple Items", async ({ page }) => {
    const loginPage = PageFactory.getPage(page, "login");
    await page.goto("https://www.saucedemo.com/");
    await loginPage.login("standard_user", "secret_sauce");

    const inventoryPage = PageFactory.getPage(page, "inventory");
    await inventoryPage.addItemToCart("backpack");
    await inventoryPage.addItemToCart("bikeLight");

    const cartPage = PageFactory.getPage(page, "cart");
    await inventoryPage.openCart();
    await cartPage.proceedToCheckout();

    const checkoutPage = PageFactory.getPage(page, "checkout");
    await checkoutPage.fillDetails("John", "Doe", "12345");
    await expect(checkoutPage.getSummaryTotal()).resolves.toBe("Total: $43.18");

    await checkoutPage.finishOrder();
    await expect(checkoutPage.getOrderCompleteHeader()).resolves.toBe(
      "Thank you for your order!"
    );
  });
});

test.describe("Logout Tests", () => {
  test("Verify User Is Able to Logout", async ({ page }) => {
    const loginPage = PageFactory.getPage(page, "login");
    await page.goto("https://www.saucedemo.com/");
    await loginPage.login("standard_user", "secret_sauce");

    const inventoryPage = PageFactory.getPage(page, "inventory");
    const menuButton = page.locator("#react-burger-menu-btn");
    const logoutLink = page.locator("#logout_sidebar_link");

    await menuButton.click();
    await expect(page.locator(".bm-menu")).toBeVisible();

    await logoutLink.click();
    await expect(page.locator('[data-test="username"]')).toBeVisible();
    await expect(page.locator('[data-test="password"]')).toBeVisible();
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });
});