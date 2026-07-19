import { test, expect } from '@playwright/test';


test('Verify Element by Filter', async ({ page }) => {

    await page.goto('https://app.thetestingacademy.com/playwright/tables/webtable');

    //  Finding one person's email and country
    const pageCount = 3;
    const allEmails: string[] = [];

    for (let p = 1; p <= pageCount; p++) {

        // Click on the page number to navigate to that page
        await page.getByTestId(`page-${p}`).click();

        // Get all email addresses from the current page
        const emails = await page
            .locator('#employees-tbody tr td[data-col="email"]')
            .allInnerTexts();

        // Add the emails from the current page to the allEmails array
        allEmails.push(...emails);
    }

    await page.waitForTimeout(5000);

});