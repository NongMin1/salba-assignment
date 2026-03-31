# Currency Rate Widget - QA Automation Tests

Automated end-to-end tests for the historical currency rates widget using Playwright and BDD (Behavior-Driven Development).

## 📋 Overview

This project validates historical currency exchange rates from currency rates using Playwright's powerful testing framework combined with BDD-style test scenarios written in Gherkin.

## 🚀 Quick Start

### Prerequisites

- **Node.js**: v18+ (LTS recommended)
- **npm**: v9+
- **Git**: For cloning and managing code

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd salba-assignment
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Install Playwright browsers**

   ```bash
   npm run pw:install
   ```

4. **Create environment file**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add the base URL.

## 📁 Project Structure

```
salba-assignment/
├── features/                    # Gherkin test scenarios
│   └── currencyRates.feature    # Currency rate validation tests
├── steps/                       # Step definitions
│   └── currency.steps.ts        # Glue code between Gherkin and Page Object Model
├── pages/                       # Page Object Model
│   └── CurrencyTablesPage.ts    # Interactions with xe.com currency tables
├── test-utils/                  # Shared utility functions and helpers
├── .github/workflows/           # CI/CD pipelines
│   └── playwright.yml           # GitHub Actions configuration
├── playwright.config.ts         # Playwright configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies and scripts
├── .prettierrc                  # Code formatting rules
├── .gitignore                   # Git ignore patterns
├── .env.example                 # Environment template
└── README.md                    # This file
```

## Environment Variables

Create a `.env` file in the project root. You can use .env.example as a template:

```env
BASE_URL=your_base_url_here
```

## Running Tests

| Script                | Description                                                                          |
| :-------------------- | :----------------------------------------------------------------------------------- |
| `npm test`            | Runs **UI tests** in headless mode.                                                  |
| `npm run test:headed` | Runs UI tests in **headed mode** (browser visible) and sequentially (`--workers=1`). |
| `npm run test:ui`     | Opens the Playwright Test Runner UI for interactive debugging.                       |
| `npm run report`      | Shows the latest Playwright HTML test report.                                        |
| `npm run pw:install`  | Installs Playwright browsers and dependencies.                                       |
| `npm run format`      | Formats project files using Prettier.                                                |
