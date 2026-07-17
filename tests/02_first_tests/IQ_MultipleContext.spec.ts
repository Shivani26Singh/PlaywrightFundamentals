// Multiple browser contexts - navigating two different sites simultaneously

import { test } from "@playwright/test";

test("Multiple contexts test", async ({ browser }) => {
    // Create two completely separate browser contexts

    // Cart Context
    let cartContext = await browser.newContext();
    let cartPage = await cartContext.newPage();

    // Bank Context
    let bankContext = await browser.newContext();
    let bankPage = await bankContext.newPage();

    // Navigate to different pages for each context
    await cartPage.goto("https://app.thetestingacademy.com/playwright/ttacart/");
    await bankPage.goto("https://tta-bank-digital-973242068062.us-west1.run.app/");

    console.log("Cart URL:", cartPage.url());
    console.log("Bank URL:", bankPage.url());

    await cartContext.close();
    await bankContext.close();
    await browser.close();
});
