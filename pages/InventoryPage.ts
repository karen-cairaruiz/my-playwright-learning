import { type Locator, type Page } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly price: Locator;
  readonly addToCartButton: Locator;
  readonly removeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId("inventory_item_name");
    this.price = page.getByTestId("inventory_item_price");
    this.addToCartButton = page.getByRole("button", { name: "Add to cart" });
    this.removeButton = page.getByRole("button", { name: "Remove" });
  }

  async open() {
    await this.page.goto("/inventory.html");
  }

  async addToCart(index: number = 0) {
    await this.addToCartButton.nth(index).click();
  }

  async removeFromCart(index: number = 0) {
    await this.removeButton.nth(index).click();
  }
}

