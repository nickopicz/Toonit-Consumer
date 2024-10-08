// src/redux/slices/loadingSlice.js

import { createSlice } from '@reduxjs/toolkit';

const authStateSlice = createSlice({
	name: 'authState',
	initialState: {
		passwordValid: false,
	},
	reducers: {
		setPassValid: (state) => {
			state.passwordValid = action.payload.passwordValid;
		},
	},
});

export const { setPassValid } = authStateSlice.actions;

export default authStateSlice.reducer;
