import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import House from '@/assets/home';
import Bank from '@/assets/virtualBank';
// import CounterParty from '@/assets/counterParty';
// import Client from '@/assets/client';

import Recieve from '@/assets/recieve';
import History from '@/assets/history';
// import Kyc from '@/assets/kyc';
// import OnBoarding from '@/assets/onBoarding';
import Va from '@/assets/va';

// import ClientIcon from '@/assets/clientlist';
// import Users from '@/assets/users';
import type { RootState } from '@/store';

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
        name: 'Crypto Asset',
        icon: <History />,

        children: [
          {
            name: 'Buy/Sell',
            link: '/banking/crypto/cryptoBuySell',
          },
          {
            name: 'Application List',
            link: '/banking/crypto/crypto',
          },
        ],
      },
      {
        name: 'History',
        icon: <Va />,

        children: [
          {
            name: 'History List',
            link: '/banking/history/history',
          },
        ],
      },
    ],
  },
  // { name: 'Counterparty', icon: <CounterParty />, children: [] },
  // {
  //   name: 'Client',
  //   icon: <Client />,
  //   children: [
  //     { name: 'Client List', link: '/member/client', icon: <ClientIcon /> },
  //     { name: 'Users', link: '/member/user', icon: <Users /> },
  //   ],
  // },
];

type NavItem = {
  name: string;
  icon?: React.ReactNode;
  link?: string;
  children?: NavItem[];
};

const NavItemComp = ({
  item,
  collapsed = false,
  level = 0,
}: {
  item: NavItem;
  collapsed?: boolean;
  level?: number;
}) => {
  const [open, setOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const content = (
    <div
      className={`h-[56px] flex bg-sidebar-child items-center justify-between cursor-pointer px-4`}
      style={{
        paddingLeft: `${20 + level * 20}px`,
        background:
          item.name === 'Home'
            ? '#001529'
            : level > 0
            ? '#0f2438'
            : 'transparent',
      }}
      onClick={() => hasChildren && setOpen(!open)}
    >
      <div className="flex items-center gap-2 cursor-pointer">
        {item.icon}
        <span>{!collapsed ? item.name : ''}</span>
      </div>
      {hasChildren && (
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        />
      )}
    </div>
  );

  return (
    <li>
      {/* If item has link and no children → make it a <Link> */}
      {item.link && !hasChildren ? (
        <Link to={item.link}>{content}</Link>
      ) : (
        content
      )}

      {/* Render children */}
      {hasChildren && (
        <ul
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            open ? 'max-h-[1000px]' : 'max-h-0'
          }`}
        >
          {item.children!.map((child) => (
            <NavItemComp key={child.name} item={child} level={level + 1} />
          ))}
        </ul>
      )}
    </li>
  );
};

const SideNav = () => {
  const collapsed = useSelector((state: RootState) => state.nav.isCollapsed);
  return (
    <div
      className={
        `text-[#bfcbd9] h-svh overflow-y-scroll custom-scrollbar bg-sidebar-bg ` +
        (collapsed ? 'max-w-[60px]' : 'min-w-[220px]')
      }
    >
      <div className="bg-white h-[50px] flex items-center px-4">
        <h2 className="font-semibold text-black text-lg">
          <img
            src="/logo.png"
            alt="logo"
            className={
              `inline object-contain px-1 w-[50px] mr-2 ` +
              (collapsed ? 'min-w-[50px] -translate-x-2' : '')
            }
          />

          {!collapsed && 'NovasPay'}
        </h2>
      </div>
      <ul className="text-[14px]">
        {navItems.map((item) => (
          <NavItemComp key={item.name} item={item} collapsed={collapsed} />
        ))}
      </ul>
    </div>
  );
};

export default SideNav;
