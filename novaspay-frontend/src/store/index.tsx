import { configureStore } from '@reduxjs/toolkit';
import nav from './slices/sideNav';
import auth from './slices/auth';
import theme from './slices/theme';

export const store = configureStore({
  reducer: {
    nav,
    auth,
    theme,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
