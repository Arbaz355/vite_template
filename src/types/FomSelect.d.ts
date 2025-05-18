import { SelectHTMLAttributes } from "react";
import { Control, FieldValues, Path } from "react-hook-form";

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface FormSelectProps<T extends FieldValues>
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange" | "value" | "name"> {
  label?: string;
  control: Control<T>;
  name: Path<T>;
  isDisabled?: boolean;
  options: ReadonlyArray<SelectOption>;
  placeholder?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
  showErrorMessage?: boolean;
  isRequired?: boolean;
  onChange?: (value: string | number) => void;
}

// Export options type for reuse
export type { SelectOption as FormSelectOption };
