import CategoryPage from '@/pages/Category';
import { type RouteObject, Outlet } from 'react-router-dom';

const CategoryRouter: RouteObject = {
  path: 'categorys', // relative to /admin
  element: <Outlet />, // wrapper for nested routes
  children: [
    {
      path: ':gameId',
      element: <CategoryPage />,
    },
    {
      index: true,
      element: <CategoryPage />,
    },
  ],
};

export default CategoryRouter;
