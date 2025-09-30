import VACreate from '@/components/partials/VA/VaCreate';
import VAs from '@/components/partials/VA/VAList';
import { Outlet, type RouteObject } from 'react-router-dom';

export const vaRoutes: RouteObject = {
  path: 'vas',
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <VAs />,
    },
    {
      path: 'create',
      element: <VACreate />,
    },
    {
      path: 'edit/:id',
      element: <VACreate action="edit" />,
    },
  ],
};
