import { Page, Locator } from "@playwright/test";

export class CheckoutPage {
  private page: Page;
  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private postalCodeInput: Locator;
  private continueButton: Locator;
  private summaryTotal: Locator;
  private finishButton: Locator;
  private orderCompleteHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.summaryTotal = page.locator(".summary_total_label");
    this.finishButton = page.locator('[data-test="finish"]');
    this.orderCompleteHeader = page.locator(".complete-header");
  }

  async fillDetails(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  async finishOrder(): Promise<void> {
    await this.finishButton.click();
  }

  async getSummaryTotal(): Promise<string> {
    return await this.summaryTotal.textContent();
  }

  async getOrderCompleteHeader(): Promise<string> {
    return await this.orderCompleteHeader.textContent();
  }
}
