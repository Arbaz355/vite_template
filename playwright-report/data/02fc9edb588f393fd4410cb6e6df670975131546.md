# Test info

- Name: Button Component >> applies custom className
- Location: W:\vite_template\tests\unit\Button.spec.tsx:13:3

# Error details

```
Error: browserType.launch: Executable doesn't exist at C:\Users\Arbaz\AppData\Local\ms-playwright\chromium_headless_shell-1169\chrome-win\headless_shell.exe
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
   1 | import { test, expect } from '@playwright/experimental-ct-react';
   2 | import { Button } from '@/components/ui/button';
   3 |
   4 | test.describe('Button Component', () => {
   5 |   // Basic rendering and content
   6 |   test('renders with text content', async ({ mount }) => {
   7 |     const component = await mount(<Button>Click me</Button>);
   8 |
   9 |     await expect(component).toBeVisible();
   10 |     await expect(component).toContainText('Click me');
   11 |   });
   12 |
>  13 |   test('applies custom className', async ({ mount }) => {
      |   ^ Error: browserType.launch: Executable doesn't exist at C:\Users\Arbaz\AppData\Local\ms-playwright\chromium_headless_shell-1169\chrome-win\headless_shell.exe
   14 |     const component = await mount(
   15 |       <Button className="custom-class">Button</Button>
   16 |     );
   17 |
   18 |     await expect(component).toHaveClass(/custom-class/);
   19 |   });
   20 |
   21 |   // Variant testing
   22 |   test('applies variant styles correctly', async ({ mount }) => {
   23 |     const variants = [
   24 |       { variant: 'default', expectedClass: /bg-primary/ },
   25 |       { variant: 'destructive', expectedClass: /bg-destructive/ },
   26 |       { variant: 'outline', expectedClass: /border/ },
   27 |       { variant: 'secondary', expectedClass: /bg-secondary/ },
   28 |       { variant: 'ghost', expectedClass: /hover:bg-accent/ },
   29 |       { variant: 'link', expectedClass: /underline-offset-4/ }
   30 |     ] as const;
   31 |
   32 |     for (const { variant, expectedClass } of variants) {
   33 |       const component = await mount(<Button variant={variant}>Button</Button>);
   34 |       await expect(component).toHaveClass(expectedClass);
   35 |     }
   36 |   });
   37 |
   38 |   // Size testing
   39 |   test('applies size styles correctly', async ({ mount }) => {
   40 |     const sizes = [
   41 |       { size: 'default', expectedClass: /h-9/ },
   42 |       { size: 'sm', expectedClass: /h-8/ },
   43 |       { size: 'lg', expectedClass: /h-10/ },
   44 |       { size: 'icon', expectedClass: /size-9/ }
   45 |     ] as const;
   46 |
   47 |     for (const { size, expectedClass } of sizes) {
   48 |       const component = await mount(<Button size={size}>Button</Button>);
   49 |       await expect(component).toHaveClass(expectedClass);
   50 |     }
   51 |   });
   52 |
   53 |   // Full width
   54 |   test('applies full width when specified', async ({ mount }) => {
   55 |     const component = await mount(<Button fullWidth>Full Width</Button>);
   56 |     await expect(component).toHaveClass(/w-full/);
   57 |   });
   58 |
   59 |   // Loading state
   60 |   test('shows loading state correctly', async ({ mount }) => {
   61 |     const component = await mount(<Button isLoading>Loading</Button>);
   62 |
   63 |     await expect(component).toHaveAttribute('disabled');
   64 |     await expect(component.locator('svg')).toBeVisible();
   65 |     await expect(component.locator('circle')).toBeVisible();
   66 |   });
   67 |
   68 |   test('hides icons when loading', async ({ mount }) => {
   69 |     const TestIcon = () => <span data-testid="icon">📧</span>;
   70 |     const component = await mount(
   71 |       <Button isLoading leftIcon={<TestIcon />} rightIcon={<TestIcon />}>
   72 |         Loading
   73 |       </Button>
   74 |     );
   75 |
   76 |     await expect(component.locator('[data-testid="icon"]')).not.toBeVisible();
   77 |   });
   78 |
   79 |   // Icon testing
   80 |   test('renders left icon', async ({ mount }) => {
   81 |     const LeftIcon = () => <span data-testid="left-icon">←</span>;
   82 |     const component = await mount(
   83 |       <Button leftIcon={<LeftIcon />}>With Left Icon</Button>
   84 |     );
   85 |
   86 |     await expect(component.locator('[data-testid="left-icon"]')).toBeVisible();
   87 |   });
   88 |
   89 |   test('renders right icon', async ({ mount }) => {
   90 |     const RightIcon = () => <span data-testid="right-icon">→</span>;
   91 |     const component = await mount(
   92 |       <Button rightIcon={<RightIcon />}>With Right Icon</Button>
   93 |     );
   94 |
   95 |     await expect(component.locator('[data-testid="right-icon"]')).toBeVisible();
   96 |   });
   97 |
   98 |   // Interaction testing
   99 |   test('handles click events', async ({ mount }) => {
  100 |     let clickCount = 0;
  101 |     const component = await mount(
  102 |       <Button onClick={() => clickCount++}>Clickable</Button>
  103 |     );
  104 |
  105 |     await component.click();
  106 |     expect(clickCount).toBe(1);
  107 |   });
  108 |
  109 |   test('prevents clicks when disabled', async ({ mount }) => {
  110 |     let wasClicked = false;
  111 |     const component = await mount(
  112 |       <Button disabled onClick={() => wasClicked = true}>
  113 |         Disabled
```