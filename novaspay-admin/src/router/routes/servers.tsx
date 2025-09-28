import ServerManagmentPage from '@/pages/Server';
import SubServePage from '@/pages/Server/SubServer';
import type { RouteObject } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const ServerRouter: RouteObject = {
  path: 'servers', // relative to /admin
  element: <Outlet />, // wrapper for nested routes
  children: [
    {
      path: ':gameId',
      element: <ServerManagmentPage />,
    },
    {
      path: ':gameId/sub-server/:parentId',
      element: <SubServePage />,
    },
  ],
};

export default ServerRouter;