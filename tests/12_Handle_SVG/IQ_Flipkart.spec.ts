import { test, expect, Locator } from '@playwright/test';

const URL = 'https://www.flipkart.com/search'

test('Find cheapest item on Flipkart ', async ({ page }) => {

    await page.goto(URL);

    let searchBox: Locator = page.locator('input[name="q"]');
    await expect(searchBox).toBeVisible();
    await searchBox.fill("macmini");

    // search icon is first svg
    const svgElements: Locator = page.locator('svg');
    await expect(svgElements.first()).toBeVisible();
    await svgElements.first().click();

    // Wait for search results to load
    await page.waitForLoadState('networkidle');

    // Get the titles of the product shown after search
    const titlesResults: Locator = page.locator("div[data-tkid] a:nth-child(2)");
    await expect(titlesResults.first()).toBeVisible();

    const count: number = await titlesResults.count();
    for (let i = 0; i < count; i++) {
        const title: string | null = await titlesResults.nth(i).textContent();
        console.log(title);
    }

    // Find the cheapest item from the search results
    const productCards = await page.locator('div[data-tkid]').all();
    let cheapest = Number.MAX_SAFE_INTEGER;
    let cheapestTitle = '';

    for (const card of productCards) {
        const title = await card.locator('a:nth-child(2)').innerText();
        const priceText = await card.locator('a:nth-child(2) ~ a > div>div:first-child').innerText();
        const price = Number(priceText.replace(/[^\d]/g, ''));

        if (price < cheapest) {
            cheapest = price;
            cheapestTitle = title;
        }
    }

    console.log(`Cheapest Product: ${cheapestTitle} Price: ₹${cheapest}`);

});