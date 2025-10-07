import { toggleSidebar } from '@/store/slices/sideNav';
import { logout } from '@/store/slices/auth';
import {
  Menu,
  Fullscreen,
  // Languages,
  // SlidersHorizontalIcon,
  // Bell,
  LogOut,
  User,
  Eye,
  Bell,
  Languages,
  SlidersHorizontalIcon,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import Switch from '../custom/toggleTheme';
import type { RootState } from '@/store';
import { useState, useEffect } from 'react';
import Dropdown from '../custom/dropdown'; // ⬅️ import reusable dropdown
import { useNavigate } from 'react-router-dom';
import BreadCrumb from '../custom/BreadCrumb';
import { setFontSize } from '@/store/slices/font';

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const [_, setIsFullScreen] = useState(false);

  useEffect(() => {
    const fullScreenChange = () =>
      setIsFullScreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', fullScreenChange);
    return () =>
      document.removeEventListener('fullscreenchange', fullScreenChange);
  }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen?.();
    }
  };

  const toggleFontSize = (size: 'default' | 'large' | 'small') => {
    dispatch(setFontSize(size));
  };

  return (
    <div className="h-[50px] text-text-primary bg-header-color flex items-center justify-between">
      <div className="flex h-full items-center">
        <div
          className="px-4 flex items-center h-full cursor-pointer hover:bg-header-hover"
          onClick={() => dispatch(toggleSidebar())}
        >
          <Menu size={18} />
        </div>
        <BreadCrumb />
      </div>

      <div className="flex items-center gap-2 h-full">
        <Switch />
        <div
          className="hover:bg-header-hover px-2 h-full flex items-center cursor-pointer"
          onClick={toggleFullScreen}
        >
          <Fullscreen size={18} />
        </div>
        <Dropdown
          className="px-0 h-full"
          showArrow={false}
          label={
            <div className="hover:bg-header-hover px-2 h-full flex items-center cursor-pointer">
              <SlidersHorizontalIcon size={18} />
            </div>
          }
        >
          <div className="py-1">
            <p
              onClick={() => toggleFontSize('default')}
              className="px-4 py-1 hover:bg-header-hover cursor-pointer"
            >
              Default
            </p>
            <p
              onClick={() => toggleFontSize('large')}
              className="px-4 py-1 hover:bg-header-hover cursor-pointer"
            >
              Large
            </p>
            <p
              onClick={() => toggleFontSize('small')}
              className="px-4 py-1 hover:bg-header-hover cursor-pointer"
            >
              Small
            </p>
          </div>
        </Dropdown>

        <div className="hover:bg-header-hover px-2 h-full flex items-center cursor-pointer">
          <Languages size={18} />
        </div>

        <Dropdown
          showArrow={false}
          className="h-full"
          label={
            <div className="hover:bg-header-hover px-2 h-full flex items-center cursor-pointer">
              <Bell size={18} />
            </div>
          }
        >
          <div className="flex flex-col items-start bg-secondary border border-gray-400/20 rounded-sm h-98 w-78 px-3 py-2 absolute right-0">
            <h1 className="border-b pb-1 w-full">我的站内信</h1>
            <div className="flex-1"></div>
            <button className="flex items-center gap-2 self-end bg-sidebar-bg hover:bg-sidebar-bg/70 cursor-pointer px-2 py-1 rounded-sm">
              <span>
                <Eye size={16} />
              </span>
              查看全部
            </button>
          </div>
        </Dropdown>

        {/* 🔹 User Dropdown */}
        <Dropdown
          className={'hover:bg-background '}
          label={
            <div className="flex items-center gap-1 pr-2">
              <div className="bg-background flex items-center justify-center size-10 rounded-full">
                {user?.name
                  ? user.name
                      .split(' ')
                      .map((word) => word.charAt(0))
                      .join('')
                  : 'U'}
              </div>
              {user?.name || 'User'}
            </div>
          }
        >
          <div className="flex flex-col">
            <button
              onClick={() => navigate('/user/profile')}
              className="flex gap-2 px-4 cursor-pointer py-2 text-left hover:bg-header-hover"
            >
              <User />
              User Settings
            </button>
            <button
              onClick={() => {
                dispatch(logout());
                navigate('/user/login');
              }}
              className="flex gap-2 px-4 cursor-pointer py-2 text-left hover:bg-header-hover"
            >
              <LogOut />
              Logout
            </button>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
