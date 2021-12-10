import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { samplesApi } from '../../../services/api/samplesApi';
import { SampleSliceState } from './types';

const initialState: SampleSliceState = {
	samples: [],
	loading: false,
	files: null,
	packId: null,
};

export const fetchCreateSamples = createAsyncThunk(
	'packs/createSamplesStatus',
	async (payload: { file: File; packId: string; audioCoordinates: number[] }) => {
		try {
			const { file, packId, audioCoordinates } = payload;

			const formData = new FormData();

			formData.append('file', file);
			// const status = await samplesApi.createSamples(formData, packId);
			// return status;
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
		setSampleFiles: (state, action: PayloadAction<{ files: FileList[]; packId: string }>) => {
			const { files, packId } = action.payload;
			state.files = files;
			state.packId = packId;
		},
		deleteSampleFiles: (state) => {
			state.files = null;
		},
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

export const { setSampleFiles, deleteSampleFiles } = samplesSlice.actions;

export const samplesReducer = samplesSlice.reducer;
