import { createAsyncThunk } from '@reduxjs/toolkit';

import { userApi } from '../../../services/api/userApi';
import { User } from './types';
import { Samples } from '../samples/types';

export const fetchRegistration = createAsyncThunk(
	'user/registrationStatus',
	async (payload: any) => {
		try {
			await userApi.registration(payload);
		} catch (error) {
			console.log(error);
		}
	},
);

export const fetchLogin = createAsyncThunk(
	'user/loginStatus',
	async (payload: { email: string; password: string }, { rejectWithValue }) => {
		try {
			const data: {
				data: { user: User; token: string; message: string };
			} = await userApi.login(payload);
		
			localStorage.setItem('token', data.data.token);
			return data;
		} catch (error) {
			// const data: any = error.response;
			// console.log(data);
			// return rejectWithValue(data.message);
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

export const fetchUpdateEmail = createAsyncThunk(
	'user/updateEmailStatus',
	async (payload: { email: string | undefined }) => {
		try {
			const data: { user: User } = await userApi.updateEmail(payload.email);

			return data;
		} catch (error) {
			console.log(error);
		}
	},
);

export const fetchUpdateFullName = createAsyncThunk(
	'user/updateFullNameStatus',
	async (payload: { fullname: string | undefined }) => {
		try {
			const data: {
				user: User;
				token: string;
				message: string;
			} = await userApi.updateFullName(payload.fullname);
			return data;
		} catch (error) {
			console.log(error);
		}
	},
);

export const fetchGetLikedSamples = createAsyncThunk('user/getLikedSamplesStatus', async () => {
	try {
		const data: Samples[] = await userApi.getLikedSamples();
		return data;
	} catch (error) {
		console.log(error);
	}
});

export const fetchUpdateAvatar = createAsyncThunk(
	'user/updateAvatarSamplesStatus',
	async (file: File | null) => {
		try {
			if (!file) return;

			const formData = new FormData();

			formData.append('file', file);

			const data: string = await userApi.updateAvatar(formData);
			return data;
		} catch (error) {
			console.log(error);
		}
	},
);
