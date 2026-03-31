import { chromium, FullConfig } from "@playwright/test";
import { CurrencyTablesPage } from "./pages/CurrencyTablesPage";

async function globalSetup(config: FullConfig) {
  const project = config.projects[0];
  const { baseURL, storageState } = project.use;

  if (!baseURL || typeof storageState !== "string") {
    throw new Error(
      `Configuration Missing: baseURL is "${baseURL}" and storageState is "${storageState}". ` +
        "Ensure BASE_URL environment variable is set in your GitHub Actions workflow."
    );
  }

  const browser = await chromium.launch();
  const page = await browser.newPage();
  const currencyTablesPage = new CurrencyTablesPage(page);

  await page.goto(baseURL);
  await currencyTablesPage.handleCookieBanner();

  await page.context().storageState({ path: storageState });
  await browser.close();
}

export default globalSetup;
