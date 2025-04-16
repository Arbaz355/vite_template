import React from 'react';
import { test, expect } from '@playwright/test';
import { mount } from '@playwright/experimental-ct-react';
import Button from '../../src/shared/components/Button';

test.describe('Button Component', () => {
  test('renders with default props correctly', async () => {
    const component = await mount(<Button>Click me</Button>);

    await expect(component).toBeVisible();
    await expect(component).toHaveText('Click me');
    await expect(component).toHaveClass(/btn/);
    await expect(component).not.toHaveAttribute('disabled');
  });

  test('applies variant class correctly', async () => {
    const component = await mount(<Button variant="primary">Primary Button</Button>);

    await expect(component).toHaveClass(/btn-primary/);
  });

  test('applies size class correctly', async () => {
    const component = await mount(<Button size="large">Large Button</Button>);

    await expect(component).toHaveClass(/btn-lg/);
  });

  test('applies fullWidth class when specified', async () => {
    const component = await mount(<Button fullWidth>Full Width Button</Button>);

    await expect(component).toHaveClass(/btn-full/);
  });

  test('applies disabled attribute and class when disabled', async () => {
    const component = await mount(<Button disabled>Disabled Button</Button>);

    await expect(component).toHaveAttribute('disabled', '');
    await expect(component).toHaveClass(/btn-disabled/);
  });

  test('calls onClick handler when clicked', async () => {
    let clicked = false;
    const component = await mount(
      <Button
        onClick={() => {
          clicked = true;
        }}
      >
        Clickable Button
      </Button>
    );

    await component.click();

    expect(clicked).toBe(true);
  });

  test('does not call onClick when disabled and clicked', async () => {
    let clicked = false;
    const component = await mount(
      <Button
        disabled
        onClick={() => {
          clicked = true;
        }}
      >
        Disabled Button
      </Button>
    );

    await component.click();

    expect(clicked).toBe(false);
  });
});
