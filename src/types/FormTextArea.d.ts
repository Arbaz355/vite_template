import { Control, FieldValues } from 'react-hook-form';
import { TextareaHTMLAttributes } from 'react';

export interface FormTextAreaProps<T extends FieldValues = FieldValues>
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {
  name: string;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  showErrorMessage?: boolean;
  isDisabled?: boolean;
  className?: string;
}
