import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import House from '@/assets/home';
import Bank from '@/assets/virtualBank';
import CounterParty from '@/assets/counterParty';
import Client from '@/assets/client';
import Recieve from '@/assets/recieve';
import History from '@/assets/history';
import Kyc from '@/assets/kyc';
import OnBoarding from '@/assets/onBoarding';
import Va from '@/assets/va';
import ClientIcon from '@/assets/clientlist';
import Users from '@/assets/users';

const navItems = [
  { name: 'Home', icon: <House />, link: '/index' },
  {
    name: 'Virtual Bank',
    icon: <Bank />,
    children: [
      {
        name: 'Receive',
        icon: <Recieve />,
        children: [
          {
            name: 'Accounts',
            link: '/banking/receive/bankAccount',
            icon: <House />,
          },
        ],
      },
      {
        name: 'History',
        icon: <History />,
        children: [
          {
            name: 'History List',
            link: '/banking/history/history',
          },
        ],
      },
      {
        name: 'VA Applications',
        icon: <Va />,
        children: [
          {
            name: 'Apply Kyc Records',
            link: '/banking/others/profiles/index',
            icon: <Kyc />,
          },
          {
            name: 'Onboarding List',
            link: '/banking/others/applicationRecord',
            icon: <OnBoarding />,
          },
          {
            name: 'VA Apply History',
            link: '/banking/others/application',
            icon: <Va />,
          },
        ],
      },
    ],
  },
  { name: 'Counterparty', icon: <CounterParty />, children: [] },
  {
    name: 'Client',
    icon: <Client />,
    children: [
      { name: 'Client List', link: '/member/client', icon: <ClientIcon /> },
      { name: 'Users', link: '/member/user', icon: <Users /> },
    ],
  },
];

const findBreadcrumbPath: any = (
  items: any[],
  currentPath: string,
  trail: any[] = []
) => {
  for (const item of items) {
    const newTrail = [...trail, item];
    if (item.link === currentPath) return newTrail;
    if (item.children) {
      const found = findBreadcrumbPath(item.children, currentPath, newTrail);
      if (found.length) return found;
    }
  }
  return [];
};

const Breadcrumbs = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const breadcrumbTrail = findBreadcrumbPath(navItems, currentPath);

  if (!breadcrumbTrail.length) return null;

  return (
    <nav className="flex items-center text-sm text-gray-600">
      {breadcrumbTrail.map((crumb: any, index: number) => {
        const isLast = index === breadcrumbTrail.length - 1;

        return (
          <div key={crumb.name} className="flex items-center">
            {index !== 0 && (
              <ChevronRight size={14} className="mx-1 text-gray-400" />
            )}
            {isLast ? (
              <span className="flex items-center gap-1 font-medium">
                {crumb.icon}
                {crumb.name}
              </span>
            ) : (
              <Link to={crumb.link || '#'} className="flex items-center gap-1">
                {crumb.icon}
                {crumb.name}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
