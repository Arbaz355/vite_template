import { test, expect } from '@playwright/experimental-ct-react';
import { Button } from '@/components/ui/button';

test.describe('Button Component', () => {
  // Basic rendering and content
  test('renders with text content', async ({ mount }) => {
    const component = await mount(<Button>Click me</Button>);

    await expect(component).toBeVisible();
    await expect(component).toContainText('Click me');
  });

  test('applies custom className', async ({ mount }) => {
    const component = await mount(
      <Button className="custom-class">Button</Button>
    );

    await expect(component).toHaveClass(/custom-class/);
  });

  // Variant testing
  test('applies variant styles correctly', async ({ mount }) => {
    const variants = [
      { variant: 'default', expectedClass: /bg-primary/ },
      { variant: 'destructive', expectedClass: /bg-destructive/ },
      { variant: 'outline', expectedClass: /border/ },
      { variant: 'secondary', expectedClass: /bg-secondary/ },
      { variant: 'ghost', expectedClass: /hover:bg-accent/ },
      { variant: 'link', expectedClass: /underline-offset-4/ }
    ] as const;

    for (const { variant, expectedClass } of variants) {
      const component = await mount(<Button variant={variant}>Button</Button>);
      await expect(component).toHaveClass(expectedClass);
    }
  });

  // Size testing
  test('applies size styles correctly', async ({ mount }) => {
    const sizes = [
      { size: 'default', expectedClass: /h-9/ },
      { size: 'sm', expectedClass: /h-8/ },
      { size: 'lg', expectedClass: /h-10/ },
      { size: 'icon', expectedClass: /size-9/ }
    ] as const;

    for (const { size, expectedClass } of sizes) {
      const component = await mount(<Button size={size}>Button</Button>);
      await expect(component).toHaveClass(expectedClass);
    }
  });

  // Full width
  test('applies full width when specified', async ({ mount }) => {
    const component = await mount(<Button fullWidth>Full Width</Button>);
    await expect(component).toHaveClass(/w-full/);
  });

  // Loading state
  test('shows loading state correctly', async ({ mount }) => {
    const component = await mount(<Button isLoading>Loading</Button>);

    await expect(component).toHaveAttribute('disabled');
    await expect(component.locator('svg')).toBeVisible();
    await expect(component.locator('circle')).toBeVisible();
  });

  test('hides icons when loading', async ({ mount }) => {
    const TestIcon = () => <span data-testid="icon">📧</span>;
    const component = await mount(
      <Button isLoading leftIcon={<TestIcon />} rightIcon={<TestIcon />}>
        Loading
      </Button>
    );

    await expect(component.locator('[data-testid="icon"]')).not.toBeVisible();
  });

  // Icon testing
  test('renders left icon', async ({ mount }) => {
    const LeftIcon = () => <span data-testid="left-icon">←</span>;
    const component = await mount(
      <Button leftIcon={<LeftIcon />}>With Left Icon</Button>
    );

    await expect(component.locator('[data-testid="left-icon"]')).toBeVisible();
  });

  test('renders right icon', async ({ mount }) => {
    const RightIcon = () => <span data-testid="right-icon">→</span>;
    const component = await mount(
      <Button rightIcon={<RightIcon />}>With Right Icon</Button>
    );

    await expect(component.locator('[data-testid="right-icon"]')).toBeVisible();
  });

  // Interaction testing
  test('handles click events', async ({ mount }) => {
    let clickCount = 0;
    const component = await mount(
      <Button onClick={() => clickCount++}>Clickable</Button>
    );

    await component.click();
    expect(clickCount).toBe(1);
  });

  test('prevents clicks when disabled', async ({ mount }) => {
    let wasClicked = false;
    const component = await mount(
      <Button disabled onClick={() => wasClicked = true}>
        Disabled
      </Button>
    );

    await component.click();
    expect(wasClicked).toBe(false);
    await expect(component).toHaveAttribute('disabled');
  });

  test('prevents clicks when loading', async ({ mount }) => {
    let wasClicked = false;
    const component = await mount(
      <Button isLoading onClick={() => wasClicked = true}>
        Loading
      </Button>
    );

    await component.click();
    expect(wasClicked).toBe(false);
  });

  // AsChild functionality (if using Radix Slot)
  test('renders as child element when asChild is true', async ({ mount }) => {
    const component = await mount(
      <Button asChild>
        <a href="#test" data-testid="link-child">Link Button</a>
      </Button>
    );

    await expect(component.locator('[data-testid="link-child"]')).toBeVisible();
    await expect(component.locator('a')).toHaveAttribute('href', '#test');
  });

  // Combined props
  test('works with multiple props combined', async ({ mount }) => {
    const TestIcon = () => <span data-testid="combo-icon">⭐</span>;
    const component = await mount(
      <Button
        variant="outline"
        size="lg"
        fullWidth
        leftIcon={<TestIcon />}
        className="combo-test"
      >
        Combined Props
      </Button>
    );

    await expect(component).toHaveClass(/border/); // outline variant
    await expect(component).toHaveClass(/h-10/);   // lg size
    await expect(component).toHaveClass(/w-full/); // fullWidth
    await expect(component).toHaveClass(/combo-test/); // custom class
    await expect(component.locator('[data-testid="combo-icon"]')).toBeVisible();
  });
});