import AccountCreate from '@/components/partials/Account/AccountCreate';
import AccountPage from '@/pages/Accounts';
import { Outlet, type RouteObject } from 'react-router-dom';

export const accountRoutes: RouteObject = {
  path: 'accounts',
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <AccountPage />,
    },
    {
      path: 'create',
      element: <AccountCreate />,
    },
    {
      path: 'edit/:id',
      element: <AccountCreate action="edit" />,
    },
  ],
};
