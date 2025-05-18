import { Checkbox } from "@/components/ui/checkbox"
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { FieldValues } from "react-hook-form"
import { FormCheckboxGroupProps, CheckboxOption } from "@/types/FormCheckBox"
import { cn } from "@/lib/utils"

const FormCheckboxGroup = <T extends FieldValues>({
    name,
    control,
    checkBoxOptions,
    label,
    labelDescription,
    isDisabled,
    showErrorMessage = true,
    isRequired,
    helperText,
    labelClassName,
    checkboxClassName,
    ...props
}: FormCheckboxGroupProps<T>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <FormItem>
                    <div className="mb-4">
                        {label && (
                            <FormLabel className={cn("text-sm", labelClassName)}>
                                {label} {isRequired && <span className="text-red-500">*</span>}
                            </FormLabel>
                        )}
                        {labelDescription && (
                            <FormDescription>{labelDescription}</FormDescription>
                        )}
                        {helperText && !error && (
                            <FormDescription>{helperText}</FormDescription>
                        )}
                    </div>
                    <div className="flex space-x-5">
                        {checkBoxOptions?.map((item: CheckboxOption) => (
                            <FormField
                                key={item.id}
                                control={control}
                                name={name}
                                render={({ field }) => (
                                    <FormItem
                                        key={item.id}
                                        className={cn(
                                            "flex flex-row items-center space-x-3 space-y-0",
                                            checkboxClassName
                                        )}
                                    >
                                        <FormControl>
                                            <Checkbox
                                                disabled={isDisabled || item.disabled}
                                                checked={field.value?.includes(item.id)}
                                                onCheckedChange={(checked) => {
                                                    const value = Array.isArray(field.value) ? field.value : [];
                                                    const newValue = checked
                                                        ? [...value, item.id]
                                                        : value.filter((val: string) => val !== item.id);

                                                    field.onChange(newValue);
                                                }}
                                            />
                                        </FormControl>
                                        <FormLabel className="text-sm font-normal">
                                            {item.label}
                                        </FormLabel>
                                    </FormItem>
                                )}
                            />
                        ))}
                    </div>
                    {showErrorMessage && error?.message && (
                        <FormMessage>{String(error.message)}</FormMessage>
                    )}
                </FormItem>
            )}
        />
    );
};

export default FormCheckboxGroup;
