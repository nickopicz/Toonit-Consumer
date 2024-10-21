// src/redux/slices/loadingSlice.js

import { createSlice } from '@reduxjs/toolkit';

const authStateSlice = createSlice({
	name: 'authState',
	initialState: {
		passwordValid: false,
		accountExists: false,
	},
	reducers: {
		setPassValid: (state) => {
			state.passwordValid = action.payload.passwordValid;
		},
		setAccountExists: (state) => {
			state.accountExists = action.payload.accountExists;
		},
	},
});

export const { setPassValid, setAccountExists } = authStateSlice.actions;

export default authStateSlice.reducer;
