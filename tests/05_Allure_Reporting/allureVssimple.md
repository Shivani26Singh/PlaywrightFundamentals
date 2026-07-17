# Playwright + Allure Reporting Complete Guide

# Table of Contents

1. Why Allure?
2. Playwright Default Reporter vs Allure
3. Installation
4. Playwright Configuration
5. Adding Allure to Tests
6. Common Allure Features
7. Attachments
8. Enterprise Usage
9. Best Practices
10. Useful Commands

---

# 1. Why Allure?

Playwright already provides reporting, screenshots, traces and videos.

Allure is an advanced reporting framework that provides:

- Beautiful interactive reports
- Better grouping of tests
- Rich metadata
- Attachments
- Historical trends
- CI/CD integration
- Jira/TestRail integration
- Failure analysis

It is widely used in enterprise automation projects.

---

# 2. Playwright Default Reporter vs Allure Reporter

| Feature | Playwright HTML Reporter | Allure Reporter |
|----------|-------------------------|-----------------|
| HTML Report | ✅ | ✅ |
| Screenshots | ✅ | ✅ |
| Videos | ✅ | ✅ |
| Trace Viewer | ✅ | ✅ |
| Console Output | ✅ | ✅ |
| Test Steps | ✅ | ✅ (More Interactive) |
| Epic | ❌ | ✅ |
| Feature | ❌ | ✅ |
| Story | ❌ | ✅ |
| Owner | ❌ | ✅ |
| Severity | ❌ | ✅ |
| Tags | Limited | ✅ |
| Parameters | Limited | ✅ |
| Attachments | Basic | Excellent |
| JSON Attachments | ❌ | ✅ |
| Text Attachments | ❌ | ✅ |
| HTML Attachments | ❌ | ✅ |
| API Response Attachments | ❌ | ✅ |
| Browser Logs | Manual | Easy |
| Jira Integration | ❌ | ✅ |
| TestRail Integration | ❌ | ✅ |
| Historical Trends | ❌ | ✅ |
| Categories | ❌ | ✅ |
| Environment Report | ❌ | ✅ |
| Dashboard View | Basic | Rich Dashboard |
| CI/CD Integration | Good | Excellent |

---

# 3. Installation

Install Playwright Reporter

```bash
npm install --save-dev allure-playwright
```

Install Allure Commandline

```bash
npm install --save-dev allure-commandline
```

---

# 4. Playwright Configuration

```ts
reporter: [
    ["line"],
    ["allure-playwright"]
]
```

or

```ts
reporter: [
    ["html"],
    ["allure-playwright"]
]
```

---

# 5. Import Allure

Inside every test file

```ts
import * as allure from "allure-js-commons";
```

---

# 6. Allure Features

| Feature | Syntax | Purpose | Enterprise Usage |
|----------|--------|----------|-----------------|
| Epic | await allure.epic("Authentication") | Highest Level Group | ⭐⭐⭐⭐⭐ |
| Feature | await allure.feature("Login") | Module Name | ⭐⭐⭐⭐⭐ |
| Story | await allure.story("Valid Login") | User Story | ⭐⭐⭐⭐⭐ |
| Description | await allure.description("Verify login") | Test Description | ⭐⭐⭐⭐⭐ |
| Owner | await allure.owner("Shivani") | Test Owner | ⭐⭐⭐⭐ |
| Severity | await allure.severity("critical") | Test Priority | ⭐⭐⭐⭐⭐ |
| Tag | await allure.tag("smoke") | Categorization | ⭐⭐⭐⭐⭐ |
| Parent Suite | await allure.parentSuite("Authentication") | Top Suite | ⭐⭐⭐⭐ |
| Suite | await allure.suite("Login Module") | Middle Suite | ⭐⭐⭐⭐ |
| Sub Suite | await allure.subSuite("Positive Login") | Lowest Suite | ⭐⭐⭐⭐ |
| Parameter | await allure.parameter("Browser","Chrome") | Runtime Values | ⭐⭐⭐⭐⭐ |
| Label | await allure.label("team","QA") | Custom Labels | ⭐⭐⭐⭐ |
| Link | await allure.link(url,"Docs") | Documentation | ⭐⭐⭐ |
| Issue | await allure.issue("MDA-101",url) | Jira Bug | ⭐⭐⭐⭐⭐ |
| TMS | await allure.tms("TC-101",url) | TestRail/Xray | ⭐⭐⭐⭐⭐ |

---

# 7. Attachments

## Screenshot

```ts
await allure.attachment(
    "Dashboard",
    await page.screenshot(),
    {
        contentType: "image/png"
    }
);
```

---

## JSON

```ts
await allure.attachment(
    "Response",
    JSON.stringify(response,null,2),
    {
        contentType:"application/json"
    }
);
```

---

## Text

```ts
await allure.attachment(
    "Logs",
    logs,
    {
        contentType:"text/plain"
    }
);
```

---

## HTML

```ts
await allure.attachment(
    "DOM",
    await page.content(),
    {
        contentType:"text/html"
    }
);
```

---

## CSV

```ts
await allure.attachment(
    "Users",
    csvData,
    {
        contentType:"text/csv"
    }
);
```

---

# 8. Test Steps

```ts
await test.step("Open Login Page", async () => {

});
```

Benefits

- Better readability
- Easier debugging
- Step-level screenshots
- Step timing

---

# 9. Playwright Native Attachments

```ts
await testInfo.attach(
    "Dashboard Screenshot",
    {
        body: await page.screenshot(),
        contentType:"image/png"
    }
);
```

---

# 10. Useful Commands

Run Tests

```bash
npx playwright test
```

Generate Allure Results

```bash
npx playwright test tests/example.spec.ts
```

Serve Report

```bash
allure serve allure-results
```

Generate Static Report

```bash
allure generate allure-results --clean
```

Open Existing Report

```bash
allure open allure-report
```

---

# 11. Enterprise Best Practices

✅ Use Epic for Product

Example

Authentication

Payments

Admin

Shopping Cart

---

✅ Use Feature for Modules

Example

Login

Registration

Dashboard

Settings

---

✅ Use Story for User Stories

Example

Valid Login

Invalid Login

Forgot Password

---

✅ Use Severity

critical

normal

minor

blocker

trivial

---

✅ Use Tags

smoke

regression

sanity

api

ui

mobile

---

✅ Attach

- Screenshots
- API Responses
- Browser Logs
- Console Logs
- HTML
- JSON
- CSV

---

# 12. Typical Enterprise Mapping

| Artifact | Allure Feature |
|-----------|---------------|
| Requirement | Epic |
| Module | Feature |
| User Story | Story |
| Jira Bug | Issue |
| TestRail Test Case | TMS |
| Test Owner | Owner |
| Priority | Severity |
| Browser | Parameter |
| Test Data | Parameter |
| Screenshot | Attachment |
| API Response | Attachment |
| Browser Logs | Attachment |
| HTML Source | Attachment |

---

# 13. Recommended Learning Order

## Beginner

- Description
- Epic
- Feature
- Story

---

## Intermediate

- Severity
- Owner
- Tags
- Parameters

---

## Advanced

- Attachments
- Screenshots
- JSON
- Browser Logs
- API Responses

---

## Expert

- Jira Integration
- TestRail Integration
- Categories
- Environment
- Historical Trends
- CI/CD
- Dashboards

---

# Summary

Playwright HTML Reporter is excellent for local execution and debugging.

Allure is designed for enterprise reporting with:

- Rich metadata
- Interactive dashboards
- Historical trends
- CI/CD support
- Jira integration
- TestRail integration
- Better attachments
- Better visualization

For enterprise automation projects, the most common combination is:

```ts
reporter: [
    ["html"],
    ["allure-playwright"]
]
```

This gives you the best of both worlds:
- Playwright HTML Report for quick debugging.
- Allure Report for detailed reporting, analytics, and stakeholder-friendly dashboards.