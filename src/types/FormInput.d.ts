import { Control, FieldValues } from 'react-hook-form';
import { HTMLInputTypeAttribute, InputHTMLAttributes } from 'react';

interface FormInputProps<T extends FieldValues = FieldValues>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  name: string;
  control: Control<T>;
  type: HTMLInputTypeAttribute;
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  showErrorMessage?: boolean;
  isEyeIconRequired?: boolean;
  isDisabled?: boolean;
}
