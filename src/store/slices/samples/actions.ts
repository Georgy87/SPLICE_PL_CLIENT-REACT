import { createAsyncThunk } from '@reduxjs/toolkit';

import { samplesApi } from '@api/samplesApi';

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
      await samplesApi.setLike(payload);
    } catch (error) {
      console.log(error);
    }
  },
);

export const fetchDeleteLike = createAsyncThunk(
  'sample/deleteLikeSampleStatus',
  async (payload: { sampleId: string }) => {
    try {
      await samplesApi.deleteLike(payload);
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