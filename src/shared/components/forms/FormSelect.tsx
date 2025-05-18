import {
    FormControl, FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { FieldValues } from "react-hook-form"
import { FormSelectProps, SelectOption } from "@/types/FomSelect"
import { cn } from "@/lib/utils"

const FormSelect = <T extends FieldValues>({
    control,
    name,
    options,
    placeholder,
    showErrorMessage = true,
    isDisabled,
    label,
    isRequired,
    helperText,
    fullWidth,
    className,
    ...props
}: FormSelectProps<T>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <FormItem className={fullWidth ? 'w-full' : ''}>
                    {label && (
                        <FormLabel>
                            {label} {isRequired && <span className="text-red-500">*</span>}
                        </FormLabel>
                    )}
                    <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isDisabled}
                        {...props}
                    >
                        <FormControl>
                            <SelectTrigger className={cn(
                                "py-5",
                                fullWidth && "w-full",
                                className
                            )}>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {options.map((option: SelectOption) => (
                                <SelectItem
                                    key={option.value.toString()}
                                    value={option.value.toString()}
                                    disabled={option.disabled}
                                >
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {helperText && !error && (
                        <p className="text-sm text-muted-foreground">{helperText}</p>
                    )}
                    {showErrorMessage && error?.message && (
                        <FormMessage className="text-red-500">
                            {String(error.message)}
                        </FormMessage>
                    )}
                </FormItem>
            )}
        />
    )
}

export default FormSelect
