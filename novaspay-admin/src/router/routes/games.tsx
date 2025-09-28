import GameCreate from '@/components/partials/Game/GameCreate';
import GamePage from '@/pages/Games';
import type { RouteObject } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const GameRouter: RouteObject = {
  path: 'games', // relative to /admin
  element: <Outlet />, // wrapper for nested routes
  children: [
    {
      index: true, // 👈 default child (/admin/games)
      element: <GamePage />,
    },
    {
      path: 'create', // /admin/games/create
      element: <GameCreate action="create" />,
    },
    {
      path: ':gameId', // /admin/games/123
      element: <div>Game Details</div>,
    },
    {
      path: 'edit/:gameId', // /admin/games/edit/123
      element: <GameCreate action="edit" />,
    },
  ],
};

export default GameRouter;
