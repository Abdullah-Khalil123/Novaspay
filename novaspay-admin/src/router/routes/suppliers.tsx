import CreateSupplier from '@/components/partials/Supplier/CreateSupplier';
import SupplierPage from '@/pages/Suppliers';
import { Outlet, type RouteObject } from 'react-router-dom';

const SupplierRouter: RouteObject = {
  path: 'suppliers',
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <SupplierPage />,
    },
    {
      path: 'create',
      element: <CreateSupplier action="create" />,
    },
    {
      path: 'edit/:supplierId',
      element: <CreateSupplier action="edit" />,
    },
  ],
};

export { SupplierRouter };
