import { createSlice } from '@reduxjs/toolkit';

const jobSlice = createSlice({
	name: 'job',
	initialState: {
		type: '',
		car: {
			make: '',
			model: '',
			year: 0,
		},
		date: '',
		id: '',
		mechanicId: '',
		notes: '',
	},
	reducers: {
		setJob: (state, action) => {
			state.latitude = action.payload.latitude;
			state.longitude = action.payload.longitude;
		},
	},
});

export const { setJob } = jobSlice.actions;

export default jobSlice.reducer;
