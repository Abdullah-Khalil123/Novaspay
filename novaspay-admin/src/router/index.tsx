import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppLayout from '../AppLayout';
import Login from '../pages/Login';
import GameRouter from './routes/games';
import ServerRouter from './routes/servers';
import NotFound from '@/pages/404NotFound';
import CategoryRouter from './routes/category';
import ArticlesRoute from './routes/articles';
import { AuthorRouter } from './routes/author';
import { ServicesRouter } from './routes/services';
import { SupplierRouter } from './routes/suppliers';
import { OrderRoutes } from './routes/order';
import HomePage from '@/pages/Home';
import { SettingRoute } from './routes/settings';
import { userRoute } from './routes/users';

const router = createBrowserRouter([
  {
    index: true,
    element: <Navigate to="/admin" replace />,
  },
  {
    path: '/auth/login',
    element: <Login />,
  },
  {
    path: '/admin',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      GameRouter,
      ServerRouter,
      CategoryRouter,
      ArticlesRoute,
      AuthorRouter,
      ServicesRouter,
      SupplierRouter,
      OrderRoutes,
      SettingRoute,
      userRoute,
    ],
  },

  { path: '*', element: <NotFound /> }, // global 404
]);

export default router;
