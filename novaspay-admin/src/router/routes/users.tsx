import CreateUserPage from '@/components/partials/Users/CreateUser';
import UserFunds from '@/components/partials/Users/Funds';
import UserTransactions from '@/components/partials/Users/UserTransactions';
import UsersPage from '@/pages/Users';
import { Outlet, type RouteObject } from 'react-router-dom';

const userRoute: RouteObject = {
  path: 'users',
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <UsersPage />,
    },
    {
      path: 'edit/:userId',
      element: <CreateUserPage action="edit" />,
    },
    {
      path: ':userId/funds',
      element: <UserFunds />,
    },
    {
      path: ':userId/transactions',
      element: <UserTransactions />,
    },
  ],
};

export { userRoute };
