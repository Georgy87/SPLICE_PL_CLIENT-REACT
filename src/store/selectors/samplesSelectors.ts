import { RootState } from '../types';

export const selectSamplesMain = (state: RootState) => state.samples;
// export const selectSamplesLoading = (state: RootState) => selectSamplesMain(state).loading;
export const selectSamplesFiles = (state: RootState) => selectSamplesMain(state).files;
