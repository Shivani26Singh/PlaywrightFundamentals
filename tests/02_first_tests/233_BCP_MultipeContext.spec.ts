import { chromium } from "playwright";

/*
TypeScript type inference. It can automatically determine the types from the methods you call:
let browser = await chromium.launch();
TypeScript infers: Browser

let adminContext = await browser.newContext();
TypeScript infers: BrowserContext

let adminPage = await adminContext.newPage();
TypeScript infers: Page
*/

async function multiUserTest() {

    // Launch a browser instance
    let browser = await chromium.launch({ headless: false });

    // Create two separate browser contexts for different users

    // === Admin ===
    let adminContext = await browser.newContext();
    let adminPage = await adminContext.newPage();
    await adminPage.goto("https://app.vwo.com/login");
    console.log("Admin: on login page");


    // === Viewer ===
    let viewerContext = await browser.newContext();
    let viewerPage = await viewerContext.newPage();
    await viewerPage.goto("https://app.vwo.com/login");
    console.log("Viewer: on login page");

    // close the contexts and browser after the test
    // good practice to avoid memory leaks and ensure clean test runs
    await adminContext.close();
    await viewerContext.close();

    await browser.close();


}

multiUserTest();