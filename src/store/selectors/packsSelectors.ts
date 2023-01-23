import { RootState } from '../types';

export const selectPackMain = (state: RootState) => state.packs;

export const selectPacks = (state: RootState) => selectPackMain(state).packs;
export const selectSamples = (state: RootState) => selectPackMain(state).packProfile?.samples;
export const selectPackProfile = (state: RootState) => selectPackMain(state).packProfile;
export const selectUserPacks = (state: RootState) => selectPackMain(state).userPacks;
export const selectPackLoading = (state: RootState) => selectPackMain(state).loading;
export const selectTotalPages = (state: RootState) => selectPackMain(state).totalPages;
export const selectTag = (state: RootState) => selectPackMain(state).tag;
export const selectViewsData = (state: RootState) => selectPackMain(state).packProfile?.viewsData;