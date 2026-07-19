import { test } from '@playwright/test';

test('Verify Country assigned to a person', async ({ page }) => {

    await page.goto('https://app.thetestingacademy.com/playwright/tables/webtable');

    let name: string = "Yoshi Tannamuri";

    // Find the row containing the specified name
    let row = page.locator('#companies-table tbody tr').filter({ hasText: name });

    // If the row is found, extract the country from that row
    if (await row.count()) {
        let country = await row.locator('td[data-col="country"]').innerText();
        console.log(country);
    } else {
        throw new Error(`Row not found having name: ${name}`);
    }

});