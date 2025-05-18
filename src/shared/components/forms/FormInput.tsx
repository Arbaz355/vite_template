import { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { FormInputProps } from '@/types/FormInput';
import { Button } from '@/components/ui/button';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

const FormInput = <T extends FieldValues>({
    name,
    control,
    type = "text",
    label,
    placeholder,
    isRequired,
    showErrorMessage = false,
    isEyeIconRequired = false,
    isDisabled = false,
    ...props
}: FormInputProps<T>) => {
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordToggle = () => setShowPassword((prev: boolean) => !prev);

    return (
        <FormField
            control={control}
            name={name}
            render={({ field, fieldState: { error }, }) => (
                <FormItem>
                    {
                        label && <FormLabel htmlFor={name}>{label} {isRequired && <span className="text-red-500">*</span>} </FormLabel>
                    }
                    <FormControl >
                        <div className="relative">
                            <Input type={showPassword ? "text" : type}
                                className={cn(
                                    error ? "border-red-500" : "border-gray-300",
                                    "py-5",
                                    isEyeIconRequired && "pr-10"
                                )}
                                placeholder={placeholder}
                                disabled={isDisabled}
                                {...field}
                                {...props}
                            />
                            {
                                isEyeIconRequired && (<Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className={cn(
                                        "absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent disabled:cursor-not-allowed"
                                    )}
                                    onClick={handlePasswordToggle}
                                    disabled={!field.value}
                                >
                                    {showPassword ? (
                                        <EyeIcon className="h-4 w-4" aria-hidden="true" />
                                    ) : (
                                        <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
                                    )}
                                </Button>)
                            }
                        </div>
                    </FormControl>

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

export default FormInput