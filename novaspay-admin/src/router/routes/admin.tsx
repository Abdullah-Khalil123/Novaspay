import AdminCreate from '@/components/partials/Admin/AdminCreate';
import AdminPage from '@/pages/Admin';
import { Outlet, type RouteObject } from 'react-router-dom';

export const adminRoutes: RouteObject = {
  path: 'admins',
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <AdminPage />,
    },
    {
      path: 'create',
      element: <AdminCreate />,
    },
    {
      path: 'edit/:id',
      element: <AdminCreate action="edit" />,
    },
  ],
};
