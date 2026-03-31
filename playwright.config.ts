import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import { defineBddConfig } from "playwright-bdd";

dotenv.config();

const testDir = defineBddConfig({
  features: "features/*.feature",
  steps: "steps/*.ts",
  featuresRoot: "features",
  outputDir: ".features-gen",
});

const timestamp = new Date().toISOString().slice(0, 10);

export default defineConfig({
  globalSetup: require.resolve("./global-setup.ts"),
  testDir,
  use: {
    baseURL: process.env.BASE_URL,
    storageState: "state.json",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "on-first-retry",
  },
  reporter: [
    ["list"],
    [
      "html",
      {
        open: "never",
        outputFolder: `playwright-report/${timestamp}`,
      },
    ],
    [
      "json",
      {
        outputFile: `test-results/test-results-${timestamp}.json`,
      },
    ],

    [
      "junit",
      {
        outputFile: `test-results/junit-${timestamp}.xml`,
      },
    ],
    ["github"],
  ],

  outputDir: `test-results/${timestamp}`,
  fullyParallel: true,
  workers: process.env.CI ? 1 : 4,
  retries: process.env.CI ? 2 : 0,
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  projects: [
    {
      name: "e2e",
      retries: 2,
      fullyParallel: true,
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
