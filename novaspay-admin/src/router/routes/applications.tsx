import ApplicationCreate from '@/components/partials/Application/ApplicationCreate';
import ApplicationPage from '@/pages/Applications';
import { Outlet, type RouteObject } from 'react-router-dom';

const applicationsRouter: RouteObject = {
  path: 'applications',
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <ApplicationPage />,
    },
    {
      path: 'edit/:id',
      element: <ApplicationCreate action="edit" />,
    },
  ],
};

export { applicationsRouter };
