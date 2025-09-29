import TransactionCreate from '@/components/partials/Transactions/TransactionCreate';
import TransactionsPage from '@/pages/Transactions';
import { Outlet, type RouteObject } from 'react-router-dom';

export const transactionRoute: RouteObject = {
  path: 'transactions',
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <TransactionsPage />,
    },
    {
      path: 'create',
      element: <TransactionCreate />,
    },
    {
      path: 'edit/:id',
      element: <TransactionCreate action="edit" />,
    },
  ],
};
