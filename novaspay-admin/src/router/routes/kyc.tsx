import KYCForm from '@/components/partials/KYC/KYCCreate';
import KYCPage from '@/pages/KYC';
import { Outlet, type RouteObject } from 'react-router-dom';

export const kycRoutes: RouteObject = {
  path: 'kyc',
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <KYCPage />,
    },
    {
      path: 'create',
      element: <KYCForm />,
    },
    {
      path: 'edit/:id',
      element: <KYCForm action="edit" />,
    },
  ],
};
