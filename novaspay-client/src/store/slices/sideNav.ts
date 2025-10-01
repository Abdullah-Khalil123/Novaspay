import { createSlice } from '@reduxjs/toolkit';

type NavState = {
  isCollapsed: boolean;
};

const initialState: NavState = {
  isCollapsed: false,
};

const sideNavSlice = createSlice({
  name: 'sideNav',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isCollapsed = !state.isCollapsed;
    },
    setSidebar: (state, action) => {
      state.isCollapsed = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebar } = sideNavSlice.actions;
export default sideNavSlice.reducer;
