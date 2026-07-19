import { test, expect } from '@playwright/test';


test('Verify Element by Filter', async ({ page }) => {

    await page.goto('https://app.thetestingacademy.com/playwright/tables/webtable');

    //  Finding one person's email and country

    let name: string = "Luca Greco";
    let row;
    while (true) {
        // Find the row containing the specified name
        row = page.locator('#employees-tbody tr').filter({ hasText: name });

        // If the row is found, break the loop; otherwise, click the "Next" button to go to the next page
        if (await row.count()) {
            break;
        }

        const next = page.getByTestId('next-page');

        // If the "Next" button is disabled, it means we've reached the last page and the row was not found
        if (await next.isDisabled()) throw new Error("Row not found!");

        // Click the "Next" button to go to the next page
        await next.click();
    }

    // Once the row is found, extract the email and country from that row
    const email = await row.locator('td[data-col="email"]').innerText();
    const country = await row.locator('td[data-col="country"]').innerText();

    console.log(email, country);
    await page.waitForTimeout(5000);

});