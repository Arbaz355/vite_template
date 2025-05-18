import { InputHTMLAttributes } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';

export interface CheckboxOption {
  id: string;
  label: string;
  disabled?: boolean;
}

// Base props for form controls
export interface BaseFormControlProps<T extends FieldValues>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type' | 'name'> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  labelDescription?: string;
  helperText?: string;
  error?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  showErrorMessage?: boolean;
  labelClassName?: string;
  checkboxClassName?: string;
}

// Single checkbox props
export interface FormCheckboxProps<T extends FieldValues> extends BaseFormControlProps<T> {
  defaultChecked?: boolean;
  onChange?: (checked: boolean, name: Path<T>) => void;
}

// Checkbox group props extends single checkbox props
export interface FormCheckboxGroupProps<T extends FieldValues> extends BaseFormControlProps<T> {
  checkBoxOptions: ReadonlyArray<CheckboxOption>;
  label: string; // Making label required for group
  onChange?: (checked: boolean, name: Path<T>) => void;
}

// Export option type for reuse
export type { CheckboxOption as FormCheckboxOption };
