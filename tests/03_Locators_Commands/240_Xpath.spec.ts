// https://katalon-demo-cura.herokuapp.com/

import { test, expect } from "@playwright/test";

test("TC#1 - Login using Xpath functionality", async ({ page }) => {

    // Navigate to the Katalon demo site
    await page.goto("https://katalon-demo-cura.herokuapp.com/");

    // Click on the "Make Appointment" button
    let makeAppointmentButton = page.locator('xpath=//a[@id="btn-make-appointment"]');
    await makeAppointmentButton.click();
    await expect(page).toHaveURL("https://katalon-demo-cura.herokuapp.com/profile.php#login");

    // Locators for the login form using Xpath
    let demoUsername = page.locator('xpath=//input[@aria-describedby="demo_username_label"]');
    let demoPassword = page.locator('xpath=//input[@aria-describedby="demo_password_label"]');
    let userNameField = page.locator('xpath=//input[@id="txt-username"]');
    let passwordField = page.locator('xpath=//input[@id="txt-password"]');
    let loginButton = page.locator('xpath=//button[@id="btn-login"]');

    // Retrieve the demo username and password from the input fields
    let usrName = await demoUsername.getAttribute("value") || "John Doe";
    let pwd = await demoPassword.getAttribute("value") || "ThisIsNotAPassword";

    // Fill in the login form and submit
    await userNameField.fill(usrName);
    await passwordField.fill(pwd);

    await loginButton.click();

    // Verify that the user is redirected to the appointment page after successful login
    await expect(page).toHaveURL("https://katalon-demo-cura.herokuapp.com/#appointment");
    let appointmentHeader = page.locator('xpath=//h2[contains(text(),"Make Appointment")]');
    await expect(appointmentHeader).toBeVisible();

    // Locators for the appointment form using Xpath
    let facility = page.locator('xpath=//select[@id="combo_facility"]');
    let applyForHospitalReadmissionChkBox = page.locator('xpath=//input[@id="chk_hospotal_readmission"]');
    let programMedicaidRadioButton = page.locator('xpath=//input[@id="radio_program_medicaid"]');
    let datePicker = page.locator('xpath=//div[@class="input-group-addon"]');
    let dateSelected = page.locator('xpath=//td[@class="day"][contains(text(),"22")]');
    let commentField = page.locator('xpath=//textarea[@id="txt_comment"]');
    let bookAppointmentButton = page.locator('xpath=//button[@id="btn-book-appointment"]');
    let appointmentConfirmationHeader = page.locator('xpath=//h2[contains(text(),"Appointment Confirmation")]');
    let appointmentConfirmationFacility = page.locator('xpath=//p[@id="facility"]');
    let appointmentConfirmationReadmission = page.locator('xpath=//p[@id="hospital_readmission"]');
    let appointmentConfirmationProgram = page.locator('xpath=//p[@id="program"]');
    let appointmentConfirmationVisitDate = page.locator('xpath=//p[@id="visit_date"]');
    let appointmentConfirmationComment = page.locator('xpath=//p[@id="comment"]');
    let datePickerInput = page.locator('xpath=//input[@id="txt_visit_date"]');

    // Fill in the appointment form
    await facility.selectOption({ index: 0 });
    await applyForHospitalReadmissionChkBox.check();
    await programMedicaidRadioButton.check();
    await expect(programMedicaidRadioButton).toBeChecked();
    await datePicker.click();
    await dateSelected.click();
    await commentField.click();
    await commentField.fill("This is a test comment for the appointment.");

    // Retrieve the values entered in the appointment form for verification
    let selectedFacility = await facility.inputValue();
    let isReadmissionChecked = await applyForHospitalReadmissionChkBox.isChecked();
    let selectedDate = await datePickerInput.inputValue();
    let enteredComment = await commentField.inputValue();

    // Submit the appointment form
    await bookAppointmentButton.click();

    // Verify that the appointment confirmation page displays the correct information
    await expect(page).toHaveURL("https://katalon-demo-cura.herokuapp.com/appointment.php#summary");
    await expect(appointmentConfirmationHeader).toBeVisible();
    await expect(appointmentConfirmationFacility).toContainText(selectedFacility);
    await expect(appointmentConfirmationReadmission).toContainText(isReadmissionChecked ? "Yes" : "No");
    await expect(appointmentConfirmationProgram).toContainText("Medicaid");
    await expect(appointmentConfirmationVisitDate).toContainText(selectedDate || "22");
    await expect(appointmentConfirmationComment).toContainText(enteredComment);

});
