// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import coordinateSlice from './slices/coordinateSlice';
import jobSlice from './slices/jobSlice';
import loadingSlice from './slices/loadingSlice';
import authStateSlice from './slices/authStateSlice';
import loginSlice from './slices/loginSlice';
const store = configureStore({
	reducer: {
		coordinates: coordinateSlice,
		job: jobSlice,
		loading: loadingSlice,
		login: loginSlice,
		authState: authStateSlice,
	},
});

export default store;
