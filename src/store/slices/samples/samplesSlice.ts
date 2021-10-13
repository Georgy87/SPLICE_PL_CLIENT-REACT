import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState: any = {
	samples: [],
}; 

export const fetchCreateSamples = createAsyncThunk(
	'packs/createSamplesStatus',
	async (payload: File[]) => {
		try {
			// const packs = await packsApi.getPacks();
			const formData = new FormData();
			formData.append('samples', payload[0]);
            
		} catch (error) {
			console.log(error);
		}
	},
);

export const samplesSlice = createSlice({
	name: 'packs',
	initialState,
	reducers: {},
	extraReducers: (builder) =>
		builder
			// .addCase(
			// 	fetchGetPacks.fulfilled.type,
			// 	(state, action: PayloadAction<Pack[]>) => {
			// 		state.packs = action.payload;
			// 	},
			// )
			// .addCase(
			// 	fetchCreatePack.fulfilled.type,
			// 	(state, action: PayloadAction<Pack[]>) => {
			// 		state.packs = action.payload;
			// 	},
			// ),
});

export const samplesReducer = samplesSlice.reducer;