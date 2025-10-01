import { store } from '@/store';

export const getToken = () => {
  const state = store.getState();
  return state.auth?.token || null;
};
