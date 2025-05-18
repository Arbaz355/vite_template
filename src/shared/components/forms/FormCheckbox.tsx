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
import { FormCheckboxProps } from "@/types/FormCheckBox"
import { cn } from "@/lib/utils"

const FormCheckbox = <T extends FieldValues>({
    name,
    control,
    label,
    labelDescription,
    isDisabled = false,
    showErrorMessage = true,
    isRequired,
    helperText,
    labelClassName,
    checkboxClassName,
    defaultChecked = false,
}: FormCheckboxProps<T>) => {
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
                    <FormItem
                        className={cn(
                            "flex flex-row items-center space-x-3 space-y-0",
                            checkboxClassName
                        )}
                    >
                        <FormControl>
                            <Checkbox
                                disabled={isDisabled}
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                defaultChecked={defaultChecked}
                            />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                            {label}
                        </FormLabel>
                    </FormItem>
                    {showErrorMessage && error?.message && (
                        <FormMessage>{String(error.message)}</FormMessage>
                    )}
                </FormItem>
            )}
        />
    );
};

export default FormCheckbox;
