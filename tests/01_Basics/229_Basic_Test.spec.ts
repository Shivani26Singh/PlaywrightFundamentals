import { test, expect } from '@playwright/test';

test("Verify the title", async ({ page }) => {
    await page.goto("https://app.vwo.com");
    await expect(page).toHaveTitle("Login - Wingify");
    // page = fixture (injected by Playwright)
    // page - represents a single tab or window in the browser. 
    // It provides methods to interact with the page, 
    // such as navigating to URLs, clicking elements, filling forms, and asserting conditions.

});