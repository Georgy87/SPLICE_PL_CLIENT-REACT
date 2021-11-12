import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User, UserSliceState } from './types';
import { userApi } from '../../../services/api/userApi';

const initialState: UserSliceState = {
	user: null,
	token: null,
};

export const fetchAuth = createAsyncThunk('user/authStatus', async () => {
	try {
		const data: { user: User; token: string } = await userApi.auth();
		localStorage.setItem('token', data.token);
		return data;
	} catch (error) {
		console.log(error);
	}
});

export const fetchLogin = createAsyncThunk(
	'user/loginStatus',
	async (payload: { email: string; password: string }) => {
		try {
			const data: { user: User; token: string } = await userApi.login(
				payload,
			);
			localStorage.setItem('token', data.token);
			return data;
		} catch (error) {
			console.log(error);
		}
	},
);

export const packSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) =>
		builder
			.addCase(
				fetchAuth.fulfilled.type,
				(
					state,
					action: PayloadAction<{ user: User; token: string }>,
				) => {
					const { user, token } = action.payload;
					state.user = user;
					state.token = token;
				},
			)
			.addCase(
				fetchLogin.fulfilled.type,
				(
					state,
					action: PayloadAction<{ user: User; token: string }>,
				) => {
					const { user, token } = action.payload;
					state.user = user;
					state.token = token;
				},
			),
	// 	.addCase(
	// 		fetchGetPack.fulfilled.type,
	// 		(state, action: PayloadAction<Pack>) => {
	// 			state.packProfile = action.payload;
	// 		},
	// 	),
});
