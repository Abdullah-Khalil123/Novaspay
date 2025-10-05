import CurrencyForm from '@/components/partials/Currency/CurrencyCreate';
import CurrecnyPage from '@/pages/Currency';
import { Outlet, type RouteObject } from 'react-router-dom';

const currencyRoutes: RouteObject = {
  path: 'currencies',
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <CurrecnyPage />,
    },
    {
      path: 'create',
      element: <CurrencyForm action="create" />,
    },
    {
      path: 'edit/:symbol',
      element: <CurrencyForm action="edit" />,
    },
  ],
};

export { currencyRoutes };
