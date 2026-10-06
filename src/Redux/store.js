import { configureStore } from '@reduxjs/toolkit';
import campusReducer from './slices/campusSlice';

export const store = configureStore({
  reducer: {
    campuses: campusReducer,
  },
});

export default store;
