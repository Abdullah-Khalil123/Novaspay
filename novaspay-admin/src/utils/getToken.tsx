import { store } from '@/store/store';

export const getToken = () => {
  const state = store.getState();
  return state.auth?.token || null;
};
