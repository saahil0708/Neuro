import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSidebarOpen: false, 
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSidebar: (state, action) => {
      state.isSidebarOpen = action.payload;
    }
  },
});

export const { toggleSidebar, setSidebar } = uiSlice.actions;

export default uiSlice.reducer;
