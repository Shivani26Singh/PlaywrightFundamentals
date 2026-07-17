import { test, expect } from "@playwright/test";
import * as allure from "allure-js-commons";

// Reuse authenticated session
test.use({
    storageState: "./user-session.json"
});

test.describe("VWO - Session Storage Demo", () => {

    test.beforeEach(async () => {
        await allure.epic("Playwright Fundamentals");
        await allure.feature("Session Storage");
        await allure.parentSuite("Authentication");
        await allure.suite("Authenticated User");
        await allure.subSuite("Session Reuse");
        await allure.owner("Shivani Singh");
        await allure.severity("critical");
        await allure.tag("playwright");
        await allure.tag("session-storage");
        await allure.tag("demo");
    });

    test("Go directly to Dashboard using saved session @P0 @smoke",
        async ({ page }, testInfo) => {

            await allure.story("Dashboard Access");
            await allure.description(
                "Verify that a previously saved storageState allows the user to open the dashboard without logging in."
            );

            await allure.parameter("Browser", testInfo.project.name);
            await allure.parameter("AccountId", "1227004");
            await allure.parameter("Environment", "QA");

            await test.step("Open Dashboard", async () => {
                await page.goto("https://app.wingify.com/#/dashboard/get-started?accountId=1227004");

                await allure.attachment(
                    "Dashboard Screenshot",
                    await page.screenshot({ fullPage: true }),
                    { contentType: "image/png" }
                );

                await testInfo.attach("Dashboard Screenshot", {
                    body: await page.screenshot(),
                    contentType: "image/png"
                });
            });

            await test.step("Validate Dashboard URL", async () => {
                await expect(page).toHaveURL(/dashboard/);
                console.log(page.url());
            });

            await test.step("Capture Page Information", async () => {

                const title = await page.title();
                const url = page.url();

                await allure.attachment(
                    "Page Information",
                    JSON.stringify({
                        title,
                        url,
                        browser: testInfo.project.name
                    }, null, 2),
                    { contentType: "application/json" }
                );
            });

        });

    test("Go directly to Settings using saved session @P1 @regression",
        async ({ page }, testInfo) => {

            await allure.story("Settings Access");
            await allure.description(
                "Verify that authenticated users can navigate directly to Account Settings using storageState."
            );

            await allure.parameter("AccountId", "1227007");

            await test.step("Open Settings", async () => {

                await page.goto("https://app.wingify.com/#/settings/accounts/general?accountId=1227007");

                await allure.attachment(
                    "Settings Screenshot",
                    await page.screenshot({ fullPage: true }),
                    { contentType: "image/png" }
                );

            });

            await test.step("Verify Settings URL", async () => {
                await expect(page).toHaveURL(/settings/);
            });

        });

});