import { chromium, Browser, BrowserContext, Page } from "playwright";
//Browser - Represents a browser instance. 
// It is the top-level object that allows you to launch and manage browser contexts and pages. 
// You can use it to launch a new browser, create new contexts, and close the browser when you're done.

//BrowserContext - Represents an isolated browser session. 
// It allows you to create multiple independent contexts within a single browser instance. 
// Each context has its own cookies, cache, and storage, 
// making it useful for testing scenarios that require isolation between different users or sessions.

//Page - Represents a single tab or window in the browser. 
// It provides methods to interact with the page, such as navigating to URLs, 
// clicking elements, filling forms, and asserting conditions.   

/*
Browser
│
├── BrowserContext 1  → User/Session 1
│   │
│   ├── Page 1       → Tab 1
│   ├── Page 2       → Tab 2
│   └── Page 3       → Tab 3
│
├── BrowserContext 2  → User/Session 2
│   │
│   ├── Page 1        → Tab 1
│   └── Page 2        → Tab 2
│
└── BrowserContext 3  → User/Session 3
    │
    └── Page 1        → Tab 1
    */

async function run() {

    // LEVEL 1: Launch browser — heaviest operation, do it once
    // chromium - Represents the Chromium browser engine, 
    // which is the open-source project behind Google Chrome.
    let browser: Browser = await chromium.launch({ headless: false });
    console.log("Browser Launched", browser);

    // LEVEL 2: Create context — fresh session, isolated cookies
    // BrowserContext - Represents an isolated browser session.
    let context1: BrowserContext = await browser.newContext();
    console.log("Context created", context1);

    // LEVEL 2: Create context — fresh session, isolated cookies
    let context2: BrowserContext = await browser.newContext();
    console.log("Context created", context2);


    // LEVEL 3: Open page — a tab inside the context
    // Page - Represents a single tab or window in the browser.
    let page: Page = await context1.newPage();
    console.log("Page opened");


    await page.goto("https://app.vwo.com");
    console.log("Title:", await page.title());

    // Cleanup - reverse oder
    await page.close();
    await context1.close();
    await context2.close();
    await browser.close();

}

// Browser launched
// Context created
// Page opened
// Title: Example Domain
run();