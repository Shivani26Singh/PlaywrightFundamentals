# Playwright Fundamentals

End-to-end test automation project using [Playwright](https://playwright.dev/) with TypeScript. Includes a custom real-time HTML reporter, Allure integration, and 23 hands-on test modules.

## Tech Stack

- [Playwright Test](https://playwright.dev/docs/intro) `^1.61.1`
- TypeScript / Node.js
- Custom HTML Reporter (real-time, self-contained)
- Allure Reporter (legacy)

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ (LTS recommended)
- npm (ships with Node)

## Getting Started

```bash
npm install
npx playwright install
```

## Running Tests

```bash
# Run all tests
npx playwright test

# Run in headed mode
npx playwright test --headed

# Run a single spec
npx playwright test tests/05A_CustomReporting/248A_custom_reporting.spec.ts

# Run with a specific tag (e.g. @smoke, @P0, @P1)
npx playwright test --grep "@P0"

# Run in interactive UI mode
npx playwright test --ui

# Debug a failing test
npx playwright test --debug
```

## Viewing Reports

```bash
# Open the custom HTML report
npm run open-report

# Or open the latest directly
start custom-report/index.html    # Windows
open custom-report/index.html     # macOS
```

The custom reporter generates live-updating HTML in `custom-report/` with real-time step tracking, screenshots, videos, traces, console logs, and filtering.

## Project Structure

```
.
├── tests/
│   ├── 01_Basics/                  # First Playwright scripts
│   ├── 02_first_tests/             # Core test concepts
│   ├── 03_Locators_Commands/       # Locator strategies & commands
│   ├── 04_Session_Storage/         # Storage state & session reuse
│   ├── 05_Allure_Reporting/        # Allure integration tests
│   ├── 05A_CustomReporting/        # Custom HTML reporter demo
│   │   ├── 248A_custom_reporting.spec.ts
│   │   ├── README.md               # Folder-specific guide
│   │   ├── Reporter-Comparison.md  # Default vs Allure vs Custom
│   │   └── Custom-Reporter-Capabilities.md  # Full feature reference
│   ├── 06_Multiple_Element_/       # Multi-element interactions
│   ├── 07_WebTables/               # Table handling
│   ├── 08_Web_Select_Frames_Iframe/ # Dropdowns, frames, iframes
│   ├── 09_Frame_Iframe/            # Frame/iframe deep dive
│   ├── 10_Keyboard_Hover_Drag_Drop/ # Advanced interactions
│   ├── 11_JS_Alerts/               # JavaScript alerts & dialogs
│   ├── 12_Handle_SVG/              # SVG element handling
│   ├── 13_Shadow_DOM/              # Shadow DOM traversal
│   ├── 14_FileUpload/              # File upload workflows
│   ├── 15_File_Download/           # File download verification
│   ├── 16_Scroll_toElement/        # Scroll actions
│   ├── 17_Expect_Assertions/       # Advanced assertions
│   ├── 18_Test_hooks/              # beforeEach/afterEach patterns
│   ├── 19_Data_Driven_Testing/     # Parameterized tests
│   ├── 20_Page_Object_Model/       # POM design pattern
│   ├── 21_Fixture/                 # Custom fixtures
│   ├── 22_Misc_Concepts/           # Miscellaneous patterns
│   ├── 23_Advance_Framework/       # Advanced framework concepts
│   └── Projects/                   # Project-specific E2E tests
├── utils/
│   └── CustomReporter.ts           # Custom real-time HTML reporter
├── playwright.config.ts            # Playwright configuration
├── package.json
└── custom-report/                  # Generated reports (gitignored)
```

## Configuration Highlights

Defined in `playwright.config.ts`:

- `testDir: './tests'` — all specs under `tests/`
- `fullyParallel: true` — parallel test execution
- `reporter: [["line"], ["./utils/CustomReporter.ts"]]` — terminal + custom HTML
- `trace: 'on'`, `video: 'on'`, `screenshot: 'on'` — full artifact capture
- Chromium project configured (Firefox/WebKit available, commented out)

## Custom Reporter Quick Reference

| Capability | Details |
|---|---|
| Output | `custom-report/report_YYYYMMDD_HHMMSS.html` |
| Live updates | Auto-refreshes every 5 seconds during test run |
| Steps | Expandable per-step with timing, console logs, screenshots |
| Filters | Status (passed/failed/skipped) + tags (P0/P1/smoke)|
| History | `custom-report/history.html` — all past runs |
| Assets | Screenshots, videos, traces auto-copied to report dir |
| Author | Defaults to "Shivani Singh" |
| Environment | Defaults to "QA" (set `TEST_ENV` to override) |

## Learn More

- [Playwright Docs](https://playwright.dev/docs/intro)

## License

ISC
