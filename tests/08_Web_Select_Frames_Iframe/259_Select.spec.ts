import { test, expect } from '@playwright/test';

/*
<select id="dropdown">
    <option value="" disabled="disabled" selected="selected">Please select an option</option>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
  </select>
*/
test('Basic Web Test - Verify Select!', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/dropdown');

    await page.locator("#dropdown").click();
    await page.selectOption("#dropdown", "Option 2");
    // await page.selectOption
    //await page.pause();


});