import { test, expect } from "@playwright/test";

//locators are lazy - meaning they are not evaluated until an action is performed on them.
// strict - meaning they will throw an error if more than one element is found.
// auto-wait - meaning they will wait for the element to be visible and enabled before performing an action on it.

test("locators are lazy, strict, and auto-wait", async ({ page }) => {
    await page.goto("https://katalon-demo-cura.herokuapp.com/");

    await page.getByRole("link", { name: 'Make Appointment', disabled: false }).click();


});