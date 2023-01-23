import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchCreatePack, fetchGetPack, fetchGetPacks, fetchGetUserPacks, fetchSearchPacks } from './actions';
import { Pack, PackProfile, PacksSliceState } from './types';

export const initialState: PacksSliceState = {
    packs: [],
    packProfile: null,
    userPacks: [],
    tag: null,
    loading: false,
    totalPages: 0,
};

export const packSlice = createSlice({
    name: 'packs',
    initialState,
    reducers: {
        setDefaultPackState: (state) => {
            state.packs = [];
            state.packProfile = null;
            state.userPacks = [];
        },
        setTag: (state, action: PayloadAction<string | null>) => {
            state.tag = action.payload;
        },
    },
    extraReducers: (builder) =>
        builder
            .addCase(fetchGetPacks.pending.type, (state) => {
                state.loading = true;
            })
            .addCase(
                fetchGetPacks.fulfilled.type,
                (state, action: PayloadAction<{ packs: Pack[]; totalPages: number }>) => {
                    const { packs, totalPages } = action.payload;
                    state.packs = [...state.packs, ...packs];
                    state.totalPages = totalPages;
                    state.loading = false;
                }
            )
            .addCase(fetchCreatePack.fulfilled.type, (state, action: PayloadAction<Pack[]>) => {
                const packs = action.payload;
                state.packs = packs;
            })
            .addCase(fetchGetPack.fulfilled.type, (state, action: PayloadAction<PackProfile>) => {
                const pack = action.payload;
                state.packProfile = pack;
                state.loading = true;
            })
            .addCase(fetchGetUserPacks.fulfilled.type, (state, action: PayloadAction<Pack[]>) => {
                const packs = action.payload;
                state.userPacks = packs;
            })
            .addCase(fetchSearchPacks.fulfilled.type, (state, action: PayloadAction<Pack[]>) => {
                const packs = action.payload;
                state.packs = packs;
            }),
});

export const { setDefaultPackState, setTag } = packSlice.actions;

export const packsReducer = packSlice.reducer;
