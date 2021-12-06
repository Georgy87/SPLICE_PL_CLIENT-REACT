import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { samplesApi } from '../../../services/api/samplesApi';
import { SampleSliceState } from './types';

const initialState: SampleSliceState = {
	samples: [],
	loading: false,
	files: null,
};

export const fetchCreateSamples = createAsyncThunk(
	'packs/createSamplesStatus',
	async (payload: { files: [Record<number, File>]; packId: string }) => {
		try {
			const { files, packId } = payload;
			const formData = new FormData();

			Object.entries(files[0]).forEach(([idx, file]) => {
				formData.append('files', file, file.name);
			});

			const status = await samplesApi.createSamples(formData, packId);
			return status;
		} catch (error) {
			console.log(error);
		}
	},
);

export const fetchSetLike = createAsyncThunk(
	'packs/setLikeSampleStatus',
	async (payload: { sampleId: string }) => {
		try {
			await samplesApi.setLike(payload.sampleId);
		} catch (error) {
			console.log(error);
		}
	},
);

export const fetchDeleteLike = createAsyncThunk(
	'packs/deleteLikeSampleStatus',
	async (payload: { sampleId: string }) => {
		try {
			await samplesApi.deleteLike(payload.sampleId);
		} catch (error) {
			console.log(error);
		}
	},
);

export const samplesSlice = createSlice({
	name: 'packs',
	initialState,
	reducers: {
		setSampleFiles: (state, action: PayloadAction<FileList[]>) => {
			state.files = action.payload;
		}
	},
	extraReducers: (builder) =>
		builder.addCase(
			fetchCreateSamples.fulfilled.type,
			(state, action: PayloadAction<string>) => {
				if ((action.payload = 'SUCCESS')) {
					state.loading = true;
				}
			},
		),
});

export const { setSampleFiles } = samplesSlice.actions;

export const samplesReducer = samplesSlice.reducer;
