import React, { forwardRef, useState, useRef, InputHTMLAttributes } from 'react';
import { useForm } from './FormContext';

export interface FileUploadProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type' | 'value'> {
  name: string;
  label?: string;
  helperText?: string;
  onChange?: (files: FileList | null, name: string) => void;
  error?: string;
  fullWidth?: boolean;
  showErrorMessage?: boolean;
  accept?: string;
  multiple?: boolean;
  maxFileSizeMB?: number;
  dropzoneLabel?: string;
}

export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
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
      accept,
      multiple = false,
      maxFileSizeMB,
      dropzoneLabel = 'Drag and drop files here, or click to select',
      ...rest
    },
    ref
  ) => {
    const form = useForm();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [fileNames, setFileNames] = useState<string[]>([]);
    const [error, setError] = useState<string | undefined>(undefined);

    // Determine whether to use form context or props
    const isControlled = onChange !== undefined;

    // Get error from form context if not controlled
    const formError = isControlled ? propError : form.errors[name];
    const touched = isControlled ? true : form.touched[name];

    // Handle file selection
    const handleFileChange = (files: FileList | null) => {
      if (!files || files.length === 0) {
        setFileNames([]);
        if (isControlled) {
          onChange?.(null, name);
        } else {
          form.setValue(name, null);
          form.setTouched(name, true);
        }
        return;
      }

      const newNames: string[] = [];
      let errorMessage: string | undefined;

      // Check file size if maximum is specified
      if (maxFileSizeMB) {
        const maxSizeBytes = maxFileSizeMB * 1024 * 1024;

        for (let i = 0; i < files.length; i++) {
          if (files[i].size > maxSizeBytes) {
            errorMessage = `File exceeds the maximum size of ${maxFileSizeMB} MB`;
            break;
          }
        }
      }

      if (errorMessage) {
        setError(errorMessage);
        if (!isControlled) {
          form.setError(name, errorMessage);
          form.setValue(name, null);
          form.setTouched(name, true);
        }
        return;
      }

      // Clear any previous errors
      setError(undefined);

      // Get file names for display
      for (let i = 0; i < files.length; i++) {
        newNames.push(files[i].name);
      }

      setFileNames(newNames);

      if (isControlled) {
        onChange?.(files, name);
      } else {
        form.setValue(name, files);
        form.setTouched(name, true);
      }
    };

    // Clear any component-specific error when formError changes
    React.useEffect(() => {
      if (formError !== error) {
        setError(undefined);
      }
    }, [formError]);

    // Handle click on the dropzone
    const handleDropzoneClick = () => {
      if (!disabled && fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    // Handle drag events
    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) {
        setIsDragging(true);
      }
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (!disabled && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFileChange(e.dataTransfer.files);
      }
    };

    // Determine error state
    const hasError = Boolean(touched && (error || formError));
    const displayError = error || formError;

    // Base classes
    const containerClasses = `${fullWidth ? 'w-full' : ''} ${rest.hidden ? 'hidden' : ''}`;
    const dropzoneClasses = `mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${
      isDragging
        ? 'border-blue-400 bg-blue-50'
        : hasError
        ? 'border-red-300 bg-red-50'
        : 'border-gray-300 bg-gray-50'
    } ${
      disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
    } border-dashed rounded-md transition-all duration-200 ${className}`;

    return (
      <div className={containerClasses}>
        {label && (
          <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div
          className={dropzoneClasses}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleDropzoneClick}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={
            hasError ? `${name}-error` : helperText ? `${name}-helper-text` : undefined
          }
        >
          <div className="space-y-1 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor={name}
                className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
              >
                <span>{dropzoneLabel}</span>
                <input
                  ref={(node) => {
                    // Handle both the internal ref and the forwarded ref
                    if (typeof ref === 'function') {
                      ref(node);
                    } else if (ref) {
                      ref.current = node;
                    }

                    if (fileInputRef) {
                      fileInputRef.current = node;
                    }
                  }}
                  id={name}
                  name={name}
                  type="file"
                  className="sr-only"
                  onChange={(e) => handleFileChange(e.target.files)}
                  disabled={disabled}
                  required={required}
                  accept={accept}
                  multiple={multiple}
                  {...rest}
                />
              </label>
            </div>
            {fileNames.length > 0 && (
              <p className="text-xs text-gray-500 mt-2">Selected: {fileNames.join(', ')}</p>
            )}
            {maxFileSizeMB && (
              <p className="text-xs text-gray-500">Maximum file size: {maxFileSizeMB} MB</p>
            )}
          </div>
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
            {displayError}
          </p>
        )}
      </div>
    );
  }
);

FileUpload.displayName = 'FileUpload';
