import { test, expect } from "@playwright/test";

test.use({
    storageState: "./user-session.json"
});

test.describe("VWO - Session Storage Demo - Custom HTML Reporter", () => {

    test.beforeEach(async ({ }, testInfo) => {
        testInfo.attach("Test Metadata", {
            body: JSON.stringify({
                epic: "Playwright Fundamentals",
                feature: "Session Storage",
                parentSuite: "Authentication",
                suite: "Authenticated User",
                subSuite: "Session Reuse",
                owner: "Shivani Singh",
                severity: "critical",
                tags: ["playwright", "session-storage", "demo", "custom-reporter"],
                environment: "QA",
            }, null, 2),
            contentType: "application/json",
        });
    });

    test("Dashboard page loads directly without login when valid storageState session is provided @P0 @smoke",
        async ({ page }, testInfo) => {

            await testInfo.attach("Test Objective", {
                body: "Verify that a previously saved storageState file allows the user to bypass login and open the dashboard directly.",
                contentType: "text/plain",
            });

            await testInfo.attach("Test Parameters", {
                body: JSON.stringify({
                    Browser: testInfo.project.name,
                    AccountId: "1227004",
                    Environment: "QA",
                }, null, 2),
                contentType: "application/json",
            });

            await test.step("Navigate to VWO Dashboard using authenticated session", async () => {
                console.log("Navigating to Dashboard with accountId=1227004");
                await page.goto("https://app.wingify.com/#/dashboard/get-started?accountId=1227004");
                console.log(`Dashboard URL after navigation: ${page.url()}`);

                await testInfo.attach("step-0-Dashboard Page Screenshot", {
                    body: await page.screenshot({ fullPage: true }),
                    contentType: "image/png",
                });

                await testInfo.attach("Dashboard Page Screenshot", {
                    body: await page.screenshot(),
                    contentType: "image/png",
                });
            });

            await test.step("Confirm page URL contains /dashboard/ indicating successful authenticated access", async () => {
                console.log("Validating that page URL matches /dashboard/ pattern");
                await expect(page).toHaveURL(/dashboard/);
                console.log(`Dashboard URL validated successfully: ${page.url()}`);
            });

            await test.step("Capture and attach current page metadata (title, URL, browser, timestamp)", async () => {
                const title = await page.title();
                const url = page.url();
                console.log(`Page title captured: ${title}`);
                console.log(`Page URL captured: ${url}`);

                await testInfo.attach("Dashboard Page Information", {
                    body: JSON.stringify({
                        title,
                        url,
                        browser: testInfo.project.name,
                        timestamp: new Date().toISOString(),
                    }, null, 2),
                    contentType: "application/json",
                });
            });
        });

    test("Settings page loads directly without login when valid storageState session is provided @P1 @regression",
        async ({ page }, testInfo) => {

            await testInfo.attach("Test Objective", {
                body: "Verify that authenticated users can navigate directly to Account Settings page using storageState without re-authentication.",
                contentType: "text/plain",
            });

            await testInfo.attach("Test Parameters", {
                body: JSON.stringify({
                    AccountId: "1227007",
                    Browser: testInfo.project.name,
                    Environment: "QA",
                }, null, 2),
                contentType: "application/json",
            });

            await test.step("Navigate to VWO Account Settings page using authenticated session", async () => {
                console.log("Navigating to Settings with accountId=1227007");
                await page.goto("https://app.wingify.com/#/settings/accounts/general?accountId=1227007");
                console.log(`Settings URL after navigation: ${page.url()}`);

                await testInfo.attach("step-0-Settings Page Screenshot", {
                    body: await page.screenshot({ fullPage: true }),
                    contentType: "image/png",
                });
            });

            await test.step("Confirm page URL contains /settings/ indicating successful authenticated access", async () => {
                console.log("Validating that page URL matches /settings/ pattern");
                await expect(page).toHaveURL(/settings/);
                console.log(`Settings URL validated successfully: ${page.url()}`);
            });
        });
});
