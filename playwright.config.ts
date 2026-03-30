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
    ["html", { open: "never" }],
    ["junit", { outputFile: "test-results/playwright-report.xml" }],
  ],
  outputDir: "test-results/",
  retries: process.env.CI ? 2 : 0,
  timeout: 30 * 1000,
  workers: process.env.CI ? 1 : undefined,
  projects: [
    {
      name: "e2e",
      retries: 2,
      fullyParallel: true,
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
