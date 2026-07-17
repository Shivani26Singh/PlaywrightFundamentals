import { test, expect } from '@playwright/test';

// need to check the URL after login, 
// it should have email and password in the URL as query params

test('Student Login URL having Details ', async ({ page }) => {

    await page.goto("https://app.thetestingacademy.com/playwright/multiple_element_filter");

    let emailField = page.locator("#email");
    let passwordField = page.locator("#password");
    let loginButton = page.getByTestId('login-button');

    let emailValue = "shivani@testing.com";
    let passwordValue = "123456";

    // fill the email and password fields and click on login button
    await emailField.fill(emailValue);
    await passwordField.fill(passwordValue);
    await loginButton.click();

    // to encode the email value and then check the URL
    const encodedEmail = encodeURIComponent(emailValue);
    console.log(encodedEmail); //shivani%40testing.com

    //Exact URL (String)
    await expect(page).toHaveURL(`https://app.thetestingacademy.com/playwright/multiple_element_filter?email=${encodedEmail}&password=${passwordValue}#login-success`);

    //Regular Expression
    await expect(page).toHaveURL(new RegExp(`.*email=${encodedEmail}&password=${passwordValue}`));

});