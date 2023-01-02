import { configureStore } from "@reduxjs/toolkit";
import blockNodesHeightsReducer from "./reducers/blockNodesHeightsReducer";

const store = configureStore({
  reducer: {
    heights: blockNodesHeightsReducer,
  },
});

export default store;
