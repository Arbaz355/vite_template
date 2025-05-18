/**
 * Form Components
 * --------------
 * This module exports reusable form components built with react-hook-form and shadcn/ui.
 *
 * Usage Examples:
 *
 * 1. Import individual components:
 * ```tsx
 * import { FormCheckbox, FormCheckboxGroup } from '@/shared/components/forms';
 *
 * function MyForm() {
 *   const form = useForm();
 *   return (
 *     <FormCheckbox
 *       control={form.control}
 *       name="acceptTerms"
 *       label="I accept the terms"
 *       isRequired
 *     />
 *   );
 * }
 * ```
 *
 * 2. Import all components:
 * ```tsx
 * import Forms from '@/shared/components/forms';
 *
 * function MyForm() {
 *   const form = useForm();
 *   return (
 *     <Forms.FormCheckbox
 *       control={form.control}
 *       name="acceptTerms"
 *       label="I accept the terms"
 *     />
 *   );
 * }
 * ```
 *
 * Components Available:
 * - FormInput: Text input field
 * - FormSelect: Dropdown select field
 * - FormCheckbox: Single checkbox input
 * - FormCheckboxGroup: Group of checkboxes
 * - FormRadioGroup: Group of radio buttons
 * - FormTextArea: Multiline text input
 */

// Export named exports for individual components
export { default as FormInput } from './FormInput';
export { default as FormSelect } from './FormSelect';
export { default as FormCheckbox } from './FormCheckbox';
export { default as FormCheckboxGroup } from './FormCheckboxGroup';
export { default as FormRadioGroup } from './FormRadioGroup';
export { default as FormTextArea } from './FormTextArea';

// Create a default export for convenience
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import FormCheckbox from './FormCheckbox';
import FormCheckboxGroup from './FormCheckboxGroup';
import FormRadioGroup from './FormRadioGroup';
import FormTextArea from './FormTextArea';

export default {
  FormInput,
  FormSelect,
  FormCheckbox,
  FormCheckboxGroup,
  FormRadioGroup,
  FormTextArea,
};
