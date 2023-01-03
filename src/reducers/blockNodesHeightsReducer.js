import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const heightsSlice = createSlice({
  name: "heights",
  initialState,
  reducers: {
    setBlockNodesHeights(state, action) {
      state = action.payload;
      return state;
    },
    removeBlockNodesHeights(state, action) {
      state = null;
      return state;
    },
  },
});

export const { setBlockNodesHeights, removeBlockNodesHeights } =
  heightsSlice.actions;

export default heightsSlice.reducer;
