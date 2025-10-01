import { createBrowserRouter, Navigate } from 'react-router-dom';
import IndexPage from '../pages/Index';
import Layout from '../layout';
import ReceiveAccount from '../pages/Account';
import HistoryPage from '../pages/History';
import ClientPage from '../pages/Client';
import UserPage from '../pages/Users';
import LoginPage from '@/pages/Login';
import ApplicationList from '@/pages/Application';
import CryptoBuySell from '@/pages/Buy/Sell';

const router = createBrowserRouter([
  {
    index: true,
    element: <Navigate to="/index" replace />,
  },
  {
    path: 'user/login',
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
        path: 'crypto/crypto',
        element: <ApplicationList />,
      },
      {
        path: 'crypto/cryptoBuySell',
        element: <CryptoBuySell />,
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
