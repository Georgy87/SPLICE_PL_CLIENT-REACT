import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { packsApi } from '../../services/api/packsApi';
import { Pack, PacksSliceState } from '../types/packs';

const initialState: PacksSliceState = {
	packs: [],
};

export const fetchCreatePack = createAsyncThunk(
	'packs/createPackStatus',
	async (payload: any) => {
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
	'packs/getPackStatus',
	async () => {
		try {
			const packs = await packsApi.getPacks();
			return packs;
		} catch (error) {
			console.log(error);
		}
	},
);

export const packSlice = createSlice({
	name: 'packs',
	initialState,
	reducers: {
		playPack: (state, action: PayloadAction<string | undefined>) => {
			console.log(action.payload);
			state.packs = state.packs.map((pack) => {
				pack.pause = true;
				if (pack._id === action.payload) {
					pack.pause = false;
				}
				return pack;
			});
		},
		pausePack: (state, action: PayloadAction<string | undefined>) => {
			state.packs = state.packs.map((pack) => {
				if (pack._id === action.payload) {
					console.log(pack);
					pack.pause = true;
				}
				return pack;
			});
		},
	},
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
			),
});

export const { playPack, pausePack } = packSlice.actions;

export const packsReducer = packSlice.reducer;
