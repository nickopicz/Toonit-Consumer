import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
	name: 'login',
	initialState: {
		phoneNum: '',
		password: '',
		firstName: '',
		lastName: '',
	},
	reducers: {
		setPhoneRed: (state, action) => {
			state.phoneNum = action.payload;
		},
		setPassRed: (state, action) => {
			state.password = action.payload;
		},
		setFirstNameRed: (state, action) => {
			state.firstName = action.payload;
		},
		setLastNameRed: (state, action) => {
			state.lastName = action.payload;
		},
	},
});

export const { setPhoneRed, setPassRed, setFirstNameRed, setLastNameRed } =
	loginSlice.actions;

export default loginSlice.reducer;
