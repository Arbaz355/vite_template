# Shared Module

The `shared` directory contains reusable elements that are used across multiple features.

## Structure

- **assets/**: Images, icons, fonts, and other static assets
- **components/**: Reusable UI components (buttons, inputs, modals, etc.)
- **layouts/**: Page layouts and structural components
- **types/**: Common TypeScript interfaces and types

## Component Organization

Within the `components` directory, UI elements are organized by complexity and purpose following the Atomic Design methodology:

```
components/
├── atoms/           # Basic building blocks (buttons, inputs, icons)
├── molecules/       # Combinations of atoms (form groups, search bars)
├── organisms/       # Complex UI sections (navigation, user cards)
├── templates/       # Page templates and layout configurations
└── hoc/             # Higher-order components
```

## Example: Button Component

The Button component demonstrates the atomic design principle and shows how to create reusable UI elements:

```tsx
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className = "",
      disabled,
      children,
      ...rest
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed";
    const styles = [
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      fullWidth ? "w-full" : "",
      className,
    ].join(" ");

    return (
      <button
        ref={ref}
        className={styles}
        disabled={disabled || isLoading}
        {...rest}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            {/* SVG content */}
          </svg>
        )}

        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}

        {children}

        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);
```

## Atomic Design Principles

### Atoms

Atoms are the smallest building blocks of the interface:
- Buttons, inputs, labels, icons
- Simple and focused on a single responsibility
- Highly reusable across the application

### Molecules

Molecules combine atoms to form more complex UI elements:
- Form fields (label + input)
- Search bars (input + button)
- Card headers
- Alert messages

### Organisms

Organisms are complex UI components composed of molecules and atoms:
- Navigation bars
- Forms
- Product cards
- Comment sections

### Templates

Templates define the layout and structure of pages:
- Page layouts
- Grid systems
- Section arrangements

## Guidelines

1. Components should be **reusable** and **composable**
2. Each component should have a single responsibility
3. Components should be well-documented with proper prop types
4. Group related components in subdirectories
5. Keep styling consistent with the design system

## Best Practices

1. **Prop Types**: Use TypeScript interfaces for component props
2. **Default Props**: Provide sensible defaults for optional props
3. **Accessibility**: Ensure components are accessible (ARIA attributes, keyboard navigation)
4. **Forwarding Refs**: Use forwardRef for components that may need direct DOM access
5. **Composition**: Prefer composition over inheritance
6. **Testability**: Design components to be easily testable 