import { test, expect } from '@playwright/test';

test('JS Alert accept 1', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    // Register the dialog handler BEFORE triggering the alert
    page.once('dialog', async dialog => {
        console.log('Alert type:', dialog.type());
        console.log('Alert message:', dialog.message());
        expect(dialog.message()).toBe('I am a JS Alert');
        await dialog.accept();
    });

    // Trigger the alert by clicking the button
    await page.getByRole('button', { name: "Click for JS Alert" }).click();
    // can use any of the below locators to click on the button
    // await page.getByText('Click for JS Alert').click();
    // await page.locator('//button[text()="Click for JS Alert"]').click();
    // await page.locator('button', { hasText: 'Click for JS Alert' }).click();


    // COnfirm Popup
    page.once('dialog', async dialog => {
        console.log('Alert type:', dialog.type());
        expect(dialog.type()).toBe('confirm');
        console.log('Alert message:', dialog.message());
        expect(dialog.message()).toBe('I am a JS Confirm');
        await dialog.accept();  // Accept the confirm dialog
        //await dialog.dismiss();  // Dismiss the confirm dialog
    });
    //Trigger the confirm dialog by clicking the button
    await page.locator('button', { hasText: 'Click for JS Confirm' }).click();


    const inputText = 'Hello from Shivani';

    page.once('dialog', async dialog => {
        expect(dialog.type()).toBe('prompt');  // Expect the dialog type to be 'prompt'
        expect(dialog.defaultValue()).toBe('');  // Expect the default value of the prompt to be an empty string
        await dialog.accept(inputText);  // Accept the prompt dialog with input text
        //await dialog.dismiss();  // Dismiss the prompt dialog
    });

    await page.locator('button', { hasText: 'Click for JS Prompt' }).click();

});