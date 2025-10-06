import { createBrowserRouter, Navigate } from 'react-router-dom';
import IndexPage from '../pages/Index';
import Layout from '../layout';
import ReceiveAccount from '../pages/Account';
import HistoryPage from '../pages/History';
import ClientPage from '../pages/Client';
import UserPage from '../pages/Users';
import LoginPage from '@/pages/Login';
import ApplicationList from '@/pages/Application';
import CryptoBuySell from '@/pages/BuySell';
import UserProfile from '@/pages/Profile';
import SignUpPage from '@/pages/SignUp';
import DocumentForm from '@/pages/DocumentForm';
import DetailOpenDeposit from '@/pages/DetailOpenDeposit';

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
    path: 'user/profile',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <UserProfile />,
      },
    ],
  },
  {
    path: 'company/create-account-login',
    element: <SignUpPage />,
  },
  {
    path: 'member/client/documentForm',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <DocumentForm />,
      },
    ],
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
      {
        path: 'history/DetailOpenDeposit',
        element: <DetailOpenDeposit />,
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
