import { Page, Locator } from "@playwright/test";
import { CurrencyCode, createDateString, ExchangeRate } from "../test-utils/types";
import { logger } from "../test-utils/logger";

export class CurrencyTablesPage {
  readonly page: Page;
  readonly dateInput: Locator;
  readonly currencyDropdown: Locator;
  readonly yearSelect: Locator;
  readonly monthSelect: Locator;
  readonly confirmButton: Locator;
  readonly tableRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dateInput = page.locator('label:has-text("Date") + button');
    this.currencyDropdown = page.getByRole("combobox", { name: "Type to search..." });
    this.yearSelect = page.getByRole("combobox", { name: "Choose the Year" });
    this.monthSelect = page.getByRole("combobox", { name: "Choose the Month" });
    this.confirmButton = page.getByRole("button", { name: "Confirm" });
    this.tableRows = page.locator('[id="table-section"] table tbody tr');
  }

  dayButton(date: string): Locator {
    return this.page.locator(`td[data-day="${date}"]`).getByRole("button");
  }

  async navigate() {
    const url = process.env.BASE_URL;
    if (!url) {
      throw new Error("BASE_URL is not defined in your environment variables");
    }
    await this.page.goto(url);
  }

  async handleCookieBanner() {
    try {
      const acceptButton = this.page.getByRole("button", { name: /Accept/i });
      await acceptButton.click({ timeout: 5000 });
      logger.info("✓ Cookie banner dismissed");
    } catch (error) {
      logger.info("→ Cookie banner not present (expected behavior) ", { error });
    }
  }

  async selectDate(date: string): Promise<void> {
    const validDate = createDateString(date);
    const [year, month] = validDate.split("-");

    await this.dateInput.click();
    await this.yearSelect.selectOption(year);
    await this.monthSelect.selectOption((Number.parseInt(month) - 1).toString());

    await this.dayButton(date).click();
  }

  async selectBaseCurrency(currencyCode: CurrencyCode): Promise<void> {
    await this.currencyDropdown.click();
    await this.currencyDropdown.fill(currencyCode);

    const option = this.page.getByRole("option").filter({ hasText: currencyCode }).first();
    await option.waitFor({ state: "visible" });
    await this.page.keyboard.press("Enter");
  }

  async clickGo(): Promise<void> {
    await this.confirmButton.click();
    await this.page.waitForSelector("table tbody tr");
  }

  async getRateForCurrency(targetCurrency: CurrencyCode): Promise<ExchangeRate> {
    const row = this.tableRows.filter({
      hasText: targetCurrency,
    });

    await row.waitFor({ state: "visible" });
    const rateCell = row.locator("td").nth(1);
    const text = await rateCell.textContent();

    const rateStr = text?.trim() || "";
    const rate = Number.parseFloat(rateStr);

    if (Number.isNaN(rate)) {
      logger.error(`Invalid rate format: ${rateStr}`);
      throw new Error(`Could not parse rate for ${targetCurrency}: ${rateStr}`);
    }

    logger.info(`Rate extracted`, {
      currency: targetCurrency,
      rate: rate.toString(),
    });

    return rate as ExchangeRate;
  }
}
