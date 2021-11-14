import { RootState } from '../types';

export const selectAuth = (state: RootState) => state.user.isAuth;