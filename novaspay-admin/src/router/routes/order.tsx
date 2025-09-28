import OrderCreate from '@/components/partials/Orders/OrderCreate';
import OrdersPage from '@/pages/Order';
import { Outlet, type RouteObject } from 'react-router-dom';
import OrderView from '@/components/partials/Orders/OrderView';

const OrderRoutes: RouteObject = {
  path: 'orders',
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <OrdersPage />,
    },
    {
      path: 'create',
      element: <OrderCreate action="create" />,
    },
    // {
    //   path: 'assign-order/:orderId',
    //   element: <AssignSupplier />,
    // },
    {
      path: 'view/:orderId',
      element: <OrderView />,
    },
  ],
};

export { OrderRoutes };
