import { test, expect } from '@playwright/test';

test('amazon seach', async ({ page }) => {
    await page.goto('https://www.amazon.com/');
    await page.fill('input[id="twotabsearchtextbox"]', 'iphone 14');

    await page.locator('.left-pane-results-container > div').filter({ hasText: 'phone 14 pro max screen protector' }).click();

    const title = await page.locator('.a-color-state.a-text-bold').getAttribute('class');
    expect(title).toContain('a-color-state a-text-bold');
})