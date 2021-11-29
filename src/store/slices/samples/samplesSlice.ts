import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { samplesApi } from '../../../services/api/samplesApi';

const initialState: any = {
	samples: [],
};

export const fetchCreateSamples = createAsyncThunk(
	'packs/createSamplesStatus',
	async (payload: { files: [Record<number, File>], packId: string}) => {
		try {
			const { files, packId } = payload;
			const formData = new FormData();

			Object.entries(files[0]).forEach(([idx, file]) => {
				formData.append('files', file, file.name);
			});

			await samplesApi.createSamples(formData, packId);
		} catch (error) {
			console.log(error);
		}
	},
);

export const fetchSetLike = createAsyncThunk(
	'packs/setLikeSampleStatus',
	async (payload: { sampleId: string}) => {
		try {
			await samplesApi.setLike(payload.sampleId);
		} catch (error) {
			console.log(error);
		}
	},
);

export const samplesSlice = createSlice({
	name: 'packs',
	initialState,
	reducers: {},
	extraReducers: (builder) => builder,
});

export const samplesReducer = samplesSlice.reducer;
