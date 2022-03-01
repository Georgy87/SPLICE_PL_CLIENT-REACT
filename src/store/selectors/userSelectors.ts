import { RootState } from '../types';

export const selectUserMain = (state: RootState) => state.user;

export const selectAuth = (state: RootState) => selectUserMain(state).isAuth;
export const selectUser = (state: RootState) => selectUserMain(state).user;
export const selectLikedSamples = (state: RootState) => selectUserMain(state).samples;
export const selectErrorMessage = (state: RootState) => selectUserMain(state).errorMessage;

