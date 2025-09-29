import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppLayout from '../AppLayout';
import Login from '../pages/Login';
import NotFound from '@/pages/404NotFound';
import HomePage from '@/pages/Home';
import { transactionRoute } from './routes/transaction';

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
    ],
  },

  { path: '*', element: <NotFound /> }, // global 404
]);

export default router;
