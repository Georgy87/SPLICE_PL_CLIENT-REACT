import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { packsApi } from '../../../services/api/packsApi';
import { createPackType, Pack, PacksSliceState } from './types';

const initialState: PacksSliceState = {
	packs: [],
	packProfile: null,
};

export const fetchCreatePack = createAsyncThunk(
	'packs/createPackStatus',
	async (payload: createPackType) => {
		try {
			const { picture, audio } = payload;
			const { trackName, authorName, packInfo } = payload.info;

			const formData = new FormData();
			formData.append('trackName', trackName);
			formData.append('authorName', authorName);
			formData.append('packInfo', packInfo);
			formData.append('picture', picture);
			formData.append('audio', audio);

			const packs = await packsApi.createPack(formData);
			return packs;
		} catch (error) {
			console.log(error);
		}
	},
);

export const fetchGetPacks = createAsyncThunk(
	'packs/getPacksStatus',
	async () => {
		try {
			const packs = await packsApi.getPacks();
			return packs;
		} catch (error) {
			console.log(error);
		}
	},
);

export const fetchGetPack = createAsyncThunk(
	'packs/getPackStatus',
	async (packId: string) => {
		try {
			const pack = await packsApi.getPack(packId);
			return pack;
		} catch (error) {
			console.log(error);
		}
	},
);

export const packSlice = createSlice({
	name: 'packs',
	initialState,
	reducers: {},
	extraReducers: (builder) =>
		builder
			.addCase(
				fetchGetPacks.fulfilled.type,
				(state, action: PayloadAction<Pack[]>) => {
					state.packs = action.payload;
				},
			)
			.addCase(
				fetchCreatePack.fulfilled.type,
				(state, action: PayloadAction<Pack[]>) => {
					state.packs = action.payload;
				},
			)
			.addCase(
				fetchGetPack.fulfilled.type,
				(state, action: PayloadAction<Pack>) => {
					state.packProfile = action.payload;
				},
			),
});

export const packsReducer = packSlice.reducer;
