import { configureStore } from '@reduxjs/toolkit';
import nav from './slices/sideNav';
import auth from './slices/auth';
import theme from './slices/theme';
import font from './slices/font';

export const store = configureStore({
  reducer: {
    nav,
    auth,
    theme,
    font,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
