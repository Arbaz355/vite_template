import { useAuth } from '@/features/auth/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { LogOutIcon } from 'lucide-react';

const Dashboard = () => {
    const { logout } = useAuth();

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">
                    {/* Welcome, {user?.displayName || 'User'} */}
                </h1>                <Button
                    variant="outline"
                    onClick={logout}
                    leftIcon={<LogOutIcon className="h-4 w-4" />}
                >
                    Sign out
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border bg-card">
                    <h2 className="font-semibold mb-2">Quick Stats</h2>
                    <p className="text-sm text-muted-foreground">
                        Your dashboard content goes here
                    </p>
                </div>
                <div className="p-4 rounded-lg border bg-card">
                    <h2 className="font-semibold mb-2">Recent Activity</h2>
                    <p className="text-sm text-muted-foreground">
                        No recent activity
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
