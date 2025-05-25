# Test info

- Name: Home Page >> should have navigation menu
- Location: W:\vite_template\tests\e2e\home.spec.ts:15:3

# Error details

```
Error: browserType.launch: Executable doesn't exist at C:\Users\Arbaz\AppData\Local\ms-playwright\webkit-2158\Playwright.exe
╔═════════════════════════════════════════════════════════════════════════╗
║ Looks like Playwright Test or Playwright was just installed or updated. ║
║ Please run the following command to download new browsers:              ║
║                                                                         ║
║     pnpm exec playwright install                                        ║
║                                                                         ║
║ <3 Playwright Team                                                      ║
╚═════════════════════════════════════════════════════════════════════════╝
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test.describe('Home Page', () => {
   4 |   test('should load the home page correctly', async ({ page }) => {
   5 |     // Navigate to the home page
   6 |     await page.goto('/');
   7 |
   8 |     // Check that the page has loaded with the correct title
   9 |     await expect(page).toHaveTitle(/React App/);
  10 |
  11 |     // Check that the main content is visible
  12 |     await expect(page.locator('main')).toBeVisible();
  13 |   });
  14 |
> 15 |   test('should have navigation menu', async ({ page }) => {
     |   ^ Error: browserType.launch: Executable doesn't exist at C:\Users\Arbaz\AppData\Local\ms-playwright\webkit-2158\Playwright.exe
  16 |     await page.goto('/');
  17 |
  18 |     // Check that the navigation is visible
  19 |     const nav = page.locator('nav');
  20 |     await expect(nav).toBeVisible();
  21 |
  22 |     // Verify some navigation links are present
  23 |     await expect(nav.getByRole('link')).toHaveCount.greaterThan(0);
  24 |   });
  25 |
  26 |   test('should change language when language switcher is used', async ({ page }) => {
  27 |     await page.goto('/');
  28 |
  29 |     // Find and click the language switcher
  30 |     const languageSwitcher = page.getByTestId('language-switcher');
  31 |     await expect(languageSwitcher).toBeVisible();
  32 |
  33 |     // Get initial language
  34 |     const initialLanguage = await languageSwitcher.textContent();
  35 |
  36 |     // Click the language switcher to open dropdown
  37 |     await languageSwitcher.click();
  38 |
  39 |     // Select a different language option
  40 |     // Assuming we have a language option that's not the current one
  41 |     const languageOption = page
  42 |       .getByRole('option')
  43 |       .filter({ hasNotText: initialLanguage as string })
  44 |       .first();
  45 |     await languageOption.click();
  46 |
  47 |     // Wait for the page to update with the new language
  48 |     await page.waitForTimeout(500);
  49 |
  50 |     // Verify language has changed
  51 |     const newLanguage = await languageSwitcher.textContent();
  52 |     expect(newLanguage).not.toBe(initialLanguage);
  53 |   });
  54 | });
  55 |
```