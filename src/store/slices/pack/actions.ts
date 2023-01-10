import { createAsyncThunk } from '@reduxjs/toolkit';

import { packsApi } from '../../../services/api/packsApi';
import { createPackType, Pack } from './types';

export const fetchCreatePack = createAsyncThunk('packs/createPackStatus', async (payload: createPackType) => {
    try {
        const { picture, audio } = payload;
        const { genre, authorName, packInfo } = payload.info;

        const formData = new FormData();
        formData.append('genre', genre);
        formData.append('name', authorName);
        formData.append('packInfo', packInfo);
        formData.append('picture', picture);
        formData.append('audio', audio);

        return packsApi.createPack(formData);
    } catch (error) {
        console.log(error);
    }
});

export const fetchGetPacks = createAsyncThunk('packs/getPacksStatus', async (payload: number) => {
    try {
        return packsApi.getPacks(payload);
    } catch (error) {
        console.log(error);
    }
});

export const fetchGetPack = createAsyncThunk(
    'packs/getPackStatus',
    async (payload: { packId: string; tag: string | null }) => {
        try {
            const { packId, tag } = payload;
            return packsApi.getPack(packId, tag);
        } catch (error) {
            console.log(error);
        }
    }
);

export const fetchGetUserPacks = createAsyncThunk('packs/getUserPacksStatus', async () => {
    try {
        return packsApi.getUserPacks();
    } catch (error) {
        console.log(error);
    }
});

export const fetchSearchPacks = createAsyncThunk('packs/getSearchPacksStatus', async (search: string) => {
    try {
        return packsApi.searchPacks(search);
    } catch (error) {
        console.log(error);
    }
});

export const fetchPackUpdate = createAsyncThunk(
    'packs/packUpdateStatus',
    async (payload: { update: boolean; packId: string }) => {
        try {
            const { update, packId } = payload;
            await packsApi.packUpdate(update, packId);
        } catch (error) {
            console.log(error);
        }
    }
);
