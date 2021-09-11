import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { packsApi } from '../../services/api/packsApi';
import { Pack, PacksSliceState } from '../types/packs';

const initialState: PacksSliceState = {
	packs: [],
};

export const fetchCreatePack = createAsyncThunk(
	'packs/createTrackStatus', 
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
			
			packsApi.createPack(formData);
		} catch (error) {
			console.log(error);
		}
	},
);

export const packSlice = createSlice({
	name: 'packs',
	initialState,
	reducers: {
		setPack: (state, action: PayloadAction<Pack[]>) => {
			state.packs = action.payload;
		} 
	},
});

export const { setPack } = packSlice.actions;

export const packsReducer = packSlice.reducer;