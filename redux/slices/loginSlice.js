import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
	name: 'login',
	initialState: {
		phoneNum: '',
	},
	reducers: {
		setLogin: (state, action) => {
			state.phoneNum = action.payload.phoneNum;
		},
	},
});

export const { setLogin } = loginSlice.actions;

export default loginSlice.reducer;
