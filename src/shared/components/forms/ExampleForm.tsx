import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from './FormContext';
import { TextInput } from './TextInput';
import { Select } from './Select';
import { Checkbox } from './Checkbox';
import { RadioGroup } from './Radio';
import { DatePicker } from './DatePicker';
import { MultiSelect } from './MultiSelect';
import { FileUpload } from './FileUpload';
import { Textarea } from './TextArea';

const ExampleFormInner: React.FC = () => {
  const { t } = useTranslation();
  const form = useForm();

  const handleSubmit = form.handleSubmit((values) => {
    console.log('Form submitted with values:', values);
    // In a real application, you would send these values to your API
    alert('Form submitted! Check console for values.');
  });

  // Example options for selects and radios
  const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'mx', label: 'Mexico' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'fr', label: 'France' },
    { value: 'de', label: 'Germany' },
  ];

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'non-binary', label: 'Non-binary' },
    { value: 'prefer-not', label: 'Prefer not to say' },
  ];

  const interestOptions = [
    { value: 'tech', label: 'Technology' },
    { value: 'sports', label: 'Sports' },
    { value: 'music', label: 'Music' },
    { value: 'art', label: 'Art' },
    { value: 'food', label: 'Food & Cooking' },
    { value: 'travel', label: 'Travel' },
  ];

  // Calculate min and max dates for date picker
  const today = new Date();
  const minDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate())
    .toISOString()
    .split('T')[0];
  const maxDate = new Date(today.getFullYear() + 2, today.getMonth(), today.getDate())
    .toISOString()
    .split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic text inputs */}
        <TextInput
          name="firstName"
          label="First Name"
          placeholder="John"
          required
          helperText="Your first/given name"
        />

        <TextInput name="lastName" label="Last Name" placeholder="Doe" required />

        <TextInput
          name="email"
          label="Email Address"
          type="email"
          placeholder="john.doe@example.com"
          required
          helperText="We'll never share your email"
        />

        <TextInput name="phone" label="Phone Number" type="tel" placeholder="(123) 456-7890" />

        <TextInput
          name="password"
          label="Password"
          type="password"
          placeholder="Your secure password"
          required
          helperText="Must be at least 8 characters"
        />

        <TextInput name="age" label="Age" type="number" min={18} max={120} placeholder="30" />

        {/* Select dropdown */}
        <Select
          name="country"
          label="Country"
          options={countryOptions}
          placeholder="Select your country"
          required
        />

        {/* Date picker */}
        <DatePicker
          name="birthdate"
          label="Birth Date"
          minDate={minDate}
          maxDate={today.toISOString().split('T')[0]}
          helperText="Your date of birth"
        />

        {/* Radio group */}
        <div className="md:col-span-2">
          <RadioGroup name="gender" label="Gender" options={genderOptions} direction="horizontal" />
        </div>

        {/* Multi-select */}
        <div className="md:col-span-2">
          <MultiSelect
            name="interests"
            label="Interests"
            options={interestOptions}
            placeholder="Select your interests"
            helperText="Select all that apply"
            maxItems={4}
          />
        </div>

        {/* Text area */}
        <div className="md:col-span-2">
          <Textarea
            name="bio"
            label="Biography"
            placeholder="Tell us about yourself..."
            rows={4}
            helperText="Maximum 500 characters"
            maxLength={500}
          />
        </div>

        {/* File upload */}
        <div className="md:col-span-2">
          <FileUpload
            name="profile"
            label="Profile Picture"
            accept="image/*"
            helperText="Upload a profile picture (JPG, PNG, etc.)"
            maxFileSizeMB={5}
          />
        </div>

        {/* Checkbox */}
        <div className="md:col-span-2">
          <Checkbox name="terms" label="I agree to the Terms and Conditions" required />
        </div>

        <div className="md:col-span-2">
          <Checkbox
            name="newsletter"
            label="Subscribe to our newsletter"
            helperText="We'll send you updates and special offers"
          />
        </div>
      </div>

      {/* Submit and reset buttons */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => form.reset()}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Reset
        </button>

        <button
          type="submit"
          disabled={form.isSubmitting}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {form.isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export const ExampleForm: React.FC = () => {
  // Initial values for the form
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    age: '',
    country: '',
    birthdate: '',
    gender: 'prefer-not',
    interests: [],
    bio: '',
    profile: null,
    terms: false,
    newsletter: true,
  };

  // Validation schema
  const validationSchema = {
    firstName: [
      { required: true, message: 'First name is required' },
      { minLength: 2, message: 'First name must be at least 2 characters' },
    ],
    lastName: [
      { required: true, message: 'Last name is required' },
      { minLength: 2, message: 'Last name must be at least 2 characters' },
    ],
    email: [
      { required: true, message: 'Email is required' },
      { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email is not valid' },
    ],
    password: [
      { required: true, message: 'Password is required' },
      { minLength: 8, message: 'Password must be at least 8 characters' },
    ],
    terms: [
      { custom: (value) => value === true, message: 'You must agree to the Terms and Conditions' },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Example Form</h2>
      <FormProvider initialValues={initialValues} validationSchema={validationSchema}>
        <ExampleFormInner />
      </FormProvider>
    </div>
  );
};
