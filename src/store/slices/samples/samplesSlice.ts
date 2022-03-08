import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCreateSamples } from './actions';
import { SampleSliceState } from './types';

const initialState: SampleSliceState = {
	samples: [],
	loading: false,
	files: [],
	packId: null,
	currentStep: 0,
	samplesToSend: null,
};

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
