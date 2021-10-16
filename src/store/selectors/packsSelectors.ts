import { RootState } from '../types';

export const selectPacks = (state: RootState) => state.packs.packs;
export const selectSamples = (state: RootState) => state.packs.packProfile?.samples;
