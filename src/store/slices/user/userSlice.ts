import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User, UserSliceState } from './types';
import { userApi } from '../../../services/api/userApi';

const initialState: UserSliceState = {
	user: null,
	token: null,
};

export const fetchAuthUser = createAsyncThunk(
	'packs/authUserStatus',
	async () => {
		try {
			const data: { user: User; token: string } = await userApi.auth();
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
		builder.addCase(
			fetchAuthUser.fulfilled.type,
			(state, action: PayloadAction<{ user: User; token: string }>) => {
				const { user, token } = action.payload;
				state.user = user;
				state.token = token;
			},
		),
	// 	.addCase(
	// 		fetchCreatePack.fulfilled.type,
	// 		(state, action: PayloadAction<Pack[]>) => {
	// 			state.packs = action.payload;
	// 		},
	// 	)
	// 	.addCase(
	// 		fetchGetPack.fulfilled.type,
	// 		(state, action: PayloadAction<Pack>) => {
	// 			state.packProfile = action.payload;
	// 		},
	// 	),
});
