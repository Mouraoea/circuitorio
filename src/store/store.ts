import { configureStore } from "@reduxjs/toolkit";
import circuitReducer from "./circuitSlice";

const store = configureStore({
  reducer: {
    circuit: circuitReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
