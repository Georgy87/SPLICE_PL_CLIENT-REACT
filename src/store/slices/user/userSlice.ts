import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserSliceState } from "./types";

const initialState: UserSliceState = {
    user: null,
};

export const fetchAuthUser = createAsyncThunk(
	'packs/getPacksStatus',
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
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) =>
		// builder
		// 	.addCase(
		// 		fetchGetPacks.fulfilled.type,
		// 		(state, action: PayloadAction<Pack[]>) => {
		// 			state.packs = action.payload;
		// 		},
		// 	)
		// 	.addCase(
		// 		fetchCreatePack.fulfilled.type,
		// 		(state, action: PayloadAction<Pack[]>) => {
		// 			state.packs = action.payload;
		// 		},
		// 	)
		// 	.addCase(
		// 		fetchGetPack.fulfilled.type,
		// 		(state, action: PayloadAction<Pack>) => {
		// 			state.packProfile = action.payload;
		// 		},
		// 	),
});
