import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ROUTES } from '@/constants/routes';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { FormInput } from '@/shared/components/forms';
import { LogInIcon } from 'lucide-react';

// Zod schema for form validation
const loginSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginValues = z.infer<typeof loginSchema>;

const Login = () => {
    const navigate = useNavigate();
    
    const form = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = (data: LoginValues) => {
        console.log('Form submitted:', data);
        navigate(ROUTES.DASHBOARD);
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-sm space-y-4 p-4">
                    <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>
                    
                    <FormInput
                        control={form.control}
                        name="email"
                        type="email"
                        label="Email"
                        placeholder="Enter your email"
                        isRequired
                        showErrorMessage
                    />

                    <FormInput
                        control={form.control}
                        name="password"
                        type="password"
                        label="Password"
                        placeholder="Enter your password"
                        isRequired
                        showErrorMessage
                        isEyeIconRequired
                    />

                    <Button 
                        type="submit"
                        className="w-full"
                        isLoading={form.formState.isSubmitting}
                        leftIcon={<LogInIcon className="h-4 w-4" />}
                    >
                        Sign in
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default Login;
