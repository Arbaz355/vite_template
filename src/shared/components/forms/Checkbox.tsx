import React, { forwardRef, InputHTMLAttributes } from 'react';
import { useForm } from './FormContext';

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> {
  name: string;
  label?: string;
  helperText?: string;
  onChange?: (checked: boolean, name: string) => void;
  error?: string;
  showErrorMessage?: boolean;
  labelClassName?: string;
  checkboxClassName?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      name,
      label,
      helperText,
      onChange,
      error: propError,
      showErrorMessage = true,
      className = '',
      labelClassName = '',
      checkboxClassName = '',
      disabled,
      ...rest
    },
    ref
  ) => {
    const form = useForm();

    // Determine whether to use form context or props
    const isControlled = onChange !== undefined;

    // Get values from form context if not controlled
    const checked = isControlled ? Boolean(rest.checked) : Boolean(form.values[name]);
    const error = isControlled ? propError : form.errors[name];
    const touched = isControlled ? true : form.touched[name];

    // Handle change event
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = e.target.checked;

      if (isControlled) {
        onChange?.(isChecked, name);
      } else {
        form.setValue(name, isChecked);
      }
    };

    // Handle blur event to mark field as touched
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (!isControlled) {
        form.setTouched(name, true);
      }

      rest.onBlur?.(e);
    };

    // Determine error state
    const hasError = Boolean(touched && error);

    // Base classes
    const wrapperClasses = `flex items-center ${className}`;
    const checkboxClasses = `h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${
      hasError ? 'border-red-300' : ''
    } ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${checkboxClassName}`;
    const labelClasses = `${
      hasError ? 'text-red-900' : 'text-gray-700'
    } ml-2 text-sm ${labelClassName}`;

    return (
      <div>
        <div className={wrapperClasses}>
          <input
            ref={ref}
            type="checkbox"
            id={name}
            name={name}
            checked={checked}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={disabled}
            className={checkboxClasses}
            aria-invalid={hasError}
            aria-describedby={
              hasError ? `${name}-error` : helperText ? `${name}-helper-text` : undefined
            }
            {...rest}
          />

          {label && (
            <label htmlFor={name} className={labelClasses}>
              {label}
            </label>
          )}
        </div>

        {/* Helper text */}
        {helperText && !hasError && (
          <p id={`${name}-helper-text`} className="mt-1 text-sm text-gray-500 ml-6">
            {helperText}
          </p>
        )}

        {/* Error message */}
        {showErrorMessage && hasError && (
          <p id={`${name}-error`} className="mt-1 text-sm text-red-600 ml-6">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
