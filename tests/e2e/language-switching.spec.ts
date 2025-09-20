import { test, expect } from '@playwright/test';

test.describe('Frontend Language Switching', () => {
  test('should switch language and display translated content', async ({ page }) => {
    await page.goto('http://localhost:3000/en'); // Assuming the app runs on port 3000 and '/en' is the English homepage

    // Verify initial content in English
    await expect(page.getByText('Welcome')).toBeVisible(); // Replace with actual text from your app

    // Click on language switcher and select Spanish
    await page.click('button[aria-label="Language switcher"]'); // Replace with actual selector for your language switcher
    await page.click('text=Español'); // Replace with actual text for Spanish option

    // Verify content in Spanish
    await expect(page.getByText('Bienvenido')).toBeVisible(); // Replace with actual translated text

    // Repeat for Italian
    await page.click('button[aria-label="Language switcher"]');
    await page.click('text=Italiano');
    await expect(page.getByText('Benvenuto')).toBeVisible(); // Replace with actual translated text
  });
});
