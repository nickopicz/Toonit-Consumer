// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import coordinateSlice from './slices/coordinateSlice';
import jobSlice from './slices/jobSlice';
import loadingSlice from './slices/loadingSlice';
const store = configureStore({
	reducer: {
		coordinates: coordinateSlice,
		job: jobSlice,
		loading: loadingSlice,
	},
});

export default store;
