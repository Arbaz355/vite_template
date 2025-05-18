import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { AuthGuard, RoleGuard } from '@/core/router/guards';
import { UserRole } from '@/constants/user';
import { lazyImport, LazyLoadWrapper } from '@/core/utils/lazyImport';

// Use the lazyImport utility for component imports
const Login = lazyImport(() => import('@/core/pages/Login'));
const Dashboard = lazyImport(() => import('@/core/pages/DashBoard'));
const NotFound = lazyImport(() => import('@/core/pages/NotFound'));

const router = createBrowserRouter([
    {
        path: ROUTES.LOGIN,
        element: (
            <LazyLoadWrapper>
                <Login />
            </LazyLoadWrapper>
        ),
    },
    {
        path: ROUTES.DASHBOARD,
        element: (
            <LazyLoadWrapper>
                <AuthGuard>
                    <RoleGuard roles={[UserRole.ADMIN, UserRole.USER]} redirectTo="/unauthorized">
                        <Dashboard />
                    </RoleGuard>
                </AuthGuard>
            </LazyLoadWrapper>
        ),
    },
    {
        path: ROUTES.NOT_FOUND,
        element: (
            <LazyLoadWrapper>
                <NotFound />
            </LazyLoadWrapper>
        ),
    },
]);

export default router;