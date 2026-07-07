/*
Context - 1 - https://app.thetestingacademy.com/playwright/ttacart/
Context - 2 → https://tta-bank-digital-973242068062.us-west1.run.app/
*/

import { test } from "@playwright/test";

test("Multiple contexts test", async ({ browser }) => {
    // Create two completely separate browser contexts

    // ttaCartContext
    let ttaCartContext = await browser.newContext();
    let ttaCartPage = await ttaCartContext.newPage();

    // ttaBankContext
    let ttaBankContext = await browser.newContext();
    let ttaBankPage = await ttaBankContext.newPage();

    // Navigate to different pages for each context
    await ttaCartPage.goto("https://app.thetestingacademy.com/playwright/ttacart/");
    await ttaBankPage.goto("https://tta-bank-digital-973242068062.us-west1.run.app/");

    console.log("Admin URL:", ttaCartPage.url());
    console.log("Guest URL:", ttaBankPage.url());

    await ttaCartContext.close();
    await ttaBankContext.close();
    await browser.close();
});