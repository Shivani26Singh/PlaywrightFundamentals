import { test, expect } from '@playwright/test';

// CONDITIONAL SKIP AND SLOW =====
test('has title', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await expect(page).toHaveTitle(/Playwright/);
});

// Skip test
test.skip('skipped test', async ({ page }) => {
    // This test is skipped
});

// Only run this test
test.only('focused test', async ({ page }) => {
    // Only this test runs
});

// Mark as failing
test.fail('expected to fail', async ({ page }) => {
    // Test is expected to fail
});

// Slow test (3x timeout) - does not make execution slower.
// This test is expected to take longer, so allow it a larger timeout.
test('long end-to-end business flow', async ({ page }) => {
    test.slow();

    // many legitimate test steps
});

// Conditional skip
test('conditional', async ({ page, browserName }) => {
    test.skip(browserName === 'firefox', 'Not supported in Firefox');
});

test('user can upload profile image', async ({ page, browserName }) => {

    test.skip(
        browserName === 'firefox',
        'File upload issue BUG-1234'
    );

    await page.goto('/profile');

    await page
        .getByLabel('Upload image')
        .setInputFiles('profile.png');

    await expect(
        page.getByText('Upload successful')
    ).toBeVisible();
});
