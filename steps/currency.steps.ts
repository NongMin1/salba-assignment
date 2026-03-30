import { createBdd } from "playwright-bdd";
import { expect } from "@playwright/test";
import { CurrencyTablesPage } from "../pages/CurrencyTablesPage";

let currencyTablesPage: CurrencyTablesPage;
const { Given, When, Then } = createBdd();

Given("the user navigates to the historical rates page", async ({ page }) => {
  currencyTablesPage = new CurrencyTablesPage(page);
  await currencyTablesPage.navigate();
});

When("the user selects {string} as the base currency", async ({}, pair: string) => {
  await currencyTablesPage.selectBaseCurrency(pair);
});

When("the user selects the date {string}", async ({}, date: string) => {
  await currencyTablesPage.selectDate(date);
});

When("the user confirms the selection", async ({}) => {
  await currencyTablesPage.clickGo();
});

Then(
  "the rate for {string} should be {string}",
  async ({}, currencyCode: string, expectedRate: string) => {
    const actualRate = await currencyTablesPage.getRateForCurrency(currencyCode);
    expect(actualRate, {
      message: `Expected exchange rate for ${currencyCode} to be '${expectedRate}', but found '${actualRate}'`,
    }).toBe(expectedRate);
  }
);
