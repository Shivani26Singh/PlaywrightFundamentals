import { test, expect, FrameLocator, Locator } from '@playwright/test';

test('Drag and Drop', async ({ page }) => {

    await page.goto('https://app.thetestingacademy.com/playwright/widgets/dnd');

    // WAY - 1: Using the dragTo method
    // await page.locator("#card-write-spec").dragTo(page.locator("[data-status='in-progress']"));

    await page.locator('#card-review-pr-21').dragTo(page.locator('[data-status="in-progress"]'));
    await page.locator('#card-review-pr-21').dragTo(page.locator('[data-status="review"]'));


    // WAY - 2: Using the mouse events
    // Manual mouse path — for finicky DnD libraries

    let source: Locator = page.locator('#card-write-spec');
    const sBox = (await source.boundingBox())!;

    let target: Locator = page.locator('[data-status="review"]');
    const tBox = (await target.boundingBox())!;

    await page.mouse.move(sBox.x + sBox.width / 2, sBox.y + sBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(tBox.x + tBox.width / 2, tBox.y + tBox.height / 2, { steps: 10 });

    // Fire HTML5 drag events that the library listens for
    await page.evaluate(({ srcSelector, tgtSelector }) => {
        const src = document.querySelector(srcSelector);
        const tgt = document.querySelector(tgtSelector);
        if (!src || !tgt) return;
        const dt = new DataTransfer();
        src.dispatchEvent(new DragEvent('dragstart', { dataTransfer: dt, bubbles: true }));
        src.dispatchEvent(new DragEvent('drag', { dataTransfer: dt, bubbles: true }));
        tgt.dispatchEvent(new DragEvent('dragenter', { dataTransfer: dt, bubbles: true }));
        tgt.dispatchEvent(new DragEvent('dragover', { dataTransfer: dt, bubbles: true }));
        tgt.dispatchEvent(new DragEvent('drop', { dataTransfer: dt, bubbles: true }));
        src.dispatchEvent(new DragEvent('dragend', { dataTransfer: dt, bubbles: true }));
    }, { srcSelector: '#card-write-spec', tgtSelector: '[data-status="review"]' });

    await page.mouse.up();

});