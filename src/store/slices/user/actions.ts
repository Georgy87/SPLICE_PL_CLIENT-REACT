import { createAsyncThunk } from '@reduxjs/toolkit';

import { AuthResponseDto, LoginResponseDto, UpdateEmailRequestDto } from '@api/types';
import { userApi } from '@api/userApi';
import {
  LikedSamplesResponseDto,
  UpdateEmailResponseDto,
  UpdateFullNameRequestDto,
  UpdateFullNameResponseDto,
  UpdateAvatarResponseDto,
  RegistrationRequestDto,
  LoginRequestDto,
} from '@api/types';
import { localStorageService } from '@services/localStorageService';
import { STORAGE_KEYS } from '@/constans/storage';

export const fetchRegistration = createAsyncThunk(
  'user/registrationStatus',
  async (payload: RegistrationRequestDto) => {
    try {
      await userApi.registration(payload);
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchLogin = createAsyncThunk('user/loginStatus', async (payload: LoginRequestDto) => {
  try {
    const data: LoginResponseDto = await userApi.login(payload).promise;
    localStorageService.write<string>(STORAGE_KEYS.TOKEN, data.token);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchAuth = createAsyncThunk('user/authStatus', async () => {
  try {
    const data: AuthResponseDto = await userApi.auth().promise;
    localStorageService.write<string>(STORAGE_KEYS.TOKEN, data.token);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchUpdateEmail = createAsyncThunk('user/updateEmailStatus', async (payload: UpdateEmailRequestDto) => {
  try {
    const data: UpdateEmailResponseDto = await userApi.updateEmail(payload).promise;
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchUpdateFullName = createAsyncThunk(
  'user/updateFullNameStatus',
  async (payload: UpdateFullNameRequestDto) => {
    try {
      const data: UpdateFullNameResponseDto = await userApi.updateFullName(payload).promise;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchGetLikedSamples = createAsyncThunk('user/getLikedSamplesStatus', async () => {
  try {
    const data: LikedSamplesResponseDto = await userApi.getLikedSamples().promise;
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchUpdateAvatar = createAsyncThunk('user/updateAvatarSamplesStatus', async (file: File | null) => {
  try {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    const data: UpdateAvatarResponseDto = await userApi.updateAvatar(formData).promise;
    return data;
  } catch (error) {
    console.log(error);
  }
});
