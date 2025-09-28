import { useState } from 'react';
import { House, ChevronDown, MonitorPlay } from 'lucide-react';
import { Link } from 'react-router-dom';

const navItems = [
  { name: 'Home', icon: House, link: '/index' },
  {
    name: 'Virtual Bank',
    icon: MonitorPlay,
    children: [
      {
        name: 'Receive',
        children: [{ name: 'Accounts', link: '/banking/receive/bankAccount' }],
      },
      {
        name: 'History',
        children: [{ name: 'History List', link: '/banking/history/history' }],
      },
      {
        name: 'VA Applications',
        children: [
          { name: 'Apply Kyc Records', link: '/banking/others/profiles/index' },
          {
            name: 'Onboarding List',
            link: '/banking/others/applicationRecord',
          },
          { name: 'VA Apply History', link: '/banking/others/application' },
        ],
      },
    ],
  },
  { name: 'Counterparty', icon: MonitorPlay, children: [] },
  {
    name: 'Client',
    icon: MonitorPlay,
    children: [
      { name: 'Client List', link: '/member/client' },
      { name: 'Users', link: '/member/user' },
    ],
  },
];

type NavItem = {
  name: string;
  icon?: React.ComponentType<{ size?: number }>;
  link?: string; // ✅ add link type
  children?: NavItem[];
};

const NavItemComp = ({
  item,
  level = 0,
}: {
  item: NavItem;
  level?: number;
}) => {
  const [open, setOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const content = (
    <div
      className={`h-[56px] flex items-center justify-between cursor-pointer px-4`}
      style={{
        paddingLeft: `${20 + level * 20}px`,
        background:
          item.name === 'Home'
            ? '#60831a'
            : level > 0
            ? '#384d04'
            : 'transparent',
      }}
      onClick={() => hasChildren && setOpen(!open)}
    >
      <div className="flex items-center gap-2">
        {item.icon && <item.icon size={16} />}
        <span>{item.name}</span>
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
  return (
    <div className="min-w-[200px] bg-sidebar-bg text-[#cdd6bd]">
      <div className="bg-white h-[50px] flex items-center px-4">
        <h2 className="font-semibold text-black text-lg">
          <img
            src="/logo.png"
            alt="logo"
            className="inline object-contain px-1 w-[50px] h-[200px] mr-2"
          />
          Novaspay
        </h2>
      </div>
      <ul className="text-[14px]">
        {navItems.map((item) => (
          <NavItemComp key={item.name} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default SideNav;
