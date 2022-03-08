import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchCreatePack, fetchGetPack, fetchGetPacks, fetchGetUserPacks, fetchSearchPacks } from './actions';
import { Pack, PacksSliceState } from './types';

const initialState: PacksSliceState = {
	packs: [],
	packProfile: null,
	userPacks: [],
	tag: null,
	loading: false,
};

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
