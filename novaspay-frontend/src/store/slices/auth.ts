import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type User = {
  id: string;
  name: string;
  email: string;
};

type authState = {
  token: string | null;
  isAuthenticated: boolean;
  user: User | null;
};

const initialState: authState = {
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') as string)
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        token: string;
        isAuthenticated: boolean;
        user: User | null;
      }>
    ) => {
      state.token = action.payload.token;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;

      localStorage.setItem('token', action.payload.token);
      if (action.payload.user) {
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      }
    },

    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
