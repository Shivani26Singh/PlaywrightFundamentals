import { test, expect, Page, Locator } from '@playwright/test';

// Helper function to find a row by name across paginated web table
async function findRowByName(page: Page, name: string): Promise<Locator> {
    while (true) {
        // Find the row containing the specified name
        const row = page.locator('#employees-tbody tr').filter({ hasText: name });

        // If the row is found, return it; otherwise, click the "Next" button to go to the next page
        if (await row.count()) return row;

        const next = page.getByTestId('next-page');

        // If the "Next" button is disabled, it means we've reached the last page and the row was not found
        if (await next.isDisabled()) throw new Error(`Row not found: ${name}`);

        await next.click(); // Click the "Next" button to go to the next page
    }
}

test('Verify Email of a person in a paginated table', async ({ page }) => {

    await page.goto('https://app.thetestingacademy.com/playwright/tables/webtable');

    //  Finding one person's email
    let name: string = "Mia Hoffmann";

    // Use the helper function to find the row by name
    const row = await findRowByName(page, name);

    // Once the row is found, extract the email from that row
    const email = await row.locator('td[data-col="email"]').innerText();

    // Log the email to the console
    console.log(`Email of ${name}: ${email}`);  // Email of Mia Hoffmann: mia@tta.dev
    await page.waitForTimeout(5000);

});