import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type ThemeState = {
  mode: 'light' | 'dark';
};

// Get theme from localStorage if it exists, otherwise use default
const getInitialTheme = (): 'light' | 'dark' => {
  const savedTheme = localStorage.getItem('theme');
  return savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'light';
};

const initialState: ThemeState = {
  mode: getInitialTheme(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const newTheme = state.mode === 'light' ? 'dark' : 'light';
      state.mode = newTheme;
      localStorage.setItem('theme', newTheme);
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.mode = action.payload;
      localStorage.setItem('theme', action.payload);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
