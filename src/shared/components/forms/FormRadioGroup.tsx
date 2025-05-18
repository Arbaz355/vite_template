import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FieldValues } from "react-hook-form";
import { FormRadioGroupProps } from "@/types/FormRadioGroup";
import { cn } from "@/lib/utils";

const FormRadioGroup = <T extends FieldValues>({
    name,
    control,
    label,
    radioGroupList,
    isErrorMessageVisible = false,
    isDisabled = false,
    isRequired = false,
    direction = 'horizontal',
    helperText,
    className,
    ...props
}: FormRadioGroupProps<T>) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field, fieldState: { error }, }) => (
                <FormItem className={cn("space-y-3", className)}>
                    {label && <FormLabel htmlFor={name}>{label} {isRequired && <span className="text-red-500">*</span>}</FormLabel>}
                    <FormControl>
                        <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className={cn(
                                direction === 'horizontal' ? 'flex space-x-2' : 'flex flex-col space-y-2',
                                isDisabled && 'opacity-50 cursor-not-allowed'
                            )}
                            disabled={isDisabled}
                            {...props}
                        >
                            {radioGroupList?.map((radioItem) => (
                                <FormItem
                                    key={radioItem.value}
                                    className={cn(
                                        "flex items-center space-x-3 space-y-0",
                                        radioItem.disabled && 'opacity-50'
                                    )}
                                >
                                    <FormControl>
                                        <RadioGroupItem value={radioItem.value} disabled={radioItem.disabled} />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                        {radioItem.label}
                                    </FormLabel>
                                </FormItem>
                            ))}
                        </RadioGroup>
                    </FormControl>
                    {helperText && !error && (
                        <p className={cn("text-sm text-muted-foreground")}>{helperText}</p>
                    )}
                    {isErrorMessageVisible && error?.message && (
                        <FormMessage className={cn("text-red-500")}>
                            {String(error.message)}
                        </FormMessage>
                    )}
                </FormItem>
            )}
        />
    )
}

export default FormRadioGroup;
