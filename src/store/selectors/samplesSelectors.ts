import { RootState } from '../types';

export const selectSamplesMain = (state: RootState) => state.packs;

export const selectSamplesLoading = (state: RootState) => selectSamplesMain(state).loading;
