import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type FontState = {
  size: 'default' | 'small' | 'large';
};

const initialState: FontState = {
  size:
    (localStorage.getItem('fontSize') as 'default' | 'small' | 'large') ||
    'default',
};

const fontSlice = createSlice({
  name: 'font',
  initialState,
  reducers: {
    setFontSize: (
      state,
      action: PayloadAction<'default' | 'small' | 'large'>
    ) => {
      state.size = action.payload;
      localStorage.setItem('fontSize', action.payload);
    },
  },
});

export const { setFontSize } = fontSlice.actions;
export default fontSlice.reducer;
