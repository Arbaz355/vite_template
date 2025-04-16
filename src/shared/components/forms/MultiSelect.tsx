import React, { forwardRef, useState, useEffect, useRef } from 'react';
import { useForm } from './FormContext';

export interface MultiSelectOption {
  value: string;
  label: string;
}

export interface MultiSelectProps {
  name: string;
  options: MultiSelectOption[];
  label?: string;
  helperText?: string;
  onChange?: (values: string[], name: string) => void;
  error?: string;
  fullWidth?: boolean;
  showErrorMessage?: boolean;
  placeholder?: string;
  disabled?: boolean;
  maxItems?: number;
  className?: string;
}

export const MultiSelect = forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    {
      name,
      options,
      label,
      helperText,
      onChange,
      error: propError,
      fullWidth = false,
      showErrorMessage = true,
      placeholder = 'Select options',
      disabled = false,
      maxItems,
      className = '',
    },
    ref
  ) => {
    const form = useForm();
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Determine whether to use form context or props
    const isControlled = onChange !== undefined;

    // Get values from form context if not controlled
    const selectedValues = isControlled ? ([] as string[]) : form.values[name] || [];
    const error = isControlled ? propError : form.errors[name];
    const touched = isControlled ? true : form.touched[name];

    // Filter options based on search term
    const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle selection of an option
    const handleSelect = (option: MultiSelectOption) => {
      if (disabled) return;

      const newValues = selectedValues.includes(option.value)
        ? selectedValues.filter((value) => value !== option.value)
        : [...selectedValues, option.value];

      // If maxItems is specified and we're adding a new item, check the limit
      if (
        maxItems !== undefined &&
        newValues.length > selectedValues.length &&
        newValues.length > maxItems
      ) {
        return;
      }

      if (isControlled) {
        onChange?.(newValues, name);
      } else {
        form.setValue(name, newValues);
        form.setTouched(name, true);
      }
    };

    // Handle click outside to close the dropdown
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    // Determine error state
    const hasError = Boolean(touched && error);

    // Get selected option labels for display
    const selectedLabels = options
      .filter((option) => selectedValues.includes(option.value))
      .map((option) => option.label);

    // Base classes
    const containerClasses = `relative ${fullWidth ? 'w-full' : ''} ${className}`;
    const triggerClasses = `flex items-center justify-between w-full px-4 py-2 text-sm rounded-md border ${
      hasError
        ? 'border-red-300 text-red-900 focus:border-red-500 focus:ring-red-500'
        : 'border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
    } ${
      disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white cursor-pointer'
    } focus:outline-none focus:ring-2 transition-all duration-200`;

    const dropdownClasses = `absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto`;

    return (
      <div ref={ref} className={containerClasses}>
        {label && (
          <label htmlFor={`${name}-input`} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}

        <div ref={dropdownRef}>
          {/* Trigger button */}
          <button
            type="button"
            id={`${name}-button`}
            className={triggerClasses}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-labelledby={label ? `${name}-label` : undefined}
            aria-invalid={hasError}
            aria-describedby={
              hasError ? `${name}-error` : helperText ? `${name}-helper-text` : undefined
            }
            disabled={disabled}
          >
            <span className="truncate">
              {selectedLabels.length > 0 ? selectedLabels.join(', ') : placeholder}
            </span>
            <svg
              className={`h-5 w-5 text-gray-400 ${isOpen ? 'transform rotate-180' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Dropdown */}
          {isOpen && (
            <div className={dropdownClasses}>
              {/* Search input */}
              <div className="p-2 border-b border-gray-200">
                <input
                  type="text"
                  className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              {/* Options list */}
              <ul className="py-1" role="listbox" aria-labelledby={`${name}-button`} tabIndex={-1}>
                {filteredOptions.length === 0 ? (
                  <li className="px-4 py-2 text-sm text-gray-500">No options found</li>
                ) : (
                  filteredOptions.map((option) => {
                    const isSelected = selectedValues.includes(option.value);
                    return (
                      <li
                        key={option.value}
                        role="option"
                        aria-selected={isSelected}
                        className={`px-4 py-2 text-sm cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-blue-100 text-blue-900'
                            : 'text-gray-900 hover:bg-gray-100'
                        }`}
                        onClick={() => handleSelect(option)}
                      >
                        <span>{option.label}</span>
                        {isSelected && (
                          <svg
                            className="h-5 w-5 text-blue-600"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
          )}
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

MultiSelect.displayName = 'MultiSelect';
