import { test, expect, Page, Locator } from '@playwright/test';

// Helper function to find a row by name across paginated web table
// Page: The Playwright Page object representing the current page.
// name: The name of the person to search for in the web table.
// Returns: A Promise that resolves to a Locator representing the row containing the specified name.
async function findRowByName(page: Page, name: string): Promise<Locator> {
    while (true) {
        // Find the row containing the specified name
        const row = page.locator('#employees-tbody tr').filter({ hasText: name });

        // If the row is found, return it; otherwise, click the "Next" button to go to the next page
        if (await row.count()) return row;

        const next = page.getByTestId('next-page');

        // If the "Next" button is disabled, it means we've reached the last page and the row was not found
        if (await next.isDisabled()) throw new Error(`Row not found: ${name}`);

        // Click the "Next" button to go to the next page
        await next.click();
    }
}

test('Verify Element by Filter', async ({ page }) => {


    await page.goto('https://app.thetestingacademy.com/playwright/tables/webtable');

    //  Finding one person's email and country
    let name: string = "Luca Greco";

    // Use the helper function to find the row by name
    const row = await findRowByName(page, 'Luca Greco');

    // Once the row is found, extract the email and country from that row
    const email = await row.locator('td[data-col="email"]').innerText();
    const country = await row.locator('td[data-col="country"]').innerText();

    // Log the email and country to the console
    console.log(email, country);
    await page.waitForTimeout(5000);

});
