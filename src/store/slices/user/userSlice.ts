import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User, UserSliceState } from './types';
import { userApi } from '../../../services/api/userApi';

const initialState: UserSliceState = {
	user: null,
	token: null,
	isAuth: false,
};

export const fetchRegistration = createAsyncThunk(
	'user/registrationStatus',
	async (payload: User) => {
		try {
			await userApi.registration(payload);
		} catch (error) {
			console.log(error);
		}
	},
);

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

export const fetchAuth = createAsyncThunk('user/authStatus', async () => {
	try {
		const data: { user: User; token: string } = await userApi.auth();
		localStorage.setItem('token', data.token);
		return data;
	} catch (error) {
		console.log(error);
	}
});

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: (state) => {
			state.isAuth = false;
			state.user = null;
			state.token = null;
			localStorage.removeItem('token');
		},
	},
	extraReducers: (builder) =>
		builder
			.addCase(
				fetchLogin.fulfilled.type,
				(
					state,
					action: PayloadAction<{ user: User; token: string }>,
				) => {
					const { user, token } = action.payload;
					state.user = user;
					state.token = token;
					state.isAuth = true;
				},
			)
			.addCase(
				fetchAuth.fulfilled.type,
				(
					state,
					action: PayloadAction<{ user: User; token: string }>,
				) => {
					if (action.payload) {
						const { user, token } = action.payload;

						state.user = user;
						state.token = token;
						state.isAuth = true;
					}
				},
			),
});

export const { logout } = userSlice.actions;

export const userReducer = userSlice.reducer;
