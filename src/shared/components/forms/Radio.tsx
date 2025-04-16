import React, { forwardRef, HTMLAttributes } from 'react';
import { useForm } from './FormContext';

export interface RadioOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  name: string;
  options: RadioOption[];
  label?: string;
  helperText?: string;
  onChange?: (value: string, name: string) => void;
  error?: string;
  direction?: 'horizontal' | 'vertical';
  showErrorMessage?: boolean;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      name,
      options,
      label,
      helperText,
      onChange,
      error: propError,
      direction = 'vertical',
      showErrorMessage = true,
      className = '',
      ...rest
    },
    ref
  ) => {
    const form = useForm();

    // Determine whether to use form context or props
    const isControlled = onChange !== undefined;

    // Get values from form context if not controlled
    const value = isControlled ? (rest.value as string) : form.values[name] || '';
    const error = isControlled ? propError : form.errors[name];
    const touched = isControlled ? true : form.touched[name];

    // Handle change event
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;

      if (isControlled) {
        onChange?.(newValue, name);
      } else {
        form.setValue(name, newValue);
      }
    };

    // Handle blur event to mark field as touched
    const handleBlur = () => {
      if (!isControlled) {
        form.setTouched(name, true);
      }
    };

    // Determine error state
    const hasError = Boolean(touched && error);

    // Base classes
    const containerClasses = `${className}`;
    const optionsContainerClasses = `mt-2 ${
      direction === 'horizontal' ? 'flex flex-wrap gap-4' : 'space-y-2'
    }`;

    return (
      <div ref={ref} className={containerClasses} {...rest}>
        {/* Group label */}
        {label && <div className="text-sm font-medium text-gray-700 mb-1">{label}</div>}

        {/* Radio options */}
        <div
          className={optionsContainerClasses}
          role="radiogroup"
          aria-labelledby={`${name}-group-label`}
        >
          {options.map((option) => {
            const optionId = `${name}-${option.value}`;
            const isChecked = value === option.value.toString();

            return (
              <div key={optionId} className="flex items-center">
                <input
                  type="radio"
                  id={optionId}
                  name={name}
                  value={option.value.toString()}
                  checked={isChecked}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={option.disabled}
                  className={`h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500 ${
                    hasError ? 'border-red-300' : ''
                  } ${option.disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
                  aria-invalid={hasError}
                  aria-describedby={
                    hasError ? `${name}-error` : helperText ? `${name}-helper-text` : undefined
                  }
                />
                <label
                  htmlFor={optionId}
                  className={`ml-2 text-sm ${hasError ? 'text-red-900' : 'text-gray-700'} ${
                    option.disabled ? 'opacity-60 cursor-not-allowed' : ''
                  }`}
                >
                  {option.label}
                </label>
              </div>
            );
          })}
        </div>

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

RadioGroup.displayName = 'RadioGroup';
