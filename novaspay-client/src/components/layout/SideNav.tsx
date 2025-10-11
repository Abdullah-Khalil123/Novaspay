import { useState, useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import House from '@/assets/home';
import Bank from '@/assets/virtualBank';

import Recieve from '@/assets/recieve';
import History from '@/assets/history';
import Va from '@/assets/va';

import type { RootState } from '@/store';
import { setSidebar } from '@/store/slices/sideNav';
import { useTranslation } from 'react-i18next';

export type NavItem = {
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
  const [isHoveringMenuItem, setIsHoveringMenuItem] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const hasChildren = item.children && item.children.length > 0;

  const paddingLeftLevel1 = 'pl-8';
  const paddingLeftLevel2 = 'pl-12';
  const paddingLeftLevel3 = 'pl-16';

  const handleMouseEnterMenuItem = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsHoveringMenuItem(true);
    if (collapsed && hasChildren) {
      setOpen(true);
    }
  };

  const handleMouseLeaveMenuItem = () => {
    if (collapsed) {
      timeoutRef.current = setTimeout(() => {
        setIsHoveringMenuItem(false);
        setOpen(false);
      }, 150);
    } else {
      setIsHoveringMenuItem(false);
      if (!hasChildren) {
        setOpen(false);
      }
    }
  };

  const handleClick = () => {
    if (hasChildren && !collapsed) {
      setOpen(!open);
    }
  };

  const navItemContent = (
    <div
      className={`
        h-[56px] flex items-center justify-between cursor-pointer px-5
        ${
          item.name === 'Home'
            ? 'bg-sidebar-child'
            : level > 0
            ? 'bg-sidebar-child'
            : 'bg-transparent'
        }
        ${
          !collapsed && level === 1
            ? paddingLeftLevel1
            : !collapsed && level === 2
            ? paddingLeftLevel2
            : !collapsed && level === 3
            ? paddingLeftLevel3
            : ''
        }
      `}
      onClick={handleClick}
    >
      <div className="flex items-center gap-2">
        {item.icon}
        {!collapsed && <span className="whitespace-nowrap">{item.name}</span>}
        {level > 0 && collapsed && (
          <span className="whitespace-nowrap">{item.name}</span>
        )}
      </div>
      {hasChildren && !collapsed && (
        <ChevronRight
          size={16}
          className={`transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        />
      )}
    </div>
  );

  return (
    <li
      onMouseEnter={handleMouseEnterMenuItem}
      onMouseLeave={handleMouseLeaveMenuItem}
    >
      {item.link ? (
        <Link to={item.link}>{navItemContent}</Link>
      ) : (
        navItemContent
      )}

      {hasChildren && !collapsed && (
        <ul
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            open ? 'max-h-[1000px]' : 'max-h-0'
          }`}
        >
          {item.children!.map((child) => (
            <NavItemComp
              key={child.name}
              item={child}
              level={level + 1}
              collapsed={collapsed}
            />
          ))}
        </ul>
      )}

      {hasChildren && collapsed && isHoveringMenuItem && open && (
        <div
          className={`
            absolute w-[200px] z-50
            bg-sidebar-bg border border-border rounded shadow-lg
            ${
              level === 0
                ? 'left-[60px] ml-3 -translate-y-14'
                : 'left-[calc(100%)] ml-1 -translate-y-14'
            }
          `}
          onMouseEnter={handleMouseEnterMenuItem}
          onMouseLeave={handleMouseLeaveMenuItem}
        >
          <ul className="text-[14px]">
            {item.children!.map((child) => (
              <NavItemComp
                key={child.name}
                item={child}
                level={level + 1}
                collapsed={true}
              />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

const SideNav = () => {
  const collapsed = useSelector((state: RootState) => state.nav.isCollapsed);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        dispatch(setSidebar(true));
      } else {
        dispatch(setSidebar(false));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  const { t } = useTranslation();
  const navItems = [
    { name: t('Home'), icon: <House />, link: '/index' },
    {
      name: t('Virtual Bank'),
      icon: <Bank />,
      children: [
        {
          name: t('Receive'),
          icon: <Recieve />,
          children: [
            {
              name: t('Accounts'),
              link: '/banking/receive/bankAccount',
              icon: <House />,
            },
          ],
        },
        {
          name: t('Crypto Asset'),
          icon: <History />,
          children: [
            {
              name: t('Buy/Sell'),
              link: '/banking/crypto/cryptoBuySell',
            },
            {
              name: t('Application List'),
              link: '/banking/crypto/crypto',
            },
          ],
        },
        {
          name: t('History'),
          icon: <Va />,
          children: [
            {
              name: t('History List'),
              link: '/banking/history/history',
            },
          ],
        },
      ],
    },
  ];

  return (
    <div
      className={
        `text-[#bfcbd9] h-svh overflow-y-scroll custom-scrollbar bg-sidebar-bg ` +
        (collapsed ? 'max-w-[60px]' : 'min-w-[200px]')
      }
    >
      <div className="bg-white overflow-x-hidden h-[50px] flex items-center px-4">
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

/////////////////////////
