import { configureStore } from '@reduxjs/toolkit';
import taskSlice from './taskSlice';

export const store = configureStore({
  reducer: {
    task: taskSlice,
  },
});

// Export types for use throughout your app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
