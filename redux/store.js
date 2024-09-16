// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import coordinateSlice from './slices/coordinateSlice';
import jobSlice from './slices/jobSlice';
const store = configureStore({
	reducer: {
		coordinates: coordinateSlice,
		job: jobSlice,
	},
});

export default store;
