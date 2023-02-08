import { localStorageService } from '@services/localStorageService';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Samples } from '@store/slices/samples/types';

import { User, UserSliceState } from './types';
import {
  fetchAuth,
  fetchGetLikedSamples,
  fetchLogin,
  fetchUpdateAvatar,
  fetchUpdateEmail,
  fetchUpdateFullName,
} from './actions';

import { STORAGE_KEYS } from '@/constans/storage';

export const initialState: UserSliceState = {
  user: null,
  token: null,
  isAuth: false,
  samples: null,
  avatar: null,
  loading: false,
  errorMessage: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuth = false;
      state.user = null;
      state.token = null;
      localStorageService.remove(STORAGE_KEYS.TOKEN);
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchLogin.fulfilled.type, (state, action: PayloadAction<{ user: User; token: string }>) => {
        if (action.payload) {
          const { user, token } = action.payload;
          state.user = user;
          state.token = token;
          state.isAuth = true;
        }
      })
      .addCase(fetchLogin.rejected.type, (state, action: PayloadAction<string>) => {
        state.errorMessage = action.payload;
      })
      .addCase(fetchAuth.fulfilled.type, (state, action: PayloadAction<{ user: User; token: string }>) => {
        if (action.payload) {
          const { user, token } = action.payload;
          state.user = user;
          state.token = token;
          state.isAuth = true;
        }
      })
      .addCase(fetchUpdateEmail.fulfilled.type, (state, action: PayloadAction<User>) => {
        if (action.payload) {
          state.user = action.payload;
        }
      })
      .addCase(fetchUpdateFullName.fulfilled.type, (state, action: PayloadAction<User>) => {
        if (action.payload) {
          state.user = action.payload;
        }
      })
      .addCase(fetchGetLikedSamples.fulfilled.type, (state, action: PayloadAction<Samples[]>) => {
        state.samples = action.payload;
      })
      .addCase(fetchUpdateAvatar.pending.type, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchUpdateAvatar.fulfilled.type, (state, action: PayloadAction<string>) => {
        state.avatar = action.payload;
        state.loading = false;
      }),
});

export const { logout } = userSlice.actions;

export const userReducer = userSlice.reducer;
