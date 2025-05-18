import { FieldValues } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { FormTextAreaProps } from '@/types/FormTextArea';

const FormTextArea = <T extends FieldValues>({
    name,
    control,
    label,
    placeholder,
    isRequired,
    showErrorMessage = false,
    isDisabled = false,
    className,
    ...props
}: FormTextAreaProps<T>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <FormItem>
                    {label && (
                        <FormLabel htmlFor={name}>
                            {label} {isRequired && <span className="text-red-500">*</span>}
                        </FormLabel>
                    )}
                    <FormControl>
                        <Textarea
                            className={cn(
                                error ? "border-red-500" : "border-gray-300",
                                className
                            )}
                            placeholder={placeholder}
                            disabled={isDisabled}
                            {...field}
                            {...props}
                        />
                    </FormControl>
                    {showErrorMessage && error?.message && (
                        <FormMessage className="text-red-500">
                            {String(error.message)}
                        </FormMessage>
                    )}
                </FormItem>
            )}
        />
    );
};

export default FormTextArea;
