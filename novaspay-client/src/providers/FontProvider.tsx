import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/store';
import { setFontSize } from '@/store/slices/font';

const FontProvider = ({ children }: { children: React.ReactNode }) => {
  const fontSize = useSelector((state: RootState) => state.font.size);
  const dispatch = useDispatch();

  useEffect(() => {
    // Ensure <html> has the right class
    document.documentElement.classList.remove(
      'font-size-default',
      'font-size-large',
      'font-size-small'
    );
    document.documentElement.classList.add(`font-size-${fontSize}`);
  }, [fontSize]);

  // On mount, check localStorage and enforce it
  useEffect(() => {
    const storedFontSize = localStorage.getItem('fontSize') as
      | 'default'
      | 'small'
      | 'large'
      | null;
    if (storedFontSize) {
      dispatch(setFontSize(storedFontSize));
    }
  }, [dispatch]);

  return <>{children}</>;
};

export default FontProvider;
