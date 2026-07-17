import { test, expect } from '@playwright/test';

test('OrangeHRM WebTable - Find the First Terminated Employee', async ({ page }) => {

    await page.goto("https://awesomeqa.com/hr/web/index.php/auth/login");

    let userNameValue = "admin";
    let passwordValue = "Awesomeqa@4321";

    let userNameField = page.getByPlaceholder('username');
    let passwordField = page.getByPlaceholder('password');
    let loginButton = page.locator(".orangehrm-login-button");

    await userNameField.fill(userNameValue);
    await passwordField.fill(passwordValue);
    await loginButton.click();

    await expect(page).toHaveURL("https://awesomeqa.com/hr/web/index.php/pim/viewEmployeeList");

    //wait for the table to be visible
    await expect(page.locator(".oxd-table-body")).toBeVisible();

    const rows = page.locator('.oxd-table-body .oxd-table-row');
    const rowCount = await rows.count();
    console.log("Row Count:", await rows.count());

    // playwith nth index starting from 0 to rowCount - 1
    for (let i = 0; i < rowCount; i++) {
        const cellValues = await rows.nth(i).locator('.oxd-table-cell').allInnerTexts();
        if (cellValues.includes('Terminated')) {
            console.log(`First Terminated Employee Found in Row ${i + 1}:`, cellValues);
            break; // Exit the loop after finding the first terminated employee
        }
    }
});

/*Output:
Row Count: 50
First Terminated Employee Found in Row 6: [
'',
'0270159',
'Akshay Dilip',
'kamble',
'',
'Terminated',
'',
'',
''
]
*/