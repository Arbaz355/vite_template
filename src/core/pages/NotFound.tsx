import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { Button } from '@/components/ui/button';
import { HomeIcon } from 'lucide-react';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-9xl font-bold text-primary">404</h1>
            <p className="mt-4 text-lg text-muted-foreground">
                Page not found
            </p>
            <Button
                className="mt-6"
                onClick={() => navigate(ROUTES.DASHBOARD)}
                leftIcon={<HomeIcon className="h-4 w-4" />}
            >
                Back to home
            </Button>
        </div>
    );
};

export default NotFound;
