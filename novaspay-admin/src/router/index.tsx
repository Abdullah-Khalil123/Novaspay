import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppLayout from '../AppLayout';
import Login from '../pages/Login';
import NotFound from '@/pages/404NotFound';
import HomePage from '@/pages/Home';
import { transactionRoute } from './routes/transaction';
import { accountRoutes } from './routes/accounts';
import { kycRoutes } from './routes/kyc';
import { clientRoute } from './routes/client';
import { vaRoutes } from './routes/va';
import { onBoardingRoutes } from './routes/onBoarding';
import { userRoute } from './routes/users';
import { applicationsRouter } from './routes/applications';
import { currencyRoutes } from './routes/currency';
import { adminRoutes } from './routes/admin';

const router = createBrowserRouter([
  {
    index: true,
    element: <Navigate to="/admin" replace />,
  },
  {
    path: '/auth/login',
    element: <Login />,
  },
  {
    path: '/admin',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      transactionRoute,
      accountRoutes,
      kycRoutes,
      currencyRoutes,
      clientRoute,
      vaRoutes,
      onBoardingRoutes,
      userRoute,
      applicationsRouter,
      adminRoutes,
    ],
  },

  { path: '*', element: <NotFound /> }, // global 404
]);

export default router;
