import { test, expect } from '@playwright/test';

test('Verify hover menu functionality', async ({ page }) => {

    await page.goto('https://app.thetestingacademy.com/playwright/widgets/hover-menu');

    const addOns = page.getByTestId('nav-add-ons');
    const menu = page.getByLabel('Add-ons submenu');
    const menuItems = menu.getByRole('menuitem');
    const wifi = page.getByTestId('test-id-Wifi');

    // Find the "Add-ons" menu item and hover over it
    await expect(addOns).toBeVisible();
    await addOns.hover();

    // Wait for the submenu to appear and verify its visibility
    await expect(menu).toBeVisible();

    // Verify that the submenu contains the expected menu items
    await expect(menuItems).toHaveText([
        /Taxi$/,
        /Hotel$/,
        /Insurance$/,
        /Meal$/,
        /Wi-Fi$/,
        /Activities$/,
    ]);

    const count = await menuItems.count();

    // Log the text of each menu item to the console
    for (let i = 0; i < count; i++) {
        console.log(await menuItems.nth(i).innerText());
    }

    // Click on the "Wi-Fi" menu item
    await wifi.click();
});