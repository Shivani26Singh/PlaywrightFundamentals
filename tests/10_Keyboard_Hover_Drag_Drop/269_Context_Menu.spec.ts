import { test, expect, FrameLocator, Locator } from '@playwright/test';

test('Right Click', async ({ page }) => {

    await page.goto('https://app.thetestingacademy.com/playwright/widgets/context-menu');

    // Right click on the first element with the class 'context-menu-one'
    await page.locator('span.context-menu-one').first().click({ button: 'right' });


    // Get all the options in the context menu and log them to the console
    const allOptions: string[] = await page
        .locator('ul.context-menu-list span')
        .allInnerTexts();
    console.log(allOptions);

    // Click on the "Copy" option in the context menu
    await page.getByText('Copy', { exact: true }).first().click();


});