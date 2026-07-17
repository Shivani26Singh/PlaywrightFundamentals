# Custom Reporter — Demo Reference

All capabilities of the custom HTML reporter with ready-to-use code examples. Use this as a quick reference for demos or onboarding.

---

## 1. Real-Time HTML Generation

Live report updates every 5 seconds while tests run. Open `custom-report/index.html` during execution to watch results populate.

**No code needed** — automatic from `playwright.config.ts`:
```ts
reporter: [["line"], ["./utils/CustomReporter.ts"]],
```

---

## 2. Test Steps with Timing

Every `test.step()` call becomes an expandable, timestamped row in the report.

```ts
await test.step("Navigate to login page", async () => {
    await page.goto("https://example.com/login");
    // ► Step shows: ✓ Navigate to login page  1.2s
    // Expand to see start time, duration, video offset
});
```

**What appears in the report:**
- Step name + duration badge
- Expand to reveal: start time, duration, video timestamp range
- Console output (if any) inside the step

---

## 3. Console Logs Per Step

`console.log()` output within a step is captured and displayed inside that step's detail panel.

```ts
await test.step("Login with valid credentials", async () => {
    console.log(`🔑 Attempting login for user: admin`);
    await page.fill("#username", "admin");
    await page.fill("#password", "pass123");
    console.log(`📤 Submitting login form...`);
    await page.click("#login-btn");
    console.log(`✅ Login successful, redirected to: ${page.url()}`);
});
```

**Report shows:**
```
📋 Console Output (3 lines)
┌─────────────────────────────────────────┐
│ 🔑 Attempting login for user: admin     │
│ 📤 Submitting login form...              │
│ ✅ Login successful, redirected to: ... │
└─────────────────────────────────────────┘
```

---

## 4. Screenshot Capture (Per-Step)

Use `testInfo.attach()` with `step-{index}-` prefix to auto-link screenshots to specific steps.

```ts
await test.step("Verify dashboard layout", async () => {
    // Auto-linked to step 0
    await testInfo.attach("step-0-Dashboard Layout", {
        body: await page.screenshot({ fullPage: true }),
        contentType: "image/png",
    });
});

await test.step("Check user profile section", async () => {
    // Auto-linked to step 1
    await testInfo.attach("step-1-User Profile", {
        body: await page.screenshot(),
        contentType: "image/png",
    });
});
```

**Report shows:** Screenshot thumbnail embedded inside the step's expanded detail view.

---

## 5. Test Metadata & Parameters

Attach JSON metadata in `beforeEach` or within the test. Rendered in the report detail panel.

```ts
test.beforeEach(async ({ }, testInfo) => {
    await testInfo.attach("Test Metadata", {
        body: JSON.stringify({
            epic: "Authentication",
            feature: "Login",
            suite: "Smoke Tests",
            owner: "Shivani Singh",
            severity: "critical",
            environment: "QA",
        }, null, 2),
        contentType: "application/json",
    });
});
```

```ts
// Per-test parameters
await testInfo.attach("Test Parameters", {
    body: JSON.stringify({
        Browser: testInfo.project.name,
        Username: "testuser@example.com",
        Environment: process.env.TEST_ENV || "QA",
    }, null, 2),
    contentType: "application/json",
});
```

---

## 6. Error Display

Failed tests auto-expand in the report. Each failed step shows error + stack trace.

```ts
await test.step("Verify logout redirects to home", async () => {
    await expect(page).toHaveURL("/home");
    // If fails: step turns red, error message + stack visible
});
```

**Report shows:**
- Error section at top of detail panel
- Failing step highlighted in red
- Expandable error message + call stack
- Failed tests auto-expand in the table

---

## 7. Video & Trace Capture

Enabled in `playwright.config.ts`. Automatically copied into `custom-report/videos/` and `custom-report/traces/`.

```ts
// playwright.config.ts
use: {
    video: 'on',       // Records video for every test
    trace: 'on',       // Captures trace for every test
    screenshot: 'on',  // Captures screenshot on failure
},
```

**Report shows:**
- Video: embedded `<video>` player in detail panel + "▶ Play" link in table
- Trace: download link in detail panel + "📁 View" link in table

---

## 8. Tag-Based Filtering

Tags from test titles (`@P0`, `@smoke`, `@regression`) are interactive checkboxes in the report.

```ts
test("Critical login flow works end-to-end @P0 @smoke", async ({ page }) => {
    // Tags: [@P0, @smoke]
});

test("Password reset email sends correctly @P1 @regression", async ({ page }) => {
    // Tags: [@P1, @regression]
});
```

**Report filters:**
- **Priority:** All | P0 | P1 | Smoke
- **Status:** All | ✅ Passed | ❌ Failed | ⏭️ Skipped

---

## 9. Stats Dashboard

Real-time counters at the top of every report:

| Total Tests | Passed | Failed | Skipped | Pass Rate | Duration |
|---|---|---|---|---|---|
| 12 | 10 | 1 | 1 | 83.3% | 45s |

---

## 10. Environment & Run Info

Meta bar shows environment, browser, platform, worker count, Run ID, and start time.

```
🌐 QA    🌍 chromium    Windows    4 workers    20260717_170147    Jul 17, 2026, 17:01:47
```

Override via env vars:
```bash
set TEST_ENV=PROD
set TEST_AUTHOR="Your Name"
npx playwright test
```

---

## 11. Run History

`custom-report/history.html` lists all past runs with timestamps and links.

No setup needed — automatically generated. Open with:
```bash
start custom-report/history.html
```

---

## 12. Terminal Output During Execution

Rich console output with emojis, step-by-step progress, and real-time counters.

```
▶️  STARTING: Login with valid credentials redirects to dashboard @P0 @smoke
   📁 File: auth.spec.ts
   📍 Suite: Authentication
   ─────────────────────────────────────────────────────
   ⏳ Navigate to login page...
   ✅ Navigate to login page (1.2s)
   ⏳ Enter credentials and submit...
   ✅ Enter credentials and submit (0.8s)
   ⏳ Verify redirect to dashboard...
   ✅ Verify redirect to dashboard (0.3s)
   ─────────────────────────────────────────────────────
   ✅ RESULT: PASSED | Duration: 2.5s
   📊 Running Total: ✅ 1 | ❌ 0 | ⏭️ 0
```

---

## 13. Complete Demo Test Pattern

Copy-pasteable template for any new test:

```ts
import { test, expect } from "@playwright/test";

test.describe("Feature Name — Custom Reporter Demo", () => {

    test.beforeEach(async ({ }, testInfo) => {
        await testInfo.attach("Suite Metadata", {
            body: JSON.stringify({
                epic: "Feature Area",
                feature: "Specific Feature",
                suite: "Smoke Tests",
                owner: "Shivani Singh",
                severity: "critical",
                environment: process.env.TEST_ENV || "QA",
            }, null, 2),
            contentType: "application/json",
        });
    });

    test("User can complete checkout with valid payment method @P0 @smoke",
        async ({ page }, testInfo) => {

            await testInfo.attach("Test Objective", {
                body: "Verify end-to-end checkout flow with a valid credit card.",
                contentType: "text/plain",
            });

            await testInfo.attach("Parameters", {
                body: JSON.stringify({
                    Browser: testInfo.project.name,
                    CardType: "Visa",
                    Amount: "$99.99",
                }, null, 2),
                contentType: "application/json",
            });

            await test.step("Add item to cart and proceed to checkout", async () => {
                console.log("Adding item to cart...");
                await page.click(".add-to-cart");
                console.log("Navigating to checkout page...");
                await page.click(".checkout-btn");
                console.log(`Checkout URL: ${page.url()}`);

                await testInfo.attach("step-0-Cart Screenshot", {
                    body: await page.screenshot(),
                    contentType: "image/png",
                });
            });

            await test.step("Enter payment details and place order", async () => {
                console.log("Filling credit card details...");
                await page.fill("#card-number", "4111111111111111");
                await page.fill("#expiry", "12/28");
                await page.fill("#cvv", "123");
                console.log("Submitting payment...");
                await page.click("#place-order");
            });

            await test.step("Verify order confirmation page appears", async () => {
                console.log("Checking confirmation message...");
                await expect(page.locator(".order-confirmed")).toBeVisible();
                console.log(`Confirmation page URL: ${page.url()}`);
                await expect(page).toHaveURL(/order-confirmation/);
            });
        });
});
```

---

## 14. Configuration Reference (`playwright.config.ts`)

```ts
export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    reporter: [["line"], ["./utils/CustomReporter.ts"]],
    use: {
        trace: 'on',       // Required for trace in report
        video: 'on',       // Required for video in report
        screenshot: 'on',  // Captures on failure
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});
```

---

## 15. Commands Cheat Sheet

```bash
# Run custom reporter demo
npx playwright test tests/05A_CustomReporting/

# Open latest report
npm run open-report

# Open run history
start custom-report/history.html

# Run with custom env
set TEST_ENV=STAGING && npx playwright test

# Run specific tags
npx playwright test --grep "@smoke"

# Run in headed mode for demo
npx playwright test --headed tests/05A_CustomReporting/

# Run single test file
npx playwright test tests/05A_CustomReporting/248A_custom_reporting.spec.ts
```
