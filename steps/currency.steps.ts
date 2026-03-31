import { createBdd } from "playwright-bdd";
import { CurrencyCode, ExchangeRate } from "../test-utils/types";
import { logger } from "../test-utils/logger";
import { expect } from "@playwright/test";
import { CurrencyTablesPage } from "../pages/CurrencyTablesPage";

let currencyTablesPage: CurrencyTablesPage;
const { Given, When, Then } = createBdd();

Given("the user navigates to the historical rates page", async ({ page }) => {
  currencyTablesPage = new CurrencyTablesPage(page);
  await currencyTablesPage.navigate();
});

When("the user sets base currency to {string}", async ({}, pair: string) => {
  await currencyTablesPage.selectBaseCurrency(pair as CurrencyCode);
});

When("the user selects historical date {string}", async ({}, date: string) => {
  await currencyTablesPage.selectDate(date);
});

When("the user confirms the selection", async ({}) => {
  await currencyTablesPage.clickGo();
});

Then(
  "the rate for {string} should be {string}",
  async ({}, currencyCodeStr: string, expectedRateStr: string) => {
    const currencyCode = currencyCodeStr as CurrencyCode;
    const expectedRate = Number.parseFloat(expectedRateStr) as ExchangeRate;

    logger.info(`Verifying rate for ${currencyCode}`, {
      expected: expectedRate.toString(),
    });

    const actualRateStr = await currencyTablesPage.getRateForCurrency(currencyCode);
    const actualRate = Number.parseFloat(actualRateStr);

    expect(
      actualRate,
      `Exchange rate mismatch for ${currencyCode}\n` +
        `Expected: ${expectedRate}\n` +
        `Actual: ${actualRateStr}\n` +
        `Difference: ${Math.abs(actualRate - expectedRate)}`
    ).toBe(expectedRate);

    logger.info(`✓ Rate verified for ${currencyCode}`);
  }
);
