import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
	fetchCreatePack,
	fetchGetPack,
	fetchGetPacks,
	fetchGetUserPacks,
	fetchSearchPacks
} from "./actions";
import { Pack, PackProfile, PacksSliceState } from "./types";

export const initialState: PacksSliceState = {
	packs: [],
	packProfile: null,
	userPacks: [],
	tag: null,
	loading: false,
	totalPages: 0
};

export const packSlice = createSlice({
	name: "packs",
	initialState,
	reducers: {
		setDefaultPackState: state => {
			state.packs = [];
			state.packProfile = null;
			state.userPacks = [];
		},
		setTag: (state, action: PayloadAction<string | null>) => {
			state.tag = action.payload;
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		}
	},
	extraReducers: builder =>
		builder
			.addCase(
				fetchGetPacks.fulfilled.type,
				(
					state,
					action: PayloadAction<
						{ packs: Pack[]; totalPages: number }
					>
				) => {
					const { packs, totalPages } = action.payload;
					const arr = [...Array.from(new Set([...state.packs])), ...packs]
					console.log(arr);
					state.packs = arr;
					state.totalPages = totalPages;
					state.loading = false;
				}
			)
			.addCase(
				fetchCreatePack.fulfilled.type,
				(state, action: PayloadAction<{ data: Pack[] }>) => {
					const { data } = action.payload;
					state.packs = data;
				}
			)
			.addCase(
				fetchGetPack.fulfilled.type,
				(state, action: PayloadAction<{data: PackProfile}>) => {
					const { data } =  action.payload;
					state.packProfile = data;
					state.loading = true;
				}
			)
			.addCase(
				fetchGetUserPacks.fulfilled.type,
				(state, action: PayloadAction<{ data: Pack[] }>) => {
					const { data } = action.payload;
					state.userPacks = data;
				}
			)
			.addCase(
				fetchSearchPacks.fulfilled.type,
				(state, action: PayloadAction<{ data: Pack[] }>) => {
					const { data } = action.payload;
					state.packs = data;
				}
			)
});

export const { setDefaultPackState, setTag, setLoading } = packSlice.actions;

export const packsReducer = packSlice.reducer;