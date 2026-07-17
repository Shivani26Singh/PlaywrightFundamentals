# Custom Reporting Demo

This folder demonstrates the custom HTML reporter (`utils/CustomReporter.ts`) with real-time updates, step tracking, and full artifact capture.

## Files

| File | Purpose |
|---|---|
| `248A_custom_reporting.spec.ts` | Demo test spec using Playwright native APIs (`test.step`, `testInfo.attach`, `console.log`) |
| `Reporter-Comparison.md` | Feature-by-feature comparison: Default HTML vs Allure vs Custom Reporter |
| `Custom-Reporter-Capabilities.md` | Complete capability reference with demo-ready examples |

## Quick Start

```bash
# Run the custom reporting demo tests
npx playwright test tests/05A_CustomReporting/248A_custom_reporting.spec.ts

# Open the generated report
npm run open-report
```

## How It Works

1. Tests use **only Playwright native APIs** — no third-party imports needed
2. The reporter (`utils/CustomReporter.ts`) captures:
   - `test.step()` calls with timing and status
   - `testInfo.attach()` for screenshots, JSON metadata, text
   - `console.log()` output per step
   - Videos, traces, and screenshots auto-copied to `custom-report/`
3. Report updates in real-time (auto-refreshes every 5 seconds during execution)

## Test Spec Structure

```ts
test("Descriptive test name explaining what is being verified @tag",
    async ({ page }, testInfo) => {

        // Attach metadata (rendered in report detail panel)
        testInfo.attach("Test Objective", {
            body: "What this test verifies...",
            contentType: "text/plain",
        });

        // Each step becomes an expandable row in the report
        await test.step("Step 1 - Describe the action", async () => {
            console.log("Console output captured per-step");
            await page.goto("...");
            testInfo.attach("step-0-Screenshot Name", {
                body: await page.screenshot(),
                contentType: "image/png",
            });
        });

        await test.step("Step 2 - Describe the assertion", async () => {
            await expect(page).toHaveURL(/expected/);
        });
    });
```

## Environment

Override default environment (QA) for a run:

```bash
# Windows
set TEST_ENV=PROD && npx playwright test tests/05A_CustomReporting/

# macOS/Linux
TEST_ENV=PROD npx playwright test tests/05A_CustomReporting/
```

Override default author (Shivani Singh):

```bash
set TEST_AUTHOR="Your Name" && npx playwright test tests/05A_CustomReporting/
```
