import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import {
  FormInput,
  FormSelect,
  FormCheckbox,
  FormCheckboxGroup,
  FormTextArea,
} from '@/shared/components/forms';

// Zod schema for form validation
const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(50, { message: 'Name must be less than 50 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      {
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      }
    ),
  country: z.string().min(1, { message: 'Please select a country' }),
  bio: z
    .string()
    .max(500, { message: 'Bio must be less than 500 characters' })
    .optional(),
  interests: z
    .array(z.string())
    .min(1, { message: 'Please select at least one interest' }),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
});

type FormValues = z.infer<typeof formSchema>;

const ExampleForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      country: '',
      bio: '',
      interests: [],
      terms: false,
    },
  });

  const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'au', label: 'Australia' },
  ];

  const interestOptions = [
    { id: 'tech', label: 'Technology' },
    { id: 'sports', label: 'Sports' },
    { id: 'music', label: 'Music' },
    { id: 'art', label: 'Art' },
  ];

  const onSubmit = (data: FormValues) => {
    console.log('Form submitted:', data);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Input */}
            <FormInput
              control={form.control}
              name="name"
              type="text"
              label="Full Name"
              placeholder="John Doe"
              isRequired
              showErrorMessage
            />

            {/* Email Input */}
            <FormInput
              control={form.control}
              name="email"
              type="email"
              label="Email Address"
              placeholder="john.doe@example.com"
              isRequired
              showErrorMessage
            />

            {/* Password Input with Eye Icon */}
            <div className="relative">
              <FormInput
                control={form.control}
                name="password"
                type="password"
                label="Password"
                placeholder="Enter your password"
                isRequired
                showErrorMessage
                isEyeIconRequired
              />
            </div>

            {/* Country Select */}
            <FormSelect
              control={form.control}
              name="country"
              label="Country"
              isRequired
              options={countryOptions}
              placeholder="Select your country"
              showErrorMessage
            />

            {/* Bio Textarea */}
            <div className="md:col-span-2">
              <FormTextArea
                control={form.control}
                name="bio"
                label="Biography"
                placeholder="Tell us about yourself..."
                showErrorMessage
              />
            </div>

            {/* Interests Checkbox Group */}
            <div className="md:col-span-2">
              <FormCheckboxGroup
                control={form.control}
                name="interests"
                label="Interests"
                checkBoxOptions={interestOptions}
                showErrorMessage
              />
            </div>

            {/* Terms Checkbox */}
            <div className="md:col-span-2">
              <FormCheckbox
                control={form.control}
                name="terms"
                label="I agree to the Terms and Conditions"
                isRequired
                showErrorMessage
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button 
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ExampleForm;
