import { Menu } from 'lucide-react';
import { AArrowUp } from 'lucide-react';

const Header = () => {
  return (
    <div className="h-[50px] text-text-primary flex items-center justify-between">
      <div className="flex items-center">
        <div className="px-4">
          <Menu size={18} />
        </div>
        Header
      </div>
      <div className="flex items-center gap-2 h-full">
        <div className="hover:bg-[#1d1e1f] h-full flex items-center px-1 cursor-pointer">
          <AArrowUp />
        </div>
        <div className="hover:bg-[#1d1e1f] h-full flex items-center px-1 cursor-pointer">
          <AArrowUp />
        </div>
        <div className="hover:bg-[#1d1e1f] h-full flex items-center px-1 cursor-pointer">
          <AArrowUp />
        </div>
        <div className="hover:bg-[#1d1e1f] h-full flex items-center px-1 cursor-pointer">
          <AArrowUp />
        </div>
        <div className="flex items-center gap-1 pr-2 hover:bg-[#1d1e1f] h-full px-1 cursor-pointer">
          <div className="bg-white size-10 rounded-full" />
          agongazi
        </div>
      </div>
    </div>
  );
};

export default Header;
