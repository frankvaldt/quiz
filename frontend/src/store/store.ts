import rootReducer from './slices';
import {errorLoggingMiddleware} from "./middlewares/errorLoggingMiddleware.middleware";
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(errorLoggingMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


