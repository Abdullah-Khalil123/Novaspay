import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/store'; // your store type
import { setTheme } from '@/store/slices/theme';

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch();

  useEffect(() => {
    // Ensure <html> has the right class
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  // On mount, check localStorage and enforce it
  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (saved) {
      dispatch(setTheme(saved));
    }
  }, [dispatch]);

  return <>{children}</>;
};

export default ThemeProvider;
