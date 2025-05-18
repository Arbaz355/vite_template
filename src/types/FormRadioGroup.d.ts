import { Control, FieldValues } from 'react-hook-form';
import { HTMLAttributes } from 'react';

export interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface FormRadioGroupProps<T extends FieldValues = FieldValues>
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  name: keyof T & string;
  control: Control<T>;
  radioGroupList: RadioOption[];
  label?: string;
  helperText?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  isErrorMessageVisible?: boolean;
  direction?: 'horizontal' | 'vertical';
}
