import { configureStore } from "@reduxjs/toolkit";
import backgroundSlice from "./backgroundSlice";

export const store = configureStore({
  reducer: {
    counter: backgroundSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
