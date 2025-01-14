import { Page } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";

type PageName = "login" | "inventory" | "cart" | "checkout";

// Overload definitions
export class PageFactory {
  static getPage(page: Page, pageName: "login"): LoginPage;
  static getPage(page: Page, pageName: "inventory"): InventoryPage;
  static getPage(page: Page, pageName: "cart"): CartPage;
  static getPage(page: Page, pageName: "checkout"): CheckoutPage;

  // Implementation
  static getPage(page: Page, pageName: PageName) {
    switch (pageName) {
      case "login":
        return new LoginPage(page);
      case "inventory":
        return new InventoryPage(page);
      case "cart":
        return new CartPage(page);
      case "checkout":
        return new CheckoutPage(page);
      default:
        throw new Error(`Page "${pageName}" is not defined in the factory.`);
    }
  }
}
