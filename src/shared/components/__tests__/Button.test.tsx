import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';

describe('Button component', () => {
  test('renders correctly with default props', () => {
    render(<Button>Click me</Button>);

    const button = screen.getByRole('button', { name: /Click me/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
    expect(button).toHaveClass('btn');
  });

  test('applies variant class correctly', () => {
    render(<Button variant="primary">Primary Button</Button>);

    const button = screen.getByRole('button', { name: /Primary Button/i });
    expect(button).toHaveClass('btn-primary');
  });

  test('applies size class correctly', () => {
    render(<Button size="large">Large Button</Button>);

    const button = screen.getByRole('button', { name: /Large Button/i });
    expect(button).toHaveClass('btn-lg');
  });

  test('applies fullWidth class when specified', () => {
    render(<Button fullWidth>Full Width Button</Button>);

    const button = screen.getByRole('button', { name: /Full Width Button/i });
    expect(button).toHaveClass('btn-full');
  });

  test('applies disabled attribute and class when disabled', () => {
    render(<Button disabled>Disabled Button</Button>);

    const button = screen.getByRole('button', { name: /Disabled Button/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass('btn-disabled');
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable Button</Button>);

    const button = screen.getByRole('button', { name: /Clickable Button/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick when disabled and clicked', () => {
    const handleClick = jest.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled Button
      </Button>
    );

    const button = screen.getByRole('button', { name: /Disabled Button/i });
    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });
});
