import ItemsServicePage from '@/pages/Services/ItemsService';
import CreateService from '@/components/partials/Services/ServiceCreate';
import ExtrasPage from '@/pages/Extra';
import OthersPage from '@/pages/Others';
import ServicesPage from '@/pages/Services';
import GoldServicePage from '@/pages/Services/GoldService';
import RaidsServicePage from '@/pages/Services/RaidsService';
import RankedServicePage from '@/pages/Services/RankedService';
import TieredServicePage from '@/pages/Services/TieredService';
import { Outlet, type RouteObject } from 'react-router-dom';

const ServicesRouter: RouteObject = {
  path: 'services',
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <ServicesPage />,
    },
    {
      path: ':gameId',
      element: <ServicesPage />,
    },
    {
      path: ':gameId/edit/:serviceId',
      element: <CreateService action="edit" />,
    },
    {
      path: ':gameId/create',
      element: <CreateService action="create" />,
    },
    {
      path: ':gameId/extra/:serviceId',
      element: <ExtrasPage />,
    },
    {
      path: ':gameId/other/:serviceId',
      element: <OthersPage />,
    },
    {
      path: ':gameId/config/gold/:serviceId',
      element: <GoldServicePage />,
    },
    {
      path: ':gameId/config/Ranked Leveling/:serviceId',
      element: <RankedServicePage />,
    },
    {
      path: ':gameId/config/Tiered Leveling/:serviceId',
      element: <TieredServicePage />,
    },
    {
      path: ':gameId/config/Raids/:serviceId',
      element: <RaidsServicePage />,
    },
    {
      path: ':gameId/config/Item/:serviceId',
      element: <ItemsServicePage />,
    },
  ],
};

export { ServicesRouter };
