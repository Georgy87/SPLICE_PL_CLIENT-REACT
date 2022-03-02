import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User, UserSliceState } from './types';
import { userApi } from '../../../services/api/userApi';
import { Samples } from '../samples/types';
import { ErrorInfo } from 'react';

const initialState: UserSliceState = {
	user: null,
	token: null,
	isAuth: false,
	samples: null,
	avatar: null,
	errorMessage: null,
};

export const fetchRegistration = createAsyncThunk('user/registrationStatus', async (payload: any) => {
	try {
		await userApi.registration(payload);
	} catch (error) {
		console.log(error);
	}
});

export const fetchLogin = createAsyncThunk('user/loginStatus', async (payload: { email: string; password: string }, { rejectWithValue }) => {
	try {
		const data: { user: User; token: string; message: string } = await userApi.login(payload);
		localStorage.setItem('token', data.token);
		return data;
	} catch (error: any) {
		const { data } = error.response;
		console.log(data);
		return rejectWithValue(data.message);
	}
});

export const fetchAuth = createAsyncThunk('user/authStatus', async () => {
	try {
		const data: { user: User; token: string } = await userApi.auth();
		localStorage.setItem('token', data.token);
		return data;
	} catch (error) {
		console.log(error);
	}
});

export const fetchUpdateEmail = createAsyncThunk('user/updateEmailStatus', async (payload: { email: string | undefined }) => {
	try {
		const data: { user: User } = await userApi.updateEmail(payload.email);

		return data;
	} catch (error) {
		console.log(error);
	}
});

export const fetchUpdateFullName = createAsyncThunk('user/updateFullNameStatus', async (payload: { fullname: string | undefined }) => {
	try {
		const data: { user: User; token: string; message: string } = await userApi.updateFullName(payload.fullname);
		return data;
	} catch (error) {
		console.log(error);
	}
});

export const fetchGetLikedSamples = createAsyncThunk('user/getLikedSamplesStatus', async () => {
	try {
		const data: Samples[] = await userApi.getLikedSamples();
		return data;
	} catch (error) {
		console.log(error);
	}
});

export const fetchUpdateAvatar = createAsyncThunk('user/updateAvatarSamplesStatus', async (file: File | null) => {
	try {
		if (!file) return;

		const formData = new FormData();

		formData.append('file', file);

		const data: string = await userApi.updateAvatar(formData);
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
			.addCase(fetchLogin.fulfilled.type, (state, action: PayloadAction<{ user: User; token: string; message: string }>) => {
				state.user = action.payload?.user;
				state.token = action.payload?.token;
				state.isAuth = true;
			})
			.addCase(fetchLogin.rejected.type, (state, action: PayloadAction<string>) => {
			
				state.errorMessage = action.payload;
			})
			.addCase(fetchAuth.fulfilled.type, (state, action: PayloadAction<{ user: User; token: string }>) => {
				if (action.payload) {
					const { user, token } = action.payload;
					state.user = user;
					state.token = token;
					state.isAuth = true;
				}
			})
			.addCase(fetchUpdateEmail.fulfilled.type, (state, action: PayloadAction<User>) => {
				if (action.payload) {
					state.user = action.payload;
				}
			})
			.addCase(fetchUpdateFullName.fulfilled.type, (state, action: PayloadAction<User>) => {
				if (action.payload) {
					state.user = action.payload;
				}
			})
			.addCase(fetchGetLikedSamples.fulfilled.type, (state, action: PayloadAction<Samples[]>) => {
				state.samples = action.payload;
			})
			.addCase(fetchUpdateAvatar.fulfilled.type, (state, action: PayloadAction<string>) => {
				state.avatar = action.payload;
			}),
});

export const { logout } = userSlice.actions;

export const userReducer = userSlice.reducer;
