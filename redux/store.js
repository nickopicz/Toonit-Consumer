// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import coordinateSlice from './slices/coordinateSlice';
const store = configureStore({
	reducer: {
		coordinates: coordinateSlice,
	},
});

export default store;
