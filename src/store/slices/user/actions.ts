import { createAsyncThunk } from '@reduxjs/toolkit';

import { userApi } from '../../../services/api/userApi';
import { User } from './types';
import { Samples } from '../samples/types';

export const fetchRegistration = createAsyncThunk('user/registrationStatus', async (payload: any) => {
    try {
        await userApi.registration(payload);
    } catch (error) {
        console.log(error);
    }
});

export const fetchLogin = createAsyncThunk(
    'user/loginStatus',
    async (payload: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response: { user: User; token: string; message: string } = await userApi.login(payload);
            localStorage.setItem('token', response.token);
            return response;
        } catch (error) {
            // const data: any = error.response;
            // console.log(data);
            // return rejectWithValue(data.message);
        }
    }
);

export const fetchAuth = createAsyncThunk('user/authStatus', async () => {
    try {
        const data: { user: User; token: string } = await userApi.auth();
        localStorage.setItem('token', data.token);
        return data;
    } catch (error) {
        console.log(error);
    }
});

export const fetchUpdateEmail = createAsyncThunk(
    'user/updateEmailStatus',
    async (payload: { email: string | undefined }) => {
        try {
            return userApi.updateEmail(payload.email);
        } catch (error) {
            console.log(error);
        }
    }
);

export const fetchUpdateFullName = createAsyncThunk(
    'user/updateFullNameStatus',
    async (payload: { fullname: string | undefined }) => {
        try {
            return userApi.updateFullName(payload.fullname);
        } catch (error) {
            console.log(error);
        }
    }
);

export const fetchGetLikedSamples = createAsyncThunk('user/getLikedSamplesStatus', async () => {
    try {
        return userApi.getLikedSamples();
    } catch (error) {
        console.log(error);
    }
});

export const fetchUpdateAvatar = createAsyncThunk('user/updateAvatarSamplesStatus', async (file: File | null) => {
    try {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        return userApi.updateAvatar(formData);;
    } catch (error) {
        console.log(error);
    }
});
