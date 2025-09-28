import BannerPage from '@/pages/Settings/Banner';
import CouponsPage from '@/pages/Settings/Coupons';
import CurrencyPage from '@/pages/Settings/Currency';
import FeedbackPage from '@/pages/Settings/Feedback';
import NavigationPage from '@/pages/Settings/Navigation';
import { Outlet, type RouteObject } from 'react-router-dom';

const SettingRoute: RouteObject = {
  path: 'settings',
  element: <Outlet />,
  children: [
    {
      path: 'currency',
      element: <CurrencyPage />,
    },
    {
      path: 'banner',
      element: <BannerPage />,
    },
    {
      path: 'coupons',
      element: <CouponsPage />,
    },
    {
      path: 'feedback',
      element: <FeedbackPage />,
    },
    {
      path: 'navigation',
      element: <NavigationPage />,
    },
  ],
};

export { SettingRoute };
