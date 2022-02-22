import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { samplesApi } from '../../../services/api/samplesApi';
import { SampleSliceState } from './types';

const initialState: SampleSliceState = {
	samples: [],
	loading: false,
	files: [],
	packId: null,
	currentStep: 0,
};

export const fetchCreateSamples = createAsyncThunk(
	'sample/createSamplesStatus',
	async (payload: { file: File; packId: string; audioCoordinates: number[] }) => {
		try {
			const { file } = payload;

			const formData = new FormData();

			formData.append('file', file);
		} catch (error) {
			console.log(error);
		}
	},
);

export const fetchSetLike = createAsyncThunk(
	'sample/setLikeSampleStatus',
	async (payload: { sampleId: string }) => {
		try {
			await samplesApi.setLike(payload.sampleId);
		} catch (error) {
			console.log(error);
		}
	},
);

export const fetchDeleteLike = createAsyncThunk(
	'sample/deleteLikeSampleStatus',
	async (payload: { sampleId: string }) => {
		try {
			await samplesApi.deleteLike(payload.sampleId);
		} catch (error) {
			console.log(error);
		}
	},
);

export const fetchSetSampleCategory = createAsyncThunk(
	'sample/setSampleCategoryStatus',
	async (payload: { sampleId: string; category: string }) => {
		try {
			await samplesApi.setSampleCategory(payload);
		} catch (error) {
			console.log(error);
		}
	},
);

export const fetchSetSampleBpm = createAsyncThunk(
	'sample/setSampleBpmStatus',
	async (payload: { sampleId: string; bpm: number }) => {
		try {
			await samplesApi.setSampleBpm(payload);
		} catch (error) {
			console.log(error);
		}
	},
);

export const samplesSlice = createSlice({
	name: 'sample',
	initialState,
	reducers: {
		setSampleFiles: (
			state,
			action: PayloadAction<{ id: string; file: File; packId: string }>,
		) => {
			const { id, file, packId } = action.payload;
			state.files = [...state.files, { id, file }];

			state.packId = packId;
		},
		deleteSampleFiles: (state, action: PayloadAction<string>) => {
			state.files = state.files.filter((el) => el.id !== action.payload);
		},
		setCurrentStep: (state, action: PayloadAction<number>) => {
			state.currentStep = action.payload;
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

export const { setSampleFiles, deleteSampleFiles, setCurrentStep } = samplesSlice.actions;

export const samplesReducer = samplesSlice.reducer;
