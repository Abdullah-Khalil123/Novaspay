import { createBrowserRouter, Navigate } from 'react-router-dom';
import IndexPage from '../pages/Index';
import Layout from '../layout';
import ReceiveAccount from '../pages/Account';
import HistoryPage from '../pages/History';
import KYCPage from '../pages/KYC';
import OnboardingPage from '../pages/OnBoarding';
import VAPage from '../pages/VA';
import ClientPage from '../pages/Client';
import UserPage from '../pages/Users';
import LoginPage from '@/pages/Login';

const router = createBrowserRouter([
  {
    index: true,
    element: <Navigate to="/index" replace />,
  },
  {
    path: 'admin/login',
    element: <LoginPage />,
  },
  {
    path: '/index',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <IndexPage />,
      },
    ],
  },
  {
    path: 'banking',
    element: <Layout />,
    children: [
      {
        path: 'receive/bankAccount',
        element: <ReceiveAccount />,
      },
      {
        path: 'history/history',
        element: <HistoryPage />,
      },
      {
        path: 'others/profiles/index',
        element: <KYCPage />,
      },
      {
        path: 'others/applicationRecord',
        element: <OnboardingPage />,
      },
      {
        path: 'others/application',
        element: <VAPage />,
      },
    ],
  },
  {
    path: 'member',
    element: <Layout />,
    children: [
      {
        path: 'client',
        element: <ClientPage />,
      },
      {
        path: 'user',
        element: <UserPage />,
      },
    ],
  },
]);

export default router;
