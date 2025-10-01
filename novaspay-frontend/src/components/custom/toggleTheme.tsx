import { Moon, Sun } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/store';
import { toggleTheme } from '@/store/slices/theme';

const Switch = () => {
  const theme = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch();
  const isDark = theme === 'dark';

  const toggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div
      onClick={toggle}
      className={`w-10 h-5 flex items-center rounded-full px-1 cursor-pointer transition-colors 
        ${isDark ? 'bg-gray-800' : 'bg-yellow-400'}`}
    >
      <div
        className={`bg-white size-4 flex items-center justify-center rounded-full shadow-md transform transition-transform
          ${isDark ? 'translate-x-4' : 'translate-x-0'}`}
      >
        {isDark ? (
          <Moon className="w-3 h-3 text-gray-800" />
        ) : (
          <Sun className="w-3 h-3 text-yellow-500" />
        )}
      </div>
    </div>
  );
};

export default Switch;
