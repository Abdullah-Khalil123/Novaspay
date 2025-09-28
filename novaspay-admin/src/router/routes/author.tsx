import AuthorPage from '@/pages/Author';
import { Outlet, type RouteObject } from 'react-router-dom';

const AuthorRouter: RouteObject = {
  path: 'authors', // relative to /admin
  element: <Outlet />, // wrapper for nested routes
  children: [
    {
      index: true,
      element: <AuthorPage />,
    },
  ],
};
export { AuthorRouter };
