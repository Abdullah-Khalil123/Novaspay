import ClientCreate from '@/components/partials/Client/ClientCreate';
import Clients from '@/components/partials/Client/ClientList';
import { Outlet, type RouteObject } from 'react-router-dom';

export const clientRoute: RouteObject = {
  path: 'clients',
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <Clients />,
    },
    {
      path: 'create',
      element: <ClientCreate />,
    },
    {
      path: 'edit/:id',
      element: <ClientCreate action="edit" />,
    },
  ],
};
