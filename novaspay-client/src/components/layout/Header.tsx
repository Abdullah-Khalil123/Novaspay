import { toggleSidebar } from '@/store/slices/sideNav';
import { Menu } from 'lucide-react';
import {
  Fullscreen,
  Languages,
  SlidersHorizontalIcon,
  Bell,
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import Switch from '../custom/toggleTheme';

const Header = () => {
  const dispatch = useDispatch();
  return (
    <div className="h-[50px] text-text-primary bg-header-color flex items-center justify-between">
      <div className="flex h-full items-center">
        <div
          className="px-4 flex items-center h-full cursor-pointer hover:bg-header-hover"
          onClick={() => dispatch(toggleSidebar())}
        >
          <Menu size={18} />
        </div>
        Header
      </div>
      <div className="flex items-center gap-2 h-full">
        <Switch />
        <div className="hover:bg-header-hover px-2 h-full flex items-center cursor-pointer">
          <Fullscreen size={18} />
        </div>
        <div className="hover:bg-header-hover px-2 h-full flex items-center cursor-pointer">
          <SlidersHorizontalIcon size={18} />
        </div>
        <div className="hover:bg-header-hover px-2 h-full flex items-center cursor-pointer">
          <Languages size={18} />
        </div>
        <div className="hover:bg-header-hover px-2 h-full flex items-center cursor-pointer">
          <Bell size={18} />
        </div>
        <div className="flex items-center gap-1 pr-2 hover:bg-header-hover px-2 h-full cursor-pointer">
          <div className="bg-background size-10 rounded-full" />
          agongazi
        </div>
      </div>
    </div>
  );
};

export default Header;
