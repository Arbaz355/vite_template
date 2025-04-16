# Form Components

This document describes the form components available in the application. These components are designed to be reusable, accessible, and work seamlessly with both controlled components and our form context.

## Form Context

The application provides a form context that manages form state, validation, and submission. This context is provided by the `FormProvider` component and can be accessed using the `useForm` hook.

### FormProvider

The `FormProvider` component manages form state and provides validation and submission handling:

```tsx
import { FormProvider } from '@/shared/components/forms';

// Example usage
<FormProvider
  initialValues={{
    name: '',
    email: '',
    password: '',
  }}
  validationSchema={{
    name: [
      { required: true, message: 'Name is required' },
      { minLength: 2, message: 'Name must be at least 2 characters' },
    ],
    email: [
      { required: true, message: 'Email is required' },
      { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email is not valid' },
    ],
    password: [
      { required: true, message: 'Password is required' },
      { minLength: 8, message: 'Password must be at least 8 characters' },
    ],
  }}
  onSubmit={(values) => {
    // Handle form submission
    console.log(values);
  }}
>
  {/* Form inputs */}
</FormProvider>
```

### useForm Hook

The `useForm` hook provides access to form state and methods:

```tsx
import { useForm } from '@/shared/components/forms';

function MyFormComponent() {
  const form = useForm();
  
  // Access form state
  const { values, errors, touched, isSubmitting } = form;
  
  // Form methods
  const {
    setValue,      // Set a single field value
    setValues,     // Set multiple field values
    setError,      // Set an error for a field
    setTouched,    // Mark a field as touched
    reset,         // Reset the form
    validate,      // Validate a single field
    validateAll,   // Validate all fields
    handleSubmit,  // Handle form submission
  } = form;
  
  // Example submit handler
  const onSubmit = form.handleSubmit((values) => {
    // Handle form submission
    console.log(values);
  });
  
  return (
    <form onSubmit={onSubmit}>
      {/* Form inputs */}
    </form>
  );
}
```

## Input Components

### TextInput

A standard text input component that supports various types (text, email, password, number, etc.):

```tsx
import { TextInput } from '@/shared/components/forms';

<TextInput
  name="email"
  label="Email Address"
  type="email"
  placeholder="john@example.com"
  required
  helperText="We'll never share your email"
/>
```

### Textarea

A multi-line text input:

```tsx
import { Textarea } from '@/shared/components/forms';

<Textarea
  name="bio"
  label="Biography"
  placeholder="Tell us about yourself..."
  rows={4}
  helperText="Maximum 500 characters"
  maxLength={500}
/>
```

### Select

A dropdown select component:

```tsx
import { Select } from '@/shared/components/forms';

<Select
  name="country"
  label="Country"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'mx', label: 'Mexico' },
  ]}
  placeholder="Select your country"
  required
/>
```

### Checkbox

A checkbox input component:

```tsx
import { Checkbox } from '@/shared/components/forms';

<Checkbox
  name="terms"
  label="I agree to the Terms and Conditions"
  required
  helperText="You must agree before submitting"
/>
```

### RadioGroup

A group of radio button inputs:

```tsx
import { RadioGroup } from '@/shared/components/forms';

<RadioGroup
  name="gender"
  label="Gender"
  options={[
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'non-binary', label: 'Non-binary' },
    { value: 'prefer-not', label: 'Prefer not to say' },
  ]}
  direction="horizontal"
/>
```

### DatePicker

A date input component:

```tsx
import { DatePicker } from '@/shared/components/forms';

<DatePicker
  name="birthdate"
  label="Birth Date"
  minDate="1923-01-01"
  maxDate="2023-12-31"
  helperText="Your date of birth"
/>
```

### MultiSelect

A component for selecting multiple options:

```tsx
import { MultiSelect } from '@/shared/components/forms';

<MultiSelect
  name="interests"
  label="Interests"
  options={[
    { value: 'tech', label: 'Technology' },
    { value: 'sports', label: 'Sports' },
    { value: 'music', label: 'Music' },
  ]}
  placeholder="Select your interests"
  helperText="Select all that apply"
  maxItems={4}
/>
```

### FileUpload

A component for uploading files:

```tsx
import { FileUpload } from '@/shared/components/forms';

<FileUpload
  name="profile"
  label="Profile Picture"
  accept="image/*"
  helperText="Upload a profile picture (JPG, PNG, etc.)"
  maxFileSizeMB={5}
/>
```

## Common Props

All form components support the following common props:

| Prop | Type | Description |
|------|------|-------------|
| `name` | string | Field name (required) |
| `label` | string | Field label |
| `helperText` | string | Helper text displayed below the field |
| `error` | string | Error message to display |
| `fullWidth` | boolean | Whether the field should take full width |
| `showErrorMessage` | boolean | Whether to show error messages |
| `disabled` | boolean | Whether the field is disabled |
| `required` | boolean | Whether the field is required |
| `className` | string | Additional CSS classes |

## Validation

The form components support validation through the `FormProvider` component. You can define validation rules for each field in the `validationSchema` prop.

Supported validation rules:

- `required`: Whether the field is required
- `minLength`: Minimum length for string values
- `maxLength`: Maximum length for string values
- `pattern`: Regular expression pattern for string values
- `custom`: Custom validation function
- `message`: Custom error message

Example:

```tsx
const validationSchema = {
  email: [
    { required: true, message: 'Email is required' },
    { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email is not valid' },
  ],
  password: [
    { required: true, message: 'Password is required' },
    { minLength: 8, message: 'Password must be at least 8 characters' },
  ],
};

<FormProvider
  initialValues={{ email: '', password: '' }}
  validationSchema={validationSchema}
  onSubmit={handleSubmit}
>
  {/* Form inputs */}
</FormProvider>
```

## Usage Example

For a complete example of how to use all form components together, see the `ExampleForm` component in `src/shared/components/forms/ExampleForm.tsx`. 