import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
	name: 'login',
	initialState: {
		phoneNum: '',
		password: '',
		firstName: '',
		lasName: '',
	},
	reducers: {
		setLogin: (state, action) => {
			state.phoneNum = action.payload.phoneNum;
			state.password = action.payload.password;
			state.firstName = action.payload.firstName;
			state.lastName = action.payload.lastName;
		},
	},
});

export const { setLogin } = loginSlice.actions;

export default loginSlice.reducer;
