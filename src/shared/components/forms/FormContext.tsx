import React, { createContext, useContext, useState, ReactNode } from 'react';

// Form validation types
export type ValidationRule = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean;
  message?: string;
};

export type FieldErrors = Record<string, string | undefined>;
export type FormValues = Record<string, any>;
export type FormTouched = Record<string, boolean>;

// Form context interface
interface FormContextType {
  values: FormValues;
  errors: FieldErrors;
  touched: FormTouched;
  isSubmitting: boolean;
  setValue: (name: string, value: any) => void;
  setValues: (values: FormValues) => void;
  setError: (name: string, error?: string) => void;
  setTouched: (name: string, isTouched?: boolean) => void;
  reset: () => void;
  validate: (name: string) => boolean;
  validateAll: () => boolean;
  handleSubmit: (
    callback: (values: FormValues) => void | Promise<void>
  ) => (e: React.FormEvent) => void;
}

// Create context
const FormContext = createContext<FormContextType | undefined>(undefined);

// Props for the form provider
interface FormProviderProps {
  children: ReactNode;
  initialValues?: FormValues;
  onSubmit?: (values: FormValues) => void | Promise<void>;
  validationSchema?: Record<string, ValidationRule[]>;
}

export const FormProvider: React.FC<FormProviderProps> = ({
  children,
  initialValues = {},
  onSubmit,
  validationSchema = {},
}) => {
  // Form state
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set a single field value
  const setValue = (name: string, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    // Validate field on change if it's been touched
    if (touched[name]) {
      validate(name);
    }
  };

  // Set multiple field values
  const setValuesHandler = (newValues: FormValues) => {
    setValues((prev) => ({ ...prev, ...newValues }));
  };

  // Set an error for a field
  const setError = (name: string, error?: string) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Mark a field as touched
  const setTouchedHandler = (name: string, isTouched: boolean = true) => {
    setTouched((prev) => ({ ...prev, [name]: isTouched }));
    // Validate field when marked as touched
    if (isTouched) {
      validate(name);
    }
  };

  // Reset the form
  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  };

  // Validate a single field
  const validate = (name: string): boolean => {
    const value = values[name];
    const rules = validationSchema[name] || [];

    for (const rule of rules) {
      let isValid = true;

      if (rule.required && !value) {
        isValid = false;
      } else if (rule.minLength && typeof value === 'string' && value.length < rule.minLength) {
        isValid = false;
      } else if (rule.maxLength && typeof value === 'string' && value.length > rule.maxLength) {
        isValid = false;
      } else if (rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
        isValid = false;
      } else if (rule.custom && !rule.custom(value)) {
        isValid = false;
      }

      if (!isValid) {
        setError(name, rule.message || 'Invalid value');
        return false;
      }
    }

    // If all validations pass, clear the error
    setError(name, undefined);
    return true;
  };

  // Validate all fields
  const validateAll = (): boolean => {
    let isValid = true;

    Object.keys(validationSchema).forEach((fieldName) => {
      const fieldIsValid = validate(fieldName);
      // Mark field as touched during form submission
      setTouchedHandler(fieldName, true);
      if (!fieldIsValid) {
        isValid = false;
      }
    });

    return isValid;
  };

  // Handle form submission
  const handleSubmit =
    (callback: (values: FormValues) => void | Promise<void>) => async (e: React.FormEvent) => {
      e.preventDefault();

      setIsSubmitting(true);

      const isValid = validateAll();

      if (isValid) {
        try {
          await callback(values);
        } catch (error) {
          console.error('Form submission error:', error);
        }
      }

      setIsSubmitting(false);
    };

  // Provide the form context
  const contextValue: FormContextType = {
    values,
    errors,
    touched,
    isSubmitting,
    setValue,
    setValues: setValuesHandler,
    setError,
    setTouched: setTouchedHandler,
    reset,
    validate,
    validateAll,
    handleSubmit,
  };

  return <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>;
};

// Hook to use the form context
export const useForm = () => {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }

  return context;
};

// HOC to create a form
export const withForm = (
  Component: React.ComponentType<any>,
  options: Omit<FormProviderProps, 'children'> = {}
) => {
  return (props: any) => (
    <FormProvider {...options}>
      <Component {...props} />
    </FormProvider>
  );
};
