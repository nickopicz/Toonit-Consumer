// src/redux/slices/coordinatesSlice.js

import { createSlice } from '@reduxjs/toolkit';

const coordinatesSlice = createSlice({
	name: 'coordinates',
	initialState: {
		latitude: null,
		longitude: null,
	},
	reducers: {
		setCoordinates: (state, action) => {
			state.latitude = action.payload.latitude;
			state.longitude = action.payload.longitude;
		},
	},
});

export const { setCoordinates } = coordinatesSlice.actions;

export default coordinatesSlice.reducer;
