import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type authState = {
  token: string | null;
  isAuthenticated: boolean;
};

const initialState: authState = {
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; isAuthenticated: boolean }>
    ) => {
      state.token = action.payload.token;
      state.isAuthenticated = action.payload.isAuthenticated;

      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
