import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load the home page correctly', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');

    // Check that the page has loaded with the correct title
    await expect(page).toHaveTitle(/React App/);

    // Check that the main content is visible
    await expect(page.locator('main')).toBeVisible();
  });

  test('should have navigation menu', async ({ page }) => {
    await page.goto('/');

    // Check that the navigation is visible
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();

    // Verify some navigation links are present
    await expect(nav.getByRole('link')).toHaveCount.greaterThan(0);
  });

  test('should change language when language switcher is used', async ({ page }) => {
    await page.goto('/');

    // Find and click the language switcher
    const languageSwitcher = page.getByTestId('language-switcher');
    await expect(languageSwitcher).toBeVisible();

    // Get initial language
    const initialLanguage = await languageSwitcher.textContent();

    // Click the language switcher to open dropdown
    await languageSwitcher.click();

    // Select a different language option
    // Assuming we have a language option that's not the current one
    const languageOption = page
      .getByRole('option')
      .filter({ hasNotText: initialLanguage as string })
      .first();
    await languageOption.click();

    // Wait for the page to update with the new language
    await page.waitForTimeout(500);

    // Verify language has changed
    const newLanguage = await languageSwitcher.textContent();
    expect(newLanguage).not.toBe(initialLanguage);
  });
});
