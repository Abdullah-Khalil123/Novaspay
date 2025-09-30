import Onboardings from '@/components/partials/OnBoarding/OnBoarding';
import OnboardingCreate from '@/components/partials/OnBoarding/OnBoardingCreate';
import { Outlet, type RouteObject } from 'react-router-dom';

export const onBoardingRoutes: RouteObject = {
  path: 'onboardings',
  element: <Outlet />,
  children: [
    {
      index: true,
      element: <Onboardings />,
    },
    {
      path: 'create',
      element: <OnboardingCreate />,
    },
    {
      path: 'edit/:id',
      element: <OnboardingCreate action="edit" />,
    },
  ],
};
