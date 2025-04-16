// Export form context and hooks
export * from './FormContext';

// Export form input components
export * from './TextInput';
export * from './Select';
export * from './Checkbox';
export * from './Radio';
export * from './DatePicker';
export * from './MultiSelect';
export * from './FileUpload';
export * from './TextArea';

// Create a default export for convenience
import { FormProvider, useForm, withForm } from './FormContext';
import { TextInput } from './TextInput';
import { Select } from './Select';
import { Checkbox } from './Checkbox';
import { RadioGroup } from './Radio';
import { DatePicker } from './DatePicker';
import { MultiSelect } from './MultiSelect';
import { FileUpload } from './FileUpload';
import { Textarea } from './TextArea';

export default {
  // Form context
  FormProvider,
  useForm,
  withForm,

  // Form inputs
  TextInput,
  Select,
  Checkbox,
  RadioGroup,
  DatePicker,
  MultiSelect,
  FileUpload,
  Textarea,
};
