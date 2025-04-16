import React, { forwardRef, TextareaHTMLAttributes } from 'react';
import { useForm } from './FormContext';

export interface TextAreaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  name: string;
  label?: string;
  helperText?: string;
  onChange?: (value: string, name: string) => void;
  error?: string;
  fullWidth?: boolean;
  showErrorMessage?: boolean;
  rows?: number;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      name,
      label,
      helperText,
      onChange,
      error: propError,
      fullWidth = false,
      showErrorMessage = true,
      className = '',
      required,
      disabled,
      rows = 4,
      ...rest
    },
    ref
  ) => {
    const form = useForm();

    // Determine whether to use form context or props
    const isControlled = onChange !== undefined;

    // Get values from form context if not controlled
    const value = isControlled ? rest.value : form.values[name] || '';
    const error = isControlled ? propError : form.errors[name];
    const touched = isControlled ? true : form.touched[name];

    // Handle change event
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;

      if (isControlled) {
        onChange?.(newValue, name);
      } else {
        form.setValue(name, newValue);
      }
    };

    // Handle blur event to mark field as touched
    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      if (!isControlled) {
        form.setTouched(name, true);
      }

      rest.onBlur?.(e);
    };

    // Determine error state
    const hasError = Boolean(touched && error);

    // Base classes
    const textAreaClasses = `block w-full px-4 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
      hasError
        ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
    } ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'} ${className}`;

    // Container classes
    const containerClasses = `${fullWidth ? 'w-full' : ''} ${rest.hidden ? 'hidden' : ''}`;

    return (
      <div className={containerClasses}>
        {label && (
          <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          id={name}
          name={name}
          value={value as string}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          required={required}
          rows={rows}
          className={textAreaClasses}
          aria-invalid={hasError}
          aria-describedby={
            hasError ? `${name}-error` : helperText ? `${name}-helper-text` : undefined
          }
          {...rest}
        />

        {/* Helper text */}
        {helperText && !hasError && (
          <p id={`${name}-helper-text`} className="mt-1 text-sm text-gray-500">
            {helperText}
          </p>
        )}

        {/* Error message */}
        {showErrorMessage && hasError && (
          <p id={`${name}-error`} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
