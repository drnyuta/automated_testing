import { Page, Locator } from "@playwright/test";

export class InventoryPage {
  private page: Page;
  private addToCartButtons: Record<string, Locator>;
  private cartBadge: Locator;
  private cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButtons = {
      backpack: this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]'),
      bikeLight: this.page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]'),
    };
    this.cartBadge = this.page.locator(".shopping_cart_badge");
    this.cartLink = this.page.locator(".shopping_cart_link");
  }

  getPage(): Page {
    return this.page;
  }

  async addItemToCart(item: string): Promise<void> {
    if (this.addToCartButtons[item]) {
      await this.addToCartButtons[item].click();
    } else {
      throw new Error(`Item "${item}" not found in addToCartButtons.`);
    }
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async getCartBadgeText(): Promise<string> {
    return await this.cartBadge.textContent();
  }
}
