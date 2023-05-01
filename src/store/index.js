import { configureStore } from '@reduxjs/toolkit';

import sweeperMapSlice from "./mine-sweeper-field-slice";

const store = configureStore({
  reducer: { sweeperMapSlice: sweeperMapSlice.reducer },
});

export default store;
