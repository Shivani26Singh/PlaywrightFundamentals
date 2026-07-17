# 📊 Playwright Reporter Comparison

## Overview

This document compares three reporting approaches for Playwright: **Default HTML Reporter**, **Allure Reporter**, and the **Custom HTML Reporter**. Each has unique strengths and trade-offs.

| Feature | Default HTML | Allure Reporter | Custom Reporter |
|---|---|---|---|
| **Setup Complexity** | Zero config | Requires `allure-playwright` + `allure-commandline` | Drop-in file, no extra CLI |
| **Output Format** | Single `index.html` | JSON results → `allure serve` | Self-contained `report_*.html` |
| **Real-time Updates** | ❌ Only after run | ❌ Only after run | ✅ Live refresh every 5s |
| **Test Metadata** | Title, file, duration | Epic, Feature, Story, Severity, Owner, Tags | Tags, Suite, File, Author, Duration |
| **Screenshots** | ✅ Embedded per test | ✅ Per-step via `allure.attachment()` | ✅ Per-step linked + grid view |
| **Videos** | ❌ Not shown in report | ❌ Requires manual attachment | ✅ Embedded player per test |
| **Traces** | ✅ Download link | ❌ Not included | ✅ Download link per test |
| **Step Breakdown** | ❌ Flat list only | ✅ Hierarchical with `test.step` | ✅ Expandable per-step with timing |
| **Console Logs** | ✅ Raw output | ❌ Not captured | ✅ Per-step console output |
| **Step Timestamps** | ❌ No | ❌ No | ✅ Start/End + video offset |
| **Filters (Status)** | ✅ Passed/Failed/Skipped | ✅ Via Allure UI | ✅ Checkbox filters |
| **Filters (Tags)** | ✅ Search box | ✅ Via Allure UI | ✅ Checkbox: P0, P1, Smoke |
| **Historical Runs** | ❌ Single report | ✅ Trend graphs in Allure | ✅ History page with all runs |
| **Parallel Support** | ✅ Built-in | ✅ Built-in | ✅ Fully supported |
| **Terminal Output** | Minimal dots | Minimal dots | ✅ Rich emoji + step detail |
| **External Dependencies** | None | JRE (Java) for `allure serve` | None |
| **CI/CD Integration** | Simple HTML artifact | Jenkins/GitHub Actions plugins | HTML artifact + history |
| **Custom Branding** | ❌ Static theme | ❌ Limited | ✅ Fully custom CSS |
| **Error Stack Traces** | ✅ Shown in report | ✅ Shown in report | ✅ Expandable per-step |
| **Retry Visibility** | ✅ Separate entries | ✅ Status-aware | ✅ Artifact suffix per retry |
| **Test Code Changes** | None required | Must add `allure.epic()`, `allure.attachment()` etc. | Uses Playwright native `test.step`, `testInfo.attach()`, `console.log()` |
| **Report Size** | ~1-5 MB total | ~1-10 MB + Java render | ~1-5 MB self-contained |

---

## 🔍 Detailed Comparison

### 1. Setup & Configuration

| | Default HTML | Allure | Custom Reporter |
|---|---|---|---|
| `playwright.config.ts` | `reporter: 'html'` | `reporter: [["allure-playwright"]]` | `reporter: ["./utils/CustomReporter.ts"]` |
| Install | Built-in | `npm i allure-playwright` | Copy `CustomReporter.ts` |
| View Report | Open `index.html` in browser | `npx allure generate && npx allure open` | Open `custom-report/report_*.html` in browser |
| Java Required? | ❌ No | ✅ Yes (for `allure serve`) | ❌ No |

**Verdict:** Custom Reporter is the easiest drop-in — no install, no Java, no CLI commands.

---

### 2. Test Code Changes

**Default HTML** — no changes needed:

```ts
test("my test", async ({ page }) => {
  await page.goto("...");
});
```

**Allure** — requires Allure API calls in every test:

```ts
import * as allure from "allure-js-commons";

test("my test", async ({ page }) => {
  await allure.epic("Checkout");
  await allure.feature("Cart");
  await allure.severity("critical");
  await allure.owner("Shivani");

  await allure.attachment("screenshot", await page.screenshot(), { contentType: "image/png" });
});
```

**Custom Reporter** — uses Playwright's native APIs, no extra imports:

```ts
test("my test", async ({ page }, testInfo) => {
  // Metadata via testInfo.attach()
  testInfo.attach("Test Metadata", {
    body: JSON.stringify({ epic: "Checkout", feature: "Cart" }),
    contentType: "application/json",
  });

  // Steps via test.step()
  await test.step("Open page", async () => {
    console.log("Opening page..."); // captured per-step!
    await page.goto("...");
    testInfo.attach("step-0-screenshot", {
      body: await page.screenshot(),
      contentType: "image/png",
    });
  });
});
```

**Verdict:** Custom Reporter uses **only Playwright native APIs** — `test.step`, `testInfo.attach`, `console.log`. No third-party imports cluttering tests.

---

### 3. Real-time vs Post-run

| | Default HTML | Allure | Custom Reporter |
|---|---|---|---|
| During run | ❌ Nothing | ❌ Nothing | ✅ Live HTML + terminal emoji output |
| After run | Static HTML | JSON → generate → serve | Final HTML with all data |

Custom Reporter shows progress in real-time — you can open `custom-report/index.html` during a run and watch results populate every 5 seconds.

---

### 4. Terminal Output

**Default HTML Reporter:**
```
Running 5 tests using 1 worker
  ✓ test 1 (2s)
  ✓ test 2 (1s)
```

**Allure Reporter:**
```
Running 5 tests using 1 worker
  ✓ test 1 (2s)
```

**Custom Reporter:**
```
╔════════════════════════════════════════════════════════════════╗
║        🎭 PLAYWRIGHT AUTOMATION - REAL-TIME REPORT         ║
╠════════════════════════════════════════════════════════════════╣
║  📅 Started: Jul 17, 2026, 10:30:15 AM                        ║
║  📊 Total Tests: 2                                             ║
║  🌐 Environment: QA                                            ║
╚════════════════════════════════════════════════════════════════╝

▶️  STARTING: Go directly to Dashboard using saved session @P0 @smoke
   📁 File: 248A_custom_reporting.spec.ts
   📍 Suite: VWO - Session Storage Demo
   ⏳ 1️⃣ Open Dashboard...
   ✅ 1️⃣ Open Dashboard (2341ms)
   ⏳ 2️⃣ Validate Dashboard URL...
   ✅ 2️⃣ Validate Dashboard URL (45ms)
   ⏳ 3️⃣ Capture Page Information...
   ✅ 3️⃣ Capture Page Information (12ms)
   ─────────────────────────────────────────────────────
   ✅ RESULT: PASSED | Duration: 3.2s
   📊 Running Total: ✅ 1 | ❌ 0 | ⏭️ 0

╔════════════════════════════════════════════════════════════════╗
║                    📊 FINAL TEST SUMMARY                        ║
╠════════════════════════════════════════════════════════════════╣
║  ✅ Passed:  2                                                 ║
║  ❌ Failed:  0                                                 ║
║  ⏭️  Skipped: 0                                                ║
║  📊 Total:   2                                                 ║
╠════════════════════════════════════════════════════════════════╣
║  ⏱️  Duration: 6.5s                                            ║
║  📈 Pass Rate: 100.0%                                          ║
╚════════════════════════════════════════════════════════════════╝
```

---

### 5. When to Use Which

| Use Case | Recommended Reporter |
|---|---|
| Quick local debugging, no overhead | **Default HTML** |
| Enterprise CI/CD with trend analysis, Jenkins integration, dashboards | **Allure** |
| Teams needing real-time visibility, custom branding, no Java dependency, rich terminal output | **Custom Reporter** |
| Demo / training sessions where live viewer needs to see progress | **Custom Reporter** |
| Projects with strict "no external CLI tools" policy | **Default HTML** or **Custom Reporter** |
| Large suites needing history + trend graphs | **Allure** |

---

### 6. Key Files in This Project

| File | Purpose |
|---|---|
| `utils/CustomReporter.ts` | The custom HTML reporter implementation (~2000 lines) |
| `tests/05A_CustomReporting/248A_custom_reporting.spec.ts` | Demo spec using native Playwright APIs only |
| `playwright.config.ts` | Configured with `./utils/CustomReporter.ts` |
| `custom-report/` | Output directory — contains `report_*.html`, `history.html`, `screenshots/`, `videos/`, `traces/` |
| `custom-report/history.html` | Browse all past test runs |

---

### 7. Quick Commands

```bash
# Run tests with Custom Reporter
npx playwright test tests/05A_CustomReporting/248A_custom_reporting.spec.ts

# Open the report (auto-refreshes during run)
start custom-report/index.html  # Windows
open custom-report/index.html   # macOS

# View run history
start custom-report/history.html

# Run with custom environment
TEST_ENV=PROD npx playwright test tests/05A_CustomReporting/
```
