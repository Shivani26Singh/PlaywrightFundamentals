# Reporter Comparison — Terminology Explainer

Each row from the comparison table explained with definitions and examples. Use this when someone asks "What does that mean?"

---

## Setup Complexity

| Term | Meaning | Example |
|---|---|---|
| **Zero config** | Works out of the box. No extra files, no install, no config changes needed. | Playwright's Default HTML Reporter works the moment you run `npx playwright test`. No `npm install`, no config changes. |
| **Requires `allure-playwright`** | Must install a separate npm package before the reporter can be used. | `npm install allure-playwright` — without this, Allure won't generate any results. |
| **`allure-commandline`** | A second CLI tool (separate from Playwright) that converts Allure's JSON results into a viewable HTML report. Requires Java Runtime (JRE). | After tests run, you must execute `npx allure generate` and `npx allure open` to see the report. |
| **Drop-in file, no extra CLI** | Copy one `.ts` file into your project, point `playwright.config.ts` at it — that's it. No `npm install`, no command-line tools. | You copy `CustomReporter.ts` to `utils/`. Your config has `reporter: ["./utils/CustomReporter.ts"]`. Tests run → HTML report is ready instantly. |

---

## Output Format

| Term | Meaning | Example |
|---|---|---|
| **Single `index.html`** | One HTML file contains the entire report. Open it in any browser — no server, no tooling needed. Images/videos are embedded as base64 or linked relatively. | `playwright-report/index.html` — double-click to open. |
| **JSON results → `allure serve`** | Allure first writes raw JSON files (not human-readable), then a separate `allure generate` step converts them to HTML. The `allure serve` command does both and hosts a local web server. | After tests: `allure-results/` folder has `.json` files. Then `allure generate allure-results -o allure-report` creates HTML. Without this 2-step process, you can't view anything. |
| **Self-contained `report_*.html`** | Everything — CSS styles, data, images, video links — lives in one directory (`custom-report/`). No external server, no build step. The `*` in the filename is a timestamp like `20260717_170147`. | Open `custom-report/report_20260717_170147.html` in any browser and it works immediately. All screenshots are in `custom-report/screenshots/` alongside the HTML. |

---

## Real-time Updates

| Term | Meaning | Example |
|---|---|---|
| **Only after run** | The report file is written once, at the very end of the test run. You cannot see partial results while tests are still executing. | With Default HTML or Allure, you must wait for all 100 tests to finish before opening the report to see results. |
| **Live refresh every 5s** | The HTML file is re-written constantly during test execution. A `<meta http-equiv="refresh">` tag in the HTML tells the browser to reload every 5 seconds. | Open `custom-report/index.html` while tests run. You'll see test 1 appear, then test 2, then test 3… with live running totals updating every 5 seconds. |

---

## Test Metadata

| Term | Meaning | Example |
|---|---|---|
| **Title, file, duration** | Basic info: what the test is called, which file it's in, how long it took. | "Login Test" | `auth.spec.ts` | 2.3s |
| **Epic, Feature, Story** | Allure-specific hierarchy. Epic = large business area (e.g., "Authentication"). Feature = sub-area (e.g., "Login"). Story = individual behavior (e.g., "Valid credentials"). | `await allure.epic("Checkout")` → appears in Allure reports as a category filter. |
| **Severity, Owner, Tags** | Additional classification. Severity = how critical (blocker, critical, normal). Owner = who wrote the test. Tags = arbitrary labels like `@smoke`, `@regression`. | `await allure.severity("critical")`, `await allure.owner("Shivani")` — metadata embedded in Allure JSON. |
| **Tags, Suite, File, Author, Duration** | The Custom Reporter auto-extracts tags from test titles (`@P0`, `@smoke`), suite name from `test.describe()`, file path from config, author from env var or default "Shivani Singh". | Test titled `"Login works @P0 @smoke"` → Tags column shows `@P0` `@smoke` as interactive filter chips. |

---

## Screenshots

| Term | Meaning | Example |
|---|---|---|
| **Embedded per test** | Screenshots appear in the detail panel of each test but aren't associated with specific steps. | Default HTML shows one "Screenshots" section per test with all images. |
| **Per-step via `allure.attachment()`** | Each screenshot must be manually attached inside a step using Allure's API. | `await allure.attachment("screenshot", await page.screenshot(), { contentType: "image/png" })` — placed inside a `test.step()`. |
| **Per-step linked + grid view** | Screenshots are auto-linked to steps by naming convention (`step-0-name`) and also available in a full-page grid at the bottom of the test detail panel. | `testInfo.attach("step-0-Login Page", ...)` → appears inside Step 0's expanded view AND in the Screenshots grid section. |

---

## Videos

| Term | Meaning | Example |
|---|---|---|
| **Not shown in report** | A `.webm` file is recorded but it lives in `test-results/` and isn't linked from the HTML report. You'd have to find it manually. | Default HTML: video file exists at `test-results/auth-chromium/video.webm` but the report never references it. |
| **Requires manual attachment** | Video must be explicitly attached via Allure API, otherwise it's ignored. | You must write `await allure.attachment("video", videoPath, { contentType: "video/webm" })` in your test. |
| **Embedded player per test** | The reporter auto-detects the video from `result.attachments`, copies it to `custom-report/videos/`, and embeds a `<video>` player in the HTML. | Click the test name in the report → scroll to "Videos" section → see and play the recording directly. Also has a "▶ Play" link in the main table. |

---

## Traces

| Term | Meaning | Example |
|---|---|---|
| **Download link** | A "trace" is a `.zip` file containing a full Playwright Trace (DOM snapshots, network calls, console). The report links to download it. | Open trace with `npx playwright show-trace trace.zip` to replay every action frame-by-frame. |
| **Not included** | Allure doesn't handle Playwright traces natively. You'd need custom code to attach them. | The `.zip` is generated but never appears in Allure's report UI. |

---

## Step Breakdown

| Term | Meaning | Example |
|---|---|---|
| **Flat list only** | Steps appear as a linear list with no grouping or nesting. Internal hooks and user steps are mixed together. | Default HTML: you see "Before Hooks → beforeEach → test body → After Hooks" all in one flat row. |
| **Hierarchical with `test.step`** | Steps can be nested inside each other. Parent steps contain child steps. | `test.step("Login", async () => { test.step("Enter username", ...); test.step("Enter password", ...); })` — Login is parent, username/password are children. |
| **Expandable per-step with timing** | Each step is a clickable row that expands to show start time, duration, video timestamp range, console logs, attached screenshots. | Click "Navigate to Dashboard" → expands to show: ⏱️ Started 10:30:15 | ⏳ Duration 2.3s | 🎬 Video 0:05 - 0:07 | 📋 Console: "Navigating to..." | 📷 Screenshot thumbnail. |

---

## Console Logs

| Term | Meaning | Example |
|---|---|---|
| **Raw output** | All `console.log()` from the entire test is dumped into one section, not grouped by step. | Default HTML: one "stdout" block with 50 lines from all steps mixed together. Hard to tell which log came from which action. |
| **Not captured** | Allure doesn't capture `console.log()` at all. | Even if you log "User logged in successfully", it won't appear in Allure's report. |
| **Per-step console output** | Each step stores its own logs. When you expand a step, you see exactly what that step logged. | Step "Submit login form" shows: `📤 Submitting form...` `✅ Response: 200 OK`. Step "Verify dashboard" shows its own separate `console.log()` lines. |

---

## Step Timestamps

| Term | Meaning | Example |
|---|---|---|
| **No timestamps** | You can't tell when a step started. | Flat list shows steps but no "Started at 10:30:15 AM". |
| **Start/End + video offset** | Each step records its real wall-clock start time and its position in the test video. | "⏱️ Started: 4:54:32 pm" and "🎬 Video: 0:02.15 - 0:03.80" — you can jump directly to that moment in the recorded video. |

---

## Filters (Status)

| Term | Meaning | Example |
|---|---|---|
| **Passed/Failed/Skipped** | Built-in filters in the report UI to show only tests with a given status. | Click "Failed" → table shows only the 3 red rows. |
| **Via Allure UI** | Allure has its own sidebar filters for status, but they require the Allure server to be running. | Open Allure → left panel → click "Failed" → view updates. Works only while `allure serve` is active. |
| **Checkbox filters** | HTML checkboxes above the table. Toggle Passed/Failed/Skipped to show/hide rows instantly. No server needed. | Uncheck "✅ Passed" → the 10 green rows disappear, leaving only red and grey rows visible. Works entirely in the browser. |

---

## Filters (Tags)

| Term | Meaning | Example |
|---|---|---|
| **Search box** | Default HTML has a text search field. Type `@smoke` and it filters rows. Not ideal for discovery (you need to know the tags exist). | Type `"@P0"` in search → matches tests with @P0 in title. |
| **Via Allure UI** | Allure shows tags as clickable filter chips in its sidebar. | Click the `@smoke` chip in Allure → only smoke tests. |
| **Checkbox: P0, P1, Smoke** | Pre-built priority checkboxes. No typing required — just click the label. | Check the "P0" box → only critical tests appear. Works alongside status filters (e.g., "P0 + Failed" shows critical failures). |

---

## Historical Runs

| Term | Meaning | Example |
|---|---|---|
| **Single report** | Each run overwrites the previous report. Only the latest run's results are available. | Run tests twice → only the second run's `playwright-report/` exists. The first one is gone. |
| **Trend graphs** | Allure keeps a history and shows graphs: test duration over time, pass/fail trends, retry trends. | Allure dashboard: line chart showing "Pass rate: 95% → 92% → 98%" across 10 runs. |
| **History page with all runs** | Custom Reporter generates `custom-report/history.html` listing every run with timestamps and links. Each run gets a unique filename (`report_20260717_170147.html`) so previous runs are never overwritten. | Open `history.html` → see 15 previous runs, click any to open that run's full report. No graphs, but all data preserved. |

---

## Parallel Support

| Term | Meaning | Example |
|---|---|---|
| **✅ Built-in** | Works correctly when Playwright runs tests in parallel (multiple workers). No data corruption or race conditions. | 4 workers run 4 tests simultaneously. Each test's steps, screenshots, and results are correctly associated in the final report. |

---

## Terminal Output

| Term | Meaning | Example |
|---|---|---|
| **Minimal dots** | The terminal shows `.` for passing tests, `F` for failing. No step-level detail. | Default/Allure: `Running 50 tests... .....F......` — visually uninformative during long runs. |
| **Rich emoji + step detail** | Each test and each step prints to the terminal with emojis, timing, and status icons. | `✅ Navigate to login page (1.2s)` — you see exactly which step is running, its duration, and whether it passed, in real-time. |

---

## External Dependencies

| Term | Meaning | Example |
|---|---|---|
| **None** | The reporter uses only what's already in your `node_modules` from Playwright itself. No additional packages. | Default HTML: built into `@playwright/test`. Custom Reporter: imports only `fs`, `path` (Node.js built-ins) and Playwright's `@playwright/test/reporter` types. |
| **JRE (Java) for `allure serve`** | Allure's report server is a Java application. Your machine must have Java Runtime Environment installed. | Without Java: `npx allure serve` → "Java not found" error. With Java: a local web server starts on port. |

---

## CI/CD Integration

| Term | Meaning | Example |
|---|---|---|
| **Simple HTML artifact** | The report folder is uploaded as a CI artifact. Anyone can download and open `index.html`. | GitHub Actions: `uses: actions/upload-artifact@v4` with `path: playwright-report/`. |
| **Jenkins/GitHub Actions plugins** | Allure has dedicated plugins that parse `allure-results/` and display trend graphs in the CI dashboard. | Jenkins Allure Plugin auto-generates trend charts without manual steps. |
| **HTML artifact + history** | Same as simple HTML, but you also get a `history.html` page listing all past CI runs. | Upload `custom-report/` as an artifact. The history page grows with each CI run since unique filenames prevent overwrites. |

---

## Custom Branding

| Term | Meaning | Example |
|---|---|---|
| **Static theme** | You can't change colors, fonts, or layout. | Default HTML always looks the same: Playwright green, default CSS. |
| **Limited** | Allure allows some customization via plugins or config, but deep CSS changes require modifying Allure's Java code. | You can add a logo or company name, but changing the sidebar color requires custom plugins. |
| **Fully custom CSS** | The entire stylesheet is generated in TypeScript. Change `getStyles()` to make it look however you want. | Change `--primary: #059669` to `--primary: #ff6b35` → whole report becomes orange-themed. Change header text, footer branding, font family — all from one file. |

---

## Error Stack Traces

| Term | Meaning | Example |
|---|---|---|
| **Shown in report** | The error message and call stack appear in the test detail. | "Error: expect(page).toHaveURL(/dashboard/) failed. Expected pattern: /dashboard/. Received: /login." |
| **Expandable per-step** | Custom Reporter shows the error inside the specific step that failed, not just at the test level. | Step "Verify dashboard URL" expands to show: ❌ Error → exact `expect()` failure. Step "Capture page info" never ran (step after failure), so no error there. |

---

## Retry Visibility

| Term | Meaning | Example |
|---|---|---|
| **Separate entries** | Each retry attempt appears as a distinct row in the report. | Default HTML: "Login Test (attempt 1)" and "Login Test (attempt 2)" as two rows. |
| **Status-aware** | Allure shows retries grouped under one test with a status indicating the final outcome. | Allure: one test entry, dropdown shows all attempts. |
| **Artifact suffix per retry** | The Custom Reporter suffixes artifacts with `r1`, `r2` so retry screenshots and videos don't overwrite each other. | First attempt: `screenshot_1_1.png`. Retry: `screenshot_1r1_1.png`. Both preserved. |

---

## Test Code Changes

| Term | Meaning | Example |
|---|---|---|
| **None required** | Write tests normally. The reporter needs nothing extra from your test code. | Default HTML: `test("my test", async ({ page }) => { await page.goto("..."); });` — that's it. |
| **Must add `allure.epic()` etc.** | Every test must import and call Allure APIs for metadata to appear. Without them, the report is sparse. | `import * as allure from "allure-js-commons"` required. Then `await allure.epic(...)`, `await allure.owner(...)` etc. in each test. |
| **Uses Playwright native APIs** | `test.step()`, `testInfo.attach()`, and `console.log()` — these are built into Playwright. No extra imports. | `test.step("Login", async () => { ... })` — captured automatically. `testInfo.attach(...)` — captured automatically. |

---

## Report Size

| Term | Meaning | Example |
|---|---|---|
| **~1-5 MB total** | HTML + embedded screenshots in one folder. | 20 tests with 3 screenshots each → ~3-4 MB. |
| **~1-10 MB + Java render** | JSON results are small, but the rendered HTML + Allure's Java server add overhead. | The `allure-results/` folder is ~2 MB. The generated `allure-report/` is ~5-8 MB. |
| **~1-5 MB self-contained** | Similar to Default HTML but with videos and traces linked (not embedded), keeping the HTML file small. | The `custom-report/` folder might be 50+ MB with videos, but the `.html` itself is < 500 KB. |
