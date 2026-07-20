import { test, expect } from '@playwright/test';


test('Verify spicejet From and To dropdown values', async ({ page }) => {

    // Navigate to the SpiceJet website
    await page.goto('https://www.spicejet.com/');

    let fromInputField = page.getByText('From').locator('..').locator('input');
    let toInputField = page.getByText('To').locator('..').locator('input');

    // Click on the "From" input field and search 'de'
    await fromInputField.click();
    await fromInputField.fill('');
    await fromInputField.fill('de');

    // Select 'Delhi' from the dropdown options
    let delOption = page.locator('div[data-focusable="true"]').filter({ hasText: 'Delhi' });
    await delOption.click();
    await expect(fromInputField).toHaveValue('Delhi (DEL)');

    // Click on the "To" input field and search 'ban'
    await toInputField.click();
    await toInputField.fill('');
    await toInputField.fill('ban');

    // Select 'Bengaluru' from the dropdown options
    let benOption = page.locator('div[data-focusable="true"]').filter({ hasText: 'Bengaluru' });
    await benOption.click();
    await expect(toInputField).toHaveValue('Bengaluru (BLR)');

});