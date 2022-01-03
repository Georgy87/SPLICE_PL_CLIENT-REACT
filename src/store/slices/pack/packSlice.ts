import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { packsApi } from '../../../services/api/packsApi';
import { createPackType, Pack, PacksSliceState } from './types';

const initialState: PacksSliceState = {
	packs: [],
	packProfile: null,
	userPacks: [],
	tag: null,
	loading: false,
};

export const fetchCreatePack = createAsyncThunk(
	'packs/createPackStatus',
	async (payload: createPackType) => {
		try {
			const { picture, audio } = payload;
			const { genre, authorName, packInfo } = payload.info;

			const formData = new FormData();
			formData.append('genre', genre);
			formData.append('name', authorName);
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

export const fetchGetPacks = createAsyncThunk('packs/getPacksStatus', async () => {
	try {
		const packs = await packsApi.getPacks();
		return packs;
	} catch (error) {
		console.log(error);
	}
});

export const fetchGetPack = createAsyncThunk(
	'packs/getPackStatus',
	async (payload: { packId: string; tag: string | null }) => {
		try {
			const { packId, tag } = payload;
			const pack = await packsApi.getPack(packId, tag);
			return pack;
		} catch (error) {
			console.log(error);
		}
	},
);

export const fetchGetUserPacks = createAsyncThunk('packs/getUserPacksStatus', async () => {
	try {
		const packs = await packsApi.getUserPacks();
		return packs;
	} catch (error) {
		console.log(error);
	}
});

export const fetchSearchPacks = createAsyncThunk(
	'packs/getSearchPacksStatus',
	async (search: string) => {
		try {
			const pack = await packsApi.searchPacks(search);
			return pack;
		} catch (error) {
			console.log(error);
		}
	},
);

export const fetchPackUpdate = createAsyncThunk(
	'packs/packUpdateStatus',
	async (payload: { update: boolean; packId: string }) => {
		try {
			const { update, packId } = payload;
			await packsApi.packUpdate(update, packId);
		} catch (error) {
			console.log(error);
		}
	},
);

export const packSlice = createSlice({
	name: 'packs',
	initialState,
	reducers: {
		setDefaultPackState: (state) => {
			state.packs = [];
			state.packProfile = null;
			state.userPacks = [];
			state.loading = false;
		},
		setTag: (state, action: PayloadAction<string | null>) => {
			state.tag = action.payload;
		},
		// setLoading: (state, action: PayloadAction<any>) => {
		// 	state.loading = action.payload;
		// }
	},
	extraReducers: (builder) =>
		builder
			.addCase(fetchGetPacks.fulfilled.type, (state, action: PayloadAction<Pack[]>) => {
				state.packs = action.payload;
			})
			.addCase(fetchCreatePack.fulfilled.type, (state, action: PayloadAction<Pack[]>) => {
				state.packs = action.payload;
			})
			.addCase(fetchGetPack.fulfilled.type, (state, action: PayloadAction<Pack>) => {
				state.packProfile = action.payload;
				state.loading = true;
			})
			.addCase(fetchGetUserPacks.fulfilled.type, (state, action: PayloadAction<Pack[]>) => {
				state.userPacks = action.payload;
			})
			.addCase(fetchSearchPacks.fulfilled.type, (state, action: PayloadAction<Pack[]>) => {
				state.packs = action.payload;
			}),
});

export const { setDefaultPackState, setTag } = packSlice.actions;

export const packsReducer = packSlice.reducer;
