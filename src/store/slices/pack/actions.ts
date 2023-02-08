import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  CreatePackResponseDto,
  GetPacksResponseDto,
  GetUserPacksResponseDto,
  SearchPacksResponseDto,
} from '@api/types';
import { packsApi } from '@api/packsApi';

import { createPackType } from './types';

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

    const data: CreatePackResponseDto = await packsApi.createPack(formData).promise;
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchGetPacks = createAsyncThunk('packs/getPacksStatus', async (payload: number) => {
  try {
    const data: GetPacksResponseDto = await packsApi.getPacks(payload).promise;
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchGetPack = createAsyncThunk(
  'packs/getPackStatus',
  async (payload: { packId: string; tag: string | null }) => {
    try {
      return packsApi.getPack(payload).promise;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchGetUserPacks = createAsyncThunk('packs/getUserPacksStatus', async () => {
  try {
    const data: GetUserPacksResponseDto = await packsApi.getUserPacks().promise;
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchSearchPacks = createAsyncThunk('packs/getSearchPacksStatus', async (payload: string) => {
  try {
    const data: SearchPacksResponseDto = await packsApi.searchPacks(payload).promise;
    return data;
  } catch (error) {
    console.log(error);
  }
});
